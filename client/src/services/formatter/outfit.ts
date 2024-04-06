import { Outfit } from "../../interfaces/outfit";

export const formatOutfit = (data: any): Outfit => {
  return {
    id: data._id,
    clothes: data.clothes,
    colorSchema: data.colorSchema,
    rating: data.rating,
    notes: data.notes,
    userId: data.userId,
  };
};
