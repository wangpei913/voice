<template>
    <div class="vue-index-com">
        <ul class="css-box">
            <li>
                <p class="box-title">渐进式框架Vue</p>
                <ul class="box-list">
                    <li>vue官网说：Vue.js（读音 /vjuː/，类似于 view） 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。 </li>
                    <li>渐进式我个人理解就是阶梯式向前。vue是轻量级的，它有很多独立的功能或库，我们会根据我们的项目来选用vue的一些功能。就像我们开发项目时如果只用到vue的声明式渲染，我就只用vue的声明渲染，而我们要用他的组件系统，我们可以引用它的组件系统。</li> 
                </ul>
            </li>
            <li>
                <p class="box-title">vue中两个核心点</p>
                <ul class="box-list">
                    <li>
                        1.响应式数据绑定 
                        当数据发生变化是，vue自动更新视图 
                        它的原理是利用了 Object.definedProperty 中的setter/getter 代理数据，监控对数据的操作。（这也是为什么vue不支持ie8 以及更早的ie浏览器的原因）
                    </li>
                    <li>
                        2.组合的视图组件
                        ui页面映射为组件书
                        划分组件可维护、可重用、可测试
                    </li>
                </ul>
            </li>
            <li>
                <p class="box-title">虚拟DOM</p>
                <ul class="box-list">
                    <li>
                        js的运行速度已经很快了，然而大量的DOM 操作就会变得很慢，但是前端本身就是要通过JS处理DOM 来更新视图数据的。 这样在更新数据后会重新渲染页面，这样就造成在没有改变数据的地方也重新渲染了DOM节点。这样性能方面就会很受影响。
                        利用在内存中生成与真实DOM与之对应的数据结构，这个在内存中生成的结构称之为虚拟DOM。 
                        当数据发生变化时，能够智能的计算出重新渲染组件的最小代价并应用到DOM操作上。vue就是利用了这一点。（vue 渲染组件的步骤图：）
                    </li>
                </ul>
            </li>
            <li>
                <p class="box-title">MVVM模式</p>
                <ul class="box-list">
                    <li>
                        可能你经常听说MVC 模式 和MVVM 模式。 
                        angular 就是所谓的 MVC 模式的框架，model 、view、controller。 
                        而vue 是 MVVM 模式的框架，即 
                        M： model （数据层，也就是指数据（前端是js）） 
                        V：view ( 也就是指DOM层 或用户界面 ) 
                        VM : view-model (处理数据和界面的中间层，也就是指Vue)
                    </li>
                </ul>
            </li>
            <li>
                <p class="box-title">Vue实例</p>
                <ul class="box-list">
                    <li>
                        每一个应用都是通过Vue 这个构造函数来创建根实例启动的（new Vue()） 
                        构造函数中需要传入一些选项对象。包含挂在元素、数据、模板、方法等等、 
                        这些只是一部风API ，更多API请关注：https://cn.vuejs.org/v2/api/
                    </li>
                </ul>
            </li>
            <li>
                <p class="box-title">声明式渲染（命令式渲染）</p>
                <ul class="box-list">
                    <li>
                        渲染时分为 声明式渲染 和 命令式渲染
                        1. Vue 是声明式渲染的， 
                        也就是 只需要关心 声明在哪里（where） 做什么（what），而不需要关心是如何实现的（how） 
                        2.命令式渲染 
                        需要通过具体的代码表达在哪里（where） 做什么（what）,如何实现（how）
                    </li>
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
.vue-index-com{
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
