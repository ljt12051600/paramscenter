<template>
    <div>
        <div slot="top" >
            <el-button @click="doAdd" type="primary" >增加</el-button>
            <el-button @click="doCopy"  type="warning" >复制</el-button>
            <el-button @click="doEdit"  type="primary" >修改</el-button>
            <el-button @click="deleteAll"  type="danger" >删除</el-button>
            <el-button @click="parmCompare"  type="danger" >参数比较</el-button>
        </div>
        <div slot="body">
            <el-table border ref="table" align="center" :data="data.rows"  height="380" 
                @current-change="handleCurrentChange"  highlight-current-row  style="width: 100%;" >
                <el-table-column align="center" type="index"  label="序号" />
                <el-table-column align="center" prop="id" label="id" v-if="show"/>
                <el-table-column align="center" prop="brcCode" label="机构代码" />
                <el-table-column align="center" prop="brcName" label="机构名称" />
                <el-table-column align="center" prop="brcSrt" label="机构简称" />
                <el-table-column align="center" prop="corpBrc" label="法人机构" />
                <el-table-column align="center" prop="belongAccBrc" label="所属核算机构" />

                <el-table-column align="center" prop="baseCcy" label="基础币种"/>
                <!-- <el-table-column align="center" prop="baseCcy" label="基础币种">
                    <template slot-scope="scope">{{isObj[scope.row.baseCcy]}}</template>
                </el-table-column> -->
                
                <el-table-column align="center" prop="belongCountry" label="所属国家" />
                <el-table-column align="center" prop="location" label="所在地区" />
                <el-table-column align="center" prop="belongBrc" label="所属机构" />
                <el-table-column align="center" prop="branchCode" label="分行代码" />

                <el-table-column align="center" prop="belongCity" label="所在城市" />
                
                
                
                
                <el-table-column align="center" prop="brcTyp" label="机构类型" >
                    <template slot-scope="scope">{{brcattrObj[scope.row.brcTyp]}}</template>
                </el-table-column>
                <el-table-column align="center" prop="contact" label="联系人" />
                <el-table-column align="center" prop="contactTel" label="联系人电话" />
                
                <el-table-column align="center" prop="effectiveDate" label="生效日期" />
                <el-table-column align="center" prop="ftaCode" label="自贸区代码" />
                <el-table-column align="center" prop="isAutoOpenInsideAcct" label="是否自动开立内部户">
                    <template slot-scope="scope">{{isObj[scope.row.isAutoOpenInsideAcct]}}</template>
                </el-table-column>
                <el-table-column align="center" prop="isFtaBrc" label="是否自贸区机构">
                    <template slot-scope="scope">{{isObj[scope.row.isFtaBrc]}}</template>
                </el-table-column>
                <el-table-column align="center" prop="isInterestTaxLevied" label="是否征收利息税">
                    <template slot-scope="scope">{{isObj[scope.row.isInterestTaxLevied]}}</template>
                </el-table-column>
                
                <el-table-column align="center" prop="openedTime" label="开业时间" />
                <el-table-column align="center" prop="smachangeConfMinAmt" label="零钞配置最小金额" />
                
                <el-table-column align="center" prop="subSysId" label="子系统" />
                <el-table-column align="center" prop="zip" label="邮编" />
                 
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
        <div v-if="showEdit">
            <brcEdit @doClose="closeAddPage" :brcObj='brcObj' 
                :type='type' :showEdit='showEdit' ></brcEdit>
        </div>
    </div>


</template>
<script>
import { deleteKey, deepClone } from '@/utils';

import {  isList, isObj,brcattrList,brcattrObj } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';

import {
    queryPdBButtons,
    queryPagPdBButtons

} from '@/api/parmbusi';

import brcEdit from './brcedit.vue';
export default {
    mixins: [MIXIN],
    components: {brcEdit},
    data() {
        return {
            isList,
            isObj,
            brcattrList,
            brcattrObj,

            type: '',
            show: false,

            showEdit: false,
            brcObj: {},
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
            this.brcObj= this.changObj;
        },

        async doCopy() {
            if(this.brcObj== null || this.brcObj.brcCode==undefined){
                return this.$message.error('请选择表格中的一条数据!');;
            }else{
                this.showEdit = true;
                this.type = 'copy';
            }
        },
        //修改
        async doEdit() {
            if(this.brcObj== null || this.brcObj.brcCode==undefined){
                return this.$message.error('请选择表格中的一条数据!');;
            }else{
                this.showEdit = true;
                this.type = 'updat';
            }
        },
        
        //删除
        async deleteAll() {
            if(this.brcObj== null || this.brcObj.brcCode==undefined){
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
        this.isList.forEach(item => {
            this.isObj[item.value] = item.name;
        });
        this.brcattrList.forEach(item => {
            this.brcattrObj[item.value] = item.name;
        });
        this.brcObj= this.changObj;
    }
}
</script>


<style>
.sortable-ghost {
    background: red;
}

.title {
   font-size:18px  ;
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