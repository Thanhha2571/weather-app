import { httpService } from "./httpServices";
import { httpService2 } from "./httpServices";
import { API_KEY, key } from "./httpServices";
const weatherCallApi = {
    getCurrentWeather: (input) => {
        return httpService.GET({
            uri: `weather?q=${input}&units=metric`, params: {
                APPID: API_KEY
            }
        });
    },

    getForecastWeather: ({lat,lon}) => {
        return httpService.GET({
            uri: "onecall", params: {
                lat: lat,
                lon: lon,
                APPID: API_KEY
            }
        });
    },

    getPosition: (input) => {
        return httpService2.GET({
            uri: `json?q=${input}`, params: {
                key: key
            }
        });
    }
    
}

export default weatherCallApi