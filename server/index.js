// koa
const Koa = require("koa");
// 实例化
const app = new Koa();
// Io
const socket = require("./Controller/chat").socket(app);

// 路由
const router = require("./routers/index");
// SESSION
const session = require("koa-session");
// 配置文件
const config = require("./config/config.js");
// 跨域
const cors = require("koa-cors2");
const path = require("path");

//设置静态资源的路径
const static = require("koa-static");
const staticPath = "./public";

app.use(static(path.join(__dirname, staticPath)));

// 统一处理数据
const bodyparser = require("koa-bodyparser");
app.use(bodyparser());

// 认证
const jwtKoa = require("koa-jwt");

// session配置
app.keys = ["some secret hurr"];
const CONFIG = {
  key: "koa:sess", //cookie key (default is koa:sess)
  maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));
// 跨域
app.use(
  cors({
    origin: "http://192.168.1.99:8080",
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);

// 认证

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function (ctx, next) {
  return next().catch(err => {
    if (401 == err.status) {
      ctx.status = 200;
      ctx.body = {
        status: 10000,
        msg: "授权失败,请重新登录"
      };
    } else {
      throw err;
    }
  });
});

app.use(
  jwtKoa({ secret: "conchat" }).unless({
    path: [
      /\/login/,
      /\/register/,
      /\/getImgCode/,
      /\/getSmsCode/,
      /\/retrievePwd/
    ] //数组中的路径不需要通过jwt验证
  })
);

// 统一处理错误
const errorEnd = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = {
      code: -1,
      msg: "服务器去旅行了!"
    };
  }
};

app.use(errorEnd);

// 注册路由
app.use(router.router());

app.listen(config.port);
