const Url = require("../../model/Url");
const validUrl = require("valid-url");
const shortId = require("shortid");
const getMetaData = require("metadata-scraper");
const User = require("../../model/User");

const urlResolver = {
  Query: {
    getUrls: async (_, { userId }) => {
      try {
        const { shortedUrls, savedUrls } = await User.findById({ _id: userId })
          .select("shortedUrls savedUrls -_id")
          .populate("shortedUrls savedUrls");
        return { getAllUrls: [...shortedUrls, ...savedUrls] };
      } catch (error) {
        console.log(error);
        return {
          msg: "Somthing went wrong!😞",
          success: false,
        };
      }
    },
  },

  Mutation: {
    redirectUrl: async (_, { input: { code } }) => {
      try {
        const { longUrl } = await Url.findOneAndUpdate(
          { urlCode: code },
          { $inc: { clicks: 1 }, $push:{browser:"chrome"} },
          { new: true }
        );

        return { msg: "Let's Go 🚀", success: false, url: longUrl };
      } catch (error) {
        console.log(error);
        return { msg: "Somthing went wrong!😞", success: false };
      }
    },

    shortUrl: async (_, { input: { longUrl, name, userId } }) => {
      const isValidUrl = validUrl.isUri(longUrl);

      if (!isValidUrl) {
        return {
          msg: "You entered invalid URL ⚠",
          success: false,
        };
      }

      try {
        let url = await Url.findOne({ longUrl });

        if (url) {
          // check that url is exist in both shortedUrls savedUrls
          // if it's here, we will save that url _id in this user savedUrls field

          let { shortedUrls } = await User.findById(userId).select(
            "shortedUrls -_id"
          );
          let isShortedUrls = shortedUrls.some((id) => id.equals(url._id));

          let { savedUrls } = await User.findById(userId).select(
            "savedUrls -_id"
          );
          let isSavedUrls = savedUrls.some((id) => id.equals(url._id));

          if (!isSavedUrls && !isShortedUrls) {
            await User.findByIdAndUpdate(
              { _id: userId },
              { $push: { savedUrls: url._id } }
            );
          }

          return {
            msg: "Copy this Url 😀",
            success: true,
            urlDetails: url,
          };
        }

        const urlCode = shortId.generate();

        const { image, icon, provider } = await getMetaData(longUrl);

        const shortUrl = `${process.env.BASE_URL}/${urlCode}`;
        url = await new Url({
          name: name || provider || "NaN",
          longUrl,
          shortUrl,
          urlCode,
          webIcon:
            icon ||
            image ||
            "https://raw.githubusercontent.com/jacksonkasi0/assets/master/chrome.png",
          creator: userId,
          date: new Date(),
        }).save();

        await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { shortedUrls: url._id } }
        );

        return {
          msg: "Successfully shorted your URL 🎉",
          success: true,
          urlDetails: url,
        };
      } catch (error) {
        console.log(error.message);
        return {
          msg: "Server Error. Please try again 😓",
          success: false,
        };
      }
    },
  },
};

module.exports = urlResolver;
