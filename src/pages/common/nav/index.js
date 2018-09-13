
require('./index.css')
var _user = require('service/user')
var _util = require('util')
var _cart = require('service/cart')

var nav = {
	init:function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	bindEvent:function(){
		$('#logout').on('click',function(){
			_user.logout(function(result){
				window.location.reload();
			},function(message){
				_util.showErrorMsg(message)
			})
		})
	},
	loadUserInfo:function(){
		_user.getUserName(function(userInfo){
			$('.not-login').hide()
			$('.login').show().find('.username').text(userInfo.username)
		})
	},
	loadCartCount:function(){
		_cart.getCartCount(function(count){
			$('.nav-list .cart-num').text(count || 0)
		},function(){
			$('.nav-list .cart-num').text(0)
		})
	},
}

module.exports = nav.init();