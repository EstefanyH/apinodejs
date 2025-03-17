import axios from 'axios';

const WEATHER_API_KEY = 'c4e3d306f8b149ada5604759251703';

const planetToCity = {
    "Tatooine": "Dubai",         // Caluroso y desértico
    "Hoth": "Reykjavik",         // Frío y nevado
    "Endor": "Vancouver",        // Bosques templados
    "Mustafar": "Honolulu",      // Volcánico y cálido
    "Naboo": "Venecia",          // Planeta con agua y paisajes verdes
    "Coruscant": "New York"      // Ciudad metrópoli
};

class WeatherService {

    async getWeatherData(planetName) {
        try {
            const cityName = planetToCity[planetName] || "New York"; // Si no está en el mapeo, usa "New York"

            const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
                params: {
                    key: WEATHER_API_KEY,  // Usa tu clave de API de WeatherAPI
                    q: cityName
                }
            });
            
            var iscorrect = true;
            
            if (!response.data || !response.data.current) {
                throw new Error(`⚠️ No se encontró información meteorológica para "${planetName}"`);
            }

            console.log(`✅ Clima obtenido para ${planetName} (${cityName}):`, response.data.current);
            return response.data.current;

        } catch (error) {
            if (error.response?.data?.error?.code === 1006) {
                console.warn(`⚠️ No se encontró una ubicación válida para: "${planetName}"`);
                return { error: `No se encontró información meteorológica para "${planetName}"` };
            }

            console.error('❌ Error al obtener los datos del clima:', error.response?.data || error.message);
            throw new Error(`Error al obtener los datos meteorológicos para "${planetName}"`);
        }
    }

}

export default WeatherService;