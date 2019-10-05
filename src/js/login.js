;
(function() {
    $(function() {
        $('form').validate({
            submitHandler: function() {
                var obj = {
                    uname: $('[name="uname"]').val(),
                    upwd: $('[name="upwd"]').val(),
                }

                if (obj.uname.length < 6 || obj.uname.length > 16) {
                    layer.msg('用户名必须在6-16位');
                    return false;
                }

                if (obj.upwd.length < 6 || obj.upwd.length > 16) {
                    layer.msg('密码必须在6-16位');
                    return false;
                }
                var IsBy = $.idcode.validateCode();
                if (!IsBy) {
                    layer.msg('验证码错误！')
                    return false;
                } else {
                    var users = JSON.parse($.cookie('users') || '[]');
                    var flag = users.some((el) => el.uname == obj.uname && el.upwd == obj.upwd)
                    if (!flag) {
                        layer.msg('用户名或密码错误');
                        return false;
                    } else {
                        layer.msg('登录成功');
                        window.location = "./index.html";
                    }
                }
                return false;
            }
        })
    })
})()