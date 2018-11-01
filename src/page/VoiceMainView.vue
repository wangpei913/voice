<template>
    <div class="voice-main-view">
        <ul class="page-tabs">
            <li v-for="(item, index) in tabsList" :key="index" :class="{'lis-active': tabActive === index}" @click="clickTabs(index)">{{item}}</li>
        </ul>
        <div class="page-mains">
            <transition enter-active-class="zoomIn" leave-active-class="zoomOutRight">
                <component :is="componentId" @reload="reload"></component>
            </transition>
        </div>
    </div>
</template>
<script>
import BaiduCom from './BaiDuVoice';
import KeDaXunFeiCom from './XunFeiVoice';
import TestVoice from './TestVoice';
import AnotherVoice from './AnotherVoice';
import Awaken from './Awaken';
import AwakenTwo from './Awaken2';
export default {
    data () {
        return {
            tabsList: ['百度语音', '科大讯飞语音', '声音测试'],
            tabActive: 0
        }
    },
    computed: {
        componentId () {
            let com = '';
            switch (this.tabActive) {
                case 0:
                    com = BaiduCom;
                    break;
                case 1:
                    com = KeDaXunFeiCom;
                    break;
                case 2:
                    com = TestVoice;
                    break;
                default:
                    break;
            }
            return com;
        }
    },
    mounted () {},
    methods: {
        clickTabs (index) {
            this.tabActive = index;
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
