import axios from 'axios';
import * as projectData from '../src/creds';

const instance = axios.create({
    baseURL: projectData.fireBaseUrl
});

export default instance