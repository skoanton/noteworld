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
exports.createNewNote = createNewNote;
exports.getNoteById = getNoteById;
exports.updateNote = updateNote;
exports.getAllNotes = getAllNotes;
const client_1 = require("@prisma/client");
const crypt_1 = require("../helpers/crypt");
const prisma = new client_1.PrismaClient();
function createNewNote(note, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryptedTitle = (0, crypt_1.encrypt)(note.title);
        const encryptedContent = note.content
            ? (0, crypt_1.encrypt)(note.content)
            : "";
        return yield prisma.note.create({
            data: {
                title: encryptedTitle,
                content: encryptedContent,
                userId: userId
            }
        });
    });
}
function getNoteById(noteId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.note.findUnique({
            where: {
                id: parseInt(noteId)
            }
        });
    });
}
function updateNote(userId, noteId, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataToUpdate = Object.assign(Object.assign({}, (updates.title && { title: (0, crypt_1.encrypt)(updates.title) })), (updates.content && { content: (0, crypt_1.encrypt)(updates.content) }));
        if (Object.keys(dataToUpdate).length === 0) {
            throw new Error("No fields to update");
        }
        console.log("Data to update", dataToUpdate);
        return yield prisma.note.update({
            where: {
                id: parseInt(noteId),
                userId: parseInt(userId)
            },
            data: dataToUpdate,
        });
    });
}
function getAllNotes(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.note.findMany({
            where: {
                userId: userId
            }
        });
    });
}
