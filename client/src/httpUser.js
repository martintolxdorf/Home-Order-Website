import axios from 'axios';
import jwtDecode from 'jwt-decode'

const httpUser = axios.create();

httpUser.getToken = function() {
    return localStorage.getItem('token');
};

httpUser.setToken = function(token) {
    localStorage.setItem('token', token);
    return token;
};

httpUser.getCurrentUser = function() {
    const token = this.getToken();
    return (token ? jwtDecode(token) : null)
};

httpUser.logIn = async function(credentials) {
    try {
        const response = await axios.post( '/api/users/authenticate', credentials );

        const token = response.data.token;
        if(token) {
            this.defaults.headers.common.token = this.setToken(token);
            return jwtDecode(token);
        } else {
            return false;
        }
    } catch(err) {
        console.log(err);
        return false;
    }
};

httpUser.signUp = async function(userInfo) {
    const response = await axios.post('/api/users', userInfo);

    const token = response.data.token;
    if(token) {
        this.defaults.headers.common.token = this.setToken(token);
        return jwtDecode(token);
    } else {
        return false;
    }
};

httpUser.logOut = function() {
    localStorage.removeItem('token');
    delete this.defaults.headers.common.token;
    return true;
};

httpUser.returnUserInfo = async function(userInfo) {
    var result = await axios.get('/api/users/' + userInfo._id) 
    return result.data.user;
};

httpUser.updateUser = async function(userInfo) {
    const response = await axios.post( '/api/users/updateUser', userInfo);
    return true;
};

// httpUser.updateUser = async function(userInfo) {
//     const response = await axios.post( '/api/users/' + userInfo._id);
//     return true;
// };

httpUser.defaults.headers.common.token = httpUser.getToken();
export default httpUser;