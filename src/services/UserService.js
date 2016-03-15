//const URL =  'http://jsonplaceholder.typicode.com/posts';
const URL = 'http://staging.dev.tinyrobot.com:1096/wocky/v1/user';
class UserService {
    constructor(){
        this.delegate = null;
    }

    // do login with given dictionary
    login(data){
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
                    this.delegate && this.delegate.onLoginError({message: "No session param returned"});
                } else {
                    return this.delegate && this.delegate.onLoginSuccess(res);
                }
            })
            .catch((error) => {
                console.log("ERROR", error);
                this.delegate && this.delegate.onLoginError(error);
            });

    }

    // do login with given dictionary
    register(data){
        if (!data.sessionID){
            return this.delegate.onRegisterError({message: "No session is defined"});
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
            body: JSON.stringify(data)})
            .then((response) => {console.log("RESPONSE:", response);return response.text()})
            .then((responseText) => {
                const res = JSON.parse(responseText);
                console.log("SERVER DATA:",res);
                if (!res.sessionID){
                    return this.delegate.onRegisterError({message: "No session is defined"});
                } else {
                    return this.delegate && this.delegate.onRegisterSuccess({...data, ...res});
                }
            })
            .catch((error) => {
                this.delegate && this.delegate.onRegisterError(error);
            });
    }
}

export default new UserService();