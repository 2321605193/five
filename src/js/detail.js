;

function loadData(obj) {
    //购物车增加内容
    var str = ` <div class="car_left--product">
<input type="checkBox">
<div class="product">
  <img class="product_img" src="${obj.img}" alt="">
  <p class="product_msg">${obj.name}</p>
  <span class="product_count"> ${obj.count} </span>
  <span class="product_price">￥<span class="product_priceNUm">${obj.price}</span></span>
  </div>
</div>`
    $('.car_List').append($(str)[0]);
}
(function() {
    $(function() {

        var commod = JSON.parse($.cookie('commod'));
        $('title').text(commod.name);
        //-----------------------
        $('.imgList li img').attr('src', commod.img);
        $('.smallImg').attr('src', $('.imgList li img').attr('src'));
        $('.bigImg').attr('src', $('.smallImg').attr('src'));
        $('.detailLeft_right').html('');
        var strRight = ` <div>
        <h3>${commod.name}</h3>
       <p>
           <span class="detail_declare">价格</span>
           <span class="detail_spec">￥<span class="detail_price">${commod.price}</span></span>
       </p>
       <p>
           <span class="detail_declare">运费</span>
           <span>浙江杭州 至  <span>中国&or;</span></span>
       </p>
       <p>
           <span class="detail_declare">面值</span>
           <span>${commod.oldPrice}元</span>
       </p>
       <ul>
           <li>
               <span class="">月销量</span>
               <span class="detail_redTxt">6.5万+</span>
           </li>
           <li>
               <span class="">累计评价</span>
               <span class="detail_redTxt">1150</span>
           </li>
           <li>
               <span class="">送天猫积分</span>
               <span class="detail_greenTxt">${commod.integral}</span>
           </li>
       </ul>`
        if (commod.name == '《中国机长》12元电影代金券') {
            strRight += `
           <p class="top">
               <span class="detail_declare">适用电影类型</span>
               <span class="detail_redBox">2D/3D通兑</span>
           </p>
           <p class="top">
               <span class="detail_declare">适用观影时间</span>
               <span class="detail_redBox">平日（含周末）</span>
           </p>
           <p class="top">
               <span class="detail_declare">提货方式</span>
               <span class="detail_redBox">电子兑换券</span>
           </p>
           <p>
               <span class="detail_declare">有效期</span>
               <span class="detail_spe">购买成功7天内有效</span>
           </p>`
        } else {
            strRight += `
            <p class="top">
                <span class="detail_declare">颜色分类</span>
                <span class="detail_redBox">灰色</span>
            </p>
            <p class="top">
                <span class="detail_declare">套餐类型</span>
                <span class="detail_redBox">官方标配</span>
            </p>
            <p class="top">
                <span class="detail_declare">提货方式</span>
                <span class="detail_redBox">自提</span>
            </p>
            <p>
                <span class="detail_declare">有效期</span>
                <span class="detail_spe">购买成功7天内有效</span>
            </p>`
        }


        strRight += `<div class="countBox">
           <span class="detail_declare fl">数量</span>
           <input type="text" class="countInt fl">
           <div class="count ">
               <button class="add">&and;</button>
               <button class="minus">&or;</button>
           </div>
           <span class="detail_spe">件</span>
           <span class="detail_spe">库存${commod.inventory}件（每人限购${commod.pur}件）</span>
       </div>
       <p class="last">
           <span class="detail_declare"></span>
           <button>立即购买</button>
           <button class="addCar">加入购物车</button>
       </p> </div>`



        $('.detailLeft_right').append($(strRight)[0])
        $('.countInt').val('1');
        commod.imgList.forEach((el) => {
            $('.imgList').append($(`  <li><img src="${el}" alt=""></li>"`))
        })
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
            if (!isNaN(count)) {
                if (count >= commod.pur - 1) {
                    count = commod.pur - 1;
                }
                $('.countInt').val(++count);
            } else {
                $('.countInt').val(1);
            }


        })

        $('.countInt').on('input', function() {
            if (isNaN($(this).val())) {
                $('.countInt').val(1);
            }
            if ($(this).val() > commod.pur) {
                $('.countInt').val(commod.pur);
            }
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
                $(window).resize(function() {
                    offset = $(".toggleCar").offset();

                })


                //飞
                flyer.fly({
                    //起点
                    start: {
                        left: $('.smallImg').offset().left + $('.smallImg').width() / 2 - 100,
                        top: $('.smallImg').offset().top + $('.smallImg').height() / 2 - 100
                    },
                    //终点
                    end: {
                        left: offset.left,
                        top: offset.top - $(document).scrollTop(),
                        width: 0,
                        height: 0
                    },
                    //到达终点后调用的
                    onEnd: function() {

                        $("#msg").css({
                            left: offset.left - 250,
                            top: offset.top - $(document).scrollTop(),
                        })
                        $("#msg").show().animate({
                            width: '250px'
                        }, 200).fadeOut(1000);

                        //拿到商品数据
                        //---------------------------------------------------

                        var obj = JSON.parse($.cookie('commod'));

                        obj.count = $('.countInt').val()


                        //------------------------------------------------------------------------------------------
                        //存入cookie
                        var car = JSON.parse($.cookie('cars') || '[]');

                        car.forEach((el, index, car) => {
                            if (el.name == obj.name) {
                                car.splice(index, 1);
                            }
                        })

                        car.unshift(obj);

                        $('.car_List').html('');
                        car.forEach((el) => {
                            loadData(el);
                        })

                        //渲染数据


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
                            $('.carBottom_count').text(count);
                            $('.carBottom_priceNUm').text(sum);

                        })
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