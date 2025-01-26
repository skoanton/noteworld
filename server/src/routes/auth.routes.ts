import express from 'express';
import { authController, registerController,createPasswordController } from '../controllers/auth.controller';
import { authenticate, authorizeRoles } from '../middleware/middleware';
import { Role } from '@prisma/client';

const router = express.Router();

router.post("/login",authController);
router.post("/register",authenticate,authorizeRoles(Role.ADMIN), registerController);
router.post("/create-password",authenticate, createPasswordController);

export default router;