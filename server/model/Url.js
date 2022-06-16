const mongoose = require("mongoose");

const URLSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "NaN",
    },
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    webIcon: {
      type: String,
      default:
        "https://raw.githubusercontent.com/jacksonkasi0/assets/master/chrome.png",
    },
    date: {
      type: String,
      default: Date.now,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    browsers: {
      Chrome: Number,
      Opera: Number,
      Firefox: Number,
      IE: Number,
      Safari: Number,
    },
    devices: {
      iPhone: Number,
      iPad: Number,
      iPod: Number,
      Blackberry: Number,
      WindowsMobile: Number,
      Android: Number,
      Macintosh: Number,
      Windows: Number,
      Linux: Number,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const Url = mongoose.model("urls", URLSchema);

module.exports = Url;
