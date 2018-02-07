<?php /**/
namespace Etheme\Ysmegamenu\Model\Attribute;

class Alignhorizontal extends \Magento\Eav\Model\Entity\Attribute\Source\AbstractSource
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
                ['label' => __('left'), 'value' => 'left'],
                ['label' => __('item'), 'value' => 'item'],
                ['label' => __('item center'), 'value' => 'item-center'],
                ['label' => __('center window'), 'value' => 'center-window'],
                ['label' => __('left window'), 'value' => 'left-window'],
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