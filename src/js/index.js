$(function() {

    var data = [{
        name: '南极人男士内裤纯棉平角裤', //名字
        price: 26.9, //价格
        img: './img/s1.jpg', //图片
        oldPrice: 219, //原价格
        class: 's1', //类名
        iconImg: './img/T.png', //原链接
        inventory: 94254, //库存
        people: 154, //购买人数
        integral: 4, //积分
        pur: 5 //限购
    }, {
        name: '《中国机长》12元电影代金券', //名字
        price: 9.9, //价格
        img: './img/s2.jpg', //图片
        oldPrice: 30, //原价格
        class: 's2', //类名
        iconImg: './img/taobao.png', //原链接
        inventory: 25, //库存
        people: 4578, //购买人数
        integral: 2, //积分
        pur: 2 //限购
    }, {
        name: '全面覆盖 满屏保护', //名字
        price: 1999, //价格
        img: './img/s3.jpg', //图片
        oldPrice: 2699, //原价格
        class: 's3', //类名
        iconImg: './img/T.png', //原链接
        inventory: 94254, //库存
        people: 7895, //购买人数
        integral: 100, //积分
        pur: 10 //限购
    }, {
        name: '英菲格雅保温杯男大容量保温壶2L', //名字
        price: 19.9, //价格
        img: './img/s4.jpg', //图片
        oldPrice: 168, //原价格
        class: 's4', //类名
        iconImg: './img/T.png', //原链接
        inventory: 548, //库存
        people: 6788, //购买人数
        integral: 4, //积分
        pur: 20 //限购
    }, {
        name: '变色水杯网红创意玻璃杯子', //名字
        price: 1.56, //价格
        img: './img/s5.jpg', //图片
        oldPrice: 219, //原价格
        class: 's5', //类名
        iconImg: './img/taobao.png', //原链接
        inventory: 894465, //库存
        people: 878, //购买人数
        integral: 1, //积分
        pur: 6 //限购
    }, {
        name: '打底裤女加绒秋冬款丝袜加厚肉色光腿神器', //名字
        price: 14.9, //价格
        img: './img/s6.jpg', //图片
        oldPrice: 78, //原价格
        class: 's6', //类名
        iconImg: './img/taobao.png', //原链接
        inventory: 1441, //库存
        people: 35, //购买人数
        integral: 3, //积分
        pur: 3 //限购
    }]



    function shangping(node, arr) {
        node.html('');
        arr.forEach((el) => {
            var str = `<li class="section_box clearFixed">
            <a href="./details.html">
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
                    <p>省3元</p>
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

    shangping($('.shouye'), createArr(data.length, data.length));
    shangping($('.baoyou'), createArr(parseInt(data.length / 2), data.length));
    shangping($('.fengqiang'), createArr(parseInt(data.length / 3), data.length));
    shangping($('.fengding'), createArr(parseInt(data.length / 2), data.length));
    shangping($('.zhuangchuang'), createArr(parseInt(data.length / 3), data.length));

    $('.section_box').on('mouseenter', function() {
        $(this).children('.gobuy').show();
        $(this).find('.similay').show();
        $(this).addClass('li_hover').siblings().removeClass('li_hover');
    }).on('mouseleave', function() {
        $('.gobuy').hide();
        $('.similay').hide();
        $('.section_box').removeClass('li_hover');
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


    $(".section_box").on('click', 'a', function() {
        var self = this;

        var commodityObj = {}
        data.forEach((el) => {
            if (el.name == $(self).parents('.section_box').find('.section_intr a').text()) {
                commodityObj = el;
            }
        })
        console.log(commodityObj);

        ///--------------------------------------------
        $.cookie.raw = true;
        $.cookie('commod', JSON.stringify(commodityObj), { expires: 10 });
    })





    $(".s1").lazyload({
        placeholder: "../img/loadiing.gif", //用图片提前占位
        // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
        effect: "fadeIn", // 载入使用何种效果
        // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
        threshold: 00, // 提前开始加载
        // threshold,值为数字,代表页面高度.如设置为200,表示滚动条在离目标位置还有200的高度时就开始加载图片,可以做到不让用户察觉
        //event: 'click',  // 事件触发时才加载
        // event,值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标莫过或点击图片才开始加载,后两个值未测试…
        //container: $("#container"), // 对某容器中的图片实现效果
        // container,值为某容器.lazyload默认在拉动浏览器滚动条时生效,这个参数可以让你在拉动某DIV的滚动条时依次加载其中的图片
        //  failurelimit: 10 // 图片排序混乱时
        // failurelimit,值为数字.lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况,failurelimit意在加载N张可见区域外的图片,以避免出现这个问题.
    });

})