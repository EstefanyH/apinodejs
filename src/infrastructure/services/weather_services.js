import axios from 'axios';

const WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json';
const WEATHER_API_KEY = 'c4e3d306f8b149ada5604759251703';

class WeatherService {

    static async getWeather(location){
        const response = await axios.get(`${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${location}`);
        return response.data.current;
    }

}

export default WeatherService;