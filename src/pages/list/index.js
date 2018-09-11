require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
require('util/pagination')

var _util = require('util')
var _product = require('service/product')
var tpl = require('./index.tpl')


var page = {
	listParams:{
		keyword:_util.getParamFromUrl('keyword') || '',
		categoryId:_util.getParamFromUrl('categoryId') || '',
		page:_util.getParamFromUrl('page') || 1,
		orderBy:_util.getParamFromUrl('orderBy') || 'default'
	},
	init:function(){
		this.initPagination();
		this.bindEvent()
		this.loadProductList()
	},
	initPagination:function(){
		var _this = this;
		var $pagination = $(".pagination-box")
		$pagination.on('page-change',function(e,value){
			_this.listParams.page = value;
			_this.loadProductList()
		})
		$pagination.pagination()
	},
	bindEvent:function(){
		var _this=this;
		$('.sort-item').on('click',function(){
			var $this = $(this);
			//如果点击的是默认排序
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return;
				}
				$this.addClass('active').siblings('.sort-item').removeClass('active')
				_this.listParams.orderBy = 'default'
			}else if($this.hasClass('price')){
				$this.addClass('active').siblings('.sort-item').removeClass('active')
				if(!$this.hasClass('asc')){
					$this.addClass('asc').removeClass('desc')
					_this.listParams.orderBy = 'price_asc'
				}else{
					$this.addClass('desc').removeClass('asc')
					_this.listParams.orderBy = 'price_desc'
				}
			}
			_this.listParams.page = 1;
			_this.loadProductList();
		})
		
	},
	loadProductList:function(){
		this.listParams.categoryId
		?(delete this.listParams.keywords)
		:(delete this.listParams.categoryId)

		_product.getProductList(this.listParams,function(result){
			//成功时的函数
			var list=result.list.map(function(product){
				// console.log(product)
				if(product.filePath){
					// console.log('adfasdfasdf',product.filePath)
					product.image = product.filePath.split(',',1)

				}else{
					product.image = require('images/product-default.jpg')
				}
				return product;
			})			
			var html=_util.render(tpl,{
				list:result.list
			})
			$('.product-list-box').html(html)

			$('.pagination-box').pagination('render',{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize
			})
		},function(err){
			console.log(err)
		})
	}
}

$(function(){
	page.init();
})
