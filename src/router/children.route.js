// import CSSPage from '../page/CSS.vue';
import CSSPage from '../page/hrefCSS.vue';
import JavaScriptPage from '../page/JavaScript.vue';
import VuePage from '../page/Vue.vue';
import ReactPage from '../page/React.vue';
import OtherPage from '../page/Other.vue';
import CarouselPage from '../page/Carousel.vue';
export default [
    {
        path: '/carousel',
        name: 'carousel',
        component: CarouselPage
    },
    {
        path: '/css',
        name: 'css',
        component: CSSPage,
    },
    {
        path: '/js',
        name: 'js',
        component: JavaScriptPage
    },
    {
        path: '/vue',
        name: 'vue',
        component: VuePage
    },
    {
        path: '/react',
        name: 'react',
        component: ReactPage
    },
    {
        path: '/other',
        name: 'other',
        component: OtherPage
    },
    {
        path: '/echarts',
        name: 'echarts',
        component: () => import('../page/Echarts')
    },
    {
        path: '/fundFore',
        name: 'fundFore',
        component: () => import('../page/Demo')
    },
    {
        path: '/voice',
        name: 'voice',
        component: () => import('../page/Voice')
    },
    {
        path: '/practice',
        name: 'practice',
        component: () => import('../page/Practice')
    }
]