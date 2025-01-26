import { Note } from "@/types/general";
import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_URL;

export const createNote = async (note: { title: string, content: string }) => {
    try {
        const token = localStorage.getItem("token");
      const response = await axios.post(`${BASE_URL}/notes`, note, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });
        console.log("Creating new note ",response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const saveNote = async (noteId:string, updates: Partial<Note>) => {
    try {
        const token = localStorage.getItem("token");
      const response = await axios.patch(`${BASE_URL}/notes/${noteId}`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });

        console.log("Updating note ",response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteNote = async (noteId:number) => {
    try {
        const token = localStorage.getItem("token");
      const response = await axios.delete(`${BASE_URL}/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getNoteById = async (noteId:string) => {
    try {
        const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}