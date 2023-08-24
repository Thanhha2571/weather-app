import "./detailTodayView.scss";
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { getForecastWeather } from "../../../redux/slices/weatherSlice";
import moment from "moment";
import WindSpeed from "../../../asset/wind-speed.png"
import Sunrise from "../../../asset/sunrise.png"
import Humidity from "../../../asset/humidity.jpeg"
import Sunset from "../../../asset/sunrise.png"
import Visibility from "../../../asset/visibility.png"
import Pressure from "../../../asset/pressure.png"
import UvIcon from "../../../asset/uv-icon.jpeg"
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

    // if (weatherToday) {
    //     var sunrise = weatherToday.sunrise;

    // }
    const formattedSunrise = moment.unix(sunrise).format('hh:mm A');
    const formattedSunset = moment.unix(sunset).format('hh:mm A')

    const visibility = (weatherToday?.visibility / 1000)
    return (
        <div className="detail-today">
            <div className="detail-today-item">
                <div className="detail-today-item-field">
                    <span className="item-text">UV Index</span>
                    <div className="item-infor">
                        <img className="item-infor-img" src={UvIcon} />
                        <div className="item-infor-text">{weatherToday?.uvi}</div>
                    </div>
                </div>
            </div>
            <div className="detail-today-item">
                <div className="detail-today-item-field">
                    <span className="item-text">Wind Speed</span>
                    <div className="item-infor">
                        {/* <div className="item-infor-img-wind-speed"> */}
                        <img className="item-infor-img" src={WindSpeed} />
                        {/* </div> */}
                        <div className="item-infor-text">{weatherToday?.wind_speed} m/s</div>
                    </div>
                </div>
            </div>
            <div className="detail-today-item">
                <div className="detail-today-item-field">
                    <span className="item-text">Sunrise & Sunset</span>
                    <div className="sunrise-field">
                        <img className="item-infor-img" src={Sunrise} />
                        <span className="item-infor-sunrise-text">{formattedSunrise}</span>
                    </div>
                    <div className="sunset-field">
                        <img className="item-infor-img" src={Sunset} />
                        <span className="item-infor-sunset-text">{formattedSunset}</span>
                    </div>
                </div>
            </div>
            <div className="detail-today-item">
                <div className="detail-today-item-field">
                    <span className="item-text">Humidity</span>
                    <div className="item-infor">
                        <img className="item-infor-img" src={Humidity} />
                        <div className="item-infor-text">{weatherToday?.humidity} %</div>
                    </div>
                </div>
            </div>
            <div className="detail-today-item">
                <div className="detail-today-item-field">
                    <span className="item-text">Visibility</span>
                    <div className="item-infor">
                        <img className="item-infor-img" src={Visibility} />
                        <div className="item-infor-text">{visibility} km</div>
                    </div>
                </div>
            </div>
            <div className="detail-today-item">
                <div className="detail-today-item-field">
                    <span className="item-text">Pressure</span>
                    <div className="item-infor">
                        <img className="item-infor-img" src={Pressure} />
                        <div className="item-infor-text">{weatherToday?.pressure} hPa</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailTodayView