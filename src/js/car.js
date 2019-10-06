;
(function() {
    $(function() {

        var toggle = true;
        //显示隐藏购物车列表
        $('.toggleCar').on('click', function() {
            carList();
        });

        $('.main,.header,.footer').on('click', function() {
            $('.car').stop().animate({ right: -280 });
            toggle = true;
        });



        $('.all').click(function() {
            $('.car_left--product').find('input').prop('checked', $(this).prop('checked'));



        })


        $('.all,.car_left--product input').on('click', function() {
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