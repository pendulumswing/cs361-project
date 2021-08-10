import React, { useEffect } from 'react';
import axios from 'axios';

export default function Pollen(props) {
  const { location, setLocation } = props;

  useEffect(() => {
    if (location !== undefined) {
      console.log('zip code pollen: ', location.zip)
      axios.post(`/api/pollen?zip=${location.zip}`)
        .then(function (response) {
          console.log('response: ', response)
          setLocation({ ...location, ['pollen'] : response.data })  // Sets single prop on object
        })
    }
  }, [location && location.name])

  if (!location) {
    return (
      <div>
        nothing
      </div>
    )
  }

  if (location.pollen === undefined) {
    return (
      <p>...</p>
    )
  }

  return (
    <div>
      {
        location.pollen > 0 && (
          <p>{location.pollen.toFixed(1)} g/m<sup>3</sup></p>
        ) || (
          <p className="text-gray-400">––</p>
        )
      }
    </div>
  )
}



