<template>
    <div class="voice-demo">
        <div class="sound-record-com" v-if="dialogTableVisible">
            <p class="close-btn" @click="closeDialog">X</p>
            <div class="mic-box">
                <div class="frist-mic" @click="mikeClick() && mikeFlag">
                    <div class="line-div" v-if="animateShow">
                        <span class="line1"></span>
                    </div> 
                </div>
                <span class="frist-circle" v-if="animateShow"></span>
                <span class="second-circle" v-if="animateShow"></span>
            </div>
            <p class="stop-btn">
                <el-button @click="stopRecord()" type="primary" size="mini">停止录音</el-button>
            </p>
        </div>
        <ul class="voice-demo-header">
            <li>
                <el-input
                    v-model="state3">
                    <i slot="suffix" class="iconfont icon-maikefeng" @click="handleIconClick"></i>
                </el-input>
                <ul class="search-list" v-if="searchShow">
                    <li class="search-list-lis" v-for="(item, index) in restaurants" :key="index" @click="clickSearchList(item)">{{item.value}}</li>
                    <li class="no-info" v-if="noDataShow">暂无该词条！</li>
                </ul>
            </li>
            <li>
                <audio class="audio-parts" v-if="showPlayBtn" controlsList="nodownload" :src="voiceSrc" controls autoplay ref="audio" width="100%"></audio>
            </li>
        </ul>
        <div class="voice-demo-content" v-text="voiceWords"></div>
    </div>
</template>
<script>
import AudioAPI from '../utls/AudioAPI.js';
import {toWords, voice} from '../api/demo.js';
let analyser;
export default {
    data () {
        return {
            icon: 'iconfont icon-maikefeng',
            restaurants: [],
            state3: '',
            dialogTableVisible: false,
            recorder: '',
            animateShow: false,
            timer: null,
            times: 0,
            voiceInfo: '请说话',
            mikeFlag: false,
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
            searchShow: false,
            noDataShow: false,
            voiceWords: '',
            voiceSrc: '',
            routeList: [],
            showPlayBtn: false,
            controlBtn: false
        }
    },
    watch: {
        state3 (val) {
            if (val) {
                this.restaurants = [];
                this.allList.forEach((item, index) => {
                    if (item.value.indexOf(val) !== -1) {
                        this.restaurants.push(item);
                        this.noDataShow = false;
                    } else {
                        this.noDataShow = true;
                        setTimeout(() => {
                            this.noDataShow = false;
                        }, 100)
                    }
                })
            } else {
                this.searchShow = false;
            }
        }
    },
    methods: {
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
        // 停止录音后再次录音事件
        mikeClick () {
            let _that = this;
            _that.animateShow = true;
            _that.handleIconClick();
        },
        // 页面第一次加载时候触发的事件
        fristLoading () {
            this.animateShow = true;
            let _that = this;
            HZRecorder.get(function (rec) {
                _that.recorder = rec;   
                _that.recorder.start();
            })
        },
        // 搜索框麦克风点击事件
        handleIconClick () {
            this.dialogTableVisible = true;
            this.fristLoading();
        },
        // 停止录音按钮点击事件
        stopRecord () {
            let _that = this;
            _that.recorder.stop();
            _that.animateShow = false;
            let fd = new FormData();
            fd.append("audioData", _that.recorder.getBlob());
            toWords(fd).then(res => {
                if (res.data.success === true) {
                    if (res.data.data.words && !res.data.data.menu) {
                        _that.state3 = res.data.data.words.substr(0, res.data.data.words.length - 1);
                        _that.searchShow = true;
                    } else if (res.data.data.menu) {
                        window.sessionStorage.setItem('state', true);
                        _that.$router.push({
                            name: res.data.data.menu
                        })
                    }
                    _that.dialogTableVisible = false;
                } else {
                    let str = '识别失败，请点击中间麦克风按钮后再说一次';
                    _that.state3 = str;
                }
            })
        },
        // 关闭录音界面
        closeDialog () {
            this.dialogTableVisible = false;
            this.animateShow = false;
            let _that = this;
            _that.recorder.stop();
        },
        // 点击搜索的词条
        clickSearchList (item) {
            this.voiceWords = item.info;
            this.state3 = item.value;
            this.searchShow = false;
            this.broadCastWords(item.info);
        },
        // 播报词条
        broadCastWords (word) {
            let w = {
                words: word
            }
            voice(w).then(res => {
                this.voiceSrc = res.data;
                this.showPlayBtn = true;
                this.controlBtn = true;
            }).catch(err => {
                console.log(err);
            })
        },
        // 暂停播放
        suspendPlay () {
            this.controlBtn = !this.controlBtn;
            let player = document.getElementById('player');
            if (this.controlBtn === false) {
                player.pause();
            } else {
                player.play();
            }
        }
    },
    beforeDestroy () {
        this.dialogTableVisible = false;
    }
}
</script>
<style lang="less" scoped>
.voice-demo{
    width: 100%;
    height: 100%;
    .voice-demo-header{
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
                    i{
                        font-size: 24px;
                        line-height: 55px;
                    }
                    i:hover{
                        color: #409EFF;
                        cursor: pointer;
                    }
                }
                .search-list{
                    width: 30%;
                    position: absolute;
                    left: 0;
                    border-radius: 5px;
                    background-color: #fff;
                    border: 1px solid #d1dbe5;
                    box-sizing: border-box;
                    padding: 0 15px;
                    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
                    .search-list-lis{
                        width: 100%;
                        line-height: 30px;
                        margin: 0;
                        padding: 0;
                        cursor: pointer;
                        color: #48576a;
                        font-size: 14px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .search-list-lis:hover{
                        background: rgb(228, 232, 241);
                    }
                }
            }
            &:nth-child(2){
                padding-left: 10px;
                height: 100%;
                .audio-parts{
                    height: 50px !important;
                }
                .play-btn{
                    i{
                        font-size: 32px;
                    }
                }
            }
        }
    }
    .voice-demo-content{
        width: 100%;
        height: calc(~'100% - 55px');
        font-size: 14px;
        text-indent: 25px;
        margin-top: 5px;
    }
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
            width: 100%;
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
        height: 30px;
    }
}

@-webkit-keyframes line {
    from {
        height: 0;
    }
    to {
        height: 30px;
    }
}
</style>
