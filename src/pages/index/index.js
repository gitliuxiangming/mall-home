require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/carousel')
require('./index.css')

var _util = require('util')
var keywordTpl = require('./keywords.tpl')
var carouselTpl = require('./carousel.tpl')
var floorlTpl = require('./floor.tpl')


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
		{categoryId:'5b95dc5d4db6202e10841160',image:require('images/carousel/carousel-1.jpg')},
		{categoryId:'5b95dc5d4db6202e10841160',image:require('images/carousel/carousel-2.jpg')},
		{categoryId:'5b95dc5d4db6202e10841160',image:require('images/carousel/carousel-3.jpg')},
		{categoryId:'5b95dc5d4db6202e10841160',image:require('images/carousel/carousel-4.jpg')},
		{categoryId:'5b95dc5d4db6202e10841160',image:require('images/carousel/carousel-5.jpg')},
		{categoryId:'5b95dc5d4db6202e10841160',image:require('images/carousel/carousel-6.jpg')},
		{categoryId:'5b95dc5d4db6202e10841160',image:require('images/carousel/carousel-7.jpg')},
		{categoryId:'5b95dc5d4db6202e10841160',image:require('images/carousel/carousel-8.jpg')},
	],
	floor:[
		{
			title:'F1 数码',
			item:[
				{categoryId:'5b95dc5d4db6202e10841160',text:'华为',image:require('images/floor/floor-1-01.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'小米',image:require('images/floor/floor-1-02.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'荣耀',image:require('images/floor/floor-1-03.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'vivo',image:require('images/floor/floor-1-04.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'oppo',image:require('images/floor/floor-1-05.jpg')},
			],
		},
		{
			title:'F2 服装',
			item:[
				{categoryId:'5b95dc5d4db6202e10841160',text:'裙子',image:require('images/floor/floor-2-01.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'体恤',image:require('images/floor/floor-2-02.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'蝙蝠衫',image:require('images/floor/floor-2-03.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'卫衣',image:require('images/floor/floor-2-04.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'衬衫',image:require('images/floor/floor-2-05.jpg')},
			],
		},
		{
			title:'F3 箱包',
			item:[
				{categoryId:'5b95dc5d4db6202e10841160',text:'男包',image:require('images/floor/floor-3-01.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'女包',image:require('images/floor/floor-3-02.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'行李箱',image:require('images/floor/floor-3-03.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'双肩包',image:require('images/floor/floor-3-04.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'单肩包',image:require('images/floor/floor-3-05.jpg')},
			],
		},
		{
			title:'F4 眼镜',
			item:[
				{categoryId:'5b95dc5d4db6202e10841160',text:'防辐射',image:require('images/floor/floor-4-01.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'司机眼镜',image:require('images/floor/floor-4-02.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'3D眼镜',image:require('images/floor/floor-4-03.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'色盲眼镜',image:require('images/floor/floor-4-04.jpg')},
				{categoryId:'5b95dc5d4db6202e10841160',text:'太阳镜',image:require('images/floor/floor-4-05.jpg')},
			],
		},
		
	],
	init:function(){
		this.loadKeywords()
		this.loadCarousel()
		this.loadFloor()
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
	},
	loadFloor:function(){
		var html = _util.render(floorlTpl,{
			floor:this.floor
		});
		$(".floor-wrap").html(html)
	}
}

$(function(){
	page.init();
})
