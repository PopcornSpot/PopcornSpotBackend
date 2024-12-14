const express=require("express");
const router=express.Router();
const controller=require("../controllers/SuperAdmin.controller");
const token = require("../middlewares/superAdmin.token")

router.route("/register").post(controller.superAdminRegister)
router.route("/login").post(controller.superAdminLogin)
router.route("/resetpassword").put(controller.superAdminResetpass)


router.use(token.verifyToken);
router.route("/getforupdate").get(controller.getupdateSuperAdmin)
router.route("/getsuperadmin").get(controller.getSuperAdmin)
router.route("/updatesuperadmin").put(controller.updateSuperAdmin)


module.exports=router