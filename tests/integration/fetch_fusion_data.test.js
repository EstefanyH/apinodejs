import { jest } from '@jest/globals'; // 👈 Importa Jest explícitamente en ESM
import FetchFusionData from '../../src/application/usecases/fetch_fusion_data.js';

const mockSwapiService = {
    getPlanetData: jest.fn().mockResolvedValue({
        name: 'Tatooine',
        climate: 'arid',
        population: '200000'
    })
};

const mockWeatherService = {
    getWeatherData: jest.fn().mockResolvedValue({
        temp_c: 30,
        condition: { text: 'Hot' }
    })
};

describe('FetchFusionData', () => {
    it('debería fusionar datos de SWAPI y WeatherAPI', async () => {
        const useCase = new FetchFusionData(mockSwapiService, mockWeatherService);
        const result = await useCase.execute('Tatooine');
        
        expect(result.planet).toBe('Tatooine');
        expect(result.climate).toBe('arid');
        expect(result.population).toBe('200000');
        expect(result.weather).toBe('Hot');
        expect(result.temperature).toBe(30);
    });
});
