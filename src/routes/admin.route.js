const express=require("express");
const router=express.Router();
const controller=require("../controllers/admin.controller");
const superAdmin = require("../middlewares/superAdmin.token")
const admin = require("../middlewares/admin.token")

router.route("/superadmin/register").post(superAdmin.verifyToken,controller.adminRegister)
router.route("/superadmin/alladmin").get(superAdmin.verifyToken,controller.getAllAdmin)
router.route("/superadmin/getsingleadmin").get(superAdmin.verifyToken,controller.getSingleAdmin)
router.route("/superadmin/deleteadmin").delete(superAdmin.verifyToken,controller.deleteAdmin)
router.route("/superadmin/updateadmin").put(superAdmin.verifyToken,controller.updateAdmin)

router.route("/login").post(controller.adminLogin)
router.route("/resetpassword").put(controller.adminResetpass)
router.route("/getprofiledetails").get(admin.verifyToken,controller.getSingleAdmin)


module.exports=router