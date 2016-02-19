
class UserService {
    constructor(){
        this.delegate = null;
    }

    // do login with given dictionary
    login(data){
        console.log("LOGIN WITH DATA:", data);

        // emulate server request and response
        setTimeout(()=>{
            if (this.delegate && this.delegate.onLoginSuccess){
                this.delegate.onLoginSuccess(data);
            }
        }, 500);
    }

    // do login with given dictionary
    register({username, firstName, lastName, photo}){
        // emulate server request and response
        setTimeout(()=>{
            if (username=='error'){
                if (this.delegate && this.delegate.onRegisterError){
                    this.delegate.onRegisterError("Server error!");
                }
            } else {
                if (this.delegate && this.delegate.onRegisterSuccess){
                    this.delegate.onRegisterSuccess({id: 12345});
                }
            }
        }, 500);
    }
}

export default new UserService();