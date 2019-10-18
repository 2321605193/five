;
(function() {
    $(function() {
        var use = JSON.parse($.cookie('remeber') || '{}');
        $('.uname').val(use.uname);
        $('.upwd').val(use.upwd);


        $('.formDiv').on('click', '.saoma', function(evt) {
            $(this).addClass('current').siblings('p').removeClass('current').end().siblings('.login1').show().end().siblings('.login2').hide();

        })
        $('.formDiv').on('click', '.zhanhao', function(evt) {
            $(this).addClass('current').siblings('p').removeClass('current').end().siblings('.login2').show().end().siblings('.login1').hide();

        })


        //表单事件
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

                    $.ajax({
                        url: './api/login',
                        type: 'post',
                        data: obj,
                    }).done((res) => {

                        if (res.status == 1) {
                            layer.msg(res.msg);

                            var userCookie = {
                                uid: Math.random().toString(36).substring(2, 5) + res.data[0].uid + Math.random().toString(36).substring(2, 20),
                                keys: Math.random().toString(36).substring(2, 20),
                                uname: res.data[0].uname
                            }

                            console.log(res.data);
                            console.log(userCookie);
                            $.cookie('user', JSON.stringify(userCookie), { expires: 10 });

                            var check = $('.check').prop('checked');
                            if (check) {
                                $.cookie('remeber', JSON.stringify(obj), { expires: 10 });
                            } else {
                                use = JSON.parse($.cookie('remeber') || '{}');
                                if (use.uname == obj.uname) {
                                    $.cookie('remeber', JSON.stringify(res.data), { expires: -10 });
                                }
                            }
                            setTimeout(() => {
                                window.location = "./index.html"
                            }, 1500);
                        } else {
                            layer.msg(res.msg);
                        }
                    })


                }
                return false;
            }
        })
    })
})()