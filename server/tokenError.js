// 使用了 koa-jwt 中间件后，如果没有token，或者token失效，该中间件会给出对应的错误信息。如果没有自定义中间件的话，会直接将 koa-jwt 暴露的错误信息直接返回给用户。

export default errorHandle = (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                error: err.originalError ? err.originalError.message : err.message,
            };
        } else {
            throw err;
        }
    });
}