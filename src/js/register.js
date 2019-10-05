;
$(function() {

    $.idcode.setCode(); //加载生成验证码方法

    //定义自己的规则

    //检查用户名
    $.validator.addMethod('checkName', (value, element, param) => {
        var reg = /^\w+$/i;
        return reg.test(value);
    })

    //检查电话
    $.validator.addMethod('checkPhone', (value, element, param) => {
        var reg = /^[1][3-9]\d{9}$/i;
        return reg.test(value);
    })

    //检查邮箱
    $.validator.addMethod('checkAddress', (value, element, param) => {
        var reg = /^\w+(\.\w+)*@\w+\.\w+(\.\w+)*$/;
        return reg.test(value);
    })


    //给表单绑定事件

    $('form').validate({
        //规则
        rules: {
            uname: {
                required: true, //必填
                rangelength: [6, 16],
                checkName: true
            },
            upwd: {
                required: true,
                rangelength: [6, 16],

            },
            reupwd: {
                equalTo: '#upwd',
            },
            utel: {
                checkPhone: true
            },
            uaddress: {
                checkAddress: true
            }
        },
        //提示
        messages: {
            uname: {
                required: '用户名必填',
                rangelength: "用户名必须是{0}-{1}",
                checkName: "用户名不合法"
            },
            upwd: {
                required: '密码必填',
                rangelength: "密码必须是{0}-{1}"
            },
            reupwd: {
                equalTo: "2次密码不一致"
            },
            utel: {
                checkPhone: "手机号不合法"
            },
            uaddress: {
                checkAddress: "邮箱不合法"
            }
        },

        //提交
        submitHandler: function() {
            var IsBy = $.idcode.validateCode();
            if (!IsBy) {
                layer.msg('验证码错误！')
                return false;
            } else {
                var obj = {
                    uname: $('[name="uname"]').val(),
                    upwd: $('[name="upwd"]').val(),
                    usex: $('[name="usex"]').val(),
                    utel: $('[name="utel"]').val(),
                    uaddress: $('[name="uaddress"]').val(),
                }

                var users = JSON.parse($.cookie('users') || '[]');

                var flag = users.some((el) => el.uname == obj.uname)
                if (flag) {
                    layer.alert('用户名已注册!');
                    return false;
                }
                users.push(obj);
                $.cookie.raw = true;
                $.cookie('users', JSON.stringify(users), { expires: 10 })


                layer.confirm("注册成功,是否立即去登录?", {
                    skin: 'layui-layer-molv',
                    type: 1,
                    btn: ["yes", "noyes"]
                }, (index) => {
                    layer.close(index);
                    window.location = "./login.html"


                }, () => {})
            }


            return false;
        }


    })













})