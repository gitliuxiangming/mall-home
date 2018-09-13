var _nav = require('pages/common/nav');
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
		this.$box=$('.cart-box');
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
	
	bindEvent:function(){
		var _this=this;
		//单个选择/取消
		this.$box.on('click','.select-one',function(){
			var $this = $(this);
			let productId = $this.parents('.cart-item').data('product-id')
			//选中
			// console.log(productId)
			if($this.is(':checked')){
				_cart.selectOne({productId:productId},function(cart){
					_this.renderCart(cart);
				},function(msg){
					_this.showPageError()
				})
			}	
			//取消
			else{
				_cart.unselectOne({productId:productId},function(cart){
					_this.renderCart(cart);
				},function(msg){
					_this.showPageError()
				})
			}
		});
		//全选/全不选
		this.$box.on('click','.select-all',function(){
			var $this = $(this);
			let productId = $this.parents('.cart-item').data('product-id')
			//选中
			if($this.is(':checked')){
				_cart.selectAll(function(cart){
					_this.renderCart(cart);
				},function(msg){
					_this.showPageError()
				})
			}
			//取消
			else{
				_cart.unselectAll(function(cart){
					_this.renderCart(cart);
				},function(msg){
					_this.showPageError()
				})
			}
		});

		//删除一个
		this.$box.on('click','.delete-one',function(){
			var $this = $(this);
			let productId = $this.parents('.cart-item').data('product-id')
			if(_util.confirm('你确定要删除该条购物车信息吗')){
				alert('ok')
				_cart.deleteOne({productId:productId},function(cart){
						_this.renderCart(cart);
				},function(){
					_this.showPageError()
				})
			}
		});

		//删除选中的所有
		this.$box.on('click','.delete-selected',function(){
			var $this = $(this);
			if(_util.confirm('你确定要删除该条购物车信息吗?')){
				_cart.deleteSelected(function(cart){
					_this.renderCart(cart);
				},function(msg){
					_this.showPageError()
				})
			}
		});

		//更新购物车数量
		this.$box.on('click','.count-btn',function(){
			var $this = $(this);
			let productId = $this.parents('.cart-item').data('product-id');
			var $input = $this.siblings('.count-input');
			var current = parseInt($input.val());
			var max = $input.data('stoke');
			var min = 1;
			var newCount = 0;
			//增加
			if($this.hasClass('plus')){
				if(current>=max){
					_util.showErrorMsg('只有这么多啦')
					return
				}
				newCount = current+1; 
			}
			//减少
			else if($this.hasClass('minus')){
				if(current <= min){
					_util.showErrorMsg('太少啦')
					return
				}
				newCount = current-1;
			}

			//修改数量
			_cart.updateCount({productId:productId,count:newCount},function(cart){
				_this.renderCart(cart);
			},function(msg){
				_this.showPageError()
			})
		});

		//结算
		this.$box.on('click','.btn-submit',function(){
			if(_this.cart && _this.cart.totalCartPrice > 0){
				window.location.href = './order-confirm.html'
			}else{
				_util.showErrorMsg('请选择商品后再提交！')
			}
		})



	},
	renderCart:function(cart){
		//重新渲染顶部的购物车的数量
		_nav.loadCartCount();
		//缓存购物车信息，用来提交结算
		this.cart = cart

		//购物车数据适配
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
	showPageError:function(){
		this.$box.html('<p class="empty-message">好像哪里出错了，刷新试试看</p>')
	},
	
}

$(function(){
	page.init()
});
