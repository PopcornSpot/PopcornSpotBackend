const express = require("express");
const connections=require("./config/connectdb")
const superAdminRoute=require("./routes/superAdmin.route")
const adminRoute = require("./routes/admin.route")
const userRoute = require("./routes/user.route")
const movieRoute = require("./routes/movie.route")
const reportRoute = require("./routes/report.route")
const theatreRoute = require("./routes/theatre.route")
const screenRoute = require("./routes/screen.route")
const showRoute = require("./routes/show.route")
const cors=require("cors")


const app = express();
app.use(cors("*")) 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connections.connect();
app.use("/upload", express.static("src/fileStorage"));


app.use("/superadmin",superAdminRoute)
app.use("/admin",adminRoute)
app.use("/user",userRoute) 
app.use("/movie",movieRoute)
app.use("/report",reportRoute)
app.use("/theatre",theatreRoute)
app.use("/screen",screenRoute)
app.use("/show",showRoute)

//http://localhost:7000/upload/1733254662486-InShot_20240825_115055817.jpg

app.use("/", (req, res) => {
    res.send("I'm alive")
});

const port = 7000;
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});