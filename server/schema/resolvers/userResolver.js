const User = require("../../model/User");
const {
  encryptPassword,
  sendMail,
  verifyUserToken,
  comparePassword,
  generateToken,
  getUserByToken,
} = require("../../util");

const userResolver = {
  Query: {
    resendMail: async (_, args) => {
      const user = await User.findOne({ email: args.email });

      if (!user) {
        return {
          msg: "User does not exist. Please go to Signup",
          success: false,
        };
      } else if (user.verified) {
        return {
          msg: "Account has been verified. Please go to Login",
          success: false,
        };
      }
      const { success } = await sendMail(user._id, args.email, user.firstname);

      if (success) {
        return {
          msg: "We sent new token to you mail successfuly. Please check your mail 😃",
          success,
        };
      } else {
        return {
          msg: "Something went wrong! Please try again later 😥",
          success,
        };
      }
    },
    getUser: async (_, args) => {
      const { user, msg, success } = await getUserByToken(args.token);
      return {
        msg,
        success,
        user,
      };
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      const user = await User.findOne({ email: args.input.email });

      if (user) {
        return {
          msg: "User already exists. Please go to Login",
          success: false,
        };
      }

      const password = await encryptPassword(args.input.password);
      const newUser = await User({
        ...args.input,
        password,
      }).save();

      const { msg, success } = await sendMail(
        newUser._id,
        newUser.email,
        newUser.firstname
      );

      console.log(msg, success);

      // return newUser
      if (success) {
        return { msg, success, user: newUser };
      } else {
        return { msg, success };
      }
    },
    loginUser: async (_, args) => {
      const user = await User.findOne({ email: args.input.email });
      if (!user) {
        return {
          msg: "User does not exist. Please go to Signup",
          success: false,
        };
      }

      if (!user.verified) {
        return {
          msg: "Account has not been verified. Please check your email.",
          success: false,
        };
      }
      const isMatchPassword = comparePassword(
        args.input.password,
        user.password
      );
      if (!isMatchPassword) {
        return {
          msg: "Password is incorrect. Please go to Login",
          success: false,
        };
      }
      const token = await generateToken(user._id);
      return { msg: "Login Successful", success: true, user, token };
    },
    verifyToken: async (_, args) => {
      const { msg, success } = await verifyUserToken(args.token);
      return { msg, success };
    },
  },
};

module.exports = userResolver;
