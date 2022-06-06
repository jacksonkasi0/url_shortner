import React from 'react'
import style from './Navbar.module.css'

import { Avatar, IconButton } from '@mui/material'
import { UilSearch, UilSignout } from '@iconscout/react-unicons'


import Input from '../Input/Input'

const Navbar = () => {


	const stringAvatar = (name) => {
		return {
			sx: { bgcolor: '#339af0', color: '#fff' },
			children: `${name.split(" ")[0][0]} ${name.split(' ')[1][0]}`.toUpperCase()
		};
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		window.location.href = '/'
	}

	return (
		<div className={style.container}>
			<div className={style.input}>
				<Input text='Search' px={'400px'} Icon={UilSearch} />
			</div>
			<div className={style.user}>

				<IconButton size='large' >
					<i className="fa-solid fa-bell"></i>
				</IconButton>
				<IconButton >
					<Avatar {...stringAvatar('jackson kasi')} />
				</IconButton>
				<IconButton onClick={handleLogout} >
					<UilSignout />
				</IconButton>
			</div>
		</div>
	)
}

export default Navbar