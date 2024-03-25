import axios from "axios";
import { API_URL } from "../constants/api";
import { AddImages, Closet, DeleteImages } from "../interfaces/closet";
import { getAuthHeaders, getHeaders } from "./utils/utils";

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

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const addPhotos = async (payload: AddImages) => {
  try {
    const { closetId, images } = payload;
    const response = await axios.post(
      `${API_URL}/closet/${closetId}/images`,
      { images },
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteImage = async (closetId: string, imageId: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/closet/${closetId}/images/${imageId}`,
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
