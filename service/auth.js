import jwt from "jsonwebtoken";
const secret = "Avinash$1234"

export function setUser(user){

    return jwt.sign({
        _id:user.id,
        email:user.email,

    },secret);
}


export function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secret)
    }
    catch(error){
        return null;
    }
}