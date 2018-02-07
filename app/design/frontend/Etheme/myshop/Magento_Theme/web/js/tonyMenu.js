/*TONYMENU PLUGIN JS*/

/*var tonyMenu_top = $tonyMenu_top.tonyMenu({
    marginElem: [
        {
            breakpoint: 'mobile' || 'desctop',
            selector: [
                '.stuck-nav.fixedbar .cart.link-inline'
            ]
        }
    ],
    slick: [
        {
            type: 'horizontal',
            prop: {
                slidesToShow: 2
            },
            arrowCenter: true,
            arrowAlignSelector: '.image-box'
        }
    ],
     displace: true,
     displaceWrap: '.mobile-header'
});*/

//START: Обёртку можно выбросить
;(function() {

    //START: Проверку можно выбросить
    'use strict';

    if(!jQuery) {
        console.log('jQuery is not defined!');
        return;
    }

    var $ = jQuery;
    //END: Проверку можно выбросить



    $.fn.tonyMenu = function (options) {

        function tonyMenu(menu, options) {
            var tonyMenu = menu,
                $tonyMenu = $(tonyMenu).eq(0),
                menu_style = $tonyMenu.data('tm-style');

            if(!$tonyMenu.length || !menu_style) return;
            else if (menu_style !== 'horizontal' && menu_style !== 'vertical') return;

            var options = options || {},
                $this = $(this),
                $body = $('body'),
                mobile = !!$tonyMenu.data('tm-mobile') || false,
                menu_position = false,
                displace = options.displaceOnMobile || false,
                displace_wrap = options.displaceWrap || '',
                $tonyMenu_parent = $tonyMenu.parent(),
                items = '.tonyMenu__item',
                $items = $tonyMenu.find(items),
                $tonyMenu_megamenu = $tonyMenu.find('.tonyMenu__megamenu'),
                breakpoint_w = $tonyMenu.data('tm-breakpoint') || 1024,
                inner_items = '.tonyMenu__inner-list-items',
                $ul = $tonyMenu.find('ul'),
                $li = $ul.find('li'),
                $tonyMenu_bg = $('<div>').addClass('tonyMenu_bg');

            if(menu_style === 'vertical') {
                var menu_position = $tonyMenu.data('tm-position') || 'left';
            }

            var scroll_w = (function() {
                var $div = $('<div>').css({
                    overflowY: 'scroll',
                    width: '50px',
                    height: '50px',
                    visibility: 'hidden'
                });

                $('body').append($div);
                var scrollWidth = $div.get(0).offsetWidth - $div.get(0).clientWidth;
                $div.remove();
                return scrollWidth;
            })();

            var menuEvent = function(event, obj) {
                var obj = obj || {},
                    event_obj = {
                    type: event
                };

                $.extend(event_obj, obj);

                $tonyMenu.trigger(event_obj);
            };

            if(mobile) {
                $tonyMenu.after($tonyMenu_bg);
            }

            $items.on('click', function (e) {
                if(window.innerWidth > breakpoint_w && $(e.target).hasClass('tonyMenu__item')) {
                    var get_href = $(this).find('> a').attr('href');
                    if (get_href) window.location.href = get_href;
                }
            });

            (function setArrows() {
                var $li = $tonyMenu.find('li.tonyMenu__item, .tonyMenu__box-center li'),
                    arrow_class = 'tonyMenu__item-next-level';

                $li.each(function () {
                    var $this = $(this);

                    if ($this.find('ul').length > 0)
                        $this.addClass(arrow_class);
                });
            })();

            var set_for_event = function (func, event, wait_event) {
                wait_event = wait_event || 'off';

                if(wait_event === 'on') {
                    $tonyMenu.one(event, function() {
                        func();
                    });
                } else if(wait_event === 'off') {
                    func();
                }
            };

            if(menu_style === 'horizontal') {
                (function add_transition_blocks() {
                    $items.each(function () {
                        $(this).find('a').eq(0).append($('<div>').addClass('tonyMenu__transition-block'));
                    });
                })();

                var set_transition_block = function ($megamenu, $item) {
                    var $transition_block = $item.find('.tonyMenu__transition-block');

                    $transition_block.removeAttr('style');

                    var item_b = $item.find('> a').get(0).getBoundingClientRect().bottom,
                        megamenu_t = $megamenu.get(0).getBoundingClientRect().top,
                        set_transition_w = megamenu_t - item_b;

                    $transition_block.css({
                        height: set_transition_w + 'px'
                    }).show();
                };
            }

            //START objects methods
            var animation_functions = {
                show: {
                    'fade': function ($megamenu, fade_duration) {
                        $megamenu.removeAttr('style')
                            .css({opacity: 0})
                            .show();

                        menuEvent('tonyMenu.megamenu.show.go', { megamenu: $megamenu });

                        $megamenu.animate({
                            opacity: '1'
                        }, {
                            duration: fade_duration,
                            complete: function () {
                                animation_func_complete($megamenu, 'show');
                                menuEvent('tonyMenu.megamenu.show.end', { megamenu: $megamenu });
                            }
                        });
                    },
                    'toggle': function ($megamenu, fade_duration) {
                        $megamenu.removeAttr('style')
                            .css({opacity: 0})
                            .show();

                        menuEvent('tonyMenu.megamenu.show.go', { megamenu: $megamenu });

                        $megamenu.css({ opacity: '1'});
                        animation_func_complete($megamenu, 'show');
                        menuEvent('tonyMenu.megamenu.show.end', { megamenu: $megamenu });
                    },
                    'emersion': function ($megamenu, fade_duration, emersion_distance) {
                        $megamenu.removeAttr('style')
                            .css({
                                marginTop: emersion_distance + 'px',
                                opacity: 0
                            })
                            .show();

                        menuEvent('tonyMenu.megamenu.show.go', { megamenu: $megamenu });

                        $megamenu.animate({
                            opacity: '1',
                            marginTop: 0
                        }, {
                            duration: fade_duration,
                            complete: function () {
                                animation_func_complete($megamenu, 'show');
                                menuEvent('tonyMenu.megamenu.show.end', { megamenu: $megamenu });
                            }
                        });
                    },
                    'emersion-vertical': function ($megamenu, fade_duration, emersion_distance) {
                        if (menu_position === 'right') emersion_distance *= -1;

                        $megamenu.removeAttr('style')
                            .css({
                                marginLeft: emersion_distance + 'px',
                                opacity: 0
                            })
                            .show();

                        menuEvent('tonyMenu.megamenu.show.go', { megamenu: $megamenu });

                        $megamenu.animate({
                            opacity: '1',
                            marginLeft: 0
                        }, {
                            duration: fade_duration,
                            complete: function () {
                                animation_func_complete($megamenu, 'show');
                                menuEvent('tonyMenu.megamenu.show.end', { megamenu: $megamenu });
                            }
                        });
                    }
                },
                hide: {
                    fade: function ($megamenu, fade_duration) {
                        $megamenu.animate({
                            opacity: '0'
                        }, {
                            duration: fade_duration,
                            complete: function () {
                                $megamenu.hide();
                                animation_func_complete($megamenu, 'hide');
                                menuEvent('tonyMenu.megamenu.hide.end', { megamenu: $megamenu });
                            }
                        });
                    },
                    toggle: function ($megamenu, fade_duration) {
                        $megamenu.hide();
                        animation_func_complete($megamenu, 'hide');
                        menuEvent('tonyMenu.megamenu.hide.end', { megamenu: $megamenu });
                    },
                    emersion: function ($megamenu, fade_duration, emersion_distance) {
                        $megamenu.animate({
                            opacity: '0',
                            marginTop: emersion_distance + 'px'
                        }, {
                            duration: fade_duration,
                            complete: function () {
                                $megamenu.hide();
                                animation_func_complete($megamenu, 'hide');
                                menuEvent('tonyMenu.megamenu.hide.end', { megamenu: $megamenu });
                            }
                        });
                    },
                    'emersion-vertical': function ($megamenu, fade_duration, emersion_distance) {
                        if (menu_position === 'right') emersion_distance *= -1;

                        $megamenu.animate({
                            opacity: '0',
                            marginLeft: emersion_distance + 'px'
                        }, {
                            duration: fade_duration,
                            complete: function () {
                                $megamenu.hide();
                                animation_func_complete($megamenu, 'hide');
                                menuEvent('tonyMenu.megamenu.hide.end', { megamenu: $megamenu });
                            }
                        });
                    },
                }
            };

            var alignHorizontal_functions = {
                horizontal: {
                    'left': function($megamenu, $item) {
                        var set_align = $item.get(0).getBoundingClientRect().left - $tonyMenu.get(0).getBoundingClientRect().left;

                        return set_align * -1;
                    },
                    'item': function($megamenu, $item) {
                        return 0;
                    },
                    'item-center': function($megamenu, $item) {
                        var item_w = $item.innerWidth(),
                            megamenu_w = $megamenu.outerWidth();

                        return (megamenu_w/2 - item_w/2) * -1;
                    },
                    'left-window': function($megamenu, $item) {
                        var tonyMeny_l = $item.get(0).getBoundingClientRect().left;

                        return tonyMeny_l * -1;
                    },
                    'center-window': function ($megamenu, $item) {
                        var wind_w = window.innerWidth - scroll_w,
                            item_l = $item.get(0).getBoundingClientRect().left,
                            megamenu_w = $megamenu.outerWidth();

                        return item_l * -1 + wind_w/2 - megamenu_w/2;
                    }
                },
                vertical: {
                    'item': function ($megamenu, $item) {
                        if(menu_position === 'left') {
                            var set_align = $item.innerWidth();
                        } else if(menu_position === 'right') {
                            var set_align = $megamenu.innerWidth() * -1;
                        }
                        return set_align;
                    }
                }
            };

            var alignVertical_functions = {
                horizontal: {
                    'item': function ($megamenu, $item) {
                        var $a = $item.find('> a'),
                            item_marg_t = $a.get(0).getBoundingClientRect().top - $tonyMenu.get(0).getBoundingClientRect().top,
                            set_align = $a.outerHeight() + item_marg_t;

                        return set_align;
                    },
                    'menu-bottom': function ($megamenu, $item) {
                        var item_marg_b = $tonyMenu.get(0).getBoundingClientRect().bottom - $item.get(0).getBoundingClientRect().bottom,
                            set_align = $item.outerHeight() + item_marg_b;

                        return set_align;
                    }
                },
                vertical: {
                    'menu-top': function ($megamenu, $item) {
                        var set_align = 0,
                            i = 0;

                        for(; i < $items.length; i++) {
                            if($items.get(i) === $item.get(0))
                                break;

                            set_align += $items.eq(i).outerHeight();
                        }

                        return set_align * -1;
                    },
                    'item-center': function ($megamenu, $item) {
                        var megamenu_h = $megamenu.innerHeight(),
                            item_h = $item.innerHeight();

                        return (megamenu_h/2 - item_h/2) * -1;
                    },
                    'item': function ($megamenu, $item) {
                        return 0;
                    }
                }
            };

            var width_functions = {
                horizontal: {
                    'menu-width': function (megamenu_data_w, align) {
                        var navbar_w = $tonyMenu.find('.tonyMenu__navbar').innerWidth();

                        if(align === 'left-window')
                            navbar_w += $tonyMenu.get(0).getBoundingClientRect().left;

                        return navbar_w;
                    },
                    'menu-outer-width': function (megamenu_data_w, align) {
                        var navbar_w = $tonyMenu.innerWidth();

                        if(align === 'left-window')
                            navbar_w += $tonyMenu.get(0).getBoundingClientRect().left;

                        return navbar_w;
                    },
                    'container-width': function (megamenu_data_w) {
                        /*var container = $tonyMenu.attr('data-tm-width-cont') || options.container || false;*/
                        var container = '.menu_cont_wrapper';
                        if(container) {
                            var cont_w = $(container).width();

                            return cont_w;
                        } else {
                            return 1170;
                        }
                    },
                    'window-limit': function (megamenu_data_w, align, $megamenu, wind_w, condition) {
                        var megamenu_l = $megamenu.get(0).getBoundingClientRect().left;

                        if(condition === 'check' && megamenu_data_w + megamenu_l > wind_w - scroll_w) {
                            return wind_w - scroll_w - megamenu_l;
                        } else if (condition === 'set') {
                            return wind_w - scroll_w - megamenu_l;
                        } else {
                            return megamenu_data_w;
                        }
                    }
                },
                vertical: {
                    'window-limit': function (megamenu_data_w, align, $megamenu, wind_w, condition) {
                        if(menu_position === 'left') {
                            var tonyMenu_r = $tonyMenu.get(0).getBoundingClientRect().right;

                            if(condition === 'check' && tonyMenu_r + megamenu_data_w > wind_w) {
                                return wind_w - scroll_w - tonyMenu_r;
                            } else if (condition === 'set') {
                                return wind_w - scroll_w - tonyMenu_r;
                            } else {
                                return megamenu_data_w;
                            }
                        } else if(menu_position === 'right') {
                            var tonyMenu_l = $tonyMenu.get(0).getBoundingClientRect().left;

                            if(condition === 'check' && tonyMenu_l - megamenu_data_w < 0) {
                                return tonyMenu_l;
                            } else if (condition === 'set') {
                                return tonyMenu_l;
                            } else {
                                return megamenu_data_w;
                            }
                        }
                    }
                }
            };
            //END objects methods

            var alignHorizontal = function ($megamenu, $item) {
                var megamenu_data_w = $megamenu.data('tm-width'),
                    wait_event = 'off';

                if(menu_style === 'horizontal') {
                    var align = $megamenu.data('tm-align-horizontal') || 'left';

                    if (!alignHorizontal_functions['horizontal'].hasOwnProperty(align))
                        align = 'left';

                    if (align === 'item' || align === 'item-center' || align === 'center-window') {
                        wait_event = 'on';
                    }

                    set_for_event(function () {

                        var set_align = alignHorizontal_functions['horizontal'][align]($megamenu, $item);
                        $megamenu.css({left: set_align + 'px'});

                    }, 'tonyMenu.setWidth', wait_event);

                } else if (menu_style === 'vertical') {
                    var align = $megamenu.data('tm-align-horizontal') || 'item';

                    if (!alignHorizontal_functions['vertical'].hasOwnProperty(align))
                        align = 'item';

                    /*var set_align = alignHorizontal_functions['vertical'][align]($megamenu, $item);
                    $megamenu.css({ left: set_align + 'px'});*/

                    if (menu_position === 'right') {
                        wait_event = 'on';
                    }

                    set_for_event(function () {

                        var set_align = alignHorizontal_functions['vertical'][align]($megamenu, $item);
                        $megamenu.css({ left: set_align + 'px'});

                    }, 'tonyMenu.setWidth', wait_event);
                }

                menuEvent('tonyMenu.align');
            };

            var alignVertical = function ($megamenu, $item) {
                if(menu_style === 'horizontal') {
                    var align = $megamenu.data('tm-align-vertical') || 'item';

                    if(!alignVertical_functions['horizontal'].hasOwnProperty(align))
                        align = 'item';

                    var set_align = alignVertical_functions['horizontal'][align]($megamenu, $item);
                    $megamenu.css({ top: set_align + 'px' });
                } else if (menu_style === 'vertical') {
                    var align = $megamenu.data('tm-align-vertical') || 'menu-top';

                    if(!alignVertical_functions['vertical'].hasOwnProperty(align))
                        align = 'menu-top';

                    var set_align = alignVertical_functions['vertical'][align]($megamenu, $item);
                    $megamenu.css({ top: set_align + 'px' });
                }
            };

            var set_max_width = function ($megamenu, wind_w) {
                var megamenu_data_w = $megamenu.data('tm-width') || window.innerWidth/100*60,
                    align = $megamenu.data('tm-align-horizontal') || 'left',
                    megamenu_w;

                if(menu_style === 'horizontal') {
                    if(align === 'item' || align === 'item-center') {
                        if (isNaN(+megamenu_data_w)) {
                            megamenu_data_w = window.innerWidth/100*60;
                        }
                    }

                    if (width_functions[menu_style].hasOwnProperty(megamenu_data_w)) {
                        megamenu_w = width_functions[menu_style][megamenu_data_w](megamenu_data_w, align, $megamenu, wind_w, 'set');
                    } else if(align !== 'item' && align !== 'item-center') {
                        megamenu_w = width_functions[menu_style]['window-limit'](parseInt(megamenu_data_w), align, $megamenu, wind_w, 'check');
                    } else {
                        megamenu_w = megamenu_data_w;
                    }
                } else if(menu_style === 'vertical') {
                    if (width_functions[menu_style].hasOwnProperty(megamenu_data_w)) {
                        megamenu_w = width_functions[menu_style][megamenu_data_w](megamenu_data_w, align, $megamenu, wind_w, 'set');
                    } else {
                        megamenu_w = width_functions[menu_style]['window-limit'](parseInt(megamenu_data_w), align, $megamenu, wind_w, 'check');
                    }
                }
                $megamenu.css({ width: megamenu_w});

                menuEvent('tonyMenu.setWidth');
            };

            var toggleMegamenu_desctop = function ($megamenu, action) {
                var animation = $megamenu.data('tm-animation') || 'fade',
                    fade_duration = $megamenu.data('tm-duration') || 300,
                    emersion_distance = $megamenu.data('tm-emersion-distance') || 60,
                    i = 0;

                $megamenu.stop();

                menuEvent('tonyMenu.megamenu.change');

                if(!animation_functions[action].hasOwnProperty(animation))
                    animation = 'fade';

                if(action === 'show') {
                    menuEvent('tonyMenu.megamenu.show.start');

                    var animation_in = $megamenu.data('tm-animation-in');

                    if(animation_functions[action].hasOwnProperty(animation_in))
                        animation = animation_in;

                    $tonyMenu_megamenu.not($megamenu).hide();

                    animation_functions[action][animation]($megamenu, fade_duration, emersion_distance);

                    $megamenu.attr('data-tm-active', true);
                } else if(action === 'hide') {
                    menuEvent('tonyMenu.megamenu.hide.start');

                    var animation_out = $megamenu.data('tm-animation-out');

                    if(animation_functions[action].hasOwnProperty(animation_out))
                        animation = animation_out;

                    animation_functions[action][animation]($megamenu, fade_duration, emersion_distance);

                    $megamenu.attr('data-tm-active', false);
                }
            };

            $tonyMenu_megamenu.attr('data-tm-active', false).hide();

            $tonyMenu.on('mouseenter mouseleave', items, function (e) {
                var wind_w = window.innerWidth;

                if(wind_w > breakpoint_w) {
                    var $this = $(this),
                        that = this,
                        target = e.target,
                        eventType = e.type,
                        $megamenu = $this.find('.tonyMenu__megamenu');

                    if (eventType === 'mouseenter') {
                        if (!$megamenu.length || $(target).closest('.tonyMenu__megamenu').length) return;

                        var wind_w = window.innerWidth;

                        toggleMegamenu_desctop($megamenu, 'show');
                        alignHorizontal($megamenu, $this);
                        alignVertical($megamenu, $this);
                        set_max_width($megamenu, wind_w);

                    } else if (eventType === 'mouseleave') {
                        if (target.tagName !== 'A' && target.tagName !== 'LI' && $(target).parents('.tonyMenu__megamenu').length) return;
                        toggleMegamenu_desctop($megamenu, 'hide');

                        if(menu_style === 'horizontal') {
                            $this.find('.tonyMenu__transition-block').removeAttr('style');
                        }
                    }
                }
            });

            $tonyMenu.on('mouseenter', inner_items + ' li.tonyMenu__item-next-level', function (e) {
                var wind_w = window.innerWidth;

                if(wind_w > breakpoint_w) {
                    var $this = $(this),
                        $megamenu = $this.parents('.tonyMenu__megamenu'),
                        megamenu_is_scroll = ($megamenu.hasClass('tonyMenu__megamenu-scroll')) ? true : false,
                        $ul = $this.find('ul'),
                        eventType = e.type,
                        animation_time = 300;

                    $ul.eq(0).stop().css({
                        display: 'block',
                        opacity: 0
                    });

                    var ul_l = $ul.get(0).getBoundingClientRect().left,
                        ul_r = $ul.get(0).getBoundingClientRect().right,
                        ul_w = $ul.innerWidth(),
                        indent = 20,
                        $item_align_left = $ul.parents('ul[data-tm-item-left]'),
                        $item_align_left_n = $item_align_left.data('tm-item-left') || 0,
                        $item_align_right = $ul.parents('ul[tm-item-right]'),
                        $item_align_right_n = $item_align_left.data('tm-item-right') || 0;

                    if(megamenu_is_scroll) {
                        var limit_l = $megamenu.get(0).getBoundingClientRect().left,
                            limit_r = $megamenu.get(0).getBoundingClientRect().right;
                    } else {
                        var limit_l = 0,
                            limit_r = window.innerWidth;
                    }

                    if(limit_r < ul_r - indent || $item_align_left_n > $item_align_right_n) {
                        $ul.eq(0).attr('data-tm-item-left', $item_align_right_n + 1);
                        $ul.eq(0).css({ transform: 'translateX(-200%)' });
                    }

                    var ul_l = $ul.get(0).getBoundingClientRect().left;

                    if(ul_l < limit_l + indent && $item_align_left_n > 0) {
                        $ul.eq(0).attr('data-tm-item-right', $item_align_left_n + 1);
                        $ul.eq(0).css({ transform: 'translateX(0)' });
                    }

                    $ul.eq(0).stop().animate({
                        opacity: 1
                    },animation_time);

                    $this.one('mouseleave', function () {
                        $(this).find('> ul').stop().animate({
                            opacity: 0
                        }, {
                            duration: animation_time,
                            complete: function () {
                                $($ul)
                                    .removeAttr('data-tm-item-left')
                                    .removeAttr('data-tm-item-right')
                                    .removeAttr('style')
                                    .hide();
                            }
                        });
                    });
                }
            });

            var fixed_body = function (action) {
                if(action === 'set') {
                    var $set_margin_elems = $(options.marginElem),
                        $set_padding_elems = $(options.paddingElem),
                        wind_w = window.innerWidth;

                    $body.addClass('tonyMenu__fixed-bg').css({marginRight: scroll_w});

                    var set_margin = function () {
                        var elem_margin_right = parseInt($(this).css('margin-right'), 10);

                        $(this).css({marginRight: elem_margin_right + scroll_w});
                    };

                    var set_padding = function () {
                        var elem_padding_right = parseInt($(this).css('padding-right'), 10);

                        $(this).css({paddingRight: elem_padding_right + scroll_w});
                    };

                    $set_margin_elems.each(function () {
                        var this_breakpoint = this.breakpoint;
                        $(this.selector).each(function () {
                            if(this_breakpoint === 'mobile' && wind_w <= breakpoint_w) {
                                set_margin.call(this);
                            } else if(this_breakpoint === 'desctop' && wind_w > breakpoint_w) {
                                set_margin.call(this);
                            }
                        });
                    });

                    $set_padding_elems.each(function () {
                        var this_breakpoint = this.breakpoint;
                        $(this.selector).each(function () {
                            if(this_breakpoint === 'mobile' && wind_w <= breakpoint_w) {
                                set_padding.call(this);
                            } else if(this_breakpoint === 'desctop' && wind_w > breakpoint_w) {
                                set_padding.call(this);
                            }
                        });
                    });

                } else if(action === 'unset') {
                    var $set_margin_elems = $(options.marginElem),
                        $set_padding_elems = $(options.paddingElem);

                    $body.removeClass('tonyMenu__fixed-bg').css({ marginRight: 0 });

                    $set_margin_elems.each(function () {
                        $(this.selector).each(function () {
                            $(this).removeAttr('style');
                        });
                    });

                    $set_padding_elems.each(function () {
                        $(this.selector).each(function () {
                            $(this).removeAttr('style');
                        });
                    });
                }
            };

            var set_megamenu_scroll = function ($megamenu, action) {
                if(action === 'set') {
                    var wind_h = window.innerHeight,
                        megamenu_t = $megamenu.get(0).getBoundingClientRect().top,
                        megamenu_h = $megamenu.innerHeight(),
                        megamenu_margin_b = 25;

                    if (megamenu_t + megamenu_h > wind_h) {
                        $megamenu.css({
                            width: +$megamenu.innerWidth() + scroll_w,
                            overflowY: 'auto',
                            height: wind_h - megamenu_t - megamenu_margin_b
                        });

                        fixed_body(action);

                        $megamenu.addClass('tonyMenu__megamenu-scroll');
                    }
                } else if(action === 'unset') {
                    fixed_body(action);
                    $megamenu.removeClass('tonyMenu__megamenu-scroll');
                }
            };

            function animation_func_complete($megamenu, action) {
                if(action === 'show') {
                    if (menu_style === 'horizontal') {
                        set_transition_block($megamenu, $megamenu.parents('.tonyMenu__item'));
                        set_megamenu_scroll($megamenu, 'set');
                        $megamenu.scrollTop(0);
                    }
                } else if (action === 'hide') {
                    if (menu_style === 'horizontal') {
                        set_megamenu_scroll($megamenu, 'unset');
                    }
                }
            };

            if(mobile) {
                $tonyMenu.on('click', 'li:not(.tonyMenu__bth-close), li:not(.tonyMenu__bth-close) a', function (e) {
                    var wind_w = window.innerWidth;

                    if (wind_w <= breakpoint_w) {
                        var $this = $(this),
                            target = e.target,
                            $li = $this.closest('li'),
                            $ul = ($li.hasClass('tonyMenu__item')) ?
                                $li.find('.tonyMenu__inner-list-group, .tonyMenu__inner-list-single, .tonyMenu__list-preview').eq(0) :
                                $li.find('ul').eq(0),
                            slide_time = 300;

                        if ($ul.length) {
                            $ul.stop();

                            if ($li.hasClass('tonyMenu__open')) {
                                if (target.tagName === 'LI') {
                                    $ul.slideUp(slide_time);
                                    $li.removeClass('tonyMenu__open');
                                    setTimeout(function () {
                                        $ul.find('ul').hide();
                                        $ul.find('li').removeClass('tonyMenu__open');
                                    }, slide_time);
                                    e.stopPropagation();
                                    return false;
                                }
                            } else {
                                $ul.slideDown(slide_time);
                                $li.addClass('tonyMenu__open');
                                e.preventDefault();
                                e.stopPropagation();
                                return false;
                            }
                        }
                    }
                });
                var animation_t = 600;

                this.showTonyMenu = function () {
                    if($tonyMenu.hasClass('tonyMenu__mobile-open')) return;

                    menuEvent('tonyMenu.mobile.show.start');

                    var wind_w = window.innerWidth,
                        tonyMenu_w = $tonyMenu.innerWidth();

                    if(wind_w <= breakpoint_w) {
                        $tonyMenu.stop().animate({
                                left: tonyMenu_w
                            },
                            {
                                duration: animation_t,
                                complete: function () {
                                    fixed_body('set');
                                    menuEvent('tonyMenu.mobile.show.end');
                                }
                            })
                            .addClass('tonyMenu__mobile-open');

                        $tonyMenu_bg.stop().fadeIn(animation_t);
                    }
                };

                this.hideTonyMenu = function () {
                    if(!$tonyMenu.hasClass('tonyMenu__mobile-open')) return;

                    menuEvent('tonyMenu.mobile.hide.start');

                    var wind_w = window.innerWidth,
                        tonyMenu_w = $tonyMenu.innerWidth();

                    $tonyMenu.stop().animate({
                            left: tonyMenu_w * -1
                        },
                        {
                            duration: animation_t,
                            complete: function () {
                                fixed_body('unset');
                                menuEvent('tonyMenu.mobile.hide.end');
                            }
                        })
                        .removeClass('tonyMenu__mobile-open');

                    $tonyMenu_bg.stop().fadeOut(animation_t);
                };

                $tonyMenu.find('.tonyMenu__bth-close a', $tonyMenu_bg).on('click', function (e) {
                    $this.get(0).hideTonyMenu();

                    e.preventDefault();
                    return false;
                });

                $tonyMenu_bg.on('click', function () {
                    $this.get(0).hideTonyMenu();
                });
            } else {
                this.showTonyMenu = function () {
                    console.log('tonyMenu mobile is not active');
                };

                this.hideTonyMenu = function () {
                    console.log('tonyMenu mobile is not active');
                };
            }

            this.insertMenu = function(elem) {
                $(elem).append($tonyMenu);
            };

            this.backMenu = function() {
                $tonyMenu_parent.append($tonyMenu);
            };

            function displace_menu(wind_w) {
                if( displace && displace_wrap !== '') {
                    if(wind_w <= breakpoint_w && !$tonyMenu.hasClass('displaced')) {
                        $(displace_wrap).append($tonyMenu);
                        $(displace_wrap).append($tonyMenu_bg);
                        $tonyMenu.addClass('displaced');
                    } else if(wind_w > breakpoint_w && $tonyMenu.hasClass('displaced')) {
                        $tonyMenu_parent.append($tonyMenu);
                        $tonyMenu_parent.append($tonyMenu_bg);
                        $tonyMenu.removeClass('displaced');
                    }
                }
            };

            $(window).on('resize', function () {
                var wind_w = window.innerWidth;

                $tonyMenu_megamenu.removeAttr('style').attr('tm-active', false).hide();
                $tonyMenu.removeAttr('style').removeClass('tonyMenu__mobile-open');
                $tonyMenu_bg.stop().hide();
                $li.removeClass('tonyMenu__open');
                $ul.removeAttr('style');
                fixed_body('unset');
                displace_menu(wind_w);
            });

            //START SLICK
            $tonyMenu.on('tonyMenu.megamenu.show.go', function (e) {
                var $sliders_init = $(e.megamenu).find('.tonyMenu__slick-slider'),
                    set_prop = options.slick,
                    slick_init_vertical_obj = {
                        slidesToShow: 2,
                        vertical: true,
                        verticalSwiping: true,
                        infinite: true,
                        arrows: false,
                        autoplaySpeed: 2000
                    },
                    slick_init_brand_obj = {
                        slidesToShow: 10,
                        infinite: true,
                        arrows: false
                    };

                $sliders_init.each(function () {
                    var $this = $(this),
                        center_arrow = true,
                        center_arrow_selector = true,
                        slide_type = ($this.hasClass('tonyMenu__slick-vertical')) ? 'vertical' :
                                        ($this.hasClass('tonyMenu__slider-brands')) ? 'brand' :
                                        'horizontal',
                        slick_init_obj = {
                            slidesToShow: 1,
                            autoplaySpeed: 3000
                        };

                    if(slide_type === 'vertical')
                        $.extend(slick_init_obj, slick_init_vertical_obj);
                    else if(slide_type === 'brand')
                        $.extend(slick_init_obj, slick_init_brand_obj);

                    $(set_prop).each(function () {
                        if(this.type === slide_type) {
                            $.extend(slick_init_obj, this.prop);
                            if(this.arrowCenter !== undefined) {
                                center_arrow = this.arrowCenter;
                                center_arrow_selector = this.arrowAlignSelector;
                            }
                            return false;
                        }
                    });

                    if (!$this.hasClass('slick-initialized')) {
                        setTimeout(function () {
                            $this.fadeIn().slick(slick_init_obj);

                            var $slick_arrows = $this.find('.slick-arrow'),
                                slick_arrows_h = $slick_arrows.eq(0).innerHeight(),
                                slick_arrows_top;

                            if(slide_type === 'horizontal') {
                                if(center_arrow) slick_arrows_top = $this.find(center_arrow_selector).outerHeight();
                            } else if(slide_type === 'vertical') {
                                //if(center_arrow) slick_arrows_top = $this.innerHeight() - slick_arrows_h;
                            }

                            $slick_arrows.css({ top: slick_arrows_top/2});
                        }, 0);
                    }
                });
            });

            $tonyMenu.on('tonyMenu.megamenu.hide.end', function (e) {
                var $sliders_init = $(e.megamenu).find('.tonyMenu__slick-slider');

                $sliders_init.each(function () {
                    var $this = $(this);

                    if ($this.hasClass('slick-initialized')) {
                        $this.slick('unslick');
                    }
                });
            });
            //END SLICK

            $(window).trigger('resize');

            this.dom = $tonyMenu.get(0);

            $tonyMenu.addClass('tonyMenu__initialize');
            menuEvent('tonyMenu.initialize');

        };

    
        var menu = new tonyMenu($(this).eq(0), options);

        return menu;
    };



})();
//END: Обёртку можно выбросить

