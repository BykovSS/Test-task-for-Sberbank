import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'

//Установка стилей
const useSaveButtonStyles = makeStyles({
	root: {
		textTransform: 'none',
		border: '2px solid #9d9d9d',
		fontSize: '20px',
		lineHeight: '30px',
		alignItems: 'flex-end',
		boxShadow: '5px 5px 10px -10px #000',
		color: '#262626'
	}
})

//Компонент для отображения кнопки "Сохранить" с заданными ранее стилями
const SaveButton = (props) => {
	const classes = useSaveButtonStyles()
	return <Button
		className={classes.root+' '+props.className}
		onClick={props.onClick}
		variant = {props.variant || 'text'}
	>
		<SaveOutlinedIcon fontSize="large" className="settings__button-icon"/>
		{props.children}
	</Button>
}

SaveButton.propTypes = {
	props: PropTypes.shape({
		className: PropTypes.string,
		onClick: PropTypes.func,
		variant: PropTypes.oneOf(['text', 'outlined', 'contained'])
	})
}

export default SaveButton