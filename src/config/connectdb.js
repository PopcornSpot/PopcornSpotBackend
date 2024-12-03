const mongoose=require("mongoose");



function connect(){
mongoose.connect("mongodb+srv://vignesh4974:ZGjK9dMWmbNyhA9Q@cluster0.hq7ch.mongodb.net/PopcornSpot?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("MongoDB Connected......");   
})
.catch((err)=>{
console.log(`Connection Error ${err}`);
});
}




module.exports={connect}
