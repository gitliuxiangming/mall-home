<div class="form-item">
{{#notEmpty}}

{{#order}}
<ul class="order-list clearfix">
	<li class="order-item">
		<span>订单号 : {{orderNo}}</span>
		
	</li>
	<li class="order-item">
		<span>创建时间 : {{createdTime}}</span>
		
	</li>
	<li class="order-item">
		<span>订单状态 : {{statusDesc}}</span>
		
	</li>
	<li class="order-item">
		<span>收件人 ：{{shipping.name}}({{shipping.phone}})</span>
		
	</li>
	
	<li class="order-item">
		<span>价格： ￥</span>
		<span class="payment">{{payment}}</span>
		
	</li>
	<li class="order-item">
		{{#needpay}}
		<a target="_blank" href="./payment.html?orderNo={{orderNo}}" class="btn payment">去支付</a>
		{{/needpay}}
		{{#cancel}}
		<a target="_blank" href="javascript:;" class="btn cancel">取消</a>
		{{/cancel}}
	</li>
</ul>

<ul class="product-header ">
	
	<li class="header-product">
		<span>商品</span>
	</li>
	<li class="header-price">
		单价
	</li>
	<li class="header-count">
		数量
	</li>
	<li class="header-count">
		小计
	</li>
	
</ul>

{{#productList}}
<ul class="product-item" data-product-id= "{{productList.product}}">
	
	<li class="product-info">
		<a href="./detail.html/productId = {{productList.product}}" class="link">
			<img src="{{img}}" alt="">
			<span>{{name}}</span>
		</a>
	</li>
	<li class="product-price">
		￥{{Price}}
	</li>
	<li class="product-price">
		￥{{count}}
	</li>
	<li class="product-totalprice">
		￥{{payment}}
	</li>

</ul>
{{/productList}}


{{/order}}
{{/notEmpty}}

{{^notEmpty}}

	<p class="empty-message">购物车空空如也!!!
	<a href="/" class="btn gohome-btn">立即去购物</a></p>

{{/notEmpty}}
</div>