

require('./index.css')

var _util = require('util')

//搜索页面逻辑
var page = {
	init:function(){
		this.onload();
		this.bindEvent();
	},
	//绑定事件
	onload:function(){
		//搜索框关键字回填
		var _self = this;
		var keyword = _util.getParamFromUrl('keyword')
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent:function(){
		var _self = this;
		$('#btn-search').on('click',function(){
			_self.submit();
		})
		$('#search-input').on('keyup',function(e){
			if(e.keyCode == 13){
				_self.submit();
				
			}
		})
	},
	submit:function(){
		var _self = this;
		var keyword = $.trim($('#search-input').val());
		window.location.href = "./list.html?keyword="+keyword
		/*if(keyword){
			window.location.href = "./list.html?keyword="+keyword
		}else{
			_util.goHome()
		}*/
	}
}

$(function(){
	page.init()
})

