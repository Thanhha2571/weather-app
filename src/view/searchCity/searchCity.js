import "./searchCity.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentWeather } from "../../redux/slices/weatherSlice";
import { setSearchInput } from "../../redux/slices/weatherSlice";
const SearchCity = () => {
    const [currentTime, setCurrentTime] = useState("");

    const dispatch = useDispatch();

    const handleCurrentWeather = async (searchInput) => {
        dispatch(getCurrentWeather(searchInput));
    };

    const currentWeather = useSelector((state) => state.weather?.currentWeather);
    const searchInput = useSelector((state) => state.weather.searchInput);

    const handleSearch = (e) => {
        e.preventDefault();
        handleCurrentWeather(searchInput);
        dispatch(setSearchInput(""))
    };

    useEffect(() => {
        const updateCurrentTime = () => {
            const now = new Date();
            const day = now.toLocaleString("en", { weekday: "long" });
            const time = now.toLocaleString("en", { timeStyle: "short" });
            setCurrentTime(`${day}, ${time}`);
        };

        updateCurrentTime();
    }, [searchInput]);

    useEffect(() => {
        handleCurrentWeather("Hanoi")
    },[])
    const temp = Math.round(currentWeather?.main?.temp);
    const isWeatherArray = currentWeather && Array.isArray(currentWeather.weather);

    return (
        <div className="left-view">
            <div className="left-view-main">
                <form onSubmit={handleSearch}>
                    <div className="search-box">
                        <input
                            value={searchInput}
                            type="text"
                            className="search-input"
                            placeholder="Enter your place ..."
                            onChange={(e) => dispatch(setSearchInput(e.target.value))}
                        />
                    </div>
                </form>
                {currentWeather && (
                    <div className="simple-detail">
                        {isWeatherArray && <div className={`img-weather-${currentWeather.weather[0].main === "Rain" ? "rainy" : "sunny"}`}></div>}
                        <div className="location-info">{currentWeather.name}</div>
                        <div className="temp-info">{temp} °C</div>
                        <div className="time-info">{currentTime}</div>
                        <div className="description">
                            {isWeatherArray && <div>{currentWeather.weather[0].description}</div>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchCity;


