//const URL =  'http://jsonplaceholder.typicode.com/posts';
import {HOST, DEBUG} from '../globals';
const URL = 'http://'+HOST+':1096/wocky/v1/user';
const RESET_URL = 'http://'+HOST+':1096/wocky/v1/db/delete';
import xmpp from './xmpp/xmpp';

class UserService {
    login(d){
        const {type, resource, ...provider_data} = d;
        const data = {
            provider: 'digits',
            resource,
            token:true,
            provider_data
        };
        const password = `$J$${JSON.stringify(data)}`;
        console.log("PASSWORD:", password);
        xmpp.onConnect = ()=>console.log("CONNECTED");
        xmpp.onAuthFail = error=>console.log("AUTH ERROR:", error);
        xmpp.login({username:'register', password});
        return new Promise((resolve, reject)=>{

        });
    }

    // do login with given dictionary
    loginOld(d){
        const data = fromCamelCase(d);

        return new Promise((resolve,reject)=>{
            if (DEBUG){
                console.log("LOGIN WITH DATA:", data);
            }
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)})
                .then((response) => {if (response.statusCode>=400){reject(response.statusText);} else {return response.text()}})
                .then((responseText) => {
                    if (DEBUG){
                        console.log("SERVER DATA:",responseText);
                    }
                    const res = JSON.parse(responseText);
                    if (res.error){
                        reject({message: res.error});
                    } else {
                        const result = toCamelCase(res);
                        if (!result.sessionID){
                            reject({message: "No session param returned"});
                        } else {
                            resolve(result);
                        }
                    }
                })
                .catch((error) => {
                    console.log("LOGIN ERROR:", error);
                    reject(error);
                });
        });

    }
    logout(d){
        const data = fromCamelCase(d);
        // data to send to server
        return new Promise((resolve, reject)=> {
            console.log("LOGOUT DATA:",data);
            if (data && data.phone_number) {
                fetch(RESET_URL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) => {
                        if (response.status>=400){
                            console.log("ERROR:",response.statusText);
                            reject(response.statusText);
                        } else {
                            resolve();
                        }
                    })
                    .catch((error) => {
                        console.log("ERROR:", error);
                        reject(error);
                    });

            } else {
                resolve();
            }
        });
    }
}

export default new UserService();


export function toCamelCase(data){
    const {first_name, phone_number, last_name, user, token, ...result} = data;
    if (phone_number){
        result.phoneNumber = phone_number;
    }
    if (user){
        result.uuid = user;
    }
    if (token){
        result.sessionID = token;
    }
    if (first_name){
        result.firstName = first_name;
    }
    if (last_name){
        result.lastName = last_name;
    }
    return result;
}

export function fromCamelCase(data){
    const {firstName, userID, phoneNumber, lastName, sessionID, uuid, ...result} = data;
    if (phoneNumber) {
        result.phone_number = phoneNumber;
    }
    if (userID){
        result.auth_user = userID;
    }
    if (firstName) {
        result.first_name = firstName;
    }
    if (lastName){
        result.last_name = lastName;
    }
    if (sessionID){
        result.token = sessionID;
    }
    if (uuid){
        result.user = uuid;
    }
    return result;

}

