require("dotenv").config();
const express = require("express");
const connection = require("./db");
const cors = require("cors");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const middlewareRoute = require("./middleware/auth.middleware");
const fileRoutes = require('./routes/file.route');

const app = express();
connection();
// middlewares
app.use(express.json({limit: '50mb'}));
app.use(cors());
// Serve uploaded files from the 'uploads' directory
// app.use("/api/users/upload", express.static('uploads'));


//route
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/users",fileRoutes);
// app.use("/api/user",middlewareRoute);

app.listen(process.env.PORT,()=> {console.log(`Server is running as port ${process.env.PORT}`)})
