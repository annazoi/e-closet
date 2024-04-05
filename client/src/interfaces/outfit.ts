import { Clothe } from "./clothe";

export interface NewOutfit {
  head?: string;
  shirt: string;
  pant: string;
  shoes: string;
  colorSchema?: string;
  rating?: number;
  notes?: string;
}

export interface Outfit {
  id: string;
  head?: Clothe;
  shirt: Clothe;
  pant: Clothe;
  shoes: Clothe;
  colorSchema?: string;
  rating?: number;
  notes?: string;
  [key: string]: any;
}
