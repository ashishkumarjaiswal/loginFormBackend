const User = require("../Models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password, mobileNumber, name, place } = req.body;

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        msg: "Password must be atleast 8 character",
      });
    }

    const isAlreadyRegisterd = await User.findOne({ email });

    if (isAlreadyRegisterd) {
      return res.status(400).json({
        success: false,
        msg: "user already exist",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({
      email,
      password: encryptedPassword,
      mobileNumber,
      name,
      place,
    });

    res.status(200).json({ success: true, msg: "user registerd Successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.getUserData = async (req, res) => {
  try {
    let user = req.user;
    user.password = "hide kar diya gaya hai bhai";
    res.status(200).json({ success: true, msg: "Fetched", user });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User Not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        msg: "Incorrect Password",
      });
    }

    const token = jwt.sign({ _id: user._id }, "nameisenough");

    res
      .status(200)
      // .cookie("token", token, {
      //   expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      //   httpOnly: true,
      // })
      .json({
        success: true,
        msg: "Login Successfully",
        token,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, place, mobileNumber } = req.body;

    if (name) {
      user.name = name;
    }

    if (place) {
      user.place = place;
    }

    if (mobileNumber) {
      user.mobileNumber = mobileNumber;
    }

    await user.save();

    res.status(200).json({ success: true, msg: "Profile Updated" });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, mobileNumber, place, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "E-mail not found",
      });
    }

    if ((Number(mobileNumber) !== user.mobileNumber, user.place !== place)) {
      return res.status(400).json({
        success: false,
        msg: "Details Mismatch",
      });
    }

    user.password = await bcrypt.hash(newPassword, 8);

    await user.save();

    res.status(200).json({
      success: true,
      msg: "Password Updated Successfully Please Login",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        msg: "Logged Out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

// exports.isAuth = (req, res) => {
//   try {
//     res.status(200).json({
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       msg: error.message,
//     });
//   }
// };
