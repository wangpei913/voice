<template>
    <div class="bfc-page">
        <p class="page-title">BFC引起margin塌陷</p>
        <p>在常规流中，盒子在垂直方向上从上到下排列。垂直方向之间的距离由单个margin值决定（其中还有计算公式），而不是两个元素垂直方向的margin值之和。</p>
        <p>下面让我们看一个效果来加深理解：</p>
        <div class="container">
            <p>Sibling 1 --- p元素</p>
            <p>Sibling 2 --- p元素</p>
        </div>
        <p>如上图，其代码结构:</p>
        <p>
            .container {
                width: 30%;
                background-color: red;
                overflow: hidden;
                p {
                    background-color: lightgreen;
                    margin: 10px 0;
                }
            }
        </p>
        <p>
            看上去，两个p元素之间的距离应该是20px，但实际上是10px，这就是“margin塌陷”。上面提到的计算公式就是:
            <span class="page-title">两元素之间的距离始终以最大margin值决定，若相等则等于其中一个值。</span>
        </p>
        <p class="page-title">使用BFC阻止margin塌陷</p>
        <p>这看上去与第一个作用有点矛盾，但是请大家记住，造成margin塌陷的原因是相邻的盒子属于同一个BFC。如果它们不在一个BFC中，就不会塌陷，所以我们要使它们存在于两个BFC中。</p>
        <div class="container">
            <p>Sibling 1</p>
            <p>Sibling 2</p>
            <div class="newBFC">
                <p>Sibling 3</p>
            </div>
        </div>
        <p class="page-title">使用BFC来包含浮动块</p>
        <p>在日常工作中经常会遇到一个容器包含浮动的子元素，此时子元素脱离常规文档流，父容器没有高度。一般的解决方法是使用“clearfix”，但是同样可以使用BFC来解决。</p>
        <div class="container2">
            <div>Sibling</div>
            <div>Sibling</div>
        </div>
        <p>
            .container2 {
                background-color: green;
            }

            .container2 div {
                float: left;
                background-color: lightgreen;
                margin: 10px;
            }
        </p>
        <p class="page-title">稍加改造</p>
        <p>
            .container3 {
                overflow: hidden; /* creates block formatting context */
                background-color: green;
            }

            .container3 div {
                float: left;
                background-color: lightgreen;
                margin: 10px;
            }
        </p>
        <div class="container3">
            <div>Sibling</div>
            <div>Sibling</div>
        </div>
        <p class="page-title">使用BFC阻止文本环绕</p>
        <p>Figure1的文本环绕图片，但正常情况下，我们需要实现Figure2中排版。可以使用margin来实现，但是我们依旧可以使用BFC来完成。</p>
        <div class="container4">
            <div class="floated">
                Floated div
            </div>
            <p>
                Quae hic ut ab perferendis sit quod architecto, 
                dolor debitis quam rem provident aspernatur tempora
                expedita.
            </p>
        </div>
        <p class="page-title">使用BFC进行多列布局</p>
        <p>在一个容器中我们要进行多列布局，并且覆盖整个宽度，有时候最后一列会错位。原因是一些浏览器会四舍五入值导致最后总宽度之和大于容器的宽度。此时就可以用BFC解决：</p>
        <p>
            .container5{
                .column {
                    width: 31.33%;
                    background-color: green;
                    float: left;
                    margin: 0 1%;
                }
                .column:last-child {
                    float: none;
                    overflow: hidden; 
                }
            }
        </p>
        <div class="container5">
            <div class="column">column 1</div>
            <div class="column">column 2</div>
            <div class="column">column 3</div>
        </div>
        <p>在flex没有出现之前是没有好的办法解决此类问题的。</p>
        <p>上面就总结了一些用法，肯定还有别的使用场景，以后慢慢总结。</p>
        <p>参考：</p>
        <p>http://www.sitepoint.com/understanding-block-formatting-contexts-in-css/</p>
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
.bfc-page{
    width: 100%;
    height: 100%;
    .container {
        width: 30%;
        background-color: red;
        overflow: hidden; /* creates a block formatting context */
        p {
            background-color: lightgreen;
            margin: 10px 0;
        }
        .newBFC {
            overflow: hidden;  /* creates new block formatting context */
        }
    }
    .container2 {
        background-color: green;
    }

    .container2 div {
        float: left;
        background-color: lightgreen;
        margin: 10px;
    }
    .container3 {
        overflow: hidden;
        background-color: green;
    }

    .container3 div {
        float: left;
        background-color: lightgreen;
        margin: 10px;
    }
    .container4{
        width: 30%;
        .floated{
            float:left;
        }
        p{
            overflow:hidden;
        }
    }
    .container5{
        .column {
            width: 31.33%;
            background-color: green;
            float: left;
            margin: 0 1%;
        }

        /* Establishing a new block formatting 
        context in the last column */
        .column:last-child {
            float: none;
            overflow: hidden; 
        }
    }
    .page-title{
        font-size: 16px;
        font-weight: bold;
        margin: 5px 0;
    }
}
</style>
