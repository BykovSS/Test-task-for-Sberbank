import { combineReducers } from 'redux'
import dataReducer from './data'
import displayReducer from './display'

//Объединение редьюсеров с один основной
const mainReducer = combineReducers({dataReducer, displayReducer})

export default mainReducer