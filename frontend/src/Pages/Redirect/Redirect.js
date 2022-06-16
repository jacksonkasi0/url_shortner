import React, { useEffect } from "react";

import { useParams } from "react-router";
import { useMutation } from "@apollo/client";
import { Alert } from "@mui/material";
import detect from "device-detect";

import { QUERY_REDIRECT_URL } from "../../graphql";
import Loading from "../../components/Loading/Loading";

const Redirect = () => {
  const { code } = useParams();

  const { device, browser } = detect();

  const [redirectUrl, { error, loading, data }] =
    useMutation(QUERY_REDIRECT_URL);

  useEffect(() => {
    redirectUrl({
      variables: {
        input: {
          code,
          device,
          browser,
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
