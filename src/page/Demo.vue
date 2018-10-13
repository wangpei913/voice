<template>
    <div class="demo-page">
        <el-row>
            <el-col :span="5">
                <div class="line-div">
                    <span class="line1"></span>
                    <!-- <span class="line2"></span>
                    <span class="line3"></span>
                    <span class="line4"></span>
                    <span class="line5"></span>
                    <span class="line6"></span>
                    <span class="line7"></span>
                    <span class="line8"></span>
                    <span class="line9"></span>
                    <span class="line10"></span>
                    <span class="line11"></span>
                    <span class="line12"></span> -->
                </div> 
            </el-col>
            <el-col :span="5">1</el-col>
            <el-col :span="5">1</el-col>
        </el-row>
        <div class="play-parts" @click="clickMike()">
            <div class="up">
                <span class="voice-status" v-if="voiceprint">
                    <i class="icon-font el-icon-loading"></i>
                    正在录音......
                </span>
            </div>
            <div class="down">
                <div class="dot"></div>
                <div class="pulse" v-if="voiceprint"></div>
                <div class="pulse1" v-if="voiceprint"></div>
            </div>
            <embed :src="voiceSrc" type="audio/x-wav" autostart="true" width="0" height="0" loop="false"/>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            voiceprint: false,
            recorder: '',
            voiceSrc: ''
        }
    },
    methods: {
        clickMike () {
            this.voiceprint = !this.voiceprint;
        }
    },
    watch: {
        voiceprint (val) {
            if (val === true) {
                let _that = this;
                HZRecorder.get(function (rec) {
                    _that.recorder = rec;
                    _that.recorder.start();
                })
            } else if (val === false) {
                let _that = this;
                _that.recorder.stop();
                let url = _that.recorder.getSplitBlob();
                _that.voiceSrc = url;
            }
        }
    }
}
</script>
<style lang="less" scoped>
.demo-page{
    width: 100%;
    height: 100%;
    position: relative;
    .el-row{
        .el-col{
            .line-div{
                display: block;
                height: 50px;
                line-height: 70px;
                text-align: center;
                position: relative;
                span {
                    display: inline-block;
                    width: 10px;
                    margin: 0 2px;
                    background: #9b59b6;
                }
                .line1 {
                    animation: line 0.6s infinite ease-in-out alternate;
                }
                .line2 {
                    animation: line 0.6s 0.2s infinite ease-in-out alternate;
                }
                .line3 {
                    animation: line 0.6s 0.4s infinite ease-in-out alternate;
                }
                .line4 {
                    animation: line 0.6s 0.6s infinite ease-in-out alternate;
                }
                .line5 {
                    animation: line 0.6s 0.8s infinite ease-in-out alternate;
                }
                .line6 {
                    animation: line 0.6s 1s infinite ease-in-out alternate;
                }
                .line7 {
                    animation: line 0.6s 1.2s infinite ease-in-out alternate;
                }
                .line8 {
                    animation: line 0.6s 1.4s infinite ease-in-out alternate;
                }
                .line9 {
                    animation: line 0.6s 1.6s infinite ease-in-out alternate;
                }
                .line10 {
                    animation: line 0.6s 1.8s infinite ease-in-out alternate;
                }
                .line11 {
                    animation: line 0.6s 2s infinite ease-in-out alternate;
                }
                .line12 {
                    animation: line 0.6s 2.2s infinite ease-in-out alternate;
                }
            }
        }
    }
    .play-parts{
        width: 100px;
        height: 130px;
        position: absolute;
        right: 20px;
        bottom: 20px;
        .up{
            width: 100%;
            height: 30px;
        }
        .down{
            width: 100%;
            height: 70px;
            .dot{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                margin: auto;
                background: url('../assets/img/mike.svg') no-repeat;
                background-size: 100% 100%;
            }
            .pulse {
                position: absolute;
                width: 70px;
                height: 70px;
                top: 0;
                right: 0;
                bottom: 30%;
                left: 0;
                margin: auto;
                border: 2px solid #3399ff;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                z-index: 1;
                opacity: 0;
                -webkit-animation: warn 2s ease-out;
                -moz-animation: warn 2s ease-out;
                animation: warn 2s ease-out;
                -webkit-animation-iteration-count: infinite;
                -moz-animation-iteration-count: infinite;
                animation-iteration-count: infinite;
            }
            .pulse1 {
                position: absolute;
                width: 70px;
                height: 70px;
                top: 0;
                right: 0;
                bottom: 35%;
                left: 0;
                margin: auto;
                border: 2px solid #3399ff;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                z-index: 1;
                opacity: 0;
                -webkit-animation: warn1 2s ease-out;
                -moz-animation: warn1 2s ease-out;
                animation: warn1 2s ease-out;
                -webkit-animation-iteration-count: infinite;
                -moz-animation-iteration-count: infinite;
                animation-iteration-count: infinite;
            }
        }
    }
}
    @keyframes warn {
        0% {
            transform: scale(0.3);
            -webkit-transform: scale(0.3);
            opacity: 0.0;
        }

        25% {
            transform: scale(0.3);
            -webkit-transform: scale(0.3);
            opacity: 0.1;
        }

        50% {
            transform: scale(0.5);
            -webkit-transform: scale(0.5);
            opacity: 0.3;
        }

        75% {
            transform: scale(0.8);
            -webkit-transform: scale(0.8);
            opacity: 0.5;
        }

        100% {
            transform: scale(1);
            -webkit-transform: scale(1);
            opacity: 0.0;
        }
    }

    @keyframes warn1 {
        0% {
            transform: scale(0.3);
            -webkit-transform: scale(0.3);
            opacity: 0.0;
        }

        25% {
            transform: scale(0.3);
            -webkit-transform: scale(0.3);
            opacity: 0.1;
        }

        50% {
            transform: scale(0.3);
            -webkit-transform: scale(0.3);
            opacity: 0.3;
        }

        75% {
            transform: scale(0.5);
            -webkit-transform: scale(0.5);
            opacity: 0.5;
        }

        100% {
            transform: scale(0.8);
            -webkit-transform: scale(0.8);
            opacity: 0.0;
        }
    }
@keyframs line {
    from {
        height: 0;
    }
    to {
        height: 30px;
    }
}

@-webkit-keyframes line {
    from {
        height: 0;
    }
    to {
        height: 30px;
    }
} 
</style>
