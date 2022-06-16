const { gql } = require("apollo-server");

const urlType = gql`
  scalar Date

  type browser {
    Chrome: Int
    Opera: Int
    Firefox: Int
    IE: Int
    Safari: Int
  }

  type device {
    iPhone: Int
    iPad: Int
    iPod: Int
    Blackberry: Int
    WindowsMobile: Int
    Android: Int
    Macintosh: Int
    Windows: Int
    Linux: Int
  }

  type Url {
    _id: ID
    name: String
    urlCode: String
    longUrl: String!
    shortUrl: String!
    webIcon: String
    date: Date!
    clicks: Int!
    browsers: browser
    devices: device
    location: [String]
    creator: ID
    createdAt: Date
    updatedAt: Date
  }

  input UrlInput {
    longUrl: String!
    name: String
    userId: ID
  }

  input RedirectInput {
    code: String!
    device: String!
    browser: String!
  }

  type Responce {
    msg: String
    success: Boolean
    urlDetails: Url
    getAllUrls: [Url]
    url: String
  }

  type Mutation {
    shortUrl(input: UrlInput!): Responce
    redirectUrl(input: RedirectInput): Responce
  }

  type Query {
    getUrls(userId: ID!): Responce
  }
`;

module.exports = urlType;
