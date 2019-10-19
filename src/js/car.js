var toggle = true; //ture为展开
(function() {

    $(function() {




        $('.car_ul').on('mouseenter', 'li', function() {
            var cartop = $(this).height() + 20 - $(this).find('.car_position').height();

            $(this).find('.car_position').css({ top: cartop / 2 });
            $(this).find('.car_position').stop().fadeIn(100).animate({ right: 35 }, 500);
        })
        $('.car_ul').on('mouseleave', 'li', function() {
            $(this).find('.car_position').stop().animate({ right: 60 }, 500).fadeOut(100);
        })

        var userCookie = JSON.parse($.cookie('user') || '{}');
        if (!$.isEmptyObject(userCookie)) {
            var id = {
                uid: parseInt(userCookie.uid)
            }
            $.ajax({
                url: './api/getcart',
                type: 'post',
                data: id
            }).then((res) => {
                //渲染数据
                $('.car_List').html('');
                if (res.status > 0) {
                    res.data.forEach((el) => {
                        loadData(el);
                        $('.car_left--product>input').on('click', function() {
                            var count = 0;
                            var sum = 0;

                            for (let i = 0; i < $('.car_left--product').find('input').length; i++) {
                                if ($('.car_left--product').find('input')[i].checked) {
                                    count++;
                                    var inp = $('.car_left--product').find('input')[i];
                                    var num = $(inp).siblings('.product').find('.product_count')[0].innerHTML;
                                    var price = $(inp).siblings('.product').find('.product_priceNUm')[0].innerHTML;
                                    sum += num * price;
                                }
                            }

                            if (count == 0) {
                                $('.sumBtn').css('background', '#666').prop({
                                    'disabled': true
                                })
                            } else {
                                $('.sumBtn').css('background', '#ff0036').prop({
                                    'disabled': false
                                });
                            }

                            sum = sum.toFixed(2);

                            $('.carBottom_count').text(count);
                            $('.carBottom_priceNUm').text(sum);

                        })
                    })
                }
            })
        }

        // var cookieData = JSON.parse($.cookie('cars') || '[]');
        // $('.car_List').html('');
        // cookieData.forEach(element => {

        //     loadData(element);


        // });

        //显示隐藏购物车列表
        $('.toggleCar').on('click', function() {
            carList();
            if (toggle == false) {
                $(this).addClass('bg');
            } else {
                $(this).removeClass('bg');
            }
        });

        $('.header,.footer').on('click', function() {
            $('.car').stop().animate({ right: -280 });
            toggle = true;
            $('.toggleCar').removeClass('bg');
        });
        $('.all').click(function() {
            $('.car_left--product').find('input').prop('checked', $(this).prop('checked'));
            var count = 0;
            var sum = 0;
            for (let i = 0; i < $('.car_left--product').find('input').length; i++) {
                if ($('.car_left--product').find('input')[i].checked) {
                    count++;
                    var inp = $('.car_left--product').find('input')[i];
                    var num = $(inp).siblings('.product').find('.product_count')[0].innerHTML;
                    var price = $(inp).siblings('.product').find('.product_priceNUm')[0].innerHTML;
                    sum += num * price;
                }
            }
            if (count == 0) {
                $('.sumBtn').css('background', '#666').prop({
                    'disabled': true
                })
            } else {
                $('.sumBtn').css('background', '#ff0036').prop({
                    'disabled': false
                });
            }
            sum = sum.toFixed(2);
            $('.carBottom_count').text(count);
            $('.carBottom_priceNUm').text(sum);
        })

        function carList() {
            if (toggle) {
                $('.car').stop().animate({ right: 0 });
                toggle = false;
                return;
            }
            if (!toggle) {
                $('.car').stop().animate({ right: -280 });
                toggle = true;
                return;
            }
        }



        $('.sumBtn').on('click', function() {
            location.assign('./carList.html');
        })

    })
})()