const express=require("express");
const router=express.Router();
const controller=require("../controllers/auth.controller");


router.route("/signup").post(controller.signUp)

router.route("/signin").post(controller.authsignIn)




module.exports=router