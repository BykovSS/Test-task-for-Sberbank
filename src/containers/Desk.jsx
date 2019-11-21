import React, {useEffect} from 'react'
import {connect} from "react-redux"
import PropTypes from 'prop-types'
import {updateSortParams} from '../actions'
import DeskComponent from '../components/Desk.jsx'

const Desk = ({getHeader, header, updateSortParams, match}) => {

	//Запуск в hook'e useEffect функции, которая обновляет в состоянии (redux) текущее значение заголовка
	useEffect(() => {
		if (getHeader(match.path) !== header) {
			updateSortParams({header: getHeader(match.path)})
		}
	}, [])

	return <DeskComponent/>
}

Desk.propTypes = {
	getHeader: PropTypes.func.isRequired,
	header: PropTypes.string.isRequired,
	updateSortParams: PropTypes.func.isRequired,
	match: PropTypes.shape({
		path: PropTypes.string.isRequired
	})
}

const mapStateToProps = state => {
	return {
		header: state.displayReducer.header,

	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateSortParams: (data) => dispatch(updateSortParams(data))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Desk)