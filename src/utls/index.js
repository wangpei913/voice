import {voice} from '../api/demo';
export const mixins = {
    methods: {
        publicVoice (words) {
            let w = {
                words: words
            }
            voice(w).then(res => {
                this.pubVoiceSrc = res.data;
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
/**
 * 公共比较声音的最大、小值
 */
export function pubSizeValue (a, b) {
    return parseInt(a) - parseInt(b);
}
/**
 * 求平均值
 */
export function averageValue (arr) {
    if (arr.length === 0 || typeof arr === 'undefined') {
        return
    }
    let result = [];
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    for (let j = 0; j < arr.length; j++) {
        if (arr[j] !== max && arr[j] !== min) {
            result.push(arr[j]);
        }
    }
    let avg = null;
    for (let i = 0; i < result.length; i++) {
        avg += result[i];
    }
    return avg / result.length;
}