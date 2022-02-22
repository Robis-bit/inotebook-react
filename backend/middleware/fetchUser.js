var jwt = require('jsonwebtoken');
const JWT_SECRET="R0bisislosser";

const fetchUser=(req,res,next)=>{

    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({ error: "please  authenticate with vaild credential"});
    }
  
    try {
        const data=jwt.verify(token, JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "please  authenticate with vaild credential"});
    }
    
}


module.exports=fetchUser;




