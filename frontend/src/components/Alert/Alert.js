import React, { useState } from 'react'
import AlertCard from '../AlertCard/AlertCard'

const Alert = ({msg,success}) => {

	const [open, setOpen] = useState(false)

  return (
	<div>
		 <DialogCard onClose={setOpen(!open)} open={open}>
			<AlertCard msg={msg} success={success} />
		 </DialogCard>
	</div>
  )
}

export default Alert