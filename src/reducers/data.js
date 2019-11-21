import constants from '../constants'

//Инициализация начального состояния
const initialState = {
	operations: [],
	isFetching: false,
	error: null
}

//Создание редьюсера для обработки действий и внесения изменений в часть state, которая отвечает за данные операций
const dataReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.FETCH_DATA_REQUEST:
			return Object.assign({}, state, {isFetching: true})
		case constants.FETCH_DATA_SUCCESS:
			return Object.assign({}, state, {operations: action.operation, isFetching: false})
		case constants.FETCH_DATA_FAILURE:
			return Object.assign({}, state, {error: action.error, isFetching: false})
		default:
			return state
	}
}

export default dataReducer