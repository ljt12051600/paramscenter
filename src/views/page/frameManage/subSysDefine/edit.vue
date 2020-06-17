<template>
    <div>
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

</template>
<script>
    import { deleteKey } from '@/utils';
    import SYSTEM from '@views/mixin/system'
    import{ queryTp3003} from '@/api/basedata'
    import {queryTp3004List, createTp3004, updateTp3004, deleteTp3004, queryOptionCodeNoPage } from '@/api/frameManage';
    export default {
        mixins: [SYSTEM],
        data() { 
            return {
            };
        },

        methods: {
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