<template>
    <div class="index-page">
        <header>
            <p class="logo-box">
                <router-link :to="{path: '/carousel'}">
                    <span>樂分享</span>
                </router-link>
            </p>
            <ul class="menu-uls">
                <li v-for="(item, index) in menuList" :key="index" @click="menuClick(item, index)" :class="{'lis-active': activeIndex === index}">
                    <span class="frist-span">{{item.menuname}}</span>
                </li>
            </ul>
            <p class="operation-box">
                <el-dropdown @command="loginOut()">
                    <span class="el-dropdown-link">
                        {{userName}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>注销</el-dropdown-item>
                        <el-dropdown-item>更改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </p>
        </header>
        <main>
            <keep-alive>
                <transition enter-active-class="zoomIn" leave-active-class="zoomOutRight">
                    <router-view></router-view>
                </transition>
			</keep-alive>
        </main>
    </div>
</template>
<script>
import carouselPage from '../page/Carousel';
export default {
    components: {
        'carousel-com': carouselPage
    },
    data () {
        return {
            menuList: [
                // {
                //     menuname: 'CSS',
                //     menupath: 'css'
                // },
                // {
                //     menuname: 'JavaScript',
                //     menupath: 'js'
                // },
                // {
                //     menuname: 'Vue',
                //     menupath: 'vue'
                // },
                // {
                //     menuname: 'React',
                //     menupath: 'react'
                // },
                {
                    menuname: 'Other',
                    menupath: 'other'
                },
                // {
                //     menuname: 'Echarts',
                //     menupath: 'echarts'
                // },
                {
                    menuname: 'Demo',
                    menupath: 'fundFore'
                },
                {
                    menuname: 'Voice',
                    menupath: 'voice'
                }
                // {
                //     menuname: 'Practice',
                //     menupath: 'practice'
                // }
            ],
            activeIndex: '',
            userName: JSON.parse(window.sessionStorage.getItem('user')).un,
            showSubMenu: false
        }
    },
    created () {},
    mounted () {},
    watch: {
        userName (newval, oldval) {
            if (newval !== oldval) {
                this.$router.push({
                    name: 'carousel'
                });
            }
        }
    },
    methods: {
        // 菜单点击事件
        menuClick (val, index) {
            this.activeIndex = index;
            if (val.subMenu && val.subMenu.length > 0) {
                this.showSubMenu = true;
            } else {
                this.showSubMenu = false;
                this.$router.push({
                    name: val.menupath
                });
            }
        },
        // 二级菜单点击事件
        secondClick (val, index) {
            if (val.subMenu && val.subMenu.length > 0) {
                this.showSubMenu = true;
            } else {
                this.showSubMenu = false;
                this.$router.push({
                    name: val.menupath
                });
            }
        },
        // 注销点击事件
        loginOut () {
            this.$router.push({
                name: 'login'
            });
            window.sessionStorage.clear();
        }
    },
    beforeRouteUpdate (to, from, next) {
        next(true);
    }
}
</script>
<style lang="less">
.index-page{
    width: calc(~'100% - 20px');
    height: calc(~'100% - 20px');
    position: relative;
    margin: 10px;
    header{
        width: 100%;
        height: 70px;
        color: #ffffff;
        background: #0082df;
        .logo-box{
            width: 10%;
            height: 100%;
            float: left;
            text-align: center;
            line-height: 70px;
            span{
                font-size: 24px;
                font-style: italic;
                font-weight: bold;
                color: #ffffff;
            }
        }
        .menu-uls{
            width: 80%;
            height: 100%;
            margin: 0 auto;
            float: left;
            position: relative;
            li{
                float: left;
                padding: 0 3%;
                text-align: center;
                line-height: 70px;
                font-size: 16px;
                font-weight: bold;
                &.lis-active{
                    color: #1ec67a;
                    background: #1169af;
                }
            }
            li:hover{
                cursor: pointer;
                color: #1ec67a;
                background: #1169af;
            }
        }
        .operation-box{
            width: 10%;
            height: 100%;
            float: right;
            text-align: center;
            line-height: 70px;
            .el-dropdown{
                color: #ffffff;
            }
        }
    }
    main{
        width: 100%;
        height: calc(~'100% - 70px');
        overflow-y: auto;
    }
}
</style>
