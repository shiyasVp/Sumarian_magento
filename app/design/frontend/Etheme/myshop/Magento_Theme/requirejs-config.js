/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    paths: {
        "bootstrapminify":  'Magento_Theme/js/bootstrap.min',
        "slick": 'Magento_Theme/js/slick.min',
        "tonyMenu":'Magento_Theme/js/tonyMenu',
        "sliders": 'Magento_Theme/js/sliders',
        jquery_bridget: 'Magento_Theme/js/jquery-bridget',
        "isotope": 'Magento_Theme/js//isotope.pkgd.min',
        countdown_pl: 'Magento_Theme/js/countdown/jquery.plugin.min',
        countdown_cd: 'Magento_Theme/js/countdown/jquery.countdown.min'
    },
    "shim": {
        "bootstrapminify": { deps :['jquery'] },
        "slick" : { deps :['jquery'] },
        "tonyMenu" : { deps :['jquery', 'slick'] },
        "sliders" : { deps :['jquery', 'slick'] },
        jquery_bridget : { deps :['jquery'] },
        isotope : { deps :['jquery', 'jquery_bridget'] },
        countdown_pl : { deps :['jquery'] },
        countdown_cd : { deps :['jquery', 'countdown_pl'] }
    },
    deps: [
        'Magento_Theme/js/theme'
    ]
};
