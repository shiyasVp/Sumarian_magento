<?php /**/
namespace Etheme\Ysmegamenu\Model\Attribute;

class Menuwidth extends \Magento\Eav\Model\Entity\Attribute\Source\AbstractSource
{
    /**
     * Retrieve all options array
     *
     * @return array
     */
    public function getAllOptions()
    {
        if ($this->_options === null) {
            $this->_options = [
                ['label' => __('1210'), 'value' => 1210],
                ['label' => __('945'), 'value' => 945],
                ['label' => __('menu width'), 'value' => 'menu-width'],
                ['label' => __('menu outer width'), 'value' => 'menu-outer-width'],
                ['label' => __('menu wrapper width'), 'value' => 'container-width'],
                ['label' => __('window limit'), 'value' => 'window-limit'],
            ];
        }
        return $this->_options;
    }

    /**
     * Retrieve option array
     *
     * @return array
     */
    public function getOptionArray()
    {
        $_options = [];
        foreach ($this->getAllOptions() as $option) {
            $_options[$option['value']] = $option['label'];
        }
        return $_options;
    }

    /**
     * Get a text for option value
     *
     * @param string|int $value
     * @return string|false
     */
    public function getOptionText($value)
    {
        $options = $this->getAllOptions();
        foreach ($options as $option) {
            if ($option['value'] == $value) {
                return $option['label'];
            }
        }
        return false;
    }

}