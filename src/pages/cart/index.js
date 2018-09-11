require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('util/pagination');
require('./index.css');


var _util = require('util');
var _product = require('service/product');
var _cart = require('service/cart');
var tpl = require('./index.tpl')
var page = {
	params:{
		productId:_util.getParamFromUrl('productId') || '',
	},
	init: function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadCart();
	},
	loadCart:function(){
		var _this=this;
		_cart.getCart(function(result){
			_this.renderCart(result);
		},function(err){
			console.log(err)
		})

	},
	renderCart:function(cart){
		cart.cartList.forEach(item=>{
			if(item.product.filePath){
				item.product.image = item.product.filePath.split(',',1)
			}else{
				item.product.image = [require('images/product-default.jpg')]
			}
		})
		cart.notEmpty = !!cart.cartList.length;
		var html = _util.render(tpl,cart);
		$('.cart-box').html(html);
	},
	bindEvent:function(){
		var _this=this;
		//单个选择/取消
		$('.cart-box').on('click','.select-one',function(){
			var $this = $(this);
			let productId = $this.parents('.cart-item').data('product-id')
			//选中
			if($this.is(':checked')){
				_cart.selectOne({productId:productId},function(cart){
					_this.renderCart(cart);
				},function(msg){
					console.log(msg)
				})
			}	
			//取消
			else{
				_cart.unselectOne({productId:productId},function(cart){
					_this.renderCart(cart);
				},function(msg){
					console.log(msg)
				})
			}
		})
	},
	showPageError:function(){
		$('.cart-box').html('<p class="empty-message">好像哪里出错了，刷新试试看</p>')
	}
}

$(function(){
	page.init()
});
