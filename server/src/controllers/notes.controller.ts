import { Request, Response } from 'express';
import { createNewNoteService,getAllNotesService,getNoteByIdService, updateNoteService } from '../services/notes.service';


export async function createNewNoteController(req: any, res: Response) : Promise<any> {
    try {
        const { title, content } = req.body;
        console.log("Title and content",title,content);
        console.log("User",req.user);
        const user= await req.user;
        const userId = user.userId;
        if (!title) {
            return res.status(400).json({ message: "Title are required" });
        }
        
        const note = await createNewNoteService({ title, content }, userId);

        return res.status(201).json({note});
    } catch (error:any) {
    
        return res.status(500).json({ error: error.message });
    }
}


export async function getNoteByIdController(req: Request, res: Response) : Promise<any> {
    try {
        const noteId = req.params.id;
        const note = await getNoteByIdService(noteId);
        return res.status(200).json({note});
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
}


export async function updateNoteController(req: any, res: Response) : Promise<any> {

    const user= await req.user;
    const userId = user.userId;

    try {
        const noteId = req.params.id;
        const { title, content } = req.body;

        const note = await updateNoteService(userId,noteId, { ...(title && { title }), ...(content && { content }) });
        return res.status(200).json({note});
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getAllNotesController(req: any, res: Response) : Promise<any> {
    try {
        const user= await req.user;
        const userId = user.userId;
        const notes = await getAllNotesService(userId);

        return res.status(200).json({notes});
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
}