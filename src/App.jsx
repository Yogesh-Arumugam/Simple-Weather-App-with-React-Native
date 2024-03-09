import { useState, useEffect } from 'react';
import './App.css';
import proptypes from "prop-types";

 import clearIcon from './assets/clear.png';
 import searchIcon from './assets/search.png';
 import cloudIcon from './assets/cloud.png';
 import drizzleIcon from './assets/drizzle.png';
 import rainIcon from './assets/rain.png';
 import windIcon from './assets/wind.png';
 import snowIcon from './assets/snow.png';
 import humidityIcon from './assets/humidity.png';




const WeatherDetails = ({ icon ,temp, city, country, lat, log, humidity, wind }) => {
  return( <> 
     <div className= 'image'>
      <img src={icon} alt='image'/>
     </div>
    <div className='temp'>{temp}°C</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>
    <div className='cord'>
      <div>
        <span className='lat'>latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className='log'>longitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className='data-container'>
      <div className='element'>
        <img src={humidityIcon} alt='humidity' className='icon'/>
        <div className='data'>
          <div className='humidity-percent'>{humidity}%</div>
          <div className='text'>Humidity</div>
        </div>
      </div>
      <div className='element'>
        <img src={windIcon} alt='wind' className='icon'/>
        <div className='data'>
          <div className='wind-percent'>{wind} km/hr</div>
          <div className='text'>Wind Speed </div>
        </div>
      </div>
    </div>
  </>
  );

}

WeatherDetails.proptypes={
  icon: proptypes.string.isRequired,
  temp: proptypes.number.isRequired,
  city: proptypes.string.isRequired,
  country: proptypes.string.isRequired,
  humidity: proptypes.number.isRequired,
  wind: proptypes.number.isRequired,
  lat: proptypes.number.isRequired,
  log: proptypes.number.isRequired,
  
}


 function App() {

  let api_key ="ad302e087040934f1dc74e9ece7c5df1";

  const[text, setText] = useState("London");
  const [icon, setIcon] = useState(cloudIcon);
  const [Temp, setTemp] = useState(0);
  const [city, setCity] = useState("London");
  const [country, setCountry] = useState("UK");
  const [lat, setlat] =useState(0);
  const [log, setlog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": clearIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "50d": clearIcon,
  };



  const search = async () => {
    setLoading(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
     // console.log(data);
     if (data.cod === "404") {
      console.error("city not found");
      setCityNotFound(true);
      setLoading(false);
      return;
     }

     setHumidity(data.main.humidity);
     setWind(data.wind.speed);
     setTemp(data.main.temp);
     setCountry(data.sys.country);
     setlat(data.coord.lat);
     setlog(data.coord.lon);
     setCity(data.name);
     setIcon(weatherIconMap[data.weather[0].icon]);
     //setIcon(weatherIconMap[weatherIconcode] || clearIcon);
     setCityNotFound(false);
    } catch (error) {
      console.error("An error occurred:",error.message);
      setError("An error occurred while fetching weather data");
    } finally {
      setLoading(false);
    }
  };
    const handlecity =(e) =>{
      setText(e.target.value);

    };
    const handlekeydown = (e) => {
      if(e.key === `Enter`) {
        search();
      }

    };

    useEffect(function() {
      search();
    },[]);

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type='text' className='cityInput' placeholder='Search City'onChange={handlecity} value={text} onKeyDown={ handlekeydown} />
          <div className='search-icon' onClick={() => search()}>
            <img src={searchIcon} alt='search' /> 
            </div>
        </div>
       

      {loading && <div className='loading-message'>loading...</div>}
      {error && <div className='error-message'>{error}</div>}
      {cityNotFound && <div className='city-not-found'>City Not Found</div>}

      {!loading && !cityNotFound && <WeatherDetails icon = {icon } temp={Temp}  city ={city} country={country}
         lat={lat} log={log} humidity={humidity} wind ={wind}
           
        />}

        <p className='copyright'>
          Designed by <span> Yogesh </span>
        </p>
      </div>
    </>
  );
}

export default App
