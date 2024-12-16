const express=require("express");
const router=express.Router();
const controller=require("../controllers/movies.controller");
const token= require("../middlewares/admin.token")
const superadmin= require("../middlewares/superAdmin.token")
const singleUpload=require("../middlewares/multer")

router.route("/user/getallmovie").get(controller.userGetAllMovies)

router.route("/superadmin/getallmovie").get(superadmin.verifyToken,controller.getAllMovies)
router.route("/superadmin/updatemovie").put(superadmin.verifyToken,singleUpload,controller.updateMovie)
router.route("/superadmin/delete").delete(superadmin.verifyToken,controller.deleteMovie)


router.use(token.verifyToken);
router.route("/add").post(singleUpload,controller.movieCreate)
router.route("/getallmovie").get(controller.getAllMovies)
router.route("/getmovieforupdate").get(controller.getMovieForUpdate)
router.route("/updatemovie").put(singleUpload, controller.updateMovie)
router.route("/delete").delete(controller.deleteMovie)



module.exports=router;