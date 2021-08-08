import React from 'react';
import axios from 'axios';
import validator from "validator/es";
import _ from 'lodash';
import { getByCityState, getByZip } from 'zcs';


export default function Input(props) {
  const { name, className, disabled, placeholder, setLocation } = props;
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

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
      console.log('zipData: ', zipData)
      state = zipData.state
      zip = value
    } else {
      const cityData = getByCityState(response.data.name)
      console.log('cityData: ', cityData)
      state = Object.keys(cityData)[0];
      zip = cityData[state][0]
    }
    return {
      state: state,
      zip: zip
    }
  }

  function handleSubmit (event) {
    event.preventDefault();
    if (value && isValidCityOrZip(value)) {
      const hasZip = validator.isNumeric(value)
      axios.post('/api/weather', {
        value: value,
        zip: hasZip,
      })
        .then(function (response) {
        if (response.data.cod === 200) {
          const locationData = makeCityObject(response, hasZip ? value : undefined)
          setLocation(_.merge(response.data, locationData))
        } else {
          setError(response.data.message)
        }
      })
    }
  };

  return (
    <div>
      <div className="mt-1 relative rounded-md shadow-sm">
        <form onSubmit={handleSubmit}>
          <input type="text"
            name={name}
            id={name}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder={placeholder}
            aria-invalid="true"
            aria-describedby="email-error"
            readOnly={disabled}
            value={value}
            onChange={handleChange}
          />
        </form>
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

