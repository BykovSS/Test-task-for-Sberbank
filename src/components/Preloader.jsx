import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

//Компонент для отображения прелоадера в ожидании загрузки данных

const usePreloaderStyles = makeStyles({
	root: {
		position: 'absolute',
		top: 'calc(50% - 30px)',
		left: 'calc(50% - 30px)'
	}
})

const Preloader = () => {
	const classes = usePreloaderStyles()
	return (
		<div className="preloader-wrap">
			<CircularProgress
				size={60}
				thickness={5}
				className={classes.root}
			/>
		</div>
	)
}

export default Preloader