<template>
    <span>
        <el-form-item :required="required" label="系统">
            <el-select
                :disabled="disabled.includes('1')"
                @change="changeSysId"
                style="width:200px;"
                v-model="query.sysId"
                clearable
                placeholder="请选择"
            >
                <el-option
                    v-for="(item,index) in sysList"
                    :key="index+'yy'"
                    :label="item.sysId+'-'+item.sysName"
                    :value="item.sysId"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item :required="required" label="子系统">
            <el-select
                :disabled="disabled.includes('2')"
                @change="changeSubSysId"
                style="width:200px;"
                v-model="query.subSysId"
                clearable
                placeholder="请选择"
            >
                <el-option
                    :key="index+'xx'"
                    v-for="(item,index) in subSysList"
                    :label="item.subSysId+'-'+item.subSysName"
                    :value="item.subSysId"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item  :required="required" label="子域">
            <el-select
                :disabled="disabled.includes('3')"
                style="width:200px;"
                v-model="query.subDomain"
                @change="changeDomainId"
                clearable
                placeholder="请选择"
            >
                <el-option
                    :key="index+'xx'"
                    v-for="(item,index) in domainList"
                    :label="item.subDomainValue+'-'+item.subDomainName"
                    :value="item.subDomainValue"
                ></el-option>
            </el-select>
        </el-form-item>
    </span>
</template>

<script>
import { queryTp3003, queryTp3004, queryTp3005 } from '@/api/basedata';
import { deleteKey } from '@/utils';

import { searchUser } from '@/api/system';
export default {
    name: 'sysytem',
    props: {
        query: {    
            type: Object
        },
        disabled: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            sysList: [],
            sysObj: {},
            subSysList: [],
            subSysObj: {},
            domainList: [],
            domainObj: {}
        };
    },

    mounted() {
        this.getSysList();
    },
    methods: {
        async getSysList() {
            let info = await queryTp3003();
            if (info.resCode === '0') {
                this.sysList = info.rows || [];
                info.rows.forEach(item => {
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
                info.rows.forEach(item => {
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
        async getDomainList(id) {
            let info = await queryTp3005({ subSysId: id });
            if (info.resCode === '0') {
                this.domainList = info.rows || [];
                info.rows.forEach(item => {
                    this.domainObj[item.subDomainValue] = item;
                });

                if (this.query.subDomain && !this.domainObj[this.query.subDomain]) {
                    this.query.subDomain = '';
                    this.query.subDomainDesc = '';
                    if (!this.required) {
                        this.query.subDomainDesc = '';
                    }
                }
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
                this.query.subDomain = '';
                this.query.subDomainDesc = '';
                this.domainList = [];

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
                    this.query.subDomain = '';
                    this.query.subDomainDesc = '';
                    this.domainList = [];
                }
            } else {
                if (!this.required) {
                    this.query.subSysIdSearch = this.query.subSysId;
                }
              
                this.query.subSysIdDesc = this.query.subSysId + '-' + this.subSysObj[this.query.subSysId].subSysName;
                this.getDomainList(this.query.subSysId);
            }
        },
        changeDomainId() {
            if (!this.query.subDomain) {
                this.query.subDomainDesc = '';
                if (!this.required) {
                    this.query.subDomainSearch = '';
                }
            } else {
                if (!this.required) {
                   
                    this.query.subDomainSearch = this.query.subDomain;
                }
                this.query.subDomainDesc = this.query.subDomain + '-' + this.domainObj[this.query.subDomain].subDomainName;
            }
        }
    }
};
</script>