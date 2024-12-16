const express=require("express");
const router=express.Router();
const controller=require("../controllers/screen.controller");
const token = require("../middlewares/admin.token")


router.use(token.verifyToken);

router.route("/create").post(controller.createScreen);
router.route("/getallscreen").get(controller.getScreen);
router.route("/getsinglescreen").get(controller.getSingleScreen);
router.route("/delete").delete(controller.deleteScreen);
router.route("/update").put(controller.updateScreen);




module.exports=router