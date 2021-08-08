import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import validator from "validator/es";
import axios from "axios";

function LocationWeatherData(props) {
  const { children, data, weather } = props
  const [pollen, setPollen] = useState('');

  useEffect(() => {
    if (data !== undefined) {
      console.log('zip code pollen: ', data.zip)
      axios.post(`/api/pollen?zip=${data.zip}`)
        .then(function (response) {
          console.log('response: ', response)
          setPollen(response.data)
        })
    }
  }, [data])

  if (data === undefined ||
      data.main === undefined ||
      data.wind === undefined ||
      _.isEmpty(data)) {
    return (
      <div>

      </div>
    )
  }


  return (
    <div className="flex">
      <div className="w-full py-2">
        <div className="text-gray-500 text-left space-y-2 h-full whitespace-pre-wrap">
          <p>{data.main.temp ? `${((data.main.temp) * 1.8 + 32).toFixed(0)}º` : ''}</p>
          <p>{data.main.temp ? `${((data.main.temp)).toFixed(0)}º` : ' '}</p>
          <p>{data.main.humidity ? `${data.main.humidity.toFixed(0)}%` : ' '}</p>
          <p>{data.main.pressure ? `${data.main.pressure.toFixed(0)}hPa` : ' '}</p>
          <p>{data.wind.speed ? `${data.wind.speed.toFixed(2)}m/s` : ' '}</p>
          <p>{data.wind.deg ? `${data.wind.deg.toFixed(0)}º` : ' '}</p>
          <p className="">{data.wind.gust ? `${data.wind.gust.toFixed(2)}m/s` : ' '}</p>
          <p>{data.main.humidity ? `${data.main.humidity.toFixed(0)}%` : ' '}</p>
          <div>
            {
              pollen && (
                <p>{pollen} g/m<sup>3</sup></p>
              ) || (
                <p> </p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationWeatherData;
