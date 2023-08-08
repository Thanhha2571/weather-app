import "./detailWeekView.css";
import { setActiveWeekItem } from "../../../redux/slices/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
const DetailWeekViewItem = (props) => {
    const { date, mainWeather, maxTemp, minTemp, index } = props;

    const MaxTemp = Math.round(maxTemp - 273.15)
    const MinTemp = Math.round(minTemp - 273.15)

    const formattedDate = moment.unix(date).format('DD-MM');

    const dispatch = useDispatch()
    const { activeWeekItem } = useSelector((state) => state.weather)
    return (
        <div className="detail-week-item">
            <div onClick={() => {
                dispatch(setActiveWeekItem(index))
            }} className={`detail-week-item-field ${index === activeWeekItem ? 'active-week-item' : ''}`}>
                <span className="item-week-date">{formattedDate}</span>
                <div className="item-week-infor">
                    <div className={`img-weather-week-forecast-${mainWeather === "Rain" ? "rainy" : "sunny"}`}></div>
                    <div className="item-week-infor-text">{MinTemp}°C ~ {MaxTemp}°C</div>
                </div>
            </div>
        </div>
    )
}

export default DetailWeekViewItem