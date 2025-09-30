import React from 'react';
import './App.css'
import Current from './components/Current'
import { ThemeContext } from './context/theme';
import Forecasts from './components/Forecasts'

//https://www.weatherapi.com/docs/conditions.json
//https://www.weatherapi.com/docs/weather_conditions.json

/** get wheather data calls from parent(this) component, pass the data as props */
function App() {

const { theme, setTheme} = React.useContext(ThemeContext);

const currentURL = "http://localhost/weather-a/index.php";
const [weatherData, setWeatherData] = React.useState()/*localStorage.getItem('current') 
 ? JSON.parse(localStorage.getItem('current')) : "")*/

const [city, setCity] = React.useState("Riga")/*localStorage.getItem('ipforweather') 
 ? JSON.parse(localStorage.getItem('ipforweather')) : "");*/
  
const [weatherForecastData, setWeatherForecastData] =  React.useState()/*localStorage.getItem('forecast') 
 ? JSON.parse(localStorage.getItem('forecast')) : "")*/

const forecastURL = "http://localhost/weather-a/forecast.php";

const [ hourForecast, setHourForecast] = React.useState(/*weatherData.forecast.forecastday[0].hour*/);

const [whatDate, setWhatDate] = React.useState("");    

async function requestWeather()
{
  console.log("currnet w. requested");
  try {
    const response = await fetch(currentURL, {
       method: "POST",
       body: JSON.stringify({ location: city }),
});

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
   
        if(result.status == "success") { 
            let currentWeather = JSON.parse(result.message);
          setWeatherData(currentWeather);
          localStorage.setItem('current', JSON.stringify(currentWeather));
        }
    
    //console.log(JSON.parse(result.message))
    
  } catch (error) {
    console.error(error.message); 
  }
}

   async function requestForecast()
{
  console.log("forecast w. requested");
  try {
    const response = await fetch(forecastURL, {
       method: "POST",
       body: JSON.stringify({ location: city }),
});

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
   
        if(result.status == "success") {

            let forecastWeather= JSON.parse(result.message);

          setWeatherForecastData(forecastWeather);
          //setWhatDate set state here, pass it back to forecast jsx (get mm-dd substring)
            setHourForecast((forecastWeather.forecast.forecastday[0].hour))
              setWhatDate(forecastWeather.forecast.forecastday[0].date.substring(5))

                 localStorage.setItem('forecast', JSON.stringify(forecastWeather));
        }
    
  } catch (error) {
    console.error(error.message); 
  }
}

React.useEffect(() =>{

/*requestWeather();
  requestForecast();*/

    
    let savedAtTime = localStorage.getItem('updatedAt')
    //non existing or old weather data, if so then make api reqeusts to update data
    if (savedAtTime == null || Date.now() > Number(savedAtTime) + 30000)//60000 is 10 min 30000 is 0.5min
    {
        localStorage.setItem('updatedAt',Date.now());
        console.log("time to call fetch again")
        requestWeather();
          requestForecast();
    }
    else if (savedAtTime !== null)
    {//load whats saved?
      console.log("already have fresh one")
      let forecastSaved = localStorage.getItem('forecast') ? JSON.parse(localStorage.getItem('forecast')) : ""
      let currentSaved = localStorage.getItem('current') ? JSON.parse(localStorage.getItem('current')) : ""

    setWeatherData(currentSaved);
    setWeatherForecastData(forecastSaved)

      setHourForecast((forecastSaved.forecast.forecastday[0].hour))
              setWhatDate(forecastSaved.forecast.forecastday[0].date.substring(5))

    }

   

       


//update every 10min?
/*
if(localStorage.setItem('updatedAt',Date.now()) == null ||localStorage.setItem('updatedAt',Date.now()) == "")
{
  //1st time request
    requestWeather();

    localStorage.setItem('updatedAt',Date.now());
}
else{
  //after refresh or quick revisit to an app
  let savedAtTime = localStorage.getItem('updatedAt')
  //re-request new data after 10 min
    if (Date.now() > Number(savedAtTime) + 600000)
      {
        requestWeather();
         requestForecast();
          localStorage.setItem('updatedAt',Date.now());
      }
      else{
        setHourForecast((weatherForecastData.forecast.forecastday[0].hour))
              setWhatDate(weatherForecastData.forecast.forecastday[0].date.substring(5))
      }
}
*/
  
  
    
  //getting and saving city from new user
   // let savedCity = localStorage.getItem("cityWeather");
      
},[])

  return (
  
<div className = {theme == '0' ? "night-theme" : "day-theme"} >
    
   {/* <div className="main-content">*/}

      <Current weatherData={weatherData}></Current>
     <Forecasts 
        weatherForecastData={weatherForecastData} 
        hourForecast={hourForecast} setHourForecast={setHourForecast}
        whatDate={whatDate} setWhatDate={setWhatDate}>
      </Forecasts>

            
      
    {/*</div>*/}

{<footer>
        <div>
          <a href="https://www.weatherapi.com/" 
              title="Free Weather API">
                <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' 
                alt="Weather data by WeatherAPI.com" border="0"></img></a>
        
           {/*Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a>*/}
        </div>
      </footer>}
</div>
  )
}

export default App
