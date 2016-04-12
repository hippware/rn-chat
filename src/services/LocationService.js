import SunCalc from 'suncalc';
import EventEmmiter from 'events';

export const IS_DAY_CHANGED = "IsDayChanged";
export const POSITION_CHANGED = "PositionChanged";

class LocationService {
    date: Date;
    isDayNow: Boolean;
    isSet: Boolean;
    lastDate: Date;

    constructor(){
        this.position = null;
        this.eventEmmiter = new EventEmmiter();
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
        this.receiveDayChange = this.receiveDayChange.bind(this);
        this.receivePosition = this.receivePosition.bind(this);
    }

    observe(){
        this.stop();
        if (typeof navigator !== 'undefined' && !this.watch){
            this.watch = navigator.geolocation.watchPosition((position) => {
                this.setLocation(position.coords);
            },()=>{}, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

        }
        if (!this.timer){
            this.timer = setInterval(()=>this.setDate(new Date()),1000*60);
        }
    }

    stop(){
        //this.eventEmmiter.removeAllListeners();
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
            this.eventEmmiter.emit(POSITION_CHANGED, position);
            this.lastDate = date;
            this.setIsDay();
        }
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
        if (oldValue != this.isDayNow || !this.isSet){
            this.isSet = true;
            this.eventEmmiter.emit(IS_DAY_CHANGED, this.isDayNow);
        }
    }

    isDay(date, position){
        console.log("DATE:", date,"POSITION:", position);
        const times = SunCalc.getTimes(date, position.latitude, position.longitude);
        const res = (date < times.night && date > times.nightEnd);
        console.log("IS DAY:", res);
        return res;
    }

    receivePosition(){
        return new Promise((resolve, reject)=>{
            const callback = position => {
                console.log("POSITION CHANGED, resolving", position);
                resolve(position);
            };
            this.eventEmmiter.on(POSITION_CHANGED, callback);
        });
    }

    receiveDayChange(){
        return new Promise((resolve, reject)=>{
            const callback = position => {
                resolve(position);
            };
            this.eventEmmiter.once(IS_DAY_CHANGED, callback);
        });
    }
}

export default new LocationService();