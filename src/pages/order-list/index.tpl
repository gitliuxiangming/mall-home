{{#notEmpty}}
<div class="panel">
	<h2 class="panel-header">订单列表</h2>
	<div class="panel-body clearfix">
		<ul class="cart-title ">
			<li class="product-info">商品信息</li>
			<li class="product-price">单价</li>
			<li class="product-count">数量</li>
			<li class="product-totalPrice">小计</li>
		</ul>
		{{#list}}
			<ul class="order-title clearfix">
				<li class="order-no">
					<span class="label">订单号：</span>
					<span class="text">{{orderNo}}</span>
				</li>
				<li class="order-create-time">
					<span class="label">创建时间：</span>
					<!-- <span class="text">{{createdAt}}</span> -->
					<span class="text">{{createdTime}}</span>
				</li>
				<li class="order-status">
					<span class="label">订单状态：</span>
					<span class="text">{{statusDesc}}</span>
				</li>
				<li class="order-create-name">
					<span class="label">收件人：</span>
					<span class="text">{{shipping.name}}</span>
				</li>
				<li class="order-payment">
					<span class="label">订单金额：</span>
					<span class="text">{{payment}}</span>
				</li>
				<li class="order-detail">
					<a href="./order-detail.html?orderNo={{orderNo}}" class="link">查看更多</a>
				</li>
			</ul>
			{{#productList}}
				<ul class="cart-item clearfix">
					<li class="product-info">
						<a href="./detail.html?productId={{productId}}" class="link" target="_blank">
							<img src="{{image}}" alt="找不到">
							<span>{{name}}</span>
						</a>
					</li>
					<li class="product-price">
						￥{{price}}
					</li>
					<li class="product-count">
						<span>{{count}}</span>
					</li>
					<li class="product-totalPrice">
						￥{{totalPrice}}
					</li>
				</ul>
			{{/productList}}
		{{/list}}		
	</div>
</div>
{{/notEmpty}}
{{^notEmpty}}
<p class="empty-message">
	您还没有订单！！！
	<a href="./cart.html" class="btn gocart-btn">查看购物车</a>
</p>

{{/notEmpty}}