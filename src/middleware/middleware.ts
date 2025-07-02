import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';


export async function authenticateToken(req: any, res: Response, next: NextFunction) {

        const token = await req.cookies.jwt;
        //console.log('llego', token)

        jwt.verify(token,  process.env.JWT_SECRET as string, (err, usuario) => {
            if (err) {
                console.log(err)
                return res.status(403).json({ mensaje: 'Token no válido o expirado' });
            }
            req.usuario = usuario;
            next();
        });

};
