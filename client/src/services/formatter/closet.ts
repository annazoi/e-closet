import { Closet } from "../../interfaces/closet";

export const formatCloset = (data: any): Closet | null => {
  if (typeof data === "string" || !data) {
    return null;
  } else {
    return {
      clothes: data.clothes,
      userId: data.userId,
    };
  }
};
