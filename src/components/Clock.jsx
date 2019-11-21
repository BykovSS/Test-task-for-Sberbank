import React, {useState, useEffect} from 'react'

const Clock = () => {

	//Функция установки даты. Возвращает объект со значениями текущей даты и времени
	const setTime = () => {
		const date = new Date()
		return {minutes: date.getMinutes(), hours: date.getHours(), date: date.getDate(), month: date.getMonth()}
	}

	//Установка состояния - текущее дата и время
	const [time, changeTime] = useState(setTime())

	//Массив месяцев
	const monthToText = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг' , 'сен', 'окт', 'ноя', 'янв']

	//Установка изменения текущего значения даты и времени в hook'e useEffect
	useEffect(() => {
		let interval = setInterval(() => {
			const date = new Date()
			if (date.getMinutes() !== time.minutes) {
				changeTime(setTime())
			}
		}, 1000)

		//Очистка интервала ранее рапущенной функции
		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div className="panel__clock">
			<div className="panel__time">{`${time.hours >= 10 ? time.hours : '0'+time.hours}:${time.minutes >= 10 ? time.minutes : '0'+time.minutes}`}</div>
			<div className="panel__date">{time.date >= 10 ? time.date : '0'+time.date}</div>
			<div className="panel__month">{monthToText[time.month]}</div>
		</div>
	)
}

export default Clock