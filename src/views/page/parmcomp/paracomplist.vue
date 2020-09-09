
  <template>
    <div>
        <el-dialog :visible="paraList" width="1200px" :title="this.paraObj.compName">
            <div>
                <system-table ref="paraList">
                    <div slot="top">
                        <el-form ref="attrEditPage" inline label-width="80px">
                            <el-form-item label="组件编码" prop="compCode">
                                <el-input
                                    v-model.trim="paraObj.compCode"
                                    readonly
                                    style="width: 200;"
                                />
                            </el-form-item>
                            <el-form-item label="组件名称" prop="compName">
                                <el-input
                                    v-model.trim="paraObj.compName"
                                    readonly
                                    style="width: 200px;"
                                />
                            </el-form-item>
                            <el-form-item label="组件分类" prop="compClassification">
                                <el-select
                                    style="width:200px;"
                                    v-model="paraObj.compClassification"
                                    disabled
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
                                    disabled
                                    v-model="paraObj.productParamClassification"
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
                        </el-form>
                    </div>

                    <div slot="action" style="margin-bottom: 20px;">
                        <el-button type="warning" @click="doExitEdit">返 回</el-button>
                        <el-button
                            type="danger"
                            @click="deleteAll(sels) "
                            :disabled="this.sels.length === 0"
                        >批量删除</el-button>
                        <el-button type="primary" @click="attrComp">增加属性</el-button>
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

                            <template v-for="(col) in this.tableData">
                                <el-table-column
                                   
                                    :show-overflow-tooltip="true"
                                    :prop="col.dataItem"
                                    :label="col.dataName"
                                    :key="col.dataItem"
                                    width="124px"
                                ></el-table-column>
                            </template>

                            <el-table-column label="操作" align="center" fixed="right" width="300">
                                <template slot-scope="scope">
                                    <el-button
                                        @click="doAttrCope(scope.row,scope.index)"
                                        type="primary"
                                    >复制</el-button>
                                    <el-button
                                        @click="doAttrEdit(scope.row,scope.index)"
                                        type="warning"
                                    >修改</el-button>
                                    <el-button
                                        @click="doAttrDel(scope.row,scope.index)"
                                        type="danger"
                                    >删除</el-button>
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

            <div v-if="showEdit">
                <paracompEdit
                    @doClose="closeAddPage"
                    :attrEditObj="attrEditObj"
                    :type="type"
                    :showEdit="showEdit"
                    :tableData ="tableData"
                ></paracompEdit>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { deleteKey, deepClone } from '@/utils';
import { compKindList, compKindObj, compTypeOb, isList, isObj } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import { createPCPButtons, queryPagPdBButtons, updatePCPButtons, deletePCPButtons } from '@/api/parmbusi';

import paracompEdit from './paracompedit.vue';

export default {
    name: 'paracompList',
    props: ['paraObj', 'paraList'],
    components: {paracompEdit},
    mixins: [MIXIN],
    data: function () {
        return {
            compKindList,
            compKindObj,
            isList,
            isObj,

            comptitle: '',
            show: false,
            check: this.flagc,
            compPrdtList: false,

            sels: [],
            type: '',

            queryAttr: {
                pageNum: 1,
                numPerPage: 10,
                clickMenuIdAttr: this.clickMenuIdAttr,
                compCode: this.paraObj.compCode
            },

            dataAttr: {
                totalAttr: 20,
                rowsAttr: [],
                tableData: []
            },
            showEdit: false,
            attrEditObj: {},

            showAttr: false, //组件属性批量增加
            paraObjAdd: {},

            showAdd: false,
            attrAddObj: {},
            // tableData:[]

            tableData: [
                {
                    dataItem: 'brcCode',
                    dataName: '卡片种类'
                },
                {
                    dataItem: 'brcName',
                    dataName: '卡片种类说明'
                },
                {
                    dataItem: 'brcSrt',
                    dataName: '卡BIN'
                },
                {
                    dataItem: 'corpBrc',
                    dataName: '卡种序号'
                },
                {
                    dataItem: 'belongAccBrc',
                    dataName: '凭证种类'
                },
                {
                    dataItem: 'belongCountry',
                    dataName: '有效期'
                }
            ],

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
            this.$emit('doparaClose');
        },

        //属性查询
        async attrEdit(item) {
            this.attrEditPage = true;
            this.paraObj = item;
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

                let info = await queryPagPdBButtons(postObjAttr);
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
            console.log(this.tableData);
        },
        async doAttrCope(item) {
            //复制
            this.showEdit = true;
            this.type = 'copy';
            this.attrEditObj = item;
        },
        async doAttrDel(item) {
            //删除
            this.showEdit = true;
            this.type = 'del';
            this.attrEditObj = item;
        },

        //关闭组件编辑组件
        async closeAddPage() {
            this.showEdit = false;
            this.getListAttr(1);
        },

        //关闭新增属性界面
        async closeAttrAdd() {
            this.showAdd = false;
            this.getListAttr(1);
        },
        async attrComp() {
            this.showEdit = true;
            this.type = 'add';
            this.attrEditObj = {};
            this.attrEditObj.compCode = this.paraObj.compCode;
            this.attrEditObj.compName = this.paraObj.compName;
        },

        // async attrComp() { //批量增加属性
        //     this.showAdd = true;
        //     this.attrAddObj.compCode = this.paraObj.compCode,
        //     this.attrAddObj.compName = this.paraObj.compName,
        //     this.attrAddObj.compClassification = this.paraObj.compClassification
        // },

        //表格选中时触发
        selsChange(sels) {
            this.sels = sels;
        },
        //批量删除组件属性删除
        deleteAll() {
            var ids = this.sels.map((item) => item.id).join(); //获取所有选中行的id组成的字符串，以逗号分隔
            this.$msgbox({
                title: '确认删除此组件属性吗？',
                beforeClose: async (action, instance, done) => {
                    if (action == 'confirm') {
                        let info = await deletePCPButtons({ ids: ids });

                        if (info.resCode === '0') {
                            this.$message.success(info.resMsg);
                            // this.attrEditPage = false;
                            this.queryCompAttr();
                        } else {
                            this.$message.error(info.resMsg);
                        }

                        done();
                    } else {
                        done();
                    }
                }
            }).catch((e) => e);
        }
    },
    mounted() {
        this.comptitle = 'this.paraObj.compCode';
        this.getListAttr(1);
        this.compKindList.forEach((item) => {
            this.compKindObj[item.value] = item.name;
        });

        this.isList.forEach((item) => {
            this.isObj[item.value] = item.name;
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