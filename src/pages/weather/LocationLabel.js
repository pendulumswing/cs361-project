import React from 'react';
import { getByZip } from 'zcs';
import _ from 'lodash';


function getStateByZip (zip) {
  if (zip) {
    return getByZip(zip).state
  }
}

export default function LocationLabel(props) {
  const { zip, location, altName, className } = props;

  if (zip === undefined || _.isEmpty(location)) {
    return (
      <div className={className}>
        {altName}
      </div>
    )
  }

  const city = location.name
  const state = getStateByZip(zip)

  return (
    <div className={className}>
      <div>{city}, {state}</div>
    </div>
  )
}

