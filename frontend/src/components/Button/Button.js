import React from "react";
import style from "./Button.module.css";

import { Button as Btn } from "@mui/material";

const Button = ({ text, func, value }) => {
  const handleClick = (event) => {
    if (value) {
      const isValue = Object.keys(value).every((i) => value[i].length > 0);
      if (isValue) {
        event.preventDefault();
        func && func();
      }
    } else {
      func && func();
    }
  };

  return (
    <Btn type="submit" className={style.button} onClick={handleClick}>
      {text}
    </Btn>
  );
};

export default Button;
