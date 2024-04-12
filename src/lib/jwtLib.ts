import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { deleteCookie } from './cookieLib';


export const verifyToken = (token: string, secret_key: string) => {
    //Todo : verfiy the token if it`s edit
    const decodedToken = jwt.decode(token) as { role: string, exp: number };
    if (Date.now() >= decodedToken.exp * 1000) {
        deleteCookie("token");
        return false;
    }
    console.log(decodedToken.role);
    if (decodedToken.role !== 'admin') {
        console.log("not admin");
        deleteCookie("token");
        return false;
    }
    return true;
}