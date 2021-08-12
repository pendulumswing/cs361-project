import React from 'react';
import validator from "validator/es";
import {getByCityState, getByZip} from 'zcs';
import Button from "./Button";
import {list, data} from './cityZipData';


export default function Input(props) {
  const {name, className, disabled, placeholder, onSubmit, location} = props;
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
    let t = data.zips[list.zips.indexOf(value)]
    console.log('invalid zip. t= ', t)
    return t !== undefined;
  }

  function isCity(value) {
    if (validator.isAlpha(value, 'en-US', {ignore: ' '})) {
      const city = value.toUpperCase()
      let t = data.cities[list.cities.indexOf(city)]
      return t !== undefined;
    }
    return false
  }

  function convertToZip(value) {
    // Use response object to obtain city, state and zip code info
    if (!validator.isNumeric(value)) {
      const cityData = getByCityState(value);
      const state = Object.keys(cityData)[0];
      return cityData[state][0];
    }
    return value;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (value && isValidCityOrZip(value)) {
      const zip = convertToZip(value)
      onSubmit(zip)
    } else {
      setValue('')
      onSubmit('')
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
          // error.length > 0 && (
          location && location.message && (
            <p className="mt-2 text-sm text-red-600" id="input-error">{location.message}</p>
          )
        }
        {
          // error.length > 0 && (
          error.length > 0 && (
            <p className="mt-2 text-sm text-red-600" id="input-error">{error}</p>
          )
        }
      </div>
    </div>
  )
}

