import "./detailTodayView.css";
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { getForecastWeather } from "../../../redux/slices/weatherSlice";
import moment from "moment";
const DetailTodayView = () => {
    const dispatch = useDispatch();

    const currentWeather = useSelector((state) => state.weather?.currentWeather);
    const weatherToday = useSelector((state) => state.weather?.forecastWeather.current);

    const lat = currentWeather?.coord?.lat;
    const lon = currentWeather?.coord?.lon;

    useEffect(() => {
        const handleForecastWeather = async () => {
            if (lat && lon) {
                dispatch(getForecastWeather({ lat, lon }));
            }
        };
        handleForecastWeather();
    }, [lat, lon]);

    const sunrise = weatherToday?.sunrise;
    const sunset = weatherToday?.sunset;

    const formattedSunrise = moment.unix(sunrise).format('hh:mm A');
    const formattedSunset = moment.unix(sunset).format('hh:mm A')

    const visibility = (weatherToday?.visibility / 1000)
    return (
        <div className="detail-today">
            <div className="detail-today-item">
                <div className="detail-today-item-field">
                    <span className="item-text">UV Index</span>
                    <div className="item-infor">
                        <div className="item-infor-img-uv"></div>
                        <div className="item-infor-text">{weatherToday?.uvi}</div>
                    </div>
                </div>
            </div>
            <div className="detail-today-item">
                <div className="detail-today-item-field">
                    <span className="item-text">Wind Speed</span>
                    <div className="item-infor">
                        <div className="item-infor-img-wind-speed"></div>
                        <div className="item-infor-text">{weatherToday?.wind_speed} m/s</div>
                    </div>
                </div>
            </div>
            <div className="detail-today-item">
                <div className="detail-today-item-field">
                    <span className="item-text">Sunrise & Sunset</span>
                    <div className="sunrise-field">
                        <div className="img-sunrise"></div>
                        <span className="item-infor-sunrise-text">{formattedSunrise}</span>
                    </div>
                    <div className="sunset-field">
                        <div className="img-sunset"></div>
                        <span className="item-infor-sunset-text">{formattedSunset}</span>
                    </div>
                </div>
            </div>
            <div className="detail-today-item">
                <div className="detail-today-item-field">
                    <span className="item-text">Humidity</span>
                    <div className="item-infor">
                        <div className="item-infor-img-humidity"></div>
                        <div className="item-infor-text">{weatherToday?.humidity} %</div>
                    </div>
                </div>
            </div>
            <div className="detail-today-item">
                <div className="detail-today-item-field">
                    <span className="item-text">Visibility</span>
                    <div className="item-infor">
                        <div className="item-infor-img-visibility"></div>
                        <div className="item-infor-text">{visibility} km</div>
                    </div>
                </div>
            </div>
            <div className="detail-today-item">
                <div className="detail-today-item-field">
                    <span className="item-text">Pressure</span>
                    <div className="item-infor">
                        <div className="item-infor-img-pressure"></div>
                        <div className="item-infor-text">{weatherToday?.pressure} hPa</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailTodayView