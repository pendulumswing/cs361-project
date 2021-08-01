import React, { useState, useEffect } from 'react';
import LocationWeatherData from './LocationWeatherData';
import axios from 'axios';
import data1 from './location1data.json';
import data2 from './location2data.json';

function Layout(props) {
  // const { children } = props
  const [currentPrice, setCurrentPrice] = useState(0);
  const [weather, setWeather] = useState(undefined);
  const testUrl = `api.openweathermap.org/data/2.5/weather?zip=85750&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=metric`
  console.log('data1: ', data1)

  useEffect(() => {
    fetch('/api/stocks/NFLX').then(res => res.json()).then(data => {
      setCurrentPrice(data)
    })
  }, [])

  // // TODO - setup call through server
  // useEffect(() => {
  //   axios.get(testUrl)
  //     .then(res => {
  //       console.log(res)
  //       setWeather(res)
  //     }).catch(error => (
  //       console.log(error)
  //   ))
  // }, [])

  const data = {
    "coord": {
      "lon": -110.8404,
      "lat": 32.2974
    },
    "weather": [
      {
        "id": 801,
        "main": "Clouds",
        "description": "few clouds",
        "icon": "02d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 306.73,
      "feels_like": 307.64,
      "temp_min": 302.52,
      "temp_max": 308.05,
      "pressure": 1014,
      "humidity": 39
    },
    "visibility": 10000,
    "wind": {
      "speed": 2.24,
      "deg": 270,
      "gust": 4.47
    },
    "clouds": {
      "all": 20
    },
    "dt": 1627774679,
    "sys": {
      "type": 2,
      "id": 2008373,
      "country": "US",
      "sunrise": 1627735057,
      "sunset": 1627784501
    },
    "timezone": -25200,
    "id": 0,
    "name": "Tucson",
    "cod": 200
  }

  return (
    <div>
      <body className="p-4 px-6">
        <div className="py-4">
          <p className="text-4xl text-blue-60 text-left">Weather Comparison</p>
          <div className="text-sm text-gray-500 text-left">
            <p>Enter the name or zip code of two cities to compare their weather. </p>
            <p>(For example, compare the weather between the city you’re in and the one you want to visit.)</p>
          </div>
        </div>

        <div className="flex ">
          <div className="w-1/6 py-2">
          </div>
          <div className="w-1/4 text-gray-500 font-semibold text-left px-4">
            {data1.name || 'Location 1'}
          </div>
          <div className="w-1/4 text-gray-500 font-semibold text-left px-4">
            {data2.name || 'Location 2'}
          </div>
          <div className="w-1/4">
            Graph
          </div>
        </div>

        <div className="flex">
          <div className="w-1/6 py-2">
            <div className="text-sm text-gray-500 text-right space-y-2">
              <p>Temperature (ºF)</p>
              <p>Temperature (ºC)</p>
              <p>Humidity (%)</p>
              <p>Pressure (hPa)</p>
              <p>Wind Speed (m/s)</p>
              <p>Wind Direction</p>
              <p>Wind Gust (m/s)</p>
              <p>Cloudiness (%)</p>
              <p>Precipitation</p>
              <p>Pollen (g/m^3)</p>
            </div>
          </div>
          <div className="w-1/4 px-4">
            <LocationWeatherData data={data1}/>
          </div>
          <div className="w-1/4">
            <LocationWeatherData data={data2}/>
          </div>
          <div className="w-1/4">
            <p className="">
              Current stock price for NFLX is ${currentPrice}
            </p>
            <p>
              OpenWeatherKey: {process.env.REACT_APP_OPENWEATHER_KEY.slice()}
            </p>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Layout;
