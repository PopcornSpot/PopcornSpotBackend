const express=require("express");
const router=express.Router();
const controller=require("../controllers/report.controller");
const superAdmin = require("../middlewares/superAdmin.token")
const admin = require("../middlewares/admin.token")

router.route("/admin/create").post(admin.verifyToken,controller.createReport);
router.route("/getallreports").get(admin.verifyToken,controller.getAllReports);
router.route("/getsinglereport").get(admin.verifyToken,controller.getSingleReport);
router.route("/updatereport").put(admin.verifyToken,controller.updateReport);

router.route("/superadmin/getallreports").get(superAdmin.verifyToken,controller.getAllReports);
router.route("/superadmin/getsinglereport").get(superAdmin.verifyToken,controller.getSingleReport);
router.route("/superadmin/updatereport").put(superAdmin.verifyToken,controller.updateReport);



module.exports=router