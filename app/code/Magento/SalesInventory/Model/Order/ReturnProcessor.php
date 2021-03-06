<?php
/**
 * Copyright © 2013-2017 Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Magento\SalesInventory\Model\Order;

use Magento\Sales\Api\Data\CreditmemoInterface;
use Magento\Sales\Api\Data\CreditmemoItemInterface;
use Magento\Sales\Api\Data\OrderInterface;

/**
 * Class ReturnProcessor
 */
class ReturnProcessor
{
    /**
     * @var \Magento\CatalogInventory\Api\StockManagementInterface
     */
    private $stockManagement;

    /**
     * @var \Magento\CatalogInventory\Model\Indexer\Stock\Processor
     */
    private $stockIndexerProcessor;

    /**
     * @var \Magento\Catalog\Model\Indexer\Product\Price\Processor
     */
    private $priceIndexer;

    /**
     * @var \Magento\Sales\Api\CreditmemoRepositoryInterface
     */
    private $creditmemoRepository;

    /**
     * @var \Magento\Store\Model\StoreManagerInterface
     */
    private $storeManager;

    /**
     * @var \Magento\Sales\Api\OrderRepositoryInterface
     */
    private $orderRepository;

    /**
     * @var \Magento\Sales\Api\OrderItemRepositoryInterface
     */
    private $orderItemRepository;

    /**
     * ReturnToStockPlugin constructor.
     * @param \Magento\CatalogInventory\Api\StockConfigurationInterface $stockConfiguration
     * @param \Magento\CatalogInventory\Api\StockManagementInterface $stockManagement
     * @param \Magento\CatalogInventory\Model\Indexer\Stock\Processor $stockIndexer
     * @param \Magento\Catalog\Model\Indexer\Product\Price\Processor $priceIndexer
     * @param \Magento\Sales\Api\CreditmemoRepositoryInterface $creditmemoRepository
     * @param \Magento\Store\Model\StoreManagerInterface $storeManager
     * @param \Magento\Sales\Api\OrderRepositoryInterface $orderRepository
     * @param \Magento\Sales\Api\OrderItemRepositoryInterface $orderItemRepository
     */
    public function __construct(
        \Magento\CatalogInventory\Api\StockManagementInterface $stockManagement,
        \Magento\CatalogInventory\Model\Indexer\Stock\Processor $stockIndexer,
        \Magento\Catalog\Model\Indexer\Product\Price\Processor $priceIndexer,
        \Magento\Sales\Api\CreditmemoRepositoryInterface $creditmemoRepository,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Sales\Api\OrderRepositoryInterface $orderRepository,
        \Magento\Sales\Api\OrderItemRepositoryInterface $orderItemRepository
    ) {
        $this->stockManagement = $stockManagement;
        $this->stockIndexerProcessor = $stockIndexer;
        $this->priceIndexer = $priceIndexer;
        $this->creditmemoRepository = $creditmemoRepository;
        $this->storeManager = $storeManager;
        $this->orderRepository = $orderRepository;
        $this->orderItemRepository = $orderItemRepository;
    }

    /**
     * @param CreditmemoInterface $creditmemo
     * @param OrderInterface $order
     * @param array $returnToStockItems
     * @return void
     */
    public function execute(
        CreditmemoInterface $creditmemo,
        OrderInterface $order,
        array $returnToStockItems = []
    ) {
        $itemsToUpdate = [];
        foreach ($creditmemo->getItems() as $item) {
            $qty = $item->getQty();
            $productId = $item->getProductId();
            $orderItem = $this->orderItemRepository->get($item->getOrderItemId());
            $parentItemId = $orderItem->getParentItemId();
            if ($this->canReturnItem($item, $qty, $parentItemId, $returnToStockItems)) {
                $parentItem = $parentItemId ? $this->getItemByOrderId($creditmemo, $parentItemId) : false;
                $qty = $parentItem ? $parentItem->getQty() * $qty : $qty;
                if (isset($itemsToUpdate[$productId])) {
                    $itemsToUpdate[$productId] += $qty;
                } else {
                    $itemsToUpdate[$productId] = $qty;
                }
            }
        }

        if (!empty($itemsToUpdate)) {
            $store = $this->storeManager->getStore($order->getStoreId());
            foreach ($itemsToUpdate as $productId => $qty) {
                $this->stockManagement->backItemQty(
                    $productId,
                    $qty,
                    $store->getWebsiteId()
                );
            }

            $updatedItemIds = array_keys($itemsToUpdate);
            $this->stockIndexerProcessor->reindexList($updatedItemIds);
            $this->priceIndexer->reindexList($updatedItemIds);
        }
    }

    /**
     * @param \Magento\Sales\Api\Data\CreditmemoInterface $creditmemo
     * @param int $parentItemId
     * @return bool|CreditmemoItemInterface
     */
    private function getItemByOrderId(\Magento\Sales\Api\Data\CreditmemoInterface $creditmemo, $parentItemId)
    {
        foreach ($creditmemo->getItems() as $item) {
            if ($item->getOrderItemId() == $parentItemId) {
                return $item;
            }
        }
        return false;
    }

    /**
     * @param \Magento\Sales\Api\Data\CreditmemoItemInterface $item
     * @param int $qty
     * @param int[] $returnToStockItems
     * @param int $parentItemId
     * @return bool
     */
    private function canReturnItem(
        \Magento\Sales\Api\Data\CreditmemoItemInterface $item,
        $qty,
        $parentItemId = null,
        array $returnToStockItems = []
    ) {
        return (in_array($item->getOrderItemId(), $returnToStockItems) || in_array($parentItemId, $returnToStockItems))
        && $qty;
    }
}
