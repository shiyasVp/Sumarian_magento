<?php /**/
namespace Etheme\Myshop\Block\Products;
class Category extends \Magento\Framework\View\Element\Template
{
    protected $_categoryFactory;
    protected $_objectManager;

    public function __construct(\Magento\Framework\View\Element\Template\Context $context, \Magento\Catalog\Model\Category $categoryFactory)
    {
        $this->_categoryFactory = $categoryFactory;
        $this->_objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        parent::__construct($context);
    }

    public function getProductCollection()
    {
        $category = $this->_objectManager->create('Magento\Catalog\Model\Category')->load($this->getCategoryId());
        return $category->getProductCollection()->addAttributeToSelect('*');
    }
}