import { API_BASE_URL } from "../const/api";
import Service from "./lib/services";

export const login = async (data) => {
  try {
    return await Service.post(`${API_BASE_URL}/auth/login`, data); //,{ encode: false }));
  } catch (error) {
    console.log("auth error", error);
    throw error;
  }
};

export const signup = async (data) => {
  try {
    return await Service.post(`${API_BASE_URL}/auth/signup`, data); //,{ encode: false }));
  } catch (error) {
    console.log("auth error", error);
    throw error;
  }
};
