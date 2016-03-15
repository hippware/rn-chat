import SunCalc from 'suncalc';

class LocationService {
    lat: Number;
    long: Number;
    date: Date;
    isDay: Boolean;

    constructor(){
        this.lat = null;
        this.long = null;
        this.date = null;
        this.isDayNow = true;
        this.setLocation = this.setLocation.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setIsDay = this.setIsDay.bind(this);

        if (typeof navigator !== 'undefined'){
            navigator.geolocation.getCurrentPosition(
                (position) => this.setLocation(position.coords.latitude, position.coords.longitude),
                (error) => console.log(error.message),
                {enableHighAccuracy: false, timeout: 20000, maximumAge: 5000}
            );
        }


    }

    setLocation(lat, long){
        this.lat = lat;
        this.long = long;
        this.setIsDay();
    }

    setDate(date){
        this.date = date;
        this.setIsDay();
    }

    setIsDay(){
        if (this.lat === null || this.long === null || this.date === null){
            return true;
        }
        const oldValue = this.isDayNow;
        this.isDayNow = this.isDay(this.date, this.lat, this.long);
        if (oldValue != this.isDayNow && this.delegate && this.delegate.onDayChange){
            this.delegate.onDayChange(this.isDayNow);
        }
    }

    isDay(date, lat, long){
        const times = SunCalc.getTimes(date, lat, long);
        const res = (date < times.night && date > times.nightEnd);
        return res;
    }
}

export default new LocationService();