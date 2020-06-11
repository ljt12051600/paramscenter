<template>
    <div>
        <el-dialog :visible="showDialog">
            {{dialogObj}}
            <el-form ref="form" :inline="true" label-width="120px">
                <system-component  :required="true" :query="dialogObj" />
                <el-form-item required label="数据标准">
                    <el-select 
                        style="width:200px;"
                        v-model="dialogObj.dataStand"
                        clearable
                        placeholder="请选择"
                    >
                        <el-option
                            :key="index+'cc'"
                            v-for="(item,index) in dataStandList"
                            :label="item.value+'-'+item.name"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item  label="备注">
                        <el-input style="width:200px;" v-model.trim="dialogObj.optionGroup"></el-input>
                    </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="doClose(false)">取 消</el-button>
                <el-button type="primary" @click="doClose(true)">确认添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { deleteKey, deepClone } from '@/utils';
import SYSTEM from '@views/mixin/system';

import systemComponent from '@views/components/system.component.vue';
export default {
    components: { systemComponent },
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
        }
    },
    data() {
        return {
            dialogObj: {
                sysId: '',
                subSysId: ''
            }
        };
    },
    methods: {
        doClose(bol) {
            this.$emit('doClose', bol);
        }
    },
    mounted() {
        if (this.type == 'add') {
            this.dialogObj = deepClone(this.actionObj);
        }
    }
};
</script>