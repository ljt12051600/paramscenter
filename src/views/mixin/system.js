import {
    queryTp3004,
    queryOptionCodeNoPage,
    queryVocab,
    queryDistinctOption,
    queryTp3003,
    queryTp3005
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
            senseFlagList:[],
            senseFlagObj:{},
            disinList:[],
            disinObj:[],
            sysList:[],
            sysObj:{},
            domainList: [],
            domainObj: {}

        }
    },

    mounted() {
        this.getSubSysList();
        this.getSenseFlag();
        this.getSysList();
        this.getDomainList();
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
        async getSysList() {
            let info = await queryTp3003();
            if (info.resCode === '0') {
                this.sysList = info.rows || [];
                console.log(info.rows,"xxxxxxxxxxxxxxxxxxxx");
                info.rows.forEach(item => {
                    this.sysObj[item.sysId] = item.sysName;
                });
                console.log(this.sysObj)
               

            }
        },
        async getDomainList() {
            let info = await queryTp3005();
            if (info.resCode === '0') {
                this.domainList = info.rows || [];
                info.rows.forEach(item => {
                    this.domainObj[item.subDomainValue] = item.subDomainName
                });
                
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
        async getSenseFlag() {
            let info = await queryOptionCodeNoPage({optionCode: "sensFlag"});
          
            if (info.resCode === '0') {
                this.senseFlagList=info.rows || [];
                info.rows.forEach(item => {
                    this.senseFlagObj[item.optionValue] = item.optionDesc
                })
                console.log(this.senseFlagList);
                console.log(this.senseFlagObj)
               
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

            
        },
        async queryDistinctOption() {
            let info = await queryDistinctOption();
          
            if (info.resCode === '0') {
                this.disinList=info.rows || [];
                info.rows.forEach(item => {
                    this.disinObj[item.optionCode] = item.optionName;
                })
             
               
               
            }

            
        },

    },

};
export default SYSTEM;