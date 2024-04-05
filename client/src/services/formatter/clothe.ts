import { Clothe } from "../../interfaces/clothe";

export const formatClothe = (data: any): Clothe => {
  return {
    id: data._id,
    images: data.images,
    type: data.type,
    season: data.season,
    userId: data.userId,
  };
};
