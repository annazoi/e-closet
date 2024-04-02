import { Image } from "./components";

export interface Closet {
  clothes: Clothe[];
  userId: string;
}

export interface AddImages {
  closetId: string;
  images: File[];
}

export interface DeleteImages {
  closetId: string;
  images: string[];
}

export interface Clothe {
  closetId: string;
  images: Image[];
  type: string;
  season: string[];
}
