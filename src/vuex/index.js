import Vue from 'vue';
import Vuex from 'vuex';
// import * as Mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        city: '城市名'
    },
    getters: {
        getCityFn (state) {
            if (sessionStorage.getItem('cityName')) {
                state.city = JSON.parse(sessionStorage.getItem('cityName'))
            }
            return state.city
        }
    },
    mutations: {
        setCity (state, n) {
            state.city = n;
            sessionStorage.setItem('cityName', JSON.stringify(n))
        },
        setLoginOut () {
            window.sessionStorage.clear();
        }
    },
    actions: {
        setCityName ({commit}, name) {
            commit('setCity', name)
        },
        setOut ({commit}) {
            commit('setLoginOut')
        }
    }
})

export default store;