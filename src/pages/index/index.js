require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/carousel')
require('./index.css')

var _util = require('util')
var keywordTpl = require('./keywords.tpl')
var carouselTpl = require('./carousel.tpl')


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
	carousel:[
		{categoryId:'1111',image:require('images/carousel/carousel-1.jpg')},
		{categoryId:'2222',image:require('images/carousel/carousel-2.jpg')},
		{categoryId:'3333',image:require('images/carousel/carousel-3.jpg')},
		{categoryId:'3333',image:require('images/carousel/carousel-4.jpg')},
		{categoryId:'3333',image:require('images/carousel/carousel-5.jpg')},
		{categoryId:'3333',image:require('images/carousel/carousel-6.jpg')},
		{categoryId:'3333',image:require('images/carousel/carousel-7.jpg')},
		{categoryId:'3333',image:require('images/carousel/carousel-8.jpg')},
	],
	init:function(){
		this.loadKeywords()
		this.loadCarousel()
	},
	loadKeywords:function(){
		var html = _util.render(keywordTpl,{
			keywords:this.keywords
		});
		$(".keywords").html(html)
	},
	loadCarousel:function(){
		
		var html = _util.render(carouselTpl,{
			carousel:this.carousel
		});
		$(".carousel").html(html)
		

	    var $carousel = $('.carousel').unslider({
	    	dots:true,
	    	key:true
	    });
	   
	    $('.arrow').on('click',function(){
	    	var direction = $(this).hasClass('next') ? 'next' : 'prev';
	    	$carousel.data('unslider')[direction]();
 	    })

	    
	    
	}
}

$(function(){
	page.init();
})
