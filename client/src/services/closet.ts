import axios from "axios";
import { API_URL } from "../constants/api";
import { AddImages, Closet, Clothe, DeleteImages } from "../interfaces/closet";
import { getAuthHeaders, getHeaders } from "./utils/utils";
import { formatCloset } from "./formatter/closet";

export const createCloset = async (payload: Closet) => {
  try {
    const response = await axios.post(
      `${API_URL}/closet`,
      payload,
      getHeaders()
    );

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getCloset = async (closetId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/closet/${closetId}`,
      getHeaders()
    );

    const formattedData = formatCloset(response.data);

    return formattedData;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const addClothes = async (payload: Clothe) => {
  try {
    const { closetId, images, type, season } = payload;
    const response = await axios.post(
      `${API_URL}/closet/${closetId}/clothes`,
      { images, type, season },

      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteClothe = async (closetId: string, imageId: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/closet/${closetId}/clothes/${imageId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
// export const deleteImages = async (payload: DeleteImages) => {
//   try {
//     const { closetId, images } = payload;
//     const response = await axios.patch(
//       `${API_URL}/closet/${closetId}/images`,
//       { images },
//       getAuthHeaders()
//     );

//     return response.data;
//   } catch (error: any) {
//     throw error.response.data;
//   }
// };
