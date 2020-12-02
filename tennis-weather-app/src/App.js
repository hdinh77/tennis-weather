import React, { useState } from 'react';
import './App.css';
import Axios from "axios";

const api = {
  key: "2e0a2e3d27a24770ecdcb29b43c6b860",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const insertDB = (temperature) => {
    Axios.post('http://localhost:3001', {
      city: weather.name, temp: temperature})
      .then(() => {
        console.log("successful insert");
    });
  }

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {setWeather(result); setQuery(''); console.log(result);});

        if(weather.main != "undefined") {
          //insertDB(Math.round(weather.main.temp));
        }
    }

    
    
  } 

  

  const dayOrNight = (d) => {
    if(d.getHours() >= 5 && d.getHours() <= 19) {
      return 'd';
    }

    return 'n';
  }

  const backgroundImage = (d, condition) => {
    const curTemp = weather.main.temp;

    if(d === 'd') {
      if(condition === "rain") {
        return 'App rain-day';
      }else if(curTemp >= 85) {
        return 'App hot-day';
      }else if (curTemp >= 70) {
        return 'App warm-day'
      }else {
        return 'App cold-day';
      }
    }else {
      if(condition === "rain") {
        return 'App rain-night';
      }
        return 'App night';
    }
           
  }

  const getIconCode = (w) => {
    if(w === "Thunderstorm") {
      return '11';
    }else if (w === "Drizzle") {
      return '09';
    }else if(w === "Clouds") {
        return '02';
    }else if(w === "Rain") {
      return '10';
    }else if(w === 'Clear') {
      return '01';
    }else if(w === "Snow") {
      return '13';
    }else {
      return '50';
    }
  } 

  const weatherConditionString = () => {
    if((weather.weather[0].main !== "Rain" || weather.weather[0].main !== "Snow") && weather.wind.speed <= 12 && weather.main.temp < 100) {
      if(weather.main.temp > 90) {
        return (<span style={{color: "orange", fontSize: 30}}>FAIR</span>);
      }else if(weather.main.temp > 80) {
        return (<span style={{color: "yellow", fontSize: 30}}>GOOD</span>);
      }else if(weather.main.temp > 70) {
        return (<span style={{color: "green", fontSize: 30}}>PERFECT</span>);
      }else if(weather.main.temp > 60) {
        return (<span style={{color: "orange", fontSize: 30}}>FAIR</span>);
      }
    }

    return (<span style={{color: "red", fontSize: 30}}>NOT GREAT</span>);
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

    return `${hour}:${minutes} ${(new Date().getHours() <= 12) ? 'am' : 'pm'}`;
  }

  return (
    <div className=
       {
        (typeof weather.main !== "undefined")        // if we haven't done a search query yet, it just makes it app
         ? (backgroundImage(dayOrNight(new Date()), weather.weather[0].main)) 
         : 'App'
        }    
       >
         
        <main>
          <div className="search-box">
            <input type="text" className="search-bar" placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
          </div>
          
          {(typeof weather.main !== "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
                <div className="time">{timeBuilder(new Date())}</div>
              </div>

            <div>
              <img className="icon" src={`http://openweathermap.org/img/wn/${getIconCode(weather.weather[0].main)}${dayOrNight(new Date())}@2x.png`}></img>
            </div>

              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°F</div>
                <div className="tennis-condition">The Weather is {weatherConditionString()} for tennis!</div>
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
                  <div className="welcome">Tennis Weather</div>
                  <div className="block">
                    <span>{dateBuilder(new Date())}</span>
                    <br></br>
                    <span>{timeBuilder(new Date())}</span>
                  </div>
              </div>

              <div className="details-box" style={{display: "block", width: 250, right: 0, boxShadow: 0}}>
                created by Heather Dinh
              </div>
            </div>
          )}

        </main>
    </div>
  );
}

export default App;
