const express=require("express");
const router=express.Router();
const controller=require("../controllers/friend.controller");
const userToken= require("../middlewares/user.token")


router.use(userToken.verifyToken);
router.route("/createfriend").post(controller.friendCreate);
router.route("/getfriends").get(controller.getAllFriends);
module.exports=router