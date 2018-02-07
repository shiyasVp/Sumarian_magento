<?php /**/
namespace Etheme\Myshop\Model\Config\Source;
class Footer implements \Magento\Framework\Option\ArrayInterface
{
    /**     * Options getter     *     * @return array */
    public function toOptionArray()
    {
        return [
            ['value' => 1, 'label' => __('Type 1 (Default)')],
            ['value' => 2, 'label' => __('Type 2')],
            ['value' => 3, 'label' => __('Type 3')],
            ['value' => 4, 'label' => __('Type 4')]
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