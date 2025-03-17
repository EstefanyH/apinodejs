import axios  from 'axios'

class SwapiService {

    static async getPlanet(planetId = 1) {
        const response = await axios.get(`https://swapi.dev/api/planets/${planetId}/`);
        return response.data;
    }
}

export default SwapiService;
