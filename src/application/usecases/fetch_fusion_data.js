const FetchFusionData = async (swapiService, weatherService) => {
    const swapiResponse = await swapiService.getPlanetData();
    const weatherResponse = await weatherService.getWeather(swapiResponse.name);
    
    return {
        id: require("uuid").v4(),
        planet: swapiResponse.name,
        climate: swapiResponse.climate,
        population: swapiResponse.population,
        weather: weatherResponse.condition.text,
        temperature: weatherResponse.temp_c
    };
};

module.exports = FetchFusionData;
