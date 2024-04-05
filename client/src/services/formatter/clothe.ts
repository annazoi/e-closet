import { Clothe } from "../../interfaces/closet";

export const formatClothe = (data: any): Clothe | null => {
  if (typeof data === "string" || !data) {
    return null;
  } else {
    return {
      id: data._id,
      images: data.images,
      type: data.type,
      season: data.season,
      userId: data.userId,
    };
  }
};
