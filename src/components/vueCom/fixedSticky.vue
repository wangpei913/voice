<template>
    <div :style="{height}">
        <div :style="{top:top+'px',zIndex,position,width}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import cssSupport from "./utils/css-support";
import { addEvent, removeEvent } from "./utils/EventUtil";
import { getPosition, windowScrollTop } from "./utils/position";
export default {
  name: "sticky",
  props: {
    disabled: {
        type: Boolean,
        default: false
    },
    top: {
        type: Number,
        default: 0
    },
    zIndex: {
        type: Number,
        default: 100
    }
  },
  mounted () {
    if (!this.disabled) {
        this.bindOnScroll();
    }
  },
  beforeDestroy() {
        removeEvent(window, "scroll", this.bindOnScroll);
  },
  data() {
    return {
      position: "static",
      width: "100%",
      height: null
    };
  },
  methods: {
    bindOnScroll() {
      if (cssSupport({ position: "sticky" })) {
        this.position = "sticky";
      } else {
        //不支持sticky
        let lastHiddenTop = windowScrollTop(),
          positionY = 0;
        this.height = this.$el.children[0].offsetHeight + "px";
        let onScroll = () => {
          let hiddenTop = windowScrollTop();
          if (hiddenTop - lastHiddenTop >= 0) {
            if (this.position === "static") {
              //往下滑动并且是默认static定位
              let position = getPosition(this.$el);
              let y = position.y - hiddenTop;
              if (y <= this.top) {
                this.width = this.$el.parentNode.offsetWidth + "px";
                this.position = "fixed";
                this.$emit("fixed", true);
                positionY = position.y;
              }
            }
          } else {
            if (this.position === "fixed") {
              //往上滑动并且是fixed定位
              let y = positionY - hiddenTop;
              if (y > this.top) {
                this.$emit("fixed", false);
                this.position = "static";
              }
            }
          }
          lastHiddenTop = hiddenTop;
        };
        addEvent(window, "scroll", onScroll);
      }
    },
    cancel() {
      this.position = "static";
      this.height = "auto";
      removeEvent(window, "scroll", this.bindOnScroll);
    }
  },
  watch: {
    disabled (val) {
      console.debug(val);
      val ? this.bindOnScroll() : this.cancel();
    }
  }
};
</script>

<style>
</style>
