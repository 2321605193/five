import express from 'express';
import cookieParser from 'cookie-parser';
import cookieSeesion from 'express-session';
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
    name: 'junjun',
    secret: ["abb", "bcc"],
    resave: false,
    rolling: true,
    cookie: { maxAge: 1000 * 60 * 20, }
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