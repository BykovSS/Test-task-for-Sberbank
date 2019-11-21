import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'

//Дополнения стилями стандартного компонента чекбокс
const CustomCheckBoxStyles = withStyles({
	root: {
		color: '#9d9d9d',
		'&$checked': {
			color: green[600],
		},
	},
	checked: {},
})(props => <Checkbox color="default" {...props} />)

//Новый компонент с использованием ранееустановленных стилей
const CustomCheckBox = (props) => {

	return <FormControlLabel
		control={
			<CustomCheckBoxStyles
				icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
				checkedIcon={<CheckBoxIcon fontSize="large" />}
				value="checked"
				checked={props.checked}
				onClick={props.handleChangeStatus}
			/>
		}
		label={props.children}
	/>
}

CustomCheckBox.propTypes = {
	props: PropTypes.shape({
		checked: PropTypes.PropTypes.bool,
		handleChangeStatus: PropTypes.func,
		children: PropTypes.string
	})
}

export default CustomCheckBox