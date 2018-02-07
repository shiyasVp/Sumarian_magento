<?php /**/
namespace Etheme\Myshop\Model\Config\Source\Blog;
class Layout implements \Magento\Framework\Option\ArrayInterface
{
    /**     * Options getter     *     * @return array */
    public function toOptionArray()
    {
        return [['value' => 'left', 'label' => __('Left Column')], ['value' => 'left', 'label' => __('Right Column')],];
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