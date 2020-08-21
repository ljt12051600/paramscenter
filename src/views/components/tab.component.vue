<template>
    <div class="noshowtabs">
        <div class="app-container">
            <el-tabs v-model="activeName">
                <el-tab-pane name="list" label="配置管理">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <!--工具栏-->
                            <div class="head-container">
                                <el-card>
                                    <slot name="top"></slot>
                                    <div class="header-search">
                                        <slot name="search"></slot>
                                    </div>
                                </el-card>
                            </div>

                            <el-card v-if="!nobody" style="margin-top:10px">
                                <div class="header-button">
                                    <slot name="action"></slot>
                                </div>

                                <slot name="body"></slot>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane name="edit">
                    <slot v-if="activeName=='edit'" name="edit"></slot>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    name: 'roleUser',
    props: {
        nobody: {
            type: Boolean,
            default: false
        },
        activeName: {
            type: String,
            default: 'list'
        }
    },
    methods: {}
};
</script>
<style>
.header-button {
    margin-top: 0;
}
</style>