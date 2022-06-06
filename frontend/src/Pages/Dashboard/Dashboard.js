import React, { useState } from "react";
import style from "./Dashboard.module.css";

import { Box, Zoom } from "@mui/material";
import { UilLink, UilPen } from "@iconscout/react-unicons";

import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

import { QUERY_SHORT_URL } from "../../graphql";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AccordionBox from "../../components/AccordionBox/AccordionBox";
import UrlContent from "../../components/UrlContent/UrlContent";

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { _id } = useSelector((state) => state.auth.user);

  const [inputValue, setInputValue] = useState({
    name: "",
    longUrl: "",
  });

  const [urlList, setUrlList] = useState([]);
  console.log(urlList);
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
          const isMatch = urlList.some(
            (url) => url.urlCode === urlDetails.urlCode
          );
          if (!isMatch) {
            setUrlList([...urlList, urlDetails]);
          }
        }
      },
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
      {urlList.map((url) => (
        <AccordionBox
          key={url.urlCode}
          Title1={<img src={url.webIcon} style={{ width: "50px" }} />}
          Title2={<h3>{url.name || "NaN"}</h3>}
          Title3={<h3>Clicks = {url.clicks}</h3>}
          Content={<UrlContent urlLink={url.shortUrl} />}
        />
      ))}
    </div>
  );
};

export default Dashboard;
