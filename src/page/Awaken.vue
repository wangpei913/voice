<template>
    <div class="awaken-page">
        <!--动画部分start-->
        <transition enter-active-class="zoomIn" leave-active-class="zoomOut">
            <div class="down" v-if="awakenShow">
                <p v-if="awakenShow" style="width: 180px;float:left;text-align: center;line-height: 20px;" v-text="recordInfo"></p>
                <!-- <span class="close-btn" @click="closeRecord()">X</span> -->
                <div class="dot"></div>
                <div class="pulse" v-if="animate"></div>
                <div class="pulse1" v-if="animate"></div>
            </div>
        </transition>
        <!--动画部分end-->
    </div>
</template>
<script>
import AudioAPI from '../utls/AudioAPI.js';
import {toWords, voice} from '../api/demo.js';
import {pubSizeValue, averageValue} from '../utls/index';
export default {
    data () {
        return {
            awakenShow: false,
            recTimer: null,
            flag: false,
            Timer: null,
            awakeRecorder: '', // 唤醒录音实例
            soundRecoeder: '', // 唤醒以后的录音实例
            soundTimer: null,
            recordInfo: ''
        }
    },
    mounted () {
        this.startAwaken();
    },
    methods: {
        // 开始唤醒
        startAwaken () {
            let that = this;
            let recList = [];
            HZRecorder.get(function (rec) {
                that.awakeRecorder = rec;   
                that.awakeRecorder.start();
            })
            AudioAPI.start().then(analyser => {
                that.recTimer = setInterval(function () {
                    let a = AudioAPI.getVoiceSize(analyser);
                    if (recList.length === 20) {
                        let max = Math.max(...recList);
                        let min = Math.min(...recList);
                        let s = averageValue(recList);
                        if (pubSizeValue(max, min) < 4000) {
                            clearInterval(that.recTimer);
                            that.awakeRecorder.stop();
                            that.startAwaken();
                        } else if (a < s) {
                            that.executiveOrder('awaken');
                            clearInterval(that.recTimer);
                            that.awakeRecorder.stop();
                            that.startAwaken();
                        }
                    } else if (recList.length < 20) {
                        recList.push(a);
                    }
                }, 100);
            })
        },
        // 停止唤醒
        stopAwake () {
            clearInterval(this.recTimer);
            this.awakeRecorder.stop();
            this.awakeRecorder = '';
        },
        // 唤醒指令转换
        executiveOrder (state) {
            let that = this;
            if (state === 'awaken') {
                let fd = new FormData();
                fd.append("audioData", that.awakeRecorder.getBlob());
                toWords(fd).then(res => {
                    if (res.data.success === true) {
                        if (res.data.data.words.substr(0, res.data.data.words.length - 1).indexOf('你好') > -1) {
                            this.awakenShow = true;
                            this.stopAwake();
                            this.animate = true;
                            this.micRecord();
                        }
                    }
                }).catch(err => {
                    // console.log(err)
                })
            } else if (state === 'sound') {
                let fd = new FormData();
                fd.append("audioData", that.soundRecoeder.getBlob());
                toWords(fd).then(res => {
                    if (res.data.success === true) {
                        if (res.data.data.menu) {
                            window.sessionStorage.setItem('state', true);
                            that.awakenShow = false;
                            that.$router.push({
                                name: res.data.data.menu
                            })
                        }
                        that.animate = false;
                        that.flag = false;
                    } else {
                        let str = '识别失败，请点击中间麦克风按钮后再说一次';
                        that.animate = false;
                        that.recordInfo = str;
                    }
                }).catch(err => {
                    let str = '识别失败，请点击中间麦克风按钮后再说一次';
                    that.recordInfo = str;
                    console.log(err)
                })
            }
        },
        // 中间麦克风录音事件
        micRecord () {
            let that = this;
            let recList = [];
            that.recordInfo = '录音中...';
            HZRecorder.get(function (rec) {
                that.soundRecoeder = rec;   
                that.soundRecoeder.start();
            })
            AudioAPI.start().then(analyser => {
                that.soundTimer = setInterval(function () {
                    let a = AudioAPI.getVoiceSize(analyser);
                    if (recList.length === 20) {
                        let max = Math.max(...recList);
                        let min = Math.min(...recList);
                        let s = averageValue(recList);
                        if (pubSizeValue(max, min) < 2000) {
                            clearInterval(that.soundTimer);
                            that.soundRecoeder.stop();
                            that.animate = false;
                            that.recordInfo = '继续录音请点击中间麦克风';
                        } else if (a < s) {
                            that.flag = true;
                        } else if (a > s) {
                            that.flag = false;
                        }
                    } else if (recList.length < 20) {
                        recList.push(a);
                    }
                }, 100);
                that.restartState = true;
            })
        }
    },
    watch: {
        flag (val) {
            if (val === true) {
                this.Timer = setTimeout(() => {
                    clearInterval(this.soundTimer);
                    this.soundRecoeder.stop();
                    this.recordInfo = '发送中...';
                    this.animate = false;
                    this.executiveOrder('sound');
                }, 1000)
            } else {
                clearInterval(this.Timer);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.awaken-page{
    width: 100%;
    height: 100%;
    .down{
        width: 200px;
        height: 200px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .close-btn{
            display: block;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
        }
        .close-btn:hover{
            font-size: 24px;
        }
        .dot{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            margin: auto;
            text-align: center;
            line-height: 50px;
            background: url('../assets/img/mike.svg') no-repeat;
            background-size: 100% 100%;
        }
        .pulse {
            width: 150px;
            height: 150px;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            border: 2px solid #3399ff;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            z-index: 1;
            opacity: 0;
            -webkit-animation: warn 2s ease-out;
            -moz-animation: warn 2s ease-out;
            animation: warn 2s ease-out;
            -webkit-animation-iteration-count: infinite;
            -moz-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
        }
        .pulse1 {
            position: absolute;
            width: 150px;
            height: 150px;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            border: 2px solid #3399ff;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            z-index: 1;
            opacity: 0;
            -webkit-animation: warn1 2s ease-out;
            -moz-animation: warn1 2s ease-out;
            animation: warn1 2s ease-out;
            -webkit-animation-iteration-count: infinite;
            -moz-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
        }
    }
}
@keyframes warn {
    0% {
        transform: scale(0.3);
        -webkit-transform: scale(0.3);
        opacity: 0.0;
    }
    25% {
        transform: scale(0.3);
        -webkit-transform: scale(0.3);
        opacity: 0.1;
    }
    50% {
        transform: scale(0.5);
        -webkit-transform: scale(0.5);
        opacity: 0.3;
    }
    75% {
        transform: scale(0.8);
        -webkit-transform: scale(0.8);
        opacity: 0.5;
    }
    100% {
        transform: scale(1);
        -webkit-transform: scale(1);
        opacity: 0.0;
    }
}
@keyframes warn1 {
    0% {
        transform: scale(0.3);
        -webkit-transform: scale(0.3);
        opacity: 0.0;
    }
    25% {
        transform: scale(0.3);
        -webkit-transform: scale(0.3);
        opacity: 0.1;
    }
    50% {
        transform: scale(0.3);
        -webkit-transform: scale(0.3);
        opacity: 0.3;
    }
    75% {
        transform: scale(0.5);
        -webkit-transform: scale(0.5);
        opacity: 0.5;
    }
    100% {
        transform: scale(0.8);
        -webkit-transform: scale(0.8);
        opacity: 0.0;
    }
}
</style>
