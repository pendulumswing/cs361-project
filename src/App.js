import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from './pages/weather/Layout';

function App(props) {
  const { children } = props
  // const [currentPrice, setCurrentPrice] = useState(0);
  //
  // useEffect(() => {
  //   fetch('/api/stocks/NFLX').then(res => res.json()).then(data => {
  //     debugger
  //     setCurrentPrice(data)
  //   })
  // }, [])

  return (
    <div className="App">
      <Weather />
      {/*<div className="bg-blue-500 h-10 w-full">    </div>*/}
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  /!*<p>*!/*/}
      {/*  /!*  Edit <code>src/App.js</code> and save to reload.*!/*/}
      {/*  /!*</p>*!/*/}
      {/*  <p className="">*/}
      {/*    Current stock price for NFLX is ${currentPrice}*/}
      {/*  </p>*/}
      {/*  /!*<a*!/*/}
      {/*  /!*  className="App-link"*!/*/}
      {/*  /!*  href="https://reactjs.org"*!/*/}
      {/*  /!*  target="_blank"*!/*/}
      {/*  /!*  rel="noopener noreferrer"*!/*/}
      {/*  /!*>*!/*/}
      {/*  /!*  Learn React*!/*/}
      {/*  /!*</a>*!/*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
