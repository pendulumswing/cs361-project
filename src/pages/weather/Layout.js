import React, { useState, useEffect } from 'react';
import LocationWeatherData from './LocationWeatherData';
import data1 from './location1data.json';
import data2 from './location2data.json';
import Input from './Input';
import Graph from './Graph';
import Pollen from './Pollen';
import axios from "axios";
import _ from "lodash";

function Layout(props) {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [location1, setLocation1] = useState(undefined);
  const [location2, setLocation2] = useState(undefined);
  // const testUrl = `api.openweathermap.org/data/2.5/weather?zip=85750&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=metric`

  useEffect(() => {
    fetch('/api/stocks/NFLX').then(res => res.json()).then(data => {
      setCurrentPrice(data)
    })
  }, [])

  useEffect(() => {
    if(location1 !== undefined) {
      printData(location1)
    }
  }, [location1])

  // useEffect(() => {
  //   if (location !== undefined) {
  //     console.log('zip code pollen: ', location.zip)
  //     axios.post(`/api/pollen?zip=${location.zip}`)
  //       .then(function (response) {
  //         console.log('response: ', response)
  //         setPollen(response.data)
  //         const locationCopy = _.cloneDeep(location)
  //         const loc = _.merge(locationCopy, { pollen: response.data })
  //         setLocation(loc)
  //       })
  //   }
  // }, [location && location.name])

  function printData(data) {
    const { name, main, weather, wind, state, zip, pollen } = data;
    console.log(`Weather data for ${name}:`)
    console.log(`  main: `, main);
    console.log(`  weather: `, weather);
    console.log(`  wind: `, wind);
    console.log(`  state, zip: ${state}, ${zip}`);
    console.log(`  pollen: `, pollen);
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
          <div className="text-2xl font-semibold text-gray-500">
            {
              location1 && location1.name && (
                <div>{location1.name}, {location1.state}</div>
              ) || 'Location 1'
            }
          </div>
          <div className="text-gray-400">
            (e.g. where are you at?)
          </div>
          <Input
            name="location1"
            setLocation={setLocation1}
            placeholder={'city or zip code'}
            autofocus={true}
          />
        </div>

        {/*Location 2 Header*/}
        <div className="w-1/4 text-left px-4">
          <div className="text-2xl font-semibold text-gray-500">
            {
              location2 && location2.name && (
                <div>{location2.name}, {location2.state}</div>
              ) || 'Location 2'
            }
          </div>
          <div className="text-gray-400">
            (e.g. where are you going?)
          </div>
          <Input
            name="location2"
            setLocation={setLocation2}
            placeholder={'city or zip code'}
          />
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
            key={location1}
            location={location1}
            setLocation={setLocation1}
          />
        </div>

        {/*Location 2*/}
        <div className="w-1/4 px-4">
          <LocationWeatherData
            key={location2}
            location={location2}
            setLocation={setLocation2}
          />
        </div>

        {/*Graph*/}
        <div className="w-1/4 text-gray-400 text-left px-4">
          <div className="h-full">
            {
              location2 && location1 && (
                <Graph
                  key={location1 && location2}
                  className="h-full"
                  location1={location1}
                  location2={location2}
                />
              ) || ''
            }
          </div>

          {/*<div className="pb-4">*/}
          {/*  <p className="text-blue-300 font-semibold text-xl">Microservice</p>*/}
          {/*  <p>Provide the current stock price for a given symbol.</p>*/}
          {/*  <p className="">*/}
          {/*    <span className="font-semibold">Example: </span>*/}
          {/*    <span className=""> NFLX is </span>*/}
          {/*    <span className="font-semibold">${currentPrice}</span>*/}
          {/*  </p>*/}
          {/*</div>*/}

          {/*<div>*/}
          {/*  <p className="text-blue-300 font-semibold text-xl">Environment Variable</p>*/}
          {/*  <p>*/}
          {/*    OpenWeatherKey (partial):*/}
          {/*    <span className="font-semibold">{process.env.REACT_APP_OPENWEATHER_KEY.slice(-10)}</span>*/}
          {/*  </p>*/}
          {/*</div>*/}
        </div>

      </div>
    </div>
  );
}

export default Layout;

function logData() {

};
