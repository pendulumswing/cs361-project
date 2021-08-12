import React, { useState, useEffect } from 'react';
import LocationWeatherData from './LocationWeatherData';
import Input from './Input';
import Graph from './Graph';
import axios from "axios";
import LocationLabel from "./LocationLabel";


function Layout(props) {
  const [location1, setLocation1] = useState(undefined);
  const [location2, setLocation2] = useState(undefined);
  const [locationName1, setLocationName1] = useState('');

  const [weather, setWeather] = useState({});
  const [pollen, setPollen] = useState({});

  useEffect(() => {
    if(weather) {
      console.log('weather: ', weather)
      if(location1) {
        console.log('location1: ', weather[location1])
      }
      if(location2) {
        console.log('location2: ', weather[location2])
      }
    }
  }, [weather[location1], weather[location2]])

  function onGetWeatherData(value) {
    axios.post('/api/weather', {
      value: value,
    }).then(function (response) {
      if (response.data.cod === 200) {
        setWeather({
          ...weather,
          [value]: {
            ...response.data,
          }
        })
      } else {
        setWeather({
          ...weather,
          [value]: {
            ...response.data.message,
          }
        })
        console.error(response.data.message)
      }
    })

    axios.post(`/api/pollen?zip=${value}`)
      .then(function (response) {
        setPollen({
          ...pollen,
          [value]:  response.data
        })
      }).catch(function (thrown) {
        console.log('Request canceled', thrown.message);
    });
  }

  return (
    <div className="p-4 px-6">
      <div className="py-4">
        {/*Title*/}
        <p className="text-4xl text-blue-60 text-left">Weather Comparison</p>

        {/*Instructions*/}
        <div className="text-gray-500 text-left">
          <p>Enter the name or zip code of two cities to compare their weather. </p>
          <p className="text-gray-400">(For example, compare the weather between the city you’re in and the one you want to visit)</p>
        </div>
      </div>


      <div className="flex ">

        {/*Categories Header*/}
        <div className="w-1/6 py-2">
        </div>

        {/*Location 1 Header*/}
        <div className="w-1/4 text-left px-4">
          <LocationLabel
            className="text-2xl font-semibold text-gray-500"
            zip={location1 ? location1 : undefined}
            location={location1 ? weather[location1] : {}}
            altName={`Location 1`}
          />
          <div className="text-gray-400">
            (e.g. where are you at?)
          </div>
          <div className="flex flex-nowrap">
            <Input
              name="location1"
              onSubmit={function(value) {
                setLocation1(value)
                value && onGetWeatherData(value)
              }}
              placeholder={'city or zip code'}
              autofocus={true}
            />
          </div>

        </div>

        {/*Location 2 Header*/}
        <div className="w-1/4 text-left px-4">
          <LocationLabel
            className="text-2xl font-semibold text-gray-500"
            zip={location2 ? location2 : undefined}
            location={location2 ? weather[location2] : {}}
            altName={`Location 2`}
          />
          <div className="text-gray-400">
            (e.g. where are you going?)
          </div>
          <div className="flex flex-nowrap">
            <Input
              name="location2"
              onSubmit={function(value) {
                setLocation2(value)
                value && onGetWeatherData(value)
              }}
              placeholder={'city or zip code'}
              location={location2 ? weather[location2] : {}}
            />
          </div>
        </div>

        {/*Graph Header*/}
        <div className="w-1/4 text-left px-4">
          <div className="text-2xl font-semibold text-gray-500">
            Graph
          </div>
          <div className="text-gray-400">
            <p>How Location 2 compares</p>
            <p>(a visual "fingerprint")</p>
          </div>
        </div>
      </div>

      {/*Categories*/}
      <div className="flex">
        <div className="w-1/6 py-2">
          <div className="text-gray-500 text-right space-y-2">
            <p>Temperature (ºF)</p>
            <p>Temperature (ºC)</p>
            <p>Humidity (%)</p>
            <p>Pressure (hPa)</p>
            <p>Wind Speed (m/s)</p>
            <p>Wind Direction</p>
            <p>Wind Gust (m/s)</p>
            <p>Cloudiness (%)</p>
            <p>Pollen (g/m<sup>3</sup>)</p>
          </div>
        </div>

        {/*Location 1*/}
        <div className="w-1/4 px-4">
          <LocationWeatherData
            location={location1 ? weather[location1] : {}}
            pollen={location1 ? pollen[location1] : {}}
          />
        </div>

        {/*Location 2*/}
        <div className="w-1/4 px-4">
          <LocationWeatherData
            location={location2 ? weather[location2] : {}}
            pollen={location2 ? pollen[location2] : {}}
          />
        </div>

        {/*Graph*/}
        <div className="w-1/4 text-gray-400 text-left px-4">
          <div className="h-full">
            {
              location2 && location1 && (
                <Graph
                  location1={location1 ? weather[location1] : {}}
                  location2={location2 ? weather[location2] : {}}
                  pollen1={pollen ? pollen[location1] : {}}
                  pollen2={pollen ? pollen[location2] : {}}
                />
              ) || ''
            }
          </div>
        </div>

      </div>
    </div>
  );
}

export default Layout;
