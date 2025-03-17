import axios from 'axios';

// Definición de PlanetData y SwapiResponse según la implementación actual:
export interface PlanetData {
    name: string;
    climate: string;
    population: string;
    terrain: string;
    diameter: string;
}

export interface SwapiResponse {
    count: number;
    results: PlanetData[];
}


export class SwapiService {
    async getPlanetData(planetName: string, isCorrect: boolean = true): Promise<PlanetData | SwapiResponse> {
        try {
            const response = await axios.get<SwapiResponse>(`https://swapi.dev/api/planets/?search=${planetName}`);

            if (!response.data || response.data.results.length === 0) {
                throw new Error(`No se encontró información para el planeta: ${planetName}`);
            }

            return isCorrect ? response.data.results[0] : response.data;
        } catch (error: any) {
            throw new Error('Error al obtener los datos del planeta desde SWAPI');
        }
    }
}
