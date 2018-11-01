<template>
    <div class="sound-record-com">
        <p class="close-btn" @click="closeRecord">X</p>
        <div class="mic-box">
            <div class="frist-mic" @click="recondAgain && clickMic()">
                <div class="line-div" v-if="micAnimateFlag">
                    <span class="line1"></span>
                </div> 
            </div>
            <span class="frist-circle" v-if="micAnimateFlag"></span>
            <span class="second-circle" v-if="micAnimateFlag"></span>
        </div>
        <p class="stop-btn">
            <el-button @click="stopRecord()" type="primary" size="mini">停止录音</el-button>
        </p>
    </div>
</template>
<script>
import AudioAPI from '../utls/AudioAPI.js';
import {toWords} from '../api/demo.js';
import { mapMutations } from 'vuex';
export default {
    data () {
        return {
            // 麦克风声波动画控制标志
            micAnimateFlag: false,
            // 声音载体
            recorder: '',
            // 定时器
            timer: null,
            // 记录次数
            times: 0,
            // mic状态描述
            micStateInfo: '',
            // 存放说过的跳转信息
            routeList: [],
            // 录音失败，从新录音的标志
            recondAgain: false,
            state: false
        }
    },
    mounted () {
        // if (this.$store.state.micBoxDisplay === true) {
        //     this.fristLoading();
        // }
        if (this.recorder === '') {
            this.fristLoading();
        }
    },
    created () {},
    methods: {
        ...mapMutations({
            setMicRecordInfo: 'setMicRecordInfo',
            setIsSuccess: 'setIsSuccess',
            setRouteList: 'setRouteList',
            setMicBoxDisplay: 'setMicBoxDisplay',
            setIsClick: 'setIsClick',
            setRecordModelValue: 'setRecordModelValue'
        }),
        childrenFn () {
            alert('1234567890')
        },
        // 页面第一次加载时候触发的事件
        fristLoading () {
            this.micAnimateFlag = true;
            this.micStateInfo = '请说话';
            let _that = this;
            _that.times = 0;
            _that.setIsClick(false);
            HZRecorder.get(function (rec) {
                _that.recorder = rec;   
                _that.recorder.start();
            })
            // AudioAPI.start().then(analyser => {
            //     _that.timer = setInterval(function () {
            //         let a = AudioAPI.getVoiceSize(analyser);
            //         if (a < 4000) {
            //             _that.times++;
            //         }
            //     }, 100)
            // })
        },
        // 关闭页面
        closeRecord () {
            this.$store.dispatch('commitMicBoxDisplay', false);
            this.micAnimateFlag = false;
            let _that = this;
            _that.recorder.stop();
            _that.recondAgain = true;
        },
        // 获取日期时间
        getNowFormatDate () {
            let date = new Date();
            let seperator1 = '-';
            let seperator2 = ':';
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = '0' + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate;
            }
            let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + ' ' + (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + seperator2 + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())
                    + seperator2 + (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds());
            return currentdate;
        },
        // 录音失败，重新录音
        clickMic () {
            let _that = this;
            _that.micAnimateFlag = true;
            _that.micStateInfo = '请说话';
            _that.fristLoading();
        },
        stopRecord () {
            let _that = this;
            _that.recorder.stop();
            _that.micAnimateFlag = false;
            _that.setIsClick(true);
            let fd = new FormData();
            fd.append("audioData", _that.recorder.getBlob());
            toWords(fd).then(res => {
                if (res.data.success === true) {
                    if (res.data.data.words && !res.data.data.menu) {
                        _that.micStateInfo = res.data.data.words;
                        _that.times = 0;
                        _that.recondAgain = true;
                        _that.setIsSuccess(false);
                        _that.setRecordModelValue(res.data.data.words.substr(0, res.data.data.words.length - 1));
                    } else if (res.data.data.menu) {
                        _that.micStateInfo = res.data.data.menu;
                        _that.routeList.push({
                            key: _that.getNowFormatDate(),
                            value: res.data.data.words
                        })
                        let obj = {
                            hasRoute: true,
                            hasList: _that.routeList
                        }
                        let listObj = {
                            key: _that.getNowFormatDate(),
                            value: res.data.data.words.substr(0, res.data.data.words.length - 1)
                        };
                        window.sessionStorage.setItem('hasRoute', JSON.stringify(obj));
                        _that.setMicBoxDisplay(false);
                        _that.$store.dispatch('commitIsRoute', true);
                        _that.setIsSuccess(true);
                        _that.setRecordModelValue(res.data.data.menu.substr(0, res.data.data.menu.length - 1));
                        _that.setRouteList(listObj);
                        _that.$router.push({
                            name: res.data.data.menu
                        })
                    }
                    _that.setMicRecordInfo(res.data.data.words.substr(0, res.data.data.words.length - 1));

                } else {
                    let str = '识别失败，请点击中间麦克风按钮后再说一次';
                    _that.setMicRecordInfo(str);
                    _that.setRecordModelValue(str);
                    _that.recondAgain = true;
                    _that.setIsSuccess(false);
                }
            })
        }
    },
    watch: {
        // times (val) {
        //     // 判断声音小于4000的次数
        //     // 若次数大于11次了，停止次数递增定时，停止录音，停止动画，请求接口
        //     if (val > 11) {
        //         let _that = this;
        //         clearInterval(_that.timer);
        //         _that.recorder.stop();
        //         _that.micAnimateFlag = false;
        //         let fd = new FormData();
        //         fd.append("audioData", _that.recorder.getBlob());
        //         toWords(fd).then(res => {
        //             if (res.data.success === true) {
        //                 if (res.data.data.words && !res.data.data.menu) {
        //                     _that.micStateInfo = res.data.data.words;
        //                     _that.times = 0;
        //                     _that.recondAgain = true;
        //                     _that.setIsSuccess(false);
        //                 } else if (res.data.data.menu) {
        //                     _that.micStateInfo = res.data.data.menu;
        //                     _that.$router.push({
        //                         name: res.data.data.menu
        //                     })
        //                     // _that.routeList.length > 10 ? [] : _that.routeList;
        //                     _that.routeList.push({
        //                         key: _that.getNowFormatDate(),
        //                         value: res.data.data.menu
        //                     })
        //                     let obj = {
        //                         hasRoute: true,
        //                         hasList: _that.routeList
        //                     }
        //                     window.sessionStorage.setItem('hasRoute', JSON.stringify(obj));
        //                     _that.$store.dispatch('commitMicBoxDisplay', false);
        //                     _that.$store.dispatch('commitIsRoute', true);
        //                     _that.setIsSuccess(true);
        //                     _that.setRouteList(_that.routeList);
        //                 }
        //                 _that.setMicRecordInfo(res.data.data.words.substr(0, res.data.data.words.length - 1));
        //             } else {
        //                 let str = '识别失败，请点击下面按钮后再说一次';
        //                 _that.setMicRecordInfo(str);
        //                 _that.recondAgain = true;
        //                 _that.setIsSuccess(false);
        //             }
        //         })
        //     }
        // }
    },
    beforeDestroy () {
        delete this.recorder;
    }
}
</script>
<style lang="less" scoped>
.sound-record-com{
    width: 10%;
    height: 165px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 1000;
    .mic-box{
        // width: 100%;
        height: calc(~'100% - 30px');
        position: relative;
        span{
            display: block;
        }
        .frist-mic{
            width: 85px;
            height: 85px;
            border-radius: 50%;
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            margin: auto;
            background: url('../assets/img/mike.png') no-repeat;
            background-size: 100% 100%;
            .line-div{
                display: block;
                height: 50px;
                line-height: 140px;
                text-align: center;
                position: relative;
                z-index: -1;
                span {
                    display: inline-block;
                    width: 35px;
                    margin: 0 2px;
                    background: #35d2ff;
                }
                .line1 {
                    animation: line 1.5s infinite ease-in-out alternate;
                }
            }
        }
        .frist-mic:hover{
            cursor: pointer;
        }
        .frist-circle{
            position: absolute;
            width: 140px;
            height: 140px;
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
            -webkit-animation: warn 1.5s ease-out;
            -moz-animation: warn 1.5s ease-out;
            animation: warn 1.5s ease-out;
            -webkit-animation-iteration-count: infinite;
            -moz-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
        }
        .second-circle{
            position: absolute;
            width: 140px;
            height: 140px;
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
            -webkit-animation: warn1 1.5s ease-out;
            -moz-animation: warn1 1.5s ease-out;
            animation: warn1 1.5s ease-out;
            -webkit-animation-iteration-count: infinite;
            -moz-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
        }
    }
    .close-btn{
        position: absolute;
        right: 2px;
        top: 0;
        font-size: 24px;
        z-index: 2000;
    }
    .stop-btn{
        width: 100%;
        line-height: 30px;
        position: absolute;
        bottom: 0;
        text-align: center;
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
@keyframs line {
    from {
        height: 0;
    }
    to {
        height: 35px;
    }
}

@-webkit-keyframes line {
    from {
        height: 0;
    }
    to {
        height: 35px;
    }
}
</style>
