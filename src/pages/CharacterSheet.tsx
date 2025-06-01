
import { useState, useEffect, useRef, JSX } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import { ArrowLeft, Heart, Sword, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "lodash";
import { Character, CharacterWithRelations, Json } from "@/lib/types";
import {
  getCharacterById,
  updateCharacter,
  getItemsByIds,
} from "@/integrations/supabase/helpers";
import ItemSearch from "@/components/ItemSearch";

interface InventoryItem extends Json {
  id: string;
  name: string;
  quantity: number;
  description?: string;
}

interface ItemInventoryEntry {
  itemId: number;
  quantity: number;
}

interface ItemWithQuantity {
  id: number;
  name: string;
  type: string;
  tier: number;
  quantity: number;
  description?: string;
}

const CharacterSheet = (): JSX.Element => {
  const { characterId } = useParams();
  const { user } = useAuth();
  const _navigate = useNavigate();
  const { toast } = useToast();

  const [currentHp, setCurrentHp] = useState(0);
  const [maxHp, setMaxHp] = useState(0);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    description: "",
  });
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [itemsInventory, setItemsInventory] = useState<ItemWithQuantity[]>([]);
  const [character, setCharacter] = useState<CharacterWithRelations | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchCharacterById = async (id: string) => {
    setIsLoading(true);
    const data = await getCharacterById(id);
    if (data) {
      setCharacter(data);
    }
    setIsLoading(false);
  };

  const loadItemsInventory = async (itemsInventoryData: ItemInventoryEntry[]) => {
    if (!itemsInventoryData || itemsInventoryData.length === 0) {
      setItemsInventory([]);
      return;
    }

    const itemIds = itemsInventoryData.map(entry => entry.itemId);
    const items = await getItemsByIds(itemIds);
    
    const itemsWithQuantity = items.map(item => {
      const inventoryEntry = itemsInventoryData.find(entry => entry.itemId === item.id);
      return {
        ...item,
        quantity: inventoryEntry?.quantity || 1
      };
    });

    setItemsInventory(itemsWithQuantity);
  };

  useEffect(() => {
    if (characterId) {
      void fetchCharacterById(characterId);
    }
  }, [characterId, user]);

  useEffect(() => {
    if (character) {
      setCurrentHp(character.current_hp ?? 0);
      setMaxHp(character.max_hp ?? 0);
      setInventory((character.inventory ?? []) as unknown as InventoryItem[]);
      
      // Load items from items_inventory
      const itemsInventoryData = (character.items_inventory ?? []) as unknown as ItemInventoryEntry[];
      void loadItemsInventory(itemsInventoryData);
    }
  }, [character]);

  const updateCharacterData = async (updates: Partial<Character>) => {
    if (!characterId) {
      toast({
        title: "Error",
        description: "No character ID found.",
        variant: "destructive",
      });
      return;
    }

    const updatedCharacter = await updateCharacter(characterId, updates);
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
      toast({
        title: "Character updated",
        description: "Your character has been saved.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update character.",
        variant: "destructive",
      });
    }
  };

  const debouncedUpdate = useRef(
    debounce((data: { current_hp?: number; max_hp?: number }) => {
      void updateCharacterData(data);
    }, 500)
  ).current;

  const handleHpChange = (type: "current" | "max", value: number) => {
    if (type === "current") {
      const newCurrentHp = Math.max(0, Math.min(value, maxHp));
      setCurrentHp(newCurrentHp);
      debouncedUpdate({ current_hp: newCurrentHp });
    } else {
      const newMaxHp = Math.max(1, value);
      setMaxHp(newMaxHp);
      setCurrentHp(Math.min(currentHp, newMaxHp));
      debouncedUpdate({
        max_hp: newMaxHp,
        current_hp: Math.min(currentHp, newMaxHp),
      });
    }
  };

  const addInventoryItem = () => {
    if (!newItem.name.trim()) return;

    const item: InventoryItem = {
      id: crypto.randomUUID(),
      ...newItem,
    };

    const updatedInventory = [...inventory, item];
    setInventory(updatedInventory);
    void updateCharacterData({ inventory: updatedInventory });
    setNewItem({ name: "", quantity: 1, description: "" });
  };

  const handleItemSelect = (item: { id: number; name: string; type: string; tier: number }, quantity: number) => {
    const currentItemsInventory = (character?.items_inventory ?? []) as unknown as ItemInventoryEntry[];
    
    // Check if item already exists
    const existingItemIndex = currentItemsInventory.findIndex(entry => entry.itemId === item.id);
    
    let updatedItemsInventory: ItemInventoryEntry[];
    
    if (existingItemIndex >= 0) {
      // Update existing item quantity
      updatedItemsInventory = [...currentItemsInventory];
      updatedItemsInventory[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      updatedItemsInventory = [...currentItemsInventory, { itemId: item.id, quantity }];
    }

    void updateCharacterData({ items_inventory: updatedItemsInventory });
    void loadItemsInventory(updatedItemsInventory);
  };

  const removeInventoryItem = (itemId: string) => {
    const updatedInventory = inventory.filter((item) => item.id !== itemId);
    setInventory(updatedInventory);
    void updateCharacterData({ inventory: updatedInventory });
  };

  const removeItemInventoryItem = (itemId: number) => {
    const currentItemsInventory = (character?.items_inventory ?? []) as unknown as ItemInventoryEntry[];
    const updatedItemsInventory = currentItemsInventory.filter(entry => entry.itemId !== itemId);
    
    void updateCharacterData({ items_inventory: updatedItemsInventory });
    void loadItemsInventory(updatedItemsInventory);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-purple-200 py-8">
            Loading character...
          </p>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-purple-200 py-8">
            Character not found.
          </p>
          <div className="text-center">
            <Link to="/dashboard">
              <Button
                variant="outline"
                className="border-purple-400 text-purple-100 "
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button
                variant="outline"
                className="border-purple-400 text-purple-100 "
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white">
                {character.name}
              </h1>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">Level {character.level}</Badge>
                <Badge
                  variant="outline"
                  className="border-purple-400 text-purple-200"
                >
                  {character.ancestry?.name ?? "Unknown"}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-purple-400 text-purple-200"
                >
                  {character.class?.name ?? "Unknown"}
                  {character.subclass ? ` - (${character.subclass.name})` : ""}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Character Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* HP and Combat Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  Health & Combat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="current-hp" className="text-white">
                      Current HP
                    </Label>
                    <Input
                      id="current-hp"
                      type="number"
                      min="0"
                      max={maxHp}
                      value={currentHp}
                      onChange={(e) => {
                        handleHpChange(
                          "current",
                          parseInt(e.target.value) || 0
                        );
                      }}
                      className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-hp" className="text-white">
                      Max HP
                    </Label>
                    <Input
                      id="max-hp"
                      type="number"
                      min="1"
                      value={maxHp}
                      onChange={(e) => {
                        handleHpChange("max", parseInt(e.target.value) || 1);
                      }}
                      className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-green-300">Hope</div>
                    <div className="text-2xl font-bold text-white">
                      {character.hope}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-red-300">Stress</div>
                    <div className="text-2xl font-bold text-white">
                      {character.stress}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attributes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sword className="w-5 h-5 text-yellow-400" />
                  Attributes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(character.stats).map(([stat, value]) => (
                    <div key={stat} className="text-center">
                      <div className="text-sm text-purple-300 capitalize">
                        {stat}
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Background */}
            {character.background && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-white">Background</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200">{character.background}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Inventory */}
          <div className="space-y-6">
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
                      <SheetTitle className="text-white">
                        Add Inventory Item
                      </SheetTitle>
                      <SheetDescription className="text-purple-200">
                        Search for items from the database or add custom items to your character's inventory.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 mt-6">
                      <ItemSearch onItemSelect={handleItemSelect} />
                      
                      <div className="border-t border-purple-500/30 pt-4">
                        <h4 className="text-white font-medium mb-3">Or add custom item:</h4>
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
                {(itemsInventory.length > 0 || inventory.length > 0) ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-purple-200">Item</TableHead>
                        <TableHead className="text-purple-200">Qty</TableHead>
                        <TableHead className="text-purple-200 w-8"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {itemsInventory.map((item) => (
                        <TableRow key={`item-${item.id}`}>
                          <TableCell className="text-white">
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="flex gap-1 mt-1">
                                <Badge variant="outline" className="text-xs border-purple-400 text-purple-200">
                                  {item.type}
                                </Badge>
                                {item.tier && (
                                  <Badge variant="outline" className="text-xs border-yellow-400 text-yellow-200">
                                    Tier {item.tier}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-white">
                            {item.quantity}
                          </TableCell>
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
                              <Badge variant="outline" className="text-xs border-gray-400 text-gray-200 mt-1">
                                Custom
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-white">
                            {item.quantity}
                          </TableCell>
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

            {/* Character Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Character Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="text-purple-300">Community:</span>
                  <span className="text-white ml-2">
                    {character.community?.name ?? "Unknown"}
                  </span>
                </div>
                <div>
                  <span className="text-purple-300">Level:</span>
                  <span className="text-white ml-2">{character.level}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;
