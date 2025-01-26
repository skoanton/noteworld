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
exports.authController = authController;
exports.registerController = registerController;
const auth_service_1 = require("../services/auth.service");
function authController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        try {
            const token = yield (0, auth_service_1.authService)(email, password);
            res.status(200).json({ token });
        }
        catch (error) {
            if (error.message === "User not found") {
                res.status(404).json({ error: "INVALID_USER", message: error.message });
                return;
            }
            else if (error.message === "Invalid password") {
                res.status(401).json({ error: "INVALID_PASSWORD", message: error.message });
                return;
            }
            console.error(error);
            res.status(500).json({ error: "INTERAL_SERVER_ERROR", message: error.message });
        }
    });
}
function registerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        try {
            const user = yield (0, auth_service_1.registerService)(email, password, role);
            res.status(200).json({ user });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
