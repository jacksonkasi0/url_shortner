import React, { useEffect } from "react";
import style from "./Sidebar.module.css";
import Logo from "../../assets/img/Icon.png";

import { UilEstate } from "@iconscout/react-unicons";
import { Alert, Divider, Stack } from "@mui/material";

import { useQuery } from "@apollo/client";
import SidebarItems from "../SidebarItems/SidebarItems";
import { QUERY_URL_DETAILS } from "../../graphql";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../Loading/Loading";
import { setIcon, userCreatedUrls } from "../../store/action/appFuntions";

const Sidebar = () => {
  const dispatch = useDispatch();

  const { _id } = useSelector((state) => state.auth.user);
  const { iconState, urlList } = useSelector((state) => state.app);

  const { error, loading, data } = useQuery(QUERY_URL_DETAILS, {
    variables: { userId: _id },
  });

  if (error) {
    console.log(error);
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">{error.message}</Alert>
      </Stack>
    );
  }

  useEffect(() => {
    if (data) {
      dispatch(userCreatedUrls(data.getUrls.getAllUrls));
    }
  }, [data]);

  const handleClick = (urlCode) => {
    dispatch(setIcon(urlCode));
  };

  return (
    <div className={style.sidebar}>
      <div className={style.logo}>
        <img src={Logo} alt="Grovemade" />
        <h3>Admin</h3>
      </div>
      <br />
      <Divider />
      <SidebarItems Icon={UilEstate} text="Dashboard" />
      <Divider />

      <div className={style.iconContainer}>
        {loading ? (
          <Loading />
        ) : (
          urlList.map((url) => (
            <div
              className={style.sidebarIcon}
              key={url.urlCode}
              onClick={() => handleClick(url.urlCode)}
            >
              {iconState === url.urlCode && <div className={style.light}></div>}
              <img src={url.webIcon} />
              <p>{url.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
