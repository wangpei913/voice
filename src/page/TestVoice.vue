<template>
    <div class="test-voice">
        <ul class="test-voice-header">
            <li>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </li>
            <li>
                <el-button type="primary" size="small" plain @click="testBaidu()">百度测试</el-button>
                <el-button type="primary" size="small" plain @click="testXunfei()">讯飞测试</el-button>
            </li>
        </ul>
        <audio class="audio-parts" controlsList="nodownload" :src="testSrc" controls autoplay ref="audio" width="100%"></audio>
    </div>
</template>
<script>
import {xfToVoice, voice} from '../api/demo.js';
export default {
    data () {
        return {
            input: '',
            testSrc: ''
        }
    },
    mounted () {
        let arr = [1, 2, 3, 3, 2, 1, true, true, {}, {}, undefined, undefined, null, null];
        let res = this.getArrayNoRepeated(arr);
        console.log(res, 'res');
        console.log((386485473.88).toLocaleString('en-US'))
    },
    methods: {
        testBaidu () {
            let w = {
                words: this.input
            }
            voice(w).then(res => {
                this.testSrc = res.data;
            }).catch(err => {
                console.log(err);
            })
        },
        testXunfei () {
            let w = {
                words: this.input
            }
            xfToVoice(w).then(res => {
                this.testSrc = res.data;
            }).catch(err => {
                console.log(err);
            })
        },
        getArrayNoRepeated (arr) {
            // if (utils.checkObjTypeIsInvalid(arr, 'Array')) return arr;
            let res = [];
            let json = {};
            for (let i = 0; i < arr.length; i++) {
                if (!json[arr[i]]) {
                    res.push(arr[i]);
                    json[arr[i]] = 1;
                }
            }
            return res;
        }

    }
}
</script>
<style lang="less" scoped>
.test-voice{
    width: 100%;
    height: 100%;
    position: relative;
    .test-voice-header{
        width: 100%;
        height: 50px;
        line-height: 50px;
        li{
            float: left;
            &:nth-child(1){
                width: 30%;
                height: 100%;
                .el-input{
                    width: 100%;
                }
            }
            &:nth-child(2){
                padding-left: 10px;
            }
        }
    }
}
</style>
