
  <template>
    <div>
        <el-dialog :visible="showAdd" width="1200px" :title="comptitle">
            <div>
                <system-table>
                    <div slot="top">
                        <el-form
                            inline
                            ref="formAdd"
                            :model="addObj"
                            size="small"
                            label-width="80px"
                        >
                            <el-form-item label="产品名称" prop="produvtName" v-if="show">
                                <el-input
                                    style="width:220;"
                                    v-model.trim="addObj.compName"
                                    :readonly="flag"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="模板名称" prop="compName">
                                <el-input
                                    style="width:220;"
                                    v-model.trim="addObj.compName"
                                    :readonly="flag"
                                ></el-input>
                            </el-form-item>

                            <el-form-item label="币种" prop="compClassification">
                                <el-select
                                    style="width:200;"
                                    :disabled="flag"
                                    v-model="addObj.compClassification"
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

                            <el-form-item label="模板分类">
                                <el-select
                                    style="width:200;"
                                    :disabled="flag1"
                                    v-model="addObj.compClassification"
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
                            <el-form-item label="模板子类">
                                <el-select
                                    style="width:200;"
                                    :disabled="flag1"
                                    v-model="addObj.productParamClassification"
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
                            <el-form-item label="客户类型">
                                <el-select
                                    style="width:200;"
                                    :disabled="flag1"
                                    v-model="addObj.compClassification"
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
                                    :disabled="flag1"
                                    v-model="addObj.productParamClassification"
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

                            <el-form-item label="高净值" prop="sysId">
                                <el-input
                                    style="width:200;"
                                    v-model.trim="addObj.inspectionRules"
                                    :readonly="flag"
                                ></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div slot="action">
                        <el-button @click="compAdd" type="primary" v-if="showBut">组件新增</el-button>
                        <el-button @click="compdel" type="primary" v-if="showBut">组件删除</el-button>
                    </div>
                    <div slot="body">
                        <template v-for="(col) in tabdatas">
                            <el-tab-pane
                                :show-overflow-tooltip="true"
                                :prop="col.dataItem"
                                :label="col.dataName"
                                :key="col.dataItem"
                                width="124px"
                            ></el-tab-pane>
                        </template>
                        <!-- <el-tabs >
                            <el-tab-pane label="用户管理" name="first">开户组件</el-tab-pane>
                            <el-tab-pane label="用户管理" name="first">计息组件</el-tab-pane>
                        </el-tabs>-->
                        <el-tabs
                            v-model="editableTabsValue"
                            type="card"
                            editable
                            @edit="handleTabsEdit"
                        >
                            <el-tab-pane
                                :key="item.name"
                                v-for="(item) in editableTabs"
                                :label="item.title"
                                :name="item.name"
                            >
                                <el-form
                                    ref="formAttr"
                                    :model="addObj"
                                    inline
                                    size="small"
                                    label-width="300px"
                                >
                                    <div>
                                        <!-- <el-form-item label="属性名称" prop="compPropertyName">
                                            <el-input
                                                style="width:200px;"
                                                v-model.trim="addObj.compPropertyName"
                                            ></el-input>
                                        </el-form-item>
                                        <el-form-item label="属性选择方式" prop="selectionMethod">
                                            <el-select
                                                style="width:200px;"
                                                v-model="addObj.selectionMethod"
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
                                        </el-form-item> -->

                                        <template v-for="(col) in item.tableData">
                                            <el-form-item
                                                :show-overflow-tooltip="true"
                                                :prop="col.dataItem"
                                                :label="col.dataName"
                                                :key="col.dataItem"
                                            >
                                                <el-select
                                                    style="width:200px;"
                                                    v-model="addObj.brcName"
                                                    :disabled="flag"
                                                    clearable
                                                    placeholder="请选择"
                                                >
                                                    <el-option
                                                        :key="index+'cc'"
                                                        v-for="(item,index) in isList"
                                                        :label="item.value+'-'+item.name"
                                                        :value="item.value"
                                                    ></el-option>
                                                    <!-- {{col}} -->
                                                </el-select>
                                                <!-- <el-input
                                                    style="width:200px;"
                                                    v-model.trim="addObj.brcName"
                                                    :disabled="flag"
                                                ></el-input> -->
                                            </el-form-item>
                                        </template>
                                    </div>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </system-table>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="doCommit">确 认</el-button>
                <el-button type="warning" @click="doCansel">取 消</el-button>
            </div>
            <div v-if="attrList">
                <temcompList @doAttrClose="closeattrPage" :attrObj='attrObj' :attrList='attrList'
                    type = 'type'
                ></temcompList>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { deleteKey, deepClone } from '@/utils';
import { compKindList, compPrdtList, customerTypeList, isList } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import { createCompButtons, updateCompButtons, deleteCompButtons } from '@/api/parmbusi';
import temcompList from './temcomplist.vue';
export default {
    name: 'templatEdit',
    props: ['addObj', 'type', 'showAdd'],
    components: {temcompList},
    mixins: [MIXIN],
    data: function () {
        return {
            type2: '',

            compKindList,
            compPrdtList,
            customerTypeList,
            isList,

            show: false,
            showBut: true,
            flag: false,
            flagc: false,
            flag1: false,
            comptitle: '',

            oldName: '',
            postObj: {},

            attrList: false,
            attrEditPObj: {},
            attrObj: {},

            tableData: [],
            

            tabdatas: [
                // {
                //     dataItem: 'brcCode',
                //     dataName: '开户组件'
                // },
                // {
                //     dataItem: 'brcName',
                //     dataName: '计息组件'
                // },
                // {
                //     dataItem: 'brcSrt',
                //     dataName: '还款组件'
                // }
            ],

            editableTabsValue: '2',
            editableTabs: [
                {
                    title: '开户定义',
                    name: '1',
                    content: 'Tab 1 content',
                    tableData: [
                        {dataItem: 'brcName', dataName: '存款类别'},
                        {dataItem: 'corpBrc', dataName: '支取方式'},
                        {dataItem: 'brcName', dataName: '通兑级别'},
                        {dataItem: 'brcName', dataName: '计息标志'},
                        {dataItem: 'brcName', dataName: '计税标志'},
                        {dataItem: 'brcName', dataName: '结算标志'}
                    ]
                },
                {
                    title: '存入定义',
                    name: '2',
                    content: 'Tab 2 content',
                    tableData: [
                        {dataItem: 'brcName', dataName: '单次最小金额'},
                        {dataItem: 'corpBrc', dataName: '单次最大金额'},
                        {dataItem: 'brcName', dataName: '最大存入金额'},
                        {dataItem: 'brcName', dataName: '最大存入次数'},
                        {dataItem: 'brcName', dataName: '现金存入标志'},
                        {dataItem: 'brcName', dataName: '转账存入标志'},
                        {dataItem: 'brcName', dataName: '留存最大金额'}
                    ],
                },
                {
                    title: '计息定义',
                    name: '3',
                    content: 'Tab 3 content',
                    tableData: [
                        {dataItem: 'brcName', dataName: '计息周期单位'},
                        {dataItem: 'corpBrc', dataName: '计息周期'},
                        {dataItem: 'brcName', dataName: '结息周期单位'},
                        {dataItem: 'brcName', dataName: '结息周期'}
                    ],
                }
            ],
            tabIndex: 3,

        };
    },
    methods: {

        async compAdd() {
            this.type2 = 'add';
            this.attrList = true;
            this.attrObj.compName = this.addObj.compName;
            this.attrObj.compClassification = this.addObj.compClassification;
            this.attrObj.compClassification = this.addObj.compClassification;
        },
        async closeattrPage(){
           this.attrList = false;
        },

        handleTabsEdit(targetName, action) {
            if (action === 'add') {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                    title: 'New Tab',
                    name: newTabName,
                    content: 'New Tab content'
                });
                this.editableTabsValue = newTabName;
            }
            if (action === 'remove') {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }

                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
            }
        },

        checkFlag1() {
            if (this.addObj.compClassification == '3') {
                this.flag1 = false;
            } else {
                this.addObj.productParamClassification = '';
                this.flag1 = true;
            }
        },
        doCommit() {
            
        },
        // compAdd() {},
        compdel() {},
        doCansel() {
            this.$emit('doClose');
        },

        doDel() {
            this.$msgbox({
                title: '确认删除此组件吗？',
                beforeClose: async (action, instance, done) => {
                    if (action == 'confirm') {
                        let postObj = {
                            ids: this.addObj.id,
                            compName: this.addObj.compName
                        };
                        let info = await deleteCompButtons(postObj);
                        if (info.resCode === '0') {
                            this.$message.success('删除成功');
                            this.$emit('doClose');
                        }

                        done();
                    } else if (action == 'cancel') {
                        console.log('22');
                        done();
                    } else {
                        done();
                    }
                }
            }).catch((e) => e);
        },

        async doClose() {
            let info = '';
            if (this.type == 'add') {
                console.log('3333');
                info = await createCompButtons(this.addObj);
            } else if (this.type == 'copy') {
                //若不改名字，原来名字后加复制
                if (this.oldName == this.addObj.compName) {
                    this.addObj.compName += '复制';
                }
                info = await createCompButtons(this.addObj);
            } else if (this.type == 'updat') {
                info = await updateCompButtons(this.addObj);
            }
            if (info.resCode === '0') {
                this.$message.success('交易成功');
                this.$emit('doClose');
            } else {
                this.$alert('交易失败', info.resMsg);
            }
        }
    },
    mounted() {
        if (this.type == 'updat') {
            this.flag = false;
            this.flagc = true;
            this.comptitle = '模板修改';
        } else if (this.type == 'add') {
            this.flagc = false;
            this.flag = false;
            this.comptitle = '模板新增';
        } else if (this.type == 'copy') {
            this.oldName = this.addObj.compName;
            this.flagc = false;
            this.flag = false;
            this.comptitle = '模板复制';
        } else if (this.type == 'del') {
            this.comptitle = '模板删除';
            this.flag = true;
            this.flagc = true;
        } else if (this.type == 'product') {
            this.comptitle = '配置产品';
            this.flag = true;
            this.flagc = true;
            this.show = true;
            this.showBut = false;
        } else if (this.type == 'upPro') {
            this.comptitle = '修改产品';
        } else if (this.type == 'diff') {
            this.comptitle = '产品差异化';
        }
        this.flag1 = this.flag;
    }
};
</script>

})

