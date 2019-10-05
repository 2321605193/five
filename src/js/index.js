$(function() {


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
    })
    $('.redPrice').on('mouseleave', function() {

        $(this).parent().children('.redPrice_line2').stop().animate({ left: 100 }, 1000, function() {
            $(this).parent().children('.redPrice_line2').stop().fadeOut();
            $(this).parent().children('.redPrice_line1').stop().animate({ left: 50 }, 1000, function() {
                $(this).parent().children('.redPrice_line1').stop().fadeOut();
            });
        })
    })



})