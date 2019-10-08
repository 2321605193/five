;

function loadData(obj) {
    //购物车增加内容
    var str = ` <div class="car_left--product">
<input type="checkBox">
<div class="product">
  <img class="product_img" src="./img/s2.jpg" alt="">
  <p class="product_msg">${obj.name}</p>
  <span class="product_count"> ${obj.count} </span>
  <span class="product_price">￥<span class="product_priceNUm">${obj.price}</span></span>
  </div>
</div>`
    $('.car_right').append($(str)[0]);
}
(function() {
    $(function() {
        $('.countInt').val('1');
        $('.detailLeft_imgBox').mouseenter(function() {
            $('.bigImgBox').show();
            $('.smallArea').show();
            $('.detailLeft_imgBox').mousemove(function(evt) {

                var mx = evt.pageX - $('.detailLeft_imgBox').offset().left - $('.smallArea').width() / 2;
                var my = evt.pageY - $('.detailLeft_imgBox').offset().top - $('.smallArea').height() / 2;

                if (mx <= 0) {
                    mx = 0;
                }

                if (mx >= $('.detailLeft_imgBox').width() - $('.smallArea').width()) {
                    mx = $('.detailLeft_imgBox').width() - $('.smallArea').width();
                }
                if (my <= 0) {
                    my = 0;
                }
                if (my >= $('.detailLeft_imgBox').height() - $('.smallArea').height()) {
                    my = $('.detailLeft_imgBox').height() - $('.smallArea').height();
                }


                var scale = $('.bigImgBox').width() / $('.smallArea').width();

                $('.smallArea').css({
                    left: mx,
                    top: my
                });
                $('.bigImg').css({
                    width: scale * $('.smallImg').width(),
                    height: scale * $('.smallImg').height(),
                    left: -mx * scale,
                    top: -my * scale
                })

            })
        })

        $('.detailLeft_imgBox').mouseleave(function() {
            $('.bigImgBox').hide();
            $('.smallArea').hide();
        })


        $('.imgList li').on('click', function() {
            $('.smallImg').attr('src', $(this).find('img').attr('src'));
            $('.bigImg').attr('src', $(this).find('img').attr('src'));
        })

        //减数量
        $('.minus').click(function() {
            var count = Number($('.countInt').val());
            --count;
            if (count <= 1) {
                count = 1;
            }
            $('.countInt').val(count);

        })

        //加数量
        $('.add').click(function() {
            var count = Number($('.countInt').val());
            if (count >= 4) {
                count = 4;
            }
            $('.countInt').val(++count);

        })



        //加入购物车动画
        $(".addCar").click(function(event) {
            //是$(".addcar")这个元素点击促发的 开始动画的位置就是这个元素的位置为起点

            $('.car').stop().animate({
                right: -280
            }, function() {

                var img = $('.smallImg').attr('src');
                var flyer = $('<img class="u-flyer" src="' + img + '">').css({
                    width: 200,
                    height: 200,
                    borderRadius: 100
                });

                var offset = $(".toggleCar").offset(); //结束的地方的元素

                //飞
                flyer.fly({
                    //起点
                    start: {
                        left: $('.smallImg').offset().left + $('.smallImg').width() / 2 - 100,
                        top: $('.smallImg').offset().top + $('.smallImg').height() / 2 - 100
                    },
                    //终点
                    end: {
                        left: offset.left - 250,
                        top: offset.top - 52 * 2,
                        width: 0,
                        height: 0
                    },
                    //到达终点后调用的
                    onEnd: function() {

                        $("#msg").css({
                            left: offset.left - 250,
                            top: offset.top - 52 * 2,
                        })
                        $("#msg").show().animate({
                            width: '250px'
                        }, 200).fadeOut(1000);

                        //拿到商品数据
                        var obj = {
                            name: $('h3').text(),
                            price: $('.detail_price').text(),
                            count: $('.countInt').val()
                        }

                        //渲染数据
                        loadData(obj);
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
                                    $('.sumBtn').css('background', '#666')
                                } else {
                                    $('.sumBtn').css('background', '#ff0036')
                                }
                                $('.carBottom_count').text(count);
                                $('.carBottom_priceNUm').text(sum);

                            })
                            //------------------------------------------------------------------------------------------
                            //存入cookie
                        var car = JSON.parse($.cookie('cars') || '[]');
                        car.push(obj);
                        $.cookie.raw = true;
                        $.cookie('cars', JSON.stringify(car), {
                            expires: 10
                        });
                    }
                });
            });
            toggle = true;
            $('.toggleCar').removeClass('bg');
        });


        //判断是否全部选中

        setInterval(() => {
            var flagcount = 0;
            for (let i = 0; i < $('.car_left--product').find('input').length; i++) {
                if ($('.car_left--product').find('input')[i].checked) {
                    flagcount++;
                }
            }
            if ($('.car_left--product').find('input').length == flagcount) {
                $('.all').prop('checked', true);
            } else {
                $('.all').prop('checked', false);
            }
        })




        //轮播图播放
        var index = 1;


        var firstLi = $('.banner>li:eq(0)').clone(true);

        $('.banner').append(firstLi);
        var lengthLi = $('.banner>li').length;
        console.log(lengthLi);

        function autoPlay() {


            $('.banner').stop().animate({
                top: -index * $('.banner').height()
            })
            index++;

        }
        $('.prev').click(function() {
            if (index <= 2) {
                index = lengthLi + 1;
            }
            index -= 2;

            autoPlay();
        })
        $('.next').click(function() {
            if (index == lengthLi) {
                index = 1;
                $('.banner').css({
                    top: 0
                })
            }

            autoPlay();
        })




    })
})()