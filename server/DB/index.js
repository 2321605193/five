import mysql from 'mysql';
import { config } from '../Config';
const connt = mysql.createConnection(config);
connt.connect(function(err) {
    if (err) {
        console.log("数据库链接失败" + err.message);
    }
});

function exec(sql, parmas, callback) {

    connt.query(sql, parmas, (err, result, fileds) => {
        callback(err, result, fileds);
    });
}

function execAsync(sql, parmas) {
    return new Promise((resolve, reject) => {
        connt.connect(function(err) {
            if (err) {
                console.log("数据库链接失败" + err.message);
                return;
            }
        });

        connt.query(sql, parmas, (err, result, fileds) => {
            if (err) {
                reject(err, result, fileds);
                return;
            }
            resolve(err, result, fileds);
        });
    });
}

module.exports = {
    exec,
    execAsync
}