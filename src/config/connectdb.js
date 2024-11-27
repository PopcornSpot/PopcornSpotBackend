const mongoose=require("mongoose");



function connect(){
mongoose.connect("mongodb+srv://krishna43835:8AhOfAeJV1VvkQ08@cluster0.dh0s6.mongodb.net/server007?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("MongoDB Connected......");   
})
.catch((err)=>{
console.log(`Connection Error ${err}`);
});
}




module.exports={connect}
