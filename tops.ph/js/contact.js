$(document).ready(function () {
    $('form').submit(function () {
        var form_data = $(this).serialize(),
            form_method = $(this).attr('method'),
            form_url = $(this).attr('action');

        $.ajax({
            url: form_url,
            method: form_method,
            data: form_data,
            beforeSend: function () {
                alert('Sending your message..');
            },
            success: function () {
                alert('Sent');
            }
        })

        return false;
    })

    //navbar magic
    $(window).scroll(function () {
        var scrollPos = $(window).scrollTop();

        if (scrollPos >= 56) {
            $('nav#transnav').removeClass('transparent z-depth-0 mt-3').addClass('white fixed-nav z-depth-1');
            $('.nav-item').addClass('grey-text text-darken-3');
        } else {
            $('nav#transnav').removeClass('white fixed-nav').addClass('transparent z-depth-0 mt-3');
            $('.nav-item').removeClass('grey-text text-darken-3');
        }
    });
});