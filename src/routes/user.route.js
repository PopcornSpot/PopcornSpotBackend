const express=require("express");
const router=express.Router();
const controller=require("../controllers/user.controller");
// const verifyToken = require("../middlewares/superAdmin.token")

router.route("/googlelogin").post(controller.googleRegister);
router.route("/register").post(controller.userRegister);
router.route("/login").post(controller.userLogin);
router.route("/resetpassword").put(controller.userResetPassword);




module.exports=router