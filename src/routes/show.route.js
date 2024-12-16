const express=require("express");
const router=express.Router();
const controller=require("../controllers/show.controller");
const token = require("../middlewares/admin.token")

router.use(token.verifyToken);
router.route("/create").post(controller.createShow);
router.route("/getallshow").get(controller.getShow);
router.route("/getsingleshow").get(controller.getSingleShow);
router.route("/delete").delete(controller.deleteShow);
router.route("/update").put(controller.updateShow);

module.exports=router