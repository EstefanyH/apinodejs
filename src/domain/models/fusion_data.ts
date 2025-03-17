export class FusionData {
    id: string;
    planet: string;
    climate: string;
    population: string;
    weather: string;
    temperature: string;

    constructor(id: string, planet: string, climate: string, population: string, weather: string, temperature: string) {
        this.id = id;
        this.planet = planet;
        this.climate = climate;
        this.population = population;
        this.weather = weather;
        this.temperature = temperature;
    }
}
