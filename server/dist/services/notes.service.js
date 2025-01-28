"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewNoteService = createNewNoteService;
exports.getNoteByIdService = getNoteByIdService;
exports.updateNoteService = updateNoteService;
exports.getAllNotesService = getAllNotesService;
const notes_1 = require("../db/notes");
const crypt_1 = require("../helpers/crypt");
function createNewNoteService(note, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const newNote = yield (0, notes_1.createNewNote)(note, userId);
        return newNote;
    });
}
function getNoteByIdService(noteId) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = yield (0, notes_1.getNoteById)(noteId);
        if (!note) {
            throw new Error("Note not found");
        }
        const decryptedNote = {
            title: (0, crypt_1.decrypt)(note.title),
            content: note.content ? (0, crypt_1.decrypt)(note.content) : "",
            id: note.id.toString(),
            updatedAt: note.updatedAt,
            createdAt: note.createdAt
        };
        return decryptedNote;
    });
}
function updateNoteService(userId, noteId, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = yield (0, notes_1.getNoteById)(noteId);
        if (!note) {
            throw new Error("Note not found");
        }
        const updatedNote = yield (0, notes_1.updateNote)(userId, noteId, updates);
        const decryptedNote = {
            title: (0, crypt_1.decrypt)(updatedNote.title),
            content: updatedNote.content ? (0, crypt_1.decrypt)(updatedNote.content) : "",
            id: updatedNote.id.toString(),
            updatedAt: note.updatedAt,
            createdAt: note.createdAt
        };
        return decryptedNote;
    });
}
function getAllNotesService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const allNotes = yield (0, notes_1.getAllNotes)(userId);
        const decryptedNotes = allNotes.map((note) => {
            return {
                title: (0, crypt_1.decrypt)(note.title),
                content: note.content ? (0, crypt_1.decrypt)(note.content) : "",
                id: note.id.toString(),
                updatedAt: note.updatedAt.toLocaleDateString(),
                createdAt: note.createdAt
            };
        });
        const sortedNotes = decryptedNotes.sort((a, b) => {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });
        return sortedNotes;
    });
}
