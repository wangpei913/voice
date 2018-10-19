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
