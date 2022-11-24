const User = require("../Models/Users");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "please login first",
        request: req,
      });
    }

    const decoded = jwt.verify(token, "nameisenough");

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
