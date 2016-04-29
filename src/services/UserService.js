//const URL =  'http://jsonplaceholder.typicode.com/posts';
import {HOST, DEBUG} from '../globals';
const URL = 'http://'+HOST+':1096/wocky/v1/user';
const RESET_URL = 'http://'+HOST+':1096/wocky/v1/db/delete';

class UserService {

    // do login with given dictionary
    login(d){
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
        const data = fromCamelCase(d || {});
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


