<template>
    <div>
        <system-table>
            <div slot="top">
                <el-form ref="form" :inline="true" label-width="120px">
                    <system-component :required="false" :query="query" />
                    <el-form-item label="发布状态">
                        <el-select style="width:200px;" v-model="query.issueStatus" clearable placeholder="请选择">
                            <el-option label="-1-未发布" value="-1"></el-option>
                            <el-option label="9-已发布" value="9"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据标准">
                        <el-select style="width:200px;" v-model="query.dataStand" clearable placeholder="请选择">
                            <el-option :key="index+'cc'" v-for="(item,index) in dataStandList"
                                :label="item.value+'-'+item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选项代码">
                        <el-input style="width:200px;" v-model.trim="query.optionCode"></el-input>
                    </el-form-item>
                    <el-form-item label="选项名称">
                        <el-input style="width:200px;" v-model.trim="query.optionName"></el-input>
                    </el-form-item>
                    <el-form-item style="width:320px" label>
                        <el-checkbox style="margin-left:50px" v-model="query.isDspGroup">显示组别</el-checkbox>
                        <el-checkbox v-model="query.isDspOptionValue">显示选项值</el-checkbox>
                    </el-form-item>
                    <el-form-item v-if="query.isDspGroup" label="选项组别">
                        <el-input style="width:200px;" v-model.trim="query.optionGroup"></el-input>
                    </el-form-item>
                    <el-form-item v-if="query.isDspGroup" label="组别名称">
                        <el-input style="width:200px;" v-model.trim="query.groupName"></el-input>
                    </el-form-item>
                    <el-form-item v-if="query.isDspOptionValue" label="选项值">
                        <el-input style="width:200px;" v-model.trim="query.optionValue"></el-input>
                    </el-form-item>
                    <el-form-item v-if="query.isDspOptionValue" label="选项描述：">
                        <el-input style="width:200px;" v-model.trim="query.optionDesc"></el-input>
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
                    <el-table-column align="center" prop="sysId" label="系统" v-if="sysIdFlg" />
                    <el-table-column align="center" prop="subSysId" label="子系统">
                        <template slot-scope="scope">{{subSysObj[scope.row.subSysId]}}</template>
                    </el-table-column>
                    <el-table-column class="el-icon-star-on" align="center" prop="issueStatus" label="发布状态" width="80">
                        <template slot-scope="scope">
                            <el-tooltip v-if="scope.row.issueStatus=='9'" class="item" effect="light" content="已发布"
                                placement="right">
                                <i class="el-icon-star-on" style="color:green;font-size:18px;"></i>
                            </el-tooltip>
                            <el-tooltip v-if="scope.row.issueStatus=='0'" class="item" effect="light" content="新增未发布"
                                placement="right">
                                <i class="el-icon-star-on" style="color:purple;font-size:18px;"></i>
                            </el-tooltip>
                            <el-tooltip v-if="scope.row.issueStatus=='1'" class="item" effect="light" content="修改未发布"
                                placement="right">
                                <i class="el-icon-star-on" style="color:red;font-size:18px;"></i>
                            </el-tooltip>
                            <el-tooltip v-if="scope.row.issueStatus=='2'" class="item" effect="light" content="删除未发布"
                                placement="right">
                                <i class="el-icon-star-on" style="color:black;font-size:18px;"></i>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="optionCode" label="选项代码" />
                    <el-table-column align="center" prop="optionName" label="选项名称" />
                    <el-table-column align="center" prop="optionValue" label="选项值" />
                    <el-table-column align="center" prop="optionDesc" label="选项描述" />
                    <el-table-column align="center" prop="optionGroup" label="选项组别" />
                    <el-table-column align="center" prop="groupName" label="组别名称" />
                    <el-table-column align="center" prop="dataStand" label="数据标准" v-if="sysIdFlg" />
                    <el-table-column align="center" prop="remark" label="备注" v-if="sysIdFlg" />
                    <el-table-column label="操作" width="180px" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button @click="doEdit(scope.row,scope.index)" type="primary">修改</el-button>
                            <el-button @click="doDelete(scope.row,scope.index)" type="danger    ">删除</el-button>
                            <!-- <el-button @click="doAddGroup(scope.row,scope.index)" type="primary">新建组别</el-button>
                            <el-button @click="doEditGroup(scope.row,scope.index)" type="primary">修改组别</el-button> -->
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
        <div v-if="showDialog">
            <edit-component @doClose="closeAdd" :type="type" :showDialog="showDialog" :actionObj="actionObj"
                :optionValues="optionValues" :optionGroupList="optionGroupList" />
        </div>
    </div>
</template>
<style>
    /* .item:hover {
        transform:rotate(180deg);
    } */
</style>
<script>
    import { deleteKey, deepClone } from '@/utils';
    import systemComponent from '@views/components/system.component.vue';
    import editComponent from "./edit.vue"

    // import Sortable from "sortablejs";
    import MIXIN from '@views/mixin/button';
    import SYSTEM from '@views/mixin/system';
    import { queryOptionDetailList, deleteOptionDetail, queryOptionCodeList, queryTp1009List } from '@/api/basedata';
    import { deleteSysButtons } from '@/api/system';
    export default {
        mixins: [MIXIN, SYSTEM],
        components: { systemComponent, editComponent },
        data() {
            return {
                query: {
                    sysId: '',
                    subSysId: '',
                    pageNum: 1,
                    numPerPage: 10,
                    groupName: '',
                    optionGroup: '',
                    optionValue: '',
                    optionDesc: ''
                },
                updParam: {
                    sysId: '',
                    subSysId: '',
                    optionCode: '',
                    optionName: '',
                    isDspGroup: 1,
                    isDspOptionValue: 1
                },
                qryValueParam: {},
                qryGroupParam: {},
                sysIdFlg: false,
                issueStatus: "",
                contentIssue: "",
                styleColor: "",
                showDialog: false,
                actionObj: {
                    sysId: "",
                    subSysId: "",
                },
                type: 'add',
                optionValues: [],
                data: {
                    total: 0,
                    rows: []
                },
                dataValues: {
                    rowsValues: []
                },
                dataGroups: {
                    rows: []
                },

                data2: {
                    total: 0,
                    rows: []
                },
                data3: {
                    total: 0,
                    rows: []
                },
                itemList: [],
                leftchildren: [],
                children: [],
                optionGroupList: [],

            };
        },
        methods: {
            clearSearch() {
                this.query = {
                    sysId: '',
                    subSysId: '',
                    pageNum: 1,
                    numPerPage: 10,
                    groupName: '',
                    optionGroup: '',
                    optionValue: '',
                    optionDesc: ''
                };
            },
            doDelete(item) {
                let postObj = { optionCode: item.optionCode };
                this.$msgbox({
                    title: '确认删除此选项代码吗？对应选项值和选项组别将一并删除',
                    beforeClose: async (action, instance, done) => {
                        if (action == 'confirm') {
                            let info = await deleteOptionDetail(postObj);
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
                this.showDialog = true;
                this.type = 'add';
                this.actionObj = {
                    sysId: "",
                    subSysId: "",
                    unitDataCode: "",
                    unitDataDesc: ""
                }
            },
            async doEdit(item) {
                this.optionValues = [];
                this.optionGroupList = [];
                this.children = [];
                this.leftchildren = [];
                this.itemList = [];

                //查询选项值
                this.qryValueParam = {
                    optionCode: item.optionCode
                }
                await this.qryOptionValues();
                //console.log(this.dataValues.rowsValues,111)

                //查询选项组别
                this.qryGroupParam = {
                    optionCode: item.optionCode
                }
                await this.qryOptionGroups();
                // console.log(this.dataGroups, 222)
                // console.log(JSON.stringify(this.dataGroups.rowsGroups))

                this.showDialog = true;
                this.type = 'edit';
                this.actionObj = {
                    sysId: item.sysId,
                    subSysId: item.subSysId,
                    optionCode: item.optionCode,
                    optionName: item.optionName,
                    dataStand: item.dataStand,
                    renmark: item.remark,
                }
                this.dataValues.rowsValues.forEach(item =>{
                    this.optionValues.push({
                        optionValue:item.optionValue,optionDesc:item.optionDesc,anotherName:item.anotherName
                    })
                })
                //console.log(this.optionValues,888)
                //this.optionValues = this.dataValues.rowsValues;
        
                this.itemList = this.dataGroups.rowsGroups;
                
                for (var i = 0; i < this.itemList.length; i++) {
                    if (i == 0) {
                        this.children.push({ optionValue: this.itemList[0].optionValue, optionDesc: this.itemList[0].optionDesc, anotherName: this.itemList[0].anotherName })
                    }
                    if (i > 0) {

                        if (this.itemList[i].optionGroup == this.itemList[i - 1].optionGroup || i == this.itemList.length - 1) {
                            this.children.push({ optionValue: this.itemList[i].optionValue, optionDesc: this.itemList[i].optionDesc, anotherName: this.itemList[i].anotherName })
                        }
                        if (this.itemList[i].optionGroup != this.itemList[i - 1].optionGroup || i == this.itemList.length - 1) {
                            var arr1 = deepClone(this.optionValues);                   
                            var arr2 = this.children;
                            for (let i = 0; i < arr2.length; i++) {
                                for (let j = 0; j < arr1.length; j++) {
                                    if (arr2[i].optionValue == arr1[j].optionValue &&
                                        arr2[i].optionDesc == arr1[j].optionDesc &&
                                        arr2[i].anotherName == arr1[j].anotherName 
                                        ) {
                                        //console.log("相同")
                                        let indexs = arr1.indexOf(arr1[j]);
                                        arr1.splice(indexs, 1);
                                    }
                                }
                            }
                            this.leftchildren = arr1;

                            // console.log("this.leftchildren")
                            // console.log(this.leftchildren)
                            if (this.leftchildren.length != 0) {
                                this.optionGroupList.push({
                                    optionGroup: this.itemList[i - 1].optionGroup, groupName: this.itemList[i - 1].groupName,
                                    children: this.children, leftchildren: this.leftchildren
                                })
                            }

                            this.children = [];
                            this.children.push({ optionValue: this.itemList[i].optionValue, optionDesc: this.itemList[i].optionDesc, anotherName: this.itemList[i].anotherName })
                        }
                    }
                }
            },
            closeAdd(bol) {
                if (bol) {
                    if (this.type == 'add') this.getList();
                    else if (this.type == 'edit') this.queryList();
                }
                this.showDialog = false;
            },

            async getList(num) {
                let postObj = deleteKey(this.query);
                postObj.isDspGroup = postObj.isDspGroup ? 1 : 0;
                postObj.isDspOptionValue = postObj.isDspOptionValue ? 1 : 0;

                postObj.pageNum--;

                let info = await queryOptionDetailList(postObj);
                if (info.resCode === '0') {
                    this.data = {
                        total: info.total,
                        rows: info.rows || []
                    };
                };
            },
            queryList() {
                this.query.pageNum = 1;
                this.getList(1);
            },
            async qryOptionValues() {
                //debugger;
                let postObj = deleteKey(this.qryValueParam);
                let info = await queryOptionCodeList(postObj);
                if (info.resCode === '0') {
                    this.dataValues = {
                        rowsValues: info.rows || []
                    };
                };
            },
            async qryOptionGroups() {
                //debugger;
                let postObj = deleteKey(this.qryGroupParam);
                let info = await queryTp1009List(postObj);
                if (info.resCode === '0') {
                    this.dataGroups = {
                        total: info.total,
                        rowsGroups: info.rows || []
                    };
                };
            },


            handlePageChange(num) {
                this.query.pageNum = num;
                this.getList(num);
            },
            handleSizeChange(num) {
                this.query.pageNum = 1;
                this.query.numPerPage = num;
                this.getList(num);
            }
        },
        mounted() { },
        watch: {
            'query.isDspGroup'() {
                this.query.optionGroup = '';
                this.query.groupName = '';
            },
            'query.isDspOptionValue'() {
                this.query.optionValue = '';
                this.query.optionDesc = '';
            }
        }
    };
</script>