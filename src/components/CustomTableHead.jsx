import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import PropTypes from "prop-types";

//Компонент для отображения заголовка таблицы с данными
const CustopTableHead = ({settings, displayParams, handleChangeSortParam, classes}) => {
	return (
		<TableHead>
			<TableRow
				className={classes.tableRow}
			>
				{settings.map(setting => (
					displayParams[setting.name]
					?
					<TableCell
						key={setting.id}
						align={'left'}
						padding={'default'}
						className={classes.tableHeadSell + ' list__td' + ` list__${setting.name}` + ' list__tablesell-header'}
					>
						<span
							className="list__table-headerlabel-wrap"
							onClick={handleChangeSortParam.bind(null, setting.name)}
						>
							{setting.label}
						</span>
					</TableCell>
					: null
				))}
			</TableRow>
		</TableHead>
	)
}

CustopTableHead.propTypes = {
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
	classes: PropTypes.objectOf(PropTypes.string)
}

export default CustopTableHead