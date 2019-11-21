import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Slide from '@material-ui/core/Slide'

//Установка стилей
const useShowMessageStyles = makeStyles({
	errorText: {
		color: '#f00',
		fontSize: '20px'
	},
	successText: {
		color: '#5b9bd5',
		fontSize: '20px'
	},
	actions: {
		paddingRight: '15px'
	},
	errorButton: {
		fontSize: '18px',
		color: '#262626'
	},
	successButton: {
		fontSize: '18px',
		color: '#1456a8'
	}
})

//Функция для анимации плавного всплывания окна с сообщением
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

//Компонент для отображения всплывающего окна с сообщением
const ShowMessage = (props) => {

	const classes = useShowMessageStyles()

	const { isOpen, handleCloseMassage, children, type } = props

	return (
			<Dialog
				open={isOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleCloseMassage}
			>
				<DialogContent>
					<DialogContentText className={type==='error' ? classes.errorText : classes.successText}>
						{children}
					</DialogContentText>
				</DialogContent>
				<DialogActions className={classes.actions}>
					{type === 'error'
					?
					<Button onClick={handleCloseMassage} className={classes.errorButton}>
						Понятно
					</Button>
					:
					<Button onClick={handleCloseMassage} className={classes.successButton}>
						Отлично!
					</Button>}
				</DialogActions>
			</Dialog>
	);
}

ShowMessage.propTypes = {
	isOpen: PropTypes.PropTypes.bool.isRequired,
	handleCloseMassage: PropTypes.func,
	children: PropTypes.string,
	type: PropTypes.oneOf(['error', 'success']).isRequired
}

export default ShowMessage