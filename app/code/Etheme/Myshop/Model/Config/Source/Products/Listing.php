<?php /**/
namespace Etheme\Myshop\Model\Config\Source\Products;
class Listing implements \Magento\Framework\Option\ArrayInterface
{
    /**     * Options getter     *     * @return array */
    public function toOptionArray()
    {
        return [
            ['value' => '0', 'label' => __('Default')],
            ['value' => '1', 'label' => __('Small')],
            ['value' => '2', 'label' => __('Medium')],
            ['value' => '3', 'label' => __('Large')],];
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