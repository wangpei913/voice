<template>
    <div class="awaken-two">
        <!--动画部分start-->
        <transition enter-active-class="zoomIn" leave-active-class="zoomOut">
            <div class="down" v-if="micShowFlag">
                <p v-if="micShowFlag" style="width: 180px;float:left;text-align: center;line-height: 20px;" v-text="recordInfo"></p>
                <div class="dot"></div>
                <div class="pulse" v-if="micAnimateShowFlag"></div>
                <div class="pulse1" v-if="micAnimateShowFlag"></div>
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
            // mic显示开关
            micShowFlag: false,
            // mic动画显示开关
            micAnimateShowFlag: false,
            // 检测说话是否结束的开关
            checkSpeakStopFlag: false,
            // 唤醒录音时的定时器
            recordTimer: null,
            // 发送api定时器
            apiTimer: null,
            // 录音定时器
            soundTimer: null,
            recordInfo: '', // 录音状态
            awakeRecorder: '', // 唤醒录音实例
            soundRecoeder: '' // 唤醒以后的录音实例
        };
    },
    mounted () {
        this.awakenStart();
    },
    methods: {
        // 开始唤醒
        // 分别一下是直接打开唤醒功能还是录音失败了唤醒重新录音
        // awaken: 唤醒语音功能的，record: 录音失败后再录音的
        awakenStart () {
            this.awakenVoiceFn();
        },
        // 唤醒语音功能
        awakenVoiceFn () {
            let that = this;
            let recList = [];
            HZRecorder.get(function (rec) {
                that.awakeRecorder = rec;   
                that.awakeRecorder.start();
            })
            AudioAPI.start().then(analyser => {
                that.recordTimer = setInterval(function () {
                    let a = AudioAPI.getVoiceSize(analyser);
                    if (recList.length === 20) {
                        let max = Math.max(...recList);
                        let min = Math.min(...recList);
                        let s = averageValue(recList);
                        if (pubSizeValue(max, min) < 4000) {
                            clearInterval(that.recordTimer);
                            that.awakeRecorder.stop();
                            that.awakenVoiceFn();
                        } else if (a < s) {
                            that.resolveVoice('awaken');
                            clearInterval(that.recordTimer);
                            that.awakeRecorder.stop();
                            that.awakenVoiceFn();
                        }
                    } else if (recList.length < 20) {
                        recList.push(a);
                    }
                }, 100);
            })
        },
        // 停止唤醒
        stopAwake () {
            clearInterval(this.recordTimer);
            this.awakeRecorder.stop();
            this.awakeRecorder = '';
        },
        // 解析语音
        resolveVoice (type) {
            switch (type) {
                case 'awaken':
                    this.openAwaken();
                    break;
                case 'record':
                    this.sendRecord();
                    break;
                default:
                    break;
            }
        },
        // 发送唤醒指令
        openAwaken () {
            let that = this;
            let fd = new FormData();
            fd.append("audioData", that.awakeRecorder.getBlob());
            toWords(fd).then(res => {
                if (res.data.success === true) {
                    if (res.data.data.words.substr(0, res.data.data.words.length - 1).indexOf('你好') > -1) {
                        this.micShowFlag = true;
                        this.micAnimateShowFlag = true;
                        this.stopAwake();
                        this.acceptRecord();
                    }
                }
            }).catch(err => {
                // console.log(err)
            })
        },
        // 发送功能指令
        sendRecord () {
            let that = this;
            let fd = new FormData();
            fd.append("audioData", that.soundRecoeder.getBlob());
            toWords(fd).then(res => {
                if (res.data.success === true) {
                    if (res.data.data.menu) {
                        window.sessionStorage.setItem('state', true);
                        that.micShowFlag = false;
                        that.$router.push({
                            name: res.data.data.menu
                        })
                    } else {
                        that.awakenStart();
                        that.micShowFlag = true;
                        that.recordInfo = '可重新唤醒,继续使用'
                    }
                    that.checkSpeakStopFlag = false;
                } else {
                    let str = '可重新唤醒,继续使用';
                    that.micAnimateShowFlag = false;
                    that.recordInfo = str;
                    that.awakenStart();
                    that.micShowFlag = true;
                }
            }).catch(err => {
                let str = '可重新唤醒,继续使用';
                that.recordInfo = str;
                that.awakenStart();
                that.micShowFlag = true;
                console.log(err)
            })
        },
        // 接受指令，做出动作
        acceptRecord () {
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
                            that.micAnimateShowFlag = false;
                            that.recordInfo = '可重新唤醒,继续使用';
                            that.awakenStart();
                        } else if (a < s) {
                            that.checkSpeakStopFlag = true;
                        } else if (a > s) {
                            that.checkSpeakStopFlag = false;
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
        // 监听说话是不是结束了
        checkSpeakStopFlag (val) {
            if (val === true) {
                this.apiTimer = setTimeout(() => {
                    clearInterval(this.soundTimer);
                    this.soundRecoeder.stop();
                    this.recordInfo = '发送中...';
                    this.micAnimateShowFlag = false;
                    this.resolveVoice('record');
                }, 1000)
            } else {
                clearInterval(this.apiTimer);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.awaken-two{
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
