import axios from 'axios';

const WEATHER_API_KEY = 'c4e3d306f8b149ada5604759251703';

const planetToCity: { [key: string]: string } = {
    Tatooine: "Dubai",
    Hoth: "Reykjavik",
    Endor: "Amazonas",
    Mustafar: "Hawaii",
    Naboo: "Venecia",
    Coruscant: "Nueva York"
};


export interface WeatherResponse {
    condition: { text: string };
    temp_c: number;
}

export interface WeatherError {
    error: string;
}

export class WeatherService {
    async getWeatherData(planetName: string): Promise<WeatherResponse | WeatherError> {
        const cityName = planetToCity[planetName] || "New York";

        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
                params: { key: WEATHER_API_KEY, q: cityName }
            });

            if (!response.data || !response.data.current) {
                return { error: `No se encontró información meteorológica para "${planetName}"` };
            }

            return response.data.current as WeatherResponse;

        } catch (error: any) {
            return { error: `Error al obtener datos meteorológicos: ${error.message}` };
        }
    }
}