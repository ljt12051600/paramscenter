<template>
    <div>
        <el-dialog :title="title" :show-close="false" style="max-height：400px;" width="800px" :visible="showDialog">
            <el-tabs v-model="editableTabsValue" @tab-click="changeTab">
                <el-tab-pane name="1" label="基础信息">
                    <el-form ref="form" :inline="true" label-width="140px">
                        <system-component :disabled="type=='add'?'':'12'" :required="true" :query="dialogObj" />

                        <el-form-item required label="选项代码">
                            <el-input :disabled="type!='add'" style="width:140px;" v-model.trim="dialogObj.optionCode">
                            </el-input>
                            <el-button type="primary" @click="queryUnitDataDialog" v-show="type=='add'">选择</el-button>
                        </el-form-item>
                        <el-form-item required label="选项名称">
                            <el-input v-model.trim="dialogObj.optionName"></el-input>
                        </el-form-item>
                        <el-form-item required label="数据标准">
                            <el-select style="width:200px;" v-model="dialogObj.dataStand" clearable placeholder="请选择">
                                <el-option :key="index+'cc'" v-for="(item,index) in dataStandList"
                                    :label="item.value+'-'+item.name" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input style="width:200px;" v-model.trim="dialogObj.remark"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-card>
                        <div class="one">
                            <el-button type="primary" @click="addBaseList">新增</el-button>
                            <el-table highlight-current-row border ref="table" align="center" :data="baseList"
                                style="width: 100%;">
                                <el-table-column align="center" type="index" label="序号" width="50" />
                                <el-table-column align="center" prop="optionValue" label="选项值">
                                    <template slot-scope="scope">
                                        <el-input
                                            @blur="checkCopy(scope.row.optionValue,scope.$index);blurObj(scope.row)"
                                            v-model="scope.row.optionValue" @focus="focusObj(scope.row)"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="optionDesc" label="选项描述">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.optionDesc" @focus="focusObj(scope.row)"
                                            @blur="blurObj(scope.row)"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="anotherName" label="别名">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.anotherName" @focus="focusObj(scope.row)"
                                            @blur="blurObj(scope.row)"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="100" align="center" fixed="right">
                                    <template slot-scope="scope">
                                        <el-button @click="doDeleteOption(scope.row,scope.$index)" type="primary">删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-if="type=='add'||type=='edit'" style=" color:red;font:12px">
                            tips:1.拖动表格行可以进行排序,2.修改已经在组别的选项值，组别对应的选项值会默认删除</div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane name="2" label="选项组别">
                    <div v-if="editableTabsValue==2">
                        <group-edit :baseList="baseList" :groupList="groupList" :type="type" />
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="doClose(false)">取 消</el-button>
                <el-button type="primary" @click="doClose(true)">{{check}}</el-button>
            </div>
        </el-dialog>

        <el-drawer :with-header="false" title="我是外面的 Drawer" :visible.sync="drawer" size="50%">
            <div style="margin-top:80px">
                <el-form ref="form" :inline="true" label-width="140px">
                    <el-form-item label="选项代码">
                        <el-input style="width:200px;" v-model.trim="query.unitDataCode"></el-input>
                    </el-form-item>
                    <el-form-item label="选项描述">
                        <el-input style="width:200px;" v-model.trim="query.unitDataDesc"></el-input>
                    </el-form-item>
                    <el-form-item label>
                        <el-button type="primary" @click="queryList">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-table border ref="table" align="center" :data="data.rows" style="width: 100%;">
                    <el-table-column align="center" type="index" label="序号" width="50" />
                    <el-table-column align="center" prop="unitDataCode" label="元数据代码" />
                    <el-table-column align="center" prop="unitDataDesc" label="元数据描述" />
                    <el-table-column label="操作" width="280" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button @click="doChooseUnitDate(scope.row)" type="primary">选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="data.total" class="pagination">
                    <el-pagination background layout="total,pager,jumper,sizes" :current-page="query.pageNum"
                        :page-sizes="[10,25,50]" :page-size="query.numPerPage" :total="data.total"
                        @current-change="handlePageChange" @size-change="handleSizeChange"></el-pagination>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import { deleteKey, deepClone } from '@/utils';
    import SYSTEM from '@views/mixin/system';
    import { queryUnitDataListForSysId, createOptionDetail, updateOptionDetail } from '@/api/basedata';
    import Sortable from 'sortablejs';
    import groupEdit from './group.vue';

    import systemComponent from '@views/components/system.component.vue';
    export default {
        components: { systemComponent, groupEdit },
        mixins: [SYSTEM],
        props: {
            showDialog: {
                type: Boolean
            },

            type: {
                type: String,
                default: 'add'
            },
            actionObj: {
                type: Object
            },
            optionValues: {
                type: Array
            },
            optionGroupList: {
                type: Array
            }
        },
        data() {
            return {
                check: '',
                flg: true,
                title: '',
                dialogObj: {
                    sysId: '',
                    subSysId: '',
                    unitDataDesc: '',
                    unitDataCode: ''
                },
                editableTabsValue: '1',
                title: '',
                drawer: false,
                query: {
                    sysId: '',
                    subSysId: '',
                    pageNum: 1,
                    numPerPage: 10
                },
                baseList: [],
                data: {
                    total: 0,
                    rows: []
                },
                groupList: [],
                optionValue: [],
                addObj: {},
                rows: [],
                groupRows: [],
                groupListNew: [],
                focusValue: {},
                blurValue: {},
            };
        },
        methods: {
            focusObj(val) {
                //console.log(val,22222)
                this.focusValue = deepClone(val)
                //console.log(this.focusValue,11111)

            },
            blurObj(val) {
                this.blurValue = deepClone(val)
                console.log(this.blurValue, 33333)
                this.groupList.forEach(item => {
                    item.children.forEach(item2 => {
                        if (this.focusValue.optionValue == item2.optionValue && this.focusValue.optionDesc == item2.optionDesc && this.focusValue.anotherName == item2.anotherName) {
                            item2.optionValue = this.blurValue.optionValue;
                            item2.optionDesc = this.blurValue.optionDesc;
                            item2.anotherName = this.blurValue.anotherName;
                        }
                    })
                    item.leftchildren.forEach(item3 => {
                        if (this.focusValue.optionValue == item3.optionValue && this.focusValue.optionDesc == item3.optionDesc && this.focusValue.anotherName == item3.anotherName) {
                            item3.optionValue = this.blurValue.optionValue;
                            item3.optionDesc = this.blurValue.optionDesc;
                            item3.anotherName = this.blurValue.anotherName;
                        }
                    })
                })

            },
            async doClose(bol) {
                //debugger
                if (!bol) {

                    this.$confirm('是否放弃修改?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$emit('doClose', true);//点击取消关闭弹框
                    }).catch(() => {


                    });
                }
                if (bol) {
                    this.flg = true;
                    if (!this.dialogObj.sysId) {
                        this.$message.error("请选择系统");
                        return;
                    }
                    if (!this.dialogObj.subSysId) {
                        this.$message.error("请选择子系统");
                        return;
                    }
                    if (!this.dialogObj.optionCode || !this.dialogObj.optionName) {
                        this.$message.error("请选择选项代码和选项名称");
                        return;
                    }
                    if (!this.dialogObj.dataStand) {
                        this.$message.error("请选择数据标准");
                        return;
                    }
                    // console.log(this.baseList)
                    if (this.baseList.length == 0) {
                        this.$message.error("每个选项代码至少定义一个选项值");
                        return;
                    }
                    if (this.groupList.length != 0) {
                        this.groupList.forEach(item => {
                            //console.log(item.optionGroup, 111)
                            if (item.optionGroup == "" || item.groupName == "") {
                                this.$message.error("组别不能为空！");
                                this.flg = false;
                            }
                        })

                    }
                    if (this.groupList.length >= 2) {
                        for (var i = this.groupList.length-1; i > 0; i--) {
                            for (var j = i - 1; j > -1; j--) {
                                if (this.groupList[i].optionGroup == this.groupList[j].optionGroup) {
                                    this.$message.error("选项组别 [" + this.groupList[j].optionGroup + "] 重复");
                                    this.flg = false;
                                }
                                if (this.groupList[i].groupName == this.groupList[j].groupName) {
                                    this.$message.error("组别名称 [" + this.groupList[j].groupName + "] 重复");
                                    this.flg = false;
                                }
                            }
                        }
                    }
                    if (this.flg == false) return;
                    //判断选项组别页签的选项值不为空
                    let count = this.groupList.length - 1;
                    if (this.groupList.length != 0 && this.groupList[count].children.length == 0) {
                        this.$message.error("至少包含一个选项值");
                        return;
                    }
                    this.$confirm('是否确认提交?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () => {

                        this.baseList.forEach((item, index) => {
                            let newObj = { ...this.dialogObj, ...item };
                            newObj.displaySeqno = index + 1;
                            this.rows.push(newObj)
                        })
                        this.addObj.rows = this.rows;

                        this.groupList.forEach((item, index) => {
                            let rightchildren = deepClone(item.children);
                            delete item.children;
                            delete item.leftchildren;
                            rightchildren.forEach((itemTwo, indexTwo) => {
                                let groupObject = { ...item, ...itemTwo };
                                groupObject.sysId = this.dialogObj.sysId;
                                groupObject.subSysId = this.dialogObj.subSysId;
                                groupObject.optionCode = this.dialogObj.optionCode;
                                groupObject.displaySeqno = indexTwo + 1;

                                this.groupRows.push(groupObject);
                            })
                        })
                        this.addObj.groupRows = this.groupRows;
                        if (this.type == "add") {
                            let info = await createOptionDetail(this.addObj);
                            if (info.resCode === '0') {
                                this.$message.success('添加成功');
                                this.$emit('doClose', true);
                            }
                        }
                        if (this.type == "edit") {
                            let info = await updateOptionDetail(this.addObj);
                            if (info.resCode === '0') {
                                this.$message.success('修改成功');
                                this.$emit('doClose', true);
                            }
                        }

                    }).catch(() => {

                    });

                }

            },
            changeTab() {
                if (this.editableTabsValue === '2' && this.groupList.length != 0) {
                    var newChildren = deepClone(this.groupList[0].children);
                    var newLeftchildren = deepClone(this.groupList[0].leftchildren);
                    newLeftchildren.forEach(item => {
                        newChildren.push(item);
                    })
                    //console.log(newChildren, 111);
                    this.baseList.forEach(item => {
                        var i = 0;
                        newChildren.forEach(item2 => {
                            if (JSON.stringify(item) != JSON.stringify(item2)) {
                                i++;
                            }
                        })
                        if (i == newChildren.length) {
                            this.groupList.forEach(item3 => {
                                item3.leftchildren.push(item);
                            })
                        }
                    })
                    //console.log(this.groupList, 888)
                }

                if (this.editableTabsValue === '1') return;
                if (!this.dialogObj.sysId || !this.dialogObj.subSysId || !this.dialogObj.optionCode || !this.dialogObj.optionName || !this.dialogObj.dataStand) {
                    this.$message.error('请完成必输项');
                    this.$nextTick(() => {
                        this.editableTabsValue = '1';
                    });
                } else if (!this.baseList.length) {
                    this.$message.error('选项值列表不能为空');
                    this.$nextTick(() => {
                        this.editableTabsValue = '1';
                    });
                }
                let index = this.baseList.findIndex(item => {
                    return item.optionValue == '';
                });

                if (index > -1) {
                    this.$message.error(`第${index + 1}选项值为空`);
                    this.$nextTick(() => {
                        this.editableTabsValue = '1';
                    });
                }
            },

            checkCopy(val, index) {
                if (!val) {
                    return this.$message.error('选项值不能为空');
                }
                let num = 0;
                this.baseList.forEach(item => {
                    if (item.optionValue == val) {
                        num++;
                    }
                });
                if (num == 2) {
                    this.baseList[index].optionValue = '';
                    return this.$message.error('选项值重复请重新输入');
                }
                this.getLeftRightChildren();
            },
            doDeleteOption(item, ind) {

                this.$confirm('组别中包含该选项值, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.baseList.splice(ind, 1);
                    this.groupList.forEach(item2 => {
                        item2.children.forEach((item3, index3) => {
                            if (item3.optionValue == item.optionValue && item3.optionDesc == item.optionDesc && item3.anotherName == item.anotherName) {
                                item2.children.splice(index3, 1);
                            }
                        })
                        item2.leftchildren.forEach((item4, index4) => {
                            if (item4.optionValue == item.optionValue && item4.optionDesc == item.optionDesc && item4.anotherName == item.anotherName) {
                                item2.leftchildren.splice(index4, 1);
                            }
                        })
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });



                //console.log(item,111)
            },
            getLeftRightChildren() {


            },


            addBaseList() {
                this.baseList.push({
                    optionValue: '',
                    optionDesc: '',
                    anotherName: ''
                });
            },

            queryUnitDataDialog() {
                if (!this.dialogObj.subSysId) {
                    return this.$message.error('请选择子系统');
                }
                this.queryList();
                this.drawer = true;
            }, //获取元数据代码
            doChooseUnitDate(item) {
                this.dialogObj.optionCode = item.unitDataCode;
                this.dialogObj.optionName = item.unitDataDesc;
                this.drawer = false;
            },
            async getList(num) {
                let postObj = deleteKey(this.query);
                postObj.sysId = this.dialogObj.sysId;
                postObj.subSysId = this.dialogObj.subSysId;
                postObj.pageNum--;

                let info = await queryUnitDataListForSysId(postObj);
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
            } //获取元数据代码结束
        },
        mounted() {
            this.changeTab(0);

            if (this.type == 'add') {
                this.title = "新增操作";
                this.check = "确认添加";
                this.dialogObj = deepClone(this.actionObj);

            }
            if (this.type == 'edit') {
                this.title = "修改操作";
                this.check = "确认修改";
                this.dialogObj = deepClone(this.actionObj);
                this.baseList = deepClone(this.optionValues);
                this.groupList = deepClone(this.optionGroupList);
                //console.log("baseList:" + JSON.stringify(this.optionValues));

            }

            this.$nextTick(() => {
                const tbody = document.querySelector('.one tbody');

                Sortable.create(tbody, {
                    ghostClass: 'sortable-ghost',
                    onEnd: ({ newIndex, oldIndex }) => {
                        let newArr = deepClone(this.baseList);
                        const currRow = newArr.splice(oldIndex, 1)[0];
                        newArr.splice(newIndex, 0, currRow);
                        // 重新排序完的表格数据
                        this.baseList = [];
                        this.$nextTick(function () {
                            this.baseList = newArr;
                        });
                    }
                });
            });
        },
        watch: {
            baseList(val) {
                if (!this.groupList.length) {
                    return;
                }
            }
        }
    };
</script>