import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {fetchData} from '../actions'
import Preloader from '../components/Preloader.jsx'
import {Switch, Route} from 'react-router'
import Panel from '../components/Panel.jsx'
import Header from '../components/Header.jsx'
import Desk from './Desk.jsx'
import List from './List.jsx'
import Settings from './Settings.jsx'


const App = ({header, isFetching, fetchData}) => {

	//Массив параметров отображаемых чекбоксов
	const settings = [{
		id: 1,
		name: 'id',
		label: 'Id операции'
	}, {
		id: 2,
		name: 'date',
		label: 'Дата операции'
	}, {
		id: 3,
		name: 'type',
		label: 'Тип клиента'
	}, {
		id: 4,
		name: 'name',
		label: 'ФИО клиента'
	}, {
		id: 5,
		name: 'summ',
		label: 'Сумма операции'
	}]

	//Функция получения заголовка окна. Принимает текущий path, возвращает заголовок
	const getHeader = (path) => {
		return [{path: '/', header: 'Рабочий стол'}, {path: '/list', header: 'Список операций'},
		{path: '/settings', header: 'Настройки списка'}].filter(item =>
		{return path === item.path})[0].header
	}

	//Вызов функции загрузки данных в hook'е useEffect
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className="app">
			<Header
				title={header}
			/>
			<Panel/>
			<div className="main-content-wrap">
				<div className="main-content">
					{//Пока данные не загрузятся будет отображаться прелоадер
						isFetching
					?
						<Preloader/>
					:
						<Switch>
							<Route exact path="/" render={props => {
								return <Desk {...props} getHeader={getHeader}/>
							}}/>
							<Route exact path="/list" render={props => {
								return <List {...props} getHeader={getHeader} settings={settings}/>
							}}/>
							<Route exact path="/settings" render={props => {
								return <Settings {...props} getHeader={getHeader} settings={settings}/>
							}}/>
						</Switch>
					}
				</div>
			</div>
		</div>
	)
}

App.propTypes = {
	header: PropTypes.string,
	isFetching: PropTypes.bool.isRequired,
	fetchData: PropTypes.func.isRequired
}

const mapStateToProps = state => {
	return {
		header: state.displayReducer.header,
		isFetching: state.dataReducer.isFetching
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchData: () => dispatch(fetchData())
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(App)