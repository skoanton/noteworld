import express from 'express';
import { createNewNoteController,getNoteByIdController,updateNoteController,getAllNotesController } from '../controllers/notes.controller';
const router = express.Router();


router.post("/", createNewNoteController);
router.get("/:id", getNoteByIdController);
router.patch("/:id", updateNoteController);
router.get("/", getAllNotesController);

export default router;
