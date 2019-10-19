import express from 'express';
import md5 from 'md5';
import db from '../DB';

import { key } from '../Config';


import { checkLogin } from '../middle/check';
let router = express.Router();


router.post('/reg', (req, res, next) => {
    //准备sql
    var sql = " INSERT INTO  `user` (`uname`,`upwd`,`usex`,`utel`,`uaddress`) VALUES (?,?,?,?,?);";
    //准备参数
    var parmas = [
        req.body.uname,
        md5(md5(req.body.upwd) + key),
        req.body.usex,
        req.body.utel,
        req.body.uaddress
    ]

    db.exec(sql, parmas, (err, result, fileds) => {
        if (err) {
            if (err.message.indexOf('Duplicate') != -1) {
                res.json({ msg: '用户名已存在', status: -902 });
                return;
            }
            res.json({ msg: 'sql语句有问题', status: -901, err: err.message });
            return;

        }

        if (result.affectedRows >= 1) {
            res.json({ msg: '注册成功', status: 2 });
        } else {
            res.json({ msg: '注册失败', status: -2 });
        }
    })


})

router.post('/login', (req, res, next) => {

    //准备sql语句
    var sql = ' SELECT * FROM  USER  WHERE uname=? AND upwd=?';

    var parmas = [
        req.body.uname,
        md5(md5(req.body.upwd) + key)
    ]


    db.exec(sql, parmas, (err, result, fileds) => {
        if (err) {
            res.json({ msg: 'sql语句有问题', status: -801, err: err.message });
            return;
        }

        if (result.length >= 1) {
            req.session['login'] = 'login';
            res.json({ msg: "登录成功", status: 1, data: result });
        } else {
            res.json({ msg: "用户名或密码错误", status: -1 });
        }

    })
})

router.post('/getData', (req, res, next) => {
    //准备sql
    var sql = '   SELECT * FROM `commod`';
    db.exec(sql, [], (err, result, fileds) => {
        if (err) {
            res.json({ msg: '查询商品失败', status: -701, err: err.message });
            return;
        }

        res.json({ msg: "查询成功", status: 3, data: result });

    })
})

router.get('/commodInfo/:id', (req, res, next) => {
    console.log(req.params.id);
    var sql = 'SELECT * FROM `commod` WHERE pid=?';
    db.exec(sql, [req.params.id], (err, result) => {
        if (err) {
            res.json({ msg: '没有该商品', status: -601, err: err.message });
            return;
        }
        res.json({ msg: "查询成功", status: 3, data: result });
    })
})


router.post('/addcart', checkLogin, (req, res, next) => {

    var params = [
        req.body.uid,
        req.body.pid,
        req.body.count
    ]


    var querySql = 'select * from cars where uid=? and pid = ?;';

    db.exec(querySql, [req.body.uid, req.body.pid], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ msg: '查询购物车失败', status: -501, err: err.message });
            return;
        }
        if (result.length >= 1) {
            var updateSql = 'update cars set count=? where uid=? and pid=?;';
            db.exec(updateSql, [req.body.count, req.body.uid, req.body.pid], (err, result) => {
                if (err) {
                    res.json({ msg: '更新购物车失败', status: -501, err: err.message });
                    return;
                }

                if (result.affectedRows >= 1) {
                    res.json({ msg: "更新购物车成功", status: 4 });
                } else {
                    res.json({ msg: "更新购物车失败", status: -4 });
                }

            })

        } else {
            var insertSql = "INSERT INTO cars (uid,pid,count)  values (?,?,?);";

            db.exec(insertSql, params, (err, result) => {
                if (err) {
                    res.json({ msg: '加入购物车失败', status: -501, err: err.message });
                    return;
                }
                if (result.affectedRows >= 1) {
                    res.json({ msg: "加入购物车成功", status: 4 });
                } else {
                    res.json({ msg: "加入购物车失败", status: -4 });
                }

            })
        }
    })
})

router.post('/delectcart', (req, res, next) => {
    var sql = ' delete from `cars` where uid = ? and  pid=?;';
    var parmas = [
        req.body.uid,
        req.body.pid
    ]
    db.exec(sql, parmas, (err, result) => {
        if (err) {
            console.log('删除失败' + err.message);
            res.json({ msg: '查询购物车失败', status: -1101 });
            return;
        }
        res.json({ msg: '删除成功', status: 1101 });
    })

});

router.post('/getcart', checkLogin, (req, res, next) => {
    var sql = "  SELECT cars.uid uid,cars.pid pid,`img`,`name`,`count`,`price`,`pur`,`oldPrice` FROM  user, cars, commod  WHERE user.uid = cars.uid AND cars.pid=commod.pid AND cars.uid=?;";



    db.exec(sql, [req.body.uid], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ msg: '查询购物车失败', status: -501, err: err.message });
            return;
        }

        res.json({ msg: '查询购物车成功', status: 10, data: result });


    })
})

router.get('/quit', (req, res, next) => {
    req.session["login"] = null;
    res.json({
        msg: '退出成功',
        status: 100
    })
})

router.get('/getuser', (req, res, next) => {
    if (!req.session['login']) {
        res.json({ msg: '获取用户名失败', status: -12 });
    } else {
        res.json({ msg: '获取用户名成功', status: 12 });
    }
})
module.exports = {
    router
}