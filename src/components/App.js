import React from 'react';
import '../styles/app.css';
import CityData from './API/CityData';


const App = () => {
  return (
    <div>
      <h1>Trip Planner</h1>
      <CityData/>
    </div>
)
}

export default App;