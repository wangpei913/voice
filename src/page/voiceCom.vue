<template>
    <div class="new-voice" v-if="isGo">
        <p style="width: 180px;float:left;text-align: center;line-height: 20px;" v-text="voiceComInfo"></p>
        <div class="dot">
            <!-- <canvas class="mic-canvas" width="100%" height="100%"></canvas> -->
            1
        </div>
        <div class="pulse" v-if="voiceComAnimate"></div>
        <div class="pulse1" v-if="voiceComAnimate"></div>
    </div>
</template>
<script>
import AudioAPI from '../utls/AudioAPI.js';
import {toWords, voice} from '../api/demo.js';
import {pubSizeValue, averageValue} from '../utls/index';
export default {
    data () {
        return {
            voiceComAnimate: true, // 录音动画
            voiceComInfo: '', // 录音状态
            voiceComTimer: null, // 录音定时器
            voiceComRecoeder: '', // 组件声音实例
            isStopFlag: false, // 判断是不是说完的开关
            sendTimer: null, // 发送请求的定时器
            isGo: true
        }
    },
    mounted () {
        this.recordStart();
    },
    methods: {
        // 开始录音
        recordStart () {
            let that = this;
            let recList = [];
            that.voiceComInfo = '录音中...';
            HZRecorder.get(function (rec) {
                that.voiceComRecoeder = rec;
                that.voiceComRecoeder.start();
            })
            AudioAPI.start().then(analyser => {
                that.voiceComTimer = setInterval(function () {
                    let a = AudioAPI.getVoiceSize(analyser);
                    console.log(a, 'a222')
                    if (recList.length === 20) {
                        let max = Math.max(...recList);
                        let min = Math.min(...recList);
                        let s = averageValue(recList);
                        if (pubSizeValue(max, min) < 2000) {
                            clearInterval(that.voiceComTimer);
                            that.voiceComRecoeder.stop();
                            that.voiceComAnimate = false;
                            that.voiceComInfo = '重新唤醒继续使用';
                            that.$emit('openAwaken');
                        } else if (a < s) {
                            that.isStopFlag = true;
                        } else if (a > s) {
                            that.isStopFlag = false;
                        }
                    } else if (recList.length < 20) {
                        recList.push(a);
                    }
                }, 100);
            })
        },
        // 发送请求
        sendData () {
            let that = this;
            let fd = new FormData();
            fd.append("audioData", that.voiceComRecoeder.getBlob());
            toWords(fd).then(res => {
                if (res.data.success === true) {
                    if (res.data.data.menu) {
                        window.sessionStorage.setItem('state', true);
                        that.isGo = false;
                        that.voiceComAnimate = false;
                        that.isStopFlag = false;
                        that.$router.push({
                            name: res.data.data.menu
                        })
                    } else {
                        let str = '重新唤醒继续使用';
                        that.voiceComAnimate = false;
                        that.voiceComInfo = str;
                        that.$emit('openAwaken');
                    }
                } else {
                    let str = '重新唤醒继续使用';
                    that.voiceComAnimate = false;
                    that.voiceComInfo = str;
                    that.$emit('openAwaken');
                }
            }).catch(err => {
                let str = '重新唤醒继续使用';
                that.voiceComInfo = str;
                that.$emit('openAwaken');
                console.log(err)
            })
        }
    },
    watch: {
        isStopFlag (val) {
            if (val === true) {
                this.sendTimer = setTimeout(() => {
                    clearInterval(this.voiceComTimer);
                    this.voiceComRecoeder.stop();
                    this.voiceComInfo = '发送中...';
                    this.voiceComAnimate = false;
                    this.sendData();
                }, 1000)
            } else {
                clearInterval(this.sendTimer);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.new-voice{
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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
