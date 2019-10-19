module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if (!req.session['login']) {
            res.json({ msg: '长时间未操作，请重新登录', status: 0 });
            return;
        }

        // req.session._garbage = Date();
        // req.session.touch();
        next();
    },
    checkNotLogin: function checkNotLogin(req, res, next) {
        next();
    }
}


function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}