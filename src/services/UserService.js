//const URL =  'http://jsonplaceholder.typicode.com/posts';
import {HOST} from '../globals';
const URL = 'http://'+HOST+':1096/wocky/v1/user';
const RESET_URL = 'http://'+HOST+':1096/wocky/v1/db/delete';

class UserService {

    // do login with given dictionary
    login(data){
        return new Promise((resolve,reject)=>{
//            console.log("LOGIN WITH DATA:", data);
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)})
                .then((response) => {if (response.statusCode>=400){reject(response.statusText);} else {return response.text()}})
                .then((responseText) => {
//                    console.log("SERVER DATA:",responseText);
                    const res = JSON.parse(responseText);
                    if (!res.sessionID){
                        reject({message: "No session param returned"});
                    } else {
                        resolve(res);
                    }
                })
                .catch((error) => {
                    console.log("LOGIN ERROR:", error);
                    reject(error);
                });
        });

    }
    logout(data){
        // data to send to server
        return new Promise((resolve, reject)=> {
            if (data && data.phoneNumber) {
                console.log("LOGOUT DATA:",RESET_URL, data);
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