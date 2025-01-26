import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";


export async function authenticate (req:any, res:Response, next:NextFunction):Promise<any> {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
        
    }
    try {
        const decoded = verifyToken(token);

        if(!decoded) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

       req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}


export function authorizeRoles(requiredRole: string) {
    return async (req: any, res: Response, next: NextFunction) => {
        const user = await req.user; 
        if (!user || user.role !== requiredRole) {
             res.status(403).json({ message: 'Access denied' });
             return;
        }
        next();
    };
}

async function verifyToken(token:string) {

    if(!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    return jwt.verify(token, process.env.JWT_SECRET);
}