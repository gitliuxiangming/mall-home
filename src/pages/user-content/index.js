require('./index.css');

require('pages/common/logo');
require('pages/common/footer');
require('pages/common/side');
require('pages/common/search');


require('pages/common/nav');
const _user =  require('../../service/user');

const _util = require('util');
const _side = require('pages/common/side');
var tpl = require('./index.tpl')


var page={

	init:function(){
		this.onload();
		this.loadUserInfo();
	},
	onload:function(){
		_side.render('user-content')
	},
	loadUserInfo:function(){
		_user.getUserInfo(function(userInfo){
			var html = _util.render(tpl,userInfo)
			$('.content').html(html)
		})
	}
	
	
}


$(function(){
	page.init();
})
