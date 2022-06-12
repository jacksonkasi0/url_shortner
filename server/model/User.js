const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      reuired: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    shortedUrls: [
      {
        type: mongoose.Types.ObjectId,
        ref: "urls",
      },
    ],
    savedUrls: [
      {
        type: mongoose.Types.ObjectId,
        ref: "urls",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
