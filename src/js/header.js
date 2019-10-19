$(function() {
    // var data = [{
    //     name: '南极人男士内裤纯棉平角裤', //名字
    //     price: 26.9, //价格
    //     img: './img/s1.jpg', //图片
    //     oldPrice: 219, //原价格
    //     class: 's1', //类名
    //     iconImg: './img/T.png', //原链接
    //     inventory: 94254, //库存
    //     people: 154, //购买人数
    //     integral: 4, //积分
    //     pur: 5 //限购
    // }, {
    //     name: '《中国机长》12元电影代金券', //名字
    //     price: 9.9, //价格
    //     img: './img/s2.jpg', //图片
    //     oldPrice: 30, //原价格
    //     class: 's2', //类名
    //     iconImg: './img/taobao.png', //原链接
    //     inventory: 25, //库存
    //     people: 4578, //购买人数
    //     integral: 2, //积分
    //     pur: 2 //限购
    // }, {
    //     name: '全面覆盖 满屏保护', //名字
    //     price: 1999, //价格
    //     img: './img/s3.jpg', //图片
    //     oldPrice: 2699, //原价格
    //     class: 's3', //类名
    //     iconImg: './img/T.png', //原链接
    //     inventory: 94254, //库存
    //     people: 7895, //购买人数
    //     integral: 100, //积分
    //     pur: 10 //限购
    // }, {
    //     name: '英菲格雅保温杯男大容量保温壶2L', //名字
    //     price: 19.9, //价格
    //     img: './img/s4.jpg', //图片
    //     oldPrice: 168, //原价格
    //     class: 's4', //类名
    //     iconImg: './img/T.png', //原链接
    //     inventory: 548, //库存
    //     people: 6788, //购买人数
    //     integral: 4, //积分
    //     pur: 20 //限购
    // }, {
    //     name: '变色水杯网红创意玻璃杯子', //名字
    //     price: 1.56, //价格
    //     img: './img/s5.jpg', //图片
    //     oldPrice: 219, //原价格
    //     class: 's5', //类名
    //     iconImg: './img/taobao.png', //原链接
    //     inventory: 894465, //库存
    //     people: 878, //购买人数
    //     integral: 1, //积分
    //     pur: 6 //限购
    // }, {
    //     name: '打底裤女加绒秋冬款人丝袜加厚肉色光腿神器', //名字
    //     price: 14.9, //价格
    //     img: './img/s6.jpg', //图片
    //     oldPrice: 78, //原价格
    //     class: 's6', //类名
    //     iconImg: './img/taobao.png', //原链接
    //     inventory: 1441, //库存
    //     people: 35, //购买人数
    //     integral: 3, //积分
    //     imgList: ['./img/s61.jpg', './img/s62.jpg', './img/s63.jpg'], //图片
    //     pur: 3 //限购
    // }]

    var data = [];
    $.ajax({
        url: './api/getData',
        type: 'post',
    }).done((res) => {

        data = res.data;

        data.forEach(el => {
            var arr = el.imgList.split(',');
            el.imgList = arr;
        })

        shangping($('.shouye'), createArr(data.length, data.length));
    })

    var strUserStatus = ``;
    var userName = JSON.parse($.cookie('user') || "{}");


    $.get('./api/getuser').then((res) => {
        var isLogin = res.status;

        if (isLogin == -12) {
            strUserStatus = `<a href="./login.html">马上登录 </a>`
        } else {
            strUserStatus = `  <div class="user_div ">
            <span class='spanLive'>${userName.uname} &or;</span>
            <p class='user_div_p'><button>退出登录</button></p>
        </div>`
        }
        $('.userStatus').html(strUserStatus);

        $('.user_div_p').on('click', 'button', function() {
            $.ajax({
                url: "./api/quit",
                type: 'get',
            }).then((res) => {
                console.log(res);
                if (res.status == 100) {
                    var strUserStatus = `<a href="./login.html">马上登录 </a>`;
                    $('.userStatus').html(strUserStatus);
                    $.cookie('user', '', { expires: -10 });
                }
            })
        })
        $('.user_div').on('mouseenter', function() {
            $(this).addClass('userStatus_div');
        }).on('mouseleave', function() {
            $(this).removeClass('userStatus_div');
        })
    })



    $(document).on('scroll', function() {
        if ($(document).scrollTop() >= 170) {
            $('.headBottom').css({
                position: 'fixed',
                top: 0,
                zIndex: 10,
            })
            $('.head').css('margin-bottom', $('.headBottom').height());
            $('.headBottom_navsearch').show();
        } else {
            $('.headBottom').css({
                position: 'static',
                top: 0,
                zIndex: 0,
            })
            $('.head').css('margin-bottom', 0);
            $('.headBottom_navsearch').hide();
        }
    })


    $('.headBottom_redUl li').on('click', function(evt) {
        $(this).addClass('current').siblings().removeClass('current');

        $(this).children('span').addClass('headBottom_three--current').parent().siblings().children('span').removeClass('headBottom_three--current');
        if ($(this).index() == 2) {
            var str = `   <li>全部商品</li>
            <li>家居</li>
            <li>女装</li>
            <li>男装</li>
            <li>美食</li>
            <li>母婴</li>
            <li>美妆</li>`
            $('.headBottom_whiteUl').html(str);
            shangping($('.shouye'), createArr(parseInt(data.length / 2), data.length));

        } else if ($(this).index() == 1) {
            var str = `   <li>全部商品</li>
            <li>家居</li>
            <li>女装</li>
            <li>男装</li>
            <li>美食</li>
            <li>母婴</li>
            <li>美妆</li>`
            $('.headBottom_whiteUl').html(str);
            shangping($('.shouye'), createArr(parseInt(data.length / 2), data.length));
        } else if ($(this).index() == 4) {
            var str = `   <li>全部商品</li>
            <li>家居</li>
            <li>女装</li>
           
            <li>男装</li>
            <li>美食</li>
         
            <li>母婴</li>
            <li>美妆</li>`
            $('.headBottom_whiteUl').html(str);
            shangping($('.shouye'), createArr(parseInt(data.length / 3), data.length));

        } else if ($(this).index() == 6) {
            var str = `  
            <li>家居</li>
            <li>女装</li>
            <li>母婴</li>
            <li>美妆</li>`
            $('.headBottom_whiteUl').html(str);
            shangping($('.shouye'), createArr(parseInt(data.length / 3), data.length));

        } else if ($(this).index() == 3) {
            var str = `  
            <li>全部商品</li>
            <li>家居</li>
            <li>女装</li>
     
            <li>男装</li>
            <li>美食</li>
            <li>数码</li>
            <li>母婴</li>
            <li>美妆</li>`
            $('.headBottom_whiteUl').html(str);
            $('.shouye').show().siblings().hide();
        } else {
            var str = `  
            <li>全部商品</li>
                <li>家居</li>
                <li>女装</li>
                <li>鞋包配饰</li>
                <li>男装</li>
                <li>美食</li>
                <li>数码</li>
                <li>母婴</li>
                <li>美妆</li>`
            $('.headBottom_whiteUl').html(str);
            shangping($('.shouye'), createArr(data.length, data.length));
        }

    })




    function shangping(node, arr) {
        node.html('');
        if (arr.length == 0) {
            var str = `<li class="section_box clearFixed"  style='height:300px;width:100%;text-align:center;line-height:300px;'>
                 没有符合的商品
             </li>`;
            node.append($(str)[0]);
        } else {
            arr.forEach((el) => {
                var str = `<li class="section_box clearFixed">
                <a href="./details.html?id=${data[el].pid}">
                    <img class="${data[el].class}" src="${data[el].img}" alt="">
                </a>
                <p class="section_intr clearFixed"><span><a href="./details.html">${data[el].name}</a></span> <span>${data[el].people}人买</span></p>
                <div class="section_prise clearFixed">
                    <div class="section_afterPrise">券后价<span class="section_afterPrise--three"></span></div>
                    <div class="section_bottom clearFixed">
                        <div class="redPrice fl"><span>￥</span> <span>${data[el].price}</span></div>
                
                        <div class="redPrice_line1"><span class="redPrice_three"></span>领券并用券后的价格</div>
                        <div class="redPrice_line2"><span class="redPrice_three"></span>原价，以淘宝为准</div>
                        <div class="grayPrice fl">
                            <span>包邮</span>
                            <span><s>￥${data[el].oldPrice}</s></span>
                        </div>
                        <img id="taobao" src="${data[el].iconImg}" alt="">
                    </div>
                </div>
                
                <div class="section_left">
                    <div class="section_left--red">
                        <p>领优惠券</p>
                        <p>省${parseInt(data[el].oldPrice-data[el].price)}元</p>
                    </div>
                    <div class="section_left--yellow">
                        <p>去领取 &gt;</p>
                    </div>
                </div>
                <a class="gobuy" href="./details.html">去购买</a>
                <div class="tempDiv">
                    <a class="similay">找相似</a>
                </div>
                </li>`;
                node.append($(str)[0]);


            })

            $('.redPrice').on('mouseenter', function() {
                $(this).parent().children('.redPrice_line1').stop().fadeIn().animate({ left: 100 }, 1000, function() {
                    $(this).parent().children('.redPrice_line2').stop().fadeIn().animate({ left: 150 }, 1000);
                })
            });
            $('.redPrice').on('mouseleave', function() {
                $(this).parent().children('.redPrice_line2').stop().animate({ left: 100 }, 1000, function() {
                    $(this).parent().children('.redPrice_line2').stop().fadeOut();
                    $(this).parent().children('.redPrice_line1').stop().animate({ left: 50 }, 1000, function() {
                        $(this).parent().children('.redPrice_line1').stop().fadeOut();
                    });
                })
            })
            $('.section_box').on('mouseenter', function() {
                $(this).children('.gobuy').show();
                $(this).find('.similay').show();
                $(this).addClass('li_hover').siblings().removeClass('li_hover');
            }).on('mouseleave', function() {
                $('.gobuy').hide();
                $('.similay').hide();
                $('.section_box').removeClass('li_hover');
            })

        }

    }

    function createArr(arrLength, length) {
        var set = new Set();
        if (arrLength == length) {
            data.forEach((el, index) => { set.add(index) });
        } else {
            for (let i = 0; i < arrLength; i++) {
                var num = parseInt(Math.random() * length);
                set.add(num);
            }
        }
        return [...set];
    }



    $('.headCenter_text').on('click', function() {
        var inp = $('.searchInt').val();
        var searchArr = []
        data.forEach((el, index) => {
            if (el.name.indexOf(inp) != -1) {
                searchArr.push(index);
            }
        })
        shangping($('.shouye'), searchArr);

    })


    setInterval(() => {
        $('.headBottom_afterPrise').animate({ top: -16 }, 150, () => {
            $('.headBottom_afterPrise').animate({ top: -18 }, 150)
        })
    }, 350)
})