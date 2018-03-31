<?php
/**
 * @copyright Copyright (c) 2017 www.tigren.com
 */

namespace Tigren\ProgressiveWebApp\Controller\Adminhtml\Notification;

class Delete extends \Magento\Backend\App\Action
{
    /**
     * Delete action
     *
     * @return \Magento\Framework\Controller\ResultInterface
     */
    public function execute()
    {
        $id = $this->getRequest()->getParam('notification_id');
        /** @var \Magento\Backend\Model\View\Result\Redirect $resultRedirect */
        $resultRedirect = $this->resultRedirectFactory->create();
        if ($id) {
            try {
                $model = $this->_objectManager->create('Tigren\ProgressiveWebApp\Model\Notification');
                $model->load($id);
                $model->delete();
                $this->messageManager->addSuccess(__('The notification has been deleted.'));
                return $resultRedirect->setPath('*/*/');
            } catch (\Exception $e) {
                $this->messageManager->addError($e->getMessage());
                return $resultRedirect->setPath('*/*/edit', ['notification_id' => $id]);
            }
        }
        $this->messageManager->addError(__('We can\'t find a notification to delete.'));
        return $resultRedirect->setPath('*/*/');
    }
}
