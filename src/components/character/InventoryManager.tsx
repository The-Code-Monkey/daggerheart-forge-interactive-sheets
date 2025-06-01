import { useState, useEffect, JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { getItemsByIds } from "@/integrations/supabase/helpers";
import ItemSearch from "@/components/ItemSearch";
import { InventoryItem, ItemInventoryEntry, ItemWithQuantity } from "./types";
import { Character } from "@/lib/types";
import { Textarea } from "../ui/textarea";

interface InventoryManagerProps {
  character: any;
  onUpdate: (updates: Partial<Character>) => void;
}

const InventoryManager = ({
  character,
  onUpdate,
}: InventoryManagerProps): JSX.Element => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [itemsInventory, setItemsInventory] = useState<ItemWithQuantity[]>([]);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    description: "",
  });

  const loadItemsInventory = async (
    itemsInventoryData: ItemInventoryEntry[]
  ) => {
    if (itemsInventoryData.length === 0) {
      setItemsInventory([]);
      return;
    }

    const itemIds = itemsInventoryData.map((entry) => entry.itemId);
    const items = await getItemsByIds(itemIds);

    const itemsWithQuantity = items.map((item) => {
      const inventoryEntry = itemsInventoryData.find(
        (entry) => entry.itemId === item.id
      );
      return {
        id: item.id,
        name: item.name ?? "Unknown Item",
        type: item.type ?? "Unknown",
        tier: item.tier ?? 1,
        quantity: inventoryEntry?.quantity ?? 1,
        description: undefined, // Remove description since it doesn't exist on the item type
        equipped: inventoryEntry?.equipped ?? false,
      };
    });

    setItemsInventory(itemsWithQuantity);
  };

  useEffect(() => {
    if (character) {
      setInventory((character.inventory ?? []) as unknown as InventoryItem[]);

      const itemsInventoryData = (character.items_inventory ??
        []) as unknown as ItemInventoryEntry[];
      void loadItemsInventory(itemsInventoryData);
    }
  }, [character]);

  const addInventoryItem = () => {
    if (!newItem.name.trim()) return;

    const item: InventoryItem = {
      id: crypto.randomUUID(),
      ...newItem,
    };

    const updatedInventory = [...inventory, item];
    setInventory(updatedInventory);
    onUpdate({ inventory: updatedInventory as any });
    setNewItem({ name: "", quantity: 1, description: "" });
  };

  const handleItemSelect = (
    item: { id: number; name: string; type: string; tier: number },
    quantity: number
  ) => {
    const currentItemsInventory = (character?.items_inventory ??
      []) as unknown as ItemInventoryEntry[];

    const existingItemIndex = currentItemsInventory.findIndex(
      (entry) => entry.itemId === item.id
    );

    let updatedItemsInventory: ItemInventoryEntry[];

    if (existingItemIndex >= 0) {
      updatedItemsInventory = [...currentItemsInventory];
      updatedItemsInventory[existingItemIndex].quantity += quantity;
    } else {
      updatedItemsInventory = [
        ...currentItemsInventory,
        { itemId: item.id, quantity },
      ];
    }

    onUpdate({ items_inventory: updatedItemsInventory as any });
    void loadItemsInventory(updatedItemsInventory);
  };

  const removeInventoryItem = (itemId: string) => {
    const updatedInventory = inventory.filter((item) => item.id !== itemId);
    setInventory(updatedInventory);
    onUpdate({ inventory: updatedInventory as any });
  };

  const removeItemInventoryItem = (itemId: number) => {
    const currentItemsInventory = (character?.items_inventory ??
      []) as unknown as ItemInventoryEntry[];
    const updatedItemsInventory = currentItemsInventory.filter(
      (entry) => entry.itemId !== itemId
    );

    onUpdate({ items_inventory: updatedItemsInventory as any });
    void loadItemsInventory(updatedItemsInventory);
  };

  const handleItemInventoryEquip = (itemId: number, equipped: boolean) => {
    const currentItemsInventory = (character?.items_inventory ??
      []) as unknown as ItemInventoryEntry[];
    const updatedItemsInventory = currentItemsInventory.map((entry) =>
      entry.itemId === itemId ? { ...entry, equipped } : entry
    );

    onUpdate({ items_inventory: updatedItemsInventory as any });
    void loadItemsInventory(updatedItemsInventory);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-white">Inventory</CardTitle>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Item
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-slate-900 border-purple-500/30">
            <SheetHeader>
              <SheetTitle className="text-white">Add Inventory Item</SheetTitle>
              <SheetDescription className="text-purple-200">
                Search for items from the database or add custom items to your
                character's inventory.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              <ItemSearch onItemSelect={handleItemSelect} />

              <div className="border-t border-purple-500/30 pt-4">
                <h4 className="text-white font-medium mb-3">
                  Or add custom item:
                </h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="item-name" className="text-white">
                      Item Name
                    </Label>
                    <Input
                      id="item-name"
                      value={newItem.name}
                      onChange={(e) => {
                        setNewItem({ ...newItem, name: e.target.value });
                      }}
                      className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                      placeholder="Enter item name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="item-quantity" className="text-white">
                      Quantity
                    </Label>
                    <Input
                      id="item-quantity"
                      type="number"
                      min="1"
                      value={newItem.quantity}
                      onChange={(e) => {
                        setNewItem({
                          ...newItem,
                          quantity: parseInt(e.target.value) || 1,
                        });
                      }}
                      className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="item-description" className="text-white">
                      Description
                    </Label>
                    <Textarea
                      id="item-description"
                      value={newItem.description}
                      onChange={(e) => {
                        setNewItem({
                          ...newItem,
                          description: e.target.value,
                        });
                      }}
                      className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                    />
                  </div>
                  <Button
                    onClick={addInventoryItem}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                    disabled={!newItem.name.trim()}
                  >
                    Add Custom Item
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent>
        {itemsInventory.length > 0 || inventory.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-purple-20 w-8"></TableHead>
                <TableHead className="text-purple-200">Item</TableHead>
                <TableHead className="text-purple-200">Qty</TableHead>
                <TableHead className="text-purple-200 w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itemsInventory.map((item) => (
                <TableRow key={`item-${String(item.id)}`}>
                  <TableCell className="text-white w-8">
                    <div>
                      <Input
                        type="checkbox"
                        checked={item.equipped}
                        onChange={(e) => {
                          handleItemInventoryEquip(item.id, e.target.checked);
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="flex gap-1 mt-1">
                        <Badge
                          variant="outline"
                          className="text-xs border-purple-400 text-purple-200"
                        >
                          {item.type}
                        </Badge>
                        {item.tier && (
                          <Badge
                            variant="outline"
                            className="text-xs border-yellow-400 text-yellow-200"
                          >
                            Tier {item.tier}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">{item.quantity}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        removeItemInventoryItem(item.id);
                      }}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-white">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      {item.description && (
                        <div className="text-sm text-purple-300">
                          {item.description}
                        </div>
                      )}
                      <Badge
                        variant="outline"
                        className="text-xs border-gray-400 text-gray-200 mt-1"
                      >
                        Custom
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">{item.quantity}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        removeInventoryItem(item.id);
                      }}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-purple-300 text-center py-4">
            No items in inventory
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryManager;
