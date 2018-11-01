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
// 百度文字转声音
export function voice (word) {
    return axios.post('/baidu/toVoice', {
        ...word
    });
}
// 百度声音转文字
export function toWords (audioData) {
    return axios.post('/baidu/toWords', audioData); 
}
// 科大讯飞文字转声音
export function xfToWords (audioData) {
    return axios.post('/xf/toWords', audioData)
}
// 科大讯飞声音转文字
export function xfToVoice (audioData) {
    return axios.post('/xf/toVoice', audioData)
}