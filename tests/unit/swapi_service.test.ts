import axios from 'axios';
import { jest } from '@jest/globals';
import { SwapiService } from '../../src/infrastructure/services/swapi_services';

jest.mock('axios'); // Mockeamos axios para todos los tests

describe('SwapiService', () => {
    beforeEach(() => {
        jest.restoreAllMocks(); // Restaura los mocks antes de cada test
    });

    it('debería obtener los datos de un planeta de SWAPI', async () => {
        // Mockeamos axios.get usando jest.spyOn
        const mockGet = jest.spyOn(axios, 'get').mockResolvedValueOnce({
            data: { results: [{ name: 'Tatooine', climate: 'arid', population: '200000' }] },
        });

        const service = new SwapiService();
        const data = await service.getPlanetData('Tatooine');

        expect(data).toMatchObject({ 
            name: 'Tatooine', 
            climate: 'arid', 
            population: '200000' 
        });

        expect(mockGet).toHaveBeenCalledTimes(1);
    });
});
