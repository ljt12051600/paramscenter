import {
    queryTp3003,
    queryTp3004
} from '@/api/basedata';

let SYSTEM = {
    data() {
        return {

            subSysList: [],
            dataStandObj: {
                "1": "企业级",
                "2": "应用级"
            },
            dataStandList: [{
                    name: "企业级",
                    value: "1"
                },
                {
                    name: "应用级",
                    value: "2"
                },
            ],

        }
    },

    mounted() {

        this.getSubSysList();


    },
    methods: {

        async getSubSysList() {
            let info = await queryTp3004();
            if (info.resCode === '0') {
                this.subSysList = info.rows || [];
                info.rows.forEach(item => {
                    this.subSysObj[item.subSysId] = item.subSysName
                })
            }

        },






    },

};
export default SYSTEM;