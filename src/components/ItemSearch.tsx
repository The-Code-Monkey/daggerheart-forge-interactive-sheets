import { useState, useEffect, useCallback, JSX } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { debounce } from "lodash";
import { searchItems } from "@/integrations/supabase/helpers";
import { Search, Plus } from "lucide-react";

interface Item {
  id: number;
  name: string;
  type: string;
  tier: number;
  description?: string;
}

interface ItemSearchProps {
  onItemSelect: (item: Item, quantity: number) => void;
}

const ItemSearch = ({ onItemSelect }: ItemSearchProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState(1);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      const results = await searchItems(query);
      setSearchResults(results as Item[]);
      setIsSearching(false);
    }, 300),
    []
  );

  useEffect(() => {
    void debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleItemSelect = (item: Item) => {
    setSelectedItem(item);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleAddItem = () => {
    if (selectedItem && quantity > 0) {
      onItemSelect(selectedItem, quantity);
      setSelectedItem(null);
      setSearchQuery("");
      setQuantity(1);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="item-search" className="text-white">
          Search Items
        </Label>
        <div className="relative mt-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="item-search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="bg-slate-800/50 border-purple-500/50 text-white pl-10"
            placeholder="Search for items..."
          />
        </div>

        {isSearching && (
          <div className="text-purple-300 text-sm mt-1">Searching...</div>
        )}

        {searchResults.length > 0 && (
          <div className="mt-2 max-h-48 overflow-y-auto border border-purple-500/30 rounded-md bg-slate-800/70">
            {searchResults.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleItemSelect(item);
                }}
                className="w-full p-2 text-left hover:bg-purple-500/20 border-b border-purple-500/20 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{item.name}</div>
                    {item.type && (
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
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="p-3 border border-purple-500/30 rounded-md bg-slate-800/50">
          <div className="text-white font-medium mb-2">{selectedItem.name}</div>
          <div className="flex gap-2 mb-2">
            <Badge
              variant="outline"
              className="border-purple-400 text-purple-200"
            >
              {selectedItem.type}
            </Badge>
            {selectedItem.tier && (
              <Badge
                variant="outline"
                className="border-yellow-400 text-yellow-200"
              >
                Tier {selectedItem.tier}
              </Badge>
            )}
          </div>

          <div>
            <Label htmlFor="item-quantity" className="text-white">
              Quantity
            </Label>
            <Input
              id="item-quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => {
                setQuantity(parseInt(e.target.value) || 1);
              }}
              className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
            />
          </div>

          <Button
            onClick={handleAddItem}
            className="w-full mt-3 bg-yellow-500 hover:bg-yellow-600 text-black"
            disabled={quantity < 1}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add to Inventory
          </Button>
        </div>
      )}
    </div>
  );
};

export default ItemSearch;
