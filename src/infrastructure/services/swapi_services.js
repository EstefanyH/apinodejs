import axios  from 'axios'

class SwapiService {

    async getPlanetData(planetName) {
        try {
            const response = await axios.get(`https://swapi.dev/api/planets/?search=${planetName}`);
            
            var iscorrect = true;
            if (!response.data) {
                iscorrect = false;
                throw new Error(`No se encontró información para el planeta: ${planetName}`);
            }
            
            console.log(`🌍 Datos obtenidos para el planeta ${planetName}:`, response.data);
            
            return  (iscorrect) ? response.data.results[0] : response.data ;
        } catch (error) {
            console.error('❌ Error al obtener los datos del planeta:', error.message);
            throw new Error('Error al obtener los datos del planeta desde SWAPI');
        }
        
    }
}

export default SwapiService;
