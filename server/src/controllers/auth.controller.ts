import { Request, Response } from "express";
import { authService, registerService,createPasswordService } from "../services/auth.service";

export async function authController(req: Request, res: Response) {
  const { email, password } = req.body;

    if(!email) {
        res.status(400).json({ message: "Email are required" });
        return;
    }

  try {
        const auth = await authService(email, password);
        res.status(200).json({auth}) 

  } catch (error:any) {

        if(error.message === "User not found") {
            res.status(404).json({ error:"INVALID_USER", message: error.message });
            return;
        }

        else if(error.message === "Invalid password") {
            res.status(401).json({ error:"INVALID_PASSWORD", message: error.message });
            return;
        }

        console.error(error);
        res.status(500).json({ error: "INTERAL_SERVER_ERROR",  message: error.message });
  }

}

export async function registerController(req: Request, res: Response) {
    const { email, role } = req.body;
    
        if(!email  || !role) {
            res.status(400).json({ message: "Email and role are required" });
            return;
        }
    
    try {
            const user = await registerService(email,role);
            res.status(200).json({user});  
    
    } catch (error:any) {
            if(error.message === "User already exists") {
                res.status(409).json({error:"USER_EXISTS", message: error.message });
                return;
            }
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
    }
}

export async function createPasswordController(req: any, res: Response) {

    const { password } = req.body;
    
        if(!password) {
            res.status(400).json({ message: "Password is required" });
            return;
        }
    
        const user = await req.user;
    try {
            const newUser = await createPasswordService(password,user);
            res.status(200).json({newUser});
    
    } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
    }
}