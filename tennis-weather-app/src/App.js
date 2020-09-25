import React, { useState } from 'react';
import './App.css';
import config from './config.js';

const api = {
  key: "2e0a2e3d27a24770ecdcb29b43c6b860",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {setWeather(result); setQuery(''); console.log(result);});
    }
  } 

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date} ${year}`
  }

  const timeBuilder = (d) => {
    let hour = ('0' + d.getHours()).slice(-2) % 12;
    if(hour == '0') hour = '12';
    let minutes = ('0' + d.getMinutes()).slice(-2);

    return `${hour}:${minutes}`;
  }

  return (
    <div className={
      (typeof weather.main != "undefined")        // if we haven't done a search query yet, it just makes it app
       ? ((weather.main.temp > 70)
         ? 'App warm' 
         : 'App cold') 
       : 'App'}>
        <main>
          <div className="search-box">
            <input type="text" className="search-bar" placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
          </div>
          
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
                <div className="time">{timeBuilder(new Date())}</div>
              </div>

              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°F</div>
                <div className="tennis-condition">Condition for Tennis: </div>
              </div>
              <div className="details-box">
                <div className="weather">Weather: {weather.weather[0].main}</div>
                <div className="humidity">Humidity: {weather.main.humidity}%</div>
                <div className="wind">Wind: {Math.round(weather.wind.speed)}mph</div>
                <div className="feels-like">Feels like: {Math.round(weather.main.feels_like)}°F</div>
              </div>
            </div>
          ) 
          : (
            <div>
              <div className="home">
                  <div className="welcome">TennisTemp</div>
                  <div className="date">{dateBuilder(new Date())}</div>
              </div>
            </div>
          )}

        </main>
    </div>
  );
}

export default App;
