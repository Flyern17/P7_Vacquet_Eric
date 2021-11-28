import axios from "axios"

const http = axios.create({
    baseURL: 'http://localhost:3000/api'
})
  
  http.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token')
    config.headers.authorization = token? 'bearer ' + token:'Notvalid';
    return config
})

export default http;