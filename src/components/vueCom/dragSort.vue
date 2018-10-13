<template>
    <div class="drag-sort">
        <ul class="drag-box">
            <li 
                class="color-item" 
                v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color'}"
                :key="color.text">
                {{color.text}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data () {
        return {
            colors: [
                {
                    text: "Aquamarine"
                },
                {
                    text: "Hotpink"
                },
                {
                    text: "Gold"
                },
                {
                    text: "Crimson"
                },
                {
                    text: "Blueviolet"
                },
                {
                    text: "Lightblue"
                },
                {
                    text: "Cornflowerblue"
                },
                {
                    text: "Skyblue"
                },
                {
                    text: "Burlywood"
                }
            ]
        }
    },
    mounted () {
        this.getDrag();
    },
    methods: {
        getDrag () {
            this.$dragging.$on('dragged', ({ value }) => {
                // console.log(value)
            })
        }
    }
}
</script>
<style lang="less">
.drag-sort{
    width: 100%;
    height: 100%;
    position: relative;
    .drag-box{
        width: 40%;
        height: 50%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        li{
            float: left;
            width: calc(~'100% / 3');
            height: calc(~'100% / 3');
            display: flex;
            justify-content: center;
            align-items: center;
        }
        li:nth-child(odd){
            background: #f66
        }
        li:nth-child(even){
            background: skyblue;
        }
    }
}
</style>
