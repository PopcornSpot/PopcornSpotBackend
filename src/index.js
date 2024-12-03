const express = require("express");
const connections=require("./config/connectdb")
const authRoute=require("./routes/auth.route")
const superAdminRoute=require("./routes/superAdmin.route")
const adminRoute = require("./routes/admin.route")
const userRoute = require("./routes/user.route")
const movieRoute = require("./routes/movie.route")
const cors=require("cors")


const app = express();
app.use(cors("*"))
app.use(express.json());

connections.connect();
app.use("/auth", authRoute);
app.use("/superadmin",superAdminRoute)
app.use("/admin",adminRoute)
app.use("/user",userRoute)
app.use("/movie",movieRoute)



app.use("/", (req, res) => {
    res.send("I'm alive")
});

const port = 7000;
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});