<template>
    <div class="reportDown-page">
        <audio controlsList="nodownload" :src="pubVoiceSrc" controls autoplay width="0" height="0"></audio>
    </div>
</template>
<script>
import {mixins} from '../utls/index';
export default {
    mixins: [mixins],
    data () {
        return {
            pubVoiceSrc: '',
            word: '报告下载,专门给客户提供一个下载报告的入口'
        }
    },
    mounted () {
        this.publicVoice(this.word);
    }
}
</script>
<style lang="less" scoped>
.reportDown-page{
    width: 100%;
    height: 100%;
    position: relative;
    font-size: 24px;
    background: url('../assets/img/banner.jpg') no-repeat;
    background-size: 100% 100%;
    audio{
        width: 0;
        height: 0;
    }
}
</style>
