const { gql } = require("apollo-server");

const urlType = gql`
  scalar Date

  type Values {
     date: Date
    clicks: Int
    browser: [String]
    os: [String]
    location: [String]
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
    values: [Values]
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
    clicks: Int
    os: String
    browser: String
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
