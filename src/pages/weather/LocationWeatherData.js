import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Pollen from './Pollen';

function LocationWeatherData(props) {
  const { location, setLocation } = props

  if (location === undefined ||
      location.main === undefined ||
      location.wind === undefined ||
      _.isEmpty(location)) {
    return (
      <div>

      </div>
    )
  }

  return (
    <div className="flex">
      <div className="w-full py-2">
        <div className="text-gray-500 text-left space-y-2 h-full whitespace-pre-wrap">
          <p>{location.main.temp ? `${((location.main.temp) * 1.8 + 32).toFixed(0)}º` : ''}</p>
          <p>{location.main.temp ? `${((location.main.temp)).toFixed(0)}º` : ' '}</p>
          <p>{location.main.humidity ? `${location.main.humidity.toFixed(0)}%` : ' '}</p>
          <p>{location.main.pressure ? `${location.main.pressure.toFixed(0)}hPa` : ' '}</p>
          <p>{location.wind.speed ? `${location.wind.speed.toFixed(2)}m/s` : ' '}</p>
          <p>{location.wind.deg ? `${location.wind.deg.toFixed(0)}º` : ' '}</p>
          <p className="">{location.wind.gust ? `${location.wind.gust.toFixed(2)}m/s` : ' '}</p>
          <p>{location.clouds.all ? `${location.clouds.all.toFixed(0)}%` : ' '}</p>
          <Pollen key={location} location={location} setLocation={setLocation}/>
        </div>
      </div>
    </div>
  );
}

export default LocationWeatherData;
