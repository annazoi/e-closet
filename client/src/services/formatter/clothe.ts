import { Clothe } from "../../interfaces/clothe";
import { formatUser } from "./user";

export const formatClothe = (data: any): Clothe => {
  return {
    id: data._id,
    images: data.images,
    type: data.type,
    season: data.season,
    user: formatUser(data.userId),
  };
};
