import React from 'react'
import style from './AlertCard.module.css'

import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

const AlertCard = ({ msg, success }) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2} >
      {success ? (
        <Alert severity="success" className={style.container} >{msg}</Alert>
      ) : (
        <Alert severity="error" className={style.container} >{msg}</Alert>
      )}
    </Stack>
  )
}

export default AlertCard
