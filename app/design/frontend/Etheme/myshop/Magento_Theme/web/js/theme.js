require([
        "jquery",
        "bootstrapminify",
        "slick",
        "sliders"
    ],
    function($) {

        var windowW = window.innerWidth || $(window).width(),
            $menu = $('.header-menu'), //menu
            $cart = $('header .cart');

        function debouncer(func, timeout) {
            var timeoutID, timeout = timeout || 500;
            return function() {
                var scope = this,
                    args = arguments;
                clearTimeout(timeoutID);
                timeoutID = setTimeout(function() {
                    func.apply(scope, Array.prototype.slice.call(args));
                }, timeout);
            }
        };

        var newSelection = "";
        $(".filter-nav div").click(function(){
            $("#all-filter-content").hide(0);
            $("#all-filter-content").fadeIn(500);

            $(".filter-nav div").removeClass("current");
            $(this).addClass("current");

            newSelection = $(this).attr("rel");

            $(".item").not("."+newSelection).fadeOut();
            $("."+newSelection).fadeIn();

            $("#all-filter-content").fadeIn(0);
        });

        // Amount replace
        var amount = jQuery('.toolbar-top .toolbar-amount').detach();
        jQuery('.page-title-wrapper').prepend(amount);

        //Search DropDown
        $('.search-open').on('click', function(e) {
            e.preventDefault();
            $(this).parent('.search').addClass('open');
            $(this).next('#search-dropdown, .search-dropdown').addClass('open');
            $('header .badge').addClass('badge--hidden');
            setTimeout(function() {
                $(".desktop-header .search-dropdown input").focus();
                $(".mobile-header .search-dropdown input").focus();
            }, 100);
        });
        $('.search-close').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.search').removeClass('open');
            $(this).closest('#search-dropdown, .search-dropdown').removeClass('open');
            $('header .badge').removeClass('badge--hidden');
        });

        //Cart
        if ($("header .cart").length > 0) {

            $('header .cart .dropdown-toggle').on('click', function(e){
                setTimeout(function () {
                    headerCartSize();
                }, 600);
                e.preventDefault();
            });
            $(document).on('click', 'header .cart .cart-close span', function(e){
                $('body').removeClass('cart-open');
                    e.preventDefault();
            });

        }

        function headerCartSize() {

            if ($cart.length) {
                $cart.find(".dropdown-menu").scrollTop(0);
                cartHeight();
            }
        };

        function cartHeight() {
            var $obj = $cart.find(".dropdown-menu");

            $obj.removeAttr('style');

            var w_height = window.innerHeight;
            var o_height = $obj.outerHeight();
            var delta = parseInt(w_height - o_height);

            if (delta < 0) {
                $obj.css({
                    "max-height": o_height + delta,
                    "overflow": "auto",
                    "overflow-x": "hidden"
                });
                $('body').addClass('cart-open');
            }
        }

        // input-counter
        $(document).on('click', '.minus-btn', function () {
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) - 1;
            count = count < 1 ? 1 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        $(document).on('click', '.plus-btn', function () {
            var $input = $(this).parent().find('input');
            $input.val(parseInt($input.val()) + 1);
            $input.change();
            return false;
        });


        // Mobile footer collapse
        $(window).on('load', function() {
            $('.mobile-collapse').on('click', '.mobile-collapse_title', function(e) {
                var $parent = $(this).parent('.mobile-collapse'),
                    $content = $parent.find('.mobile-collapse_content');

                $parent.toggleClass('open');
                if($parent.hasClass('open')) {
                    $content.hide().stop().slideDown();
                } else {
                    $content.stop().slideUp();
                }
                e.preventDefault;
            });
        });

        //backToTop
        if ($(".back-to-top").length > 0) {
            $('.back-to-top').click(function() {
                $('html, body').animate({scrollTop: 0},500);
                return false;
            });
        }
        $(window).on('scroll', function () {
            if ( $(window).scrollTop() > 500) {
                $(".back-to-top").stop(true.false).fadeIn(110);
            } else {
                $(".back-to-top").stop(true.false).fadeOut(110);
            }
        });

        // header view search
        var search_open = $('.desktop-header .search a.search-open');
        var search_close = $('.desktop-header .search a.search-close');
        if ($('.header-04').length > 0) {
            search_open.on('click', function(){
                $('.logo, .toggle-menu, .language, .currency, .account, .cart').addClass('opacity');
            });
            search_close.on('click', function(){
                $('.logo, .toggle-menu, .language, .currency, .account, .cart').toggleClass('opacity');
            });
        }
        if ($('.header-05').length > 0) {
            search_open.on('click', function(){
                $('.logo, .account, .cart, .desktop-header .tonyMenu').addClass('opacity');
            });
            search_close.on('click', function(){
                $('.logo, .account, .cart, .desktop-header .tonyMenu').toggleClass('opacity');
            });
        }
        if ($('.header-08').length > 0) {
            search_open.on('click', function(){
                $('.logo, .toggle-menu, .language, .currency, .account, .cart').addClass('opacity');
            });
            search_close.on('click', function(){
                $('.logo, .toggle-menu, .language, .currency, .account, .cart').toggleClass('opacity');
            });
        }
        if ($('.header-03, .header-01, .header-02').length > 0) {
            search_open.on('click', function(){
                $('.desktop-header .tonyMenu').addClass('opacity');
            });
            search_close.on('click', function(){
                $('.desktop-header .tonyMenu').toggleClass('opacity');
            });
        }

        if($('.product_holder').length) {

            $(document).on('mouseenter mouseleave', '.product_holder:not(.no-hover)', function(e) {
                var $this = $(this),
                    windW = window.innerWidth;

                if($this.parents('.product-listing').hasClass('row-view')) return;
                else if($this.parents().hasClass('modal-quick-view')) return;

                if(e.type === 'mouseenter' && windW >= 1300){
                    $this.css({height: $this.innerHeight()}).addClass('hovered');
                    $('body').addClass('hover-product');
                }
                else if(e.type === 'mouseleave'){
                    $this.removeClass('hovered').removeAttr('style');
                    $('body').removeClass('hover-product');
                }
            });
        }

        //product Small
        function productSmall(){
            if ($("#maincontent .product_holder").length > 0) {
                var currentItem = $("#maincontent .product_holder"),
                    currentW = parseInt(currentItem.width());
                if (currentW <= 209) {
                    currentItem.addClass("small");
                } else{
                    currentItem.removeClass("small");
                }
                if (currentW <= 140) {
                    currentItem.addClass("small-xs");
                } else {
                    currentItem.removeClass("small-xs");
                }
            }
        }
        $(window).on('load resize',productSmall);

        function collapseBlock() {
            var $collapse_bl = $('#maincontent .collapse-block');

            if($collapse_bl.length) {
                $(document).on('click', '.collapse-block_title', function(){

                    var $this = $(this),
                        $this_clps_bl = $this.parents('.collapse-block'),
                        $this_content = $this_clps_bl.find('.collapse-block_content');

                    $this_clps_bl.toggleClass('open');

                    if($this_clps_bl.hasClass('open')) {
                        $this_content.stop().slideDown();
                    } else {
                        $this_content.stop().slideUp();
                    }
                });

                $collapse_bl.filter('.open').find('.collapse-block_content').show();
            }
        };

        $(window).bind('load', function () {
            collapseBlock();
        });

        // Slide Column
        if ($('.catalog-category-view .two-cols-identify').length > 0) {
            $('.slide-column-close').addClass('position-fix');
            $(document).on('click', '.slide-column-open', function(e){
            //$('.slide-column-open').on('click', function(e){
                e.preventDefault();
                $('.leftColumn, .slide-column-close').addClass('column-open');
                $('body').css("top", -$('body').scrollTop());
                $('body').addClass("no-scroll").append( '<div class="modal-filter"></div>');
                if ($(".modal-filter").length > 0) {
                    $(".modal-filter").click(function(){
                        $('.slide-column-close').trigger('click');
                    })
                }
            });
            $(document).on('click', '.slide-column-close', function(e){
            //$('.slide-column-close').on('click', function(e){
                e.preventDefault();
                $(".leftColumn, .slide-column-close").removeClass('column-open');
                var top = parseInt($('body').css("top").replace("px", ""))*-1;
                $('body').removeAttr("style");
                $('body').removeClass("no-scroll");
                $('body').scrollTop(top);
                $(".modal-filter").unbind();
                $(".modal-filter").remove();
            });
        }

        // Slide Filter
        if ($('#centerColumn .block.filter').length > 0) {
            $('.slide-column-close').addClass('position-fix');
            $(document).on('click', '.slide-column-open', function(e){
            //$('.slide-column-open').on('click', function(e){
                e.preventDefault();
                $('#centerColumn .block.filter, .slide-column-close').addClass('column-open');
                $('body').css("top", -$('body').scrollTop());
                $('body').addClass("no-scroll").append( '<div class="modal-filter"></div>');
                if ($(".modal-filter").length > 0) {
                    $(".modal-filter").click(function(){
                        $('.slide-column-close').trigger('click');
                    })
                }
            });
            $(document).on('click', '.slide-column-close', function(e){
            //$('.slide-column-close').on('click', function(e){
                e.preventDefault();
                $("#centerColumn .block.filter, .slide-column-close").removeClass('column-open');
                var top = parseInt($('body').css("top").replace("px", ""))*-1;
                $('body').removeAttr("style");
                $('body').removeClass("no-scroll");
                $('body').scrollTop(top);
                $(".modal-filter").unbind();
                $(".modal-filter").remove();
            });
        }

        // Parallax
        jQuery(function($) {
            "use strict";
            var contentParallax = $('.content-parallax');
            if (contentParallax.length) {
                contentParallax.each(function() {
                    var attr = $(this).attr('data-image');
                    $(this).css({
                        'background-image': 'url(' + attr + ')'
                    });
                })
            }
        });


        /*
         tabs(custom)
         */
        jQuery(function($) {
            $.fn.ttTabs = function (options) {
                function ttTabs(tabs) {
                    var $tabs = $(tabs),
                        $head = $tabs.find('.tt-tabs__head'),
                        $head_ul = $head.find('> ul'),
                        $head_li = $head_ul.find('> li'),
                        $head_span = $head_li.find('> span'),
                        $border = $head.find('.tt-tabs__border'),
                        $body = $tabs.find('.tt-tabs__body'),
                        $body_li = $body.find('> div'),
                        anim_tab_duration = options.anim_tab_duration || 500,
                        anim_scroll_duration = options.anim_scroll_duration || 500,
                        breakpoint = 1024,
                        scrollToOpenMobile = (options.scrollToOpenMobile !== undefined) ? options.scrollToOpenMobile : true,
                        singleOpen = (options.singleOpen !== undefined) ? options.singleOpen : true,
                        toggleOnDesktop = (options.toggleOnDesktop !== undefined) ? options.toggleOnDesktop : true,
                        effect = (options.effect !== undefined) ? options.effect : 'slide',
                        offsetTop = (options.offsetTop !== undefined) ? options.offsetTop : '',
                        goToTab = options.goToTab,
                        $btn_prev = $('<div>').addClass('tt-tabs__btn-prev'),
                        $btn_next = $('<div>').addClass('tt-tabs__btn-next'),
                        btn_act = false;

                    function _closeTab($li, desktop) {
                        var anim_obj = {
                            duration: anim_tab_duration,
                            complete: function () {
                                $(this).removeAttr('style');
                            }
                        };

                        function _anim_func($animElem) {
                            if(effect === 'toggle') {
                                $animElem.hide().removeAttr('style');
                            } else if(effect === 'slide') {
                                $animElem.slideUp(anim_obj);
                            } else {
                                $animElem.slideUp(anim_obj);
                            }
                        };

                        if(desktop || singleOpen) {
                            var $animElem;

                            $head_li.removeClass('active');
                            $animElem = $body_li.filter('.active').removeClass('active').find('> div').stop();

                            _anim_func($animElem);
                        } else {
                            var index = $head_li.index($li),
                                $animElem;

                            $li.removeClass('active');
                            $animElem = $body_li.eq(index).removeClass('active').find('> div').stop();

                            _anim_func($animElem);
                        }
                    };

                    function _openTab($li, desktop, beforeOpen, afterOpen, trigger) {
                        var index = $head_li.index($li),
                            $body_li_act = $body_li.eq(index),
                            $animElem,
                            anim_obj = {
                                duration: anim_tab_duration,
                                complete: function () {
                                    if(afterOpen) afterOpen($body_li_act);
                                }
                            };

                        function _anim_func($animElem) {
                            if(beforeOpen) beforeOpen($li.find('> span'));

                            if(effect === 'toggle') {
                                $animElem.show();
                                if(afterOpen) afterOpen($body_li_act);
                            } else if(effect === 'slide') {
                                $animElem.slideDown(anim_obj);
                            } else {
                                $animElem.slideDown(anim_obj);
                            }
                        };

                        $li.addClass('active');
                        $animElem = $body_li_act.addClass('active').find('> div').stop();

                        _anim_func($animElem);
                    };

                    function _replaceBorder($this, animate) {
                        if($this.length) {
                            var span_l = $this.get(0).getBoundingClientRect().left,
                                head_l = $head.get(0).getBoundingClientRect().left,
                                position = {
                                    left: span_l - head_l,
                                    width: $this.width()
                                };
                        } else {
                            var position = {
                                left: 0,
                                width: 0
                            };
                        }

                        if(animate) $border.stop().animate(position, anim_tab_duration);
                        else $border.stop().css(position);
                    };

                    function _correctBtns($li, func) {
                        var span_act_l = $li.find('> span').get(0).getBoundingClientRect().left,
                            span_act_r = $li.find('> span').get(0).getBoundingClientRect().right,
                            head_pos = {
                                l: $head.get(0).getBoundingClientRect().left,
                                r: $head.get(0).getBoundingClientRect().right
                            };

                        if(span_act_l < head_pos.l) {
                            _replace_slider(Math.ceil(head_pos.l - span_act_l), head_pos, false, function () {
                                func();
                            });
                        } else if(span_act_r > head_pos.r) {
                            _replace_slider(Math.ceil(span_act_r - head_pos.r) * -1, head_pos, false, function () {
                                func();
                            });
                        } else {
                            func();
                        }
                    };

                    $head.on('click', '> ul > li > span', function (e, trigger) {
                        var $this = $(this),
                            $li = $this.parent(),
                            wind_w = window.innerWidth,
                            desktop = wind_w > breakpoint,
                            trigger = (trigger === 'trigger') ? true : false;

                        if($li.hasClass('active')) {
                            if(desktop && !toggleOnDesktop) return;

                            _closeTab($li, desktop);

                            _replaceBorder('', true);
                        } else {
                            _correctBtns($li, function () {
                                _closeTab($li, desktop);

                                _openTab($li, desktop,
                                    function($li_act) {
                                        if(desktop) {
                                            var animate = !trigger;

                                            _replaceBorder($li_act, animate);
                                        }
                                    },
                                    function ($body_li_act) {
                                        if(!desktop && !trigger && scrollToOpenMobile) {
                                            var tob_t = $body_li_act.offset().top;
                                            $('html, body').stop().animate({ scrollTop: tob_t }, {
                                                duration: anim_scroll_duration
                                            });
                                        }
                                    }
                                );
                            });
                        }
                    });

                    $body.on('click', '> div > span', function (e) {
                        var $this = $(this),
                            $li = $this.parent(),
                            index = $body_li.index($li);

                        $head_li.eq(index).find('> span').trigger('click');
                    });

                    function _toTab(tab, scrollTo, focus) {
                        var wind_w = window.innerWidth,
                            desktop = wind_w > breakpoint,
                            header_h = 0,
                            $sticky = $(offsetTop),
                            $openTab = $head_li.filter('[data-tab="' + tab + '"]'),
                            $scrollTo = $(scrollTo),
                            toTab = {};

                        if(desktop && $sticky.length) {
                            header_h = $sticky.height();
                        }

                        if(!$openTab.hasClass('active')) {
                            toTab = { scrollTop: $tabs.offset().top - header_h };
                        }

                        $('html, body').stop().animate(toTab, {
                            duration: anim_scroll_duration,
                            complete: function () {
                                _correctBtns($openTab, function () {
                                    _closeTab($openTab, desktop);

                                    _openTab($openTab, desktop,
                                        function($li_act) {
                                            _replaceBorder($li_act, true);
                                        },
                                        function () {
                                            if ($scrollTo.length) {
                                                $('html, body').animate({ scrollTop: $scrollTo.offset().top - header_h }, {
                                                    duration: anim_scroll_duration,
                                                    complete: function () {
                                                        var $focus = $(focus);

                                                        if ($focus.length) $focus.focus();
                                                    }
                                                });
                                            }
                                        }
                                    );
                                })
                            }
                        });
                    };

                    if($.isArray(goToTab) && goToTab.length) {
                        $(goToTab).each(function () {
                            var elem = this.elem,
                                tab = this.tab,
                                scrollTo = this.scrollTo,
                                focus = this.focus;

                            $(elem).on('click', function (e) {
                                _toTab(tab, scrollTo, focus);

                                e.preventDefault();
                                return false;
                            });
                        });
                    }

                    function _btn_disabled(head_pos) {
                        var span_pos = {
                            l: $head_li.first().find('> span').get(0).getBoundingClientRect().left,
                            r: $head_li.last().find('> span').get(0).getBoundingClientRect().right
                        };

                        if(span_pos.l < head_pos.l) $btn_prev.removeClass('disabled');
                        else $btn_prev.addClass('disabled');

                        if(span_pos.r > head_pos.r) $btn_next.removeClass('disabled');
                        else $btn_next.addClass('disabled');
                    };

                    function _replace_slider(difference, head_pos, resize, afterReplace) {
                        var ul_pos = parseInt($head_ul.css('left'), 10),
                            border_pos = parseInt($border.css('left'), 10),
                            duration = (!resize) ? anim_tab_duration : 0,
                            anim_pos = {
                                'left': ul_pos + difference
                            };

                        if(resize) {
                            $head_ul.css(anim_pos);
                            _btn_disabled(head_pos);
                        } else {
                            $border.animate({ 'left': border_pos + difference }, anim_tab_duration);

                            $head_ul.animate(anim_pos, {
                                duration: duration,
                                complete: function () {
                                    _btn_disabled(head_pos);
                                    if(afterReplace) afterReplace();
                                    btn_act = false;
                                }
                            });
                        }
                    };

                    $tabs.on('click', '.tt-tabs__btn-prev, .tt-tabs__btn-next', function () {
                        var $btn = $(this);

                        if($btn.hasClass('disabled') || btn_act) return;

                        btn_act = true;

                        var head_pos = {
                            l: $head.get(0).getBoundingClientRect().left,
                            r: $head.get(0).getBoundingClientRect().right
                        };

                        if($btn.hasClass('tt-tabs__btn-next')) {
                            $head_span.each(function (i) {
                                var $this = $(this),
                                    this_r = $this.get(0).getBoundingClientRect().right;

                                if(this_r > head_pos.r) {
                                    _replace_slider(Math.ceil(this_r - head_pos.r) * -1, head_pos);
                                    return false;
                                }
                            });
                        } else if($btn.hasClass('tt-tabs__btn-prev')) {
                            $($head_span.get().reverse()).each(function (i) {
                                var $this = $(this),
                                    this_l = $this.get(0).getBoundingClientRect().left;

                                if(this_l < head_pos.l) {
                                    _replace_slider(Math.ceil(head_pos.l - this_l), head_pos);
                                    return false;
                                }
                            });
                        }
                    });

                    $(window).on('resize load', function () {
                        var wind_w = window.innerWidth,
                            desktop = wind_w > breakpoint,
                            head_w = $head.innerWidth(),
                            li_w = 0;

                        $head_li.each(function () {
                            li_w += $(this).innerWidth();
                        });

                        if(desktop) {
                            var $span_act = $head_li.filter('.active').find('> span');

                            if(li_w > head_w) {
                                $head.addClass('slider').append($btn_prev).append($btn_next);

                                $head_ul.css({ 'margin-right' : (li_w - $head.innerWidth()) * -1 });

                                if($span_act.length) {
                                    var span_act_r = $span_act.get(0).getBoundingClientRect().right,
                                        span_last_r = $head_span.last().get(0).getBoundingClientRect().right,
                                        head_pos = {
                                            l: $head.get(0).getBoundingClientRect().left,
                                            r: $head.get(0).getBoundingClientRect().right
                                        };

                                    if(span_act_r > head_pos.r) {
                                        _replace_slider(Math.ceil(span_act_r - head_pos.r) * -1, head_pos, true);
                                    } else if(span_last_r < head_pos.r) {
                                        _replace_slider(head_pos.r - span_last_r, head_pos, true);
                                    }

                                    _replaceBorder($span_act, false);
                                }

                            } else {
                                $head_ul.removeAttr('style');
                                $btn_prev.remove();
                                $btn_next.remove();
                                $head.removeClass('slider');
                                _replaceBorder($span_act, false);
                            }

                            $head.css({ 'visibility': 'visible' });
                        } else {
                            $border.removeAttr('style');
                        }
                    });

                    $head_li.filter('[data-active="true"]').find('> span').trigger('click', ['trigger']);

                    return $tabs;
                };

                var tabs = new ttTabs($(this).eq(0));

                return tabs;
            };
            var $ttTabsObj = $('.tt-tabs');
            if ($ttTabsObj.length){
                $ttTabsObj.ttTabs({
                    singleOpen: false,
                    anim_tab_duration: 270,
                    anim_scroll_duration: 500,
                    toggleOnDesktop: false,
                    scrollToOpenMobile: true,
                    effect: 'slide',
                    offsetTop: '.tt-header[data-sticky="true"]',
                    goToTab: [
                        {
                            elem: '.reviews-actions .add',
                            tab: 'tab-Rev',
                            scrollTo: '.block.review-add'
                        },
                        {
                            elem: '.reviews-actions .view',
                            tab: 'tab-Rev',
                            scrollTo: '.block.review-list .review-items'
                        }
                    ]
                });
            }
        });


        jQuery(function($) {
            function initFormGroup($obj) {
                $obj.each( function () {
                    var $this = $(this);
                    var iconObj = $this.find('.input-group-addon');
                    if(iconObj.length){
                        $this.click(function() {
                            formGroupObj.removeClass('active');
                            $this.addClass('active');
                        })
                    }
                });
            };
            var formGroupObj = $('.form-group');
            if(formGroupObj.length){
                initFormGroup(formGroupObj);
            };
        });


        //Tab with carusel
            $(document).on('click', '.tabs-wrapper .nav-tabs--carusel a', function() {
                var $this = $(this),
                    $this_tab = $this.parents('.tabs-wrapper'),
                    id = $this.attr('href'),
                    $tab = $this_tab.find(id),
                    $clone = $this_tab.find(id + '-clone');

                $clone.children().clone().appendTo($tab.empty());


                carousel($tab.find('.carousel-products'), 3, 3, 2, 2, 1);
                carousel($tab.find('.carouselTab-col-4'), 4, 4, 3, 2, 1);
            });

        $('.tabs-wrapper .nav-tabs--carusel .active a').trigger('click');

        //Tab aside with carusel
        jQuery(function($) {
            $(window).on('resize', function() {
                var tabsObj = $('.tab-aside .nav-tabs--carusel'),
                    currentW = window.innerWidth || $(window).width();

                if (tabsObj.length) {
                    initTabSlider();
                    tabsObj.find('.active a').trigger('click');
                }

                function initTabSlider() {
                    tabsObj.each(function() {
                        $(this).find('a').each(function() {
                            $(this).click(function() {
                                $(this).unbind();
                                var tab = $(this).attr("href");
                                var clone = tab + "-clone";
                                $(tab).empty();
                                $(clone).children().clone().appendTo($(tab));
                                var $obj = $(tab).find(".carouselTab1");
                                $obj.css("visibility", "hidden");
                                if ($obj.length) {
                                    setTimeout(function() {
                                        $obj.hide();
                                        $obj.css("visibility", "visible");
                                        $obj.fadeIn(0);
                                        if (currentW <= 791) {
                                            carousel($obj, 2, 2, 2, 2, 1);
                                        }
                                    }, 5);
                                }
                            })
                        });
                    });
                }
            });
        });

        //change tabs title
        jQuery(function($) {
            function nav_tabs_change_title($obj) {
                $obj.each( function () {
                    var $this = $(this),
                        $nav_title= $this.find('.block-title'),
                        $nav_tabs = $this.find('.nav-tabs.nav-tabs--carusel');

                    if($nav_title.length){
                        var $title_value = $nav_tabs.find('li.active a').text();
                        $nav_title.text($title_value);
                        $nav_tabs.on('click', 'li a', function() {
                            var $this = $(this);
                            $nav_title.text($this.text());
                        });
                    };
                });
            };
            var $tabsWrapperObj = $('.tabs-wrapper');
            if($tabsWrapperObj.length){
                $(window).on('resize load', function () {
                    nav_tabs_change_title($tabsWrapperObj);
                });
            };
        });

        function addResizeCarousels(selector, breakpoint, options) {
            if (!selector) return false;

            var $carousels = $(selector),
                breakpoint = breakpoint || 768,
                options = options || null;

            var windW = window.innerWidth || $(window).width();

            if (windW < breakpoint) {
                $carousels.each(function() {
                    $(this).not('.slick-initialized').slick(options);
                });
            } else {
                $carousels.each(function() {
                    if ($(this).hasClass('slick-initialized'))
                        $(this).slick('unslick');
                });
            }
        };

        var addResizeCarousels_timeout;

        $(window).resize(function() {

            clearTimeout(addResizeCarousels_timeout);

            addResizeCarousels_timeout = setTimeout(function() {
                addResizeCarousels(
                    '.carousel-products-mobile',
                    791, {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        responsive: [{
                            breakpoint: 583,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }]
                    }
                );

                addResizeCarousels(
                    '.carousel-products-mobile-md',
                    1024, {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        responsive: [{
                            breakpoint: 583,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }]
                    }
                );
            }, 100);
        });

        function cartTableDetach() {
            var desctopQuantity = $(".shopping-cart-table .detach-quantity-desctope"),
                mobileQuantity = $(".shopping-cart-table .detach-quantity-mobile");
            if (desctopQuantity.length &&  mobileQuantity.parent().css('display') == 'block'){
                var quantityObj = desctopQuantity.find('.input').detach().get(0);
                mobileQuantity.prepend(quantityObj);
            } else if(mobileQuantity.length && mobileQuantity.parent().css('display') == 'none'){
                var quantityObj = mobileQuantity.find('.input').detach().get(0);
                desctopQuantity.prepend(quantityObj);
            };
        };
        $(window).on('ready resize', function() {
            if ($(".shopping-cart-table").length) {
                cartTableDetach();
            }
        });



    }
);

//isotope
require([
        'jquery',
        'isotope',
        'jquery_bridget'
    ],
    function($, Isotope, jQueryBridget) {
        jQueryBridget('isotope', Isotope, $);

        if ($('.isotop-layout').length) {
            $('.isotope').isotope({
                itemSelector : '.item',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: 110,
                    gutter: 10
                }
            });
        }

        var $blog_masonry = $('#blog-masonry');
        if($blog_masonry.length) {
            $blog_masonry.isotope().find('li').animate({opacity: '1'}, 1500);
        }

        if($('.grid_custom').length) {
            var $grid = $('.grid_custom').isotope({
                itemSelector: '.element-item',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: '.element-item'
                }
            });
            var filterFns = {
                numberGreaterThan50: function () {
                    var number = $(this).find('.number').text();
                    return parseInt(number, 10) > 50;
                },
                ium: function () {
                    var name = $(this).find('.name').text();
                    return name.match(/ium$/);
                }
            };
            $('.nav-tab-filter').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                // use filterFn if matches value
                filterValue = filterFns[filterValue] || filterValue;
                $grid.isotope({filter: filterValue});
            });
            $('.button-group').each(function (i, buttonGroup) {
                var $buttonGroup = $(buttonGroup);
                $buttonGroup.on('click', 'button', function () {
                    $buttonGroup.find('.is-checked').removeClass('is-checked');
                    $(this).addClass('is-checked');
                });
            });
            $(".filter-isotop").length && $(".filter-isotop").find(".is-checked").trigger("click");
        }

        if ($(".gallery-masonry").length > 0) {
            // init Isotope
            var $grid = $('.grid-gallery-masonry').isotope({
                itemSelector: '.element-item',
                layoutMode: 'masonry',
                masonry: {
                    gutter: 0
                }
            });
            // filter functions
            var filterFns = {
                ium: function() {
                    var name = $(this).find('.name').text();
                    return name.match( /ium$/ );
                }
            };
            // bind filter button click
            $('.gallery-masonry .filter-nav').on( 'click', '.button', function() {
                var filterValue = $( this ).attr('data-filter');
                // use filterFn if matches value
                filterValue = filterFns[ filterValue ] || filterValue;
                $grid.isotope({ filter: filterValue });
            });
            // change is-checked class on buttons
            $('.gallery-masonry .filter-nav .button').each( function( i, buttonGroup ) {
                var $buttonGroup = $( buttonGroup );
                $buttonGroup.on( 'click', '.button', function() {
                    $buttonGroup.find('.is-checked').removeClass('is-checked');
                    $( this ).addClass('is-checked');
                });
            });

        }
    });

//tonyMenu
require([
        'jquery',
        'tonyMenu',
        'bootstrapminify',
        'slick'
    ],
    function($){

        $(document).ready(function() {

            var $tonyMenu_top = $('header .tonyMenu'),
                $tonyMenu_left = $('.sidebar:not(.tonyMenu__right) .tonyMenu'),
                $tonyMenu_right = $('.sidebar.tonyMenu__right .tonyMenu');


            $tonyMenu_top.attr('data-tm-style', 'horizontal').attr('data-tm-mobile', 'true');
            var tonyMenu_top = $tonyMenu_top.tonyMenu({
                marginElem: [
                    {
                        breakpoint: 'desctop',
                        selector: [
                            '.back-to-top'
                        ]
                    }
                ],
                paddingElem: [
                    {
                        breakpoint: 'mobile',
                        selector: [
                            '.stuck-cart-parent-box'
                        ]
                    },
                    {
                        breakpoint: 'desctop',
                        selector: [
                            '.stuck-nav.stuck'
                        ]
                    }
                ],
                slick: [
                    {
                        type: 'horizontal',
                        prop: {
                            slidesToShow: 2
                        },
                        arrowCenter: false
                    }
                ],
                displaceOnMobile: true,
                displaceWrap: '.mobile-header'
            });

            $('.mobile-menu-toggle').on('click', function (e) {
                tonyMenu_top.showTonyMenu();

                e.stopPropagation();
            });


            $tonyMenu_left.attr('data-tm-style', 'vertical');
            $tonyMenu_left.tonyMenu({
                slick: [
                    {
                        type: 'horizontal',
                        prop: {
                            slidesToShow: 2,
                            responsive: [
                                {
                                    breakpoint: 1280,
                                    settings: {
                                        slidesToShow: 1
                                    }
                                }
                            ]
                        },
                        arrowCenter: false
                    }
                ],
            });

            $tonyMenu_right.attr('data-tm-style', 'vertical').attr('data-tm-position', 'right');
            $tonyMenu_right.tonyMenu({
                slick: [
                    {
                        type: 'horizontal',
                        prop: {
                            slidesToShow: 2,
                            responsive: [
                                {
                                    breakpoint: 1280,
                                    settings: {
                                        slidesToShow: 1
                                    }
                                }
                            ]
                        },
                        arrowCenter: false
                    }
                ],
            });



            /**
             * Stuck init. Properties: on/off
             * @value = 'off', default empty
             */
            (function initStuck(value) {

                var $stucknav = $('.stuck-nav');
                if($stucknav.hasClass('disabled')) return;

                var ie = (getInternetExplorerVersion()!==-1) ? true : false,
                    $stuckmenuparentbox = $('.stuck-menu-parent-box'),
                    $mobilemenuparentbox = $('.mobile-parent-menu'),
                    $mobileparentcart = $('.mobile-parent-cart'),
                    $cart = $('header .cart'),
                    $cartparentbox = $('.main-parent-cart'),
                    $stuckcartparentbox = $('.stuck-cart-parent-box'),
                    $menuparentbox = $('.menu-parent-box'),
                    $menu = $('.header-menu'),
                    device = 'desktop';

                function getInternetExplorerVersion() {
                    var rv = -1;
                    if (navigator.appName == 'Microsoft Internet Explorer')
                    {
                        var ua = navigator.userAgent;
                        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                        if (re.exec(ua) != null)
                            rv = parseFloat( RegExp.$1 );
                    }
                    else if (navigator.appName == 'Netscape')
                    {
                        var ua = navigator.userAgent;
                        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
                        if (re.exec(ua) != null)
                            rv = parseFloat( RegExp.$1 );
                    }
                    return rv;
                };

                if(getInternetExplorerVersion()!==-1){
                    $("html").addClass("ie");
                }



                function scroll_func(stuck_on, this_device) {
                    if( stuck_on ) {
                        if(this_device === device) {
                            if($stucknav.hasClass('stuck')) return false;
                        } else {
                            device = this_device;
                        }

                        $stucknav.hide();
                        $stucknav.addClass('stuck');
                        if(this_device === 'desktop' && tonyMenu_top.dom) tonyMenu_top.insertMenu($stuckmenuparentbox);
                        $stuckcartparentbox.append($cart.detach());

                        if($stucknav.find('.stuck-cart-parent-box > .cart .slide-from-top').hasClass('basket-open') || ie)
                            $stucknav.stop().show();
                        else
                            $stucknav.stop().fadeIn(300);

                    } else {
                        if($stucknav.hasClass('stuck')) {
                            $stucknav.hide();
                            $stucknav.removeClass('stuck');
                            if(this_device === 'mobile') {
                                $mobileparentcart.append($cart.detach());
                            } else if (this_device === 'desktop'){
                                if(tonyMenu_top.dom) tonyMenu_top.backMenu();
                                $cartparentbox.append($cart.detach());
                            }
                        }
                    }
                };

                function resize_func(this_device) {
                    if(this_device === 'mobile') {
                        if($mobileparentcart.children().length || $('.stuck').length) return false;
                        $mobileparentcart.append($cart.detach());
                    } else {
                        if($cartparentbox.children().length || $('.stuck').length) return false;
                        $cartparentbox.append($cart.detach());
                    }
                };

                $(window).on('scroll resize', function (e) {
                    var this_device = (window.innerWidth > 1024) ? 'desktop' : 'mobile',
                        scroll_t = $(window).scrollTop(),
                        header_h = $('header').innerHeight(),
                        stuck_on = (scroll_t > header_h - 20) ? true : false;

                    if(e.type === 'scroll') {
                        scroll_func(stuck_on, this_device);
                    }

                    if(e.type === 'resize') {
                        scroll_func(stuck_on, this_device);
                        resize_func(this_device);
                    }
                });

            })();

            $(window).trigger('resize');

        });

    });

//countdown
require([
    'jquery',
    'countdown_pl',
    'countdown_cd'
],
function($) {
    if ($(".countdown").length) {

        var showZero = showZero || true;

        $(".countdown").each(function() {
            var $this = $(this),
                date = $this.data('date'),
                set_year = $this.data('year') || 'Yrs',
                set_month = $this.data('month') || 'Mths',
                set_week = $this.data('week') || 'Wk',
                set_day = $this.data('day') || 'Day',
                set_hour = $this.data('hour') || 'Hrs',
                set_minute = $this.data('minute') || 'Min',
                set_second = $this.data('second') || 'Sec';

            if (date = date.split('-')) {
                date = date.join('/');
            } else return;

            $this.countdown(date , function(e) {
                var format = '<span class="countdown-row">';

                function addFormat(func, timeNum, showZero) {
                    if(timeNum === 0 && !showZero) return;

                    func(format);
                };

                addFormat(function() {
                    format += '<span class="countdown-section">'
                        + '<span class="countdown-amount">' + e.offset.totalDays + '</span>'
                        + '<span class="countdown-period">' + set_day + '</span>'
                        + '</span>';
                }, e.offset.totalDays, showZero);

                addFormat(function() {
                    format += '<span class="countdown-section">'
                        + '<span class="countdown-amount">' + e.offset.hours + '</span>'
                        + '<span class="countdown-period">' + set_hour + '</span>'
                        + '</span>';
                }, e.offset.hours, showZero);

                addFormat(function() {
                    format += '<span class="countdown-section">'
                        + '<span class="countdown-amount">' + e.offset.minutes + '</span>'
                        + '<span class="countdown-period">' + set_minute + '</span>'
                        + '</span>';
                }, e.offset.minutes, showZero);

                addFormat(function() {
                    format += '<span class="countdown-section">'
                        + '<span class="countdown-amount">' + e.offset.seconds + '</span>'
                        + '<span class="countdown-period">' + set_second + '</span>'
                        + '</span>';
                }, e.offset.seconds, showZero);

                format += '</span>';

                $(this).html(format);
            });
        });
    }
});

require([
        'jquery'
    ],
    function($) {
        var timeout1;
        clearTimeout(timeout1);
        timeout1 = setTimeout(function() {
            $('body').addClass('loaded');
        }, 800);
    });