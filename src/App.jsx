import React from 'react';
import './App.css'
import Current from './components/Current'
import { ThemeContext } from './context/theme';
import Forecasts from './components/Forecasts'
import Chart from './components/Chart';
import Input from './components/Input';
//https://www.weatherapi.com/docs/conditions.json
//https://www.weatherapi.com/docs/weather_conditions.json

/** get wheather data calls from parent(this) component, pass the data as props */

//user input - city might be invalid!
function App() {

const { theme, setTheme} = React.useContext(ThemeContext);

const currentURL = "http://localhost/weather-a/index.php";
const [weatherData, setWeatherData] = React.useState()/*localStorage.getItem('current') 
 ? JSON.parse(localStorage.getItem('current')) : "")*/

const [city, setCity] = React.useState("Riga")/*(localStorage.getItem('city-weather') 
 ? JSON.parse(localStorage.getItem('city-weather')) : "")*/
 const [errorMessage, setErrorMessage] = React.useState("");
  
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
          //only setting error message here, because forecast and current requested together
           setErrorMessage("");
        }
       else if(result.status == "error")
        {
          console.log("error here")
          if (!city) setErrorMessage(result.message);
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
        /*else if(result.status == "error")
        {
          setErrorMessage("City name is probably wrong");
        }*/
    
  } catch (error) {
    console.error(error.message);
  }
}

React.useEffect(() =>{

   let forecastSaved = localStorage.getItem('forecast') ? JSON.parse(localStorage.getItem('forecast')) : ""
      let currentSaved = localStorage.getItem('current') ? JSON.parse(localStorage.getItem('current')) : ""


    //after refresh or quick revisit to an app, there is no need to call requests every time
    let savedAtTime = localStorage.getItem('updatedAt')
    //non existing or old weather data, if so then make api reqeusts to update data
    //if (savedAtTime == null || savedAtTime == undefined)
    if (savedAtTime == null || Date.now() > Number(savedAtTime) + 60000 || forecastSaved === "" || currentSaved === "" )//60000 is 10 min 30000 is 0.5min
    {
        localStorage.setItem('updatedAt',Date.now());
        console.log("time to update")
        requestWeather();
          requestForecast();
    }
    else
    {//load whats saved?
      console.log("already have fresh one")

    setWeatherData(currentSaved);
    setWeatherForecastData(forecastSaved)
        //console.log(forecastSaved)
       //????? line 117: Uncaught TypeError: Cannot read properties of undefined (reading 'forecastday')
      setHourForecast((forecastSaved.forecast.forecastday[0].hour))
              setWhatDate(forecastSaved.forecast.forecastday[0].date.substring(5))

    }
      
},[])

React.useEffect(() =>{
  if(city){
        requestForecast();
        requestWeather();
  }

},[city])

  return (
  
<div className = {theme == '0' ? "night-theme" : "day-theme"} >
      <Input setCity={setCity} errorMessage={errorMessage}/>
      <Current weatherData={weatherData}></Current>
     <Forecasts 
        weatherForecastData={weatherForecastData} 
        hourForecast={hourForecast} setHourForecast={setHourForecast}
        whatDate={whatDate} setWhatDate={setWhatDate}>
      </Forecasts>
      {/*<Chart forecast={weatherForecastData}/>*/}

{<footer>
        <div>
          <a href="https://www.weatherapi.com/" 
              title="Free Weather API">
                <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' 
                alt="Weather data by WeatherAPI.com" border="0"></img></a>
        
           Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a>
        </div>
      </footer>}
</div>
  )
}

export default App
