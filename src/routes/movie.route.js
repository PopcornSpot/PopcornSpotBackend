const express=require("express");
const router=express.Router();
const controller=require("../controllers/movies.controller");
// const Token = require("../middlewares/superAdmin.authToken")
const singleUpload=require("../middlewares/multer")

// router.use(Token.verifyToken)

router.route("/movie")
.post(singleUpload,controller.movieCreate)
.delete(controller.deleteMovie)


module.exports=router;