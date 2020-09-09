<template>
    <div>
        <system-table>
            <div slot="top">
                <el-form ref="form" inline label-width="80px">
                    <el-form-item label="组件名称" prop="compName" >
                        <el-input style="width:200px;" v-model.trim="query.compName" 
                        :readonly='false' ></el-input>
                    </el-form-item>
                    <el-form-item label="组件分类">
                        <el-select
                            style="width:200px;"
                            v-model="query.compClassification"
                            @change="checkFlag1"
                            clearable
                            placeholder="请选择"
                        >
                            <el-option
                                :key="index+'cc'"
                                v-for="(item,index) in compKindList"
                                :label="item.value+'-'+item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品分类">
                        <el-select
                            style="width:200px;"
                            :disabled='flag1'
                            v-model="query.productParamClassification"
                            
                            placeholder="请选择"
                        >
                            <el-option
                                :key="index+'cc'"
                                v-for="(item,index) in compPrdtList"
                                :label="item.value+'-'+item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    
                </el-form>
            </div>

            <div slot="search">
                <el-button @click="queryComp" type="primary">查询</el-button>
                <el-button @click="clearSearch" type="warning">清除</el-button>
            </div>
            <div slot="action">
                <el-button @click="doAdd" type="primary">添加组件</el-button>
            </div>
            <!--表格渲染-->
            <div slot="body">
                <el-table border ref="table" align="center" :data="data.rows"  highlight-current-row 
                        @current-change="handleCurrentChange" style="width: 100%;"
                        @cell-dblclick="doEdit">
                    <el-table-column type="index"   align="center" label="序号" />
                    <el-table-column align="center" width="180" prop="id" label="id" v-if="show"/>
                    <el-table-column align="center" width="250" prop="compCode" label="组件编码" />
                    <el-table-column align="center" prop="compName" label="组件名称" />
                    <el-table-column align="center" prop="inspectionRules" label="属性检查" v-if="show"/>
                    <el-table-column align="center" prop="compClassification" label="组件分类">
                        <template slot-scope="scope">{{compKindObj[scope.row.compClassification]}}</template>
                    </el-table-column>
                    <el-table-column align="center" prop="compClassification" label="产品分类">
                        <template slot-scope="scope">{{compPrdtObj[scope.row.productParamClassification]}}</template>
                    </el-table-column>

                    
                    <el-table-column label="操作" width="420" align="center" fixed="right" >
                        <!-- <template slot-scope="scope">
                            <el-button @click="doCopy(scope.row,scope.index)" type="warning">复制</el-button>
                            <el-button @click="doEdit(scope.row,scope.index)" type="primary">修改</el-button>
                            <el-button @click="doDelete(scope.row,scope.index)" type="danger">删除</el-button>
                            <el-button @click="attrEdit(scope.row,scope.index)" type="primary">属性管理</el-button>
                            <el-button @click="paraEdit(scope.row,scope.index)" type="primary">参数管理</el-button>
                            <el-button @click.stop="sortUp(scope.$index, scope.row)">向上↑ </el-button>
                            <el-button @click.stop="sortDown(scope.$index, scope.row)">向下↓</el-button>

                        </template> -->
                        <template slot-scope="scope">
                            <el-button @click.stop="sortUp(scope.$index,scope.row)">向上↑ </el-button>
                            <el-button @click.stop="sortDown(scope.$index,scope.row)">向下↓ </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--分页组件-->
                <div v-if="data.total" class="pagination">
                    <el-pagination
                        background
                        layout="total,pager,jumper,sizes"
                        :current-page="query.pageNum"
                        :page-sizes="[10,25,50]"
                        :page-size="query.numPerPage"
                        @current-change="handlePageChange"
                        :total="data.total"
                        @size-change="handleSizeChange"
                        
                    ></el-pagination>
                </div>
            </div>
        </system-table>
         <div v-if="showAdd">
            <compEdit @doClose="closeAddPage" :addObj='addObj' :type='type' :showAdd='showAdd'></compEdit>
         </div>

        
        
        <div v-if="attrList">
            <attrcompList @doAttrClose="closeattrPage" :attrObj='attrObj' :attrList='attrList'></attrcompList>
        </div>

        <div v-if="paraList">
            <paracompList @doparaClose="closeparaPage" :paraObj='paraObj'  :paraList='paraList'></paracompList>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { deleteKey, deepClone } from '@/utils';

import { compKindList, compKindObj,compPrdtList,compPrdtObj } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import {
    deleteCompButtons,
    queryCompButtons,
} from '@/api/parmbusi';
import compEdit from './compedit.vue';
import attrcompList from './attrcomplist.vue';
import paracompList from './paracomplist.vue';
export default {
    mixins: [MIXIN],
    components: {compEdit,attrcompList,paracompList},
    data() {
        return {
            type:'',
            
            compKindList,
            compKindObj,
            compPrdtList,
            compPrdtObj,

            query: {
                pageNum: 1,
                numPerPage: 10,
                clickMenuId: this.clickMenuId
            },
            
            //编辑组件
            flag1:false,
            flagc: '',
            showAdd: false,
            addObj: {},
            comptitle: '',

            //编辑组件属性
            attrList: false,
            attrEditPObj: {},
            attrObj: {},

            //编辑参数
            paraList: false,
            paraPObj: {},
            paraObj: {},

            data: {
                total: 20,
                rows: []
            },

            show: false,

            item: {
                name: 'name'
            },

            rules: {
                compCode: [
                    {
                        required: true,
                        message: '请输入组件编码',
                        trigger: 'blur'
                    }
                ],
                compName: [
                    {
                        required: true,
                        message: '请输入组件名称',
                        trigger: 'blur'
                    }
                ],
                compClassification: [
                    {
                        required: true,
                        message: '请输入组件分类',
                        trigger: 'blur'
                    }
                ],
                sysId: [
                    {
                        required: true,
                        message: '请输入系统',
                        trigger: 'blur'
                    }
                ]
                
            },

            tabIndex: 1
        };
    },

    methods: {

        sortUp (index,row) {
            let temp = this.data.rows[index - 1];
            Vue.set(this.data.rows, index - 1, this.data.rows[index]);
            Vue.set(this.data.rows, index, temp)
        },
        sortDown (index,row) {
            let i = this.data.rows[index + 1];
            Vue.set(this.data.rows, index + 1, this.data.rows[index]);
            Vue.set(this.data.rows, index, i)
        },
        //组件分类为产品参数时，产品分类下拉框可以，其它情况不可用且为空
        checkFlag1(){
            if(this.query.compClassification=='3'){
                this.flag1=false;
            }else{
                this.query.productParamClassification='';
                this.flag1=true; 
            }
        },

        clearSearch(){
            this.query = {
                compClassification: ""
            }
        },
        //选择单行数据时使用色块表示。
        handleCurrentChange(val) {
            this.addObj = val;
        },
        
        //新增组件
        async doAdd() {
            this.showAdd = true;
            this.type = 'add';
            this.addObj = {};
        },
        //复制增加组件
        async doCopy(item) {
            this.showAdd = true;
            this.type = 'copy';
            this.addObj = item;
            
        },
        async doEdit() {
            doEdit(item);
        },
        //修改组件
        async doEdit(item) {
            this.showAdd = true;
            this.type = 'updat';
            this.addObj = item;
        },
        //删除组件
        async doDelete(item) {
            this.showAdd = true;
            this.type = 'del';
            this.addObj = item;
        },
        //属性管理
        async attrEdit(item) {
            this.type = 'typeattr';
            this.attrList = true;
            this.attrObj = item;
        },
        
        //关闭组件编辑组件
        async closeAddPage(){
            this.showAdd = false;
            this.getList();
        },
        //参数管理
        async paraEdit(item) {
            this.type = 'typepara';
            this.paraList = true;
            this.paraObj = item;
        },
        
        //关闭属性组件
        async closeattrPage(){
           this.attrList = false;
        },
        //关闭参数
        async closeparaPage(){
           this.paraList = false;
        },


        //查询组件信息
        async getList(num) {
            let postObj = deleteKey(this.query);
            postObj.pageNum--;

            let info = await queryCompButtons(postObj);
            // this.el-calendar-table.el-input__clear;
            if (info.resCode === '0') {
                this.data = {
                    total: info.total,
                    rows: info.rows || []
                };
            }
        },

        queryComp() {
            this.query.pageNum = 1;
            this.getList(1);
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
        }  
    },
    mounted() {
        this.getList();
        this.compKindList.forEach(item => {
            this.compKindObj[item.value] = item.name;
        });compPrdtList
        this.compPrdtList.forEach(item => {
            this.compPrdtObj[item.value] = item.name;
        });
        
    }
};

</script>
<style>
.sortable-ghost {
    background: red;
}

/* .el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td {
    color: #fff;
    background-color: #a2a4a7!important;
} */
.el-table__body tr.current-row>td{
  background-color: #f19944 !important;
  /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
}
.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #f19944;
  /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}
</style>