<template>
    <div class="voice-main-view">
        <ul class="page-tabs">
            <li v-for="(item, index) in tabsList" :key="index" :class="{'lis-active': tabActive === index}" @click="clickTabs(index)">{{item}}</li>
        </ul>
        <div class="page-mains">
            <keep-alive>
                <transition enter-active-class="zoomIn" leave-active-class="zoomOutRight">
                    <component :is="componentId" @reload="reload"></component>
                </transition>
            </keep-alive>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import BaiduCom from './BaiDuVoice';
import KeDaXunFeiCom from './XunFeiVoice';
export default {
    data () {
        return {
            tabsList: ['百度语音', '科大讯飞语音'],
            tabActive: 0
        }
    },
    computed: {
        ...mapGetters({
            getNowPage: 'getNowPage'
        }),
        componentId () {
            let com = '';
            switch (this.getNowPage) {
                case 1:
                    com = BaiduCom;
                    break;
                case 2:
                    com = KeDaXunFeiCom;
                default:
                    break;
            }
            return com;
        }
    },
    created () {
        this.setNowPage(1);
    },
    methods: {
        ...mapMutations({
            setNowPage: 'setNowPage'
        }),
        clickTabs (index) {
            this.tabActive = index;
            this.setNowPage(index + 1);
        },
        reload (val) {
            this.$emit('rootReload', val);
        }
    }
}
</script>
<style lang="less" scoped>
.voice-main-view{
    width: 100%;
    height: 100%;
    position: relative;
    .page-tabs{
        width: 100%;
        height: 30px;
        padding: 5px 0;
        li{
            float: left;
            padding: 0 30px;
            line-height: 30px;
            text-align: center;
            font-weight: bold;
            color: #666;
        }
        li:hover{
            cursor: pointer;
        }
        .lis-active{
            border-bottom: 1px #409eff solid;
            color: #409eff;
        }
    }
    .page-mains{
        width: 100%;
        height: calc(~'100% - 50px');
        margin-top: 15px;
        // border: 1px #f66 solid;
    }
}
</style>
