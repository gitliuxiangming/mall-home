
var _util = require('util')


var _order = {
	getOrderProductList:function(success,error){
		_util.request({
			url:'order/getOrderProductList',
			method:'get',
			success:success,
			error:error
		})
	},
	createOrder:function(data,success,error){
		_util.request({
			url:'order',
			method:'post',
			data:data,
			success:success,
			error:error
		})
	},
	getOrderList:function(data,success,error){
		_util.request({
			url:'order/home/list',
			method:'get',
			data:data,
			success:success,
			error:error
		})
	},
	getOrderDetail:function(data,success,error){
		_util.request({
			url:"/order/home/detail",
			data:data,
			success:success,
			error:error

		})
	},
	updateCancel:function(data,success,error){
			_util.request({
			url:"/order/cancel",
			data:data,
			method:"put",
			success:success,
			error:error

		})
	}

	
}


module.exports = _order;