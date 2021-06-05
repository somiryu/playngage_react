import React from 'react'

export default ({ listener, klass, icon, }) => {
	return (
		<div onClick={listener} className={klass || "FaIcon"}>
			<i className={"fa fa-" + icon} />
		</div>
	)
}
