import React, { useState } from 'react'
import style from './Signup.module.css'
import bgImg from '../../assets/img/signup-bg.avif'

import { UilUserSquare } from '@iconscout/react-unicons'
import { UilEnvelope } from '@iconscout/react-unicons'
import { UilEye } from '@iconscout/react-unicons'
import { UilEyeSlash } from '@iconscout/react-unicons'
import { Box, Zoom } from '@mui/material'

import { useMutation } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';

import { QUERY_SIGN_UP } from '../../graphql'

import Logo from '../../components/Logo/Logo'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

const Signup = () => {
  const { passwordState } = useSelector((state) => state.app)
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()
  
  const [inputValue, setInputValue] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  })

  const [signUpUser] = useMutation(QUERY_SIGN_UP)

  const handleChange = (event) => {
    const { name, value } = event.target
    setInputValue({
      ...inputValue,
      [name]: value.trim(),
    })
  }

  const handleClick = () => {
    signUpUser({
      variables: {
        input: inputValue,
      },
      onCompleted: ({ createUser }) => {
        enqueueSnackbar(createUser.msg,{
          variant: createUser.success ? 'success' : 'error',
          TransitionComponent: Zoom,
          autoHideDuration: 1500,
        })
        if(createUser.success){
          setTimeout(() => {
            navigate('/login')
          }
          , 1500)
        }
      }
    })
  }


  return (
    <Box component="form" className={style.container}>
     <Logo/>
      <Box className={style.body}>
        <Box className={style.bgImg}>
          <img src={bgImg} />
        </Box>

        <Box>
          <h1>Creat new Account</h1>
          <br />
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Box>
        <Box sx={{ display: 'flex', gridGap: '2rem', mt: '1rem', ml: '-2px' }}>
          <Box>
            <Input
              px={'10rem'}
              text="First name"
              Icon={UilUserSquare}
              name="firstname"
              func={handleChange}
              lable
            />
          </Box>
          <Box>
            <Input
              px={'10rem'}
              text="Last name"
              Icon={UilUserSquare}
              name="lastname"
              func={handleChange}
              lable
            />
          </Box>
        </Box>
        <Box sx={{ ml: '-2px' }}>
          <Input
            px={'24.5rem'}
            text="Email"
            type="email"
            Icon={UilEnvelope}
            name="email"
            func={handleChange}
            lable
          />
        </Box>
        <Box sx={{ ml: '-2px' }}>
          <Input
            px={'24.5rem'}
            text="Password"
            type={passwordState ? 'text' : 'password'}
            name="password"
            func={handleChange}
            Icon={passwordState ? UilEye : UilEyeSlash}
            state={passwordState}
            lable
          />
        </Box>
        <Button
          className={style.button}
          text="Create Account"
          func={handleClick}
          value={inputValue}
        />
      </Box>
    </Box>
  )
}

export default Signup
