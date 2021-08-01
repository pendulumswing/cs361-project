import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from './pages/weather/Layout';

function App(props) {
  const { children } = props

  return (
    <div className="App">
      <Weather />
    </div>
  );
}

export default App;
