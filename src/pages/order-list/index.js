require('./index.css');

require('pages/common/logo');
require('pages/common/footer');
require('pages/common/side');
require('pages/common/search');
require('util/pagination')

require('pages/common/nav');
const _order =  require('../../service/order');

const _util = require('util');
const _side = require('pages/common/side');
var tpl = require('./index.tpl')


var page={
	listParams:{
		page:_util.getParamFromUrl('page') || 1,
	},
	init:function(){
		this.initPagination();
		this.onload();
		this.loadOrderList();
	},
	onload:function(){
		_side.render('order-list');
	},
	initPagination:function(){
		var _this = this;
		var $pagination = $(".pagination-box")

		$pagination.on('page-change',function(e,value){
			console.log(value)
			_this.listParams.page = value;
			_this.loadOrderList()
		})
		$pagination.pagination()
	},
	loadOrderList:function(){
		var _this = this;
		_order.getOrderList(_this.listParams,function(orders){
			let list = orders.list.map(order=>{
				order.productList.forEach(product=>{
					if(product.filePath){
						product.image = product.filePath.split(',',1)
					}else{
						product.image = [require('images/product-default.jpg')]
					}
				})
				order.createdTime = new Date(order.createdAt).toLocaleString()
				return order;
			})
			var html = _util.render(tpl,{
				list:orders.list,
				notEmpty:!!orders.list.length
			})
			
			$('.order-list').html(html)

			$('.pagination-box').pagination('render',{
				current:orders.current,
				total:orders.total,
				pageSize:orders.pageSize
			})
		},function(msg){
			$('.order-list').html('<p class="empty-message">获取订单信息错误</p>')
		})
	}
	
	
}


$(function(){
	page.init();
})
