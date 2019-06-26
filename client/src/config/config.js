const dev_api = "http://192.168.1.99:3000";
const build_api = "http://152.136.126.184:3000";

let baseUrl = process.env.NODE_ENV == "development" ? dev_api : dev_api;
export default {
  baseUrl
};
