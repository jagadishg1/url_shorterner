import axios from 'axios';

axios.interceptors.request.use(request => {
    request.headers.common.Authorization = `Bearer <your bit.ly api key goes here>`;
    return request;
});

export default axios;