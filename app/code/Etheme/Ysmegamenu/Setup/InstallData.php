<?php /**/
namespace Etheme\Ysmegamenu\Setup;
use Magento\Framework\Module\Setup\Migration;
use Magento\Framework\Setup\InstallDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Catalog\Setup\CategorySetupFactory;

class InstallData implements InstallDataInterface
{

    private $categorySetupFactory;

    public function __construct(CategorySetupFactory $categorySetupFactory)
    {
        $this->categorySetupFactory = $categorySetupFactory;
    }

    public function install(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        $installer = $setup;
        $installer->startSetup();
        $categorySetup = $this->categorySetupFactory->create(['setup' => $setup]);
        $entityTypeId = $categorySetup->getEntityTypeId(\Magento\Catalog\Model\Category::ENTITY);
        $attributeSetId = $categorySetup->getDefaultAttributeSetId($entityTypeId);

        $megamenu = array(
            'ys_nav_simple' => array(
                'type' => 'int',
                'label' => 'Apply simple mode (shows only tree)',
                'input' => 'select',
                'source' => 'Magento\Eav\Model\Entity\Attribute\Source\Boolean',
                'required' => false,
                'sort_order' => 0,
                'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                'group' => 'Myshop Megamenu'
            ),

            'ys_nav_btm' => array(
                'type' => 'text',
                'label' => 'Html block under menu ',
                'input' => 'textarea',
                'required' => false,
                'sort_order' => 20,
                'wysiwyg_enabled' => false,
                'is_html_allowed_on_front' => true,
                'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                'group' => 'Myshop Megamenu',
                'note'=>'This field is compatible only with 1st-level category'
            ),
            'ys_nav_right' => array(
                'type' => 'text',
                'label' => 'Megamenu Vertical Right Html',
                'input' => 'textarea',
                'required' => false,
                'sort_order' => 30,
                'wysiwyg_enabled' => false,
                'is_html_allowed_on_front' => true,
                'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                'group' => 'Myshop Megamenu',
                'note'=>'This field is compatible only with 1st-level category'
            ),
            'ys_category_lable' => array(
                'type' => 'text',
                'label' => 'Category label, for ex. "Hot!"',
                'input' => 'text',
                'required' => false,
                'sort_order' => 40,
                'wysiwyg_enabled' => false,
                'is_html_allowed_on_front' => true,
                'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_STORE,
                'group' => 'Myshop Megamenu',
                'note'=>'This field is compatible only with 1st-level category megamenu'
            )
        );
        foreach($megamenu as $key => $value) {
            $categorySetup->addAttribute(\Magento\Catalog\Model\Category::ENTITY, $key, $value);
        }
        $idg =  $categorySetup->getAttributeGroupId($entityTypeId, $attributeSetId, 'Myshop Megamenu');
        foreach($megamenu as $key => $value) {
            $categorySetup->addAttributeToGroup(
                $entityTypeId,
                $attributeSetId,
                $idg,
                $key,
                $value['sort_order']
            );
        }
        $installer->endSetup();
    }
}