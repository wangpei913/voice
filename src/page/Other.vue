<template>
    <div class="other-page">
        <p style="font-size: 24px;">参保人口</p>
        <!-- <input v-model.number="number" type="number" step="20"> -->
        <!-- <p>{{ animatedNumber }}</p>
        <h1>{{city}}</h1>
        <el-button>
            <router-link to="/react">获取城市名</router-link>
        </el-button>
        <el-button @click="clickMe()">点击我</el-button>
        {{minutes}}
        <div style="margin: 20px 0">
            <audio controls autoplay></audio><br>
            <el-button size="small" type="primary" @click="startRecording()">开始录音</el-button>
            <el-button size="small" type="danger" :disabled="stopFlag" @click="stopRecord()">停止录音</el-button>
            <el-button size="small" type="success" @click="playRecord()">播放录音</el-button>
            <el-button size="small" type="info" :disabled="disableBtn" @click="obtainRecord()">获取录音</el-button><br>
            <ul>
                <li v-for="(item, index) in voiceList" :key="index">
                    <span @click="playSrc(item)">{{item}}</span>
                </li>
            </ul>
        </div> -->
        <!-- <el-input style="width: 20%;" v-model="input" placeholder="请输入内容"></el-input> -->
        <!-- <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="input">
        </el-input>
        <el-button size="small" type="primary" @click="playVoice()">确定</el-button><br>
        <audio controls autoplay ref="audio"></audio>
        <el-row>
            <el-col :span="8">
                <div id="preloader_1">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </el-col>
            <el-col :span="5">2</el-col>
            <el-col :span="8">3</el-col>
        </el-row> -->
    </div>
</template>
<script>
import { TimelineLite } from "gsap/TweenMax";
import * as Mutations from '../vuex/mutations'
import Cookies from 'js-cookie';
import {voice} from '../api/demo.js';
export default {
    data () {
        return {
            number: 1000,
            tweenedNumber: 0,
            flag: false,
            src: '',
            defaultImg: 'this.src=null;this.src="' + require('../assets/img/a.jpg') + '"',
            minutes: '',
            hasLogin: 'Ok',
            recorder: null,
            voiceList: [],
            disableBtn: true,
            stopFlag: true,
            input: '',
            src: ''
        }
    },
    computed: {
        animatedNumber: function() {
            return this.tweenedNumber.toFixed(0);
        },
        city () {
            return this.$store.getters.getCityFn;
        }
    },
    watch: {
        minutes (val) {
            if (val > 15) {
                this.$store.dispatch('setOut')
                this.$router.push({
                    name: 'login'
                })
            }
        }
    },
    mounted () {
        TweenLite.to(this.$data, 5, { tweenedNumber: this.number });
        this.computeMin();
        this.setLoginStatus();
    },
    methods: {
        playVoice () {
            let w = {
                words: this.input
            }
            voice(w).then(res => {
                // this.$refs.audio.src = window.URL.createObjectURL(new Blob([res.data], {type: "audio/wav"}));
                this.$refs.audio.src = res.data;
            }).catch(err => {
                console.log(err)
            })
        },
        startRecording () {
            let _that = this;
            HZRecorder.get(function (rec) {
                _that.recorder = rec;
                _that.recorder.start();
                _that.stopFlag = false;
            })
        },
        stopRecord () {
            let _that = this;
            _that.recorder.stop();
            _that.disableBtn = false;
            let url = 'http://172.20.10.6:8080/baidu/toWords'
            _that.recorder.upload(url)
        },
        playRecord () {
            let _that = this;
            let audio = document.querySelector('audio');
            try {
                _that.recorder.play(audio);
            } catch (error) {
                this.$message({
                    message: '暂无声频！',
                    type: 'warning'
                });
            }
        },
        obtainRecord () {
            let _that = this;
            let url = _that.recorder.getSplitBlob();
            _that.voiceList.push(url);
        },
        playSrc (item) {
            let audio = document.querySelector('audio');
            audio.src = item;
        },
        clickMe () {
            let d = new Date();
            let year = d.getFullYear();
            let month = this.change(d.getMonth() + 1);
            let day = this.change(d.getDate());
            let hour = this.change(d.getHours());
            let minute = this.change(d.getMinutes());
            let second = this.change(d.getSeconds());
            let time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            sessionStorage.setItem('date', time)
        },
        change (t) {
            if (t < 10) {
                return '0' + t;
            } else {
                return t;
            }
        },
        GetDateDiff (startTime, endTime, diffType) {
            //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
            startTime = startTime.replace(/\-/g, "/");
            endTime = endTime.replace(/\-/g, "/");
            //将计算间隔类性字符转换为小写
            diffType = diffType.toLowerCase();
            var sTime = new Date(startTime); //开始时间
            var eTime = new Date(endTime); //结束时间
            //作为除数的数字
            var timeType = 1;
            switch (diffType) {
                case "second":
                    timeType =1000;
                    break;
                case "minute":
                    timeType =1000*60;
                    break;
                case "hour":
                    timeType =1000*3600;
                    break;
                case "day":
                    timeType =1000*3600*24;
                    break;
                default:
                    break;
            }
            return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
        },
        computeMin () {
            if (sessionStorage.getItem('date')) {
                let d = new Date();
                let year = d.getFullYear();
                let month = this.change(d.getMonth() + 1);
                let day = this.change(d.getDate());
                let hour = this.change(d.getHours());
                let minute = this.change(d.getMinutes());
                let second = this.change(d.getSeconds());
                let newTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                let oldTime = sessionStorage.getItem('date');
                let timeType = 1000 * 60;
                this.minutes = this.GetDateDiff(oldTime, newTime, 'minute');
            }
        },
        setLoginStatus () {
            var maxAge = new Date(new Date().getTime() + 1 * 60 * 1000)
            Cookies.set(this.hasLogin, 'true', {
                expires: maxAge
            })
            // Cookies.remove(this.hasLogin)
            // this.$router.push({
            //     name: 'login'
            // })
        }
    }
}
</script>
<style lang="less">
.other-page{
    width: 100%;
    height: 100%;
    position: relative;
    .el-row{
        .el-col{
            #preloader_1{
                position: relative;
                height: 30px;
                line-height: 30px;
                text-align: center;
            }
            #preloader_1 span{
                display:block;
                width: 9px;
                height: 5px;
                background:#9b59b6;
                position: absolute;
                bottom: 15px;
                -webkit-animation: preloader_1 2s infinite ease-in-out;
                -moz-animation: preloader_1 2s infinite ease-in-out;
                -ms-animation: preloader_1 2s infinite ease-in-out;
                animation: preloader_1 2s infinite ease-in-out;
            }

            #preloader_1 span:nth-child(2){
                left:11px;
                -webkit-animation-delay: .2s;
                -moz-animation-delay: .2s;
                -ms-animation-delay: .2s;
                -o-animation-delay: .2s;
                animation-delay: .2s;
            }

            #preloader_1 span:nth-child(3){
                left:22px;
                -webkit-animation-delay: .4s;
                -moz-animation-delay: .4s;
                -ms-animation-delay: .4s;
                -o-animation-delay: .4s;
                animation-delay: .4s;
            }

            #preloader_1 span:nth-child(4){
                left:33px;
                -webkit-animation-delay: .6s;
                -moz-animation-delay: .6s;
                -ms-animation-delay: .6s;
                -o-animation-delay: .6s;
                animation-delay: .6s;
            }

            #preloader_1 span:nth-child(5){
                left:44px;
                -webkit-animation-delay: .8s;
                -moz-animation-delay: .8s;
                -ms-animation-delay: .8s;
                -o-animation-delay: .8s;
                animation-delay: .8s;
            }
            #preloader_1 span:nth-child(6){
                left:55px;
                -webkit-animation-delay: 1s;
                -moz-animation-delay: 1s;
                -ms-animation-delay: 1s;
                -o-animation-delay: 1s;
                animation-delay: 1s;
            }
            
            #preloader_1 span:nth-child(7){
                left:66px;
                -webkit-animation-delay: 1.2s;
                -moz-animation-delay: 1.2s;
                -ms-animation-delay: 1.2s;
                -o-animation-delay: 1.2s;
                animation-delay: 1.2s;
            }
            #preloader_1 span:nth-child(8){
                left:77px;
                -webkit-animation-delay: 1.4s;
                -moz-animation-delay: 1.4s;
                -ms-animation-delay: 1.4s;
                -o-animation-delay: 1.4s;
                animation-delay: 1.4s;
            }
            #preloader_1 span:nth-child(9){
                left:88px;
                -webkit-animation-delay: 1.6s;
                -moz-animation-delay: 1.6s;
                -ms-animation-delay: 1.6s;
                -o-animation-delay: 1.6s;
                animation-delay: 1.6s;
            }
            #preloader_1 span:nth-child(10){
                left:99px;
                -webkit-animation-delay: 1.8s;
                -moz-animation-delay: 1.8s;
                -ms-animation-delay: 1.8s;
                -o-animation-delay: 1.8s;
                animation-delay: 1.8s;
            }
            #preloader_1 span:nth-child(11){
                left:110px;
                -webkit-animation-delay: 2s;
                -moz-animation-delay: 2s;
                -ms-animation-delay: 2s;
                -o-animation-delay: 2s;
                animation-delay: 2s;
            }
            #preloader_1 span:nth-child(12){
                left:121px;
                -webkit-animation-delay: 2.2s;
                -moz-animation-delay: 2.2s;
                -ms-animation-delay: 2.2s;
                -o-animation-delay: 2.2s;
                animation-delay: 2.2s;
            }
            #preloader_1 span:nth-child(13){
                left:132px;
                -webkit-animation-delay: 2.4s;
                -moz-animation-delay: 2.4s;
                -ms-animation-delay: 2.4s;
                -o-animation-delay: 2.4s;
                animation-delay: 2.4s;
            }
            #preloader_1 span:nth-child(14){
                left:143px;
                -webkit-animation-delay: 2.6s;
                -moz-animation-delay: 2.6s;
                -ms-animation-delay: 2.6s;
                -o-animation-delay: 2.6s;
                animation-delay: 2.6s;
            }
            #preloader_1 span:nth-child(15){
                left:154px;
                -webkit-animation-delay: 2.8s;
                -moz-animation-delay: 2.8s;
                -ms-animation-delay: 2.8s;
                -o-animation-delay: 2.8s;
                animation-delay: 2.8s;
            }
            #preloader_1 span:nth-child(16){
                left:165px;
                -webkit-animation-delay: 3s;
                -moz-animation-delay: 3s;
                -ms-animation-delay: 3s;
                -o-animation-delay: 3s;
                animation-delay: 3s;
            }
            #preloader_1 span:nth-child(17){
                left:176px;
                -webkit-animation-delay: 3.2s;
                -moz-animation-delay: 3.2s;
                -ms-animation-delay: 3.2s;
                -o-animation-delay: 3.2s;
                animation-delay: 3.2s;
            }
            #preloader_1 span:nth-child(18){
                left:187px;
                -webkit-animation-delay: 3.4s;
                -moz-animation-delay: 3.4s;
                -ms-animation-delay: 3.4s;
                -o-animation-delay: 3.4s;
                animation-delay: 3.4s;
            }
            #preloader_1 span:nth-child(19){
                left:198px;
                -webkit-animation-delay: 3.6s;
                -moz-animation-delay: 3.6s;
                -ms-animation-delay: 3.6s;
                -o-animation-delay: 3.6s;
                animation-delay: 3.6s;
            }
            #preloader_1 span:nth-child(20){
                left:209px;
                -webkit-animation-delay: 3.8s;
                -moz-animation-delay: 3.8s;
                -ms-animation-delay: 3.8s;
                -o-animation-delay: 3.8s;
                animation-delay: 3.8s;
            }
            @-webkit-keyframes preloader_1 {
                0% {height:5px;-webkit-transform:translateY(0px);background:#9b59b6;}
                25% {height:30px;-webkit-transform:translateY(15px);background:#3498db;}
                50% {height:5px;-webkit-transform:translateY(0px);background:#9b59b6;}
                100% {height:5px;-webkit-transform:translateY(0px);background:#9b59b6;}
            }

            @-moz-keyframes preloader_1 {
                0% {height:5px;-moz-transform:translateY(0px);background:#9b59b6;}
                25% {height:30px;-moz-transform:translateY(15px);background:#3498db;}
                50% {height:5px;-moz-transform:translateY(0px);background:#9b59b6;}
                100% {height:5px;-moz-transform:translateY(0px);background:#9b59b6;}
            }

            @-ms-keyframes preloader_1 {
                0% {height:5px;-ms-transform:translateY(0px);background:#9b59b6;}
                25% {height:30px;-ms-transform:translateY(15px);background:#3498db;}
                50% {height:5px;-ms-transform:translateY(0px);background:#9b59b6;}
                100% {height:5px;-ms-transform:translateY(0px);background:#9b59b6;}
            }

            @keyframes preloader_1{
                0%{height: 5px;transform:translateY(0px);background:#9b59b6;}
                25%{height: 30px;transform:translateY(15px);background:#3498db;}
                50%{height: 5px;transform:translateY(0px);background:#9b59b6;}
                100%{height: 5px;transform:translateY(0px);background:#9b59b6;}
            }
        }
    }
}
</style>
