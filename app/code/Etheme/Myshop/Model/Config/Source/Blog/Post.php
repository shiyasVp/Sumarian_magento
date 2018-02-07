<?php /**/
namespace Etheme\Myshop\Model\Config\Source\Blog;
class Post implements \Magento\Framework\Option\ArrayInterface
{
    /**     * Options getter     *     * @return array */
    public function toOptionArray()
    {
        return [['value' => 'content', 'label' => __('1 column')], ['value' => 'left', 'label' => __('Left Column')],];
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