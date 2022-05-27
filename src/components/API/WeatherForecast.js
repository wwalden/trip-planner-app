import React, { useEffect, useState } from 'react';
const axios = require('axios');

const WeatherForecast = (props) => {
  const weatherlink = props.weatherlink;
  const [forecast, setForecast] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect (()=> {
    (async (weatherlink) => {
      const options = {
        method: 'GET',
        url: `${weatherlink}`
      };
    
      const result = await axios.request(options);
      if (result.status === 200) {
        setIsLoaded(true);
        setForecast(result.data.properties.periods);
      }  else {
        setError(result)
      } 
    })(weatherlink);
  }, [weatherlink])


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <div>
            <p>forecast loading...</p>
              {/* <p>{forecast[2].name} : {forecast[2].shortForecast}, {forecast[2].temperature} {forecast[2].temperatureUnit}</p>
              <p>{forecast[4].name} : {forecast[4].shortForecast}, {forecast[4].temperature} {forecast[4].temperatureUnit}</p>
              <p>{forecast[6].name} : {forecast[6].shortForecast}, {forecast[6].temperature} {forecast[6].temperatureUnit}</p> */}
          </div>
      );
    }

};


export default WeatherForecast;