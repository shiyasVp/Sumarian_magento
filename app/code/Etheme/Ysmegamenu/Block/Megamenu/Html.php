<?php /**/
namespace Etheme\Ysmegamenu\Block\Megamenu;

class Html extends \Magento\Theme\Block\Html\Topmenu
{

    /*public function __construct(\Magento\Framework\View\Element\Template\Context $context, \Magento\Framework\Data\Tree\NodeFactory $nodeFactory, \Magento\Framework\Data\TreeFactory $treeFactory,array $data = [])
    {
        //parent::__construct($context, $data);

    }*/


    public function getBlockTemplateProcessor($content = '',$objectManager) {
        return  $objectManager->get('\Magento\Cms\Model\Template\FilterProvider')->getBlockFilter()->filter(trim($content));
    }



    protected function _getHtml(
        \Magento\Framework\Data\Tree\Node $menuTree,
        $childrenWrapClass,
        $limit,
        $colBrakes = [],
        $type_simple=0
    ) {
        $html = [];
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();

        $children = $menuTree->getChildren();
        $parentLevel = $menuTree->getLevel();
        $childLevel = $parentLevel === null ? 0 : $parentLevel + 1;

        $counter = 1;
        $itemPosition = 1;
        $childrenCount = $children->count();


        $parentPositionClass = $menuTree->getPositionClass();
        $itemPositionClassPrefix = $parentPositionClass ? $parentPositionClass . '-' : 'nav-';

        foreach ($children as $child) {
            $child->setLevel($childLevel);
            $child->setIsFirst($counter == 1);
            $child->setIsLast($counter == $childrenCount);
            $hasChildren=$child->hasChildren();
            $level=$childLevel;
            $outermostClassCode = '';
            $outermostClass = $menuTree->getOutermostClass();
            if($childLevel == 0) $outermostClass.=' ';
            if ($childLevel == 0 && $outermostClass) {

                $outermostClassCode = ' class="' . $outermostClass . '" ';
                $child->setClass($outermostClass);
            }

            $data=[];
            $category = $objectManager->get('\Magento\Catalog\Model\CategoryFactory')->create()->load(str_replace('category-node-','',$child->getId()));
            if($level==0 && $category->getData('ys_nav_simple'))$type_simple=1;
            if($level==0 && !$category->getData('ys_nav_simple'))$type_simple=0;

            if(!$type_simple)
            {

                if($level==0)
                {
                    $data['btm']=$this->getBlockTemplateProcessor($category->getData('ys_nav_btm'),$objectManager);
                    $data['right']=$this->getBlockTemplateProcessor($category->getData('ys_nav_right'),$objectManager);
                    $data['left']=$this->getBlockTemplateProcessor($category->getData('ys_nav_left'),$objectManager);
                    $data['top']=$this->getBlockTemplateProcessor($category->getData('ys_nav_top'),$objectManager);

                    $left_col = $category->getData('ys_nav_left_width');

                    if(!$category->getData('ys_nav_left'))$left_col=0;
                    $right_col = $category->getData('ys_nav_right_width');
                    if(!($category->getData('ys_nav_right')||$category->getData('ys_products_ids')))$right_col=0;
                    $center_col = 5-$left_col-$right_col;
                }

                if($level == 0)
                {
                    $html[]= '<li class="tonyMenu__item">';
                } elseif($level == 1)
                {
                    $html[]= '<li>';
                } else
                {
                    $html[]= '<li ' . $this->_getRenderedMenuItemAttributes($child) . '>';
                }

                if($level == 0)
                {
                    $html[]= '<a href="' . $child->getUrl() . '">';
                } elseif($level==1)
                {
                    $html[]= '<a href="' . $child->getUrl() . '" class="tonyMenu__head-title">';
                } else
                {
                    $html[]= '<a href="' . $child->getUrl() . '" ' . $outermostClassCode . '>';
                }


                $html[]= $this->escapeHtml($child->getName());
                if($level == 0){
                    if(!empty($category->getData('ys_category_lable')))
                    $html[]='<span class="badge badge-menu">'.$category->getData('ys_category_lable').'</span>';
                }


                $html[]= '</a>';

                if($level==0 && $hasChildren)$html[]='<div class="tonyMenu__megamenu tonyMenu__col-'.$left_col.'-'.$center_col.'-'.$right_col.'" data-tm-width="'.$category->getData('ys_data_tm_width').'" data-tm-align-horizontal="'.$category->getData('ys_data_tm_align_horizontal').'" data-tm-align-vertical="'.$category->getData('ys_data_tm_align_vertical').'" data-tm-animation="'.$category->getData('ys_data_tm_animation').'" data-tm-duration="'.$category->getData('ys_data_tm_duration').'" data-tm-emersion-distance="60">';

                if($level==0){

                    if(!empty($data['top']))
                    {
                        $html[]='<div class="tonyMenu__box-top">'.$data['top'].'</div>';
                    }

                    if(!empty($data['left']))
                    {
                        $html[]='<div class="tonyMenu__box-left">'.$data['left'].'</div>';
                    }
                };
                if($level==0 && $hasChildren)$html[]='<div class="tonyMenu__box-center">
																<div class="tonyMenu__box-inner">
																	<ul class="tonyMenu__inner-list-group tonyMenu__inner-col-'.$category->getData('ys_columns').'">';


                $html[]= $this->_addSubMenuMegamenu(
                    $child,
                    $childLevel,
                    $childrenWrapClass,
                    $limit,
                    $data
                );
                if($level==0 && $hasChildren)$html[]='</ul><div class="clearfix"></div></div></div>';
                if($level==0){
                    if(!empty($category->getData('ys_products_ids')))
                    {
                        $html[]='<div class="tonyMenu__box-right">
                        <ul>
                            <li>
                                <a href="#" class="tonyMenu__head-title">'.$category->getData('ys_products_title').'</a>
                            </li>
                            
                            <li>
                            <!-- carousel -->
                            <div class="tonyMenu__slick-slider">																
                                '.$this->getProducts($category->getData('ys_products_ids')).'
                            </div>
                            <!-- /carousel -->
                            </li>
                        </ul></div>';

                    }elseif(!empty($data['right'])){
                        $html[]='<div class="tonyMenu__box-right">'.$data['right'].'</div>';
                    }

                    if(!empty($data['btm']))
                    {
                        $html[]='<div class="tonyMenu__box-bottom">'.$data['btm'].'</div>';
                    }

                };
                if($level==0 && $hasChildren)$html[]='</div>';
                $html[]= '</li>';

            } else
            {
                if($level == 0)
                {
                    $html[]= '<li class="tonyMenu__item">';
                } else
                {
                    $html[]= '<li ' . $this->_getRenderedMenuItemAttributes($child) . '>';
                }

                if($level == 0)
                {
                    $html[]= '<a href="' . $child->getUrl() . '">';
                } else
                {
                    $html[]= '<a href="' . $child->getUrl() . '" ' . $outermostClassCode . '>';
                }

                //$html[]= ($level == 0)?'<span class="act-underline">':'<span>';
                $html[]= $this->escapeHtml($child->getName());
                if($level == 0){
                    if(!empty($category->getData('ys_category_lable')))
                        $html[]='<span class="badge badge--menu">'.$category->getData('ys_category_lable').'</span>';
                }

                $html[]= '</span>';
                $html[]= '</a>';

                if($level==0 && $hasChildren)$html[]='<div class="tonyMenu__megamenu tonyMenu__col-0-5-0 tonyMenu__simple" data-tm-width="300"
															 data-tm-align-horizontal="'.$category->getData('ys_data_tm_align_horizontal').'"
															 data-tm-align-vertical="'.$category->getData('ys_data_tm_align_vertical').'"
															 data-tm-animation="'.$category->getData('ys_data_tm_animation').'"
															 data-tm-duration="'.$category->getData('ys_data_tm_duration').'"
															 data-tm-emersion-distance="60">
																<div class="tonyMenu__box-center">
																<div class="tonyMenu__box-inner">
																	<ul class="tonyMenu__inner-list-items
																			   tonyMenu__inner-list-single
																			   tonyMenu__inner-col-1">';



                $html[]= $this->_addSubMenuSimple($child,$childLevel,$childrenWrapClass,$limit,1);
                if($level==0 && $hasChildren)$html[]='</ul><div class="clearfix"></div></div></div></div>';

                $html[]= '</li>';
            }

            $itemPosition++;
            $counter++;
        }


        $html = implode("\n", $html);
        return $html;
    }

    protected function _addSubMenuMegamenu($child, $childLevel, $childrenWrapClass, $limit,$data=[])
    {
        $html = '';
        if (!$child->hasChildren()) {
            return $html;
        }
        $level=$childLevel;
        $hasChildren=$child->hasChildren();

        $colStops = null;
        if ($childLevel == 0 && $limit) {
            $colStops = $this->_columnBrake($child->getChildren(), $limit);
        }

        if($level==1) {
            $html .='<ul class="tonyMenu__inner-list-items">';
        }elseif($level>1){
            $html .= '<ul class="level' . $childLevel . ' submenu">';
        }
        $html .= $this->_getHtml($child, $childrenWrapClass, $limit, $colStops);
        if($level>=1)$html .= '</ul>';



        return $html;
    }

    protected function _addSubMenuSimple($child, $childLevel, $childrenWrapClass, $limit, $type_simple=0)
    {
        $html = '';
        if (!$child->hasChildren()) {
            return $html;
        }
        $level=$childLevel;
        $hasChildren=$child->hasChildren();

        if($level>1){
            $html .= '<ul class="level' . $childLevel . '">';
        }
        $html .= $this->_getHtml($child, $childrenWrapClass, $limit);
        if($level>1)$html .= '</ul>';

        return $html;
    }

    public function getProducts($ids){
        $html = '';
        $ids = explode(',',$ids);
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $abstractProductBlock = $objectManager->get('\Magento\Catalog\Block\Product\AbstractProduct');
        foreach($ids as $key)
        {
            $product = $objectManager->get('Magento\Catalog\Model\Product')->load($key);
            $link=$objectManager->create('\Magento\Catalog\Model\ProductRepository')->getById($key);
            $image=$objectManager->create('\Magento\Catalog\Block\Product\AbstractProduct')->getImage($product,'category_page_list');
            $html.='<div>
                <div class="product_holder no-hover small">
                    <div class="product_inside">
                        <div class="image-box">
                            <a href="'.$link->getUrlModel()->getUrl($link).'">
                                <img src="'.$image->getImageUrl().'" alt="">
                            </a>
                        </div>
                        <h2 class="title">
							<a href="'.$link->getUrlModel()->getUrl($link).'">'.$product->getName().'</a>
						</h2>
                        <div class="price-box">
                            '.$objectManager->create('\Magento\Framework\Pricing\PriceCurrencyInterface')->format($product->getPrice(),true,0).'
                        </div>
                    </div>
                </div>
            </div>';
        }
        return $html;
    }
}