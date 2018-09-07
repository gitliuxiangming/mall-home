require('./index.css');

require('pages/common/logo');
require('pages/common/footer');
require('pages/common/side');
require('pages/common/search');


require('pages/common/nav');
const _user =  require('../../service/user');

const _util = require('util');
const _side = require('pages/common/side');

var formErr = {
	show:function(msg){
		$('.error-item').show().find('.error-msg').text(msg)
	},
	hide:function(){
		$('.error-item').hide().find('.error-msg').text('')
	},
}

//修改密码页面逻辑
var page = {
	init:function(){
		_side.render('user-update-password');
		this.bindEvent();
	},
	//绑定事件
	bindEvent:function(){
		var _self = this;
		$('#btn-submit').on('click',function(){
			_self.submit();
		})
		$('#btn-submit').on('keyup',function(){
			if(e.keyCode == 13){
				_self.submit();
			}
		})
	},
	submit:function(){
		//1.获取数据
		var formData = {
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val())
		}
		//2.验证数据
		var validateResult = this.validate(formData);

		//3.提交
		//验证成功
		if(validateResult.status){
			formErr.hide()
			_user.updatePassword(formData,function(){
				window.location.href = './result.html?type=updatePassword'
			},function(){
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
		if(formData.password != formData.repassword){
			result.msg = '两次密码不一致';
			return result;
		}

		result.status = true;
		return result;
	}
}

$(function(){
	page.init()
})


