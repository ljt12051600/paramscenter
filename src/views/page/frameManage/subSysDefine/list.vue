<template>
    <div>
        <system-table>
            <div slot="top">
                <el-form ref="form" :inline="true" label-width="100px">
                    <el-form-item label="系统">
                        <el-select v-model="query.sysId" filterable clearable placeholder="请选择"
                            style="width:200px;">
                            <el-option v-for="item in sys" :key="item.sysId" :label="item.sysId + '-' +item.sysName"
                                :value="item.sysId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="子系统标识">
                        <el-input style="width:200px;" v-model.trim="query.subSysId"></el-input>
                    </el-form-item>
                    <el-form-item label="子系统名称">
                        <el-input style="width:200px;" v-model.trim="query.subSysName"></el-input>
                    </el-form-item>
                    <el-form-item label="子系统顺序号">
                        <el-input style="width:200px;" v-model.trim="query.displaySeqno"></el-input>
                    </el-form-item>
                    <el-form-item label="交易编码前缀">
                        <el-input style="width:200px;" v-model.trim="query.tranCodePrefix"></el-input>
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
                <!--表单渲染-->

                <!--表格渲染-->
                <el-table border ref="table" align="center" :data="data.rows" style="width: 100%;">
                    
                    <el-table-column align="center" prop="id" label="主键" v-if="showId" />
                    <el-table-column align="center" prop="sysId" label="系统" width="100px">
                        <template slot-scope="scope">
                            {{sysObj[scope.row.sysId]}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="subSysId" label="子系统" width="60px"/>
                    <el-table-column align="center" prop="subSysName" label="名称" width="110px"/>
                    <el-table-column align="center" prop="displaySeqno" label="序号" width="50px"/>
                    <el-table-column align="center" prop="deptCode" label="业务主管部门" width="100px"/>
                    <el-table-column align="center" prop="devpLanguage" label="数据库" width="60px"/>
                    <el-table-column align="center" prop="isTfs" label="是否7*24" width="70px"/>
                    <el-table-column align="center" prop="imptntLevel" label="重要等级" width="70px"/>
                    <el-table-column align="center" prop="safeLevel" label="安全保护等级" width="100px"/>
                    <el-table-column align="center" prop="pipStatus" label="投产状态" width="70px"/>
                    <el-table-column align="center" prop="pipTime" label="投产时间" width="70px"/>
                    <el-table-column align="center" prop="subSysDesc" label="范围概述" width="70px"/>
                    <el-table-column label="操作" align="center" fixed="right" width="150px">
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
 
        <div v-if="showAction">
            <edit-component @doClose="closeAdd" :type="type" :showAction="showAction" :actionObj="actionObj"/>
        
            <el-dialog :title="title" :visible="showAction" width="800px" :show-close="false">
                <el-form ref="formAction" :model="actionObj" :rules="rules" :inline="true" label-width="130px">
                    <el-form-item label="系统标识" prop="sysId">
                        <el-input style="width:200px;" v-model.trim="actionObj.sysId"></el-input>
                    </el-form-item>
                    <el-form-item label="系统名称" prop="sysName"> 
                        <el-input style="width:200px;" v-model.trim="actionObj.sysName"></el-input>
                    </el-form-item>
                    <el-form-item label="系统顺序号" prop="displaySeqno">
                        <el-input style="width:200px;" v-model.number="actionObj.displaySeqno"></el-input>
                    </el-form-item>
                    <el-form-item label="归属业务领域">
                        <el-input style="width:200px;" v-model.trim="actionObj.businessDomain"></el-input>
                    </el-form-item>
                    <el-form-item label="系统范围概述">
                        <el-input style="width:200px;" v-model.trim="actionObj.sysDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="系统重要等级">
                        <el-select v-model="actionObj.imptntLevel" filterable clearable placeholder="请选择"
                            style="width:200px;">
                            <el-option v-for="item in imptntLevelObj" :key="item.optionValue" :label="item.optionValue"
                                :value="item.optionValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="安全保护等级">
                        <el-select v-model="actionObj.safeLevel" filterable clearable placeholder="请选择"
                            style="width:200px;">
                            <el-option v-for="item in safeLevelObj" :key="item.optionValue"
                                :label="item.optionValue + '-' + item.optionDesc" :value="item.optionValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="doCloseAction(false)">取 消</el-button>
                    <el-button type="primary" @click="doCloseAction(true)">确认修改</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { deleteKey } from '@/utils';
    import editComponent from "./edit.vue"
    import SYSTEM from '@views/mixin/system'
    import{ queryTp3003} from '@/api/basedata'
    import {queryTp3004List, createTp3004, updateTp3004, deleteTp3004, queryOptionCodeNoPage } from '@/api/frameManage';
    export default {
        mixins: [SYSTEM],
        components: { systemComponent ,editComponent},
        data() { 
            return {
                sys: [],
                showId: false,
                imptntLevelObj: [],
                safeLevelObj: [],
                query: {
                    sysId: '',
                    subSysId: '',
                    subSysName: '',
                    displaySeqno: '',
                    tranCodePrefix: '',
                    pageNum: 1,
                    numPerPage: 10
                },
                queryImpLevel: {
                    optionCode: "imptntLevel",
                },
                querySafeLevel: {
                    optionCode: "safeLevel",
                },
                rules: {
                    sysId: [
                        { required: true, message: '请输入系统标识', trigger: 'blur' }
                    ],
                    sysName: [
                        { required: true, message: '请输入系统名称', trigger: 'blur' }
                    ],
                    displaySeqno: [
                        { required: true, message: '请输入系统顺序号', trigger: 'blur' },
                        { type: 'number', message: '请输入数字', trigger: 'blur' }
                    ],

                },
                showAction: false,
                actionObj: {
                    id: "",
                    tranCodePrefix: "",
                    displaySeqno: "",
                    imptntLevel: "",
                    safeLevel: "",
                    sysDesc: "",
                    subSysId: "",
                    subSysName: "",
                },
                selectRole: {},
                //showPeople: false,
                showTree: false,
                buttonAll: [],
                buttonAllList: [],
                type: "add",
                data: {
                    total: 0,

                    rows: []
                },
            };
        },

        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            clearSearch() {
                this.query = {
                    sysId: '',
                    subSysId: '',
                    subSysName: '',
                    displaySeqno: '',
                    tranCodePrefix: '',
                    pageNum: 1,
                    numPerPage: 10
                };
            },
            doDelete(item) {
                let postObj = { id: item.id, sysId: item.sysId };
                this.$msgbox({
                    title: '删除',
                    message: '确认删除此系统吗？',
                    beforeClose: async (action, instance, done) => {
                        if (action == 'confirm') {
                            let info = await deleteTp3004(postObj);
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
                this.showAction = true;
                this.actionObj = {};
                this.title = "新增操作";
                this.type = "add";
            },
            doEdit(item) {
                this.showAction = true;
                this.title = "修改操作";
                this.type = "edit";
                this.actionObj = {
                    id: item.id,
                    sysId: item.sysId,
                    sysName: item.sysName,
                    displaySeqno: item.displaySeqno,
                    safeLevel: item.safeLevel,
                    businessDomain: item.businessDomain,
                    sysDesc: item.sysDesc,
                    imptntLevel: item.imptntLevel,

                };
                
            },
            doCloseAction(bol) {
                if (bol) {
                    console.log("this.actionObj.imptntLevel: " + this.actionObj.imptntLevel);
                    console.log("actionObj: " + this.actionObj)
                    this.$refs['formAction'].validate(async valid => {
                        if (valid) {
                            this.addObj.displaySeqno +="" ;
                            if(this.type == "add"){
                                let info = await createTp3004(this.addObj);
                            }else{
                                let info = await updateTp3004(this.actionObj);
                            }
                           
                            
                            console.log("info.resCode: " + info.resCode)
                            // if (info.resCode !== '0') {
                            //     this.$message.success('修改成功');
                            //     this.getList();
                            //     this.showAction = false;
                            // }
                            this.$message.success('修改成功');
                            this.getList();
                            this.showAction = false;
                        }
                    });
                } else {
                    this.showAction = false;
                }
            },
            async getSys() {
                let info = await queryTp3003();
                
                if (info.resCode === '0') {
                    this.sys = info.rows;
                }
            },

            async getList(num) {
                let postObj = deleteKey(this.query);
                postObj.pageNum--;

                let info = await queryTp3004List(postObj);
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
            async impLevelList() {
                let postObj = deleteKey(this.queryImpLevel);
                let info = await queryOptionCodeNoPage(postObj);
                if (info.resCode === "0") {
                    this.imptntLevelObj = info.rows
                }

            },
            async safeLevelList() {
                let postObj = deleteKey(this.querySafeLevel);
                let info = await queryOptionCodeNoPage(postObj);
                if (info.resCode === "0") {
                    this.safeLevelObj = info.rows
                }
            },
        },
        mounted() {
            this.getList();
            this.getSys();
            this.impLevelList();
            this.safeLevelList();

        }
    };
</script>