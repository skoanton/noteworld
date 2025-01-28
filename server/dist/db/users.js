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
exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser;
exports.createPassword = createPassword;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    });
}
function createUser(email_1) {
    return __awaiter(this, arguments, void 0, function* (email, role = client_1.Role.USER) {
        if (!Object.values(client_1.Role).includes(role)) {
            throw new Error(`Invalid role: ${role}`);
        }
        return prisma.user.create({
            data: {
                email,
                role
            },
        });
    });
}
function createPassword(password, user) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: yield bcryptjs_1.default.hash(password, 10),
                firstLogin: false,
            },
        });
    });
}
