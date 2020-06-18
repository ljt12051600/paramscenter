import {
    queryOptionCodeNoPage,
} from '@/api/basedata';

let FRAMEMANAGE = {
    data() {
        return {
            isTfsObj: {
                1: "是",
                0: "否"
            },
            isTfsList: [
                {
                    optionValue: '1',
                    optionDesc: '1-是'
                }, {
                    optionValue: '0',
                    optionDesc: '0-否',
                }
            ],
            imptntLevelList: [],
            safeLevelList: [],
            pipStatusList: [],
            dbList: [],
            imptntLevelObj: {},
            safeLevelObj: {},
            pipStatusObj: {},
            dbObj: {},

        }
    },

    mounted() {
        this.getImpLevelList();
        this.getSafeLevelList();
        this.getPipStatusList();
        this.getDbList();
    },
    methods: {
        async getImpLevelList() {
            let info = await queryOptionCodeNoPage({ optionCode: "imptntLevel" });
            if (info.resCode === "0") {
                this.imptntLevelList = info.rows || [];
                info.rows.forEach(item => {
                    this.imptntLevelObj[item.optionValue] = item.optionDesc
                })
            }
        },
        async getSafeLevelList() {
            let info = await queryOptionCodeNoPage({ optionCode: "safeLevel" });
            if (info.resCode === "0") {
                this.safeLevelList = info.rows || [];
                info.rows.forEach(item => {
                    this.safeLevelObj[item.optionValue] = item.optionDesc
                })
            }
        },
        async getPipStatusList() {
            let info = await queryOptionCodeNoPage({ optionCode: "pipStatus" });
            if (info.resCode === "0") {
                this.pipStatusList = info.rows || [];
                info.rows.forEach(item => {
                    this.pipStatusObj[item.optionValue] = item.optionDesc
                })
            }
        },
        async getDbList() {
            let info = await queryOptionCodeNoPage({ optionCode: "dataBaseType" });
            if (info.resCode === "0") {
                this.dbList = info.rows || [];
                info.rows.forEach(item => {
                    this.dbObj[item.optionValue] = item.optionDesc
                })
            }
        },
    },

};
export default FRAMEMANAGE;