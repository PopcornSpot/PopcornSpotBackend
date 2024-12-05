const express=require("express");
const router=express.Router();
const controller=require("../controllers/movies.controller");
const token= require("../middlewares/admin.token")
const singleUpload=require("../middlewares/multer")

router.use(token.verifyToken);

// router.route("/add")
// .post(singleUpload,controller.movieCreate)
// .delete(controller.deleteMovie)


router.route("/add").post(singleUpload,controller.movieCreate)
router.route("/delete").delete(controller.deleteMovie)

module.exports=router;