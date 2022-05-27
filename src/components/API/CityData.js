import React, { useState } from 'react';
import ForecastLink from './ForecastLink';
import SunriseSunset from './SunriseSunset';
const axios = require('axios');


const CityData = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState('');

    const getCoord = async () => {
      const options = {
        method: 'GET',
        url: 'https://city-by-api-ninjas.p.rapidapi.com/v1/city',
        params: {name: cityName},
        headers: {
          'X-RapidAPI-Host': 'city-by-api-ninjas.p.rapidapi.com',
          'X-RapidAPI-Key': '00d58571c0msha3821b6d3c0df18p13ffbbjsn33977b1419d6'
        }
      };
      const result = await axios.request(options);
      if (result.status === 200) {
        setIsLoaded(true);
        setItems([result.data[0].country, result.data[0].latitude, result.data[0].longitude]);
      } else {
        setError(result)
      }
    };


  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <section className="api_weather">
        <div>
          <input className="form_tools" id="email" type='email' name='email' placeholder='New York...'  onChange={(e) => {setCityName(e.target.value)}}/>
          <button onClick={getCoord}>Rechercher</button>
        </div>
        <div>
          <h2>Informations</h2>
          <p>(source: ninja city API)</p>
          <p>Pays: {items[0]}</p>
          <p>Latitude: {items[1]}</p> 
          <p>Longitude: {items[2]}</p>  
        </div>
        <div>
          <h2>lien Forecast Détaillé</h2>
          <p>(source: weather API)</p>
          <ForecastLink latitude={items[1]} longitude={items[2]}/>
          <p></p>
          <p></p>
        </div>
        <div>
          <h2>Heures lever et coucher du soleil</h2>
          <p>(source: sunrise-sunset API)</p>
          <SunriseSunset latitude={items[1]} longitude={items[2]}/>
        </div>
        <div>
          <h2>Taux de Pollen</h2>
          <p>(source: Pollen API)</p>
        </div>
        <div>
          <h2>Meilleurs Restaurants</h2>
          <p>(source: TripAdvisor API)</p>
        </div>

      </section>

    );
  }

}


export default CityData;











/*
import React from 'react';
const axios = require('axios');

const Restaurants = () => {

  const getRandom = async () =>{
    const response = await axios.get('https://api.chucknorris.io/jokes/random',{
        params: {
            api_key : process.env.API_KEY,
            thumbs : true
        }
    });
  
    if(response.status != 200){
        console.error(response.status);
        return;
    }
  
    console.log(response.data.value);
  };

  getRandom();
  return (
    <div>
      <p>Hello again</p>
    </div>
  );

}

export default Restaurants;


*/