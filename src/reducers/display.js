import constants from '../constants'

//Инициализация начального состояния
const initialState = {
	id: true,
	date: true,
	type: true,
	name: true,
	summ: true,
	sort_param: 'id',
	header: 'Рабочий стол'
}

//Создание редьюсера для обработки действий и внесения изменений в часть state,
//которая отвечает за вывод столбцов, столбец сортировки и значение заголовка
const displayReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.UPDATE_DISPLAY_PARAMS:
			return Object.assign({}, state, action.params)
		default:
			return state
	}
}

export default displayReducer