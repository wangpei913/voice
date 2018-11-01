<template>
    <div class="login-page">
        <!-- <vue-particles
            style="ba"
            color="#dedede"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="star"
            :particleSize="4"
            linesColor="#dedede"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push">
        </vue-particles> -->
        <div class="login-box">
            <transition enter-active-class="zoomIn" leave-active-class="zoomOutRight">
                <p class="login-animation" v-if="show">
                    <span class="span-input">
                        <el-input v-model="form.name" @keyup.enter="goLogin" placeholder="用户名"></el-input>
                        <input class="pwd-input" type="password" readonly v-model="form.password" @keyup.enter="goLogin" placeholder="密码">
                        <el-button @click="goLogin()">登录</el-button>
                    </span>
                </p>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            form: {
                name: 'xyjn123',
                password: 'wo@ni1314'
            },
            show: false,
            outTimer: null
        }
    },
    mounted () {
        this.outTimer = setTimeout(() => {
            this.show = true;
        }, 1000)
    },
    methods: {
        goLogin () {
            if (this.form.name === '' || this.form.password === '') {
                this.$message.error('用户名或者密码不能为空');
            } else if (this.form.name !== 'xyjn123' || this.form.password !== 'wo@ni1314') {
                this.$message({
                    message: '用户名或者密码不正确',
                    type: 'warning'
                });
            } else {
                let obj = {
                    un: '小雨江南',
                    um: 'xyjn123'
                }
                window.sessionStorage.setItem('user', JSON.stringify(obj))
                this.$router.push({
                    name: 'search'
                });
            }
        }
    }
}
</script>
<style lang="less">
.login-page{
    width: 100%;
    height: 100%;
    background: url('../assets/img/md2.jpeg') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .login-box{
        width: 360px;
        height: 360px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border-radius: 10px;
        .login-animation{
            position: relative;
            width: 350px;
            height: 350px;
            background: transparent;
            .span-input{
                display: block;
                width: 90%;
                height: 75%;
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                margin: auto;
                .pwd-input{
                    display: block;
                    width: 100%;
                    line-height: 40px;
                    margin-bottom: 15px;
                    background: transparent;
                    border: 1px solid #dcdfe6;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    color: #606266;
                    padding: 0 15px;
                    border-radius: 3px;
                }
                .el-input{
                    margin: 15px 0;
                    .el-input__inner{
                        background: transparent;
                    }
                }
                .el-button{
                    width: 100%;
                    color: #409eff;
                    background: transparent;
                }
            }
        }
        .login-animation::before,.login-animation::after{
            content: " ";
            display: block;
            position: absolute;
            width:370px;
            height:370px;
            top: -10px;
            left: -10px;
            border:2px solid #b3d8ff;
            z-index:10;
            box-sizing: border-box;
            border-radius: 10px;
            -webkit-animation: clipAni 8s infinite linear;
        }
        .login-animation::before{
            -webkit-animation-delay: -4s;
        }
        @keyframes  clipAni{
            0%,100%{
                clip:rect(0px,370px,370px,367px);
            }
            25%{
                clip:rect(0px,370px,3px,0px);
            }
            50%{
                clip:rect(0px,3px,370px,0px);
            }
            75%{
                clip:rect(367px,370px,370px,0px);
            }            
        }
    }
}
</style>
