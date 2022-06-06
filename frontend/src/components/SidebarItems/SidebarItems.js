import React from 'react'
import style from './SidebarItems.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { setIcon } from '../../store/action/appFuntions'

const SidebarItems = ({ Icon, text }) => {
	const dispatch = useDispatch()

	const { iconState } = useSelector(state => state.app)

	const handleClick = () => {
		dispatch(setIcon(text))
	}

	return (
		<div className={style.contect} onClick={handleClick} >
			{
				iconState === text && <div className={style.light}></div>
			}
			<Icon /> <p>{text}</p>
		</div>
	)
}

export default SidebarItems;