import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { Box } from "@mui/material";

import { QUERY_GET_USERS } from "../../graphql/";
import { setUser } from "../../store/action/user";

import Loading from "../Loading/Loading";
import AlertCard from "../AlertCard/AlertCard";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [isUser, setIsUser] = useState(false);
  const [getUser, { error }] = useLazyQuery(QUERY_GET_USERS);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate('/login');
    }

    if (!user) {
      try {
        getUser({
          variables: { token },
          fetchPolicy: "no-cache",
          onCompleted: ({ getUser }) => {
            console.log(getUser);
            if (getUser.success) {
              dispatch(setUser(getUser.user));
              setIsUser(true);
            }
            else{
              navigate('/login')
            }
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsUser(true);
    }
  }, []);

  if (error) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "50%",
          width: "90%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <AlertCard msg={`${error.message} PLease try again.`} success={false} />
      </Box>
    );
  }

  if (isUser) {
    return user ? <Outlet /> : <Navigate to={"/login"} />;
  }

  return <Loading />;
};

export default PrivateRoute;
