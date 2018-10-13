<template>
    <div class="react-index-com">
        <ul class="css-box">
            <li>
                <ul class="box-list">
                    <li class="li-title">React是一个JavaScript框架，用于构建“可预期的”和“声明式的”Web用户界面，它已经使Facebook更快地开发Web应用。</li>
                </ul>
            </li>
            <li>
                <p class="box-title">特点</p>
                <ul class="box-list">
                    <li>1、简单简单的表述任意时间点你的应用应该是什么样子的，React将会自动的管理UI界面更新当数据发生变化的时候。</li>
                    <li>2、声明式在数据发生变化的时候，React从概念上讲与点击了F5一样，实际上它仅仅是更新了变化的一部分而已。React是关于构造可重用组件的，实际上，使用React你做的仅仅是构建组建。通过封装，使得组件代码复用、测试以及关注点分离更加容易。</li>
                    <li>另外还有以下注意点：</li>
                    <li>React不是一个MVC框架</li>
                    <li>React不使用模板</li>
                    <li>响应式更新非常简单</li>
                </ul>
            </li>
            <li>
                <p class="box-title">主要原理</p>
                <ul class="box-list">
                    <li>传统的web应用，操作DOM一般是直接更新操作的，但是我们知道DOM更新通常是比较昂贵的。而React为了尽可能减少对DOM的操作，提供了一种不同的而又强大的方式来更新DOM，代替直接的DOM操作。就是Virtual DOM,一个轻量级的虚拟的DOM，就是React抽象出来的一个对象，描述dom应该什么样子的，应该如何呈现。通过这个Virtual DOM去更新真实的DOM，由这个Virtual DOM管理真实DOM的更新。</li>
                    <li>为什么通过这多一层的Virtual DOM操作就能更快呢？ 这是因为React有个diff算法，更新Virtual DOM并不保证马上影响真实的DOM，React会等到事件循环结束，然后利用这个diff算法，通过当前新的dom表述与之前的作比较，计算出最小的步骤更新真实的DOM。</li>
                </ul>
            </li>
            <li>
                <p class="box-title">Components 组件 </p>
                <ul class="box-list">
                    <li>在DOM树上的节点被称为元素，在这里则不同，Virtual DOM上称为commponent。Virtual DOM的节点就是一个完整抽象的组件，它是由commponents组成。</li>
                    <li>注：component 的使用在 React 里极为重要, 因为 components 的存在让计算 DOM diff 更高效。</li>
                </ul>
            </li>
            <li>
                <p class="box-title">State 和 Render</p>
                <ul class="box-list">
                    <li>React是如何呈现真实的DOM，如何渲染组件，什么时候渲染，怎么同步更新的，这就需要简单了解下State和Render了。state属性包含定义组件所需要的一些数据，当数据发生变化时，将会调用Render重现渲染，这里只能通过提供的setState方法更新数据</li>
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
.react-index-com{
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
            .li-title{
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: 16px;
                font-weight: bold;
            }
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
