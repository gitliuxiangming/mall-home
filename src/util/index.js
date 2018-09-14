var Hogan = require('hogan.js')

var _util = {
	request:function(params){
		var _this=this;
		$.ajax({
			url:params.url || '',
			method:params.method || 'get',
			dataType:params.dataType || 'json',
			data:params.data || '',
			success:function(result){
				if(result.code == 0){
					params.success && params.success(result.data)
				}
				else if(result.code == 10){
					_this.doLogin();
				}
				else if(result.code == 1){
					params.error && params.error(result.message)
				}
			},
			error:function(err){
				params.error && params.error(err.message)
			}
		})
	},
	showErrorMsg:function(msg){
		alert(msg)
	},
	showSuccessMsg:function(msg){
		alert(msg)
	},
	confirm:function(msg){
		return window.confirm(msg)
	},
	render:function(tmp,data){
		var template = Hogan.compile(tmp);
		var html = template.render(data);
		return html;
	},
	doLogin:function(){
		window.location.href = 'user-login.html?redirect='+decodeURIComponent(window.location.href)
	},
	goHome:function(){
		window.location.href = '/'
	},
	getParamFromUrl:function(key){
        var URL = window.location.search.substr(1);
		var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
		var result = URL.match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	validate:function(value,type){
		var value = $.trim(value)
		//非空验证
		if(type === 'require'){
			return !!value
		}
		//用户名格式
		if(type === 'username'){
			return /^[a-zA-Z0-9_]{3,10}$/.test(value)
		}
		//密码格式
		if(type === 'password'){
			return /^[a-zA-Z0-9_]{3,10}$/.test(value)
		}
		//手机号格式
		if(type === 'phone'){
			return /^1[3578]\d{9}$/.test(value)
		}
		//密码格式
		if(type === 'email'){
			return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
		}


	}
}

module.exports = _util;