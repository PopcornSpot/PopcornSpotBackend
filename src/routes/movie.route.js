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
router.route("/getallmovie").get(controller.getAllMovies)
router.route("/getmovieforupdate").get(controller.getMovieForUpdate)
router.route("/updatemovie").put(singleUpload, controller.updateMovie)
router.route("/delete").delete(controller.deleteMovie)

module.exports=router;