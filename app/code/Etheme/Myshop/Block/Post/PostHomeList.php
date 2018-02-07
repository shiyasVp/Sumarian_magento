<?php
/**
 * Copyright © 2016 Alexander Lukjanenko (alexander.lukjanenko@gmail.com)
 */

namespace Etheme\Myshop\Block\Post;

use Magento\Store\Model\ScopeInterface;

/**
 * Blog post list block
 */
class PostHomeList extends \Magefan\Blog\Block\Post\PostList\AbstractList
{

    /**
     * get blog Url
     *
     * @return void
     */
    public function getBlogUrl (){
        return $this->_url->getBaseUrl();
    }

    public function getShortContent($post) {
        $previewSize = 150;
        $text = substr($post->getContent(), 0, $previewSize);
        $pointPosition = strrpos ($text, ".");
        if( $pointPosition === FALSE) {
            // . not found
            $spacePosition = strrpos ($text, " ");
            if ($spacePosition === false) {
                // "space" not fount.
                // Keep $text unchanged
            } else {
                $text = substr($text, 0, $spacePosition);
            }
        } else {
            $text = substr($text, 0, $pointPosition);
        }
        return $text;
    }

    /**
     * Prepare posts collection
     *
     * @return void
     */
    protected function _preparePostCollection()
    {
        $postsConfig = $this->_getConfigValue('posts');

        $postIds = array_map ("trim", explode ( ',' , $this->_getConfigValue('posts_ids')));

        if ( $postsConfig == 'manual') {
            $this->_postCollection = $this->_postCollectionFactory->create()
                ->addActiveFilter()
                ->addStoreFilter($this->_storeManager->getStore()->getId())
                ->addFieldToFilter('post_id', array('in' => $postIds));
            $this->_postCollection->getSelect()->order(new \Zend_Db_Expr('FIELD ( `main_table`.`post_id`, ' . implode(',', $postIds).')'));
        } else {
            $this->_postCollection = $this->_postCollectionFactory->create()
                ->addActiveFilter()
                ->addStoreFilter($this->_storeManager->getStore()->getId())
                ->setOrder('publish_time', 'DESC');
        }

        $postLimit = $this->_getConfigValue('limit');
        if ($postLimit) {
            // do nothing, option set at admin panel
        } else {
            // option doesn't set in admin panel
            // set default value here
            $postLimit = 3;
        }
        $this->_postCollection->getSelect()->limit($postLimit);
    }

    /**
     * Retrieve widget options
     * @return string
     */
    protected function _getConfigValue($param)
    {
        return $this->_scopeConfig->getValue(
            'myshop_settings/homepage_widget/'.$param,
            ScopeInterface::SCOPE_STORE
        );
    }

    public function getTitle() {
        return $this->_getConfigValue('title');
    }

    public function getButton() {
        return $this->_getConfigValue('button_text');
    }
}
