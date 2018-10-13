<template>
    <div class="carousel-com">
        <ul class="carousel-container">
            <li v-for="(item, index) in list" :key="index">{{item}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    data () {
        return {
            list: [
                'JavaScript',
                'HtmlCSS',
                'Vue',
                'React',
                'Node',
                'Other'
            ],
            transform: ''
        }
    },
    mounted () {
        this.publicCss()
    },
    methods: {
        publicCss () {
            let itemDeg = 360 / this.list.length;
            this.list.forEach((item, index) => {
                this.transform = `transform: rotateY(${itemDeg * index}deg translateZ(280px)`;
            })
            return this.transform;
        }
    }
}
</script>
<style lang='less' scoped>
.carousel-com{
    width: 100%;
    height: 100%;
    perspective: 2000px;
    position: relative;
    .carousel-container {
        width: 200px;
        height: 200px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        /*指定子元素定位在三维空间内*/
        transform-style: preserve-3d;
        /*让所有item的父级元素（即items）旋转，item就是围绕着旋转了*/
        animation: autoMove 10s infinite linear;
        li{
            width: 200px;
            height: 200px;
            background-color: skyblue;
            opacity: .6;
            font-size: 20px;
            line-height: 200px;
            border-radius: 25px;
            text-align: center;
            position: absolute;
        }
        li:nth-child(1){
            transform: rotateY(0deg) translateZ(280px)
        }
        li:nth-child(2){
            transform: rotateY(60deg) translateZ(280px)
        }
        li:nth-child(3){
            transform: rotateY(120deg) translateZ(280px)
        }
        li:nth-child(4){
            transform: rotateY(180deg) translateZ(280px)
        }
        li:nth-child(5){
            transform: rotateY(240deg) translateZ(280px)
        }
        li:nth-child(6){
            transform: rotateY(300deg) translateZ(280px)
        }
    }
    .carousel-container:hover{
        color: #f66;
        animation-play-state: paused;
    }
    /*定义自动旋转的动画*/
    @keyframes autoMove {
        to {
            transform: rotateY(-360deg);
        }
    }
}
.carousel-com:hover{
    color: #f66;
}
</style>
