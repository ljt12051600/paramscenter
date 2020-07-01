<template>
    <div>
        <el-dialog :title="title" :visible="showAction" width="1000px" :show-close="false">
            <el-form ref="formAction" :model="dialogObj" :rules="rules" :inline="true" label-width="200px">

                <system-component :required="true" :query="dialogObj" />

                <el-form-item label="接口编码" prop="itfCode">
                    <el-input style="width:200px;" v-model.trim="dialogObj.itfCode"></el-input>
                </el-form-item>
                <el-form-item label="接口名称" prop="itfName">
                    <el-input style="width:200px;" v-model.trim="dialogObj.itfName"></el-input>
                </el-form-item>

                <el-button @click="doAdd" type="primary">添加</el-button>
                <div class="tpsEdit">
                    <el-table border highlight-current-row ref="table" align="center" :data="data" style="width: 100%;">
                        <el-table-column align="center" type="index" label="序号" width="50" />
                        <el-table-column align="center" prop="targetSubSys" width="200" label="目标系统">
                            <template slot-scope="scope">
                                <el-cascader filterable :show-all-levels="false" v-model="scope.row.sysNewId"
                                    :options="sysSubSysList" :props="{ expandTrigger: 'hover' }"></el-cascader>
                            </template>
                        </el-table-column>

                        <el-table-column align="center" prop="commuType" label="通讯类型">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.commuType">
                                    <el-option key="httpCommunication" label="HTTP" value="httpCommunication" />
                                    <el-option key="socketCommunication" label="Socket" value="socketCommunication" />
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="url" width="300" label="服务器地址">
                            <template slot-scope="scope">
                                <el-input v-model.trim="scope.row.url"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="port" label="端口">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.port" />
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="itfStandCode" label="接口标准编码">
                            <template slot-scope="scope">
                                <el-input v-model.trim="scope.row.itfStandCode"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" fixed="right" width="100px">
                            <template slot-scope="scope">
                                <!-- <el-button @click="doEdit(scope.row,scope.index)" type="primary">修改</el-button> -->
                                <el-button @click="doDelete(scope.$index)" type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="color: red; font-size: 12px;text-align: left;">
                        *tips: 拖拽可以排序

                    </div>
                </div>



            </el-form>
            <!--操作table的6个按钮-->

            <div style="float:clear;" slot="footer" class="dialog-footer">
                <el-button @click="doCloseAction(false)">取 消</el-button>
                <el-button type="primary" @click="doCloseAction(true)">{{check}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import SYSTEM from '@views/mixin/system'
    import { deleteKey, deepClone } from '@/utils';
    import Sortable from "sortablejs";
    import { createTpsArOsItf, updateTpsArOsItf } from '@/api/frameManage';
    import systemComponent from '@views/components/system.component.vue';
    import FRAMEMANAGE from '@views/mixin/frameManage';
    export default {
        components: { systemComponent },
        props: {
            showAction: {
                type: Boolean
            },
            title: {
                type: String,
            },
            check: {
                type: String,
            },

            type: {
                type: String,
                default: 'add'
            },
            actionObj: {
                type: Object
            },
        },
        mixins: [SYSTEM, FRAMEMANAGE],
        data() {
            return {
                data: [],
                dialogObj: {

                },
                rules: {
                    itfCode: [
                        { required: true, message: '请输入接口编码', trigger: 'blur' }
                    ],
                    itfName: [
                        { required: true, message: '请输入接口名称', trigger: 'blur' }
                    ],
                },
                dataObj: {
                    dispSeqno: "",
                    targetSubSys: "",
                    targetSubSysDesc: "",
                    commuType: "httpCommunication",
                    url: "",
                    port: "",
                    itfStandCode: "",
                }

            };
        },
        methods: {
            doAdd() {
                this.data.push(deepClone(this.dataObj));
                this.data.forEach((item, index) => {
                    item.dispSeqno = index + 1 + "";

                })
            },
            doDelete(index) {
                this.data.splice(index, 1);

            },
            doCloseAction(bol) {
                let flg = true;
                if (bol) {
                    this.$refs['formAction'].validate(async valid => {
                        if (valid) {
                            if (!this.dialogObj.sysId) {
                                this.$message.error('请选择系统');
                                return false;
                            }
                            if (!this.dialogObj.subSysId) {
                                this.$message.error('请选择子系统');
                                return false;
                            };
                            
                            this.data.forEach(item => {
                                if(item.sysNewId == null){
                                    flg = false;
                                    this.$message.error('请选择目标系统');
                                    return
                                }
                                if(item.url == ""){
                                    flg = false;
                                    this.$message.error('请输入服务器地址');
                                    return
                                }
                                if(item.port != null && item.port != "" && typeof item.port != "number"){
                                    flg = false;
                                    this.$message.error('端口号请输入数字');
                                    return
                                }
                            });
                            if(!flg){
                                return false;
                            }
                            this.data.forEach(item => {
                                item.targetSubSys = item.sysNewId[1];
                                item.targetSubSysDesc = this.getSysDes(item.sysNewId[1]);
                                delete item.sysNewId;
                            })  
                            
                            
                            this.dialogObj.extension = JSON.stringify(this.data);
                            if (this.type == "add") {
                                let info = await createTpsArOsItf(this.dialogObj);
                                if (info.resCode == '0') {
                                    this.$message.success('添加成功');
                                    this.$emit("doClose", true)//触发父组件的@doClose
                                }
                            }
                            if (this.type == "edit") {
                                let info = await updateTpsArOsItf(this.dialogObj);
                                this.$message.success('修改成功');
                                this.$emit("doClose", true)
                            }
                        }
                    });
                } else {
                    this.$emit("doClose", false)

                }
            },
        },
        mounted() {

            this.dialogObj = deepClone(this.actionObj);

            if (this.type == 'edit') {
                this.data = this.dialogObj.data;
                //console.log(this.data)

            }
            this.$nextTick(() => {
                const tbody = document.querySelector(".tpsEdit .el-table__body-wrapper tbody");
                Sortable.create(tbody, {
                    ghostClass: 'sortable-ghost',
                    onEnd: ({ newIndex, oldIndex }) => {
                        let newArr = deepClone(this.data);
                        const currRow = newArr.splice(oldIndex, 1)[0]
                        newArr.splice(newIndex, 0, currRow)
                        // 重新排序完的表格数据
                        this.data = []
                        this.$nextTick(function () {
                            this.data = newArr
                        })

                    }
                })

            })



        }
    };
</script>