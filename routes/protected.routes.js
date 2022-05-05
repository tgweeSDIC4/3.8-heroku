const express = require('express');
const router = express.Router();

const JWTController = require("../controllers/jwt.controller");
const jwtController = new JWTController();

router.post("/register", jwtController.register);

router.post("/login", jwtController.login);

router.get("/",(req,res)=>{
    return res.send("Yay, app is working!!")});

module.exports = router;