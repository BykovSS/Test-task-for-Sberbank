import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import CustomTableHead from './CustomTableHead.jsx'
import PropTypes from "prop-types"

//Описание используемых стилей
const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	tableRow: {
		border: '1px solid #000'
	},
	tableHeadSell: {
		borderBottom: 'none',
		borderRight: '1px solid #000',
		padding: '5px'
	},
	tableBodySell: {
		borderBottom: 'none',
		borderRight: '1px solid #000',
		padding: '0 5px'
	},
	tableWrapper: {
		overflowX: 'auto',
	},
});

//Компонент для отображения таблицы с данными
const CustomTable = ({settings, operations, displayParams, handleChangeSortParam}) => {

	const classes = useStyles()

	//Установка значения теущей страницы в состоянии
	const [page, setPage] = useState(0)

	//Функция находит и возвращает возможное количество строк на странице
	const findRowsPerPage = () => {
		const header = document.querySelector('.header')
		const main_content = document.querySelector('.main-content')
		const table_header = document.querySelector('.MuiTableHead-root')
		const table_pag = document.querySelector('.MuiTablePagination-root')
		const heightForTable = window.innerHeight - (header.getBoundingClientRect().height
			+ parseInt(window.getComputedStyle(main_content).marginTop)
			+ parseInt(window.getComputedStyle(main_content).marginBottom)
			+ table_header.getBoundingClientRect().height
			+ table_pag.getBoundingClientRect().height
			+ parseInt(window.getComputedStyle(main_content).paddingBottom)
			+ parseInt(window.getComputedStyle(main_content).paddingTop))

		let table_row_height = 0
		document.querySelectorAll('.list__row').forEach(item => {
			if (item.getBoundingClientRect().height > table_row_height) {
				table_row_height = item.getBoundingClientRect().height
			}
		})
		return Math.floor(heightForTable/table_row_height)
	}

	//Установка значения количества строк на странице в состоянии
	const [rowsPerPage, setRowsPerPage] = useState(1)

	//Функция изменения текущей страницы
	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	//Установка значения количества строк на строке
	useEffect(() => {
		if (document.querySelector('.list__row')) {
			if (rowsPerPage !== findRowsPerPage()) {
				setRowsPerPage(findRowsPerPage())
			}
		}
	}, [])

	//Вычисление количества пустых строк на последней странице
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, operations.length - page * rowsPerPage)

	return (
		<div className={classes.root}>
			<div className={classes.tableWrapper}>
				<Table
					className={classes.table}
					size="small"
				>
					<CustomTableHead
						settings={settings}
						displayParams={displayParams}
						handleChangeSortParam={handleChangeSortParam}
						classes={{tableRow: classes.tableRow, tableHeadSell: classes.tableHeadSell}}

					/>
					<TableBody>
						{operations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
								return (
									<TableRow
										className={classes.tableRow + ' list__row'}
										key={row.id}
									>
										{settings.map(item => {
											return (
												displayParams[item.name]
												?
												<TableCell
													key={item.id}
													component="th"
													scope="row"
													className={classes.tableBodySell + ` list__td list__${item.name}`}
												>
													{item.name !== 'summ' ? row[item.name] : String(row[item.name]).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
												</TableCell>
												: null
											)
										})}
									</TableRow>
								);
							})}
						{emptyRows > 0 && (
							<TableRow style={{ height: (document.querySelector('.list__row') ? document.querySelector('.list__row').offsetHeight : 0) * emptyRows }}>
								<TableCell colSpan={5} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<TablePagination
				rowsPerPageOptions={[]}
				component="div"
				count={operations.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'previous page',
				}}
				nextIconButtonProps={{
					'aria-label': 'next page',
				}}
				onChangePage={handleChangePage}
			/>
		</div>
	)
}

CustomTable.propTypes = {
	settings: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired
	})).isRequired,
	operations: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		date: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		summ: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	})),
	displayParams: PropTypes.shape({
		id:PropTypes.bool.isRequired,
		date:PropTypes.bool.isRequired,
		type:PropTypes.bool.isRequired,
		name:PropTypes.bool.isRequired,
		summ:PropTypes.bool.isRequired,
		header:PropTypes.string.isRequired
	}),
	handleChangeSortParam: PropTypes.func.isRequired
}

export default CustomTable