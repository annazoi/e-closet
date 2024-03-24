import axios from "axios";
import { API_URL } from "../constants/api";
import { Closet } from "../interfaces/closet";
import { getHeaders } from "./utils/utils";

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

export const addPhoto = async (closetId: string, payload: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/closet/${closetId}/images`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
