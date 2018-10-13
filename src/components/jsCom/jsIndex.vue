<template>
    <div class="js-index-com">
        <ul class="css-box">
            <li>
                <p class="box-title">JavaScript历史</p>
                <ul class="box-list">
                    <li>要了解JavaScript，我们首先要回顾一下JavaScript的诞生。</li>
                    <li>在上个世纪的1995年，当时的网景公司正凭借其Navigator浏览器成为Web时代开启时最著名的第一代互联网公司。</li>
                    <li>由于网景公司希望能在静态HTML页面上添加一些动态效果，于是叫Brendan Eich这哥们在两周之内设计出了JavaScript语言。你没看错，这哥们只用了10天时间。</li>
                    <li>为什么起名叫JavaScript？原因是当时Java语言非常红火，所以网景公司希望借Java的名气来推广，但事实上JavaScript除了语法上有点像Java，其他部分基本上没啥关系。</li>
                </ul>
            </li>
            <li>
                <p class="box-title">ECMAScript</p>
                <ul class="box-list">
                    <li>因为网景开发了JavaScript，一年后微软又模仿JavaScript开发了JScript，为了让JavaScript成为全球标准，几个公司联合ECMA（European Computer Manufacturers Association）组织定制了JavaScript语言的标准，被称为ECMAScript标准。</li>
                    <li>所以简单说来就是，ECMAScript是一种语言标准，而JavaScript是网景公司对ECMAScript标准的一种实现。</li>
                    <li>那为什么不直接把JavaScript定为标准呢？因为JavaScript是网景的注册商标。</li>
                    <li>不过大多数时候，我们还是用JavaScript这个词。如果你遇到ECMAScript这个词，简单把它替换为JavaScript就行了。</li>
                </ul>
            </li>
            <li>
                <p class="box-title">JavaScript版本</p>
                <ul class="box-list">
                    <li>JavaScript语言是在10天时间内设计出来的，虽然语言的设计者水平非常NB，但谁也架不住“时间紧，任务重”，所以，JavaScript有很多设计缺陷，我们后面会慢慢讲到。</li>
                    <li>此外，由于JavaScript的标准——ECMAScript在不断发展，最新版ECMAScript 6标准（简称ES6）已经在2015年6月正式发布了，所以，讲到JavaScript的版本，实际上就是说它实现了ECMAScript标准的哪个版本。</li>
                    <li>由于浏览器在发布时就确定了JavaScript的版本，加上很多用户还在使用IE6这种古老的浏览器，这就导致你在写JavaScript的时候，要照顾一下老用户，不能一上来就用最新的ES6标准写，否则，老用户的浏览器是无法运行新版本的JavaScript代码的。</li>
                    <li>不过，JavaScript的核心语法并没有多大变化。我们的教程会先讲JavaScript最核心的用法，然后，针对ES6讲解新增特性。</li>
                </ul>
            </li>
        </ul>
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
.js-index-com{
    width: 100%;
    height: 100%;
    position: relative;
    .css-box{
        width: 90%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        color: #ffffff;
        overflow-y: auto;
        li{
            margin: 3px 0;
            .box-title{
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: 24px;
                font-weight: bold;
            }
            .box-list{
                padding-left: 20px;
            }
        }
    }
    ::-webkit-scrollbar{
        width: 0px;
        background: transparent;
    }
    ::-webkit-scrollbar-track{
        width: 0px;
        background: transparent;
    }
    ::-webkit-scrollbar-thumb{
        width: 0px;
        background: transparent;
    }
    scrollbar-arrow-color: transparent;
    scrollbar-base-color: transparent;
    scrollbar-highlight-color: transparent;
    scrollbar-shadow-color: transparent;
    scrollbar-track-color: transparent;
}
</style>
