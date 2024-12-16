const express=require("express");
const router=express.Router();
const controller=require("../controllers/poll.controller");
const token = require("../middlewares/admin.token")

router.route("/update").put(controller.updatePoll);

router.use(token.verifyToken);
router.route("/create").post(controller.createPoll);
router.route("/getpoll").get(controller.getSinglePoll);
router.route("/getallpoll").get(controller.getAllPoll);





module.exports=router