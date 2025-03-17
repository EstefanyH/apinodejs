import axios from 'axios';
import { jest } from '@jest/globals';
import WeatherService from '../../src/infrastructure/services/weather_services.js';

describe('WeatherService', () => {
    beforeEach(() => {
        jest.restoreAllMocks(); // Limpia los mocks antes de cada prueba
        jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silencia los warnings
        jest.spyOn(console, 'error').mockImplementation(() => {}); // Silencia los errores
    });

    it('debería obtener los datos meteorológicos', async () => {
        // Mockeamos axios.get usando jest.spyOn
        const mockGet = jest.spyOn(axios, 'get').mockResolvedValueOnce({
            data: { current: { temp_c: 25, condition: { text: 'Sunny' } } }
        });

        const service = new WeatherService();
        const data = await service.getWeatherData('London');

        expect(data).toEqual({ temp_c: 25, condition: { text: 'Sunny' } });
        expect(mockGet).toHaveBeenCalledTimes(1);
    });

    it('debería manejar un error cuando la ubicación no se encuentra', async () => {
        const mockGet = jest.spyOn(axios, 'get').mockRejectedValueOnce({
            response: { data: { error: { code: 1006 } } } // Simula error 1006 de la API
        });

        const service = new WeatherService();

        await expect(service.getWeatherData('UnknownCity'))
            .resolves.toEqual({ error: 'No se encontró información meteorológica para "UnknownCity"' });

        expect(mockGet).toHaveBeenCalledTimes(1);
    });

    it('debería lanzar un error para otros errores de la API', async () => {
        const mockGet = jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Error desconocido'));

        const service = new WeatherService();

        await expect(service.getWeatherData('UnknownCity'))
            .rejects.toThrow('Error al obtener los datos meteorológicos para "UnknownCity"');

        expect(mockGet).toHaveBeenCalledTimes(1);
    });
});
