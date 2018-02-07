<?php /**/
namespace Etheme\Myshop\Model\Config\Button\Staticblocks;
class Loadnew
{
    protected $reader;
    private $parser;
    protected $blockColFactory;

    public function __construct(\Magento\Framework\View\Element\Template\Context $context, \Magento\Framework\Module\Dir\Reader $reader, \Magento\Framework\Xml\Parser $parser, \Magento\Cms\Model\ResourceModel\Block\CollectionFactory $blockColFactory, \Magento\Cms\Model\BlockFactory $blockFactory, array $data = [])
    {
        $this->reader = $reader;
        $this->parser = $parser;
        $this->blockFactory = $blockFactory;
        $this->blockColFactory = $blockColFactory;
    }

    public function importStaticBlocks()
    {
        $filePath = $this->reader->getModuleDir('etc', 'Etheme_Myshop') . '/import/cms_blocks.xml';
        if (!is_readable($filePath)) {
            throw new \Exception(__("File is not readable. Please check permissions" . $filePath));
            return 0;
        } else {
            $parsedArray = $this->parser->load($filePath)->xmlToArray();
            foreach ($parsedArray['default']['blocks']['block'] as $block) {
                $block['stores'] = [0];
                $check_block_exists = $this->blockColFactory->create()->addFieldToFilter('identifier', $block['identifier']);
                if (!count($check_block_exists)) $this->blockFactory->create()->setData($block)->save();
            }
            return 1;
        }
    }
}