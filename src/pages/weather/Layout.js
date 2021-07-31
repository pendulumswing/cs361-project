import React, { useState, useEffect } from 'react';
import logo from '../../logo.svg';

function Layout(props) {
  // const { children } = props
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    fetch('/api/stocks/NFLX').then(res => res.json()).then(data => {
      setCurrentPrice(data)
    })
  }, [])

  return (
    <div>
      <div className="bg-blue-500 h-10 w-full">    </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="">
          Current stock price for NFLX is ${currentPrice}
        </p>
        <p>
          OpenWeatherKey: {process.env.REACT_APP_OPENWEATHER_KEY.slice()}
        </p>
      </header>
    </div>
  );
}

export default Layout;
