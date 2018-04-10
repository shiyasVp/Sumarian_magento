<?php 
class Letsknowit_Postdata_Model_Checkout_Observer 
{
     public function postDataTosServer(Varien_Event_Observer $observer){
       $orderIds = $observer->getData('order_ids');
         foreach($orderIds as $_orderId){
            $order     = Mage::getModel('sales/order')->load($_orderId);
           $customer  = Mage::getModel('customer/customer')->load($order->getData('customer_id'));
           $customer->getDefaultBillingAddress()->getLastname();
           $billingaddress = $order->getBillingAddress();

          try {  /* parameters can be change according to requirment */
                $params =    array( 'customerName'=>$order->getData('customer_firstname'),
                            'companyName'=>$billingaddress->getData('company'),
                            'telephone'=>  $billingaddress->getData('telephone'),
                            'email'=> $billingaddress->getData('email'),
                            'street'=> $billingaddress->getData('street'),
                            'city'=>  $billingaddress->getData('city'),
                            'region'=> $billingaddress->getData('region'),
                            'postcode'=> $billingaddress->getData('postcode'),
                            'total'=>$order->getGrandTotal() );

            $url= 'exmaple.com/getorders.php';         // the url on which the data will be send through curl
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch,CURLOPT_HEADER);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
            $response = curl_exec($ch);
            curl_close($ch);
        Mage::log('Order has been sent to exmaple.com');
 
         } catch (Exception $e) {
               Mage::logException($e);}
      }
         return $this;
     }
 }  
 ?>