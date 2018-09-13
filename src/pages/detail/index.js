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
		if (this.params.productId) {
			this.loadProductDetail();
		}
	},
	bindEvent:function(){
		var _this = this;
		//切换图片
		$('.detail-box').on('mouseenter','.product-small-img-item',function(){
			var $this=$(this);
			$this.addClass('active').siblings('.product-small-img-item').removeClass('active');
			var imgSrc = $this.find('img').attr('src');
			$('.product-main-img img').attr('src',imgSrc);
		})
		//购物数量处理
		$('.detail-box').on('click','.btn-count',function(){
			var $this=$(this);
			var $input = $('.count-input');
			var stoke = _this.stoke;
			var min =1;
			var current = parseInt($input.val());
			if($this.hasClass('plus')){
				$input.val(current >= stoke ? stoke : current+1)
			}else if($this.hasClass('minus')){
				$input.val(current > min ? current-1 : min)
			}
			if(current == stoke || current == min){
				return;
			}
		})
		//添加购物车
		$('.detail-box').on('click','.add-cart-btn',function(){
			_cart.addCart({
				productId:_this.params.productId,
				count:$('.count-input').val()
			},function(data){
				window.location.href = './result.html?type=addCart'
			},function(err){
				console.log(err)
			})
		})
	},
	loadProductDetail:function(){
		var _this = this;
		_product.getProductDetail({productId:this.params.productId},function(product){
			if(product){
				if (product.filePath) {
					product.image = product.filePath.split(',');
				} else {
					product.image = [require('images/product-default.jpg')]
				}
				product.mainImg = product.image[0];
				//缓存库存数量为了修改数量而定
				_this.stoke = product.stoke;
				var html = _util.render(tpl,product);
				$('.detail-box').html(html);
			}else{
				$('.detail-box').html('<p class="empty-message">您要找的商品去火星了</p>');
			}
			
		},function(msg){
			console.log(msg);
		})
	}
}

$(function(){
	page.init()
});