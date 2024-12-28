const { userModel } = require("../models/user.model");
const { friendModel } = require("../models/friend.model");

const friendCreate =async(req,res)=>{
    try{
        const userData = req.userData; 
       const { mobileNumber} = req.body; 
       let findFriendEmail = await userModel.findOne({mobileNumber});
       if(!findFriendEmail) return res.status(400).json({Message: "Oops! Mobile Number doesn't exist.."});
       const data = {
        userName:findFriendEmail.userName,
        mobileNumber:findFriendEmail.mobileNumber,
        email:findFriendEmail.email,    
        userId:userData._id,
        friendId:findFriendEmail._id,
        fileName:findFriendEmail.fileName,
        gender:findFriendEmail.gender
       }
       await friendModel.create(data)
      res.json({
        Message:"Friend Added Sucessfully!"
      })
    }
    catch(error){
        console.log(error.message);  
      res.json({Message:error.Message})
    }
}



const getAllFriends = async (req, res) => {
    const userData = req.userData;
  try {
    const findAllFriends = await friendModel.find({userId:userData._id});
    if (findAllFriends.length == 0) {
      return res.status(404).json({ Message: "Friends not found.." });
    }
    res.json({ findAllFriends });
  } catch (error) {
    console.log(error.message);
    res.json({
      Error: error.message,
    });
  }
};


module.exports={
 friendCreate,
 getAllFriends
}