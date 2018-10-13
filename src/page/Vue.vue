<template>
    <div class="vue-page">
        <div class="magnify-com">
            <!-- <magnify-com :previewImg="minImg" :zoomImg="maxImg"></magnify-com> -->
        </div>
        <div class="other-com">
            <scroll-com :menus="menus"></scroll-com>
            <!-- <drag-com></drag-com> -->
            <!-- <click-sort></click-sort> -->
        </div>
    </div>
</template>
<script>
import magnifyComVue from "../components/vueCom/magnifyCom.vue";
import ScrollCom from "../components/vueCom/vueScroll";
import DragCom from '../components/vueCom/dragCom';
import DragSort from '../components/vueCom/dragSort';
import ClickSort from '../components/vueCom/clickSort';
export default {
  components: {
    "magnify-com": magnifyComVue,
    "scroll-com": ScrollCom,
    'drag-com': DragCom,
    'drag-sort': DragSort,
    'click-sort': ClickSort
  },
  data() {
    return {
      minImg: require("../assets/img/banner_4.png"),
      maxImg: require("../assets/img/banner_4.png"),
      menus: [
        {
          name: "菜单1",
          data: [
            {
              name: "1.1"
            },
            {
              name: "1.2"
            },
            {
              name: "1.3"
            },
            {
              name: "1.4"
            },
            {
              name: "1.5"
            },
            {
              name: "1.6"
            }
          ]
        },
        // {
        //   name: "菜单8",
        //   data: [
        //     {
        //       name: "1.1"
        //     },
        //     {
        //       name: "1.2"
        //     },
        //     {
        //       name: "1.3"
        //     },
        //     {
        //       name: "1.4"
        //     },
        //     {
        //       name: "1.5"
        //     },
        //     {
        //       name: "1.6"
        //     }
        //   ]
        // },
        {
          name: "菜单2",
          data: [
            {
              name: "1.1"
            },
            {
              name: "1.2"
            },
            {
              name: "1.3"
            },
            {
              name: "1.4"
            },
            {
              name: "1.5"
            },
            {
              name: "1.6"
            }
          ]
        },
        {
          name: "菜单3",
          data: [
            {
              name: "1.1"
            },
            {
              name: "1.2"
            },
            {
              name: "1.3"
            },
            {
              name: "1.4"
            },
            {
              name: "1.5"
            },
            {
              name: "1.6"
            }
          ]
        },
        {
          name: "菜单4",
          data: [
            {
              name: "1.1"
            },
            {
              name: "1.2"
            },
            {
              name: "1.3"
            },
            {
              name: "1.4"
            },
            {
              name: "1.5"
            },
            {
              name: "1.6"
            }
          ]
        },
        {
          name: "菜单5",
          data: [
            {
              name: "1.1"
            },
            {
              name: "1.2"
            },
            {
              name: "1.3"
            },
            {
              name: "1.4"
            },
            {
              name: "1.5"
            },
            {
              name: "1.6"
            }
          ]
        },
        {
          name: "菜单6",
          data: [
            {
              name: "1.1"
            },
            {
              name: "1.2"
            },
            {
              name: "1.3"
            },
            {
              name: "1.4"
            },
            {
              name: "1.5"
            },
            {
              name: "1.6"
            }
          ]
        },
        {
          name: "菜单7",
          data: [
            {
              name: "1.1"
            },
            {
              name: "1.2"
            },
            {
              name: "1.3"
            },
            {
              name: "1.4"
            },
            {
              name: "1.5"
            },
            {
              name: "1.6"
            }
          ]
        },
        {
          name: "菜单8",
          data: [
            {
              name: "1.1"
            },
            {
              name: "1.2"
            },
            {
              name: "1.3"
            },
            {
              name: "1.4"
            },
            {
              name: "1.5"
            },
            {
              name: "1.6"
            }
          ]
        },
        {
          name: "菜单9",
          data: [
            {
              name: "1.1"
            },
            {
              name: "1.2"
            },
            {
              name: "1.3"
            },
            {
              name: "1.4"
            },
            {
              name: "1.5"
            },
            {
              name: "1.6"
            }
          ]
        },
        {
          name: "菜单10",
          data: [
            {
              name: "1.1"
            },
            {
              name: "1.2"
            },
            {
              name: "1.3"
            },
            {
              name: "1.4"
            },
            {
              name: "1.5"
            },
            {
              name: "1.6"
            }
          ]
        }
      ]
    }
  }
};
</script>
<style lang="less">
.vue-page {
    width: 100%;
    height: 100%;
    .magnify-com {
        width: 490px;
        float: left;
    }
    .other-com {
        float: right;
        width: calc(~"100% - 495px");
        height: 100%;
    }
}
</style>
