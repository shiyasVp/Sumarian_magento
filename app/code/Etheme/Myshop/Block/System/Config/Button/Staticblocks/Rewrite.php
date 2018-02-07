<?php /**/
namespace Etheme\Myshop\Block\System\Config\Button\Staticblocks;
class Rewrite extends \Magento\Config\Block\System\Config\Form\Field
{
    const BUTTON_TEMPLATE = 'system/config/button/staticblocks/rewrite.phtml';

    private $_lic;

    public function __construct(
        \Magento\Backend\Block\Template\Context $context,
        \Etheme\Myshop\Helper\Lic $lic
    ) {
        $this->_lic = $lic;

        parent::__construct($context);
    }

    /**     * Set template to itself     *     * @return $this */
    protected function _prepareLayout()
    {
        parent::_prepareLayout();
        if (!$this->getTemplate()) {
            $this->setTemplate(static::BUTTON_TEMPLATE);
        }
        return $this;
    }

    /**     * Render button     *     * @param  \Magento\Framework\Data\Form\Element\AbstractElement $element * @return string */
    public function render(\Magento\Framework\Data\Form\Element\AbstractElement $element)
    {
        $element->unsScope()->unsCanUseWebsiteValue()->unsCanUseDefaultValue();
        return parent::render($element);
    }

    /**     * Return ajax url for button     *     * @return string */
    public function getAjaxCheckUrl()
    {
        return $this->getUrl('addbutton/listdata');
    }

    /**     * Get the button and scripts contents     *     * @param \Magento\Framework\Data\Form\Element\AbstractElement $element * @return string */
    protected function _getElementHtml(\Magento\Framework\Data\Form\Element\AbstractElement $element)
    {
        $licStatus = $this->_lic->getStatus();
        if ($licStatus) {
            $licNotice = '';
            $buttonClass = '';
        } else {
            $buttonClass = 'disabled';
            $licNotice = '<b style="color:#f00000;font-size:12px;line-height:1;">Activation is required.</b>';
        }

        $this->addData(['id' => 'addbutton_button', 'button_label' => __('Rewrite Static Blocks to default'), 'button_class' => $buttonClass, 'onclick' => 'window.location.href=\'' . $this->_urlBuilder->getUrl('myshop_admin/system_config_button_staticblocks/rewrite') . '\'', 'html_id' => $element->getHtmlId()]);
        return $this->_toHtml() . $licNotice;
    }
}