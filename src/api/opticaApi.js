

import axios from 'axios'

const opticaApi = axios.create({
    baseURL: 'https://optica-latina-default-rtdb.firebaseio.com'
});

export default opticaApi