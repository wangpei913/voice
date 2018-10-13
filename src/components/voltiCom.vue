<template>
    <div class="volti-com">
        <div class="state-click up-b">
            <img src="../assets/img/left-btn.svg" alt="" srcset="">
        </div>
        <div class="state-click down-b">
            <img src="../assets/img/right-btn.svg" alt="" srcset="">
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {}
    }
}
</script>
<style lang="less">
.volti-com{
    position: relative;
    .state-click {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        background: transparent;
        color: #ffffff;
        line-height: 50px;
        text-align: center;
        opacity: .4;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .up-b {
        float: left;
    }
    .down-b {
        float: right;
    }
}
</style>
