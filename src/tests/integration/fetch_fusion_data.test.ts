import { jest } from '@jest/globals';
import { FetchFusionData } from '../../application/usecases/fetch_fusion_data';

// Definición de PlanetData y SwapiResponse según la implementación actual:
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

interface WeatherData {
    temp_c: number;
    condition: { text: string };
}

interface WeatherError {
    error: string;
}

const mockSwapiService = {
    getPlanetData: jest.fn((planetName: string, isCorrect: boolean = true): Promise<PlanetData | SwapiResponse> =>
        Promise.resolve(isCorrect
            ? {
                name: 'Tatooine',
                climate: 'arid',
                population: '200000',
                terrain: 'desert',
                diameter: '10465',
            }
            : {
                count: 1,
                results: [
                    {
                        name: 'Tatooine',
                        climate: 'arid',
                        population: '200000',
                        terrain: 'desert',
                        diameter: '10465',
                    }
                ]
            }
        )
    ),
};


const mockWeatherService = {
    getWeatherData: jest.fn((): Promise<WeatherData | WeatherError> =>
        Promise.resolve({
            error: "No data available",
        })
    ),
};

describe('FetchFusionData', () => {
    it('debería fusionar datos de SWAPI y WeatherAPI', async () => {
        const useCase = new FetchFusionData(mockSwapiService, mockWeatherService);
        const result = await useCase.execute('Tatooine');

        expect(result.planet).toBe('Tatooine');
        expect(result.climate).toBe('arid');
        expect(result.population).toBe('200000');
        expect(result.weather).toBe('No disponible');
        expect(result.temperature).toBe('No disponible');
    });
});
