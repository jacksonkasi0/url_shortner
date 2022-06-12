import React, { useEffect } from "react";

import { useParams } from "react-router";
import { useMutation } from "@apollo/client";
import { QUERY_REDIRECT_URL } from "../../graphql";
import Loading from "../../components/Loading/Loading";
import { Alert } from "@mui/material";

const Redirect = () => {
  const { code } = useParams();

  const [redirectUrl, { error, loading, data }] =
    useMutation(QUERY_REDIRECT_URL);

  useEffect(() => {
    redirectUrl({
      variables: {
        input: {
          code,
        },
      },
      onCompleted: ({ redirectUrl: { url } }) => {
        window.location.href = url;
      },
    });
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          mt: 26,
          maxWidth: "70%",
        }}
      >
        {error.message}
      </Alert>
    );
  }

  return (
    <Alert
      severity="success"
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        mt: 26,
        maxWidth: "70%",
      }}
    >
      Let's Go 🚀
    </Alert>
  );
};

export default Redirect;
