<template>
    <span>
        <el-button
            type="primary"
            v-if=" item.buttonId!=='query'&&item.buttonId!=='save'&&((isEdition&&(item.buttonId!=='update'&&item.buttonId!=='remove'))||!isEdition)"
          
            @click="goClick(item.buttonId)"
            :key="index+'cc'"
            v-for="(item,index) in buttonList"
        >{{item.buttonName}}
     
        
        </el-button>
     
     
        
    </span>
</template>

<script>
//  {{item.buttonId!=='query'&&item.buttonId!=='save'&&((isEdition&&(item.buttonId!=='update'&&item.buttonId!=='remove'))||!isEdition)}}
import { getButtonsByMenuIdRoleId } from '@/api/process';
import { deleteKey } from '@/utils';

import { searchUser } from '@/api/system';
export default {
    name: 'sysytem',
    props: {},
    data() {
        return {
            buttonList: [],
            isEdition: false,
        };
    },

    mounted() {
        this.init();
    },
    methods: {
        async init() {
            let info = await getButtonsByMenuIdRoleId({});
            if (info.resCode === '0') {
                this.buttonList = info.rows;
            }
            this.isEdition=JSON.parse(sessionStorage.getItem("isEdition"));

        },
        firstUpperCase(word) {
            let arr = word.split(' ');
            let result = '';
            arr.forEach((val) => {
                result += `${val[0].toUpperCase()}${val.slice(1)}`;
            });
            return result;
        },
        goClick(id) {
            let newId = this.firstUpperCase(id);
            this.$emit('goAction', 'do' + newId);
        }
    }
};
</script>