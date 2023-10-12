const request = require('supertest');
const app = 'https://date.nager.at';

describe('End-to-End Tests', () => {
    it('should get the list of available countries', async () => {
        const response = await request(app)
            .get('/api/v3/AvailableCountries')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toContainEqual({
            countryCode: "GB",
            name: "United Kingdom"
        });
    });

    it('should check if today is a public holiday for a specific country', async () => {
        const countryCode = 'GB';
        await request(app)
            .get(`/api/v3/IsTodayPublicHoliday/${countryCode}`)
            .expect(204);


    });
});
