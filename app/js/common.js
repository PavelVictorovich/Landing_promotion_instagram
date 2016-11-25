$(function() {

    //SVG Fallback
    // if(!Modernizr.svg) {
    // 	$("img[src*='svg']").attr("src", function() {
    // 		return $(this).attr("src").replace(".svg", ".png");
    // 	});
    // };
});

$(document).ready(function() {    
    // скролл по ссылке с атрибутом href 
    // $(".header_nav a[href*=#]").on("click", function(e) {
    //     e.preventDefault();
    //     var anchor = $(this);
    //     $('html, body').stop().animate({
    //         scrollTop: $(anchor.attr('href')).offset().top
    //     }, 500);
    //     return false;
    // });
    // Скролл по классу .scroll_to и атрибуту data-scroll у кнопки к примеру (data-scroll="куда скроллим" в элементе куда скроллим ставим id потом впишем в куда скроллим)
    // $(".scroll_to").on("click", function(e) {
    //     e.preventDefault();
    //     var anchor = $(this);
    //     $('html, body').stop().animate({
    //         scrollTop: $("#" + anchor.data('scroll')).offset().top
    //     }, 500);
    //     return false;
    // });
    //  Активация слайдера

    // $(".owl-carousel").owlCarousel({
    //     loop: true,
    //     items: 1,
    //     dots: true
    // });

    // Select в модальном окне
    $(document).click(function() {
        $('.slct').removeClass('active');
        $('.slct').parent().find('.drop').slideUp("fast");
    }); 
    $('.slct').click(function() {
        /* Заносим выпадающий список в переменную */
        var dropBlock = $(this).parent().find('.drop');
        //  закрываем все открытые
        $('.slct').removeClass('active').parent().find('.drop').slideUp("fast");

        /* Делаем проверку: Если выпадающий блок скрыт то делаем его видимым*/
        if (dropBlock.is(':hidden')) {
            dropBlock.slideDown();

            /* Выделяем ссылку открывающую select */
            $(this).addClass('active');
            $(this).siblings(".slct_arrow").addClass('active');


            /* Работаем с событием клика по элементам выпадающего списка */
            $('.drop').find('li').click(function() {

                /* Заносим в переменную HTML код элемента 
                списка по которому кликнули */
                var selectResult = $(this).html();

                /* Находим наш скрытый инпут и передаем в него 
                значение из переменной selectResult */
                $(this).parent().parent().find('input').val(selectResult);

                /* Передаем значение переменной selectResult в ссылку которая 
                открывает наш выпадающий список и удаляем активность */
                $(this).parent().parent().find(".slct").removeClass('active').html(selectResult);
                $(".slct_arrow").removeClass('active');

                /* Скрываем выпадающий блок */
                dropBlock.slideUp();
            });

            /* Продолжаем проверку: Если выпадающий блок не скрыт то скрываем его */
        } else {
            $(this).removeClass('active');
            $(".slct_arrow").removeClass('active');
            dropBlock.slideUp();
        }

        /* Предотвращаем обычное поведение ссылки при клике */
        return false;
    });
    // Открываем модальное окно  
    $(".modal").click(function() {
        $(".popup").toggleClass("active").find("form").css('display', 'block');
        $("body").css({ "overflow": "hidden", "padding-right": "17px" });

    });
    $(".overlay").click(function() {
        $(this).parent().toggleClass("active");        
        $("body").css({ "overflow": "inherit", "padding-right": "0" });
    });
    // закрываем модальное окно
    $("#win .close").click(function(e) {
        e.preventDefault();
        $(".popup").removeClass("active");
        $("body").css({ "overflow": "inherit", "padding-right": "0" });
    });
    //  Отправка форм
    $("form").submit(function() { // перехватываем все при событии отправки
        var form = $(this); // запишем форму, чтобы потом не было проблем с this
        var error = [];
        form.find('.modal_form_input').each(function() { // пробежим по каждому полю в форме

            if ($(this).val() == '') { // если находим пустое
                $(this).siblings().addClass('form_error');
                error.push(true); // ошибка
            } else if ($(this).val() !== '') { // если находим не пустое
                $(this).siblings().removeClass('form_error');
                error.push(false); // нет ошибки
            }
            $(this).focus(function() {
                $(this).siblings().removeClass('form_error');
             });

        });
         form.find('.modal_form_phone').each(function() { // пробежим по каждому полю в форме
             var pattern = /^\d[\d\(\)\-]{4,14}\d$/;
             if ($(this).val() == '') { // если пустое
               $(this).siblings().addClass('form_error');
                error.push(true); // ошибка 
                if ($(this).siblings().hasClass('input_error_phone')) {
                    $(this).siblings().removeClass('input_error_phone').text("").prepend("Заполните поле<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");              
                    }        
            } else if ($(this).val() !== '') {
                if ($(this).val().match(pattern)) {
                    $(this).siblings().removeClass('form_error');
                    error.push(false); // нет ошибок
                } else {
                    $(this).siblings().addClass('input_error_phone form_error').text("").prepend("Введите правильный телефон<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                    error.push(true); // ошибка  
                }
            }
            $(this).focus(function() {
                $(this).siblings().removeClass('form_error');
             });

         });
        form.find('.modal_form_email').each(function() { // пробежим по каждому полю в форме
            var pattern = /^(([a-zA-Z0-9]|[!#$%\*\/\?\|^\{\}`~&'\+=-_])+\.)*([a-zA-Z0-9]|[!#$%\*\/\?\|^\{\}`~&'\+=-_])+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+$/;
            if ($(this).val() == '') { // если пустое
                $(this).siblings().addClass('form_error');
                   error.push(true);// ошибка
                if ($(this).siblings().hasClass('input_error_email')) {
                    $(this).siblings().removeClass('input_error_email').text("").prepend("Заполните поле<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                }            

            } else if ($(this).val() !== '') {
                if ($(this).val().match(pattern)) {
                    $(this).siblings().removeClass('form_error input_error_email');
                    error.push(false); // нет ошибок
                } else {
                    $(this).siblings().addClass('input_error_email form_error').text("").prepend("Введите правильный Email<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                    error.push(true); // ошибка  
                }
            }
            $(this).focus(function() {
                $(this).siblings().removeClass('form_error');
             });

        });
        var erorr_finish = 0;
        for(var i=0; i<error.length; i++) {
            if( error[i] == false ) {
                erorr_finish = erorr_finish + 1;
            };
            console.log( error[i]);
        }
        console.log(erorr_finish);
        var size = error.length -1;
        if (erorr_finish > size ) { // в зависимости от полей которые проверяются (в нашем случае 3 поля)
            var data = form.serialize(); // подготавливаем данные
            $.ajax({ // инициализируем ajax запрос
                type: 'POST', // отправляем в POST формате, можно GET
                url: 'mail.php', // путь до обработчика, у нас он лежит в той же папке
                dataType: 'json', // ответ ждем в json формате
                data: data, // данные для отправки
                beforeSend: function(data) { // событие до отправки
                    form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
                },
                success: function(data) { // событие после удачного обращения к серверу и получения ответа
                    if (data['error']) { // если обработчик вернул ошибку
                        alert(data['error']); // покажем её текст
                    } else { // если все прошло ок
                        $('.dm-modal form').hide(); // пишем что все ок                
                        $('.dm-modal .sucess_mail').addClass('active');

                        $('.popup').delay(2000).fadeOut(
                            function() {
                                $('.popup').removeClass('active');
                                form.trigger('reset');
                                $('.dm-modal .sucess_mail').removeClass('active');
                                $("#win .close").trigger('click');
                            }
                        );
                        if (data['form'] == "form_2") {
                            $('.dm-modal .sucess_mail').addClass('active');
                            $('.popup2').show().delay(2000).fadeOut(
                                function() {
                                    $('.popup2').removeClass('active');
                                    form.trigger('reset');
                                    $('.dm-modal .sucess_mail').addClass('active');
                                    $("#win2 .close").trigger('click');                                }
                            );
                        }
                        if (data['form'] == "form_3") {
                            $('.dm-modal form').hide(); // пишем что все ок                
                            $('.dm-modal .sucess_mail').addClass('active');
                            $('.popup3').delay(2000).fadeOut(
                                function() {
                                    $('.popup3').removeClass('active');
                                    form.trigger('reset');
                                    $('.dm-modal .sucess_mail').removeClass('active');
                                    $("#win3 .close").trigger('click');                                }
                            );
                        }
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
                    alert(xhr.status); // покажем ответ сервера
                    alert(thrownError); // и текст ошибки
                },
                complete: function(data) { // событие после любого исхода
                    form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
                }

            });
        }
        return false; // вырубаем стандартную отправку формы
    });

});

$(".loader_inner").fadeOut();
$(".loader").delay(400).fadeOut("slow");
