<template>
    <div>

        
        <el-form ref="form" :inline="true" label-width="140px">
         
            <el-form-item required label="组别">
                <el-input style="width:220px;" v-model.trim="dialogObj.optionName"></el-input>
            </el-form-item>
            <el-form-item required label="组别名称">
                <el-input style="width:220px;" v-model.trim="dialogObj.optionName"></el-input>
            </el-form-item>
       
        </el-form>
    </div>
</template>

<script>
import { deleteKey, deepClone } from '@/utils';

// import Sortable from "sortablejs";
import MIXIN from '@views/mixin/button';

import { deleteSysButtons } from '@/api/system';
export default {
    mixins: [MIXIN],

    props: {
        groupList: {
            default: [],
            type: Array
        }
    },
    data() {
        return {};
    },
    methods: {},
    mounted() {},
    watch: {}
};
</script>
<style>
.sortable-ghost {
    background: red;
}
</style>