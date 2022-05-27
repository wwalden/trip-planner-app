import React, { useEffect, useState } from 'react';
const axios = require('axios');

const SunriseSunset = (props) => {
  const [hours, setHours] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const latitude = props.latitude;
  const longitude = props.longitude;

  useEffect (()=> {
   (async (latitude, longitude) => {
      const options = {
        method: 'GET',
        url: `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`
      };
    
      const result = await axios.request(options);
      if (result.status === 200) {
        setIsLoaded(true);
        setHours(result.data.results);
      }  else {
        setError(result)
      }
    })(latitude, longitude)
  }, [])


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
        <div>
          <p>Lever du soleil: {hours.sunrise}</p>
          <p>Coucher du soleil: {hours.sunset}</p>
        </div>
    );
  }
}


export default SunriseSunset;