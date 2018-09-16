const _util = require('util/index.js');

const  _payment = {
	

	getPayment:function(data,success,error){
		_util.request({
			url:"/payment/pay",
			data:data,
			success:success,
			
			error:error

		})
	},
	getPaymenStatus:function(data,success,error){
		_util.request({
			url:"/payment/status",
			data:data,
			success:success,
			
			error:error

		})
	},
}
module.exports =   _payment;