import React from "react"
import PropTypes from 'prop-types'

//Компонент для отображения блока заголовка
const Header = ({title}) => {

	//Если значения title нет, то присваивается по-умолчанию
	const header_title = title || 'Рабочий стол'

	return (
		<div className="header">
			<div className="header__title">{header_title}</div>
		</div>
	)
}

Header.propTypes = {
	title: PropTypes.string
}


export default Header