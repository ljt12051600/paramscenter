
  <template>
    <div>
        <el-dialog :visible="dataShow" width="800" title="元数据查询">
            <div>
                <system-table ref="dataShow">
                    <div slot="top">
                        <el-form ref="attrEditPage" inline label-width="100px">
                            <!-- <el-form-item label="系统" prop="sysId">
                                <el-select style="width:200px;" v-model="query.sysId" clearable @change="changeSysId">
                                    <el-option
                                        v-for="(item,index) in sysList"
                                        :key="index+'yy'"
                                        :label="item.sysId+'-'+item.sysName"
                                        :value="item.sysId"
                                    ></el-option>
                                </el-select>
                            </el-form-item> -->
                            <!-- <el-form-item label="子系统" prop="subSysId">
                                <el-select style="width:200px;" v-model="query.subSysId" clearable  @change="changeSubSysId">
                                    <el-option
                                        :key="index+'xx'"
                                        v-for="(item,index) in subSysList"
                                        :label="item.subSysId+'-'+item.subSysName"
                                        :value="item.subSysId"
                                    ></el-option>
                                </el-select>
                            </el-form-item> -->
                            <!-- <el-form-item label="数据标准" prop="dataStand">
                                <el-select style="width:200px;" v-model="query.optionValue" clearable @change="changeStandId" placeholder="1">
                                    <el-option
                                        :key="index+'cc'"
                                        v-for="(item,index) in dataStandList"
                                        :label="item.optionValue+'-'+item.optionDesc"
                                        :value="item.optionValue"
                                    ></el-option>
                                </el-select>
                            </el-form-item> -->
                            <el-form-item label="元数据代码" prop="unitDataCode" width="200px">
                                <el-input
                                    v-model.trim="query.unitDataCode"
                                    style="width: 200px;"
                                />
                            </el-form-item>
                            <el-form-item label="元数据名称" prop="unitDataDesc">
                                <el-input
                                    v-model.trim="query.unitDataDesc"
                                    style="width: 200px;"
                                />
                            </el-form-item>
                            <!-- <el-form-item label="数据字典" prop="dataStandSearch">
                                <el-input
                                    v-model.trim="query.dataStandSearch"
                                    style="width: 200px;"
                                />
                            </el-form-item> -->
                        </el-form>
                    </div>
                    <div slot="search" style="margin-bottom: 20px;">
                        
                        <el-button @click="queryComp" type="primary">查询</el-button>
                        <el-button @click="clearSearch">重置</el-button>
                        <el-button  @click="doExitEdit">返 回</el-button>
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
                            <el-table-column align="center" prop="unitDataCode" label="元数据代码" />
                            <el-table-column align="center" prop="unitDataDesc" label="中文名称" />
                            <el-table-column align="center" prop="type" label="数据类型" />
                            
                            <el-table-column align="center" prop="length" label="数据长度" />
                            <el-table-column align="center" prop="optionCode" label="选项代码" />
                            <el-table-column align="center" prop="optionGroup" label="选项组别" />

                            <!-- <el-table-column align="center" prop="optionGroup" label="选项组别">
                                <template slot-scope="scope">{{isObj[scope.row.selectionMethod]}}</template>
                            </el-table-column> -->
                        </el-table>
                        <!-- {{dataAttr.total}} -->
                        <!--分页组件-->
                        <div v-if="dataAttr.totalAttr" class="pagination">
                            <el-pagination
                                background
                                layout="total,pager,jumper,sizes"
                                :current-page="query.pageNum"
                                :page-sizes="[10,25,50]"
                                :page-size="query.numPerPage"
                                :total="dataAttr.totalAttr"
                                @current-change="handlePageChangeAttr"
                                @size-change="handleSizeChangeAttr"
                                @selection-change="selsChange"
                            ></el-pagination>
                        </div>
                    </div>
                </system-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { deleteKey, deepClone } from '@/utils';
import { isList, isObj, smList, smObj } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import { queryUnitDataList, queryTp3003, queryTp3004,queryOptionCodeNoPage } from '@/api/basedata';
export default {
    name: 'dataList',
    props: ['dataObj', 'dataShow'],
    mixins: [MIXIN],

    data: function () {
        return {
            sysList: [],
            sysObj: {},
            subSysList: [],
            subSysObj: {},
            dataStandList: [],
            dataStandObj: {},
            isList,
            isObj,
            smList,
            smObj,
            query: {
                type: Object,
                sysId: '',
                subSysId: '',
                dataStand: '',
                unitDataCode: '',
                unitDataDesc: '',
                dictCode: '',
                status: '1',

                pageNum: 1,
                numPerPage: 10,
                clickMenuIdAttr: this.clickMenuIdAttr
            },

            // dataShow: true,
            show: false,
            check: this.flagc,

            sels: [],
            type: '',

            dataAttr: {
                totalAttr: 20,
                rowsAttr: []
            },
            attrEditObj: {},

            showAttr: false, //组件属性批量增加
            dataObjAdd: {},

            showAdds: false,
            attrAddObjs: {},

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
        async getSysList() {
            let info = await queryTp3003();
            if (info.resCode === '0') {
                this.sysList = info.rows || [];
                info.rows.forEach((item) => {
                    this.sysObj[item.sysId] = item;
                });
                this.changeSysId();
            }
            
        },
        async getSubSysList(id) {
            let info = await queryTp3004({ sysId: id });
            if (info.resCode === '0') {
                this.subSysList = info.rows || [];
                this.subSysObj = {};
                info.rows.forEach((item) => {
                    this.subSysObj[item.subSysId] = item;
                });

                if (this.query.subSysId && !this.subSysObj[this.query.subSysId]) {
                    this.query.subSysId = '';
                    this.query.subSysIdDesc = '';
                    if (!this.required) {
                        this.query.subSysIdSearch = '';
                    }
                }
                this.changeSubSysId();
            }
        },
        changeSysId() {
            if (!this.query.sysId) {
                this.query.sysIdDesc = '';
                if (!this.required) {
                    this.query.sysIdSearch = '';
                    this.query.subSysIdSearch = '';
                }

                this.query.subSysId = '';
                this.query.subSysIdDesc = '';

                this.subSysList = [];
            } else {
                this.$emit('changesysid', this.sysId);
                if (!this.required) {
                    this.query.sysIdSearch = this.query.sysId;
                }
                this.query.sysIdDesc = this.query.sysId + '-' + this.sysObj[this.query.sysId].sysName;
                this.getSubSysList(this.query.sysId);
            }
        },
        changeSubSysId() {
            if (!this.query.subSysId) {
                this.query.subSysIdDesc = '';
                if (!this.required) {
                    this.query.subSysIdSearch = '';
                }
            } else {
                if (!this.required) {
                    this.query.subSysIdSearch = this.query.subSysId;
                }

                this.query.subSysIdDesc = this.query.subSysId + '-' + this.subSysObj[this.query.subSysId].subSysName;
                
            }
        },
        
        async getImpLevelList() {
            let info = await queryOptionCodeNoPage({ optionCode: "dataStand" });
            if (info.resCode === "0") {
                this.dataStandList = info.rows || [];
                info.rows.forEach(item => {
                    this.dataStandObj[item.optionValue] = item.optionDesc
                });
                this.changeStandId()
            }
        },
        changeStandId() {
            if (!this.query.optionValue) {
                this.query.optionDesc = '';
                if (!this.required) {
                    this.query.optionValueSearch = '';
                }
            } else {
                if (!this.required) {
                    this.query.optionValueSearch = this.query.optionValue;
                }
                this.query.optionDesc = this.query.optionValue + '-' + this.dataStandObj[this.query.optionValue].optionName;
            }
        },

        flagb() {
            return flagc;
        },

        //选择单行数据时使用色块表示。
        handleCurrentChange(val) {
            this.attrEditObj = val;
        },

        clearSearch() {
            this.query.sysId = '';
            this.query.subSysId = '';
            this.query.dataStand = '';
            this.query.unitDataCode = '';
            this.query.unitDataDesc = '';
            this.query.dictCode = '';
        },

        //退出属性页
        async doExitEdit() {
            this.$emit('doAttrClose');
        },

        //属性查询
        async attrEdit(item) {
            this.attrEditPage = true;
            this.dataObj = item;
        },

        //组件属性查询
        queryComp() {
            this.query.pageNum = 1;
            this.getListAttr(1);
        },
        //查询组件属性信息
        async getListAttr(bol) {
            if (bol) {
                let query = deleteKey(this.query);
                query.pageNum--;

                let info = await queryUnitDataList(query);
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
            this.query.pageNum = num;
            this.getListAttr(num);
        },
        handleSizeChangeAttr(num) {
            this.query.pageNum = 1;
            this.query.numPerPage = num;
            this.getListAttr(num);
        },

        //关闭签页
        closeTab(index) {
            this.editableTabs.splice(index, 1), (this.editableTabsValue = this.editableTabs.length - 1 + '');
        },

        //关闭组件编辑组件
        async closeAddPage() {
            this.showEdit = false;
            this.getListAttr(1);
        },
        //表格选中时触发
        selsChange(sels) {
            this.sels = sels;
        },
        
    },
    mounted() {
        this.getSysList();
        this.getImpLevelList();
        this.isList.forEach((item) => {
            this.isObj[item.value] = item.name;
        });

        this.smList.forEach((item) => {
            this.smObj[item.value] = item.name;
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