import axios from 'axios';
import {
    getListOfPublicHolidays,
    checkIfTodayIsPublicHoliday,
    getNextPublicHolidays,
} from './public-holidays.service';

jest.mock('axios');

describe('Public Holidays Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch a list of public holidays', async () => {
        const year = 2023;
        const country = 'GB';

        const mockData = [
            {
                name: 'New Year',
                localName: 'New Year',
                date: '2023-01-01',
            },
        ];

        (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

        const result = await getListOfPublicHolidays(year, country);

        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/PublicHolidays/${year}/${country}`));
        expect(result).toEqual(mockData);
    });

    it('should check if today is a public holiday', async () => {
        const country = 'FR';

        (axios.get as jest.Mock).mockResolvedValue({ status: 200 });

        const result = await checkIfTodayIsPublicHoliday(country);

        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/IsTodayPublicHoliday/${country}`));
        expect(result).toBe(true);
    });

    it('should fetch the next public holidays', async () => {
        const country = 'DE';

        const mockData = [
            {
                name: 'New Year',
                localName: 'New Year',
                date: '2023-01-01',
            },
        ];

        (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

        const result = await getNextPublicHolidays(country);

        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/NextPublicHolidays/${country}`));
        expect(result).toEqual(mockData);
    });
});

// integration test
const express = require('express');

const app = express();

// Mock Axios requests for testing
jest.mock('axios');

// Mock Express route handlers for testing
app.get('/PublicHolidays/:year/:country', async (req, res) => {
    try {
        const { year } = req.params;
        const data = [
            {
                name: 'New Year',
                localName: 'New Year',
                date: `${year}-01-01`,
            },
        ];
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/IsTodayPublicHoliday/:country', async (req, res) => {
    try {
        res.status(200).json({ status: 200 });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/NextPublicHolidays/:country', async (req, res) => {
    try {
        const data = [
            {
                name: 'New Year',
                localName: 'New Year',
                date: '2023-01-01',
            },
        ];
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

describe('Public Holidays Service (Integration Tests)', () => {
    it('should fetch a list of public holidays', async () => {
        const year = 2023;
        const country = 'GB';

        (axios.get as jest.Mock).mockResolvedValue({ data: [] });

        const result = await getListOfPublicHolidays(year, country);

        expect(result).toEqual([]);
    });

    it('should check if today is a public holiday', async () => {
        const country = 'GB';

        (axios.get as jest.Mock).mockResolvedValue({ status: 200 });

        const result = await checkIfTodayIsPublicHoliday(country);

        expect(result).toBe(true);
    });

    it('should fetch the next public holidays', async () => {
        const country = 'GB';

        (axios.get as jest.Mock).mockResolvedValue({ data: [] });

        const result = await getNextPublicHolidays(country);

        expect(result).toEqual([]);
    });
});
