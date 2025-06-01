
import { Json } from "@/lib/types";

export interface InventoryItem extends Json {
  id: string;
  name: string;
  quantity: number;
  description?: string;
}

export interface ItemInventoryEntry {
  itemId: number;
  quantity: number;
}

export interface ItemWithQuantity {
  id: number;
  name: string;
  type: string;
  tier: number;
  quantity: number;
  description?: string;
}
