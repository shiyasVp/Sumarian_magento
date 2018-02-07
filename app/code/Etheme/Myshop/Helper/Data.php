<?php
/**
* Copyright © 2016 SW-THEMES. All rights reserved.
*/
namespace Etheme\Myshop\Helper;

class Data extends \Magento\Framework\App\Helper\AbstractHelper
{

    protected $_objectManager;
    protected $wishlistHelper;
    protected $compareHelper;

    public function __construct(
        \Magento\Framework\App\Helper\Context $context,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Framework\ObjectManagerInterface $objectManager,
        \Magento\Framework\View\LayoutInterface $layoutInterface,
        \Magento\Wishlist\Helper\Data $wishlistHelper,
        \Magento\Catalog\Helper\Product\Compare $compareHelper,
        \Magento\Customer\Model\Session $customerSession
    ) {
        $this->_storeInterface = $storeManager;
        $this->layoutInterface = $layoutInterface;
        $this->_objectManager= $objectManager;
        $this->wishlistHelper= $wishlistHelper;
        $this->compareHelper= $compareHelper;
        $this->customerSession = $customerSession;
        parent::__construct($context);
    }

    function getStoreInterface(){
        return $this->_storeInterface;
    }

    function getLayoutInterface(){
        return $this->layoutInterface;
    }

    public function isLoggedIn()
    {
        return $this->customerSession->isLoggedIn();
    }

    public function getBaseUrl()
    {
        return $this->_storeInterface->getStore()->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA);
    }

    public function getSystemValue($path, $storeId = null)
    {
        return $this->scopeConfig->getValue($path,\Magento\Store\Model\ScopeInterface::SCOPE_STORE,$storeId);
    }

    public function getConfigOption($path)
    {
        return $this->scopeConfig->getValue('myshop_settings/'.$path,\Magento\Store\Model\ScopeInterface::SCOPE_STORE,$this->_storeInterface->getStore()->getId());
    }

    function getStoreId(){
        return $this->_storeInterface->getStore()->getId();
    }

    public function getMediaUrlBase()
    {
        return  $this->_storeInterface->getStore()
            ->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA).'wysiwyg/myshop/custom/';
    }

    public function getMediaUrl()
    {
        return  $this->_storeInterface->getStore()
            ->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA).'myshop/';
    }

    function newLabel($_product){
        $output='';
        $now = date("Y-m-d");
        $newsFrom = substr($_product->getNewsFromDate(), 0, 10);
        $newsTo = substr($_product->getNewsToDate(), 0, 10);
        $new = false;

        if (!empty($newsFrom) && !empty($newsTo)) {
            if ($now >= $newsFrom && $now <= $newsTo) $new = true;

        } elseif (!empty($newsFrom) && empty($newsTo)) {
            if ($now >= $newsFrom) $new = true;

        } elseif (empty($newsFrom) && !empty($newsTo)) {
            if ($now <= $newsTo) $new = true;
        }
        if ($new)$output='<div class="label-new">New</div>';
        return $output;
    }

    function saleLabel($_product){
        $output=[];
        $_productType = $_product->getTypeID();
        if($_productType == 'simple'){
            $now = date("Y-m-d");
            $specialFrom = substr($_product->getSpecialFromDate(), 0, 10);
            $specialTo = substr($_product->getSpecialToDate(), 0, 10);
            $special = false;
            if (!empty($specialFrom) && !empty($specialTo)) {
                if ($now >= $specialFrom && $now <= $specialTo) $special = true;

            } elseif (!empty($specialFrom) && empty($specialTo)) {
                if ($now >= $specialFrom) $special = true;

            } elseif (empty($specialFrom) && !empty($specialTo)) {
                if ($now <= $specialTo) $special = true;
            }
            if ($special) {
                $output[]='<div class="label-sale">Sale<br>';
                if($_product->getSpecialPrice()) $output[]=(round(100-$_product->getSpecialPrice()/$_product->getPrice()*100)).'% Off';
                $output[]='</div>';
            }
        }
        return implode("\n", $output);
    }

    function getCountdown($_product){
        $output='';
        $_productType = $_product->getTypeID();
        if($_productType == 'simple') {
            $now = date("Y-m-d");
            $specialTo = substr($_product->getSpecialToDate(), 0, 10);
            if (!empty($specialTo)) {
                if ($now <= $specialTo)
                {
                    $output='<div class="countdown_box"><div class="countdown_inner"><div class="countdown" data-date="'.date_format(date_create($_product->getSpecialToDate()),"Y-m-d").'"></div></div></div>';
                }

            }
        }
        return $output;
    }

    public function getCurCategoryIds($cur_cat) {
        $cur_cat = $cur_cat->getProductCollection()
            ->addAttributeToSelect('*')
            ->addAttributeToFilter('is_saleable', 1, 'left')
            ->addAttributeToSort('position','asc');
        $cur_cat_ids = $cur_cat->getAllIds();
        return $cur_cat_ids;
    }

    public function prev_next($product,$type) {
        $cur_cat = $product->getCategory();
        if(!$cur_cat) foreach($product->getCategoryCollection() as $parent_cat)  $cur_cat = $parent_cat;
        if(!$cur_cat) return false;
        $ids = $this->getCurCategoryIds($cur_cat);
        $product_index = array_search($product->getId(), $ids);
        if($type=='prev')$array_index=$product_index - 1;else $array_index=$product_index + 1;
        $prod=false;
        if (isset($ids[$array_index])) $prod = $this->_objectManager->create('Magento\Catalog\Model\Product')->load($ids[$array_index]);
        return $prod;
    }

    function getMedia($_product){

        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();

        $product = $objectManager->create('Magento\Catalog\Model\Product')->load($_product->getId());

        return  $product->getMediaGalleryImages();

    }

    public function getCssFile()
    {
        return $this->getMediaUrl(). 'css/' . $this->_storeInterface->getStore()->getCode() . '.css';
    }

    function getWishlistCount()
    {
        return $this->wishlistHelper->getItemCount();
    }

    function getCompareListUrl()
    {
        return $this->compareHelper->getListUrl();
    }

    function getCompareListCount()
    {
        return $this->compareHelper->getItemCount();
    }


}