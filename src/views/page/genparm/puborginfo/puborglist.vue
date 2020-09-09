<template>
    <div>
        <div slot="top" >
            <el-button @click="doAdd2" type="primary" >增加</el-button>
            <el-button @click="doEdit"  type="warning" >修改</el-button>
            <el-button @click="deleteAll "  type="danger" >删除</el-button>
        </div>
        <div slot="body">
            <el-table border ref="table" align="center" :data="data.rows"  height="380" 
                @current-change="handleCurrentChange"  highlight-current-row  style="width: 100%;" >
                <el-table-column align="center" type="index"  label="序号" />
                <el-table-column align="center" prop="id" label="id" v-if="show"/>
                <el-table-column align="center" prop="brcCode" label="法人编码" />
                <el-table-column align="center" prop="baseCcy" label="法人名称"/>
                <el-table-column align="center" prop="effectiveDate" label="启用日期"/>
                <el-table-column align="center" prop="effectiveDate" label="失效日期"/>
                
                 
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
        <!-- <div v-if="showEdit">
            <puborgEdit @doClose="closeAddPage" :brcObj='brcObj' :flagc='flagc' 
                :type='type' :showEdit="showEdit" ></puborgEdit>   
        </div> -->
        <div v-if="dataShow">
            <dataList @doAttrClose="closeattrPage" :dataObj='dataObj' :dataShow='dataShow'></dataList>
        </div>
    </div>


</template>
<script>
import { deleteKey, deepClone } from '@/utils';

// import {  instSubRalationTypeList, instRalationTypeList,instSubRalationTypeObj,instRalationTypeObj } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';

import {
    queryPdBButtons,
    queryPagPdBButtons

} from '@/api/parmbusi';

// import puborgEdit from './puborgedit.vue';
import dataList from  './datalist';
export default {
    mixins: [MIXIN],
    components: {dataList},
    data() {
        return {
            // instSubRalationTypeList,
            // instRalationTypeList,
            // instSubRalationTypeObj,
            // instRalationTypeObj,

            type: '',
            show: false,

            showEdit: false,
            brcObj: {},
            changObj: {},
            dataObj:{},
            dataShow: false,
            

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
        async closeattrPage(){
           this.dataShow = false;
        },
        async doAdd2() {
            this.dataShow = true;
            this.dataObj= this.changObj;
        },

        //关闭组件编辑组件
        async closeAddPage(){
            this.showEdit = false;
            this.getList();
        },

        //新增
        async doAdd() {
            this.showEdit = true;
            this.type= 'add';
            this.brcObj= this.changObj;
        },


        //修改
        async doEdit() {
            if(this.brcObj== null){
                return this.$message.error('请选择表格中的一条数据!');;
            }else{
                this.showEdit = true;
                this.type = 'updat';
            }
        },
        
        //删除
        async deleteAll() {
            if(this.brcObj== null){
                return this.$message.error('请选择表格中的一条数据!');;
            }else{
                this.showEdit = true;
                this.type = 'del';
            }
            
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

            let info = await queryPagPdBButtons(postObj);
            if (info.resCode === '0') {
                this.data = {
                    total: info.total,
                    rows: info.rows || []
                };
            }
        },

    
      handleCurrentChange(val) {
        this.brcObj = val;
      }
    },
    mounted() {
        this.getList();
        // this.instRalationTypeList.forEach(item => {
        //     this.instRalationTypeObj[item.value] = item.name;
        // });
        // this.instSubRalationTypeList.forEach(item => {
        //     this.instSubRalationTypeObj[item.value] = item.name;
        // });
        this.brcObj= this.changObj;
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