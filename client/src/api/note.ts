import { DEFAULT_HEADERS } from "@/consts/consts";
import { Note } from "@/types/general";
import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_URL;

export const createNote = async (note: { title: string, content: string }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/notes`, note, {
      headers: DEFAULT_HEADERS(token),
    });
    console.log("Creating new note ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export const saveNote = async (noteId: string, updates: Partial<Note>) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(`${BASE_URL}/notes/${noteId}`, updates, {
      headers: DEFAULT_HEADERS(token),
    });

    console.log("Updating note ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteNote = async (noteId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/notes/${noteId}`, {
      headers: DEFAULT_HEADERS(token),
    });

    if (response.status === 204) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
}

export const getNoteById = async (noteId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/notes/${noteId}`, {
      headers: DEFAULT_HEADERS(token),
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getAllNotes = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/notes`, {
      headers: DEFAULT_HEADERS(token),
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}