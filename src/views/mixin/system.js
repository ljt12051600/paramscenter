import {
    queryTp3004,
    queryOptionCodeNoPage,
    queryVocab
} from '@/api/basedata';

let SYSTEM = {
    data() {
        return {

            subSysList: [],
            dicCodeList: [],
            dicCodeObj: {},
            typeList: [],
            subSysObj: {},
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
            voCabList:[],
            voCabObj:{},

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
        async getDicList() {
            let info = await queryOptionCodeNoPage({optionCode: "type"});
          
            if (info.resCode === '0') {
                this.typeList=info.rows || [];
            }

            
        },
        async getDicCodeList() {
            let info = await queryOptionCodeNoPage({optionCode: "dictCodeType"});
          
            if (info.resCode === '0') {
                this.dicCodeList=info.rows || [];
                info.rows.forEach(item => {
                    this.dicCodeObj[item.optionValue] = item.optionDesc
                })
               
            }

            
        },
        async getVoCabList() {
            let info = await queryVocab();
          
            if (info.resCode === '0') {
                this.voCabList=info.rows || [];
                info.rows.forEach(item => {
                    this.voCabObj[item.wordCode] = item.wordDesc
                })
             
               
               
            }

            
        }

    },

};
export default SYSTEM;