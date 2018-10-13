import axios from '../utls/http';
import {cityMap} from '../../static/map 2/citymap';
export function demo () {
    return axios.get('http://localhost:3000/people');
}
export function city (id) {
    return axios.get('/static/map 2/province/' + id + '.json');
}
export function county (n) {
    return axios.get('/static/map 2/city/' + cityMap[n] + '.json');
}
export function voice (word) {
    return axios.post('/api/baidu/toVoice', {
        ...word
    });
}
export function toWords (audioData) {
    return axios.post('/api/baidu/toWords', audioData); 
}