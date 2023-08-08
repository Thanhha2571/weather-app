import { httpService } from "./httpServices";
import { API_KEY } from "./httpServices";
const weatherCallApi = {
    getCurrentWeather: (input) => {
        return httpService.GET({
            uri: `weather?q=${input}&units=metric`, params: {
                APPID: API_KEY
            }
        });
    },

    getForecastWeather: (lat,lon) => {
        return httpService.GET({
            uri: "onecall", params: {
                lat: lat,
                lon: lon,
                APPID: API_KEY
            }
        });
    }
    
}

export default weatherCallApi