import React from "react";
//import {data} from '../testforecast';
import '../styles/forecastWeather.css';

//TO DO:
//https://react.dev/reference/react/useRef -> scrollIntoView Example 2 of 4: Scrolling an image into view 
export default function Forecasts(props)
{

  function showHourForecast(day){
      //console.log(day)
    props.setWhatDate(day.substring(5));
      let hours = props.weatherForecastData.forecast.forecastday;
      hours.map(dayHours => { 
        if(dayHours.date === day) props.setHourForecast(dayHours.hour) })
  }

  function getMonth(date)
  {
    
    let monthNum = date.substring(5,7);
    
      var month ="";
  switch(monthNum)
  {
  case '01': month = "Jan"; break;
    case '02': month = "Feb"; break;
      case '03': month = "Mar"; break;
        case '04': month = "Apr"; break;
          case '05': month = "May"; break;
            case '06': month = "Jun"; break;
              case '07': month = "Jul"; break;
            case '08': month = "Aug"; break;
          case '09': month = "Sept"; break;
        case '10': month = "Oct"; break;
      case '11': month = "Nov"; break;
    case '12': month = "Dec"; break;    
      
  }
    return month;
}
//https://stackoverflow.com/questions/68658249/how-to-do-react-horizontal-scroll-using-mouse-wheel
//const scrollRef = useHorizontalScroll();
 const elRef = React.useRef();

React.useEffect(() => {
    const el = elRef.current;
   // console.log(el);
    if (el) {
      const onWheel = e => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el./*scrollTo*/scrollBy({
          left: /*el.scrollLeft + */e.deltaY,
          behavior: "smooth"
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
    
  }, [elRef.current]);


    return(

        <>
        {props.weatherForecastData && ( <> 

                <div className="date-picker-container">
                 
          {
          props.weatherForecastData.forecast.forecastday.map((day, index )=> <div className="forecast-days"
             key={index} onClick={()=>showHourForecast(day.date)} >
              <div className="day-summary" id={props.whatDate == day.date.substring(5) ? "selected" : "not-selected"}>
                 <div>
                  {getMonth(day.date)} {day.date.substring(8)}

                  </div>

                    <div>
                       <div className="min-max-temp">{day.day.maxtemp_c}℃</div>
                       <div className="min-max-temp">{day.day.mintemp_c}℃</div>
                      </div>
                
              </div>
              
              </div>
              )
          }
          
        </div>
            
        <div className="scroll-container" ref={/*scrollRef*/elRef}>
          
          <div className="hour-container" >
             <div id="first-element-in-the-list" >Hourly</div>
             <div className="selected-date">{props.whatDate}</div>
             <div>Temp</div>
             <div className="wind-speed">Wind</div>
             <div>Direction</div>

          </div>
             
           
   
            {props.hourForecast.map((weatherData, index) => 
           
             <div key={index} className="hour-container">
             
              <div className="hour-image-container">
              <div>{weatherData.time.substring(11)}</div>
              <img className="weather-image" src={weatherData.condition.icon} alt="weather-icon"></img>
               <div className="temp-forecast">{weatherData.temp_c}℃</div>
               <div className="wind-speed">{weatherData.wind_kph}km/h</div>
               <div>{weatherData.wind_dir}</div>
              </div>
                     </div>    
              )}
               
       
        </div>
        
        </>
          
        )}

      </>
    )
}