<template>
    <div class="flex-box">
        <ul class="word-box">
            <li v-for="(item, index) in strArr[0]" :key="index">{{item}}</li>
        </ul>
        <p class="img-box">
            <img :src="imgSrc" alt="" srcset="">
        </p>
    </div>
</template>
<script>
import {strMixins} from '../../src/utls/publicMethods.js';
export default {
    mixins: [strMixins],
    data () {
        return {
            strArr: [],
            imgSrc: ''
        }
    },
    props: {
        imgName: {
            type: String,
            default: ''
        }
    },
    mounted () {
        let str = '相信在前端开发肯定会用到盒子模型，我认为对盒子模型理解的越深，页面布局会更美观，页面优化就会更深入。' +
                   '下面废话不多说，我直接和大家分析一下弹性盒子模型，弹性盒子模型和盒子模型、非标准盒子模型不同在于：弹性盒子模型能够根据子元素自动调节子元素的缩放比例，其中，弹性盒子的属性有这些。' +
                   '首先是把盒子模型变成弹性盒子模型用到的属性是：display: flex。' +
                   '然后就是弹性盒子中子元素的排列顺序：水平方向：从左到右：flex-direction: row;  这种排列方式也是默认。' +
                   '从右到左：flex-direction: row-reverse（如果水平的宽度不够，子元素会等比例压缩。' +
                   '垂直方式：从上到下：flex-direction: column   从下到上：flex-direction: column-reverse;如果垂直方向高度不够，子元素也会等比例压缩。' +
                   '下面就是换行方式：flex-wrap: nowrap；水平方向的换行方式 默认（nowrap） 如果显示不开，就等比例压缩。' +
                   '再下面就是子元素的水平对齐方式：justify-content:: flex-star。' +
                   'flex-start;flex-start 左对。' +
                   'flex-end 右对。' +
                   'center 居中对。' +
                   'space-between 两端对。' +
                   'space-around 等间距对。' +
                   '子元素的垂直对齐方式：align-items: stretch。' +
                   '注意：stretch属性使用要求子元素没有默认高度。';
        this.analysisStr(str);
        this.getImage(this.imgName)
    }
}
</script>
<style lang="less">
.flex-box{
    width: 100%;
    height: 100%;
    .word-box{
        li:nth-child(1){
            line-height: 30px;
            font-size: 24px;
            font-weight: bold;
            margin: 5px 0;
        }
    }
    .img-box{
        img{
            width: 100%;
        }
    }
}
</style>
