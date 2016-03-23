import SunCalc from 'suncalc';

class LocationService {
    date: Date;
    isDayNow: Boolean;
    isSet: Boolean;

    constructor(){
        this.position = null;
        this.delegate = null;
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
        this.observe();
    }

    observe(){
        if (typeof navigator !== 'undefined' && !this.watch){
            this.watch = navigator.geolocation.watchPosition((position) => {
                this.setLocation(position.coords);
            },()=>{}, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

        }
        if (!this.timer){
            const updateTime = ()=>this.setDate(new Date());
            this.timer = setInterval(updateTime,1000*60);
        }
    }

    stop(){
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
        this.position = position;
        if (this.delegate && this.delegate.onLocationChange){
            this.delegate.onLocationChange(position);
        }
        this.setIsDay();
    }

    setDate(date){
        console.log("SET DATE:", date);
        this.date = date;
        this.setIsDay();
    }

    setIsDay(){
        if (this.position === null || this.date === null){
            return true;
        }
        const oldValue = this.isDayNow;
        this.isDayNow = this.isDay(this.date, this.position);
        if ((oldValue != this.isDayNow || !this.isSet) && this.delegate && this.delegate.onDayChange){
            console.log("IS DAY:"+this.isDayNow);
            this.isSet = true;
            this.delegate.onDayChange(this.isDayNow);
        }
    }

    isDay(date, position){
        //console.log("DATE:", date,"POSITION:", position);
        const times = SunCalc.getTimes(date, position.latitude, position.longitude);
        const res = (date < times.night && date > times.nightEnd);
        return res;
    }
}

export default new LocationService();