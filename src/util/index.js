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
		window.location.href = '../user-login.html'
	}
}

module.exports = _util;