$(function() {

    $(document).on('scroll', function() {
        if ($(document).scrollTop() >= 170) {
            $('.headBottom').css({
                position: 'fixed',
                top: 0,
            })
            $('.head').css('margin-bottom', $('.headBottom').height());
            $('.headBottom_navsearch').show();
        } else {
            $('.headBottom').css({
                position: 'static',
                top: 0,
            })
            $('.head').css('margin-bottom', 0);
            $('.headBottom_navsearch').hide();
        }
    })


    $('.headBottom_redUl li').on('click', function(evt) {
        $(this).addClass('current').siblings().removeClass('current');;
        $(this).children('span').addClass('headBottom_three--current').parent().siblings().children('span').removeClass('headBottom_three--current');
        if ($(this).index() == 2) {
            var str = `   <li>全部商品</li>
            <li>家居</li>
            <li>女装</li>
           
            <li>男装</li>
            <li>美食</li>
         
            <li>母婴</li>
            <li>美妆</li>`
            $('.headBottom_whiteUl').html(str)
        } else if ($(this).index() == 6) {
            var str = `  
            <li>家居</li>
            <li>女装</li>
            <li>母婴</li>
            <li>美妆</li>`
            $('.headBottom_whiteUl').html(str)
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
            $('.headBottom_whiteUl').html(str)
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
            $('.headBottom_whiteUl').html(str)
        }
    })
})