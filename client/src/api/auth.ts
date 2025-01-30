import { DEFAULT_HEADERS } from '@/consts/consts';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
export const login = async (email: string, password: string | null) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    }, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      }
    });

    const token = response.data.auth.token;
    localStorage.setItem("token", token);
    return response.data.auth;
  } catch (error: any) {

    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { error: "UNKNOWN_ERROR", message: "An unknown error occurred. Please try again." };
  }
};

export const register = async (email: string, role: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      email,
      role,
    }, {
      headers: DEFAULT_HEADERS(token),
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { error: "UNKNOWN_ERROR", message: "An unknown error occurred. Please try again." };
  }
};

export const createPassword = async (password: string) => {

  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(`${BASE_URL}/auth/create-password`, {
      password,
    }, {
      headers: DEFAULT_HEADERS(token),
    });
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { error: "UNKNOWN_ERROR", message: "An unknown error occurred. Please try again." };
  }
}