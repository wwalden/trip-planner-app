import React, { useEffect, useState } from 'react';
import WeatherForecast from './WeatherForecast';
const axios = require('axios');

const ForecastLink = (props) => {

  const [forecastLink, setForecastLink] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const latitude = props.latitude;
  const longitude = props.longitude;


 (async (latitude, longitude) => {
      const options = {
        method: 'GET',
        url: `https://api.weather.gov/points/${latitude},${longitude}`
      };
    
      const result = await axios.request(options);
      if (result.status === 200) {
        setIsLoaded(true);
        setForecastLink(result.data.properties.forecast);
      }  else {
        setError(result)
      }
    })(latitude, longitude)

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
        <div>
          <p>{forecastLink}</p>
          <div>
            <h2>Météo</h2>
            <p>(source: weather API)</p>
            <WeatherForecast weatherlink={forecastLink}/>  
          </div>
        </div>
    );
  }
}

export default ForecastLink;