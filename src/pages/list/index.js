require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var _util = require('util')
var keywordTpl = require('./keywords.tpl')


var page = {
	keywords:[
		{item:[{name:'折扣'},{name:'低价每日抢'}]},
		{item:[{name:'大牌'},{name:'红旗'}]},
		{item:[{name:'女装'},{name:'连衣裙'}]},
		{item:[{name:'男装'},{name:'卫衣'},{name:'鞋子'}]},
		{item:[{name:'数码'},{name:'手机'},{name:'iPhone'}]},
		{item:[{name:'母婴'},{name:'奶粉辅食'}]},
		{item:[{name:'家居'},{name:'整理收纳'}]},
		{item:[{name:'美食'},{name:'各地特产'}]},
		{item:[{name:'美妆'},{name:'精致妆容'}]},
		{item:[{name:'箱包'},{name:'行李箱'}]}
	],
	init:function(){
		this.loadKeywords()
	},
	loadKeywords:function(){
		var html = _util.render(keywordTpl,{
			keywords:this.keywords
		});
		$(".keywords").html(html)
	}
}

$(function(){
	page.init();
})
