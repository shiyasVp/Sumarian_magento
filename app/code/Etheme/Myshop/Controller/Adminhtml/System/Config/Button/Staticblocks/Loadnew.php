<?php /**/
namespace Etheme\Myshop\Controller\Adminhtml\System\Config\Button\Staticblocks;

use Magento\Framework\Controller\ResultFactory;

class Loadnew extends \Magento\Backend\App\Action
{
    public function execute()
    {
        $this->_objectManager->get('Etheme\Myshop\Model\Config\Button\Staticblocks\Loadnew')->importStaticBlocks();
        $this->messageManager->addSuccess('Absent static blocks were installed successfully.');
        $this->_redirect('adminhtml/system_config/edit/section/myshop_install');
    }
}