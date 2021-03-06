import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const api = {
	key: 'df42bec29a2444cf30a1925671bbf8c6',
	base: 'https://api.openweathermap.org/data/2.5/'
};

function App() {
	//const apiUrl = `api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${API_KEY}`;
	const [ query, setQuery ] = useState('');
	const [ weather, setWeather ] = useState('');

	const Search = async (evt) => {
		if (evt.key === 'Enter' || evt.type === 'click') {
			let response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
			let result = await response.json();
			setWeather(result);
			setQuery('');
		}
	};

	const dateBuilder = (d) => {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		let days = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	let time = new Date().getHours();

	return (
		<div className="app-wrapper">
			<div className="search-box">
				<input
					type="text"
					className="search-bar"
					placeholder="Search..."
					onChange={(e) => setQuery(e.target.value)}
					value={query}
					onKeyPress={Search}
				/>
				<div className="search-button">
					<button onClick={Search}>
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</div>
			</div>{' '}
			<div
				className={
					weather.main === undefined ? time >= 22 ? (
						'night'
					) : time > 18 ? (
						'evening'
					) : time > 12 ? (
						'sunshine'
					) : time > 8 ? (
						'morning'
					) : time > 5 ? (
						'dawn'
					) : (
						'night'
					) : weather.main.temp > 16 ? (
						'warm'
					) : (
						'app'
					)
				}
			>
				{/* 			(!!weather.main && (weather.main.temp >= 16 ? 'warm' : 'app')) || 'app'	*/}
				<main>
					{!!weather.main && (
						<div className="location-box">
							<div className="location">
								{weather.name}, {weather.sys.country}
							</div>
							<div className="date">{dateBuilder(new Date())}</div>
							<div className="weather-box">
								<div className="temp">{Math.round(weather.main.temp)}°C</div>
								<div className="weather">{weather.weather[0].main}</div>
								<div className="wind__speed">Wind speed: {Math.round(weather.wind.speed)}km/h </div>
							</div>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}

export default App;
