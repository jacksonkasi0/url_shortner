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

export const QUERY_URL_DETAILS = gql`
  query getUrls($userId: ID!) {
    getUrls(userId: $userId) {
      getAllUrls {
        _id
        name
        urlCode
        longUrl
        shortUrl
        webIcon
        date
        clicks
      }
    }
  }
`;

export const QUERY_REDIRECT_URL = gql`
  mutation RedirectUrl($input: RedirectInput) {
    redirectUrl(input: $input) {
      msg
      success
      url
    }
  }
`;
