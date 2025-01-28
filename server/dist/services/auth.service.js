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
exports.createPasswordService = createPasswordService;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_1 = require("../db/users");
const dotenv_1 = __importDefault(require("dotenv"));
const helpers_1 = require("../helpers/helpers");
dotenv_1.default.config();
function authService(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield (0, users_1.getUserByEmail)(email);
        if (!existingUser) {
            throw new Error("User not found");
        }
        if (existingUser.firstLogin) {
            const token = yield generateToken(existingUser, "15m");
            return { firstLogin: true, token: token };
        }
        if (!password || !(yield bcryptjs_1.default.compare(password, existingUser.password))) {
            throw new Error("Invalid password");
        }
        const token = yield generateToken(existingUser);
        if (!token) {
            throw new Error("Failed to generate token");
        }
        return { token: token };
    });
}
function registerService(email, role) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const newUser = yield (0, users_1.createUser)(email, role);
        if (!newUser) {
            throw new Error("Failed to create user");
        }
        return newUser;
    });
}
function createPasswordService(password, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield (0, users_1.getUserByEmail)(user.email);
        if (!existingUser) {
            throw new Error("User not found");
        }
        const updatedUser = yield (0, users_1.createPassword)(password, existingUser);
        if (!updatedUser) {
            throw new Error("Failed to update user");
        }
        return updatedUser;
    });
}
function generateToken(existingUser_1) {
    return __awaiter(this, arguments, void 0, function* (existingUser, time = "1h") {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        const payload = {
            userId: existingUser.id,
            email: existingUser.email,
            role: existingUser.role,
        };
        const options = {
            expiresIn: (0, helpers_1.parseTimeToSeconds)(time)
        };
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options);
    });
}
