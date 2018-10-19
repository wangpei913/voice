import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
// import * as Mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        city: '城市名',
        nowPage: {
            page: 1
        },
        routeInfo: {
            isRoute: false,
            routeList: []
        },
        // 控制录音框的显示隐藏
        micBoxDisplay: false,
        // 录音状态信息
        micRecordInfo: '',
        // 语音指令跳转是否成功状态区分
        isSuccess: false,
        // 控制底角麦克风是否可点击
        isClick: true,
        // 显示站内搜索录音框
        showSearchBox: false,
        // 记录站内搜索输入框model值
        recordModelValue: ''
    },
    mutations: {
        setCity (state, n) {
            state.city = n;
            sessionStorage.setItem('cityName', JSON.stringify(n))
        },
        setLoginOut () {
            window.sessionStorage.clear();
        },
        setNowPage ({nowPage}, data) {
            nowPage.page = data;
        },
        setIsRoute ({routeInfo}, data) {
            routeInfo.isRoute = data;
            sessionStorage.setItem('isRoute', JSON.stringify(data));
        },
        setRouteList ({routeInfo}, data) {
            routeInfo.routeList.push(data);
            // sessionStorage.setItem('routeList', JSON.stringify(routeInfo.routeList))
        },
        setMicBoxDisplay (state, data) {
            state.micBoxDisplay = data;
            sessionStorage.setItem('display', JSON.stringify(data));
        },
        setMicRecordInfo (state, msg) {
            state.micRecordInfo = msg;
            sessionStorage.setItem('micRecordInfo', JSON.stringify(msg))
        },
        setIsSuccess (state, data) {
            state.isSuccess = data;
            sessionStorage.setItem('setIsSuccess', JSON.stringify(data))
        },
        setIsClick (state, data) {
            state.isClick = data;
            sessionStorage.setItem('isClick', JSON.stringify(data));
        },
        setSearchBox (state, data) {
            state.showSearchBox = data;
            sessionStorage.setItem('showSearchBox', data);
        },
        setRecordModelValue (state, data) {
            state.recordModelValue = data;
            sessionStorage.setItem('recordModelValue', JSON.stringify(data));
        }
    },
    getters: {
        getCityFn (state) {
            if (sessionStorage.getItem('cityName')) {
                state.city = JSON.parse(sessionStorage.getItem('cityName'))
            }
            return state.city
        },
        getMicBoxDisplay (state) {
            if (sessionStorage.getItem('display')) {
                state.city = JSON.parse(sessionStorage.getItem('display'))
            }
            return state.micBoxDisplay;
        },
        getNowPage: ({nowPage}) => nowPage.page,
        getIsRoute (routeInfo) {
            if (sessionStorage.getItem('isRoute')) {
                routeInfo.isRoute = JSON.parse(sessionStorage.getItem('isRoute'))
            }
            return routeInfo.isRoute;
        },
        // getRouteList (routeInfo) {
        //     if (sessionStorage.getItem('routeList')) {
        //         routeInfo.routeList = JSON.parse(sessionStorage.getItem('routeList'))
        //     }
        //     console.log(routeInfo.routeList, 'routeInfo.routeList')
        //     return routeInfo.routeList;
        // },
        getRouteList: ({routeInfo}) => routeInfo.routeList,
        getMicRecordInfo (state) {
            if (sessionStorage.getItem('micRecordInfo')) {
                state.micRecordInfo = JSON.parse(sessionStorage.getItem('micRecordInfo'))
            }
            return state.micRecordInfo;
        },
        getIsSuccess (state) {
            if (sessionStorage.getItem('setIsSuccess')) {
                state.isSuccess = JSON.parse(sessionStorage.getItem('setIsSuccess'))
            }
            return state.isSuccess
        },
        getIsClick (state) {
            if (sessionStorage.getItem('isClick')) {
                state.isClick = JSON.parse(sessionStorage.getItem('isClick'))
            }
            return state.isClick;
        },
        getSearchBox (state) {
            if (sessionStorage.getItem('showSearchBox')) {
                state.showSearchBox = JSON.parse(sessionStorage.getItem('showSearchBox'))
            }
            return state.showSearchBox;
        },
        getRecordModelValue (state) {
            if (sessionStorage.getItem('recordModelValue')) {
                state.recordModelValue = JSON.parse(sessionStorage.getItem('recordModelValue'));
            }
            return state.recordModelValue;
        }
    },
    actions: {
        setCityName ({commit}, name) {
            commit('setCity', name)
        },
        setOut ({commit}) {
            commit('setLoginOut')
        },
        commitIsRoute ({commit}, state) {
            commit('setIsRoute', state);
        },
        commitMicBoxDisplay ({commit}, state) {
            commit('setMicBoxDisplay', state);
        },
        commitMicRecordInfo ({commit}, state) {
            commit('setMicRecordInfo', state);
        },
        commitRouteList ({commit}, state) {
            commit('setRouteList', state);
        }
    }
})

export default store;