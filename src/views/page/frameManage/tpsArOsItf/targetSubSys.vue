<template>
    <div style="display:inline-block">
        <!-- <el-cascader v-model="value" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange">
        </el-cascader> -->
        {{value}}
        <el-cascader v-model="value" :show-all-levels="false" :options="options" @change="handleChange"></el-cascader>
    </div>
</template>

<script>
    import SYSTEM from '@views/mixin/system';
    export default {
        mixins: [SYSTEM],
        // data() {
        //     return {
        //         option: [],
        //     };
        // },
        data() {
            return {
                value: [],
                label: [],
                options: [{
                    value: 'zhinan',
                    label: 'zhinan-你好',
                    children: [{
                        value: 'shejiyuanze',
                        label: 'shejiyuanze-设计原则',
                    }, {
                        value: 'daohang',
                        label: '导航',
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                    }, {
                        value: 'form',
                        label: 'Form',
                    }, {
                        value: 'data',
                        label: 'Data',
                    }, {
                        value: 'notice',
                        label: 'Notice',
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                    }, {
                        value: 'others',
                        label: 'Others',
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }]
            };
        },
        methods: {
            handleChange(value) {
                console.log(value[1]);
                //console.log(label.label)
            }
        }

    }
</script>