<template>
    <div class="fundDan-page">
        <show-item :wordsObj="wordsObj" :itemImg="itemImg"></show-item>
    </div>
</template>
<script>
import ShowItem from './showItem';
export default {
    components: {
        'show-item': ShowItem
    },
    data () {
        return {
            wordsObj: {
                one: '基金风险管理',
                two: '挖掘费用增长风险点',
                three: ''
            },
            itemImg: require('../assets/img/jjxx.png')
        }
    }
}
</script>
<style lang="less" scoped>
.fundDan-page{
    width: 100%;
    height: 100%;
    position: relative;
    font-size: 24px;
}
</style>
