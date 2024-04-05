import axios from "axios";
import { API_URL } from "../constants/api";
import { getHeaders } from "./utils/utils";
import { NewOutfit } from "../interfaces/outfit";
import { formatOutfit } from "./formatter/outfit";

export const createOutfit = async (payload: NewOutfit) => {
  try {
    const response = await axios.post(
      `${API_URL}/outfits`,
      payload,
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getOutfits = async (query: { [key: string]: string } = {}) => {
  try {
    const response = await axios.get(
      `${API_URL}/outfits/?${new URLSearchParams(query).toString()}`,
      getHeaders()
    );
      
    const formattedData = response.data.map((outfit: any) =>
      formatOutfit(outfit)
    );
    return formattedData;
  } catch (error: any) {
    throw error.response.data;
  }
};
