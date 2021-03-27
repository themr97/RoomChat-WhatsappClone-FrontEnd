import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://teamchat1.herokuapp.com/',
});

export default instance;
