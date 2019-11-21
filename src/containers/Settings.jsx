import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import {updateSortParams} from '../actions'
import SettingsComponent from '../components/Settings.jsx'
import PropTypes from "prop-types"

const Settings = ({getHeader, displayParams, updateSortParams, match, settings}) => {

	const {id, date, type, name, summ, header} = displayParams

	//Установка состояний отображения чекбоксов и всплывающих сообщений
	const [state, setState] = useState({id: id, date: date, type: type, name: name, summ: summ})
	const [isOpen, setIsOpen] = useState({success: false, error: false})

	//Функция изменения состояния отображения чекбоксов
	const handleChangeStatus = (param) => {
		setState(Object.assign({}, state, {[param]: !state[param]}))
	}

	//Функция изменения состояния (redux) отображаемых столбцов
	const handleSendChanges = () => {
		let rezult = false
		for (let key in state) {
			rezult = rezult || state[key] === true
		}
		//Если ни один столбец не указан, то отображается сообщение
		if (!rezult) {
			setIsOpen(Object.assign({}, isOpen, {error: true}))
		}
		//При успешном сохранении так же отображается сообщение
		else {
			updateSortParams({id: state.id, date: state.date, type: state.type, name: state.name, summ: state.summ})
			setIsOpen(Object.assign({}, isOpen, {success: true}))
		}
	}

	//Функция изменения состояния (закрытие) всплывающего окна
	const handleCloseMassage = () => {
		setIsOpen(Object.assign({}, isOpen, {success: false, error: false}))
	}

	//Запуск в hook'e useEffect функции, которая обновляет в состоянии (redux) текущее значение заголовка
	useEffect(() => {
		if (getHeader(match.path) !== header) {
			updateSortParams({header: getHeader(match.path)})
		}
	}, [])

	return <SettingsComponent
			settings={settings}
			state={state}
			isOpen={isOpen}
			handleChangeStatus={handleChangeStatus}
			handleSendChanges={handleSendChanges}
			handleCloseMassage={handleCloseMassage}
		/>
}

Settings.propTypes = {
	getHeader: PropTypes.func.isRequired,
	displayParams: PropTypes.shape({
		id:PropTypes.bool.isRequired,
		date:PropTypes.bool.isRequired,
		type:PropTypes.bool.isRequired,
		name:PropTypes.bool.isRequired,
		summ:PropTypes.bool.isRequired,
		header:PropTypes.string.isRequired
	}),
	updateSortParams: PropTypes.func.isRequired,
	match: PropTypes.shape({
		path: PropTypes.string.isRequired
	}),
	settings: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired
	})).isRequired
}

const mapStateToProps = state => {
	return {
		displayParams: state.displayReducer
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateSortParams: (data) => dispatch(updateSortParams(data))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings)