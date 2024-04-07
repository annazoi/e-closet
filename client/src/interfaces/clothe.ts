import { Image } from "./components";
import { User } from "./user";

export interface NewClothe {
  images: Image[];
  type: string;
  season: string[];
}

export interface Clothe {
  id: string;
  images: ClotheImage[];
  type: string;
  season: string[];
  user: User;
}

export interface AddImages {
  closetId: string;
  images: File[];
}

export interface DeleteImages {
  closetId: string;
  images: string[];
}

export interface ClotheImage {
  id: string;
  file: string;
}
