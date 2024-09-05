import axios from "axios";
const API_URL = 'https://amader-school.up.railway.app/accounts/';

export const register = async (username, email, password1, password2) => {
    return await axios.post(`${API_URL}register/`, {
        username,
        email,
        password1,
        password2
    });
};

export const login = async (username, password) => {
    return await axios.post(`${API_URL}login/`, {
        username,
        password
    });
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const setUserId = (user_id) => { // Fixed the parameter name here
    localStorage.setItem('user_id', user_id);
};

export const getUserId = () => {
    return localStorage.getItem('user_id');
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id'); // Optionally remove user_id as well
};
