import expect from 'expect'
import LocationService from '../../src/services/LocationService';

describe('location service', () => {
    LocationService.setLocation({latitude:45.53299871933796,longitude:13.723054147149433});
    it('should return isDay', () => {
        LocationService.setDate(new Date("2016-03-02 19:30"));
        expect(
            LocationService.isDayNow
            // night starts at 19:32:57 ends at 05:04:22
        ).toEqual(true)
    });
    it('should return isDay', () => {
        LocationService.setDate(new Date("2016-03-02 19:40"));
        expect(
            LocationService.isDayNow
        ).toEqual(false)
    });
    it('should return isDay', () => {
        LocationService.setDate(new Date("2016-03-02 05:00"));
        expect(
            LocationService.isDayNow
        ).toEqual(false)
    });
    it('should return isDay', () => {
        LocationService.setDate(new Date("2016-03-02 06:00"));
        expect(
            LocationService.isDayNow
        ).toEqual(true)
    });
});