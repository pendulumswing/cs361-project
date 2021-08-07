import React from 'react';
import axios from 'axios';


export default function Input(props) {

  const { name, className, disabled, placeholder, setLocation } = props;
  const [value, setValue] = React.useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    if (value) {
      event.preventDefault();
      axios.post('/api/weather', {
        value: value
      }).then(function (response) {
        console.log(response.data)
        setLocation(response.data)
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
      {/*<p className="mt-2 text-sm text-red-600" id="email-error">Your password must be less than 4 characters.</p>*/}
    </div>
  )
}

// <style>
//   input::placeholder {
//   color: gray;
// }
// </style>

