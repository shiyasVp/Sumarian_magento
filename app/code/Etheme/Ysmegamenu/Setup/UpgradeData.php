<?php

namespace Etheme\Ysmegamenu\Setup;

use Magento\Framework\Module\Setup\Migration;
use Magento\Framework\Setup\UpgradeDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Catalog\Setup\CategorySetupFactory;

class UpgradeData implements UpgradeDataInterface
{
    private $categorySetupFactory;

    public function __construct(CategorySetupFactory $categorySetupFactory)
    {
        $this->categorySetupFactory = $categorySetupFactory;
    }

    public function upgrade(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        $installer = $setup;
        $installer->startSetup();
       /* if (version_compare($context->getVersion(), '0.0.4') < 0) {*/
            $categorySetup = $this->categorySetupFactory->create(['setup' => $setup]);
            $entityTypeId = $categorySetup->getEntityTypeId(\Magento\Catalog\Model\Category::ENTITY);
            $attributeSetId = $categorySetup->getDefaultAttributeSetId($entityTypeId);

            $megamenu = array(
                'ys_nav_left' => array(
                    'type' => 'text',
                    'label' => 'Left Html',
                    'input' => 'textarea',
                    'required' => false,
                    'sort_order' => 50,
                    'wysiwyg_enabled' => false,
                    'is_html_allowed_on_front' => true,
                    'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                    'group' => 'Myshop Megamenu',

                ),
                'ys_nav_top' => array(
                    'type' => 'text',
                    'label' => 'Top Html',
                    'input' => 'textarea',
                    'required' => false,
                    'sort_order' => 60,
                    'wysiwyg_enabled' => false,
                    'is_html_allowed_on_front' => true,
                    'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                    'group' => 'Myshop Megamenu',
                ),
                'ys_data_tm_width' => array(
                    'type' => 'text',
                    'label' => 'Width',
                    'input' => 'select',
                    'source' => 'Etheme\Ysmegamenu\Model\Attribute\Menuwidth',
                    'required' => false,
                    'sort_order' => 70,
                    'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                    'group' => 'Myshop Megamenu',
                    'default' => '1210'
                ),
                'ys_data_tm_align_vertical' => array(
                    'type' => 'text',
                    'label' => 'Align Vertical',
                    'input' => 'select',
                    'source' => 'Etheme\Ysmegamenu\Model\Attribute\Alignvertical',
                    'required' => false,
                    'sort_order' => 80,
                    'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                    'group' => 'Myshop Megamenu',
                    'default' => 'item'
                ),
                'ys_data_tm_align_horizontal' => array(
                    'type' => 'text',
                    'label' => 'Align Horizontal',
                    'input' => 'select',
                    'source' => 'Etheme\Ysmegamenu\Model\Attribute\Alignhorizontal',
                    'required' => false,
                    'sort_order' => 90,
                    'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                    'group' => 'Myshop Megamenu',
                    'default' => 'left'
                ),
                'ys_data_tm_animation' => array(
                    'type' => 'text',
                    'label' => 'Animation',
                    'input' => 'select',
                    'source' => 'Etheme\Ysmegamenu\Model\Attribute\Animation',
                    'required' => false,
                    'sort_order' => 100,
                    'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                    'group' => 'Myshop Megamenu',
                    'default' => 'fade'
                ),
                'ys_data_tm_duration' => array(
                    'type' => 'text',
                    'label' => 'Duration',
                    'input' => 'text',
                    'required' => false,
                    'sort_order' => 110,
                    'wysiwyg_enabled' => false,
                    'is_html_allowed_on_front' => true,
                    'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                    'group' => 'Myshop Megamenu',
                    'note'=>'time in milliseconds',
                    'default' => '300'
                ),
                'ys_products_ids' => array(
                    'type' => 'text',
                    'label' => 'Product\'s ids, separated by commas',
                    'input' => 'text',
                    'required' => false,
                    'sort_order' => 120,
                    'wysiwyg_enabled' => false,
                    'is_html_allowed_on_front' => true,
                    'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                    'group' => 'Myshop Megamenu',
                    'note'=>'minimum two ids',
                ),
                'ys_products_title' => array(
                    'type' => 'text',
                    'label' => 'Product\'s title',
                    'input' => 'text',
                    'required' => false,
                    'sort_order' => 130,
                    'wysiwyg_enabled' => false,
                    'is_html_allowed_on_front' => true,
                    'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                    'group' => 'Myshop Megamenu',
                ),
                'ys_columns' => array(
                    'type' => 'text',
                    'label' => 'Animation',
                    'input' => 'select',
                    'source' => 'Etheme\Ysmegamenu\Model\Attribute\Columns',
                    'required' => false,
                    'sort_order' => 140,
                    'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                    'group' => 'Myshop Megamenu',
                    'default' => '4'
                ),
                'ys_nav_left_width' => array(
                    'type' => 'text',
                    'label' => 'Animation',
                    'input' => 'select',
                    'source' => 'Etheme\Ysmegamenu\Model\Attribute\Columnsgrid',
                    'required' => false,
                    'sort_order' => 140,
                    'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                    'group' => 'Myshop Megamenu',
                    'default' => '2'
                ),
                'ys_nav_right_width' => array(
                    'type' => 'text',
                    'label' => 'Animation',
                    'input' => 'select',
                    'source' => 'Etheme\Ysmegamenu\Model\Attribute\Columnsgrid',
                    'required' => false,
                    'sort_order' => 140,
                    'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                    'group' => 'Myshop Megamenu',
                    'default' => '2'
                ),

            );

            foreach ($megamenu as $key => $value) {
                $categorySetup->addAttribute(\Magento\Catalog\Model\Category::ENTITY, $key, $value);
            }
            $idg = $categorySetup->getAttributeGroupId($entityTypeId, $attributeSetId, 'Myshop Megamenu');
            foreach ($megamenu as $key => $value) {
                $categorySetup->addAttributeToGroup(
                    $entityTypeId,
                    $attributeSetId,
                    $idg,
                    $key,
                    $value['sort_order']
                );
            }
        /*}*/
        $installer->endSetup();
    }
}