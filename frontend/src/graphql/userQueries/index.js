import { gql } from '@apollo/client'

export const QUERY_VERIFY_TOKEN = gql`
  mutation VerifyUserToken($token: String!) {
    verifyToken(token: $token) {
      msg
      success
    }
  }
`

export const QUERY_GET_USERS = gql`
  query GetUser ($token: String!){
    getUser(token: $token) {
      msg,
      success,
      user {
        _id,
        firstname,
        lastname,
        email,      
      }
    }
  }
`

export const QUERY_SIGN_UP = gql`
  mutation SignUp($input: CreateUserInput!) {
    createUser(input: $input) {
      msg
      success
    }
  }
`

export const QUERY_LOGIN = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      msg
      success
      user {
        _id
        firstname
        lastname
        email
        shortedUrls
      }
      token
    }
  }
`
export const QUERY_RESEND_MAIL = gql`
  query ResendMail($email: String!) {
    resendMail(email: $email) {
      msg
      success
    }
  }
`
