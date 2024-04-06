import { Clothe } from "./clothe";

export interface NewOutfit {
  clothes: string[];
  colorScheme?: string;
  rating?: number;
  notes?: string;
}

export interface Outfit {
  id: string;
  clothes: Clothe[];
  colorScheme?: string;
  rating?: number;
  notes?: string;
  [key: string]: any;
}
