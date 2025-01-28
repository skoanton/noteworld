import { get } from 'http';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { createPassword, createUser, getUserByEmail } from '../db/users';
import dotenv from 'dotenv';
import { Role, User } from '@prisma/client';
import { parseTimeToSeconds } from '../helpers/helpers';
dotenv.config();

export async function authService(email: string, password: string | null) {

    const existingUser = await getUserByEmail(email);

    if(!existingUser) {
        throw new Error( "User not found");
    }

    if(existingUser.firstLogin) { 
        const token = await generateToken(existingUser, "15m");
        return { firstLogin: true, token: token };
    }
    
    if (!password || !(await bcryptjs.compare(password, existingUser.password!))) {
        throw new Error("Invalid password");
    }

    const token = await generateToken(existingUser);

    if(!token) {
        throw new Error("Failed to generate token");
    }


    return {token: token};
}


export async function registerService(email: string,role?:Role) {
    
    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        throw new Error("User already exists");
    }

    const newUser = await createUser(email,role);

    if (!newUser) {
        throw new Error("Failed to create user");
    }

    return newUser;

}

export async function createPasswordService(password: string, user: User) {
    const existingUser = await getUserByEmail(user.email);

    if (!existingUser) {
        throw new Error("User not found");
    }

    const updatedUser = await createPassword(password, existingUser);

    if (!updatedUser) {
        throw new Error("Failed to update user");
    }

    return updatedUser;
}

async function generateToken(existingUser:User,time:string ="1h") {

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const payload = {
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
    };

    const options: SignOptions = {
        expiresIn: parseTimeToSeconds(time)
    };

    return jwt.sign(payload, process.env.JWT_SECRET,options);
}
