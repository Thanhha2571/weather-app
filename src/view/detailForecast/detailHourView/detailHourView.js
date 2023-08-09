import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJs,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
} from 'chart.js'

import { useSelector } from "react-redux";
import moment from 'moment';

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)

const DetailHourView = () => {
    const dataYTemp = [];
    const dataYFeels = [];
    let dataX = [];
    const hourWeather = useSelector((state) => state.weather.forecastWeather)

    const isWeatherArray = hourWeather && Array.isArray(hourWeather.hourly);

    if (!isWeatherArray || hourWeather.hourly.length === 0) {
        return null;
    }

    // console.log(hourWeather.hourly);

    hourWeather.hourly.map((item) => {
        dataYTemp.push(item.temp -273.15);
    })

    hourWeather.hourly.map((item) => {
        let time = item.dt
        time = moment.unix(time).format('hh:mm A')
        dataX.push(time)
        dataX.splice(24)
    });

    hourWeather.hourly.map((item) => {
        dataYFeels.push(item.feels_like - 273.15);
    })

    // console.log(dataX);
    // console.log(dataYTemp);
    const data = {
        labels: dataX,
        datasets: [
            {
                label: 'Temperature',
                data: dataYTemp,
                fill: false,
                borderColor: 'rgba(128,128,0)',
                tension: 0.4,
            },

            {
                label: 'Feels like',
                data: dataYFeels,
                fill: false,
                borderColor: 'rgba(0,0,128)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: false,
                min: Math.min(...dataYTemp) - 1
            },
        },
    };
    return (
        <Line data={data} options={options} />
    )
}



export default DetailHourView