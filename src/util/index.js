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

				}
				else if(result.code == 10){
					_this.doLogin();
				}
				else if(result.code == 1){
					params.error && params.error(result.message)
				}
			},
			error:function(err){
				params.error && params.error(result.message)
			}
		})
	},
	showErrorMsg:function(msg){
		alert(msg)
	},
	doLogin:function(){
		window.location.href = 'user-login.html'
	},
	goHome:function(){
		window.location.href = '/'
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


	}
}

module.exports = _util;