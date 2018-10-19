<template>
    <div class="voice-demo">
        <div class="dialog-mask" v-if="dialogTableVisible"></div>
        <div class="dialog-com" v-if="dialogTableVisible">
            <p class="dialog-com-top" @click="closeDialog()">X</p>
            <p class="message-info" v-text="voiceInfo"></p>
            <div class="dialog-com-mike">
                <div class="dot" @click="mikeClick() && mikeFlag">
                    <div class="line-div" v-if="animateShow">
                        <span class="line1"></span>
                    </div> 
                </div>
                <div class="pulse" v-if="animateShow"></div>
                <div class="pulse1" v-if="animateShow"></div>
            </div>
        </div>
        <ul class="voice-demo-header">
            <li>
                <el-input
                    v-model="state3">
                    <i slot="suffix" class="iconfont icon-maikefeng" @click="handleIconClick"></i>
                </el-input>
                <ul class="search-list" v-if="searchShow">
                    <li class="search-list-lis" v-for="(item, index) in restaurants" :key="index" @click="clickSearchList(item)">{{item.value}}</li>
                </ul>
                <p class="no-Data" v-show="noDataShow">暂无该词条！</p>
            </li>
            <li>
                <el-button type="primary" size="small">搜索</el-button>
            </li>
        </ul>
        <div class="voice-demo-content" v-text="voiceWords">content</div>
        <embed :src="voiceSrc" ref="" type="audio/x-wav" autostart="true" width="0" height="0" loop="false"/>
        <sound-record-com v-if="$store.state.showSearchBox"></sound-record-com>
    </div>
</template>
<script>
import AudioAPI from '../utls/AudioAPI.js';
import {xfToWords, xfToVoice} from '../api/demo.js';
import { mapMutations, mapGetters } from 'vuex';
import SoundRecordCom from './soundRecordCom';
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
            voiceSrc: ''
        }
    },
    mounted () {},
    components: {
        'sound-record-com': SoundRecordCom
    },
    computed: {
        ...mapGetters({
            getRecordModelValue: 'getRecordModelValue'
        })
    },
    watch: {
        times (val) {
            if (val > 11) {
                let _that = this;
                clearInterval(_that.timer);
                _that.recorder.stop();
                _that.animateShow = false;
                let fd = new FormData();
                fd.append("audioData", _that.recorder.getBlob());
                xfToWords(fd).then(res => {
                    if (res.data.success === true) {
                        if (res.data.data.words && !res.data.data.menu) {
                            _that.state3 = res.data.data.words.substr(0, res.data.data.words.length - 1);
                            _that.dialogTableVisible = false;
                            _that.times = 0;
                        } else if (res.data.data.menu) {
                            _that.$router.push({
                                name: res.data.data.menu
                            })
                        }
                    } else {
                        _that.voiceInfo = '识别失败，请点击下面按钮后再说一次';
                        _that.mikeFlag = true;
                    }
                })
            }
        },
        state3 (val) {
            if (val) {
                this.searchShow = true;
                this.restaurants = [];
                this.allList.forEach((item, index) => {
                    if (item.value.indexOf(val) !== -1) {
                        this.restaurants.push(item);
                        this.noDataShow = false;
                    } else {
                        this.noDataShow = true;
                    }
                })
            } else {
                this.searchShow = false;
                this.noDataShow = false;
            }
        },
        getRecordModelValue (val) {
            this.state3 = val;
        }
    },
    methods: {
        ...mapMutations({
            setSearchBox: 'setSearchBox'
        }),
        mikeClick () {
            let _that = this;
            _that.animateShow = true;
            _that.voiceInfo = '请说话';
            _that.times = 0;
            _that.handleIconClick();
        },
        handleIconClick () {
            // this.dialogTableVisible = true;
            // this.animateShow = true;
            // let _that = this;
            // HZRecorder.get(function (rec) {
            //     _that.recorder = rec;   
            //     _that.recorder.start();
            // })
            // AudioAPI.start().then(analyser => {
            //     console.log(analyser, 'analyser')
            //     _that.timer = setInterval(function () {
            //         let a = AudioAPI.getVoiceSize(analyser);
            //         if (a < 5000) {
            //             _that.times++;
            //         }
            //     }, 100)
            // })
            this.setSearchBox(true);
        },
        closeDialog () {
            this.dialogTableVisible = false;
            this.animateShow = false;
        },
        // 点击搜索的词条
        clickSearchList (item) {
            this.voiceWords = item.info;
            this.searchShow = false;
            this.broadCastWords(item.info);
            this.setSearchBox(false);
        },
        // 播报词条
        broadCastWords (word) {
            let w = {
                words: word
            }
            xfToVoice(w).then(res => {
                this.voiceSrc = res.data;
            }).catch(err => {
                console.log(err)
            })
        }
    },
    beforeDestroy () {
        this.setSearchBox(false);
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
                .no-Data{
                    width: 30%;
                    position: absolute;
                    left: 0;
                    border-radius: 5px;
                    background-color: #fff;
                    border: 1px solid #d1dbe5;
                    box-sizing: border-box;
                    padding: 0 15px;
                    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
                }
            }
            &:nth-child(2){
                padding-left: 10px;
            }
        }
    }
    .voice-demo-content{
        width: 100%;
        height: calc(~'100% - 50px');
        font-size: 14px;
        text-indent: 25px;
    }
    .dialog-com{
        position: absolute;
        font-family: "microsoft yahei";
        z-index: 1000;
        box-shadow: 0 5px 5px #888;
        width: 100%;
        height: 38.2%;
        min-height: 229.2px;
        background: #fff;
        font-size: 16px;
        bottom: 0;
        .dialog-com-top{
            position: absolute;
            right: 10px;
            top: 20px;
            font-size: 24px;
            color: #333;
            cursor: pointer;
            width: 20px;
            height: 20px;
        }
        .message-info{
            margin: 20px 0 0 10px;
            font-size: 22px;
        }
        .dialog-com-mike{
            width: 15%;
            height: 60%;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            .dot{
                width: 105px;
                height: 105px;
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
                        width: 34px;
                        margin: 0 2px;
                        background: #35d2ff;
                    }
                    .line1 {
                        animation: line 1.5s infinite ease-in-out alternate;
                    }
                }
            }
            .pulse {
                position: absolute;
                width: 160px;
                height: 160px;
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
            .pulse1 {
                position: absolute;
                width: 160px;
                height: 160px;
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
    }
    .dialog-mask{
        opacity: 0.2;
        position: absolute;
        background: rgb(0, 0, 0);
        z-index: 999;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
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
