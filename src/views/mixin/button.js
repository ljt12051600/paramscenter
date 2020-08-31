import { mapState, mapMutations } from "vuex";
let itemsss = {}

function getItem(arr, path) {

    arr.forEach(item => {
        if (item.menuType == "F" && item.children && item.children.length > 0) {
            getItem(item.children, path);
        } else {
            if (item.menuUrl == path) {
                itemsss = item;
            }
        }
    })

}

let MIXIN = {

    data() {
        return {
            name: 'mixin',
            clickMenuId: "",
            PERMISSON: {},
            showButton: false,
            chooseArray: [],
            isEdition: ''
        }
    },
    created() {
        this.getMenuNode();



    },
    mounted() {




    },
    methods: {
        changeChoose(arr) {
            this.chooseArray = arr;
            console.log(arr);
        },
        checkOne() {
            if (this.chooseArray.length > 1) {
                this.$message.error('只能选择一条数据');
                return false;
            } else if (this.chooseArray.length === 0) {
                this.$message.error('请选择数据后操作');
                return false;
            }
            return true;
        },
        buttonAction(id) {
            console.log(id);

            this[id]();
        },

        getMenuNode() {
            getItem(this.items, this.$route.path.substr(1));

            this.clickMenuId = itemsss.menuId;
            this.isEdition = itemsss.isEdition === "1" ? true : false;
            console.log(itemsss.isEdition)
            sessionStorage.setItem("isEdition", this.isEdition)
            sessionStorage.setItem("clickMenuId", this.clickMenuId)
            if (itemsss.buttonPerms && itemsss.buttonPerms.length > 0) {
                let list = itemsss.buttonPerms.split(",");
                list.forEach(item => {
                    this.$set(this.PERMISSON, item, true)
                })
            }
            this.showButton = true;
            console.log(this.PERMISSON)

        },

    },
    watch: {
        items(val) {
            console.log(val);
            if (val && val.length > 0) {

                this.getMenuNode();
            }

        }

    },
    computed: {
        ...mapState({
            items: state => state.main.items
        })
    },
};
export default MIXIN;