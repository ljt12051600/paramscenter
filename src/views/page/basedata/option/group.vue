<template>
    <div>
        <div style="margin-bottom: 20px;">
            <el-button size="small" type="primary" @click="addTab">添加组别</el-button>
        </div>
        <el-tabs @tab-click="changeTab" v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane v-for=" ( item, index)  in groupList" :key="index+'cc'" :label="item.groupName"
                :name="index+''">
                <el-form ref="form" :inline="true" label-width="140px">
                    <el-form-item required label="组别">
                        <el-input :disabled="type!='add'" maxlength="12" style="width:220px;"
                            v-model.trim="item.optionGroup"></el-input>
                    </el-form-item>
                    <el-form-item required label="组别名称">
                        <el-input maxlength="20" style="width:220px;" v-model.trim="item.groupName"></el-input>
                    </el-form-item>
                </el-form>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-table ref="leftTable" :data="item.leftchildren" style="width: 100%;"
                            @selection-change="handleSelectionChangeLeft">

                            <el-table-column type="selection" width="55"></el-table-column>

                            <el-table-column align="center" prop="optionValue" label="未选-选项值" />
                            <el-table-column align="center" prop="optionDesc" label="选项描述" />
                            <el-table-column align="center" prop="anotherName" label="别名" />
                        </el-table>
                    </el-col>
                    <el-col :span="2">
                        <div>
                            <el-button type="primary" @click="leftMove(index)">左移</el-button>
                        </div>
                        <div style="margin-top:20px">
                            <el-button type="primary" @click="rightMove(index)">右移</el-button>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div :class="'table'+index">
                            <!-- :ref="'table'+index" -->
                            <el-table ref="rightTable" :data="item.children" style="width: 100%;"
                                @selection-change="handleSelectionChangeRight">
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column align="center" prop="optionValue" label="已选-选项值" />

                                <el-table-column align="center" prop="optionDesc" label="选项描述" />

                                <el-table-column align="center" prop="anotherName" label="别名" />
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { deleteKey, deepClone } from '@/utils';

    import Sortable from 'sortablejs';
    import MIXIN from '@views/mixin/button';

    import { deleteSysButtons } from '@/api/system';
    export default {
        mixins: [MIXIN],

        props: {
            groupList: {
                default: [],
                type: Array
            },
            baseList: {
                default: [],
                type: Array
            },
            type: {
                type: String,
                default: 'add'
            },
        },
        data() {
            return {
                dialogObj: {},
                groupListNew: [],
                editableTabsValue: '',
                multipleSelectionLeft: [],
                multipleSelectionRight: [],
                children: [],
                optionValueList: [],
                count: -2,

            };
        },
        methods: {
            addTab() {
                this.count += 1;
                if (this.count != -1) {
                    if (this.groupList[this.count].children.length == this.baseList.length) {
                        return this.$message.error("不能包含所有选项值")
                    }
                    if (this.groupList[this.count].children.length == 0) {
                        return this.$message.error("至少包含一项选项值")
                    }
                }

                this.optionValueList = deepClone(this.baseList);
                this.groupList.push({
                    optionGroup: '',
                    groupName: '组别' + (this.groupList.length + 1),
                    children: [],
                    leftchildren: this.optionValueList
                });
                this.editableTabsValue = this.groupList.length - 1 + "";
            },
            //左表格保存选中结果
            handleSelectionChangeLeft(val) {
                this.multipleSelectionLeft = val;
            },
            //右表格保存选中结果
            handleSelectionChangeRight(val) {
                this.multipleSelectionRight = val;
            },
            //右移---把左边表格的选中项移到右边表格
            rightMove(index) {
                //不能全选 + 也不能全不选
                if (this.multipleSelectionLeft.length == this.optionValueList.length) {
                    return this.$message.error("不能包含所有的选项值");
                }
                if (this.multipleSelectionLeft.length == 0) {
                    return this.$message.error("请选择选项值");
                }
                if (this.multipleSelectionLeft.length == this.groupList[index].leftchildren.length) {
                    return this.$message.error("不能包含所有的选项值");
                }
                this.multipleSelectionLeft.forEach(item => {
                    this.groupList[index].children.push(item)
                });

                var arr1 = this.groupList[index].leftchildren;
                var arr2 = this.multipleSelectionLeft;

                function remove(arr1, arr2) {
                    for (let i = 0; i < arr2.length; i++) {
                        for (let j = 0; j < arr1.length; j++) {
                            if (arr2[i] == arr1[j]) {
                                let indexs = arr1.indexOf(arr1[j]);
                                arr1.splice(indexs, 1);
                            }
                        }
                    }
                    return arr1
                }
                //调用：
                this.groupList[index].leftchildren = remove(arr1, arr2);
                //console.log(JSON.stringify(this.groupList), 222)
            },
            //左移是把右边表格选中项移到左边表格
            leftMove(index) {
                // console.log("右表格数据")
                // console.log(this.multipleSelectionRight);
                // console.log(this.groupList[index].leftchildren, 111);

                if (this.multipleSelectionRight.length == 0) {
                    return this.$message.error("无选项值");
                }
                this.multipleSelectionRight.forEach(item => {
                    this.groupList[index].leftchildren.push(item)
                });
                // console.log(JSON.stringify(this.groupList[index].leftchildren), 222);
                var arr1 = this.groupList[index].children;
                var arr2 = this.multipleSelectionRight;

                function remove(arr1, arr2) {
                    for (let i = 0; i < arr2.length; i++) {
                        for (let j = 0; j < arr1.length; j++) {
                            if (arr2[i] == arr1[j]) {
                                let indexs = arr1.indexOf(arr1[j]);
                                arr1.splice(indexs, 1);
                            }
                        }
                    }
                    return arr1
                }
                //调用：
                this.groupList[index].children = remove(arr1, arr2);
            },

            removeTab(val) {
                this.groupList.splice(val, 1)
            },
            changeTab() {
                let index = this.editableTabsValue;
                console.log(index, 123123);

                this.$nextTick(() => {
                    let tbody = document.querySelector('.table' + index + ' tbody');
                    console.log(tbody);

                    Sortable.create(tbody, {
                        ghostClass: 'sortable-ghost',
                        onEnd: ({ newIndex, oldIndex }) => {
                            let newArr = deepClone(this.groupList[index].children);
                            const currRow = newArr.splice(oldIndex, 1)[0];
                            newArr.splice(newIndex, 0, currRow);
                            // 重新排序完的表格数据
                            this.groupList[index].children = [];
                            this.$nextTick(function () {
                                this.groupList[index].children = newArr;
                            });
                        }
                    });
                });
            },

        },
        mounted() {
            this.changeTab()

            // this.optionValueList = deepClone(this.baseList);
            // alert("optionValueList: "+ JSON.stringify(this.optionValueList));
            // this.groupListNew = [
            //     {
            //         optionGroup: '123',
            //         optionDesc: 'TEST',
            //         children: [{ optionValue: '123' }, { optionValue: '123123' }],
            //         leftchildren: this.baseList
            //     },
            //     {
            //         optionGroup: '123',
            //         optionDesc: 'TEST',
            //         children: [{ optionValue: '123' }, { optionValue: '123123123123' }],
            //         leftchildren: this.baseList
            //     }
            // ];
        },
        watch: {}
    };
</script>
<style>
    .sortable-ghost {
        background: red;
    }
</style>