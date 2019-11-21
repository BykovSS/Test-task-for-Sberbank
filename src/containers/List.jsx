import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {updateSortParams} from '../actions'
import PropTypes from "prop-types";
import ListComponent from '../components/List.jsx'

const List = ({getHeader, displayParams, data, updateSortParams, match, settings}) => {

	const {operations, error} = data
	const {sort_param, header} = displayParams

	//Функция анализирует полученный аргумент. Если это дата, то возвращает значение в милисекундах
	//Если аргумент не является датой, то возвращается без изменений
	const convertIfDate = (data) => {
		if (sort_param === 'date') {
			if (new Date(data) == 'Invalid Date') {
				let local_date = (data).split(/-|\s|:/)
				local_date = new Date(Number('20'+local_date[2]), Number(local_date[1]-1), Number(local_date[0]), Number(local_date[3]), Number(local_date[4]))
				return local_date.getTime()
			}
			return (new Date(data)).getTime()
		}
		return data
	}

	//Функция изменения состояния (redux) столбца, по которому идет сортировка
	const handleChangeSortParam = (param) => {
		if (settings.reduce((rez, item) => {return rez || param === item.name}, false)) {
			if (param !== sort_param) {
				updateSortParams({sort_param: param})
			}
		}
	}

	//Запуск в hook'e useEffect функции, которая обновляет в состоянии (redux) текущее значение заголовка
	useEffect(() => {
		if (getHeader(match.path) !== header) {
			updateSortParams({header: getHeader(match.path)})
		}
	}, [])

	return <ListComponent
			error={error}
			settings={settings}
			displayParams={displayParams}
			handleChangeSortParam={handleChangeSortParam}
			operations={operations}
			convertIfDate={convertIfDate}
			sort_param={sort_param}
		/>
}

List.propTypes = {
	getHeader: PropTypes.func.isRequired,
	displayParams: PropTypes.shape({
		id:PropTypes.bool.isRequired,
		date:PropTypes.bool.isRequired,
		type:PropTypes.bool.isRequired,
		name:PropTypes.bool.isRequired,
		summ:PropTypes.bool.isRequired,
		header:PropTypes.string.isRequired
	}),
	data: PropTypes.shape({
		operations: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			date: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			summ: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired
		})),
		error: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
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
		displayParams: state.displayReducer,
		data: state.dataReducer
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateSortParams: (data) => dispatch(updateSortParams(data))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(List)