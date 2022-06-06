import React from 'react'
import style from './Dialog.module.css'

import {
  Dialog as DialogCard,
  DialogTitle,
  IconButton,
  Box
} from '@mui/material'

import { UilTimesCircle } from '@iconscout/react-unicons'

import { useDispatch, useSelector } from 'react-redux'

import { setDialog } from '../../store/action/appFuntions'

import Input from '../Input/Input'
import Button from '../Button/Button'

const Dialog = ({ msg, text, px, name, value, Icon, func }) => {
  const dispatch = useDispatch()

  const { dialogState } = useSelector((state) => state.app)

  const handleClick = () => {
    dispatch(setDialog(!dialogState))
  }

  const handleSubmit = () => {
    if (value.length > 0) {
      if (func) {
        func.handleClick && func.handleClick()
      }
      dispatch(setDialog(!dialogState))
    }
  }

  return (
    <DialogCard onClose={handleClick} open={dialogState}>
      <Box component="form" className={style.container}>
        <DialogTitle
          sx={{ p: 2, textAlign: 'center', fontFamily: 'DIN Pro Bold' }}
        >
          {msg}
        </DialogTitle>
        <IconButton
          sx={{ position: 'absolute', right: 10, top: 10 }}
          onClick={handleClick}
        >
          <UilTimesCircle />
        </IconButton>
        <div className={style.card}>
          <Input
            text={text}
            px={px}
            name={name}
            value={value}
            func={func.handleInput}
            Icon={Icon}
            lable
          />
          <Button text="Send Mail" value={value} func={handleSubmit} />
        </div>
      </Box>
    </DialogCard>
  )
}

export default Dialog
