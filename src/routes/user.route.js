const express=require("express");
const router=express.Router();
const controller=require("../controllers/user.controller");
const userToken= require("../middlewares/user.token")
const singleUpload = require("../middlewares/multer")

router.route("/googlelogin").post(controller.googleRegister);
router.route("/register").post(controller.userRegister);
router.route("/login").post(controller.userLogin);
router.route("/resetpassword").put(controller.userResetPassword);
router.route("/getalluser").get(controller.getAllUser)

router.use(userToken.verifyToken);
router.route("/getdetails").get(controller.getUserDetails);
router.route("/updateuser").put(singleUpload,controller.updateUser);

module.exports=router