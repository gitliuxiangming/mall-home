var _nav = require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('util/pagination');
require('./index.css');


var _util = require('util');
var _product = require('service/product');
var _cart = require('service/cart');
var productTpl = require('./product.tpl')
var shippingTpl = require('./shipping.tpl')
var page = {
	init: function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadShippingList();
		this.loadProductList();
	},
	bindEvent:function(){
		var _this=this;
	},
	loadShippingList:function(){
		var _this=this;
		this.rederShipping()
	},
	rederShipping:function(){
		var html = _util.render(shippingTpl)
		$('.shipping-box').html(html);
	},
	loadProductList:function(){
		var _this=this;
		var html = _util.render(productTpl)
		$('.product-box').html(html);
	},

	
}

$(function(){
	page.init()
});
