import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";
type AutoHeader = string

interface Decoded {
    username: string;
    roles: string[];
}

interface DecodedToken extends JwtPayload {
    iat: number;
    exp: number;
    UserInfo: Decoded;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: string;
        roles?: string[];
    }
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader: AutoHeader | undefined = req.headers.authorization || req.headers.Authorization as string | undefined;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        (err: VerifyErrors | null, decoded: DecodedToken | undefined) => {
            if (err || !decoded) return res.status(403).json({ message: 'Forbidden' })


            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )
}

export default verifyJWT