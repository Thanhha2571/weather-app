import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./detailForecast.css";
import "./detailForecast.scss";
import DetailTodayView from "./detailTodayView/detailTodayView";
import DetailWeekView from "./detailWeekView/detailWeekView";
import DetailHourView from "./detailHourView/detailHourView";
import ForecastInfoItem from "./detailWeekView/forecastInfoItem";
import { useSelector, useDispatch } from "react-redux";
import { getForecastWeather, setTodayView, setWeekView, setHourView } from "../../redux/slices/weatherSlice";
const DetailForecast = () => {
    const dispatch = useDispatch();
    const [danger, setDanger] = useState(false)
    // const forecastWeather = useSelector((state) => state.weather?.forecastWeather);
    const { todayView, weekView, hourView, activeWeekItem, notFoundCity, loading, searchInput } = useSelector((state) => state.weather)

    const dailyWeather = useSelector((state) => state.weather.forecastWeather)

    const isWeatherArray = dailyWeather && Array.isArray(dailyWeather.daily);

    // if (isWeatherArray) {
    //     console.log(dailyWeather.daily[activeWeekItem]);
    // }

    return (
        <div className="detail-forecast">
            {notFoundCity && (<div className="danger">Not Found City</div>)}
            <div className="heading">
                <span onClick={() => dispatch(setTodayView())} className={`today-view-btn ${todayView ? "active" : ""}`}>Today</span>
                <span onClick={() => dispatch(setWeekView())} className={`today-view-btn ${weekView ? "active" : ""}`}>Daily</span>
                <span onClick={() => dispatch(setHourView())} className={`today-view-btn ${hourView ? "active" : ""}`}>Hourly</span>
            </div>
            {todayView && (<DetailTodayView />)}
            {weekView && (<DetailWeekView />)}
            {hourView && (<DetailHourView />)}
            {activeWeekItem.toString() && weekView && (<ForecastInfoItem />)}
            {loading && (<div className="loading-screen">
                <div className="loading-content">
                    <h2>Loading...</h2>
                    <div className="loading-spinner"></div>
                </div>
            </div>)}
        </div>
    );
};

export default DetailForecast;



