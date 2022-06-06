const { gql } = require("apollo-server");

const urlType = gql`
  scalar Date

  type Url {
    _id: ID
    name: String
    urlCode: String!
    longUrl: String!
    shortUrl: String!
    webIcon: String
    date: Date!
    clicks: Int!
    creator: ID
    createdAt: Date
    updatedAt: Date
  }

  input UrlInput {
    longUrl: String!
    name: String
    userId: ID
  }

  type Responce {
    msg: String
    success: Boolean
    urlDetails: Url
  }

  type Mutation {
    shortUrl(input: UrlInput!): Responce
  }

  type Query {
    redirectUrl(url: String!): Responce
  }
`;

module.exports = urlType;
