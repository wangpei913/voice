<template>
    <div class="drag-com">
        <div 
            class="square" 
            v-for="(item,$index) in squareList" 
            :key="$index"
		    @dragstart="dragstart($index,$event)"
		    @dragend="dragend($event)" 
            @drop="drop($index,$event)" 
            @dragover="dragover($event)">
            {{item.index}}
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            squareList: [
                {
                    index: 1
                },
                {
                    index: 2
                },
                {
                    index: 3
                },
                {
                    index: 4
                }
            ],
			moveIndex: null,
            targetIndex: null
        }
    },
    mounted () {
        this.updatedata();
    },
    methods: {
        dragstart (index) {
            this.draggable = false; 
            this.moveIndex = index;
        },
        dragover (event) {
            event.preventDefault(); 
        },
        dragend (event) {
            window.sessionStorage.setItem('squareList', JSON.stringify(this.squareList))
        },
        drop (index, event) {
            //阻止默认行为
            event.preventDefault();
            //阻止默认行为
            event.stopPropagation();
            this.targetIndex = index;
            
            //先保存拖动元素index
            var temp = this.squareList[this.moveIndex].index;
            //将拖动元素位置index换成目标元素的index
            this.squareList[this.moveIndex].index = this.squareList[this.targetIndex].index;
            //将目标元素位置index换成拖动元素的index
            this.squareList[this.targetIndex].index = temp;
            console.log(this.targetIndex, 'this.targetIndex')
            console.log(this.moveIndex, 'moveIndex')
        },
        allowDrop (event) {
            event.preventDefault();  
        },
        updatedata () {
            if (window.sessionStorage.getItem('squareList')) {
                this.squareList = JSON.parse(window.sessionStorage.getItem('squareList'))
            } else {
                this.squareList = [
                    {
                        index: 1
                    },
                    {
                        index: 2
                    },
                    {
                        index: 3
                    },
                    {
                        index: 4
                    }
                ]
            }
        }
    }
}
</script>
<style lang="less">
.drag-com{
    width: 100%;
    height: 100%;
    .square{
		width: 200px;
		height: 50px;
		line-height: 50px;
		margin-bottom: 10px;
		text-align: center;
		background-color: #5BC0DE;
		font-size: 20px;
		color: #fff;
	}
}
</style>
