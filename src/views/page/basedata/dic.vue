<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <!--工具栏-->
                <div class="head-container">
                    <el-card>
                        <el-form ref="form" :inline="true" label-width="120px">
                            <system-component :required="false" :query="query" />

                            <el-form-item label="字典代码">
                                <el-input style="width:200px;" v-model.trim="query.dictCode"></el-input>
                            </el-form-item>
                            <el-form-item label="中文名称">
                                <el-input style="width:200px;" v-model.trim="query.dictDesc"></el-input>
                            </el-form-item>
                            <el-form-item label="数据字典类型">
                                <el-select style="width:200px;" v-model="query.dictCodeType" clearable
                                    placeholder="请选择">
                                    <el-option :key="index+'c3'" v-for="(item,index) in dicCodeList"
                                        :label="item.optionValue+'-'+item.optionDesc" :value="item.optionValue">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据类型">
                                <el-select style="width:200px;" v-model="query.type" clearable placeholder="请选择">
                                    <el-option :key="index+'c4'" v-for="(item,index) in typeList"
                                        :label="+item.optionDesc" :value="item.optionDesc">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="长度">
                                <el-input style="width:200px;" v-model.trim="query.length"></el-input>

                            </el-form-item>
                            <el-form-item label="小数">
                                <el-input style="width:200px;" v-model.trim="query.point"></el-input>

                            </el-form-item>
                        </el-form>
                        <div class="header-search">
                            <el-button @click="queryList" type="primary">查询</el-button>
                            <el-button @click="clearSearch" type="warning">清除</el-button>
                        </div>
                    </el-card>
                    <!-- <crudOperation show="" :permission="permission" /> -->
                </div>
                <div class="header-button">
                    <el-button @click="doAdd" type="primary">添加</el-button>
                </div>
                <!--表单渲染-->

                <!--表格渲染-->
                <el-table border ref="table" align="center" :data="data.rows" style="width: 100%;">
                    <el-table-column align="center" type="index" label="序号" width="50" />

                    <el-table-column align="center" prop="userSex" label="子系统">
                        <template slot-scope="scope">{{subSysObj[scope.row.subSysId]}}</template>
                    </el-table-column>
                    <el-table-column align="center" prop="dictCode" label="字典代码" />
                    <el-table-column align="center" prop="dictDesc" label="中文名称" />
                    <el-table-column align="center" prop="type" label="数据类型" />
                    <el-table-column align="center" prop="length" label="长度" />
                    <el-table-column align="center" prop="point" label="小数" />
                    <el-table-column align="center" prop="userSex" label="数据字典类型">
                        <template slot-scope="scope">{{dicCodeObj[scope.row.dictCodeType]}}</template>
                    </el-table-column>
                  



                    <el-table-column label="操作" width="280" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button @click="doEdit(scope.row,scope.index)" type="primary">修改</el-button>
                            <el-button @click="doDelete(scope.row,scope.index)" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--分页组件-->
                <div v-if="data.total" class="pagination">
                    <el-pagination background layout="total,pager,jumper,sizes" :current-page="query.pageNum"
                        :page-sizes="[10,25,50]" :page-size="query.numPerPage" :total="data.total"
                        @current-change="handlePageChange" @size-change="handleSizeChange"></el-pagination>
                </div>
            </el-col>
        </el-row>
        <div v-if="showAdd">
            <el-dialog title="添加词根" :visible="showAdd" width="800px" :show-close="false">
                <el-form ref="formAdd" :model="addObj" :rules="rules" :inline="true" label-width="140px">
                    <system-component :required="true" :query="addObj" />
                    <el-form-item prop="dictCodeType" label="数据字典类型">
                        <el-select style="width:200px;" v-model="addObj.dictCodeType" clearable
                            placeholder="请选择">
                            <el-option :key="index+'c3'" v-for="(item,index) in dicCodeList"
                                :label="item.optionValue+'-'+item.optionDesc" :value="item.optionValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="type" label="数据类型">
                        <el-select style="width:200px;" v-model="addObj.type" clearable placeholder="请选择">
                            <el-option :key="index+'c4'" v-for="(item,index) in typeList"
                                :label="+item.optionDesc" :value="item.optionDesc">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="长度">
                        <el-input style="width:200px;" v-model.trim="addObj.length"></el-input>

                    </el-form-item>
                    <el-form-item label="小数">
                        <el-input style="width:200px;" v-model.trim="addObj.point"></el-input>

                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="doCloseAdd(false)">取 消</el-button>
                    <el-button type="primary" @click="doCloseAdd(true)">确认添加</el-button>
                </div>
            </el-dialog>
        </div>
        <div v-if="showEdit">
            <el-dialog title="添加词根" :visible="showEdit" width="800px" :show-close="false">
                <el-form ref="formEdit" :model="editObj" :rules="rules" :inline="true" label-width="80px">
                    <system-component :required="true" :query="editObj" />
                    <el-form-item prop="dataStand" label="数据标准">
                        <el-select style="width:200px;" v-model="editObj.dataStand" clearable placeholder="请选择">
                            <el-option :key="index+'cc'" v-for="(item,index) in dataStandList"
                                :label="item.value+'-'+item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="wordCode" label="英文词根">
                        <el-input style="width:200px;" v-model.trim="editObj.wordCode"></el-input>
                    </el-form-item>
                    <el-form-item prop="wordDesc" label="中文描述">
                        <el-input style="width:200px;" v-model.trim="editObj.wordDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="英文全称">
                        <el-input style="width:200px;" v-model.trim="editObj.englishDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-input disabled style="width:200px;" v-model.trim="editObj.createUser"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-input disabled style="width:200px;" v-model.trim="editObj.createTime"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="doCloseEdit(false)">取 消</el-button>
                    <el-button type="primary" @click="doCloseEdit(true)">确认添加</el-button>
                </div>
            </el-dialog>

        </div>

    </div>
</template>

<script>
    import { deleteKey, getSessionId } from '@/utils';
    import MIXIN from "@views/mixin/button"
    import SYSTEM from "@views/mixin/system"
    import systemComponent from '@views/components/system.component.vue';
    import { queryDictList, createVocab, updateVocab, deleteVocab } from '@/api/basedata';
    export default {
        mixins: [MIXIN, SYSTEM],
        components: { systemComponent },

        data() {
            return {
                query: {
                    dictCode: '',
                    sysId: "",
                    dictDesc: "",
                    subSysId: "",
                    pageNum: 1,
                    numPerPage: 10,
                    clickMenuId: this.clickMenuId,
                },



                showAdd: false,
                addObj: {
                    sysId: "",
                    subSysId: "",
                    dataStand: "",
                },
                showEdit: false,
                showRole: false,
                editObj: {
                    buttonId: '',
                    buttonName: '',
                    popId: ''
                },


                data: {
                    total: 0,

                    rows: []
                },
                selectPeople: '',
                checkedRole: [],

                rules: {
                    sysId: [{ required: true, message: '请选择系统', trigger: 'change' }],
                    subSysId: [{ required: true, message: '请选择系统', trigger: 'change' }],
                    dictCodeType: [{ required: true, message: '请选择', trigger: 'change' }],
                    type: [{ required: true, message: '请选择', trigger: 'change' }],
                    length: [{ required: true, message: '请输入', trigger: 'blur' }],
                    point: [{ required: true, message: '请输入', trigger: 'blur' }],

                }
            };
        },
        methods: {
            clearSearch() {
                this.query = {

                    sysId: "",
                    subSysId: "",

                    pageNum: 1,
                    numPerPage: 10
                };
            },
            doDelete(item) {
                let postObj = { id: item.id, click, clickMenuId: this.clickMenuId };
                this.$msgbox({
                    title: '删除',
                    message: '确认删除此该词根吗？',

                    beforeClose: async (action, instance, done) => {
                        if (action == 'confirm') {
                            let info = await deleteVocab(postObj);
                            if (info.resCode === '0') {
                                this.$message.success('删除成功');
                                this.getList();
                            }
                            done();
                        } else {
                            done();
                        }
                    }
                });
            },

            doAdd() {
                this.showAdd = true;
                this.addObj = {
                    sysId: "",
                    subSysId: "",
                };

            },
            doCloseAdd(bol) {
                if (bol) {
                    this.$refs['formAdd'].validate(async valid => {
                        if (valid) {
                            this.addObj.clickMenuId = this.clickMenuId
                            let info = await createVocab(this.addObj);
                            if (info.resCode === '0') {
                                this.$message.success('添加成功');
                                this.queryList();
                                this.showAdd = false;
                            }
                        }
                    });
                } else {
                    this.showAdd = false;
                }
            },
            doEdit(item) {
                this.showEdit = true;
                this.editObj = {
                    createTime: item.createTime,
                    createUser: item.createUser,
                    dataStand: item.dataStand,
                    englishDesc: item.englishDesc,
                    id: item.id,



                    subSysId: item.subSysId,
                    sysId: item.sysId,

                    wordCode: item.wordCode,
                    wordDesc: item.wordDesc,
                };
            },
            doCloseEdit(bol) {
                if (bol) {
                    this.$refs['formEdit'].validate(async valid => {
                        if (valid) {
                            this.editObj.clickMenuId = this.clickMenuId;
                            let info = await updateVocab(this.editObj);
                            if (info.resCode === '0') {
                                this.$message.success('修改成功');
                                this.getList();
                                this.showEdit = false;
                            }
                        }
                    });
                } else {
                    this.showEdit = false;
                }
            },
            async getList(num) {
                let postObj = deleteKey(this.query);
                postObj.pageNum--;
                postObj.clickMenuId = this.clickMenuId;

                let info = await queryDictList(postObj);
                if (info.resCode === '0') {
                    this.data = {
                        total: info.total,
                        rows: info.rows || []
                    };
                }
            },
            queryList() {
                this.query.pageNum = 1;
                this.getList(1);
            },
            handlePageChange(num) {
                this.query.pageNum = num;
                this.getList(num);
            },
            handleSizeChange(num) {
                this.query.pageNum = 1;
                this.query.numPerPage = num;
                this.getList(num);
            },

        },
        mounted() {
            this.getDicCodeList();
            this.getDicList();

            // this.getList();
        }
    };
</script>