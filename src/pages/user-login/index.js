require('./index.css')
require('pages/common/logo')
require('pages/common/footer')

var _util = require('util')
var _user = require('../../service/user/')
var formErr = {
	show:function(msg){
		$('.error-item').show().find('.error-msg').text(msg)
	},
	hide:function(){
		$('.error-item').hide().find('.error-msg').text('')
	},
}

//登陆页面逻辑
var page = {
	init:function(){
		this.bindEvent();
	},
	//绑定事件
	bindEvent:function(){
		var _self = this;
		$('#btn-submit').on('click',function(){
			_self.submit();
		})
		$('.enterEvent').on('keyup',function(e){
			if(e.keyCode == 13){
				_self.submit();
			}
		})
	},
	submit:function(){
		//1.获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val())
		}
		//2.验证数据
		var validateResult = this.validate(formData);

		//3.提交
		//验证成功
		if(validateResult.status){
			formErr.hide()
			_user.login(formData,function(){
				window.location.href = _util.getParamFromUrl('redirect') || './index.html'
			},function(message){
				formErr.show(message)
			})
		}else{
			formErr.show(validateResult.msg)
		}
		
		//验证失败
	},
	validate:function(formData){
		var result = {
			status:false,
			msg:''
		}
		//验证用户名不能为空
		if(!_util.validate(formData.username,"require")){
			result.msg = '用户名不能为空';
			return result;
		}
		//验证用户名格式错误
		if(!_util.validate(formData.username,"username")){
			result.msg = '用户名格式错误';
			return result;
		}
		//验证密码不能为空
		if(!_util.validate(formData.password,"require")){
			result.msg = '密码不能为空';
			return result;
		}
		//验证密码格式错误
		if(!_util.validate(formData.password,"password")){
			result.msg = '密码格式错误';
			return result;
		}

		result.status = true;
		return result;
	}
}

$(function(){
	page.init()
})

