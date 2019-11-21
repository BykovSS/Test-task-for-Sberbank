import React from 'react'
import CustomCheckBox from './CustomCheckBox.jsx'
import SaveButton from './SaveButton.jsx'
import ShowMessage from './ShowMessage.jsx'
import PropTypes from "prop-types"

//Компонент для отображения страницы с настройками
const SettingsComponent = ({settings, state, isOpen, handleChangeStatus, handleSendChanges, handleCloseMassage}) => {

	return <div className="settings">
		<ul className="settings__list">
			{//Вывод чекбоксов с заданными параметрами
				settings.map(setting => {
				return (
					<li key={setting.id} className="settings__list-item">
						<CustomCheckBox
							checked={state[setting.name]}
							handleChangeStatus={handleChangeStatus.bind(null, setting.name)}
						>
							{setting.label}
						</CustomCheckBox>
					</li>
				)
			})}
		</ul>
		<hr className="settings__hr"/>
		<div className="settings__button-wrap">
			<SaveButton
				variant="outlined"
				onClick={handleSendChanges}
			>
				Сохранить
			</SaveButton>
		</div>

		<ShowMessage
			isOpen={isOpen.error}
			handleCloseMassage={handleCloseMassage}
			type={'error'}
		>
			В настройках должна быть отмечена хотя бы одна колонка!
		</ShowMessage>

		<ShowMessage
			isOpen={isOpen.success}
			handleCloseMassage={handleCloseMassage}
			type={'success'}
		>
			Настройки успешно сохранены!
		</ShowMessage>
	</div>
}

SettingsComponent.propTypes = {
	settings: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired
	})).isRequired,
	state: PropTypes.shape({
		id: PropTypes.bool.isRequired,
		date: PropTypes.bool.isRequired,
		type: PropTypes.bool.isRequired,
		name: PropTypes.bool.isRequired,
		summ: PropTypes.bool.isRequired
	}),
	isOpen: PropTypes.shape({
		success: PropTypes.bool.isRequired,
		error: PropTypes.bool.isRequired
	}),
	handleChangeStatus: PropTypes.func.isRequired,
	handleSendChanges: PropTypes.func.isRequired,
	handleCloseMassage: PropTypes.func.isRequired
}

export default SettingsComponent