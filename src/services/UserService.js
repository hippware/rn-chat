const URL =  'http://jsonplaceholder.typicode.com/posts';
//const URL = 'http://registration-test.dev.tinyrobot.com';
class UserService {
    constructor(){
        this.delegate = null;
    }

    // do login with given dictionary
    login(data){
        console.log("LOGIN WITH DATA:", data);
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)})
            .then((response) => response.text())
            .then((responseText) => {
                const res = JSON.parse(responseText);
                console.log("SERVER DATA:",res);
                return this.delegate && this.delegate.onLoginSuccess({...res, session:"www2"});
                if (!res.session){
                    this.delegate && this.delegate.onLoginError({message: "No session param returned"});
                } else {
                    return this.delegate && this.delegate.onLoginSuccess(res);
                }
            })
            .catch((error) => {
                this.delegate && this.delegate.onLoginError(error);
            });

    }

    // do login with given dictionary
    register(data){
        if (!data.session){
            return this.delegate.onRegisterError({message: "No session is defined"});
        }
        console.log("REGISTER WITH DATA:", data);
        // emulate server request and response
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)})
            .then((response) => response.text())
            .then((responseText) => {
                const res = JSON.parse(responseText);
                console.log("SERVER DATA:",res);
                return this.delegate && this.delegate.onRegisterSuccess({session:"www", ...res});
                if (!res.session){
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