<template>
    <div>
        <system-tab>
            <div slot="top" :activeName="activeName"> 
                <el-form ref="form" inline label-width="80px">
                    
                    <el-form-item label="客户类型">
                        <el-select
                            style="width:200;"
                            v-model="query.compClassification"
                            clearable
                            placeholder="请选择"
                        >
                            <el-option
                                :key="index+'cc'"
                                v-for="(item,index) in customerTypeList"
                                :label="item.value+'-'+item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品分类">
                        <el-select
                            style="width:200;"
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
                        <el-input style="width:200;" v-model.trim="query.compName" 
                        :readonly='false' ></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称" prop="compName" >
                        <el-input style="width:200;" v-model.trim="query.compName" 
                        :readonly='false' ></el-input>
                    </el-form-item>
                    
                </el-form>
            </div>

            <div slot="search">
                <el-button @click="queryComp" type="primary">查询</el-button>
                <el-button @click="clearSearch" type="warning">清除</el-button>
            </div>
            <div slot="action" id="test">
                <el-button @click="doAdd()" type="primary">新增</el-button>
                <!-- <router-link to='/templatelist'>
                    <button  type="primary">新增</button>
                </router-link> -->
            </div>
            <!--表格渲染-->
            <div slot="body">
                <el-table border ref="table" align="center" :data="data.rows"  highlight-current-row 
                        @current-change="handleCurrentChange" style="width: 100%;"
                        @cell-dblclick="doEdit">
                    <el-table-column type="index"   align="center" label="序号" />
                    <el-table-column align="center" width="180" prop="id" label="id" v-if="show"/>
                    
                    
                    <el-table-column align="center" prop="compClassification" label="客户类型">
                        <template slot-scope="scope">{{customerTypeObj[scope.row.compClassification]}}</template>
                    </el-table-column>
                    <el-table-column align="center" prop="compClassification" label="产品分类">
                        <template slot-scope="scope">{{compPrdtObj[scope.row.productParamClassification]}}</template>
                    </el-table-column>

                    <el-table-column align="center" width="250" prop="compCode" label="模板名称" />
                    <el-table-column align="center" prop="compName" label="产品名称" />

                    
                    <el-table-column label="操作" width="300" align="center" fixed="right" >
                        <template slot-scope="scope">
                            <!-- <el-button @click="doCopy(scope.row,scope.index)" type="warning">复制</el-button> -->
                            <el-button @click="doEdit(scope.row,scope.index)" type="primary">修改</el-button>
                            <el-button @click="doDelete(scope.row,scope.index)" type="danger">删除</el-button>
                            <el-button @click="differentiation(scope.row,scope.index)" type="primary">差异化</el-button>
                            <el-button @click="start(scope.row,scope.index)" type="primary">启用</el-button>
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
            <div slot="edit">
               <edit-component
                @back="doCloseAction"
               
                :actionObj="actionObj"
                :actionItem="actionItem"
                :carouselData="carouselData"
            />
            </div>
        </system-tab>
         <div v-if="showAdd">
            <templatEdit @doClose="closeAddPage" :addObj='addObj' :type='type' :showAdd='showAdd'></templatEdit>
         </div>

    </div>
</template>

<script>
import { deleteKey, deepClone } from '@/utils';

import {customerTypeList ,customerTypeObj ,compPrdtList,compPrdtObj } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import {
    deleteCompButtons,
    queryCompButtons,
} from '@/api/parmbusi';
import templatEdit from './templatedit.vue';
// import attrcompList from './attrcomplist.vue';
// import paracompList from './paracomplist.vue';
export default {
    mixins: [MIXIN],
    components: {templatEdit},
    data() {
        return {
            type:'',
            
            customerTypeList,
            customerTypeObj,
            compPrdtList,
            compPrdtObj,

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

           

            data: {
                total: 20,
                rows: []
            },

            show: false,

            item: {
                name: 'name'
            },
            activeName:"list",
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
        doCloseAction(bol) {
           this.activeName="list";
           this.queryList();
        },
        //选择单行数据时使用色块表示。
        handleCurrentChange(val) {
            this.addObj = val;
        },
        
        //新增组件
        async doAdd() {
            
            this.$router.push({
                path:'/templatelist',
                query:{
                    compClassification:this.query.compClassification,
                    compName:this.query.compName,
                    }});
            // this.$router.push({name:'templatelist',params:{setid:111222}});

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
        //修改产品
        async doEdit(item) {
            this.showAdd = true;
            this.type = 'upPro';
            this.addObj = item;
        },
        //删除组件
        async doDelete(item) {
            this.showAdd = true;
            this.type = 'del';
            this.addObj = item;
        },
        //差异化管理
        async differentiation(item) {
            this.showAdd = true;
            this.type = 'diff';
            this.addObj = item;
        },
        
        //关闭组件编辑组件
        async closeAddPage(){
            this.showAdd = false;
            this.getList();
        },
        


        //查询组件信息
        async getList(num) {
            let postObj = deleteKey(this.query);
            postObj.pageNum--;

            let info = await queryCompButtons(postObj);
            // this.el-calendar-table.el-input__clear;
            if (info.resCode === '0') {
                if (info.rows.length == 0) {
                    this.showAction = false;
                    this.$message.error('请先添加工作架构');
                }else{
                    this.showAction = true;
                    this.activeName="edit"
                    this.data = {
                        total: info.total,
                        rows: info.rows || []
                    };
                }
                
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
        this.customerTypeList.forEach(item => {
            this.customerTypeObj[item.value] = item.name;
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