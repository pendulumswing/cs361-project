import React from 'react';


export default function Button(props) {
  const { setLocation, className } = props;

  return (
    <div className={className}>
      <button
        className="bg-gray-100 rounded-md p-1 px-3 h-full text-gray-400 border border-gray-300"
        onClick={()=>(setLocation(undefined))}
      >
        Clear
      </button>
    </div>
  )
}

