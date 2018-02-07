<?php /**/
namespace Etheme\Myshop\Model\Config\Source\Products;
class Tabs implements \Magento\Framework\Option\ArrayInterface
{
    /**     * Options getter     *     * @return array */
    public function toOptionArray()
    {
        return [['value' => 'default', 'label' => __('Default')], ['value' => 'sticky', 'label' => __('Sticky')], ['value' => '0', 'label' => __('No Tabs')],];
    }

    /**     * Get options in "key-value" format     *     * @return array */
    public function toArray()
    {
        $array = [];
        foreach ($this->toOptionArray() as $item) {
            $array[$item['value']] = $item['label'];
        }
        return $array;
    }
}