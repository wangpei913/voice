<template>
    <div class="width-height">
        <p class="page-title">动态实现宽高相等以及其它比例，一般使用的是JS。这次介绍一种使用纯CSS实现的方法。</p>
        <p class="page-title">0.基础结构与样式：</p>
        <div class="box">box1</div>
        <p class="page-title">1.宽：高 ＝ 1:1</p>
        <div class="box1">box1</div>
        <p class="page-title">2.宽：高 ＝ 1:2</p>
        <div class="box2">box1</div>
        <p class="page-title">3.宽：高 ＝ 2:1</p>
        <div class="box3">box1</div>
        <p class="page-title">动态修改一下宽度，会发现高度会自动跟着变化，并保持相应比例。原理很简单：</p>
        <p class="page-title">首先看下padding的取值：</p>
        <p class="text-indent">length: 长度表示法</p>
        <p class="text-indent">percentage: 百分比表示法,padding百分比的计算是基于生成的框的包含块的宽度</p>
        <p class="text-indent">auto: 自动</p>
        <p class="page-title">百分比的参考值是包含块的宽度，所以padding值的变化会随着宽度变化，其实颜色块的高度padding撑起来的。</p>
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
.width-height{
    width: 100%;
    .page-title{
        font-size: 16px;
        font-weight: bold;
        margin: 5px 0;
    }
    .text-indent{
        text-indent: 5px;
    }
    .box{
        width: 100px;
        background-color:#ddd;
    }
    .box1{
        width: 100px;
        background-color:#ddd;
    }
    .box1:after{
        content:'';
        display:block;
        padding-top:100%;
    }
    .box2{
        width: 100px;
        background-color:#ddd;
    }
    .box2:after{
        content:'';
        display:block;
        padding-top:200%;
    }
    .box3{
        width: 100px;
        background-color:#ddd;
    }
    .box3:after{
        content:'';
        display:block;
        padding-top:50%;
    }
}
</style>
