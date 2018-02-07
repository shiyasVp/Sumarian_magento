<?php /**/
namespace Etheme\Myshop\Model\Config\Source;
class Spacer implements \Magento\Framework\Option\ArrayInterface
{
    /**     * Options getter     *     * @return array */
    public function toOptionArray()
    {
        return [
            ['value' => 'none', 'label' => __('Default')],
            ['value' => 'margin-top-0', 'label' => __('None')],
            ['value' => 'margin-top-50', 'label' => __('50px')]
        ];
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