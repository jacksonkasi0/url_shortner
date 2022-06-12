import React, { useState } from "react";
import style from "./Dashboard.module.css";

import { Box, Zoom } from "@mui/material";
import { UilLink, UilPen } from "@iconscout/react-unicons";

import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";

import { QUERY_SHORT_URL, QUERY_URL_DETAILS } from "../../graphql";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AccordionBox from "../../components/AccordionBox/AccordionBox";
import UrlContent from "../../components/UrlContent/UrlContent";
import { addUrls } from "../../store/action/appFuntions";

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.auth.user);
  const { currentUrls } = useSelector((state) => state.app);

  const [inputValue, setInputValue] = useState({
    name: "",
    longUrl: "",
  });

  const [shotUrl] = useMutation(QUERY_SHORT_URL);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const shortLink = () => {
    shotUrl({
      variables: {
        input: { ...inputValue, userId: _id },
      },
      fetchPolicy: "no-cache",
      onCompleted: ({ shortUrl, shortUrl: { urlDetails } }) => {
        enqueueSnackbar(shortUrl.msg, {
          variant: shortUrl.success ? "success" : "error",
          TransitionComponent: Zoom,
          autoHideDuration: 1500,
        });
        if (shortUrl.success) {
          console.log(shortUrl);
          const isMatch = currentUrls.some(
            (url) => url.urlCode === urlDetails.urlCode
          );
          if (!isMatch) {
            dispatch(addUrls(urlDetails));
          }
        }
      },
      refetchQueries: [
        { query: QUERY_URL_DETAILS, variables: { userId: _id } },
      ],
    });
  };

  return (
    <div className={style.dashboard}>
      <Box className={style.container}>
        <h1>Short Me 😃</h1>
        <br />
        <div className={style.linkBox}>
          <Input
            px={"14.5rem"}
            Icon={UilPen}
            value={inputValue.name}
            name="name"
            text={"Set name"}
            func={handleChange}
          />
          <Input
            px={"24.5rem"}
            Icon={UilLink}
            value={inputValue.longUrl}
            name="longUrl"
            text={"Past link and click button"}
            func={handleChange}
          />
          <Button text={"Short Me"} func={shortLink} />
        </div>
      </Box>
      <br />
      {currentUrls.map((url) => (
        <AccordionBox
          key={url.urlCode}
          Title1={<img src={url.webIcon} style={{ width: "45px"}} />}
          Title2={<h3>{url.name || "NaN"}</h3>}
          Content={<UrlContent urlLink={url.shortUrl} />}
        />
      ))}
    </div>
  );
};

export default Dashboard;
