import React, { useEffect, useState } from "react";
import style from "./Verify.module.css";
import { UilEnvelopeAlt } from "@iconscout/react-unicons";

import { Alert, Box } from "@mui/material";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { QUERY_VERIFY_TOKEN, QUERY_RESEND_MAIL } from "../../graphql";
import { setDialog } from "../../store/action/appFuntions";

import Logo from "../../components/Logo/Logo";
import AlertCard from "../../components/AlertCard/AlertCard";
import Dialog from "../../components/Dialog/Dialog";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { dialogState } = useSelector((state) => state.app);

  const [input, setInput] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [reSendRespose, setReSendRespose] = useState(null);

  const [verifyToken, { data, error, loading }] =
    useMutation(QUERY_VERIFY_TOKEN);
  const [resendMail] = useLazyQuery(QUERY_RESEND_MAIL);

  useEffect(() => {
    verifyToken({
      variables: { token: token || "" },
      fetchPolicy: "no-cache",
      onCompleted: ({ verifyToken }) => {
        verifyToken.success && setIsVerified(true);
      },
    });
  }, []);

  const handleDialog = () => {
    dispatch(setDialog(!dialogState));
  };

  const func = {
    handleClick: () => {
      resendMail({
        variables: { email: input },
        fetchPolicy: "no-cache",
        onCompleted: ({ resendMail }) => {
          setReSendRespose(resendMail);
        },
      });
    },
    handleInput: (event) => {
      setInput(event.target.value);
    },
  };

  if (isVerified) {
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }

  if (loading)
    return (
      <Alert
        severity="info"
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          mt: 26,
          maxWidth: "70%",
        }}
      >
        Verifying...
      </Alert>
    );
  if (error) return <AlertCard msg={error.message} />;

  return (
    <div>
      {data && (
        <div className={style.container}>
          <Logo />

          <div className={style.content}>
            {reSendRespose ? (
              <AlertCard
                msg={reSendRespose.msg}
                success={reSendRespose.success}
              />
            ) : (
              <AlertCard
                msg={data.verifyToken.msg}
                success={data.verifyToken.success}
              />
            )}
          </div>
          <Dialog
            msg="Enter Email Address"
            px={"24.5rem"}
            text="Email"
            name="Email"
            value={input}
            Icon={UilEnvelopeAlt}
            func={func}
          />
          <Box className={style.bottom}>
            <p>
              Didn't receive the mail?{" "}
              <Link to="#" onClick={handleDialog}>
                Resend
              </Link>
            </p>
            <p>
              Already verified? <Link to="/login">Login</Link>
            </p>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Verify;
