import {
    queryTp3004,
    queryOptionCodeNoPage,
    queryVocab,
    queryDistinctOption,
    queryTp3003,
    queryTp3005
} from '@/api/basedata';
import { deepClone } from '@/utils';

let SYSTEM = {
    data() {
        return {

            subSysList: [],
            dicCodeList: [],
            dicCodeObj: {},
            typeList: [],
            subSysObj: {},
            subSysAllObj: {},
            issueStatusObj: {
                "9": "9-已发布",
                "0": "0-新增未发布",
                "1": "1-修改未发布",
            },
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
            voCabList: [],
            voCabObj: {},
            senseFlagList: [],
            senseFlagObj: {},
            disinList: [],
            disinObj: [],
            sysList: [],
            sysObj: {},
            sysAllObj: {},
            domainList: [],
            domainObj: {},
            sysSubSysList: [],

        }
    },

    mounted() {

        this.getSenseFlag();
        this.getSysList();
        this.getDomainList();
    },
    methods: {

        async getSubSysList() {
            if(this.subSysList.length)return;
            let info = await queryTp3004();
            if (info.resCode === '0') {
                this.subSysList = info.rows || [];
                info.rows.forEach(item => {
                    this.$set(this.subSysObj, item.subSysId, item.subSysName);
                    this.$set(this.subSysAllObj, item.subSysId, item);
                });
              
                this.getSysSubSysList()
            }

        },
        async getSysList() {
            if(this.sysList.length)return;
            let info = await queryTp3003();
            if (info.resCode === '0') {
                this.sysList = info.rows || [];
                info.rows.forEach(item => {
                    this.sysObj[item.sysId] = item.sysName;
                    this.$set(this.sysAllObj, item.sysId, item)
                });
                this.getSubSysList();

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
            let info = await queryOptionCodeNoPage({
                optionCode: "type"
            });

            if (info.resCode === '0') {
                this.typeList = info.rows || [];
            }


        },
        async getDicCodeList() {
            let info = await queryOptionCodeNoPage({
                optionCode: "dictCodeType"
            });

            if (info.resCode === '0') {
                this.dicCodeList = info.rows || [];
                info.rows.forEach(item => {
                    this.dicCodeObj[item.optionValue] = item.optionDesc
                })

            }


        },
        async getSenseFlag() {
            let info = await queryOptionCodeNoPage({
                optionCode: "sensFlag"
            });

            if (info.resCode === '0') {
                this.senseFlagList = info.rows || [];
                info.rows.forEach(item => {
                    this.senseFlagObj[item.optionValue] = item.optionDesc
                })


            }


        },
        async getVoCabList() {
            let info = await queryVocab();

            if (info.resCode === '0') {
                this.voCabList = info.rows || [];
                info.rows.forEach(item => {
                    this.voCabObj[item.wordCode] = item.wordDesc
                })



            }


        },
        async queryDistinctOption() {
            let info = await queryDistinctOption();

            if (info.resCode === '0') {
                this.disinList = info.rows || [];
                info.rows.forEach(item => {
                    this.disinObj[item.optionCode] = item.optionName;
                })



            }


        },
        getSysSubSysList() { //父子系统按树结构排列
            this.sysSubSysList = [];
            let obj = {};
            this.subSysList.forEach(item => {
                item.label = item.subSysId + "-" + item.subSysName;
                item.value = item.subSysId;
                if (!obj[item.sysId]) {
                    obj[item.sysId] = {
                        children: [item],
                        name: this.sysObj[item.sysId]
                    }
                } else {
                    obj[item.sysId].children.push(item)
                }

            });
            for (var i in obj) {
                let passObj = {
                    value: i,
                    label: i + "-" + obj[i].name,
                    children: obj[i].children
                };
                this.sysSubSysList.push(passObj)

            };

        },
        getSysDes(id) { //获取子系统名称加子系统id  比如传acs，直接给acs-参数系统
            return id + "-" + this.subSysObj[id]

        },
        getIdAll(id) { //给子系统 回写[父亲id，子id]
            let obj=deepClone(this.subSysAllObj);
            return [obj[id].sysId, id]
         


        }

    },

};
export default SYSTEM;