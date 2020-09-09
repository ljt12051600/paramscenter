<template>
    <div>
        <div slot="top" >
            <el-button @click="doAdd" type="primary" >参数增加</el-button>
            <!-- <el-button @click="doEdit"  type="warning" >修改</el-button> -->
            <!-- <el-button @click="deleteAll "  type="danger" >删除</el-button> -->
        </div>
        <div slot="body">
            <el-table border ref="table" align="center" :data="data.rows"  height="380" 
                highlight-current-row  style="width: 100%;" >
                <el-table-column align="center" type="index"  label="序号" />
                <el-table-column align="center" prop="id" label="id" v-if="show"/>
                <el-table-column align="center" prop="brcCode" label="国家代码" />
                <el-table-column align="center" prop="brcName" label="标准代码" />
                <el-table-column align="center" prop="baseCcy" label="国家名称"/>
                <el-table-column align="center" prop="brcName" label="国家英文名称" />
                <el-table-column align="center" prop="baseCcy" label="利息税计划编码"/>
                 
                
                
                <el-table-column label="操作" width="240" align="center" fixed="right" >
                    <template slot-scope="scope">
                        <el-button @click="doCopy(scope.row,scope.index)" type="warning">复制</el-button>
                        <el-button @click="doEdit(scope.row,scope.index)" type="primary">修改</el-button>
                        <el-button @click="doDelete(scope.row,scope.index)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="data.total" class="pagination">
                    <el-pagination
                        background
                        layout="total,pager,jumper,sizes"
                        :current-page="query.pageNum"
                        :page-sizes="[10,25,50]"
                        :page-size="query.numPerPage"
                        :total="data.total"
                        @current-change="handlePageChange"
                        @size-change="handleSizeChange"
                        
                    ></el-pagination>
                </div>

        </div>
        <div v-if="showEdit"  >
            <pubcountryEdit @doClose="closeAddPage" :editObj='editObj' 
                :type='type' :showEdit="showEdit"></pubcountryEdit>   
        </div>
    </div>


</template>
<script>
import { deleteKey, deepClone } from '@/utils';

import {  cshAttrList, cshAttrObj,loanSignList,loanSignObj } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';

import {
    queryPdBButtons,
    queryPagPdBButtons

} from '@/api/parmbusi';

import pubcountryEdit from './pubcountryedit.vue';
export default {
    mixins: [MIXIN],
    components: {pubcountryEdit},
    data() {
        return {
            loanSignList,
            cshAttrList,
            loanSignObj,
            cshAttrObj,

            type: '',
            show: false,

            showEdit: false,
            editObj: {},
            changObj: {},
            
            query: {
                compClassification: '',
                compType: '',
                pageNum: 1,
                numPerPage: 10,
                clickMenuId: this.clickMenuId
            },
            data: {
                total: 20,
                rows: []
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
                compType: [
                    {
                        required: true,
                        message: '请输入组件类型',
                        trigger: 'blur'
                    }
                ],
                sysId: [
                    {
                        required: true,
                        message: '请输入系统',
                        trigger: 'blur'
                    }
                ],
                compPropertyName: [
                    {
                        required: true,
                        message: '请输入组件属性名称',
                        trigger: 'blur'
                    }
                ],
                buttonId: [
                    {
                        required: true,
                        message: '请输入按钮ID',
                        trigger: 'blur'
                    }
                ],
                buttonName: [
                    {
                        required: true,
                        message: '请输入按钮名称',
                        trigger: 'blur'
                    }
                ]
            },

            

        }
    },

    methods: {
            
        //关闭组件编辑组件
        async closeAddPage(){
            this.showEdit = false;
            this.getList();
        },

        //新增
        async doAdd() {
            this.showEdit = true;
            this.type= 'add';
            // this.editObj= this.changObj;
           this.editObj = {};
        },

        //复制
        async doCopy(item) {
            // alert(this.editObj.brcCode);
            console.log(this.editObj);
           
            this.showEdit = true;
            this.type = 'copy';
            this.editObj = item;
        },
        //修改
        async doEdit(item) {
            this.showEdit = true;
            this.type = 'updat';
            this.editObj = item;
        },
        //删除
        async doDelete(item) {
            this.showEdit = true;
            this.type = 'del';
            this.editObj = item;
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
        }
    },
    mounted() {
        this.getList();
        this.loanSignList.forEach(item => {
            this.loanSignObj[item.value] = item.name;
        });
        this.cshAttrList.forEach(item => {
            this.cshAttrObj[item.value] = item.name;
        });
        this.editObj= this.changObj;
    }
}
</script>


<style>
.sortable-ghost {
    background: red;
}

/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row>td{
  background-color: #f19944 !important;
  /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
}
/* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #f19944;
  /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}

</style>