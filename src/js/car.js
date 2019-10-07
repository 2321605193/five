var toggle = true; //ture为展开
(function() {

    $(function() {
        var cookieData = JSON.parse($.cookie('cars') || '[]');

        cookieData.forEach(element => {

            loadData(element);
            $('.car_left--product>input').on('click', function() {
                var count = 0;
                var sum = 0;

                for (let i = 0; i < $('.car_left--product').find('input').length; i++) {
                    if ($('.car_left--product').find('input')[i].checked) {
                        console.log(1111)
                        count++;
                        var inp = $('.car_left--product').find('input')[i];
                        var num = $(inp).siblings('.product').find('.product_count')[0].innerHTML;
                        var price = $(inp).siblings('.product').find('.product_priceNUm')[0].innerHTML;
                        sum += num * price;
                    }
                }

                if (count == 0) {
                    $('.sumBtn').css('background', '#666')
                } else {
                    $('.sumBtn').css('background', '#ff0036')
                }
                $('.carBottom_count').text(count);
                $('.carBottom_priceNUm').text(sum);

            })

        });

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
                    console.log(1111)
                    count++;
                    var inp = $('.car_left--product').find('input')[i];
                    var num = $(inp).siblings('.product').find('.product_count')[0].innerHTML;
                    var price = $(inp).siblings('.product').find('.product_priceNUm')[0].innerHTML;
                    sum += num * price;
                }
            }

            if (count == 0) {
                $('.sumBtn').css('background', '#666')
            } else {
                $('.sumBtn').css('background', '#ff0036')
            }
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

    })
})()