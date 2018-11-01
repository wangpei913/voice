<template>
    <div class="fundThematic-page">
        <show-item :wordsObj="wordsObj" :itemImg="itemImg1"></show-item>
    </div>
</template>
<script>
import ShowItem from '../page/showItem';
export default {
    components: {
        'show-item': ShowItem
    },
    data () {
        return {
            wordsObj: {
                one: '专题解决方案',
                two: '依托医保精算技术及专业团队',
                three: '提供行业领先的医保基金管理解决方案'
            },
            itemImg1: require('../assets/img/ztjj.png')
        };
    }
}
</script>
<style lang="less" scoped>
.fundThematic-page{
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
