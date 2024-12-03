const express=require("express");
const router=express.Router();
const controller=require("../controllers/user.controller");
const verifyToken = require("../middlewares/superAdmin.authToken")

router.route("/googlelogin").post(controller.googleRegister);




module.exports=router