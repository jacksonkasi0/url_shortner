const Url = require("../../model/Url");
const validUrl = require("valid-url");
const shortId = require("shortid");
const getMetaData = require("metadata-scraper");
const User = require("../../model/User");

const urlResolver = {
  Mutation: {
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
          return {
            msg: "Copy this Url 😀",
            success: true,
            urlDetails: url,
          };
        }

        const urlCode = shortId.generate();

        const { image, icon } = await getMetaData(longUrl);

        const shortUrl = `${process.env.BASE_URL}/${urlCode}`;
        url = await new Url({
          name: name || "NaN",
          longUrl,
          shortUrl,
          urlCode,
          webIcon: icon || image,
          creator: userId,
          date: new Date(),
        }).save();

        await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { shortedUrls: url._id } },
          { new: true }
        );

        return {
          msg: "Successfully shorted your URL 🎉",
          success: true,
          urlDetails: url,
        };
      } catch (error) {
        return {
          msg: "Server Error. Please try again 😓",
          success: false,
        };
      }
    },
  },
};

module.exports = urlResolver;
