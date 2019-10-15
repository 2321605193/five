$(function() {

    function loadData(node, arr) {
        $('.commondityList').html('');
        var str = ``;
        if (carList.length > 0) {
            arr.forEach(el => {
                str += ` <div class="commondity clearFixed">
                <div class="check">
                    <input type="checkbox">
                    <img src="${el.img}" alt="">
                </div>
                <div class="merchandise clearFixed">
                    <div class="merchandise_left">
                        <p class="uname">${el.name}</p>
                        <p>
                            <img src="./img/images/aCarlist_03.jpg" alt="">
                            <img src="./img/images/aCarlist_05.jpg" alt="">
                        </p>
                    </div>
                    <div class="merchandise_right">
                        <p><span>提货方式：</span><span>电子兑换券</span></p>
                        <p><span>适用电影类型</span><span>2/3D通兑</span></p>
                        <p><span>适用观影时间</span><span>平日（含周末）</span></p>
                    </div>
                </div>
                <div class="unitPrice">
                    <p><s>￥${el.oldPrice}</s></p>
                    <p>
                        <span class="unitPrice_spec">￥<span class="unitPrice_price">${el.price}</span></span>
                    </p>
                </div>
                <div class="count">
            
                    <p class="clearFixed">
                        <button class="minu">-</button>
                        <input class="countInt" type="text" value="${el.count}">
                        <button class='add'>+</button>
                    </p>
                    <p>限购<span class="pur"> ${el.pur}</span>件</p>
                </div>
                <div class="figure">
                    ${(el.price*el.count).toFixed(2)}
                </div>
                <div class="operation">
            
                    <p class="delet">删除</p>
                </div>
            </div>`

            });
        } else {
            str = ` <div class="commondity clearFixed">
            <div id='empty'>
                <p>购物车空空如也~</p>
                <p>快去选购吧~</p>
            </div>
        </div>`
        }
        node.append(str);
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
    var carList = JSON.parse($.cookie('cars') || '[]');

    loadData($('.commondityList'), carList);

    //-----------------------------------------------------------
    $('.minu').on('click', function() {
        var uname = $(this).parents('.commondity').find('.uname').text()
        var count = $(this).siblings('.countInt').val();
        if (count <= 2) {
            count = 2;
        }
        $(this).siblings('.countInt').val(--count);
        $(this).parents('.commondity').find('.figure').text((count * $(this).parents('.commondity').find('.unitPrice_price').text()).toFixed(2));
        carList.forEach((el) => {
            if (el.name == uname) {
                el.count = count;
            }
        })

        $.cookie('cars', JSON.stringify(carList), { expires: 10 })

    })
    $('.add').on('click', function() {
        var uname = $(this).parents('.commondity').find('.uname').text()
        var count = $(this).siblings('.countInt').val();
        var pur = $(this).parent().siblings().find('.pur').text();
        if (count >= pur - 1) {
            count = pur - 1;
        }
        $(this).siblings('.countInt').val(++count);
        $(this).parents('.commondity').find('.figure').text((count * $(this).parents('.commondity').find('.unitPrice_price').text()).toFixed(2));
        carList.forEach((el) => {
            if (el.name == uname) {
                el.count = count;
            }
        })
        $.cookie('cars', JSON.stringify(carList), { expires: 10 })
    })

    $('.delet').on('click', function() {
        var uname = $(this).parents('.commondity').find('.uname').text();
        carList.forEach((el, index, arr) => {
            if (el.name == uname) {
                arr.splice(index, 1);
            }
        })
        $.cookie('cars', JSON.stringify(carList), { expires: 10 });
        $(this).parents('.commondity').remove();
        if (carList.length == 0) {
            loadData($('.commondityList'), carList);
        }

        var sum = 0;
        var count = 0;
        for (let i = 0; i < $('.commondityList').find('input[type="checkbox"]').length; i++) {
            if ($('.commondityList').find('input[type="checkbox"]')[i].checked) {
                var inp = $('.commondityList').find('input[type="checkbox"]')[i]
                count++;
                sum += Number($(inp).parents('.commondity').find('.figure').text().trim())
            }
        }
        if (count >= 1) {
            $('.carList_total').addClass('bg');
        } else {
            $('.carList_total').removeClass('bg');
        }
        $('.all').find('input').prop('checked', count == $('.commondityList').find('input[type="checkbox"]').length);
        $('.carList_totalPrice').text(sum.toFixed(2));
    })

    $('.all').children('input').on('click', function() {
        $('.commondity').find('input[type="checkbox"]').prop('checked', $(this).prop('checked'));
        var sum = 0;
        var count = 0;
        for (let i = 0; i < $('.commondityList').find('input[type="checkbox"]').length; i++) {
            if ($('.commondityList').find('input[type="checkbox"]')[i].checked) {
                var inp = $('.commondityList').find('input[type="checkbox"]')[i]
                count++;
                sum += Number($(inp).parents('.commondity').find('.figure').text().trim())
            }
        }
        if (count >= 1) {
            $('.carList_total').addClass('bg');
        } else {
            $('.carList_total').removeClass('bg');
        }
        $('.all').find('input').prop('checked', count == $('.commondityList').find('input[type="checkbox"]').length);
        $('.carList_totalPrice').text(sum.toFixed(2));
    })
    $('.commondity').on('click', function() {
        var sum = 0;
        var count = 0;
        for (let i = 0; i < $('.commondityList').find('input[type="checkbox"]').length; i++) {
            if ($('.commondityList').find('input[type="checkbox"]')[i].checked) {
                var inp = $('.commondityList').find('input[type="checkbox"]')[i]
                count++;
                sum += Number($(inp).parents('.commondity').find('.figure').text().trim())
            }
        }
        if (count >= 1) {
            $('.carList_total').addClass('bg');
        } else {
            $('.carList_total').removeClass('bg');
        }

        $('.all').find('input').prop('checked', count == $('.commondityList').find('input[type="checkbox"]').length);

        $('.carList_totalPrice').text(sum.toFixed(2));
    })
})