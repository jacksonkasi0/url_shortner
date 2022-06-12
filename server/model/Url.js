const mongoose = require("mongoose");

const valueSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  browser: [{ type: String }],
  os: [{ type: String }],
  location: [{ type: String }],
});

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
    values: [valueSchema],
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const Url = mongoose.model("urls", URLSchema);

module.exports = Url;
