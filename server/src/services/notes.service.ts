import { get } from "http";
import { createNewNote, getAllNotes, getNoteById, updateNote } from "../db/notes";
import { decrypt } from "../helpers/crypt";

export async function createNewNoteService(note: { title: string, content: string }, userId: number) {
    
    const newNote = await createNewNote(note, userId);
    return newNote;

}

export async function getNoteByIdService(noteId: string) {
   const note = await getNoteById(noteId);

   if(!note) {
         throw new Error("Note not found");
   }

    const decryptedNote = {
        title: decrypt(note.title),
        content: note.content ? decrypt(note.content) : "",
        id: note.id.toString(),
        updatedAt: note.updatedAt,
        createdAt: note.createdAt
    }

    return decryptedNote;
}

export async function updateNoteService(userId:string,noteId: string, updates: { title?: string; content?: string }) {
    const note = await getNoteById(noteId);

    if(!note) {
        throw new Error("Note not found");
    }

    const updatedNote = await updateNote(userId,noteId, updates);

    const decryptedNote = {
        title: decrypt(updatedNote.title),
        content: updatedNote.content ? decrypt(updatedNote.content) : "",
        id: updatedNote.id.toString(),
        updatedAt: note.updatedAt,
        createdAt: note.createdAt
    }

    return decryptedNote;
}

export async function getAllNotesService(userId: number) {

    const allNotes = await getAllNotes(userId);

    const decryptedNotes = allNotes.map((note) => {
        return {
            title: decrypt(note.title),
            content: note.content ? decrypt(note.content) : "",
            id: note.id.toString(),
            updatedAt: note.updatedAt.toLocaleDateString(),
            createdAt: note.createdAt
        }

    });

    const sortedNotes = decryptedNotes.sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return sortedNotes;
}