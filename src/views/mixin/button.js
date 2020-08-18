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
        }
    },
    created() {
        this.getMenuNode();


    },
    mounted() {



    },
    methods: {
        getMenuNode() {
            getItem(this.items, this.$route.path.substr(1));
            console.log(itemsss)

            this.clickMenuId = itemsss.menuId;
            sessionStorage.setItem("clickMenuId", this.clickMenuId)
            if (itemsss.buttonPerms && itemsss.buttonPerms.length > 0) {
                let list = itemsss.buttonPerms.split(",");
                list.forEach(item => {
                    this.$set(this.PERMISSON, item, true)
                })
            }
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