define([
    'jquery',
    "bootstrapminify",
    "slick"
], function($) {
    var this_module = this;

    this_module.carousel = function (value) {
        var windowW = window.innerWidth || $(window).width();
        var arr = $.makeArray(arguments);

        var slidesToShowXl = (arr[1] > 0) ? arr[1] : 6; //numberXl
        var slidesToShowLg = (arr[2] > 0) ? arr[2] : 4; //numberLg
        var slidesToShowMd = (arr[3] > 0) ? arr[3] : arr[2]; //numberMd
        var slidesToShowSm = (arr[4] > 0) ? arr[4] : arr[3]; //numberSm
        var slidesToShowXs = (arr[5] > 0) ? arr[5] : 1; //numberXs

        var speed = 500;


        value.slick({
            slidesToShow: slidesToShowXl,
            slidesToScroll: 1,
            speed: speed,

            responsive: [{
                breakpoint: 1770,
                settings: {
                    slidesToShow: slidesToShowLg,
                    slidesToScroll: slidesToShowLg
                }
            }, {
                breakpoint: 1199,
                settings: {
                    slidesToShow: slidesToShowMd,
                    slidesToScroll: slidesToShowMd
                }
            }, {
                breakpoint: 798,
                settings: {
                    slidesToShow: slidesToShowSm,
                    slidesToScroll: slidesToShowSm
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: slidesToShowXs,
                    slidesToScroll: slidesToShowXs
                }
            }]

        });
    };

    this_module.slickSlider = function (value) {
        value.not('.slick-initialized').slick({
            infinite: true,
            dots: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
    }

    this_module.setSlickGallery = function (value) {
        if (value.length == 0) return false;
        var arr = $.makeArray(arguments);
        var fn = this_module[arr[arr.length - 1]];
        if (typeof fn === "function") fn(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);
    };

});