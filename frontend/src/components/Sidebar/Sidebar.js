import React from 'react'
import style from './Sidebar.module.css'
import Logo from '../../assets/img/Icon.png'

import { UilEstate, UilUsersAlt, UilAnalysis, UilShoppingBag, UilCommentAltDots, UilCalendarAlt, UilSetting } from '@iconscout/react-unicons'
import { Divider } from '@mui/material'

import SidebarItems from '../SidebarItems/SidebarItems'

const Sidebar = () => {
	return (
		<div className={style.sidebar}>
			<div className={style.logo}>
				<img src={Logo} alt="Grovemade" />
				<h3>Admin</h3>
			</div>
			<br/>
			<Divider  />
			<h3>DASHBOARD</h3>
			<SidebarItems Icon={UilEstate} text='Dashboard' />
			<Divider  />
			<h3>ANALYTICS</h3>
			<SidebarItems Icon={UilAnalysis} text='Performance' />
			<SidebarItems Icon={UilCommentAltDots} text='Messages' />
			<Divider />
			<h3>UTILITIES</h3>
			<SidebarItems Icon={UilCalendarAlt} text='Activity' />
			<SidebarItems Icon={UilSetting} text='Settings' />
		</div>
	)
}

export default Sidebar