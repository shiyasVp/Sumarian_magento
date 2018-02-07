<?php /**/
namespace Etheme\Myshop\Model\Config\Source;
class Popup implements \Magento\Framework\Option\ArrayInterface
{
    /**     * Options getter     *     * @return array */
    public function toOptionArray()
    {
        return [
            ['value' => 500, 'label' => __('500 ms')],
            ['value' => 1000, 'label' => __('1000 ms')],
            ['value' => 1500, 'label' => __('1500 ms')],
            ['value' => 2000, 'label' => __('2000 ms')],
            ['value' => 3000, 'label' => __('3000 ms')]
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