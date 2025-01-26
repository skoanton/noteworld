"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const middleware_1 = require("../middleware/middleware");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/login", auth_controller_1.authController);
router.post("/register", middleware_1.authenticate, (0, middleware_1.authorizeRoles)(client_1.Role.ADMIN), auth_controller_1.registerController);
exports.default = router;
