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
exports.createNewNoteController = createNewNoteController;
exports.getNoteByIdController = getNoteByIdController;
exports.updateNoteController = updateNoteController;
exports.getAllNotesController = getAllNotesController;
const notes_service_1 = require("../services/notes.service");
function createNewNoteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, content } = req.body;
            console.log("Title and content", title, content);
            console.log("User", req.user);
            const user = yield req.user;
            const userId = user.userId;
            if (!title) {
                return res.status(400).json({ message: "Title are required" });
            }
            const note = yield (0, notes_service_1.createNewNoteService)({ title, content }, userId);
            return res.status(201).json({ note });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function getNoteByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const noteId = req.params.id;
            const note = yield (0, notes_service_1.getNoteByIdService)(noteId);
            return res.status(200).json({ note });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function updateNoteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield req.user;
        const userId = user.userId;
        try {
            const noteId = req.params.id;
            const { title, content } = req.body;
            const note = yield (0, notes_service_1.updateNoteService)(userId, noteId, Object.assign(Object.assign({}, (title && { title })), (content && { content })));
            return res.status(200).json({ note });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function getAllNotesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield req.user;
            const userId = user.userId;
            const notes = yield (0, notes_service_1.getAllNotesService)(userId);
            return res.status(200).json({ notes });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
