import React, { useState, useEffect } from 'react';

const API_KEY = "29ed3276a014df65758c7a26c4e82d60";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";


function App(){

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [torontoWeather, setTorontoWeather] = useState({});
    const [vancouverWeather, setVancouverWeather] = useState({});

    useEffect(() => {

        const getTorontoWeather = async() => {
            const response = await fetch(`${BASE_URL}weather?q=toronto&units=metric&APPID=${API_KEY}`);
            const data = await response.json();
            setTorontoWeather(data);
            console.log(data);
        }
        getTorontoWeather();
        const getVancouverWeather = async() => {
            const response = await fetch(`${BASE_URL}weather?q=vancouver&units=metric&APPID=${API_KEY}`);
            const data = await response.json();
            setVancouverWeather(data);
            console.log(data);
        }
        getVancouverWeather();
    },[]) // second argument determines conditions under which effect is run




    const search = e => {
        if (e.key === "Enter") {
            fetch(`${BASE_URL}weather?q=${query}&units=metric&APPID=${API_KEY}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setQuery('');

            })
        }
    }
    

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear()

        return `${day} ${date} ${month} ${year}`;
    }

    return (
        <div className="App">
            
        { (typeof torontoWeather.main != "undefined") ? (  
            <div className="box toronto-weather">
                <div className="location-box">
                    <div className="location">{torontoWeather.name}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                    <div className="temp">
                        {Math.round(torontoWeather.main.temp)}°c
                    </div>
                <div className="weather">{torontoWeather.weather[0].main}</div>
                </div>
            </div>
            ) : <div>loading toronto weather...</div>
        }

        { (typeof vancouverWeather.main != "undefined") ? (  
            <div className="box vancouver-weather">
                <div className="location-box">
                    <div className="location">{vancouverWeather.name}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                    <div className="temp">
                        {Math.round(vancouverWeather.main.temp)}°c
                    </div>
                <div className="weather">{vancouverWeather.weather[0].main}</div>
                </div>
            </div>
            ) : <div>loading vancouver weather...</div>
        }

            <div className="box search-weather">
                <div className="search-box">
                    <input 
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                <div>
                <div className="location-box">
                    <div className="location">{weather.name}, {weather.sys.country}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                    <div className="temp">
                    {Math.round(weather.main.temp)}°c
                    </div>
                    <div className="weather">{weather.weather[0].main}</div>
                </div>
                </div>
                ) : <div>enter valid location above</div>}
          </div>
        </div>
      );

}


export default App;