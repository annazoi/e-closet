import { Clothe } from "./clothe";

export interface NewOutfit {
  clothes: string[];
  colorSchema?: string;
  rating?: number;
  notes?: string;
}

export interface Outfit {
  id: string;
  clothes: Clothe[];
  colorSchema?: string;
  rating?: number;
  notes?: string;
  [key: string]: any;
}
