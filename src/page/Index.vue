<template>
    <div class="index-page">
        <header>
            <!-- <p class="logo-box">
                <router-link :to="{path: '/carousel'}">
                    <span>樂</span>
                    <span>分</span>
                    <span>享</span>
                </router-link>
            </p> -->
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
    </div>
</template>
<script>
import carouselPage from '../page/Carousel';
import SoundRecordCom from './soundRecordCom';
import { mapGetters, mapMutations } from 'vuex';
export default {
    components: {
        'carousel-com': carouselPage,
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
            num: 0
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
        }
    },
    beforeRouteUpdate (to, from, next) {
        if (window.sessionStorage.getItem('state')) {
            this.$nextTick(() => {
                this.getState();
            })
        }
        next(true);
    }
}
</script>
<style lang="less">
.index-page{
    width: calc(~'100% - 20px');
    height: calc(~'100% - 20px');
    position: relative;
    margin: 10px;
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
</style>
