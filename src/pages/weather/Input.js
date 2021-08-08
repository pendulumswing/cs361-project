import React from 'react';
import axios from 'axios';
import validator from "validator/es";
import _ from 'lodash';
import { getByStateCity, getByCityState, getByZip, zipLookAhead, cityLookAhead, stateLookAhead } from 'zcs';


export default function Input(props) {
  // console.log('getByCityState: ', getByCityState('Orlando'))
  // console.log('getByZip: ', getByZip('03809'))
  // console.log('zipLookAhead: ', zipLookAhead('038'), 10)

  const { name, className, disabled, placeholder, setLocation } = props;
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  function validate(value) {
    if (validator.isNumeric(value) && value.length === 5) {
      setError('')
      return true
    }
    if (validator.isAlpha(value, 'en-US', {ignore: ' ,'})) {
      setError('')
      return true
    }
    if (validator.isNumeric(value)) {
      setError('Please enter a valid U.S. zip code.')
      return false
    }
    setError('Please enter a valid U.S. city or zip code.')
    return false
  }

  const handleSubmit = event => {
    event.preventDefault();
    const hasZip = validator.isNumeric(value)
    if (value && validate(value)) {
      axios.post('/api/weather', {
        value: value,
        zip: hasZip,
      }).then(function (response) {
        console.log('response.data: ', response.data)
        if (response.data.cod === 200) {
          // Combine response object with state and zip code
          const cityData = getByCityState(response.data.name)
          const state = Object.keys(cityData)[0];
          const zip = hasZip ? value : cityData[state][0]
          const locationData = {
            state: state,
            zip: zip
          }
          const data = _.merge(response.data, locationData)
          console.log('data: ', data)
          setLocation(data)
        } else {
          setError(response.data.message)
        }
      })
    }
  };

  return (
    <div>
      {/*<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>*/}
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
      {/*<p className="mt-2 text-sm text-red-600" id="email-error">Your password must be less than 4 characters.</p>*/}
    </div>
  )
}

// <style>
//   input::placeholder {
//   color: gray;
// }
// </style>

