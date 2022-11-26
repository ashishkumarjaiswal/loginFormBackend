const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  register,
  login,
  updateProfile,
  forgotPassword,
  logout,
  getUserData,
  isAuth,
} = require("./Routes/User");
const connectToDataBase = require("./Configs/Database");
const { isAuthenticated } = require("./Configs/Middleware");
require("dotenv").config();

const PORT = process.env.PORT || 5555;

connectToDataBase();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.post("/register", register);
app.post("/login", login);
app.post("/updateProfile", isAuthenticated, updateProfile);
app.post("/forgotPassword", forgotPassword);
app.post("/getUserData", isAuthenticated, getUserData);
app.get("/logout", logout);
// app.get("/isAuth", isAuthenticated, isAuth);

app.listen(PORT, () => {
  console.log(`app is listen on port ${PORT}`);
});
