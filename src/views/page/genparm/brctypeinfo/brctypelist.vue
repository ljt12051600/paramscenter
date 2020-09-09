<template>
    <div class="boxShadow">
        <div slot="top" >
            <el-button @click="doAdd" type="primary" >参数增加</el-button>
            <!-- <el-button @click="parmCompare"  type="primary" >参数比较</el-button> -->
            <!-- <el-button @click="deleteAll"  type="primary" >参数引用</el-button> -->
        </div>
        <div style="margin-top: 20px">
            <el-table border
                :data="data.rows"
                ref="table"
                align="center"
                highlight-current-row 
                style="width: 100%"
                @selection-change="selectArInfo">
                <!-- <el-table-column label="序号" width="62px" type="index"></el-table-column> -->
                <template v-for="(col) in tableData">
                    <el-table-column
                        
                        :show-overflow-tooltip="true"
                        :prop="col.dataItem"
                        :label="col.dataName"
                        :key="col.dataItem"
                        v-model="selectArr"
                        width="124px"
                    ></el-table-column>
                </template>
                <el-table-column label="操作" width="250" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="doCopy(scope.row,scope.index)" type="warning">复制</el-button>
                        <el-button @click="doEdit(scope.row,scope.index)" type="primary">修改</el-button>
                        <el-button @click="doDelete(scope.row,scope.index)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div v-if="showEdit"  >
            <brctypeEdit @doClose="closeAddPage" :editObj='editObj'  
                :type='type' :showEdit="showEdit"></brctypeEdit>   
        </div>
        <div v-if="showCompare"  >
            <parmCompare @doClose="closeCompPage" :brcObj='brcObj'  
                 :showCompare="showCompare"></parmCompare>   
        </div>

    </div>
</template>
<script>
import { deleteKey, deepClone } from '@/utils';

import { instSubRalationTypeList, instRalationTypeList, instSubRalationTypeObj, instRalationTypeObj } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';

import { queryPdBButtons, queryPagPdBButtons } from '@/api/parmbusi';
import brctypeEdit from './brctypedit.vue';
import parmCompare from './parmcompare.vue';
export default {
    mixins: [MIXIN],
    components: {brctypeEdit,brctypeEdit,parmCompare},
    data() {
        return {

            instSubRalationTypeList,
            instSubRalationTypeObj, 
            instRalationTypeObj , 
            instRalationTypeList,

            type: '',
            show: false,

            selectArr:[],

            showEdit: false,
            showCompare:false,
            editObj: {},
            changObj: {},
            titleObj: {},
            brcObj: {},

            query: {
                compClassification: '',
                compType: '',
                pageNum: 1,
                numPerPage: 10,
                clickMenuId: this.clickMenuId
            },
            data: {
                total: 20,
                rows: [],
                tableData:[]
            },
            
            

            // tables: [
            //     {
            //         xiaoxue: '福兰',
            //         chuzhong: '加芳',
            //         gaozhong: '蒲庙',
            //         daxue: '西安',
            //         yanjiusheng: '西安',
            //         shangban: '北京'
            //     },
            //     {
            //         xiaoxue: '南坊',
            //         chuzhong: '礼泉',
            //         gaozhong: '礼泉',
            //         daxue: '西安',
            //         yanjiusheng: '西安',
            //         shangban: '南坊'
            //     },
            //     {
            //         xiaoxue: '马山',
            //         chuzhong: '加芳',
            //         gaozhong: '蒲庙',
            //         daxue: '西安',
            //         yanjiusheng: '重庆',
            //         shangban: '北京'
            //     }
            // ],
            // tableData:[
            //         {type: 'input', inputType: 'text', disabled: false, dataName: '用户名称', dataItem: 'brcCode', placeholder: '请输入用户名', required: true, defaultValue: null},
            //         {type: 'input', inputType: 'password', disabled: false, dataName: '用户密码', dataItem: 'brcName', placeholder: '请输入密码', required: true, defaultValue: null},
            //         {type: 'select', inputType: 'select', disabled: true, dataName: '用户级别', dataItem: 'brcSrt', placeholder: '请输入选择用户级别', options: [{value: '0', label: '超级管理员'}, {value: '1', label: '测试管理员'}], required: true, defaultValue: null},
            //         {type: 'textarea', inputType: 'textarea', disabled: false, dataName: '用户描述', modelName: 'corpBrc', placeholder: '请输入用户描述', required: false, defaultValue: null}
            //     ],
            tableData: [
                {
                    dataItem: 'brcCode',
                    dataName: '机关代码'
                },
                {
                    dataItem: 'brcName',
                    dataName: '机构名称'
                },
                {
                    dataItem: 'brcSrt',
                    dataName: '机构简称'
                },
                {
                    dataItem: 'corpBrc',
                    dataName: '机构法人'
                },
                {
                    dataItem: 'belongAccBrc',
                    dataName: '所属核算机构'
                },
                {
                    dataItem: 'belongCountry',
                    dataName: '所在国家'
                }
            ]
        };
    },
    methods: {
        // 获取表格选中时的数据
        selectArInfo(val) {
            this.editObj = val;
            console.log(val);
        },
        async doAdd() {
            this.showEdit = true;
            this.type= 'add';
        },
        //关闭组件编辑组件
        async closeAddPage(){
            this.showEdit = false;
            // this.getList();
        },
        async closeCompPage(){
            this.showCompare = false;
            // this.getList();
        },
        async parmCompare() {
            this.showCompare = true;
            this.type = 'compare';
            // this.brcObj = selectArrs;
            // console.log(tableData);
            // console.log(this.editObj);
        },
        async doEdit(item) {
            this.editObj = item;

        //    console.log(this.editObj); 
        },

        //组件查询翻页
        handlePageChange(num) {
            this.query.pageNum = num;
            this.getList(num);
        },
        handleSizeChange(num) {
            this.query.pageNum = 1;
            this.query.numPerPage = num;
            this.getList(num);
        },

        queryComp() {
            this.query.pageNum = 1;
            this.getList(1);
        },
        //查询信息，返回表格
        async getList(num) {
            let postObj = deleteKey(this.query);
            postObj.pageNum--;

            var info = await queryPagPdBButtons(postObj);
            if (info.resCode === '0') {
                this.data = {
                    total: info.total,
                    rows: info.rows || []
                };
            }
        },
    },
    mounted() {
        this.getList();
        
        this.brcObj= this.changObj;
    }
};
</script>


<style>
.sortable-ghost {
    background: red;
}

/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row > td {
    background-color: #f19944 !important;
    /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}
/* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #f19944;
    /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}
</style>