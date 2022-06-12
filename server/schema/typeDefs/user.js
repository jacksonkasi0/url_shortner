const { gql } = require("apollo-server");

const userType = gql`
  type User {
    _id: ID
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    verified: Boolean
    shortedUrls: [ID]
    savedUrls: [ID]
  }

  input CreateUserInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type Responce {
    msg: String
    success: Boolean!
    user: User
    token: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): Responce
    verifyToken(token: String!): Responce
    loginUser(input: LoginUserInput!): Responce
  }

  type Query {
    resendMail(email: String!): Responce
    getUser(token: String!): Responce
  }
`;

module.exports = userType;
