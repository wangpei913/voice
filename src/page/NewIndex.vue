<template>
    <div class="new-index">
        <header>
            <ul class="menu-uls">
                <li v-for="(item, index) in menuList" :key="index">
                    <router-link :to="{path: item.menupath}">{{item.menuname}}</router-link>
                </li>
            </ul>
            <p class="operation-box">
                <el-dropdown @command="loginOut()">
                    <span class="el-dropdown-link">
                        {{userName}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>注销</el-dropdown-item>
                        <el-dropdown-item>更改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </p>
        </header>
        <main id="el-main">
            <transition enter-active-class="zoomIn" leave-active-class="zoomOutRight">
                <router-view @rootReload="rootReload"></router-view>
            </transition>
        </main>
        <!--录音组件开始-->
        <transition enter-active-class="zoomIn" leave-active-class="zoomOutRight">
            <div class="new-voice" v-if="showVoiceCom">
                <p style="width: 180px;float:left;text-align: center;line-height: 20px;" v-text="voiceComInfo"></p>
                <div class="dot"></div>
                <div class="line">
                    <span :style="{height: spanHeight}"></span>
                </div>
                <div class="pulse" v-if="voiceComAnimate"></div>
                <div class="pulse1" v-if="voiceComAnimate"></div>
            </div>
        </transition>
        <!--录音组件结束-->
        <!--全局底角mic组件开始-->
        <div class="quick-btn" v-if="isShow" :class="{'position-default': showHistoryBox === false,'position-flag': showHistoryBox === true}">
            <i class="iconfont icon-maikefeng" @click="againClickMrc()"></i>
            <p class="show-info" v-if="getMicRecordInfo" style="line-height: 24px;">
                <span v-text="getMicRecordInfo" :style="{color: getIsSuccess ? '#13ce66' : '#ff4949'}"></span>
                <span class="more-span" @click="clickMore()">
                    <i :class="showHistoryBox ? 'el-icon-arrow-right' : 'el-icon-arrow-left'" style="font-size: 24px;"></i>
                </span>
            </p>
        </div>
        <transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
            <ul :style="{height: eleHeight}" :class="{'history-default': showHistoryBox === false,'history-running': showHistoryBox === true}">
                <li v-for="(item, index) in getRouteList" :key="index">
                    <span>
                        <img :src="imgSrc" alt="" srcset="">
                    </span>
                    <span>{{item.key}}</span>
                    <span>{{item.value}}</span>
                </li>
            </ul>
        </transition>
        <transition enter-active-class="bounceInUp" leave-active-class="bounceOutUp">
            <sound-record-com ref="child" v-if="$store.state.micBoxDisplay"></sound-record-com>
        </transition>
        <!--全局底角mic组件结束-->
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import AudioAPI from '../utls/AudioAPI.js';
import {toWords, voice} from '../api/demo.js';
import {pubSizeValue, averageValue} from '../utls/index';
import SoundRecordCom from './soundRecordCom';
export default {
    components: {
        'sound-record-com': SoundRecordCom
    },
    data () {
        return {
            menuList: [
                {
                    menuname: '政策决策支持',
                    menupath: 'fundPolicy'
                },
                {
                    menuname: '基金运行分析',
                    menupath: 'fundFore'
                },
                {
                    menuname: '基金风险管理',
                    menupath: 'fundDan'
                },
                {
                    menuname: '专题解决方案',
                    menupath: 'fundThematic'
                },
                {
                    menuname: '报告下载',
                    menupath: 'reportDown'
                },
                {
                    menuname: '站内搜索',
                    menupath: 'search'
                }
            ],
            userName: JSON.parse(window.sessionStorage.getItem('user')).un,
            showSubMenu: false,
            positionFlag: false,
            eleHeight: 0,
            imgSrc: require('../assets/img/login.png'),
            micShow: false,
            showHistoryBox: false,
            isShow: false,
            num: 0,
            // *******************
            fristRecorder: '', // 主页唤醒声音实例
            fristTimer: null, // 唤醒时的定时器载体
            showVoiceCom: false, // 是不是显示录音组件
            //*******************
            voiceComAnimate: true, // 录音动画
            voiceComInfo: '', // 录音状态
            voiceComTimer: null, // 录音定时器
            voiceComRecoeder: '', // 组件声音实例
            isStopFlag: false, // 判断是不是说完的开关
            sendTimer: null, // 发送请求的定时器
            spanHeight: 0
        }
    },
    computed: {
        ...mapGetters({
            getIsRoute: 'getIsRoute',
            getRouteList: 'getRouteList',
            getMicRecordInfo: 'getMicRecordInfo',
            getIsSuccess: 'getIsSuccess',
            getMicBoxDisplay: 'getMicBoxDisplay',
            getIsClick: 'getIsClick'
        })
    },
    created () {
        if (window.sessionStorage.getItem('state')) {
            this.$nextTick(() => {
                this.getState();
            })
        }
    },
    beforeMount () {
        this.setIsClick(true);
    },
    mounted () {
        this.openAwaken();
        window.addEventListener('resize', () => {
            let h = document.body.clientHeight;
            this.eleHeight = (h / 2) - 4 + 'px';
        })
    },
    watch: {
        userName (newval, oldval) {
            if (newval !== oldval) {
                this.$router.push({
                    name: 'carousel'
                });
            }
        }
    },
    methods: {
        ...mapMutations({
            setMicBoxDisplay: 'setMicBoxDisplay',
            setIsClick: 'setIsClick',
            setSearchBox: 'setSearchBox'
        }),
        // 计算话筒音量
        computeVolume (val, max, min) {
            if (val >= max) {
                this.spanHeight = 100 + '%';
            } else if (val <= min) {
                this.spanHeight = 10 + '%';
            } else {
                let base = max - min;
                let newValue = val - min;;
                this.spanHeight = (newValue / base) * 100 + '%';
            }
        },
        // 打开唤醒
        openAwaken () {
            let that = this;
            let recList = [];
            let count = 0;
            HZRecorder.get(function (rec) {
                that.fristRecorder = rec;   
                that.fristRecorder.start();
            })
            AudioAPI.start().then(analyser => {
                that.fristTimer = setInterval(function () {
                    let a = AudioAPI.getVoiceSize(analyser);
                    count++;
                    if (recList.length === 20) {
                        let max = Math.max(...recList);
                        let min = Math.min(...recList);
                        let s = averageValue(recList);
                        if (count % 2 === 0) {
                            that.computeVolume(a, max, min);
                        }
                        if (pubSizeValue(max, min) < 4000) {
                            clearInterval(that.fristTimer);
                            that.fristRecorder.stop();
                            that.openAwaken();
                        } else if (a < s) {
                            that.awakenRes();
                            clearInterval(that.fristTimer);
                            that.fristRecorder.stop();
                        }
                    } else if (recList.length < 20) {
                        recList.push(a);
                    }
                }, 100);
            })
        },
        // 关闭唤醒
        stopAwake () {
            clearInterval(this.fristTimer);
            this.fristRecorder.stop();
        },
        // 唤醒反馈结果
        awakenRes () {
            let that = this;
            let fd = new FormData();
            fd.append("audioData", that.fristRecorder.getBlob());
            toWords(fd).then(res => {
                if (res.data.success === true) {
                    if (res.data.data.words.substr(0, res.data.data.words.length - 1).indexOf('你好') > -1 || res.data.data.words.substr(0, res.data.data.words.length - 1).indexOf('您好') > -1) {
                        that.stopAwake();
                        that.showVoiceCom = true;
                        that.voiceComAnimate = true;
                        that.recordStart();
                    } else {
                        that.showVoiceCom = false;
                        that.stopAwake();
                        that.openAwaken();
                    }
                } else {
                    that.stopAwake();
                    that.openAwaken();
                }
            }).catch(err => {
                that.stopAwake();
                that.openAwaken();
            })
        },
        getState () {
            this.isShow = window.sessionStorage.getItem('state');
        },
        rootReload (state) {
           window.sessionStorage.setItem('state', state);
        },
        // 菜单点击事件
        menuClick (val, index) {
            if (val.subMenu && val.subMenu.length > 0) {
                this.showSubMenu = true;
            } else {
                this.showSubMenu = false;
                this.$router.push({
                    name: val.menupath
                });
            }
        },
        // 二级菜单点击事件
        secondClick (val, index) {
            if (val.subMenu && val.subMenu.length > 0) {
                this.showSubMenu = true;
            } else {
                this.showSubMenu = false;
                this.$router.push({
                    name: val.menupath
                });
            }
        },
        // 注销点击事件
        loginOut () {
            this.$router.push({
                name: 'login'
            });
            window.sessionStorage.clear();
        },
        // 打开底部折叠面板
        openInfoBox () {
            this.positionFlag = !this.positionFlag;
        },
        // 底部折叠面板mrc点击事件
        againClickMrc () {
            if (!this.getMicBoxDisplay) {
                this.micShow = !this.getMicBoxDisplay;
            } else {
                this.micShow = !this.micShow;
            }
            this.setMicBoxDisplay(this.micShow);
            this.setSearchBox(false);
        },
        clickMore () {
            this.showHistoryBox = !this.showHistoryBox;
            let h = document.body.clientHeight;
            this.eleHeight = (h / 2) - 4 + 'px';
        },
        ////////////////////
        // 开始录音
        recordStart () {
            let that = this;
            let recList = [];
            let count = 0;
            that.voiceComInfo = '录音中...';
            HZRecorder.get(function (rec) {
                that.voiceComRecoeder = rec;
                that.voiceComRecoeder.start();
            })
            AudioAPI.start().then(analyser => {
                that.voiceComTimer = setInterval(function () {
                    let a = AudioAPI.getVoiceSize(analyser);
                    count++;
                    if (recList.length === 20) {
                        let max = Math.max(...recList);
                        let min = Math.min(...recList);
                        let s = averageValue(recList);
                        if (count % 2 === 0) {
                            that.computeVolume(a, max, min);
                        }
                        if (pubSizeValue(max, min) < 2000) {
                            clearInterval(that.voiceComTimer);
                            that.voiceComRecoeder.stop();
                            that.voiceComAnimate = false;
                            that.voiceComInfo = '重新唤醒继续使用';
                            that.openAwaken();
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
                        that.voiceComAnimate = false;
                        that.isStopFlag = false;
                        that.showVoiceCom = false;
                        clearInterval(that.voiceComTimer);
                        that.stopAwake();
                        that.$router.push({
                            name: res.data.data.menu
                        });
                    } else {
                        let str = '重新唤醒继续使用';
                        that.voiceComAnimate = false;
                        that.voiceComInfo = str;
                        that.openAwaken();
                    }
                } else {
                    let str = '重新唤醒继续使用';
                    that.voiceComAnimate = false;
                    that.voiceComInfo = str;
                    that.openAwaken();
                }
            }).catch(err => {
                let str = '重新唤醒继续使用';
                that.voiceComInfo = str;
                that.openAwaken();
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
    },
    beforeRouteUpdate (to, from, next) {
        if (window.sessionStorage.getItem('state')) {
            this.$nextTick(() => {
                this.getState();
            })
        }
        clearInterval(this.voiceComTimer);
        this.stopAwake();
        this.openAwaken();
        next(true);
    }
}
</script>
<style lang="less" scoped>
.new-index{
    width: 100%;
    height: 100%;
    header{
        width: 100%;
        height: 70px;
        color: #ffffff;
        background: #262f42;
        .logo-box{
            width: 10%;
            height: 100%;
            float: left;
            text-align: center;
            line-height: 70px;
            span{
                font-size: 24px;
                font-weight: bold;
                color: #ffffff;
            }
        }
        .menu-uls{
            width: 60%;
            height: 100%;
            margin: 0 auto;
            float: left;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            li{
                line-height: 70px;
                flex: 1;
                font-size: 16px;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
                a{
                    flex: 1;
                    text-align: center;
                    color: #ffffff;
                    cursor: pointer;
                }
            }
        }
        .operation-box{
            width: 10%;
            height: 100%;
            float: right;
            text-align: center;
            line-height: 70px;
            .el-dropdown{
                color: #ffffff;
            }
        }
    }
    main{
        width: 100%;
        height: calc(~'100% - 70px');
        overflow-y: auto;
    }
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
            background: url('../assets/img/mike.png') no-repeat;
            background-size: 100% 100%;
            z-index: 1000;
        }
        .line{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            z-index: -1;
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            margin: auto;
            text-align: center;
            line-height: 40px;
            overflow: hidden;
            span{
                position: absolute;
                left: 0;
                bottom: 0;
                background: #35d2ff;
                display: inline-block;
                width: 100%;
                height: 0;
                transition: height 0.1s;
            }
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
    .quick-btn{
        i{
            font-size: 48px;
        }
        i:hover{
            color: #0082df;
            cursor: pointer;
        }
        .more-span{
            display: block;
            float: right;
            line-height: 24px;
            font-size: 24px;
        }
        .more-span:hover{
            cursor: pointer;
        }
    }
    .history-default{
        position: absolute;
        right: -22%;
        bottom: 0;
        width: 20%;
        overflow-y: auto;
    }
    .history-running{
        overflow-y: auto;
        position: absolute;
        right: 0;
        bottom: 0;
        box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
        width: 20%;
        border-radius: 5px;
        li{
            width: 100%;
            height: 40px;
            line-height: 40px;
            margin: 2px 0;
            border-bottom: 1px #ccc solid;
            span{
                display: block;
                &:nth-child(1){
                    float: left;
                    width: 15%;
                    height: 40px;
                    padding: 5px;
                    line-height: 40px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                &:nth-child(2),&:nth-child(3){
                    float: right;
                    width: 85%;
                    line-height: 20px;
                }
            }
        }
    }
    .position-box{
        z-index: 9999;
        .box-title{
            width: 100%;
            height: 35px;
            background: skyblue;
            border-radius: 5px;
            line-height: 35px;
            color: #ffffff;
            span{
                display: block;
                float: left;
                &:nth-child(1),&:nth-child(3){
                    width: 15%;
                    height: 100%;
                    text-align: center;
                    line-height: 35px;
                }
                &:nth-child(2){
                    width: 70%;
                    height: 100%;
                }
                &:nth-child(1),&:nth-child(3):hover{
                    cursor: pointer;
                }
            }
        }
        .box-content{
            background: #fff;
            width: 100%;
            margin: 2px 0;
            overflow-y: auto;
            border-radius: 5px;
            li{
                width: 100%;
                padding: 0 5px;
                border-bottom: 1px #ccc solid;
                span{
                    display: block;
                    &:nth-child(1){
                        float: left;
                        width: 15%;
                        height: 40px;
                        padding: 5px;
                        line-height: 40px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    &:nth-child(2),&:nth-child(3){
                        float: right;
                        width: 85%;
                        line-height: 20px;
                    }
                }
            }
        }
    }
    .position-flag{
        position: absolute;
        right: 20%;
        bottom: 0;
        text-align: center;
    }
    .position-default{
        position: absolute;
        right: 0;
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
</style>
