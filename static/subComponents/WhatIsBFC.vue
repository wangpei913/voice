<template>
    <div class="what-is-bfc">
        <p class="page-title">何为BFC？</p>
        <p>BFC(Block Formatting Context)，简单讲，它是提供了一个独立布局的环境，内部不会影响外部布局，反之亦然，每个BFC都遵守同一套布局规则。</p>
        <p class="page-title">如何创建BFC？</p>
        <p class="text-indent">1.float：left|right</p>
        <p class="text-indent">2.position：absolute|fixed</p>
        <p class="text-indent">3.display: table-cell|table-caption|inline-block｜flex | inline-flex</p>
        <p class="text-indent">4.overflow: hidden|scroll|auto</p>
        <p class="page-title">BFC有何特性？</p>
        <p class="text-indent">1.内部的Box会在垂直方向，从顶部开始一个接一个地放置。</p>
        <p class="text-indent">2.Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生叠加</p>
        <p class="text-indent">3.每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。</p>
        <p class="text-indent">4.BFC的区域不会与float box叠加。</p>
        <p class="text-indent">5.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。</p>
        <p class="text-indent">6.计算BFC的高度时，浮动元素也参与计算。</p>
        <p>关于BFC的应用会留到下一篇。敬请期待。。。</p>
    </div>
</template>
<script>
export default {
    data () {
        return {}
    }
}
</script>
<style lang="less">
.what-is-bfc{
    width: 100%;
    .page-title{
        font-size: 16px;
        font-weight: bold;
        margin: 5px 0;
    }
    .text-indent{
        text-indent: 5px;
    }
}
</style>
