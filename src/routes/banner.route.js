const express=require("express");
const router=express.Router();
const controller=require("../controllers/banner.controller");
const token= require("../middlewares/superAdmin.token")
const singleUpload=require("../middlewares/multer")

router.route("/user/getallbanner").get(controller.userGetAllBanner)

router.route("/addbanner").post(token.verifyToken,singleUpload,controller.bannerCreate)
router.route("/getallbanner").get(token.verifyToken,controller.getAllBanner)
router.route("/getonebanner").get(token.verifyToken,controller.getBannerForUpdate)
router.route("/updatebanner").put(token.verifyToken,singleUpload,controller.updateBanner)
router.route("/deletebanner").delete(token.verifyToken,controller.deleteBanner)


module.exports=router;