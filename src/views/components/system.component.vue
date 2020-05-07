//父子系统的组件
<template>
    <div style="display:inline-block">
        <el-form-item label="系統">
            <el-select @change="changeSysId" style="width:200px;" v-model="query.sysId" clearable placeholder="请选择">
                <el-option v-for="(item,index) in sysList" :key="index+'yy'" :label="item.sysId+'-'+item.sysName"
                    :value="item.sysId"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="子系統">
            <el-select @change="changeSubSysId" style="width:200px;" v-model="query.subSysId" clearable
                placeholder="请选择">
                <el-option :key="index+'xx'" v-for="(item,index) in subSysList"
                    :label="item.subSysId+'-'+item.subSysName" :value="item.subSysId"></el-option>
            </el-select>
        </el-form-item>
    </div>
</template>

<script>
    import {
        queryTp3003,
        queryTp3004
    } from '@/api/basedata';
    import { deleteKey } from '@/utils';

    import { searchUser } from '@/api/system';
    export default {
        name: 'sysytem',
        props: {
            query: {
                type: Object
            }
        },
        data() {
            return { 
                sysList: [],
                sysObj: {},
                subSysList: [],
                subSysObj: {},

            };
        },

        mounted() {
            this.getSysList();
            // this.getSubSysList();
        },
        methods: {
            async getSysList() {
                let info = await queryTp3003();
                if (info.resCode === '0') {
                    this.sysList = info.rows || [];
                    info.rows.forEach(item => {
                        this.sysObj[item.sysId] = item;
                    });
                }
            },
            async getSubSysList(id) {
                let info = await queryTp3004({ sysId: id });
                if (info.resCode === '0') {
                    this.subSysList = info.rows || [];



                    info.rows.forEach(item => {
                        this.subSysObj[item.subSysId] = item
                    });
                }
            },
            changeSysId() {
                this.query.subSysId = "";
                this.query.subSysIdDesc = "";
                this.query.subSysIdSearch = ""

                if (!this.query.sysId) {
                    this.query.sysIdDesc = "";
                    this.query.sysIdSearch = ""


                }
                else {
                    this.query.sysIdSearch = this.query.sysId;
                    this.query.sysIdDesc = this.query.sysId + "-" + this.sysObj[this.query.sysId].sysName;
                    this.getSubSysList(this.query.sysId)


                }
            },
            changeSubSysId() {
                if (!this.query.subSysId) {
                    this.query.subSysIdDesc = "";
                    this.query.subSysIdSearch = ""


                }
                else {
                    this.query.subSysIdSearch = this.query.subSysId;
                    this.query.subSysIdDesc = this.query.subSysId + "-" + this.subSysObj[this.query.subSysId].subSysName

                }
            }
        }
    };
</script>