import { v4 as uuidv4 } from 'uuid';
import { SwapiService, PlanetData } from '../../infrastructure/services/swapi_services';
import { WeatherService, WeatherResponse, WeatherError } from '../../infrastructure/services/weather_services';

interface FusionResult {
    id: string;
    planet: string;
    climate: string;
    population: string;
    weather: string;
    temperature: string;
}

export class FetchFusionData {
    private swapiService: SwapiService;
    private weatherService: WeatherService;

    constructor(swapiService: SwapiService, weatherService: WeatherService) {
        this.swapiService = swapiService;
        this.weatherService = weatherService;
    }

    async execute(planetName: string): Promise<FusionResult> {
        console.log("Llamando a SWAPI y Weather API para el planeta:", planetName);

        const swapiResponse = await this.swapiService.getPlanetData(planetName);

        // Validamos que `swapiResponse` sea de tipo `PlanetData`
        if (!('population' in swapiResponse)) {
            throw new Error(`Respuesta inesperada de SWAPI para el planeta "${planetName}"`);
        }

        const weatherResponse: WeatherResponse | WeatherError = await this.weatherService.getWeatherData(planetName);

        // Manejo de error de WeatherService
        const weather = 'error' in weatherResponse ? "No disponible" : weatherResponse.condition.text;
        const temperature = 'error' in weatherResponse ? "No disponible" : `${weatherResponse.temp_c}°C`;

        const result: FusionResult = {
            id: uuidv4(),
            planet: swapiResponse.name,
            climate: swapiResponse.climate,
            population: swapiResponse.population,
            weather: weather,
            temperature: temperature,
        };

        console.log("Datos fusionados:", result);
        return result;
    }
}
