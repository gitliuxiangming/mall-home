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
	init: function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadShoppingList();
		this.loadProductList();
	},
	bindEvent:function(){
		var _this=this;
	},
	loadProductList:function(){
		var _this=this;
	},
	rederShopping:function(){
		var _this=this;
	}
	loadProductList:function(){
		var _this=this;
	},

	
}

$(function(){
	page.init()
});
