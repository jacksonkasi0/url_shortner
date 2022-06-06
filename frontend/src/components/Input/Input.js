import React from "react";
import style from "./Input.module.css";

import { useDispatch } from "react-redux";
import { setPass } from "../../store/action/appFuntions";

const Input = ({ text, Icon, px, type, lable, state, name, func, value }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (text === "Password") {
      dispatch(setPass(!state))
    }
  };

  return (
    <div className={style.container}>
      {
        lable && text && <label>{text}</label>
      }

      <div className={style.input}>
        <input type={type} name={name} value={value} placeholder={text} required style={{ width: px }} onChange={func} />
        <div onClick={handleClick} style={{ cursor: "pointer" }} >{Icon && <Icon />}</div>
      </div>
    </div>
  );
};

export default Input;
