//const URL =  'http://jsonplaceholder.typicode.com/posts';
import {HOST} from '../globals';
const URL = 'http://'+HOST+':1096/wocky/v1/user';
const RESET_URL = 'http://'+HOST+':1096/wocky/v1/db/delete';

class UserService {

    // do login with given dictionary
    login(data){
        return new Promise((resolve,reject)=>{
            console.log("LOGIN WITH DATA:", data);
            //// unit test number is 111
            //if (data.phoneNumber === '111'){
            //    return this.delegate && this.delegate.onLoginSuccess({phoneNumber: data.phoneNumber, sessionID: 'testSession', uuid:'testUser'});
            //}
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)})
                .then((response) => response.text())
                .then((responseText) => {
                    console.log("RESPONSE:"+responseText);
                    const res = JSON.parse(responseText);
                    console.log("SERVER DATA:",res);
                    if (!res.sessionID){
                        reject({message: "No session param returned"});
                    } else {
                        resolve(res);
                    }
                })
                .catch((error) => {
                    console.log("ERROR", error);
                    reject(error);
                });
        });

    }

    // do login with given dictionary
    register(data){
        return new Promise((resolve,reject)=> {
            if (!data.sessionID) {
                reject({message: "No session param passed"});
            }
            console.log("REGISTER WITH DATA:", data);
            //if (data.phoneNumber === '111' && data.sessionID=='testSession'){
            //    return this.delegate && this.delegate.onRegisterSuccess(data);
            //}
            // emulate server request and response
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                    console.log("RESPONSE:", response);
                    return response.text()
                })
                .then((responseText) => {
                    const res = JSON.parse(responseText);
                    console.log("SERVER DATA:", res);
                    if (!res.sessionID){
                        reject({message: "No session param returned"});
                    } else {
                        resolve(res);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });

    }

    logout(data){
        // data to send to server
        if (data){
            console.log("LOGOUT DATA:", data);
            fetch(RESET_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)})
                .then((response) => {console.log("RESPONSE:", response);return response.text()})
                .catch((error) => {
                });

        }
    }
}

export default new UserService();