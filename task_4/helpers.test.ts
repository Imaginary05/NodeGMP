import { validateInput, shortenPublicHoliday } from './helpers';
import {PublicHoliday} from "./types";

describe('Helpers', () => {
    describe('validateInput', () => {
        it('should not throw an error for valid input', () => {
            const validInput1 = { year: 2023, country: 'GB' };
            const validInput2 = { country: 'FR' };

            expect(() => validateInput(validInput1)).not.toThrow();
            expect(() => validateInput(validInput2)).not.toThrow();
        });

        it('should throw an error for an unsupported country', () => {
            const invalidInput = { country: 'XYZ' };

            expect(() => validateInput(invalidInput)).toThrowError(
                'Country provided is not supported, received: XYZ'
            );
        });

        it('should throw an error for a non-current year', () => {
            const invalidInput = { year: 2022 };

            expect(() => validateInput(invalidInput)).toThrowError(
                'Year provided not the current, received: 2022'
            );
        });
    });

    describe('shortenPublicHoliday', () => {
        it('should shorten a public holiday', () => {
            const holiday = {
                name: 'New Year',
                localName: 'New Year',
                date: '2023-01-01',
            } as PublicHoliday;

            const shortenedHoliday = shortenPublicHoliday(holiday);

            expect(shortenedHoliday).toEqual({
                name: 'New Year',
                localName: 'New Year',
                date: '2023-01-01',
            });
        });
    });
});
