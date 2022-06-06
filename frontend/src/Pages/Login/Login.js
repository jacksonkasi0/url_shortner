import React, { useState } from "react";
import style from "./Login.module.css";
import bgImg from "../../assets/img/signup-bg.avif";

import { UilEnvelope } from "@iconscout/react-unicons";
import { UilEye } from "@iconscout/react-unicons";
import { UilEyeSlash } from "@iconscout/react-unicons";

import { Box, Zoom } from "@mui/material";
import { useMutation } from '@apollo/client'
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import { QUERY_LOGIN } from '../../graphql'
import { setUser } from '../../store/action/user'

import Logo from '../../components/Logo/Logo';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const Login = () => {
  const { passwordState } = useSelector((state) => state.app);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState({
    email: "",
    password: ""
  })

  const [loginUser] = useMutation(QUERY_LOGIN)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value.trim()
    })
  }
// console.log(process.env.REACT_APP_GRAPHQL_URL);
  const handleClick = () => {
    loginUser({
      variables: {
        input: inputValue
      },
      fetchPolicy:'no-cache',
      onCompleted:({loginUser})=>{
        enqueueSnackbar(loginUser.msg, {
          variant: loginUser.success ? 'success' : 'error',
          TransitionComponent: Zoom,
          autoHideDuration: 1500,
        })  
        if (loginUser.success) {
          localStorage.setItem('token', loginUser.token)
          dispatch(setUser(loginUser.user))
          setTimeout(() => {
            navigate('/')
          }, 1500)
        }}
      })
    }


  return (
    <Box component='form' className={style.container}>
     <Logo />
      <Box className={style.body}>
        <Box className={style.bgImg}>
          <img src={bgImg} />
        </Box>

        <Box>
          <h1>Login</h1>
          <br />
          <p>
            If you don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </Box>

        <Box sx={{ ml: "-2px" }}>
          <Input px={"24.5rem"} text="Email" type="email" Icon={UilEnvelope} name='email' func={handleChange}  lable/>
        </Box>
        <Box sx={{ ml: "-2px" }}>
          <Input
            px={"24.5rem"}
            text="Password"
            type={passwordState ? "text" : "password"}
            name='password'
            func={handleChange}
            Icon={passwordState ? UilEye : UilEyeSlash}
            state={passwordState}
            lable
          />
        </Box>
        <Button className={style.button} text="Login" func={handleClick} value={inputValue} />
      </Box>
    </Box>
  );
};

export default Login;

