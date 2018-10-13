<template>
    <div class="new-css">
        <div class="change-page">
            <span>欢迎来到第:&nbsp;&nbsp;<i class="page-num">{{iframeActive + 1}}</i>&nbsp;&nbsp;页&nbsp;&nbsp;</span>
            <span>前往：第&nbsp;<el-input v-model="input" size='mini'></el-input>&nbsp;页&nbsp;&nbsp;</span>
            <span>共:&nbsp;&nbsp;{{totalNum}}&nbsp;&nbsp;页</span>
        </div>
        <div class="iframe-parts">
            <keep-alive>
                <iframe width="100%" height="100%" :src="iframeSrc" frameborder="0"></iframe>
            </keep-alive>
        </div>
        <div class="btn-box">
            <div class="state-click up-b" v-if="showLeft" @click="voltiClick('left')">
                <img src="../assets/img/left-btn.svg" alt="" srcset="">
            </div>
            <div class="state-click down-b" v-if="showRight" @click="voltiClick('right')">
                <img src="../assets/img/right-btn.svg" alt="" srcset="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            iframeList: [
                'http://verymuch.site/2018/07/22/CSS%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E7%9A%848%E4%B8%AA%E6%8A%80%E5%B7%A7/',
                'https://isnimitz.com/posts/fonts-module-level4-color-font/',
                'https://juejin.im/post/5b406f40e51d45194832b759',
                'https://juejin.im/post/5ae1a75a6fb9a07ac3632c8c',
                'https://zhuanlan.zhihu.com/p/30624268'
            ],
            iframeSrc: '',
            showLeft: false,
            showRight: false,
            iframeActive: 0,
            input: '',
            totalNum: 0
        }
    },
    mounted () {
        // this.showIframe();
        window.location.href = 'https://zhuanlan.zhihu.com/p/30624268'
    },
    methods: {
        // 展示默认的iframe的url
        showIframe () {
            this.iframeSrc = this.iframeList[0];
            this.showRight = this.iframeList.length > 1 ? true : false;
            this.totalNum = this.iframeList.length;
        },
        // 左右翻页点击事件
        voltiClick (state) {
            if (state === 'left') {
                this.iframeActive--;
                this.iframeActive = this.iframeActive === 0 ? 0 : this.iframeActive;
            } else if (state === 'right') {
                this.iframeActive++;
                this.iframeActive = this.iframeActive === this.iframeList.length ? 0 : this.iframeActive;
            }
            this.iframeSrc = this.iframeList[this.iframeActive];
        }
    },
    watch: {
        iframeActive (val) {
            if (val === 0) {
                this.showLeft = false;
                this.showRight = true;
            } else if (val === this.iframeList.length - 1) {
                this.showLeft = true;
                this.showRight = false;
            } else {
                this.showLeft = true;
                this.showRight = true;
            }
        },
        input (val) {
            let n = Number(val);
            if (!isNaN(n) && n < this.iframeList.length) {
                this.iframeSrc = this.iframeList[n];
                this.iframeActive = n;
            }
        }
    }
}
</script>
<style lang="less">
.new-css{
    width: 100%;;
    height: 100%;
    position: relative;
    .change-page{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: #ffffff;
        .page-num{
            font-style: normal;
            font-size: 24px;
        }
        .el-input{
            width: 50px;
        }
    }
    .iframe-parts{
        width: 100%;
        height: calc(~'100% - 50px');
        margin: 0 auto;
    }
    .btn-box{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        height: 50px;
        width: 100%;
        margin: auto;
        .state-click {
            height: 50px;
            width: 50px;
            border-radius: 50%;
            background: transparent;
            color: #ffffff;
            line-height: 50px;
            text-align: center;
            opacity: .4;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .state-click:hover{
            transform: scale(0.9);
            cursor: pointer;
            opacity: 1;
        }
        .up-b {
            float: left;
        }
        .down-b {
            float: right;
        }
    }
}
</style>
