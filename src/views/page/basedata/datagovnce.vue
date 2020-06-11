<template>
    <div>
        <system-table>
            <div slot="top">
                <el-form ref="form" :inline="true" label-width="120px">
                    <system-component :required="false" :query="query" />
                    <el-form-item label="响应码：">
                        <el-input style="width:200px;" v-model.trim="query.respCode" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="响应等级：">
                        <el-select style="width:200px;" v-model="query.respLevelSearch" placeholder="请选择" clearable>
                            <el-option label="W-警告" value="W"></el-option>
                            <el-option label="E-错误" value="E"></el-option>
                            <el-option label="I-通知" value="I"></el-option>
                            <el-option label="F-致命" value="F"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="响应信息：">
                        <el-input style="width:200px;" v-model.trim="query.respInfo" clearable></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="search">
                <el-button @click="queryList" type="primary">查询</el-button>
                <el-button @click="clearSearch" type="warning">清除</el-button>
            </div>
            <div slot="action">
                <el-button @click="doAdd" type="primary">添加</el-button>
            </div>
            <div slot="body">
                <el-table border ref="table" align="center" :data="data.rows" style="width: 100%;">
                    <el-table-column align="center" type="index" label="序号" width="50" />
                    <el-table-column align="center" label="系统">
                        <template slot-scope="scope">
                            {{sysObj[scope.row.sysId]}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="子系统">
                        <template slot-scope="scope">{{subSysObj[scope.row.subSysId]}}</template>
                    </el-table-column>

                    <el-table-column align="center" prop="respCode" label="响应码" />
                    <el-table-column align="center" prop="respLevel" label="响应等级">
                        <template slot-scope="scope">

                            {{levelDic[scope.row.respLevel]}}
                        </template>
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
            </div>


        </system-table>
        <div v-if="showAdd">
            <el-dialog title="新增操作" :visible="showAdd" width="800px" :show-close="false">
                <el-form ref="formAdd" :model="addObj" :rules="rules" :inline="true" label-width="140px">
                    <system-component :required="true" :query="addObj" />
                    <el-form-item label="响应码" :required="true" prop="respCode">
                        <el-input style="width:200px;" v-model.trim="addObj.respCode" />
                    </el-form-item>
                    <el-form-item label="响应等级：" :required="true" prop="respLevel">
                        <el-select style="width:200px;" v-model="addObj.respLevel" placeholder="请选择" clearable>
                            <el-option label="W-警告" value="W"></el-option>
                            <el-option label="E-错误" value="E"></el-option>
                            <el-option label="I-通知" value="I"></el-option>
                            <el-option label="F-致命" value="F"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="响应信息：" :required="true" prop="respInfo">
                        <el-input style="width:200px;" v-model.trim="addObj.respInfo" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="错误原因：">
                        <el-input style="width:200px;" v-model.trim="addObj.reason" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="解决方案：">
                        <el-input style="width:560px;" v-model.trim="addObj.solution"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="doCloseAdd(false)">取 消</el-button>
                    <el-button type="primary" @click="doCloseAdd(true)">确认添加</el-button>
                </div>
            </el-dialog>
        </div>
        <div v-if="showEdit">
            <el-dialog title="修改响应信息" :visible="showEdit" width="800px" :show-close="false">
                <el-form ref="formEdit" :model="editObj" :rules="rules" :inline="true" label-width="140px">
                    <system-component :required="true" :query="editObj" />
                    <el-form-item label="响应码" :required="true" prop="respCode">
                        <el-input style="width:200px;" v-model.trim="editObj.respCode" />
                    </el-form-item>
                    <el-form-item label="响应等级：" :required="true" prop="respLevel">
                        <el-select style="width:200px;" v-model="editObj.respLevel" placeholder="请选择" clearable>
                            <el-option label="W-警告" value="W"></el-option>
                            <el-option label="E-错误" value="E"></el-option>
                            <el-option label="I-通知" value="I"></el-option>
                            <el-option label="F-致命" value="F"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="响应信息：" :required="true" prop="respInfo">
                        <el-input style="width:200px;" v-model.trim="editObj.respInfo" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="错误原因：">
                        <el-input style="width:200px;" v-model.trim="editObj.reason" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="解决方案：">
                        <el-input style="width:560px;" v-model.trim="editObj.solution"></el-input>
                    </el-form-item>

                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="doCloseEdit(false)">取 消</el-button>
                    <el-button type="primary" @click="doCloseEdit(true)">确认修改</el-button>
                </div>
            </el-dialog>

        </div>

    </div>
</template>

<script>
    import { deleteKey, getSessionId, getSplitArr, getStrLowCase } from '@/utils';
    import MIXIN from "@views/mixin/button"
    import SYSTEM from "@views/mixin/system"
    import systemComponent from '@views/components/system.component.vue';
    import { queryListDatagovnce, createTp1012, updateTp1012, deleteTp1012 } from '@/api/basedata';
    export default {
        mixins: [MIXIN, SYSTEM],
        components: { systemComponent },

        data() {
            return {
                query: {
                    respCode: "",
                    respLevelSearch: "",
                    respInfo: "",
                    solution: "",
                    reason: "",
                    issueStatusSearch: "",
                    sysId: "",
                    subSysId: "",
                    pageNum: 1,
                    numPerPage: 10,

                },
                levelDic: {
                    "W": 'W-警告',
                    "E": 'E-错误',
                    "I": 'I-通知',
                    "F": 'F-致命'
                },
                statusDic: {
                    "1": '1-未发布',
                    "9": '9-已发布'
                },
                wordCode: "",
                showAdd: false,
                addObj: {
                    sysId: "",
                    subSysId: "",

                },
                showEdit: false,

                editObj: {
                   
                    subSysId: "",
                    sysId: "",
                   
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
                    respCode: [{ required: true, message: '请选择', trigger: 'blur' }],
                    respLevel: [{ required: true, message: '请选择响应等级', trigger: 'change' }],
                    respInfo: [{ required: true, message: '请输入', trigger: 'blur' }],
                    solution: [{ required: true, message: '请输入', trigger: 'blur' }],
                    reason: [{ required: true, message: '不能为空', trigger: 'blur' }],
                    issueStatus: [{ required: true, message: '请选择发布状态', trigger: 'blur' }],

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
                let postObj = { id: item.id, respCode: item.respCode };
                this.$msgbox({
                    title: '删除',
                    message: '确认删除该条数据吗？',

                    beforeClose: async (action, instance, done) => {
                        if (action == 'confirm') {
                            let info = await deleteTp1012(postObj);
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
                this.wordCode = "";
                this.showAdd = true;
                this.addObj = {
                    sysId: "",
                    subSysId: "",
                    respCode: "",
                    respLevel: "",
                    respInfo: "",
                    solution: "",
                    reason: "",
                    issueStatus: "0",

                };

            },
            doCloseAdd(bol) {
                if (bol) {
                    this.$refs['formAdd'].validate(async valid => {
                        if (valid) {
                            console.log("gaozhongguo" + this.addObj);
                            // return;

                            let info = await createTp1012(this.addObj);
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
                this.wordCode = "";
                this.showEdit = true;
                this.editObj = {
                    sysId: item.sysId,
                    subSysId:  item.subSysId,
                    respCode:  item.respCode,
                    respLevel:  item.respLevel,
                    respInfo:  item.respInfo,
                    solution: item.solution,
                    reason:  item.reason,
                    issueStatus: "",
                    id:item.id
                
                };
            },
            doCloseEdit(bol) {
                if (bol) {
                    this.$refs['formEdit'].validate(async valid => {
                        if (valid) {

                            let info = await updateTp1012(this.editObj);
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
            addCombin(item) {
                if (!this.wordCode) {
                    return this.$message.error("请在词根拼接处选择")
                }
                if (this[item].dictCode.length) {
                    this[item].dictCode += getStrLowCase(this.wordCode)

                }
                else {
                    this[item].dictCode = this.wordCode;

                }
                this[item].dictDesc += this.voCabObj[this.wordCode];

            },
            deleteCombin(arr) {

                if (this[arr].dictCode.length == 0) return;

                let list = getSplitArr(this[arr].dictCode).split(",");

                list.length = list.length - 1;
                console.log(list.length)
                console.log(list);
                list.forEach((item, index) => {
                    if (index) {
                        this[arr].dictCode += getStrLowCase(item);

                    }
                    else {
                        this[arr].dictCode = item;
                        this[arr].dictDesc = "";

                    }
                    this[arr].dictDesc += this.voCabObj[item];

                })
                if (list.length == 0) {
                    this.clearCombin();
                }


            },
            clearCombin(item) {
                this.addObj.dictCode = "";
                this.editObj.dictCode = "";
                this.addObj.dictDesc = ""
                this.editObj.dictDesc = ""
            },

            async getList(num) {
                let postObj = deleteKey(this.query);
                postObj.pageNum--;

                let info = await queryListDatagovnce(postObj);
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
            this.getVoCabList();

            // this.getList();
        }
    };
</script>