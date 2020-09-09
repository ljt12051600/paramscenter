import {queryPagPdBButtons } from '@/api/parmbusi';

let PUBPARM = {
    data() {
        return {
            pubBrcList: [],
            pubBrcObj:{},
        }
    },
    mounted() {
        this.getPubBrcList();
    },
    methods: {
        async getPubBrcList() { //机构代码 机构名称
            let info = await queryPagPdBButtons();
            if (info.resCode === '0') {
                this.pubBrcList = info.rows || [];
                info.rows.forEach(item => {
                    this.pubBrcObj[item.brcCode] = item.brcName
                })
            }
        },
    },

};


export default PUBPARM;