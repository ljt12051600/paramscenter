<template>
    <div>
        <system-table>
        <div slot="top" >
            <div>
                <el-form ref="form" inline label-width="80px">
                    <el-form-item label="组件编码" prop="compCode" >
                        <el-input style="width:200px;" v-model.trim="query.compCode" 
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="组件名称" prop="compName" >
                        <el-input style="width:200px;" v-model.trim="query.compName" 
                        ></el-input>
                    </el-form-item>
                    
                </el-form>
            </div>
            <div slot="search">
                <el-button @click="queryComp" type="primary">查询</el-button>
                <el-button @click="clearSearch" type="warning">清除</el-button>
            </div>
        </div>
        
        <div slot="body">
            <div >
                <el-button @click="doAdd" type="primary" >参数增加</el-button>
            </div>
            <el-table border ref="table" align="center" :data="data.rows"  height="380" 
                highlight-current-row  style="width: 100%;" >
                <el-table-column align="center" type="attr_sn"  label="序号" v-if="show"/>
                <el-table-column align="center" prop="id" label="id" v-if="show"/>
                <el-table-column label="属性编码"  prop="compPropertyCode">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.compPropertyCode"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.compPropertyCode}}</span>
                                </template>
                </el-table-column>
                <el-table-column label="属性名称"  prop="compPropertyName">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.compPropertyName"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.compPropertyName}}</span>
                                </template>
                </el-table-column>
                

                <el-table-column label="值选择方式"  prop="attributeValueType">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.attributeValueType"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.attributeValueType}}</span>
                                </template>
                </el-table-column>
                
                <el-table-column label="值类型"  prop="attributeValueType">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.attributeValueType"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.attributeValueType}}</span>
                                </template>
                </el-table-column>
                
                <el-table-column label="值长度"  prop="compPropertyName">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.compPropertyName"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.compPropertyName}}</span>
                                </template>
                </el-table-column>
                
                <el-table-column label="小数长度"  prop="compPropertyName">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.compPropertyName"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.compPropertyName}}</span>
                                </template>
                </el-table-column>
                
                <el-table-column label="元数据编码"  prop="compPropertyName">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.compPropertyName"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.compPropertyName}}</span>
                                </template>
                </el-table-column>
                
                <el-table-column label="子组件"  prop="compPropertyName">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.compPropertyName"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.compPropertyName}}</span>
                                </template>
                </el-table-column>
                
                <el-table-column label="关键字"  prop="compPropertyName">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.compPropertyName"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.compPropertyName}}</span>
                                </template>
                </el-table-column>
                
                <el-table-column label="必填"  prop="compPropertyName">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.compPropertyName"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.compPropertyName}}</span>
                                </template>
                </el-table-column>
                
                <el-table-column label="缺省值"  prop="compPropertyName">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.compPropertyName"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.compPropertyName}}</span>
                                </template>
                </el-table-column>
                
                <el-table-column label="级别"  prop="compPropertyName">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.compPropertyName"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.compPropertyName}}</span>
                                </template>
                </el-table-column>
                
                <el-table-column label="影响级别"  prop="compPropertyName">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.compPropertyName"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.compPropertyName}}</span>
                                </template>
                </el-table-column>
                
                <el-table-column label="状态"  prop="compPropertyName">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.compPropertyName"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.compPropertyName}}</span>
                                </template>
                </el-table-column>
                
                
                
                
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
        </system-table>
        <div v-if="dataShow">
            <dataList @doAttrClose="closeattrPage" @dataSub="dataSub" :dataObj='dataObj' :dataShow='dataShow'></dataList>
        </div>
        <div v-if="showAdd">
            <attrcompAdd @doCloseAdd="closeAttrAdd" :attrAddObj='attrAddObj' 
                 :showAdd='showAdd' ></attrcompAdd>
        </div>
    </div>


</template>
<script>
import { deleteKey, deepClone } from '@/utils';

import {  ccyTypeObj, ccyTypeList,isList,isObj } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import dataList from  './datalist';
import attrcompAdd from './attrcompadd.vue';

import {
    createPCPButtons,
    deletePCPButtons,
    updatePCPButtons,
    findPCPButtons

} from '@/api/parmbusi';

// import pubtketEdit from './pubtketedit.vue';
export default {
    components: {dataList,attrcompAdd},
    mixins: [MIXIN],
    // components: {pubtketEdit},
    data() {
        return {
            ccyTypeList,
            ccyTypeObj,
            isList,
            isObj,

            multipleSelection: [],
            dataShow: false,
            showAdd: false,
            attrAddObj: {},
            attrEditObj : {},

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
        //接收子组件传值
        dataSub(){
            console.log(this.dataSub);
            this.data.rows.push(this.dataSub);
            this.dataShow = false;
        },
        //关闭元数据界面
        async closeattrPage(){
           this.dataShow = false;
        },
        doAdd() {
            // this.data.rows.push({ name: '', sex: '', show: false, status: true, date: '', phone: '' });
            // this.data.rows[this.data.rows.length - 1].show = true;
            // this.dataShow = true;
            // this.dataObj= "";
            this.showAdd = true;
            
            this.attrEditObj.compCode = this.query.compCode;
            this.attrEditObj.compName = this.query.compName;
            this.attrEditObj.compClassification = this.query.compClassification
        },
         clearSearch(){
            this.query = {
                compCode: "",
                compName: ""
            }
        },

        //关闭组件编辑组件
        async closeAddPage(){
            this.showEdit = false;
            this.getList();
        },

       

        //复制
        async doCopy(item) {
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

            var info = await findPCPButtons(postObj);
            if (info.resCode === '0') {
                this.data = {
                    total: info.total,
                    rows: info.rows || []
                };
            }
        }
    },
    mounted() {
        // this.getList();
        this.ccyTypeList.forEach(item => {
            this.ccyTypeObj[item.value] = item.name;
        });
        this.isList.forEach(item => {
            this.isObj[item.value] = item.name;
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