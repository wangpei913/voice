// import CSSPage from '../page/CSS.vue';
// import CSSPage from '../page/hrefCSS.vue';
// import JavaScriptPage from '../page/JavaScript.vue';
// import VuePage from '../page/Vue.vue';
// import ReactPage from '../page/React.vue';
import FundPolicy from '../page/FundPolicy';
// import CarouselPage from '../page/Carousel.vue';
export default [
    {
        path: '/fundPolicy',
        name: 'fundPolicy',
        component: FundPolicy
    },
    {
        path: '/fundFore',
        name: 'fundFore',
        component: () => import('../page/FundFore')
    },
    {
        path: '/fundDan',
        name: 'fundDan',
        component: () => import('../page/fundDan')
    },
    {
        path: '/fundThematic',
        name: 'fundThematic',
        component: () => import('../page/FundThematic')
    },
    {
        path: '/reportDown',
        name: 'reportDown',
        component: () => import('../page/reportDown')
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('../page/VoiceMainView')
    }
]