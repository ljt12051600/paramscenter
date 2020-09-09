<template>
    <div>
        <system-table>
            <div slot="top">
                <el-form ref="form" inline label-width="80px">
                    <el-form-item label="客户类型" required>
                        <el-select v-model="form.selectMultiple" style="width:250px;" placeholder="多选框"  multiple>
                        <el-option
                                :key="index+'cc'"
                                v-for="(item,index) in customerTypeList"
                                :label="item.value+'-'+item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="产品类型">
                        <el-select
                            style="width:200px;"
                            v-model="query.compClassification"
                            clearable
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

                    <el-form-item label="模板名称" prop="compName" >
                        <el-input style="width:200px;" v-model.trim="query.compName" 
                        :readonly='false' ></el-input>
                    </el-form-item>
                    
                </el-form>
            </div>

            <div slot="search">
                <el-button @click="queryComp" type="primary">查询</el-button>
                <el-button @click="clearSearch" type="warning">重置</el-button>
            </div>
            <div slot="action">
                <el-button @click="doAdd" type="primary">添加模板</el-button>
            </div>
            <!--表格渲染-->
            <div slot="body">
                <el-table border ref="table" align="center" :data="data.rows"  highlight-current-row 
                        @current-change="handleCurrentChange" style="width: 100%;"
                        @cell-dblclick="doEdit">
                    <el-table-column type="index"   align="center" label="序号" />
                    <el-table-column align="center" width="180" prop="id" label="id" v-if="show"/>
                    <el-table-column align="center" width="250" prop="compCode" label="模板代码" />
                    <el-table-column align="center" prop="compName" label="模板名称" />
                    <el-table-column align="center" prop="compClassification" label="客户类型">
                        <template slot-scope="scope">{{customerTypeObj[scope.row.compClassification]}}</template>
                    </el-table-column>
                    <el-table-column align="center" prop="compClassification" label="产品类型">
                        <template slot-scope="scope">{{compPrdtObj[scope.row.productParamClassification]}}</template>
                    </el-table-column>

                    
                    <el-table-column label="操作" width="420" align="center" fixed="right" >
                        <template slot-scope="scope">
                            <el-button @click="doCopy(scope.row,scope.index)" type="warning">复制</el-button>
                            <el-button @click="doEdit(scope.row,scope.index)" type="primary">修改</el-button>
                            <el-button @click="doDelete(scope.row,scope.index)" type="danger">删除</el-button>
                            <el-button @click="attrEdit(scope.row,scope.index)" type="primary">组件管理</el-button>
                            <el-button @click="paraEdit(scope.row,scope.index)" type="primary">生成产品</el-button>
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
            <templatEdit @doClose="closeAddPage" :addObj='addObj' :type='type' :showAdd='showAdd'></templatEdit>
         </div>
        

        
        
        <div v-if="attrList">
            <temcompList @doAttrClose="closeattrPage" :attrObj='attrObj' :attrList='attrList'></temcompList>
        </div>

        <!-- <div v-if="paraList">
            <paracompList @doparaClose="closeparaPage" :paraObj='paraObj' :paraList='paraList'></paracompList>
        </div> -->
    </div>
</template>

<script>
import { deleteKey, deepClone } from '@/utils';

import { compKindList, compKindObj,compPrdtList,compPrdtObj ,customerTypeList,customerTypeObj} from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import {
    deleteCompButtons,
    queryCompButtons,
} from '@/api/parmbusi';
import templatEdit from './templatedit.vue';
import temcompList from './temcomplist.vue';
// import attrcompList from './attrcomplist.vue';
// import paracompList from './paracomplist.vue';
export default {
    mixins: [MIXIN],
    components: {templatEdit,temcompList},
    data() {
        return {
            type:'',
            
            compKindList,
            compKindObj,
            compPrdtList,
            compPrdtObj,
            customerTypeList,
            customerTypeObj,
            form: {
                selectOne:'2',
                selectMultiple:['1','2','3'],
            },
            query: {
                pageNum: 1,
                numPerPage: 10,
                clickMenuId: this.clickMenuId
            },
            

            //编辑组件
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
        //模板组件管理
        async attrEdit(item) {
            // this.type = 'typeattr';
            // this.attrList = true;
            // this.attrObj = item;
            // alert(item.compName);
            this.$router.push({
                path:'/temcomplist',
                queryct:{
                    compName:item.compName,
                    compClassification:item.compClassification,
                    // compClassification:this.attrObj.compClassification,
                    }});
        },
        
        //关闭组件编辑组件
        async closeAddPage(){
            this.showAdd = false;
            this.getList();
        },
        //产品配置
        async paraEdit(item) {
            this.type = 'product';
            this.showAdd = true;
            this.addObj = item;
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
        } ,
        getInfo(){
            let self = this;
            this.query.compClassification = this.$route.query.compClassification;
            this.query.compName = this.$route.query.compName;
        } 
    },
    mounted() {
        this.getInfo();
        this.getList();
        this.compKindList.forEach(item => {
            this.compKindObj[item.value] = item.name;
        });
        this.compPrdtList.forEach(item => {
            this.compPrdtObj[item.value] = item.name;
        });
        this.customerTypeList.forEach(item => {
            this.customerTypeObj[item.value] = item.name;
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