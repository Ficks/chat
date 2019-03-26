export default {
    data() {
        return {

        }
    },
    methods: {
        openWin(options) {
            if (options.path) {
                this.$router.push({
                    path: options.path
                })
            } else {
                this.$router.push({
                    name: options.name,
                    query: options.query || ""
                })
            }
        }
    },
    created() {
    }
}