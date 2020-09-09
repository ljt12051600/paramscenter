
  <template>
    <div>
        <el-dialog :visible="attrList" width="800px" title="模板组件管理">
        <div>
            <system-table ref="attrList">
                <div slot="top">
                    <el-form ref="attrEditPage" inline label-width="80px">
                        <el-form-item label="模板名称" prop="compName">
                            <el-input
                                v-model.trim="attrObj.compCode"
                                readonly
                                style="width: 200px;"
                            />
                        </el-form-item>
                        <el-form-item label="组件名称" prop="compName">
                            <el-input
                                v-model.trim="attrObj.compCode"
                                readonly
                                style="width: 200px;"
                            />
                        </el-form-item>
                        <el-form-item label="组件分类" prop="3">
                            <el-select
                                style="width:200px;"
                                v-model="attrObj.compClassification"
                                disabled="true"
                            >
                                <el-option
                                    :key="index+'cc'"
                                    v-for="(item,index) in compKindList"
                                    :label="item.value+'-'+item.name"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="产品类型" prop="compClassification">
                            <el-select
                                style="width:200px;"
                                v-model="attrObj.compClassification"
                                
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

                <div slot="action" style="margin-bottom: 20px;">
                    <el-button type="warning" @click="doExitEdit">返  回</el-button>
                    <el-button type="danger" @click="addcompAll(sels) " :disabled="this.sels.length === 0" >添加模板组件</el-button>
                </div>
                <div slot="body">
                    <el-table
                        border
                        align="center"
                        highlight-current-row
                        :data="dataAttr.rowsAttr"
                        @current-change="handleCurrentChange"
                        @selection-change="selsChange"
                        style="width: 100%"
                    >
                        <el-table-column type="selection" align="center" label="选择" />
                        <el-table-column align="center" prop="id" label="id" v-if="show" />
                        <el-table-column align="center" prop="compPropertyCode" label="组件编码" />
                        <el-table-column align="center" prop="compPropertyName" label="组件名称" />
                        <el-table-column align="center" prop="compPropertyName" label="模板名称" />
                        <el-table-column align="center" prop="selectionMethod" label="产品分类">
                            <template slot-scope="scope">{{compPrdtObj[scope.row.selectionMethod]}}</template>
                        </el-table-column>
                        <!-- <el-table-column align="center" prop="selectionMethod" label="组件名称">
                            <template slot-scope="scope">{{isObj[scope.row.selectionMethod]}}</template>
                        </el-table-column> -->
                        <el-table-column label="操作"  align="center" fixed="right" width="150">
                                <template slot-scope="scope">
                                    
                                    <el-button
                                        @click="doAttrDel(scope.row,scope.index)"
                                        type="danger">删除</el-button>
                                    <el-button
                                        @click="doAttrCope(scope.row,scope.index)"
                                        type="primary"  >属性</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                    <!-- {{dataAttr.total}} -->
                    <!--分页组件-->
                    <div v-if="dataAttr.totalAttr" class="pagination">
                        <el-pagination
                            background
                            layout="total,pager,jumper,sizes"
                            :current-page="queryAttr.pageNum"
                            :page-sizes="[10,25,50]"
                            :page-size="queryAttr.numPerPage"
                            :total="dataAttr.totalAttr"
                            @current-change="handlePageChangeAttr"
                            @size-change="handleSizeChangeAttr"
                            @selection-change="selsChange"
                        ></el-pagination>
                    </div>
                </div>
            </system-table>
        </div>
        
        <!-- <div v-if="showEdit">
            <attrcompEdit @doClose="closeAddPage" :attrEditObj='attrEditObj' 
                :type='type' :showEdit='showEdit' ></attrcompEdit>
        </div>
        <div v-if="showAdd">
            <attrcompAdd @doCloseAdd="closeAttrAdd" :attrAddObj='attrAddObj' 
                 :showAdd='showAdd' ></attrcompAdd>
        </div> -->
        </el-dialog>
    </div>
</template>

<script>
import { deleteKey, deepClone } from '@/utils';
import { compKindList, compKindObj, compTypeOb, isList, isObj,customerTypeList,customerTypeObj,compPrdtList,compPrdtObj } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import { createPCPButtons, findPCPButtons, updatePCPButtons,deletePCPButtons } from '@/api/parmbusi';

// import attrcompEdit from './attrcompedit.vue';
// import attrcompAdd from './attrcompadd.vue';
export default {
    name: 'temcompList',
    props: ['attrObj','attrList'],
    mixins: [MIXIN],
    // components: {attrcompEdit,attrcompAdd},
    data: function() {
        return {
            compKindList,
            compKindObj,
            isList,
            isObj,
            customerTypeList,
            customerTypeObj,
            compPrdtList,
            compPrdtObj,

            show: false,
            check: this.flagc,

            sels: [],
            type: '',
            type2: '',

            queryAttr: {
                pageNum: 1,
                numPerPage: 10,
                clickMenuIdAttr: this.clickMenuIdAttr,
                compCode: this.attrObj.compCode
            },

            dataAttr: {
                totalAttr: 20,
                rowsAttr: []
            },
            showEdit: false,
            attrEditObj: {},

            showAttr: false,//组件属性批量增加
            attrObjAdd: {},

            showAdd: false,
            attrAddObj: {},



            rules: {
                compPropertyName: [
                    {
                        required: true,
                        message: '请输入组件名称',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        flagb() {
            return flagc;
        },

        //选择单行数据时使用色块表示。
        handleCurrentChange(val) {
            this.attrEditObj = val;
        },

        clearSearch() {
            this.query.compClassification = '';
            this.query.compType = '';
        },

        //退出属性页
        async doExitEdit() {
            this.$emit('doAttrClose');
        },

        //属性查询
        async attrEdit(item) {
            this.attrEditPage = true;
            this.attrObj = item;
        },

        //组件属性查询
        queryCompAttr() {
            this.queryAttr.pageNum = 1;
            this.getListAttr(1);
        },
        //查询组件属性信息
        async getListAttr(bol) {
            if (bol) {
                let postObjAttr = deleteKey(this.queryAttr);
                postObjAttr.pageNum--;

                let info = await findPCPButtons(postObjAttr);
                if (info.resCode === '0') {
                    this.dataAttr = {
                        totalAttr: info.total,
                        rowsAttr: info.rows || []
                    };
                } else {
                    this.$msgbox({
                        message: info.resMsg
                    });
                    this.attrEditPage = false;
                }
            } else {
                this.attrEditPage = false;
            }
        },
        handlePageChangeAttr(num) {
            this.queryAttr.pageNum = num;
            this.getListAttr(num);
        },
        handleSizeChangeAttr(num) {
            this.queryAttr.pageNum = 1;
            this.queryAttr.numPerPage = num;
            this.getListAttr(num);
        },

        
        //关闭签页
        closeTab(index) {
            this.editableTabs.splice(index, 1), (this.editableTabsValue = this.editableTabs.length - 1 + '');
        },

        
        //显示要修改的属性内容
        async doAttrEdit(item) {
            this.showEdit = true;
            this.type = 'updat';
            this.attrEditObj = item;
        },
        async doAttrCope(item) { //复制
            this.showEdit = true;
            this.type = 'copy';
            this.attrEditObj = item;
        },
        async doAttrDel(item) { //删除
            this.showEdit = true;
            this.type = 'del';
            this.attrEditObj = item;
        },
        
        //关闭组件编辑组件
        async closeAddPage(){
            this.showEdit = false;
            this.getListAttr(1);
        },  
        
        //关闭新增属性界面
        async closeAttrAdd(){
            this.showAdd = false;
            this.getListAttr(1);
        },
        async attrComp() {
            this.showEdit = true;
            this.type = 'add';
            this.attrEditObj = {};
            this.attrEditObj.compCode = this.attrObj.compCode;
            this.attrEditObj.compName = this.attrObj.compName
        },

        // async attrComp() { //批量增加属性
        //     this.showAdd = true;
        //     this.attrAddObj.compCode = this.attrObj.compCode,
        //     this.attrAddObj.compName = this.attrObj.compName,
        //     this.attrAddObj.compClassification = this.attrObj.compClassification
        // },


        //表格选中时触发
        selsChange(sels) {
            this.sels = sels;
        },
        //批量删除组件属性删除
        addcompAll() {
            var ids= this.sels.map(item => item.id).join()//获取所有选中行的id组成的字符串，以逗号分隔
            this.$msgbox({
                title: '确认删除此组件属性吗？',
                beforeClose: async (action, instance, done) => {
                    if (action == 'confirm') {
                        let info = await deletePCPButtons({ids:ids});
                        
                        if (info.resCode === '0') {
                            this.$message.success(info.resMsg);
                            // this.attrEditPage = false;
                            this.queryCompAttr();
                        }
                         else {
                          this.$message.error(info.resMsg);
                        }
                        
                        done();
                    } else {
                        done();
                    }
                },
                
            }).catch(e => e);
        },
        getInfo(){
            let self = this;
            this.query.compClassification = this.$route.query.compClassification;
            this.query.compName = this.$route.query.compName;
            this.query.compName = this.$route.query.compName;
        } ,
        
    },
    mounted() {
        this.getInfo();
        this.getListAttr(1);
        this.compKindList.forEach(item => {
            this.compKindObj[item.value] = item.name;
        });

        this.isList.forEach(item => {
            this.isObj[item.value] = item.name;
        });
        this.customerTypeList.forEach(item => {
            this.customerTypeObj[item.value] = item.name;
        });
        this.compPrdtList.forEach(item => {
            this.compPrdtObj[item.value] = item.name;
        });
        
    }
};
</script>

})

<style>
.sortable-ghost {
    background: red;
}
</style>