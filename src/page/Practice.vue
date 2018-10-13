<template>
    <div class="practice-page">Practice</div>
</template>
<script>
/**
 * 记录数组去重的多种方法
 */
export default {
    data () {
        return {
            arr: [1, 1, true, true, 2, 2, 4, 3, 4, 5, null, null, NaN, NaN, undefined, undefined, {}, {}]
        }
    },
    mounted () {
        let s = this.hasOwnPropertyUnique(this.arr);
        console.log(s)
    },
    methods: {
        // ES6 --- set
        // 优点：代码少，缺点：不能去除{}
        setUnique (arr) {
            return Array.from(new Set(arr))
        },
        // es5 --- 利用for嵌套for，然后splice去重
        // 原理：双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。
        // 缺陷：不能去除NaN,{}
        spliceUnique (arr) {
            for (let i = 0; i < arr.length; i++) {
                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i] === arr[j]) {
                        arr.splice(j, 1);
                        j--;
                    }
                }
            }
            return arr;
        },
        // 利用indexOf去重
        // 原理：新建一个空的结果数组，for 循环原数组，判断结果数组是否存在当前元素，如果有相同的值则跳过，不相同则push进数组。
        // 不足：不能去除NaN, {}
        indexOfUnique (arr) {
            if (!Array.isArray(arr)) {
                console.log('type error');
                return;
            }
            let array = [];
            for (let i = 0; i < arr.length; i++) {
                if (array.indexOf(arr[i]) === -1) {
                    array.push(arr[i])
                }
            }
            return array;
        },
        // 利用hasOwnProperty,判断是否存在对象
        // 能去除NaN,{}
        hasOwnPropertyUnique (arr) {
            let obj = {};
            return arr.filter(function(item, index, arr){
                return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
            })
        },
        arrayNonRepeatfy (arr) {
            let map = new Map();
            let array = new Array();  // 数组用于返回结果
            for (let i = 0; i < arr.length; i++) {
                if(map .has(arr[i])) {  // 如果有该key值
                    map .set(arr[i], true); 
                } else { 
                    map .set(arr[i], false);   // 如果没有该key值
                    array .push(arr[i]);
                }
            } 
            return array ;
        }
    }
}
</script>
<style lang="less" scoped>
.practice-page{
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
