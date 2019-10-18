import express from 'express';
import cookieParser from 'cookie-parser';
import cookieSeesion from 'cookie-session';
import bodyParser from 'body-parser';
import multer from 'multer';

var app = express();

//设置中间件
app.use(cookieParser('junjun'));
app.use(bodyParser.urlencoded({
    limit: "100mb",
    extended: false
}))

app.use(bodyParser.json());

app.use(cookieSeesion({
    name: 'session',
    keys: ["abb", "bcc"],
    maxAge: 100 * 60 * 1,

}))

const upload = multer({ dest: '../src/upload' });
app.use(upload.any());
//配置静态资源服务器
app.use(express.static('../src'));

// 设置路由

app.use('/api', require('./routers/router').router);

app.listen(8081, () => {

    console.log('服务启动');
})