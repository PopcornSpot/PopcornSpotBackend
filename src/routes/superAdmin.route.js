const express=require("express");
const router=express.Router();
const controller=require("../controllers/SuperAdmin.controller");


router.route("/register").post(controller.superAdminRegister)

router.route("/login").post(controller.superAdminLogin)

router.route("/resetpassword").put(controller.superAdminResetpass)

router.route("/getsuperadmin").get(controller.getSuperAdmin)

router.route("/updatesuperadmin").put(controller.updateSuperAdmin)


module.exports=router