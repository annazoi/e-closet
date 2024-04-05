import { Image } from "./components";

export interface NewClothe {
  images: Image[];
  type: string;
  season: string[];
}

export interface Clothe {
  id: string;
  images: Image[];
  type: string;
  season: string[];
  [key: string]: any;
}

export interface AddImages {
  closetId: string;
  images: File[];
}

export interface DeleteImages {
  closetId: string;
  images: string[];
}
