<?php /**/
namespace Etheme\Myshop\Controller\Adminhtml\System\Config\Button\Staticpages;

use Magento\Framework\Controller\ResultFactory;

class Loadnew extends \Magento\Backend\App\Action
{
    public function execute()
    {
        $this->_objectManager->get('Etheme\Myshop\Model\Config\Button\Staticpages\Loadnew')->importStaticPages();
        $this->messageManager->addSuccess('Absent static pages were installed successfully.');
        $this->_redirect('adminhtml/system_config/edit/section/myshop_install');
    }
}