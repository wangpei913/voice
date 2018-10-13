<template>
    <div class="css-index-com">
        <ul class="css-box">
            <li>
                <p class="box-title">CSS 概述</p>
                <ul class="box-list">
                    <li>CSS 指层叠样式表 (Cascading Style Sheets)</li>
                    <li>样式定义如何显示 HTML 元素</li>
                    <li>样式通常存储在样式表中</li>                
                    <li>把样式添加到 HTML 4.0 中，是为了解决内容与表现分离的问题</li>
                    <li>外部样式表可以极大提高工作效率</li>
                    <li>外部样式表通常存储在 CSS 文件中</li>
                    <li>多个样式定义可层叠为一</li>
                </ul>
            </li>
            <li>
                <p class="box-title">样式解决了一个普遍的问题</p>
                <ul class="box-list">
                    <li>HTML 标签原本被设计为用于定义文档内容。通过使用 这样的标签，HTML 的初衷是表达“这是标题”、“这是段落”、“这是表格”之类的信息。同时文档布局由浏览器来完成，而不使用任何的格式化标签。</li>
                    <li>由于两种主要的浏览器（Netscape 和 Internet Explorer）不断地将新的 HTML 标签和属性（比如字体标签和颜色属性）添加到 HTML 规范中，创建文档内容清晰地独立于文档表现层的站点变得越来越困难。</li>
                    <li>为了解决这个问题，万维网联盟（W3C），这个非营利的标准化联盟，肩负起了 HTML 标准化的使命，并在 HTML 4.0 之外创造出样式（Style）。</li>                
                    <li>把样式添加到 HTML 4.0 中，是为了解决内容与表现分离的问题</li>
                    <li>所有的主流浏览器均支持层叠样式表。</li>
                </ul>
            </li>
            <li>
                <p class="box-title">样式表极大地提高了工作效率</p>
                <ul class="box-list">
                    <li>样式表定义如何显示 HTML 元素，就像 HTML 3.2 的字体标签和颜色属性所起的作用那样。样式通常保存在外部的 .css 文件中。通过仅仅编辑一个简单的 CSS 文档，外部样式表使你有能力同时改变站点中所有页面的布局和外观。</li>
                    <li>由于允许同时控制多重页面的样式和布局，CSS 可以称得上 WEB 设计领域的一个突破。作为网站开发者，你能够为每个 HTML 元素定义样式，并将之应用于你希望的任意多的页面中。如需进行全局的更新，只需简单地改变样式，然后网站中的所有元素均会自动地更新。</li>
                </ul>
            </li>
            <li>
                <p class="box-title">多重样式将层叠为一个</p>
                <ul class="box-list">
                    <li>样式表允许以多种方式规定样式信息。样式可以规定在单个的 HTML 元素中，在 HTML 页的头元素中，或在一个外部的 CSS 文件中。甚至可以在同一个 HTML 文档内部引用多个外部样式表。</li>
                </ul>
            </li>
            <li>
                <p class="box-title">层叠次序,当同一个 HTML 元素被不止一个样式定义时，会使用哪个样式呢？</p>
                <ul class="box-list">
                    <li>浏览器缺省设置</li>
                    <li>外部样式表</li>
                    <li>内部样式表（位于 head 标签内部）</li>
                    <li>内联样式（在 HTML 元素内部）</li>
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
.css-index-com{
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
        overflow-y: scroll;
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
