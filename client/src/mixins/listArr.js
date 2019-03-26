{/* <mu-load-more @refresh="refresh" :refreshing="searchLoad.refreshing" :loading="searchLoad.loading" @load="load">
</mu-load-more> */}
export default {
    data() {
        return {
            searchList: {
                page: 1,
                size: 15
            },
            searchLoad: {
                refreshing: false,
                loading: false,
                not: false,
            },
            listArr: []
        }
    },
    methods: {
        // 初始化前-自定义
        beforeInit() { },
        // 初始化
        init() {
            this.searchLoad.not = false;
            this.listArr = [];
            this.beforeInit();
            this.searchList.page = 1;
            this.getList();
        },
        // 获取列表-自定义
        beforeGetList() {
            this.searchList.loading = true;
        },
        getList() { },
        // 设置数据
        afterGetList(list) {
            this.searchList.page++;
            this.listArr = this.listArr.concat(list);

            if (this.searchLoad.refreshing) {
                this.$toast.success('刷新成功');
            }
            this.searchLoad.refreshing = this.searchLoad.loading = false;
            if (list.length == 0) this.searchLoad.not = true;
        },
        // 刷新
        refresh() {
            this.searchLoad.refreshing = true;
            this.$refs.container.scrollTop = 0;//必须设置父组件的ref
            this.init();
        },
        // 加载
        load() {
            if (!this.searchLoad.not) {
                console.log("加载数据")
                this.searchLoad.loading = true;
                this.getList();
            }
        },
    },
    created() {
        this.init();
    }
}