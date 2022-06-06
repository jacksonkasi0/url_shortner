import React from 'react'
import style from "./Logo.module.css";
import { ReactComponent as LogoSvg } from "../../assets/svg/logo.svg";


import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Box className={style.header}>
      <Link to="/">
        <LogoSvg className={style.logo} />
      </Link>
    </Box>
  )
}

export default Logo
