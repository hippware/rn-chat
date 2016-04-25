import SunCalc from 'suncalc';

class LocationService {
    date: Date;
    isDayNow: Boolean;
    isSet: Boolean;
    lastDate: Date;

    constructor(){
        this.position = null;
        this.positionCallback = null;
        this.dayChangeCallback = null;
        this.date = null;
        this.isDayNow = true;
        this.isSet = false;
        this.timer = null;
        this.watch = null;
        this.setLocation = this.setLocation.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setIsDay = this.setIsDay.bind(this);
        this.observe = this.observe.bind(this);
        this.stop = this.stop.bind(this);
    }

    observe(){
        console.log("LocationService.observe()");
        this.stop();
        if (typeof navigator !== 'undefined' && !this.watch){
            this.watch = navigator.geolocation.watchPosition((position) => {
                this.setLocation(position.coords);
            },()=>{}, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

        }
        if (!this.timer){
            this.timer = setInterval(()=>this.setDate(new Date()),1000*60);
        }
        this.setDate(new Date());
    }

    stop(){
        console.log("LocationService.stop()");
        if (this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.watch){
            navigator.geolocation.clearWatch(this.watch);
            this.watch = null;
        }
    }

    setLocation(position){
        const date = new Date();
        if (this.lastDate && date.getTime()-this.lastDate.getTime()<1000*60){
            return
        }
        if (!this.position || (position.latitude != this.position.latitude || position.longitude != this.position.longitude || position.heading != this.position.heading)) {
            console.log("SET LOCATION:", position, this.position);
            this.position = position;
            this.positionCallback && this.positionCallback(position);
            this.lastDate = date;
            this.setIsDay();
        }
    }

    setDate(date){
        this.date = date;
        this.setIsDay();
    }

    setIsDay(){
        if (this.position === null || this.date === null){
            return true;
        }
        const oldValue = this.isDayNow;
        this.isDayNow = this.isDay(this.date, this.position);
        if (oldValue != this.isDayNow || !this.isSet){
            this.isSet = true;
            this.dayChangeCallback && this.dayChangeCallback(this.isDayNow);
        }
    }

    isDay(date, position){
        console.log("DETERMINE DAY:", date, position);
        const times = SunCalc.getTimes(date, position.latitude, position.longitude);
        const res = (date < times.night && date > times.nightEnd);
        console.log(res);
        return res;
    }

}

export default new LocationService();