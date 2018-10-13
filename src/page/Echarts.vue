<template>
    <div class="echarts-views">
        <div class="echarts-header">
            <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="echarts-main" id="echartsMain"></div>
    </div>
</template>
<script>
import {city, county} from '../api/demo.js';
export default {
    data () {
        return {
            loading: false,
            options: [],
            value: '',
            provinces: {
                // '全国': 'china',
                //4个直辖市
                "北京": "beijing",
                "天津": "tianjin",
                "上海": "shanghai",
                "重庆": "chongqing",
                //22个省
                "河北": "hebei",
                "山西": "shanxi",
                "辽宁": "liaoning",
                "吉林": "jilin",
                "黑龙江": "heilongjiang",
                "江苏": "jiangsu",
                "浙江": "zhejiang",
                "安徽": "anhui",
                "福建": "fujian",
                "江西": "jiangxi",
                "山东": "shandong",
                "河南": "henan",
                "湖北": "hubei",
                "湖南": "hunan",
                "广东": "guangdong",
                "海南": "hainan",
                "四川": "sichuan",
                "贵州": "guizhou",
                "云南": "yunnan",
                "陕西": "shanxi1",
                "甘肃": "gansu",
                "青海": "qinghai",
                //5个自治区
                "新疆": "xinjiang",
                "广西": "guangxi",
                "内蒙古": "neimenggu",
                "宁夏": "ningxia",
                "西藏": "xizang",
                //3个特别行政区
                "香港": "xianggang",
                "澳门": "aomen"
            },
            option: {
                backgroundColor: '#404a59',
                title : {
                    text: '中国地图',
                    subtext: '省市区三级下钻',
                    left: 'center',
                    textStyle:{
                        color: '#fff',
                        fontSize:16,
                        fontWeight:'normal',
                        fontFamily:"Microsoft YaHei"
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    iconStyle:{
                        normal:{
                            color:'#fff'
                        }
                    }
                },
                animationDuration: 1000,
                animationEasing: 'cubicOut',
                animationDurationUpdate: 1000
            },
            special: ['北京', '天津', '上海', '重庆', '香港', '澳门'],
            mapdata: []
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.getCityOptions();
        })
    },
    methods: {
        getCityOptions () {
            this.options = [];
            for (let i in this.provinces) {
                this.options.push({
                    label: i,
                    value: this.provinces[i]
                })
            }
            this.value = this.options[0].value;
            this.getProvince(this.value);
        },
        getProvince (n) {
            this.loading = true;
            city(n).then(res => {
                if (res.status === 200) {
                    this.loading = false;
                    let d = [];
                    for( let i = 0; i < res.data.features.length; i++ ){
                        d.push({
                            name: res.data.features[i].properties.name
                        })
                    }
                    this.mapdata = d;
                    this.echarts.registerMap(n, res.data);
                    this.renderMap(n, d);
                } else {
                    this.$message.error('错了哦，该地区不存在!');
                }
            }).catch(err => {
                console.log(err);
                this.loading = false;
            })
        },
        renderMap (map, data) {
            let chart = this.echarts.init(document.getElementById('echartsMain'))
            this.option.title.subtext = this.formatCityName(map);
            this.option.series = [ 
                {
                    name: map,
                    type: 'map',
                    mapType: map,
                    roam: false,
                    nameMap: {
                        'china':'中国'
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle:{
                                color: '#fff',
                                fontSize: 13
                            }  
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 13
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: 'rgba(147, 235, 248, 1)'
                        },
                        emphasis: {
                            areaColor: 'skyblue'
                        }
                    },
                    data:data
                }	
            ];
            window.onresize = chart.resize;
            //渲染地图
            chart.setOption(this.option);
            let _that = this;
            chart.on('click', function (params) {
                if (_that.formatCityName(params.seriesName) in _that.provinces) {
                    if (_that.special.indexOf((_that.value)) >= 0) {
                        _that.renderMap(_that.value, _that.mapdata);
                    } else {
                        _that.loading = true;
                        county (params.name).then(res => {
                            if (res.status === 200) {
                                _that.loading = false;
                                _that.echarts.registerMap(params.name, res.data);
                                let d = [];
                                for (let i = 0; i < res.data.features.length; i++){
                                    d.push({
                                        name: res.data.features[i].properties.name
                                    })
                                }
                                _that.renderMap(params.name, d);
                            }
                        }).catch(err => {
                            console.log(err);
                            _that.loading = false;
                        })
                    }
                } else {
                    _that.getProvince(_that.value);
                }
            })
        },
        formatCityName (n) {
            let city = null;
            for (let i in this.provinces) {
                if (n === this.provinces[i]) {
                    city = i
                }
            }
            return city;
        }
    },
    watch: {
        value (newval, oldval) {
            if (!oldval) return
            if (newval !== oldval) {
                this.getProvince(newval);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.echarts-views{
    width: 100%;
    height: 100%;
    position: relative;
    .echarts-header{
        line-height: 40px;
        height: 40px;
    }
    .echarts-main{
        width: 100%;
        height: calc(~'100% - 40px');
    }
}
</style>
