import fetch from 'isomorphic-fetch'
import constants from '../constants'

//Action Creator для создания действия отправки запроса для получения данных
export const dataIsFatching = () => {
	return {
			type: constants.FETCH_DATA_REQUEST
	}
}

//Action Creator для создания действия успешного получения данных
function receiveData(data) {
	return {
		type: constants.FETCH_DATA_SUCCESS,
		operation: data
	}
}

//Action Creator для создания действия возникновения ошибки при получении данных
function errorFetchData(err) {
	return {
		type: constants.FETCH_DATA_FAILURE,
		error: err
	}
}

//Функция отправки запроса для получения данных и обработки ответа
export function fetchData(url = 'data.json') {
	return dispatch => {
		dispatch(dataIsFatching())
		return fetch(`${url}`)
			.then(response => response.json())
			.then(data => dispatch(receiveData(data)))
			.catch(err => dispatch(errorFetchData(err)))
	}
}

//Action Creator для создания действия обновления отображаемых столбцов, столбца сортировки и значения заголовка
export function updateSortParams(data) {
	return {
		type: constants.UPDATE_DISPLAY_PARAMS,
		params: data
	}
}


