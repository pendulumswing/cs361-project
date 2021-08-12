import React, { useEffect } from 'react';
import axios from 'axios';

const CancelToken = axios.CancelToken;

export default function Pollen(props) {
  const { pollen } = props;

  // const loc = location ? location.name : '';

  // useEffect(() => {
  //   let source = null;
  //
  //   if (location.name !== undefined) {
  //     source = CancelToken.source();
  //
  //     axios.post(`/api/pollen?zip=${location.zip}`, {}, {
  //       cancelToken: source.token
  //     }).then(function (response) {
  //         setLocation({
  //           ...location,
  //           pollen : response.data
  //         })  // Sets single prop on object
  //       }).catch(function (thrown) {
  //         if (axios.isCancel(thrown)) {
  //           console.log('Request canceled', thrown.message);
  //         } else {
  //           // handle error
  //         }
  //       });
  //   }
  //
  //   return function() {
  //     source && source.cancel('Operation canceled by the user.');
  //   }
  // }, [location ? location.name : ''])

  if (!pollen) {
    return (
      <p> </p>
    )
  }

  // if (location.pollen === undefined) {
  //   return (
  //     <p>...</p>
  //   )
  // }

  return (
    <div>
      <p>{pollen.toFixed(1)} g/m<sup>3</sup></p>
      {/*{*/}
      {/*  pollen > 0 && (*/}
      {/*    <p>{pollen.toFixed(1)} g/m<sup>3</sup></p>*/}
      {/*  ) || (*/}
      {/*    <p className="text-gray-400">––</p>*/}
      {/*  )*/}
      {/*}*/}
    </div>
  )
}



