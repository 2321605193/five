module.exports = {
    checkLogin: function checkLogin(req, res, next) {

        if (!req.session["login"]) {
            res.json({ msg: '未登录', status: 0 });
            return;
        }
        req.session.maxAge = 100 * 60 * 1;
        next();

    },
    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登录');
            return res.redirect('back') // 返回之前的页面
        }
        next()
    }
}