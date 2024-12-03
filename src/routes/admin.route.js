const express=require("express");
const router=express.Router();
const controller=require("../controllers/admin.controller");
const superVerifyToken = require("../middlewares/superAdmin.authToken")

router.route("/register").post(controller.adminRegister)

router.route("/login").post(controller.adminLogin)

router.route("/resetpassword").put(controller.adminResetpass)

router.route("/alladmin").get(superVerifyToken.verifyToken,controller.getAllAdmin)

router.route("/getsingleadmin").get(superVerifyToken.verifyToken,controller.getSingleAdmin)

router.route("/deleteadmin").delete(superVerifyToken.verifyToken,controller.deleteAdmin)

router.route("/updateadmin").put(superVerifyToken.verifyToken,controller.updateAdmin)

module.exports=router