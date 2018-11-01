<template>
    <div class="show-item">
        <div class="item-left">
            <ul class="left-ul">
                <li>{{wordsObj.one}}</li>
                <li>{{wordsObj.two}}</li>
                <li>{{wordsObj.three}}</li>
            </ul>
        </div>
        <div class="item-right">
            <div class="right-div"><img :src="itemImg" alt="" srcset=""></div>
        </div>
        <audio class="audio-parts" controlsList="nodownload" :src="pubVoiceSrc" controls autoplay ref="audio" width="0" height="0"></audio>
    </div>
</template>
<script>
import {mixins} from '../utls/index';
export default {
    mixins: [mixins],
    data () {
        return {
            pubVoiceSrc: ''
        }
    },
    props: {
        itemImg: {
            type: String
        },
        wordsObj: {
            type: Object
        }
    },
    mounted () {
        let word = this.wordsObj.one + this.wordsObj.two + this.wordsObj.three;
        this.publicVoice(word);
    }
}
</script>
<style lang="less" scoped>
.show-item{
    color: #ffffff;
    width: 100%;
    height: 100%;
    position: relative;
    background: url('../assets/img/bg.png') no-repeat;
    background-size: 100% 100%;
    .item-left{
        width: 50%;
        height: 100%;
        float: left;
        position: relative;
        .left-ul{
            width: 60%;
            height: 120px;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            display: flex;
            flex-direction: column;
            li:nth-child(1){
                flex: 1;
                display: flex;
                align-items: center;
                color: rgb(38, 215, 241);
                letter-spacing: 2px;
                font-size: 32px;
            }
            li:nth-child(2), li:nth-child(3){
                flex: 1;
                display: flex;
                align-items: center;
                font-size: 16px;
                overflow: hidden;
                white-space: nowrap;
            }
        }
    }
    .item-right{
        width: 50%;
        height: 100%;
        float: right;
        position: relative;
        .right-div{
            width: 70%;
            height: 50%;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    audio{
        width: 0;
        height: 0;
    }
}
</style>
