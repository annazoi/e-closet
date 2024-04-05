import { Outfit } from "../../interfaces/outfit";

export const formatOutfit = (data: any): Outfit => {
  return {
    id: data._id,
    head: data.head,
    shirt: data.shirt,
    pant: data.pant,
    shoes: data.shoes,
    colorSchema: data.colorSchema,
    rating: data.rating,
    notes: data.notes,
    userId: data.userId,
  };
};
