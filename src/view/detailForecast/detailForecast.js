import React, { useEffect } from "react";
import axios from "axios";
import "./detailForecast.css";
import DetailTodayView from "./detailTodayView/detailTodayView";
import DetailWeekView from "./detailWeekView/detailWeekView";
import DetailHourView from "./detailHourView/detailHourView";
import ForecastInfoItem from "./detailWeekView/forecastInfoItem";
import { useSelector, useDispatch } from "react-redux";
import { getForecastWeather, setTodayView, setWeekView, setHourView } from "../../redux/slices/weatherSlice";

const DetailForecast = () => {
    const dispatch = useDispatch();

    // const currentWeather = useSelector((state) => state.weather?.currentWeather);
    // const forecastWeather = useSelector((state) => state.weather?.forecastWeather);
    const { todayView, weekView, hourView, activeWeekItem } = useSelector((state) => state.weather)

    const dailyWeather = useSelector((state) => state.weather.forecastWeather)

    const isWeatherArray = dailyWeather && Array.isArray(dailyWeather.daily);

    // if (isWeatherArray) {
    //     console.log(dailyWeather.daily[activeWeekItem]);
    // }

    return (
        <div className="detail-forecast">
            <div className="heading">
                <span onClick={() => dispatch(setTodayView())} className={`today-view-btn ${todayView ? "active" : ""}`}>Today</span>
                <span onClick={() => dispatch(setWeekView())} className={`today-view-btn ${weekView ? "active" : ""}`}>Next days forecast</span>
                <span onClick={() => dispatch(setHourView())} className={`today-view-btn ${hourView ? "active" : ""}`}>Next hours forecast</span>
            </div>
            {todayView && (<DetailTodayView />)}
            {weekView && (<DetailWeekView />)}
            {hourView && (<DetailHourView />)}
            {activeWeekItem && (<ForecastInfoItem />)}
        </div>
    );
};

export default DetailForecast;



