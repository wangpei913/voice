<template>
    <div class="carousel-page">
        <el-carousel :interval="5000" arrow="always" :autoplay='true'>
            <el-carousel-item class="one-bg">
                <css-com></css-com>
            </el-carousel-item>
            <el-carousel-item class="two-bg">
                <js-com></js-com>
            </el-carousel-item>
            <el-carousel-item class="three-bg">
                <vue-com></vue-com>
            </el-carousel-item>
            <el-carousel-item class="four-bg">
                <react-com></react-com>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
import cssIndexCom from '../components/cssCom/cssIndex';
import jsIndexCom from '../components/jsCom/jsIndex';
import vueIndexCom from '../components/vueCom/vueIndex';
import reactIndexCom from '../components/reactCom/reactIndex';

export default {
    components: {
        'css-com': cssIndexCom,
        'js-com': jsIndexCom,
        'vue-com': vueIndexCom,
        'react-com': reactIndexCom
    },
    data () {
        return {
            imgList: [
                '../assets/img/banner_1.png',
                '../assets/img/banner_2.png',
                '../assets/img/banner_3.png',
                '../assets/img/banner_4.png'
            ]
        }
    }
}
</script>
<style lang="less">
.carousel-page{
    width: 100%;
    height: 100%;
    .el-carousel{
        height: 100%;
        width: 100%;
        .el-carousel__container{
            height: 100%;
            // background: #00ff00;
            img{
                width: 100%;
                height: 100%;
            }
            h1{
                color: #ffffff;
            }
            .one-bg{
                background: url('../assets/img/banner_1.png') no-repeat;
                background-size: 100% 100%;
            }
            .two-bg{
                background: url('../assets/img/banner_2.png') no-repeat;
                background-size: 100% 100%;
            }
            .three-bg{
                background: url('../assets/img/banner_3.png') no-repeat;
                background-size: 100% 100%;
            }
            .four-bg{
                background: url('../assets/img/banner_4.png') no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}
</style>
