<?php /**/
namespace Etheme\Myshop\Model\Config\Source;
class Header implements \Magento\Framework\Option\ArrayInterface
{
    /* Get options in "key-value" format @return array */
    public function toOptionArray()
    {
        return [
            ['value' => 1, 'label' => __('Type 1 (Default)')],
            ['value' => 2, 'label' => __('Type 2')],
            ['value' => 3, 'label' => __('Type 3')],
            ['value' => 4, 'label' => __('Type 4')],
            ['value' => 5, 'label' => __('Type 5')],
            ['value' => 6, 'label' => __('Type 6')],
            ['value' => 7, 'label' => __('Type 7')],
            ['value' => 8, 'label' => __('Type 8')],
            ['value' => 9, 'label' => __('Type 9')]
        ];
    }
    /* Get options in "key-value" format @return array */
    public function toArray()
    {
        $array = [];
        foreach ($this->toOptionArray() as $item) {
            $array[$item['value']] = $item['label'];
        }
        return $array;
    }
}