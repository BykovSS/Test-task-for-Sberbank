import React from 'react'
import Error from '../components/Error.jsx'
import CustomTable from './CustomTable.jsx'
import PropTypes from "prop-types"

const ListComponent = ({error, settings, displayParams, handleChangeSortParam, operations, convertIfDate, sort_param}) => {

	//Компонент для отображения страницы со списком операций
	return <div className="list">
		{//Если при загрузке данных произошла ошибка и данные не загрузились, то выводится соответствующее сообщение
			error !== null
				?
				<Error/>
				:
				<div className='list__table-wrap'>
					<CustomTable
						settings={settings}
						operations={operations.sort((a, b) => {
							if (convertIfDate(a[sort_param]) < convertIfDate(b[sort_param])) return -1
							if (convertIfDate(a[sort_param]) > convertIfDate(b[sort_param])) return 1
							return 0
						})}
						displayParams={displayParams}
						handleChangeSortParam={handleChangeSortParam}
					/>
				</div>
		}
	</div>
}

ListComponent.propTypes = {
	error: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	settings: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired
	})).isRequired,
	displayParams: PropTypes.shape({
		id:PropTypes.bool.isRequired,
		date:PropTypes.bool.isRequired,
		type:PropTypes.bool.isRequired,
		name:PropTypes.bool.isRequired,
		summ:PropTypes.bool.isRequired,
		header:PropTypes.string.isRequired
	}),
	handleChangeSortParam: PropTypes.func.isRequired,
	operations: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		date: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		summ: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	})),
	convertIfDate: PropTypes.func.isRequired,
	sort_param: PropTypes.string.isRequired
}

export default ListComponent