import React from "react";
//import {data} from '../testdata';
import '../styles/currentWeather.css'
import wind_arrow from '../assets/windarrow.png'
import { ThemeContext } from "../context/theme";

//save weather data in localstorage, if wheather in localstorage is older than, lets say, 1h?
//then request another weather forecast?
export default function Current(props)
{
const { theme, setTheme} = React.useContext(ThemeContext);

//request data from backend, backend stores secret api key for the actual data from api provider
//backend should send back json with forecast and current data

  React.useCallback(() => {
       setTheme(props.weatherData.current.is_day);
      
    }, [props.weatherData]);
    
    return(
        <div className="current-weather">
            {/*console.log(props.weatherData)*/}
            {/** why do i have this condition? */}
         {  props.weatherData && (<>
         
         
          <div className="location-name">{props.weatherData.location.name}, {props.weatherData.location.country}</div>
            <span className="curr-weaher-text">Current weather</span>
          <div className="current-weather-clock">
            {props.weatherData.location.localtime}
          </div>

          <div className="icon-temp-feelslike-container">
            <div className="icon-and-temp">
              <img src={props.weatherData.current.condition.icon} alt="weather-cond-img" ></img>
              <div className="current-temp">{props.weatherData.current.temp_c}	℃</div>
            </div>

            <div className="text-and-feelslike">
              <div>{props.weatherData.current.condition.text}</div>
              <div className="feelslike-temp">Feels like: {props.weatherData.current.feelslike_c}℃</div>
            </div>

          </div>

          <div className="misc-weaher-data-row">

            <div className="misc-data-item"><span>UV</span><span>{props.weatherData.current.uv}</span></div>
            <div className="misc-data-item"><span>Wind</span><span>{props.weatherData.current.wind_kph}km/h 
                    <img src={wind_arrow} className="wind-arrow" style={{transform: `rotate(${props.weatherData.current.wind_degree}deg)`}}></img></span></div>
            <div className="misc-data-item"><span>Humidity</span><span>{props.weatherData.current.humidity}%</span></div>
            <div className="misc-data-item"><span>Visibility</span><span>{props.weatherData.current.vis_km}km</span></div>
            <div className="misc-data-item"><span>Pressure</span><span>{props.weatherData.current.pressure_mb}mb</span></div>
            <div className="misc-data-item"><span>Dew point</span><span>{props.weatherData.current.dewpoint_c}℃</span></div>

          </div>
            </>
         )}
            

              
 
            
          
            
        </div>
    )
}