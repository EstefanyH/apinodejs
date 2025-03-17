import { v4 as uuidv4 } from "uuid";

class FetchFusionData {

    constructor(swapiService, weatherService) {
        this.swapiService = swapiService;
        this.weatherService = weatherService;
    }

    async execute (planetName)  {
        console.log("Llamando a SWAPI y Weather API para el planeta:", planetName);

        const swapiResponse = await this.swapiService.getPlanetData(planetName);
        const weatherResponse = await this.weatherService.getWeatherData(planetName);
        
        console.log(weatherResponse);
        console.log('-------');

        const result = {
            id: uuidv4(),
            planet: swapiResponse.name,
            climate: swapiResponse.climate,
            population: swapiResponse.population,
            weather: (weatherResponse!= null) ? weatherResponse.condition.text : '',
            temperature: (weatherResponse!= null) ? weatherResponse.temp_c : ''
        };

        console.log("Datos fusionados:", result);
        return result;
    }
}

export default  FetchFusionData;
