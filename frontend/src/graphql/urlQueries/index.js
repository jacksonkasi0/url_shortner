import { gql } from "@apollo/client";

export const QUERY_SHORT_URL = gql`
  mutation ShortUrl($input: UrlInput!) {
    shortUrl(input: $input) {
      msg
      success
      urlDetails {
        longUrl
        shortUrl
        urlCode
        webIcon
        name
        clicks
      }
    }
  }
`;

const QUERY_URL_DETAILS = gql`
  query urlDetails {
    shortUrl{
      msg
      success
      urlDetails {
        _id
        date
        longUrl
        shortUrl
        urlCode
        name
        clicks
        createdAt
        updatedAt
      }
    }
  }
`;

