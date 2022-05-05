const bcrypt=require('bcrypt');
const saltRounds=10;
const jwt = require("jsonwebtoken");
const { User }=require("../models");
//const { testConnection } = require('../models');

class JWTService {
    // constructor(){
    //     this.hashCompare=null;
    //     this.userInfo={
    //         id:null,
    //         email:null,
    //         pwdHashed:null,
    //     }
    // }
    
    async register(email,pwd){
        let result = {
            message: null,
            status: null,
            data: null,
        };
        //testConnection();
           
        const checkuser=await User.findOne({where:{userEmail:email}});
        if (checkuser!==null) {
            result.message=`User: ${email} already exists, please use another email`;
            result.status=400;
            return result;
        }

        // code for part one
        // this.userInfo.email=email;
        // this.userInfo.pwdHashed= await bcrypt.hash(pwd, saltRounds);
        // console.log("Hash:",this.hashresult);
        // console.log(this.userInfo);
        // this.userInfo.email=email;
        // this.userInfo.pwdHashed=await bcrypt.hash(pwd, saltRounds);

        const pwdHashed=await bcrypt.hash(pwd, saltRounds);
        await User.create({userEmail:email,pwdHashed:pwdHashed});

        // const users=await User.findAll();
        // console.log(users);
        
        result.message="Successfully Registered";
        result.status=200;
        return result;

    }

    async login(email,pwd){
        let result = {
            message: null,
            status: null,
            data: null,
        };
        let userInfo={
            id:null,
            userEmail:null,
            pwdHashed:null,
        }
        // testConnection();

        const checkUser=await User.findOne({where:{userEmail:email}});
        if (checkUser===null) {
            result.message=`User: ${email} does Not exist!`;
            result.status=400;
            return result;
        }
        // console.log("Login check:",checkUser);

        const hashCompare = await bcrypt.compare(pwd,checkUser.pwdHashed);
        if(!hashCompare) {
            //console.log("Hash Comparision",this.hashCompare);
            result.status=401;
            result.message="Incorrect Password";
            return result;
        }

        //console.log("Hash Comparision",this.hashCompare);
        // console.log("check user:,checkUser);
    
        userInfo.id=checkUser.id;
        userInfo.email=checkUser.userEmail;
        userInfo.pwdHashed=checkUser.pwdHashed

        const token=jwt.sign(userInfo,"123",{expiresIn:"1h"});
        //console.log("token:",token);

        result.data=token;
        result.message="Login Success";
        result.status=200;
        return result;

    }
  
}

module.exports=JWTService;


// module.exports={

//     register: async (email,pwd)=>{
//         let result = {
//             message: null,
//             status: null,
//             data: null,
//         };
              
//         const hashresult= await bcrypt.hash(pwd, saltRounds);
         
//         console.log("Hash:",hashresult);
       
//         result.data=hashresult;
//         result.status=200;
//         result.message="Successfully hashed the password";
//         console.log("Successfully hashed the password");
//         return result;
        

//     },

//     login: async(email,pwd)=>{

//     }

// }

