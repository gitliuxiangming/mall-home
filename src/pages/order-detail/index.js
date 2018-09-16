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
	params:{
		orderNo:_util.getParamFromUrl('orderNo') || 1,
	},
	init:function(){
	
		this.onload();
		this.loadInfo();
		this.bindEvent();
	},
	bindEvent:function(){
		var _this =  this;

		$('.order-detail').on("click",'.cancel',function(){
			if(_util.confirm("您确定取消订单吗？")){
				_order.updateCancel({orderNo:_this.params.orderNo},function(order){
					window.location.href = './order-list.html'
					_this.renderProductDetail(order)
				},function(){

				})
			}
			
		})
		
	},
	onload:function(){
		_side.render('order-list')
	},
	loadInfo:function(){
		var _this =  this;
		_order.getOrderDetail(this.params,function(order){
			console.log(order)
			_this.renderProductDetail(order)
		},function(msg){

		})
	},
	renderProductDetail:function(order){
		if(order){

			order.productList.forEach(product=>{
				if(product.filePath){
					if(product.image){
						product.img =product.filePath.split(',')[0]
					}else{
						product.img =  require('../../images/product-default.jpg')
					}
					order.createdTime = new  Date(order.createdAt).toLocaleString();
					return order;
				}
			})
		}
	
	var html = _util.render(tpl,{
		order:order,
		notEmpty:!!order,
		needpay:order.status == 10,
		cancel:order.status == 10
		})
		$('.order-detail').html(html)	

	},
	

	
	
}


$(function(){
	page.init();
})
