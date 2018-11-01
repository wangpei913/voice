<template>
    <div class="another-voice">
        <!--动画部分start-->
        <transition enter-active-class="zoomIn" leave-active-class="zoomOut">
            <div class="down" v-if="showMic">
                <p v-if="showMic" style="width: 180px;float:left;text-align: center;line-height: 20px;" v-text="recordInfo"></p>
                <span class="close-btn" @click="closeRecord()">X</span>
                <div class="dot" @click="restartState && restartRecord()"></div>
                <div class="pulse" v-if="animate"></div>
                <div class="pulse1" v-if="animate"></div>
            </div>
        </transition>
        <!--动画部分end-->
        <div class="input-part">
            <el-input
                v-model="voiceInput">
                <i slot="suffix" @click="!showMic && clickMic()" class="iconfont icon-maikefeng" style="font-size: 24px; line-height: 42px;"></i>
            </el-input>
            <ul class="search-result" v-if="searchShow">
                <li v-for="(item, index) in searchList" :key="index" @click="playVoice(item)">{{item.value}}</li>
            </ul>
            <ul class="no-result" v-if="none">
                <li>暂无该词条，敬请期待!</li>
            </ul>
        </div>
        <div class="audio-part">
            <audio class="audio-parts" v-if='playerShow' controlsList="nodownload" :src="voiceSrc" controls autoplay ref="audio" width="100%"></audio>
        </div>
        <div class="words-part" v-text="words"></div>
    </div>
</template>
<script>
import AudioAPI from '../utls/AudioAPI.js';
import {toWords, voice} from '../api/demo.js';
import {pubSizeValue, averageValue} from '../utls/index'
export default {
    data () {
        return {
            loading: false,
            voiceInput: '',
            showMic: false,
            animate: false,
            recorder: '',
            recTimer: null,
            times: 0,
            recordInfo: '',
            restartState: false,
            allList: [
                {
                    value: '中国平安保险（集团）股份有限公司',
                    info: '中国平安保险（集团）股份有限公司（以下简称“中国平安” ，“平安”，“公司”，“集团”）于1988年诞生于深圳蛇口，是中国第一家股份制保险企业，至今已经发展成为金融保险、银行、投资等金融业务为一体的整合、紧密、多元的综合金融服务集团。2017年6月，《2017年BrandZ最具价值全球品牌100强》公布，中国平安排名第61位;7月31日，《财富》中国500强排行榜发布，中国平安保险（集团）股份有限公司排名第五。2018年9月，中国平安保险（集团）股份有限公司在2017中国企业500强中，排名第六，距2017年又上升了两位。2018年《财富》世界500强排行榜第29名。'
                },
                {
                    value: '中国平安科技',
                    info: '在数字智联时代，企业需要朝敏捷创新型组织转型，转型过程涉及到研发组织、研发体系、研发方法、创新机制、创新方法的变革和实施。平安科技敏捷研发专家服务，立足于平安集团10年研发管理和敏捷教练服务经验，融合行业优秀敏捷与创新实践，帮助目标组织提升研发创新精准度、提升研发过程效率、提升企业IT研发的业务价值，帮助客户方朝敏捷创新型组织转型，从而让：敏捷转型变简单、业务价值变明显。'
                }
            ],
            searchList: [],
            none: false,
            searchShow: false,
            words: '',
            voiceSrc: '',
            playerShow: false,
            clickFlag: true,
            Timer: null,
            flag: false
        }
    },
    mounted () {},
    methods: {
        // 搜索框麦克风事件
        clickMic () {
            this.showMic = !this.showMic;
            this.animate = !this.animate;
            this.startRecord();
        },
        // 开始录音
        startRecord () {
            let that = this;
            let recList = [];
            that.recordInfo = '录音中...';
            HZRecorder.get(function (rec) {
                that.recorder = rec;   
                that.recorder.start();
            })
            AudioAPI.start().then(analyser => {
                that.recTimer = setInterval(function () {
                    let a = AudioAPI.getVoiceSize(analyser);
                    if (recList.length === 20) {
                        let max = Math.max(...recList);
                        let min = Math.min(...recList);
                        let s = averageValue(recList);
                        if (pubSizeValue(max, min) < 2000) {
                            clearInterval(that.recTimer);
                            that.recorder.stop();
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
        },
        // 语音转文字
        voiceToText () {
            let that = this;
            let fd = new FormData();
            fd.append("audioData", that.recorder.getBlob());
            toWords(fd).then(res => {
                if (res.data.success === true) {
                    if (res.data.data.words && !res.data.data.menu) {
                        that.voiceInput = res.data.data.words.substr(0, res.data.data.words.length - 1);
                        that.searchShow = true;
                    } else if (res.data.data.menu) {
                        window.sessionStorage.setItem('state', true);
                        that.$router.push({
                            name: res.data.data.menu
                        })
                    }
                    that.animate = false;
                    that.recordInfo = '继续录音请点击中间麦克风';
                    that.flag = false;
                } else {
                    let str = '识别失败，请点击中间麦克风按钮后再说一次';
                    that.animate = false;
                    that.recordInfo = str;
                }
                that.restartState = true;
            }).catch(err => {
                let str = '识别失败，请点击中间麦克风按钮后再说一次';
                that.recordInfo = str;
                console.log(err)
            })
        },
        // 重新录音
        restartRecord () {
            this.startRecord();
            this.animate = true;
        },
        // 播放语音
        playVoice (item) {
            this.voiceInput = item.value;
            this.words = item.info;
            this.searchShow = false;
            this.none = false;
            this.showMic = false;
            this.callVoiceApi(item.info);
        },
        callVoiceApi (words) {
            let w = {
                words: words
            }
            this.loading = true;
            voice(w).then(res => {
                this.loading = false;
                this.voiceSrc = res.data;
                this.playerShow = true;
            }).catch(err => {
                this.loading = false;
                console.log(err);
            })
        },
        // 关闭按钮
        closeRecord () {
            this.showMic = false;
        }
    },
    watch: {
        voiceInput (val) {
            if (val) {
                this.searchList = [];
                this.allList.forEach((item, index) => {
                    if (item.value.indexOf(val) > -1) {
                        this.searchList.push(item);
                        this.none = false;
                    } else {
                        this.none = true;
                    }
                })
            } else {
                this.none = false;
                this.searchShow = false;
            }
        },
        flag (val) {
            if (val === true) {
                this.Timer = setTimeout(() => {
                    clearInterval(this.recTimer);
                    this.recorder.stop();
                    this.recordInfo = '发送中...';
                    this.animate = false;
                    this.voiceToText();
                }, 1000)
            } else {
                clearInterval(this.Timer);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.another-voice{
    width: 100%;
    height: 100%;
    .input-part{
        width: 30%;
        height: 54px;
        line-height: 54px;
        float: left;
        .el-input{
            line-height: 40px;
            i:hover{
                cursor: pointer;
                color: #3399ff;
            }
        }
        .search-result{
            z-index: 99;
            width: 100%;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            border-top: 0;
            box-sizing: border-box;
            background-color: #fff;
            li{
                width: 100%;
                line-height: 30px;
                padding: 0 15px;
                cursor: pointer;
            }
            li:hover{
                background: rgb(240, 240, 240);
            }
        }
        .no-result{
            z-index: 99;
            width: 100%;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            border-top: 0;
            box-sizing: border-box;
            background-color: #fff;
            li{
                width: 100%;
                line-height: 30px;
                padding: 0 15px;
                cursor: pointer;
            }
            li:hover{
                background: rgb(240, 240, 240);
            }
        }
    }
    .audio-part{
        float: left;
        padding-left: 15px;
    }
    .words-part{
        clear: both;
        width: 100%;
        height: calc(~'100% - 54px');
    }
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
