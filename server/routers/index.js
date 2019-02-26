const compose = require('koa-compose');//中间件合成
// node的glob模块允许你使用 *等符号, 来写一个glob规则,像在shell里一样,获取匹配对应规则的文件.
const glob = require('glob');
const { resolve } = require('path')

allRouter = () => {
    let routers = [];
    glob.sync(resolve(__dirname, './', '**/*.js'))
        .filter(value => (value.indexOf('index.js') === -1))
        .map(router => {
            routers.push(require(router).routes())
            routers.push(require(router).allowedMethods())
        })
    return compose(routers)
}


/*
 * router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以
 * 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有
 * 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头 
 *
 */

exports.router = allRouter;