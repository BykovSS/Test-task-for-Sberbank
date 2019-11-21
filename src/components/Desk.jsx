import React from 'react'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'

//Отображение рабочего стола
const DeskComponent = () => {

	return <div className="desk">
		<h1 className="desk__header">Операции</h1>
		<div className="desk__link-wrap">
			<Tooltip title='Список операций' placement="right">
				<Link to="/list" className="desk__link">Список операций</Link>
			</Tooltip>
		</div>
		<div className="desk__link-wrap">
			<Tooltip title='Настройка списка' placement="right">
				<Link to="/settings" className="desk__link">Настройка списка</Link>
			</Tooltip>
		</div>
	</div>
}

export default DeskComponent