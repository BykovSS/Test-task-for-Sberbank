import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import DesktopIcon from '@material-ui/icons/DesktopWindows'
import NotesIcon from '@material-ui/icons/Notes'
import SettingsIcon from '@material-ui/icons/SettingsOutlined'
import { Link } from 'react-router-dom'
import Clock from './Clock.jsx'


//Компонент для отображения блока панели с левой стороны
const Panel = () => {

	//Массив кнопок-иконок
	const buttonsName = [{
		id: 1,
		tooltip: 'Рабочий стол',
		path: '/',
		component: <DesktopIcon/>
	},{
		id: 2,
		tooltip: 'Список операций',
		path: '/list',
		component: <NotesIcon/>
	}, {
		id: 3,
		tooltip: 'Настройка списка',
		path: '/settings',
		component: <SettingsIcon/>
	}]

	return (
		<div className="panel">
			<div className="panel__content">
				<div className="panel__icons">
					{
						buttonsName.map(button => {
							return (
								<div key={button.id} className="panel__icon-wrap">
									<Tooltip title={button.tooltip} placement="right">
										<Link to={button.path} className="panel__link">{button.component}</Link>
									</Tooltip>
								</div>
							)
						})
					}
				</div>
				<Clock/>
			</div>
		</div>
	)
}

export default Panel