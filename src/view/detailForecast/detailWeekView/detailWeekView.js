// import "./detailWeekView.css"
import "./detailWeekView.scss"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { getForecastWeather } from "../../../redux/slices/weatherSlice";
import DetailWeekViewItem from "./detailWeekViewItem";
import ForecastInfoItem from "./forecastInfoItem";
const DetailWeekView = () => {
    const dispatch = useDispatch()
    
    const currentWeather = useSelector((state) => state.weather?.currentWeather);
    const weatherWeekForecast = useSelector((state) => state.weather?.forecastWeather.daily);

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

    // if (weatherWeekForecast) {
    //     console.log(weatherWeekForecast);
    // }
    return (
        <div className="detail-week">
            {weatherWeekForecast.map((item,index) => <DetailWeekViewItem date={item.sunrise} key={index} index={index} mainWeather={item.weather[0].main} maxTemp={item.temp.max} minTemp={item.temp.min} />)}
        </div>
    )
}

export default DetailWeekView