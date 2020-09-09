
<template>
    <div>
        <el-dialog :visible="showAdd" width="800px" title="组件属性增加" :modal-append-to-body="false">
            <el-form ref="showAdd" :model="attrAddObj" :rules="rules" inline size="small" label-width="80px">
                    
                    
                    <el-form-item label="组件编码" prop="compCode">
                        <el-input v-model.trim="attrAddObj.compCode" readonly style="width: 200px;" />
                    </el-form-item>
                    
                </el-form>
                <div style="margin-bottom: 20px;">
                    <el-button size="small" @click="addTab(editableTabsValue)">添加属性</el-button>
                </div>
                <div>
                    <!-- {{editableTabs}} -->
                    <el-tabs
                        v-model="editableTabsValue"
                        type="card"
                        closable
                        @tab-remove="closeTab"
                    >
                        <el-tab-pane
                            v-for="(itemAttr,index) in editableTabs"
                            :key="index+'cc'"
                            :label="itemAttr.name"
                            :name="index+''"
                            :rules="rules"
                        >
                            <!-- {{itemAttr.content}} -->
                            <el-form
                                ref="formAttr"
                                :model="itemAttr"
                                :rules="rules"
                                inline
                                size="small"
                                label-width="300px"
                            >
                                <div>
                                    <el-form-item label="属性名称" prop="compPropertyName">
                                        <el-input
                                            style="width:200px;"
                                            v-model.trim="itemAttr.compPropertyName"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="属性选择方式" prop="selectionMethod">
                                        <el-select
                                            style="width:200px;"
                                            v-model="itemAttr.selectionMethod"
                                            clearable
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                :key="index+'cc'"
                                                v-for="(item,index) in smList"
                                                :label="item.value+'-'+item.name"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="属性检查" prop="inspectionRules">
                                        <el-input
                                            v-model.trim="itemAttr.inspectionRules"
                                            style="width: 200px;"
                                        />
                                    </el-form-item>
                                    
                                </div>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="doAddAttr(true)">确 定</el-button>
                    <el-button type="warning" @click="doAddAttr(false)">取 消</el-button>
                </div>

        </el-dialog>

    </div>

</template>


<script>
import { deleteKey, deepClone } from '@/utils';
import {  smList,compKindList} from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import { createPCPButtons } from '@/api/parmbusi';

import attrcompEdit from './attrcompedit.vue';
export default {
    name: 'attrcompAdd',
    props: ['attrAddObj','showAdd'],
    mixins: [MIXIN],


    data: function()  {
        return {
            smList,
            compKindList,

            editableTabsValue: 0,
            editableTabs: [
                {
                    sysId: '',
                    title: '属性',
                    name: '属性',
                    content: '',

                    compPropertyName: '',
                    selectionMethod: '',

                    inspectionRules: ''
                }
            ],

            rules: {
                compPropertyName: [
                    {
                        required: true,
                        message: '请输入属性名称',
                        trigger: 'blur'
                    }
                ]
            }

        }

    },

    methods: {
        //增加签页
        addTab() {
            this.editableTabs.push({
                sysId: '',
                content: '',
                name: '属性',

                compPropertyName: '',
                selectionMethod: '',
                attrMetedata: '',
                inspectionRules: ''
            });

            this.editableTabsValue = this.editableTabs.length - 1 + '';
        },
        //关闭签页
        closeTab(index) {
            this.editableTabs.splice(index, 1), (this.editableTabsValue = this.editableTabs.length - 1 + '');
        },
        //新增组件属性
        async attrComp() {
            // console.log('111'+this.attrAddObj.compCode);
            attrComplist: this.editableTabs.length = 0; //数组设空
            this.addTab(0);
            this.showAttr = true;
            this.attrObjAdd = {
                id: this.attrAddObj.id,
                compName: this.attrAddObj.compName,
                compClassification: this.attrAddObj.compClassification,
                compCode: this.attrAddObj.compCode,

                compPropertyCode: '',
                compPropertyName: '',
                selectionMethod: '',
                inspectionRules: ''
            };
        },

        //组件添加属性
        async doAddAttr(bol) {
            if (bol) {
                let index_name = this.editableTabs.findIndex(item => {
                    return item.compPropertyName == '';
                });
                if (index_name > -1) {
                    this.editableTabsValue = index_name + '';
                    return this.$message.error('属性名称不能为空');
                }
                //属性名称不能重复
                if (this.editableTabs.length > 1) {
                    var find = false;
                    var num = -1;
                    for (var i = 0; i < this.editableTabs.length; i++) {
                        for (var j = i + 1; j < this.editableTabs.length; j++) {
                            if (this.editableTabs[i].compPropertyName == this.editableTabs[j].compPropertyName) {
                                find = true;
                                num = i;
                                break;
                            }
                        }
                    }
                    if (find) {
                        this.$message.error('属性名称不能重复:' + this.editableTabs[num].compPropertyName);
                        this.editableTabsValue = num + '';
                        return;
                    }
                }
                //增加属性
                let info = await createPCPButtons({
                    compCode: this.attrAddObj.compCode,
                    list: this.editableTabs
                });

                if (info.resCode === '0') {
                    this.$msgbox({
                        message: info.resMsg
                    });
                    this.$emit("doCloseAdd");
                    // this.sels = []; //清空sels，刚进入时删除按钮置灰
                    // this.getListAttr(1); //查询组件属性
                } else {
                    this.$msgbox({
                        message: info.resMsg
                    });
                }
            } else {
                this.$emit("doCloseAdd");
            }
        },

    },

    mounted() {
        // console.log(this.attrAddObj)
    },
}

</script>

<style>
.sortable-ghost {
    background: red;
}
</style>