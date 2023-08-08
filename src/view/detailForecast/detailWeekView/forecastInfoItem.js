import "./detailWeekView.css";
import { useSelector } from "react-redux";
import moment from 'moment';

const ForecastInfoItem = () => {
    const { activeWeekItem } = useSelector((state) => state.weather)

    const dailyWeather = useSelector((state) => state.weather.forecastWeather)

    const isWeatherArray = dailyWeather && Array.isArray(dailyWeather.daily);

    const maxTemperature = Math.round((dailyWeather.daily[activeWeekItem].temp.max) - 273.15)
    const minTemperature = Math.round((dailyWeather.daily[activeWeekItem].temp.min) - 273.15)

    // console.log("ActiveWeekItem", dailyWeather.daily[activeWeekItem]);

    const sunrise = dailyWeather.daily[activeWeekItem].sunrise;
    const sunset = dailyWeather.daily[activeWeekItem].sunset;
    const date = dailyWeather.daily[activeWeekItem].sunrise;
    const formattedDate = moment.unix(date).format('DD-MM');
    const formattedSunrise = moment.unix(sunrise).format('hh:mm A');
    const formattedSunset = moment.unix(sunset).format('hh:mm A')
    // const formattedSunrise = moment.unix(sunrise).format('YYYY-MM-DD HH:mm:ss');
    // console.log(formattedDate);

    return (
        <div className="weather-information">
            <p className="item-daily-infor-text">{formattedDate}</p>
            {isWeatherArray && (<div className="weather-information-field">
                <div className="weather-information-item">
                    <p className="item-daily-infor-text">Temp: {minTemperature}°C ~ {maxTemperature}°C </p>
                    <p className="item-daily-infor-text">Humidity: {dailyWeather.daily[activeWeekItem].humidity} % </p>
                    <p className="item-daily-infor-text">Wind speed: {dailyWeather.daily[activeWeekItem].wind_speed} m/s</p>
                    <p className="item-daily-infor-text">Pressure: {dailyWeather.daily[activeWeekItem].pressure} hPa</p>
                </div>
                <div className="weather-information-item">
                    <p className="item-daily-infor-text">Main weather: {dailyWeather.daily[activeWeekItem].weather[0].main} </p>
                    <p className="item-daily-infor-text">Description: {dailyWeather.daily[activeWeekItem].weather[0].description} </p>
                    <p className="item-daily-infor-text">Sunrise: {formattedSunrise} </p>
                    <p className="item-daily-infor-text">Sunset: {formattedSunset} </p>
                </div>
            </div>
            )}
        </div>
    )
}

export default ForecastInfoItem