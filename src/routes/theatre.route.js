const express=require("express");
const router=express.Router();
const controller=require("../controllers/theatre.controller");
const token= require("../middlewares/admin.token")
const superAdmin= require("../middlewares/superAdmin.token")
const singleUpload=require("../middlewares/multer")

router.route("/superadmin/get").get(superAdmin.verifyToken,controller.getAllForSuperAdmin)

router.use(token.verifyToken);
router.route("/create").post(singleUpload,controller.theatreCreate)
router.route("/get").get(controller.getAllTheatres)
router.route("/getone").get(controller.getOneTheatre)
router.route("/update").put(singleUpload, controller.updatetheatre)
router.route("/delete").delete(controller.deletetheatre)



module.exports=router;