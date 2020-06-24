<template>
    <div>
        <div style="margin-bottom: 20px;">
            <el-button size="small"   type="primary" @click="addTab">添加组别</el-button>
        </div>
        {{editableTabsValue}}
        <el-tabs
            @tab-click="changeTab"
            v-model="editableTabsValue"
            type="card"
            closable
            @tab-remove="removeTab"
        >
            <el-tab-pane
                v-for=" ( item, index)  in groupList"
                :key="index+'cc'"
                :label="item.optionDesc"
                :name="index+''"
            >
                <el-form ref="form" :inline="true" label-width="140px">
                    <el-form-item required label="组别">
                        <el-input
                            maxlength="12"
                            style="width:220px;"
                            v-model.trim="item.optionGroup"
                        ></el-input>
                    </el-form-item>
                    <el-form-item required label="组别名称">
                        <el-input
                            maxlength="20"
                            style="width:220px;"
                            v-model.trim="item.optionDesc"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-table :data="item.leftchildren" style="width: 100%;">
                            <el-table-column type="selection" width="55"></el-table-column>
                           
                            <el-table-column align="center" prop="optionValue" label="选项值" />
                            <el-table-column align="center" prop="optionDesc" label="选项描述" />
                            <el-table-column align="center" prop="anotherName" label="别名" />
                        </el-table>
                    </el-col>
                    <el-col :span="2">
                        <div>
                            <el-button type="primary">左移</el-button>
                        </div>
                        <div style="margin-top:20px">
                            <el-button type="primary">右移</el-button>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div :class="'table'+index">
                            <el-table
                                :ref="'table'+index"
                                :data="item.children"
                                style="width: 100%;"
                            >
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column align="center" prop="optionValue" label="选项值" />

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
        }
    },
    data() {
        return {
            dialogObj: {},
            groupListNew: [],
            editableTabsValue: ''
        };
    },
    methods: {
        addTab() {
            this.groupList.push({
                optionGroup: '',
                optionDesc: '组别' + (this.groupList.length+1),
                children: [],
                leftchildren: this.baseList
            });
            this.editableTabsValue = this.groupList.length-1+"";
        },
        removeTab(val) {
           this.groupList.splice(val,1)
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
                        let newArr = deepClone(this.groupListNew[index].children);
                        const currRow = newArr.splice(oldIndex, 1)[0];
                        newArr.splice(newIndex, 0, currRow);
                        // 重新排序完的表格数据
                        this.groupListNew[index].children = [];
                        this.$nextTick(function() {
                            this.groupListNew[index].children = newArr;
                        });
                    }
                });
            });
        }
    },
    mounted() {
        this.groupListNew = [
            {
                optionGroup: '123',
                optionDesc: 'TEST',
                children: [{ optionValue: '123' }, { optionValue: '123123' }],
                leftchildren: this.baseList
            },
            {
                optionGroup: '123',
                optionDesc: 'TEST',
                children: [{ optionValue: '123' }, { optionValue: '123123123123' }],
                leftchildren: this.baseList
            }
        ];
    },
    watch: {}
};
</script>
<style>
.sortable-ghost {
    background: red;
}
</style>