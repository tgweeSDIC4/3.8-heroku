// const jwtService=require("../services/jwt.service");
const JWTService=require("../services/jwt.service");
const jwtService= new JWTService();

class JWTController{

    async register(req,res){
       
        const {email,pwd}=req.body;
        
        // console.log("Registration Email: ",email,"\npwd: ",pwd);
        
        if (typeof email!="string" || typeof pwd!="string") {
            res.status(400);
            return res.json({message:"Data is in an invalid format"})
        }

        // res.status(200);
        // return res.json({message:"Successfully Registered"})

        const result= await jwtService.register(email,pwd);
      
        res.status(result.status);
        return res.json({data:result.data, message:result.message});
       
    }

    async login(req,res){
        
        const {email,pwd}=req.body;

        // console.log("Login Email: ",email,"\npwd: ",pwd);

        if (typeof email!="string" || typeof pwd!="string") {
            res.status(400);
            return res.json({message:"Data is in an invalid format"})
        }

        // res.status(200);
        // return res.json({message:"Successfully Login"})

        const result= await jwtService.login(email,pwd);
    
        res.status(result.status);
        return res.json({data:result.data, message:result.message});
    }
}

module.exports=JWTController;