import {Request, Response} from 'express'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import Roblox from '../models/Roblox'
import Games1 from '../models/Games1'
import Games2 from '../models/Games2'
import Games3 from '../models/Games3'


const bcrypt = require('bcrypt');

dotenv.config()


export const ping = (req: Request, res: Response) => {
    res.json({pong: true})
}

export const register = async (req: Request, res: Response) => {
    if(req.body.email && req.body.user && req.body.passwordd) {
        let {email, user, passwordd, day, month, year, gender} = req.body;
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(passwordd, 10)
        
        let hasEmail = await Roblox.findOne({email: email});

        if(hasEmail) {
            res.json({emailERROR: 'Email já cadastrado'})
        } else {
            let newUser = await Roblox.create({email, user, password, day, month, year, gender});
            res.status(201);
            res.json({id: newUser._id, email: newUser.email });
        }
        
    }
}

export const login = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let email: string = req.body.email
        let password: string = req.body.password

        const user = await Roblox.findOne({
            email: email,
        });
        
        if(user) {
            
            if (await bcrypt.compare(password, user?.password))  {
                const token = JWT.sign(
                    {id: user._id, email: user.email},
                    process.env.JWT_SECRET_KEY as string,
                    {expiresIn: '1h'}
                )
                res.json({status: true, user, token});
            } else {
                res.json({status: false})
            }
        }
        if(!user) {
            res.json({status: false})
        }
    } else {
        res.json({status: false})
    }
}

export const request = async (req: Request, res: Response) => {
    if(req.body.email) {
        let email: string = req.body.email
    
        let user = await Roblox.findOne({
            email: email
        });

        res.json({user})
    }
}

// GAMES ---------------------------------------- // 

export const requestGames1 = async (req: Request, res: Response) => {
    let users = await Games1.find({})
    res.json({users})
}
export const requestGames2 = async (req: Request, res: Response) => {
    let users = await Games2.find({})
    res.json({users})
}
export const requestGames3 = async (req: Request, res: Response) => {
    let users = await Games3.find({})
    res.json({users})
}




/* 

if(user) {
            const token = JWT.sign(
                {id: user._id, email: user.email},
                process.env.JWT_SECRET_KEY as string,
                {expiresIn: '1h'}
            )
            res.json({status: true, user, token});
            return;
        } else {
            res.json({status: false})
        }

*/