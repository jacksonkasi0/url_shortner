const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AuthenticationError } = require("apollo-server");
const { CourierClient } = require("@trycourier/courier");

const User = require("../model/User");

require("dotenv").config();

const encryptPassword = async (password, saltRound = 10) => {
  try {
    //  Generate a salt
    const salt = await bcrypt.genSalt(saltRound);
    // hash password
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error(error);
    // return false if error
    throw new Error("Somthing went wrong!");
  }
};

// generate jwt token
const generateToken = async (id) => {
  try {
    const token = await jwt.sign({ userId: id }, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    console.error(error);
    throw new Error("Somthing went wrong!");
  }
};

const comparePassword = async (password, hash) => {
  try {
    // compare password
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    console.error(error);
    throw new AuthenticationError("Somthing went wrong!");
  }
};

const verifyUserToken = async (token) => {
  try {
    // verify token
    const data = await jwt.verify(token, process.env.JWT_SECRET);
    if (data !== undefined) {
      const user = await User.findById(data.userId);
      if (user.verified) {
        return {
          msg: "Account has been verified already. Please go to Login Page",
          success: false,
        };
      }

      await User.findByIdAndUpdate({ _id: data.userId }, { verified: true });

      return {
        msg: "Account has been verified successfully. Please go to Login Page",
        success: true,
      };
    }
  } catch (error) {
    console.log(error.message);
    return { msg: "Authentication token is invalid", success: false };
  }
};

const getUserByToken = async (token) => {
  try {
    const data = await jwt.verify(token, process.env.JWT_SECRET);
    if (data !== undefined) {
      const user = await User.findById(data.userId);
      return {
        user: user,
        success: true,
        msg: "User token is valid",
      };
    }
  } catch (error) {
    console.log(error.message);
    return {
      msg: "User token is invalid or expied. Please go to Login",
      success: false,
    };
  }
};

const sendMail = async (_id, email, firstname) => {
  try {
    const year = new Date().getFullYear();

    // generate jwt token
    const token = await jwt.sign({ userId: _id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const courier = CourierClient({
      authorizationToken: process.env.COURIER_TOKEN,
    });

    // send verification email
    let info = await courier.send({
      message: {
        to: {
          email: email,
        },
        template: process.env.TEMPLATE_ID,
        data: {
          name: "jackson kasi",
          link: `${process.env.BASE_URL}/verify/${token}`,
        },
      },
    });

    if (info) {
      console.log(info);
      console.log("mail send success fully 😃");
    }

    return {
      msg: "Account created successfully. Please verify your email.",
      success: true,
    };
  } catch (error) {
    console.error(error.message);
    return { msg: "Somthing went wrong!", success: false };
  }
};

module.exports = {
  encryptPassword,
  comparePassword,
  verifyUserToken,
  generateToken,
  sendMail,
  getUserByToken,
};
