<template>
    <div class="react-page">
        <!-- <el-input v-model="message"></el-input>
        <p>{{FN}}</p>
        <p>{{LN}}</p>
        <p>{{fullName}}</p>
        <ul>
            <li v-for="(item, index) in cityArr" :key="index" @click="clickCity(index)">
                {{item}}
            </li>
        </ul>
        <el-row :gutter="32">
            <el-col :xs="8" :sm="6" :md="4" :lg="3"><div class="grid-content bg-purple">1</div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9"><div class="grid-content bg-purple-light">2</div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9"><div class="grid-content bg-purple">3</div></el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3"><div class="grid-content bg-purple-light">4</div></el-col>
        </el-row> -->
        <v-table
            is-vertical-resize
            is-horizontal-resize
            style="width:100%;height:100%;"
            :multiple-sort="false"
            :title-rows="tableConfig.titleRows"
            :columns="tableConfig.columns"
            :table-data="tableConfig.tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            @sort-change="sortChange"
            :cell-edit-done="cellEditDone"
            :paging-index="(pageIndex-1)*pageSize">
        </v-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            pageIndex:1,
            pageSize:20,
            message: 'Hello World',
            FN: 'li',
            LN: 'san',
            cityArr: ['北京', '上海', '广州', '深圳', '茂名', '张家界', '清远', '汕头','佛山'],
            tableDate: [
                {
                    name: "赵伟",
                    img: "1.jpg",
                    gender: "男",
                    nickname: "赵",
                    birthday: "1963-7-9",
                    height: "183",
                    email: "zhao@gmail.com",
                    tel: "156*****1987",
                    hobby: "钢琴、书法、唱歌",
                    address: "上海市黄浦区金陵东路569号17楼",
                    job: "码农"
                }, {
                    name: "李伟",
                    img: "1.jpg",
                    gender: "男",
                    nickname: "李",
                    birthday: "2003-12-7",
                    height: "161",
                    email: "li@gmail.com",
                    tel: "182*****1538",
                    hobby: "钢琴、书法、唱歌",
                    address: "上海市奉贤区南桥镇立新路12号2楼",
                    job: "码农"
                }, {
                    name: "孙伟",
                    img: "1.jpg",
                    gender: "女",
                    nickname: "孙",
                    birthday: "1993-12-7",
                    height: "186",
                    email: "sun@gmail.com",
                    tel: "161*****0097",
                    hobby: "钢琴、书法、唱歌",
                    address: "上海市崇明县城桥镇八一路739号",
                    job: "码农"
                }, {
                    name: "周伟",
                    img: "1.jpg",
                    gender: "女",
                    nickname: "周",
                    birthday: "1993-12-7",
                    height: "189",
                    email: "zhou@gmail.com",
                    tel: "197*****1123",
                    hobby: "钢琴、书法、唱歌",
                    address: "上海市青浦区青浦镇章浜路24号",
                    job: "码农"
                }, {
                    name: "吴伟",
                    img: "1.jpg",
                    gender: "男",
                    nickname: "吴",
                    birthday: "1993-12-7",
                    height: "160",
                    email: "wu@gmail.com",
                    tel: "183*****6678",
                    hobby: "钢琴、书法、唱歌",
                    address: "上海市松江区乐都西路867-871号",
                    job: "码农"
                }, {
                    name: "冯伟",
                    img: "1.jpg",
                    gender: "女",
                    nickname: "冯",
                    birthday: "1993-12-7",
                    height: "168",
                    email: "feng@gmail.com",
                    tel: "133*****3793",
                    hobby: "钢琴、书法、唱歌",
                    address: "上海市金山区龙胜路143号一层",
                    job: "码农"
                }, {
                    name: "褚伟",
                    img: "1.jpg",
                    gender: "男",
                    nickname: "褚",
                    birthday: "1993-12-7",
                    height: "170",
                    email: "zhu@gmail.com",
                    tel: "189*****2345",
                    hobby: "钢琴、书法、唱歌",
                    address: "上海市闵行区都市路2988号2楼",
                    job: "码农"
                }, {
                    name: "蒋伟",
                    img: "1.jpg",
                    gender: "女",
                    nickname: "蒋",
                    birthday: "1993-12-7",
                    height: "178",
                    email: "jiang@gmail.com",
                    tel: "166*****2267",
                    hobby: "钢琴、书法、唱歌",
                    address: "上海市浦东新区惠南镇人民西路85号建行大楼2楼",
                    job: "码农"
                }, {
                    name: "韩伟",
                    img: "1.jpg",
                    gender: "女",
                    nickname: "韩",
                    birthday: "1993-12-7",
                    height: "166",
                    email: "han@gmail.com",
                    tel: "177*****2222",
                    hobby: "钢琴、书法、唱歌",
                    address: "上海市浦东新区东方路818号建行一楼",
                    job: "码农"
                }, {
                    name: "秦伟",
                    img: "1.jpg",
                    gender: "男",
                    nickname: "秦",
                    birthday: "1893-12-6",
                    height: "175",
                    email: "qin@gmail.com",
                    tel: "187*****9999",
                    hobby: "钢琴、书法、唱歌",
                    address: "上海市浦东新区浦城路812号2楼",
                    job: "码农"
                }
            ],
            tableConfig: {
                multipleSort: false,
                tableData: [],
                columns: [
                    {
                        field: 'custome', width: 50, titleAlign: 'center', columnAlign: 'center',   
                        formatter: function (rowData, index,pagingIndex) {
                            var currentIndex = index+pagingIndex;
                            return currentIndex < 3 ? '<span>' + (currentIndex + 1) + '</span>' : currentIndex + 1
                        }, isFrozen: true
                    },
                    {
                        field: 'custome1', width: 100, titleAlign: 'center', columnAlign: 'center',   
                        formatter: function (rowData, index,pagingIndex) {
                            var currentIndex = index+pagingIndex;
                            return currentIndex < 3 ? '<span>' + (currentIndex + 1) + '</span>' : currentIndex + 1
                        }, isFrozen: true
                    },
                    {field: 'name', width: 100, columnAlign: 'center',isEdit:true, isFrozen: true},
                    {field: 'height', width: 100, columnAlign: 'center',isEdit:true, isFrozen: true},
                    {field: 'gender', width: 90, columnAlign: 'center',isEdit:true, isFrozen: false,isResize:true},
                    {field: 'address', width: 280, columnAlign: 'left',isEdit:true,isResize:true},
                    {field: 'hobby', width: 180, columnAlign: 'center',isEdit:true,isResize:true},
                    {field: 'address1', width: 280, columnAlign: 'left',isEdit:true,isResize:true},
                    {field: 'hobby1', width: 180, columnAlign: 'center',isEdit:true,isResize:true}
                ],
                titleRows: [
                    [
                        {fields: ['custome'], title: '排序', titleAlign: 'center', rowspan: 2},
                        {fields: ['custome1'], title: '排序1', titleAlign: 'center', rowspan: 2},
                        {fields: ['name', 'height'], title: '基础信息', titleAlign: 'center', colspan: 2},
                        {fields: ['gender','address','hobby'], title: '用户其他信息', titleAlign: 'center', colspan: 3},
                        {fields: ['address1', 'hobby1'], title: '基础信息', titleAlign: 'center', colspan: 2},
                    ],
                    [
                        {fields: ['name'], title: '姓名', titleAlign: 'center'},
                        {fields: ['height'], title: '身高', titleAlign: 'center'},
                        {fields: ['gender'], title: '性别', titleAlign: 'center'},
                        {fields: ['address'], title: '住址', titleAlign: 'center'},
                        {fields: ['hobby'], title: '爱好', titleAlign: 'center'},
                        {fields: ['address1'], title: '住址1', titleAlign: 'center'},
                        {fields: ['hobby1'], title: '爱好1', titleAlign: 'center'}
                    ]
                ]
            }
        }
    },
    created(){
        this.getTableData();
    },
    methods: {
        getTableData (){
            this.tableConfig.tableData = this.tableDate.slice((this.pageIndex-1)*this.pageSize,(this.pageIndex)*this.pageSize)
        },
        pageChange (pageIndex){
            this.pageIndex = pageIndex;
            this.getTableData();
        },
        pageSizeChange (pageSize) {
            this.pageIndex = 1;
            this.pageSize = pageSize;
            this.getTableData();
        },
        sortChange (params){
            if (params.height.length > 0){
                this.tableConfig.tableData.sort(function (a, b) {
                    if (params.height === 'asc'){
                        return a.height - b.height;
                    }else if(params.height === 'desc'){
                            return b.height - a.height;
                    }else{
                        return 0;
                    }
                });
            }
        },
        // 单元格编辑回调
        cellEditDone (newValue, oldValue, rowIndex, rowData, field){
            this.tableConfig.tableData[rowIndex][field] = newValue;
            console.log(newValue, 'newValue')
            console.log(oldValue, 'oldValue')
            console.log(rowIndex, 'rowIndex')
            console.log(rowData, 'rowData')
            console.log(field, 'field')
            console.log(this.tableConfig.tableData, 'this.tableConfig.tableData')
        },
        clickCity (index) {
            this.$store.dispatch("setCityName", this.cityArr[index]);
            this.$router.push({
                name: 'other'
            });
        }
    },
    computed: {
        fullName: {
            get: function () {
                return this.FN + ' ' + this.LN;
            },
            set: function (newVal) {
                let names = newVal.split('');
                this.FN = names[0];
                this.LN = names[names.length - 1];
            }
        }
    }
}
</script>
<style lang="less">
.react-page{
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
