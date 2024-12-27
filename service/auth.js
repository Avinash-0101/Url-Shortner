import jwt from "jsonwebtoken";

const secret = "Avinash$1234";


export function setUser(user){
    // const { _id, name, email } = user
    // console.log("user in setUser",name)

    const payload={
        _id:user.id,
        name:user.name,
        email:user.email,
    };

    const token= jwt.sign(payload,secret, {expiresIn:'28h'});
    
   return token;
}


export function getUser(token){
    if(!token) return null;
    try{
        const decoded= jwt.verify(token,secret);
          // Return user details from the decoded token
        return { id: decoded._id, name: decoded.name, email: decoded.email }; 
      
        
    }
    catch(error){
        console.log("error while jwt verification", error);
        return null;
    }
}