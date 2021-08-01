import React, { useState, useEffect } from 'react';
import _ from 'lodash';

function LocationWeatherData(props) {
  const { children, data, weather } = props
  // const [currentPrice, setCurrentPrice] = useState(0);

  // useEffect(() => {
  //   fetch('/api/stocks/NFLX').then(res => res.json()).then(data => {
  //     setCurrentPrice(data)
  //   })
  // }, [])

  if (_.isEmpty(data)) {
    return (
      <div>
        ...
      </div>
    )
  }

  // debugger

  return (
    <div className="flex">
      <div className="w-full py-2">
        <div className="text-sm text-gray-500 text-left space-y-2">
          <p>{data.main.temp ? `${((data.main.temp -273.15) * 1.8 + 32).toFixed(2)}º` : ''}</p>
          <p>{data.main.temp ? `${((data.main.temp -273.15)).toFixed(2)}º` : ''}</p>
          <p>{data.main.humidity ? `${data.main.humidity.toFixed(0)}%` : ''}</p>
          <p>{data.main.pressure ? `${data.main.pressure.toFixed(0)}hPa` : ''}</p>
          <p>{data.wind.speed ? `${data.wind.speed.toFixed(2)}m/s` : ''}</p>
          <p>{data.wind.deg ? `${data.wind.deg.toFixed(0)}º` : ''}</p>
          <p className="w-full h-full flex-nowrap flex-grow">{data.wind.gust ? `${data.wind.gust.toFixed(2)}m/s` : ' '}</p>
          <p>{data.main.humidity ? `${data.main.humidity.toFixed(0)}%` : ''}</p>
          {/*<p>Precipitation</p>*/}
          <p>{'microservice data here'}</p>
        </div>
      </div>
    </div>
  );
}

export default LocationWeatherData;
