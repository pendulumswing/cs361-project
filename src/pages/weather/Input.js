import React, {useEffect} from 'react';
import axios from 'axios';
import validator from "validator/es";
import _ from 'lodash';
import { getByCityState, getByZip } from 'zcs';
import Button from "./Button";


export default function Input(props) {
  const { name, className, disabled, placeholder, setLocation, setLocationName, onSubmit } = props;
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  const autofocus = props.autofocus ? props.autofocus : false;

  const handleChange = event => {
    setValue(event.target.value);
  };

  function isValidCityOrZip(value) {
    if (isZip(value) || isCity(value)) {
      setError('')
      return true
    }
    setError('Please enter a valid U.S. city or zip code.')
    return false
  }

  function isZip(value) {
    return validator.isNumeric(value) &&
      (value.length === 5 || value.length === 9)
  }

  function isCity(value) {
    return validator.isAlpha(value, 'en-US', {ignore: ' '})
  }

  function makeCityObject (response, value) {
    // Use response object to obtain city, state and zip code info
    let zip, state = undefined;
    if (value) {
      const zipData = getByZip(value)
      state = zipData.state
      zip = value
    } else {
      const cityData = getByCityState(response.data.name)
      state = Object.keys(cityData)[0];
      zip = cityData[state][0]
    }
    return {
      state: state,
      zip: zip
    }
  }

  function convertToZip (value) {
    // Use response object to obtain city, state and zip code info
    if(!isZip(value)) {
      const cityData = getByCityState(value);
      const state = Object.keys(cityData)[0];
      return cityData[state][0];
    }
    return value;
  }

  function handleSubmit (event) {
    event.preventDefault();
    if (value && isValidCityOrZip(value)) {
      const zip = convertToZip(value)
      onSubmit(zip)
    }
  };

  return (
    <div>
      <div className="flex flex-nowrap mt-1 relative justify-center items-center content-center align-middle">
        <form onSubmit={handleSubmit}>
        {/*<form onSubmit={onSubmit}>*/}
          <input type="text"
            name={name}
            id={name}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder={placeholder}
            autoFocus={autofocus}
            aria-invalid="true"
            aria-describedby="email-error"
            readOnly={disabled}
            value={value}
            onChange={handleChange}
          />
        </form>
        <Button
          className="ml-3"
          setLocation={() => {
          setValue('')
          onSubmit('')
        }}/>
      </div>
      <div>
        {
          error.length > 0 && (
            <p className="mt-2 text-sm text-red-600" id="input-error">{error}</p>
          )
        }
      </div>
    </div>
  )
}

