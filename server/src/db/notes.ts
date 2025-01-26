import { PrismaClient } from "@prisma/client";
import { encrypt } from "../helpers/crypt";

const prisma = new PrismaClient();


export async function createNewNote(note: { title: string, content: string }, userId: number) {

    const encryptedTitle = encrypt(note.title);
    const encryptedContent = note.content
    ? encrypt(note.content) 
    : ""; 

    return await prisma.note.create({
        data: {
            title: encryptedTitle,
            content: encryptedContent,
            userId: userId
        }
    });
}

export async function getNoteById(noteId: string) {
    return await prisma.note.findUnique({
        where: {
            id: parseInt(noteId)
        }
    });
}

export async function updateNote(userId:string,noteId: string, updates: { title?: string; content?: string }) {

    const dataToUpdate: any = {
        ...(updates.title && { title: encrypt(updates.title) }), 
        ...(updates.content && { content: encrypt(updates.content) }), 
    };

    if (Object.keys(dataToUpdate).length === 0) {
        throw new Error("No fields to update");
    }
    console.log("Data to update",dataToUpdate);
    return await prisma.note.update({
        where: {
            id: parseInt(noteId),
            userId: parseInt(userId)
        },
        data: dataToUpdate,
    });
}

export async function getAllNotes(userId: number) {
    return await prisma.note.findMany({
        where: {
            userId: userId
        }
    });
}