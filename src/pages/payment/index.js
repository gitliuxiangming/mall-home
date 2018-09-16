require('./index.css');

require('pages/common/logo');
require('pages/common/footer');
require('pages/common/side');
require('pages/common/search');
require('util/pagination')

require('pages/common/nav');
const _payment =  require('../../service/payment');

const _util = require('util');
const _side = require('pages/common/side');
var tpl = require('./index.tpl')


var page={
	params:{
		orderNo:_util.getParamFromUrl('orderNo') || 1,
	},

	init:function(){
	
		this.onload();
	
	},

	onload:function(){
		var _this = this;
		if(_this.params.orderNo){

			_this.renderPayment()

		}
	},
	
	renderPayment:function(order){
		var _this = this;

		_payment.getPayment({orderNo:_this.params.orderNo},function(order){

					var html = _util.render(tpl,{
						order:order,	
					})

					$('.payment-box').html(html)
					_this.listenPaymentStatus()
				},function(){
					$('.payment-box').html('<p class= "empty-message">没有选中的订单商品</p>')
				})	

	},
	//监听支付状态说
	listenPaymentStatus:function(){
		var _this = this;
		window.setInterval(function(){
			_payment.getPaymenStatus({orderNo:_this.params.orderNo},function(result){
				if(result== true){
					window.location.href= './result.html?type=payment'
				}
			})
		},5000)
	}
	

	
	
}


$(function(){
	page.init();
})