<template>
	<div>
		<div class="pc-header">
			<div class="container">
				<router-link :to="{path: '/'}">
					<img class="head-logo" src="../assets/logo.png" alt="">
				</router-link>
				<ul class="head-nav">
					<li>{{ username }}</li>
					<li v-if="username !== ''" class="line"></li>
					<li v-if="username !== ''">退出</li>
					<li v-if="username !== ''" class="line"></li>
					<li v-if="username === ''">登录</li>
					<li v-if="username === ''" class="line"></li>
					<li v-if="username === ''">注册</li>
					<li v-if="username === ''" class="line"></li>
					<li @click="aboutClick">关于</li>
				</ul>
			</div>
		</div>
		<div class="pc-content">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				isShowAboutDialog: false,
				isShowLogDialog: false,
				isShowRegDialog: false,
				username: ''
			}
		},
		methods: {
			aboutClick () {
				this.isShowAboutDialog = true
			},
			logClick () {
				this.isShowLogDialog = true
			},
			regClick () {
				this.isShowRegDialog = true
			},
			closeDialog (str) {
				this[str] = false
			},
			onSuccessLog (data) {
				this.username = data.username
				this.closeDialog('isShowLogDialog')
			},
			quit () {
				this.username = ''
			}
		}
	}
</script>

<style>
	.pc-header {
		background: #363636;
		color: #b2b2b2;
		height: 90px;
		line-height: 90px;
		width: 100%;
	}
	.head-logo {
		float: left;
		margin-top: 20px;
		width: 50px;
	}
	.head-nav {
		float: right;
	}
	.head-nav {
		margin-top: 30px;
		height: 30px;
		line-height: 30px;
	}
	.head-nav li {
		cursor: pointer;
		float: left;
	}
	.head-nav .line {
		margin: 9px 20px;
		width: 1px;
		height: 12px;
		background: #ddd;
	}
	.pc-footer {
		text-align: center;
		height: 80px;
		width: 100%;
		line-height: 80px;
		background: #e3e4e8;
		clear: both;
		margin-top: 30px;
	}
	.container {
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
	}
	.hr {
		height: 1px;
		width: 100%;
		background: #ddd;
	}
	.button {
		background: #4fc08d;
		color: #fff;
		display: inline-block;
		padding: 10px 20px;
		cursor: pointer;
	}
	.button:hover {
		background: #4fc08d;
	}
	.g-form-line {
		padding: 15px 0;
	}
	.g-form-label {
		width: 100px;
		font-size: 16px;
		display: inline-block;
	}
	.g-form-input {
		display: inline-block;
	}
	.g-form-input input {
		height: 30px;
		width: 200px;
		line-height: 30px;
		vertical-align: middle;
		padding: 0 10px;
		border: 1px solid #ccc;
	}
	.g-form-btn {
		padding-left: 100px;
	}
	.g-form-error {
		color: red;
		padding-left: 15px;
	}
</style>