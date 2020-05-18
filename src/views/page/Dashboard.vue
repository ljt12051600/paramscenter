<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">

                <el-card shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>主页占位</span>
                    </div>
                    <div id="main" style="width: 100%;height: 420px;"></div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:400px;width: 100%">
                    <div slot="header" class="clearfix">
                        <span>完成度</span>

                    </div>
                    <div style="width: 40%;height: 400px;display: inline-block;" id="clock"></div>
                    <div style="width: 40%;height: 400px;display: inline-block;" id="as"></div>

                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import echarts from 'echarts'
    import bus from '../common/bus';
    export default {
        name: 'dashboard',
        data() {
            return {



                opinion: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
                opinionData: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 234, name: '联盟广告' },
                    { value: 135, name: '视频广告' },
                    { value: 1548, name: '搜索引擎' }
                ]



            };
        },


        methods: {
            init() {
                this.drawChart3(100)
                setInterval( ()=> {
                    let value = (Math.random() * 100).toFixed(2) - 0;
                    this.drawChart3(value);
                }, 5000)
               

            },
            drawChart() {
                this.charts = echarts.init(document.getElementById("main"))
                this.charts.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a}<br/>{b}:{c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: this.opinion
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'blod'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: this.opinionData
                        }
                    ]
                })

            },
            drawChart2() {
                this.charts = echarts.init(document.getElementById("clock"));
                this.charts.setOption({
                    tooltip: {
                        formatter: '{a} <br/>{b} : {c}%'
                    },
                  
                    series: [
                        {
                            name: '业务指标',
                            type: 'gauge',
                            detail: { formatter: '{value}%' },
                            data: [{ value: 50, name: '完成率' }]
                        }
                    ]
                })


            },
            drawChart3(value) {
                console.log(value);
                let num=value
                this.charts = echarts.init(document.getElementById("as"));
                this.charts.setOption({
                    tooltip: {
                        formatter: '{a} <br/>{b} : {c}%'
                    },

                    series: [
                        {
                            name: '业务指标',
                            type: 'gauge',
                            detail: { formatter: '{value}%' },
                            data: [{ value: num, name: '开发效率' }]
                        }
                    ]
                })


            },


        }
        , mounted() {
            this.drawChart();
            this.drawChart2();
            this.init();

        }
    };
</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }
</style>