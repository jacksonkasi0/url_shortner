const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { AuthenticationError } = require("apollo-server");
const User = require("../model/User");
require("dotenv").config();
const sendGridMail = require("@sendgrid/mail");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    // send verification email
    let info = await sendGridMail.send({
      from: process.env.EMAIL,
      to: email,
      subject: "User Verification E-mail from Grovemade",
      // attachments: [
      //   {
      //     filename: "logo.png",
      //     path: __dirname + "/logo.png",
      //     cid: "logo@",
      //   },
      // ],
      html: `
            <div>
            <div style=" text-align: center;" >
            <img src="cid:logo@" alt="Grovemade"  
            style=" width: 100%; height: 100px; margin-top: 10px;" />
            <br />
            <hr />
            <br />
            <p>
            <span style=" color: rgb(99, 99, 99); font-weight: bold;">
            ${firstname}</span>,we welcome to our platform :)
             </p>
             
            <br />    
            <a
              style=" color:white !important;
              padding:15px;
              font-weight: 500;
              background: rgb(0, 102, 255);
              text-decoration: none;
              border-radius: 10px;
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
              
              href="https://3000-jacksonkasi0-3x3box-jb30gbd2iu1.ws-us47.gitpod.io/verify/${token}"
              >Verify Email</a>
      
            <p style="margin-top: 20px; color: gray;">
            This link expire in 1 day</p>
      
            <p>Thanks and Regards 😊</p>

            <div style="margin-top: 50px;">&copy; ${year}</div>
          </div>
            </div>
            `,
    });

    return {
      msg: "Account created successfully. Please verify your email.",
      success: true,
    };

    if (info) {
      console.log("mail send success fully 😃");
    }
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
