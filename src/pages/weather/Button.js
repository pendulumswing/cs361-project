import React from 'react';


export default function Button(props) {
  const { setLocation } = props;

  return (
    <div className="items-center justify-center ml-3 mt-2 relative rounded-md shadow-sm">
      <button
        className="bg-gray-100 rounded-md p-1 px-3 h-full text-gray-400 border border-gray-300"
        onClick={()=>(setLocation(undefined))}
      >
        Clear
      </button>
    </div>
  )
}

