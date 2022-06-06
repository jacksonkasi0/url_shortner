import React from 'react'
import style from './Loading.module.css'

import { Box } from '@mui/material'

const Loading = () => {
	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 26 }} >
			<div className={style.lds_ellipsis}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</Box>
	)
}

export default Loading;