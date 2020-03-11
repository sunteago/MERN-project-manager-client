import axiosClient from './axios';

const tokenAuth = token => {
    if (token) { //si hay un token, pasarlo como header
        axiosClient.defaults.headers.common['x-auth-token'] = token;
    } else {//sino, borrarlo
        delete axiosClient.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;