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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = authService;
exports.registerService = registerService;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = require("../db/users");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function authService(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield (0, users_1.getUserByEmail)(email);
        if (!existingUser) {
            throw new Error("User not found");
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        const token = generateToken(existingUser);
        if (!token) {
            throw new Error("Failed to generate token");
        }
        return token;
    });
}
function registerService(email, password, role) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const newUser = yield (0, users_1.createUser)(email, password, role);
        if (!newUser) {
            throw new Error("Failed to create user");
        }
        return newUser;
    });
}
function generateToken(existingUser) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        const expires_in = "1h"; // eller "60m"
        return jsonwebtoken_1.default.sign({ userId: existingUser.id, email: existingUser.email, role: existingUser.role }, process.env.JWT_SECRET, { expiresIn: expires_in });
    });
}
