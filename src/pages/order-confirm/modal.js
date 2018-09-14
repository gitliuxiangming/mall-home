var _util = require('util');
var _cities = require('util/cities')

var _shipping = require('service/shipping');

var modalTpl = require('./modal.tpl');

var formErr = {
	show:function(msg){
		$('.error-item').show().find('.error-msg').text(msg)
	},
	hide:function(){
		$('.error-item').hide().find('.error-msg').text('')
	},
}

var _modal = {
	
	show:function(options){
		this.$box = $('.modal-box');
		this.options = options;
		this.lodaModal();
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		//关闭弹窗
		this.$box.find('.close').on('click',function(){
			_this.hide();
		})
		this.$box.find('.modal-container').on('click',function(e){
			e.stopPropagation()
		})
		//省份和城市的联动
		this.$box.find('.province-select').on('change',function(){
			_this.loadCities($(this).val())
		});
		//提交事件
		this.$box.find('#btn-submit').on('click',function(){
			_this.submit();
		})
		$('.enterEvent').on('keyup',function(e){
			if(e.keyCode == 13){
				_this.submit();
			}
		})
	},
	lodaModal:function(){
		var html = _util.render(modalTpl,{
			data:this.options.data || {},
			isEdit:!!this.options.data
		});
		this.$box.html(html);
		this.loadProvinces();
	},
	loadProvinces:function(){
		var provinces = _cities.getProvinces();
		var provincesSelectOptions = this.getSelectOptions(provinces);
		this.$box.find('.province-select').html(provincesSelectOptions);
		//省份的回填
		if(this.options.data && this.options.data.province){
			this.$box.find('.province-select').val(this.options.data.province);
			this.loadCities(this.options.data.province);
		}
	},
	loadCities:function(provinceName){
		var cities = _cities.getCities(provinceName);
		var citiesSelectOptions = this.getSelectOptions(cities);
		this.$box.find('.cities-select').html(citiesSelectOptions);
		//城市的回填
		if(this.options.data && this.options.data.city){
			this.$box.find('.cities-select').val(this.options.data.city);
		}
	},
	getSelectOptions:function(arr){
		let html = '<option value="">请选择</option>';
		for(var i = 0;i<arr.length;i++){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>';
		}
		return html;
	},
	submit:function(){
		var _this = this;
		//1.获取数据
		var formData = {
			name:$.trim($('[name="name"]').val()),
			province:$.trim($('[name="province"]').val()),
			city:$.trim($('[name="city"]').val()),
			address:$.trim($('[name="address"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			zip:$.trim($('[name="zip"]').val())
		}
		//2.验证数据
		var validateResult = this.validate(formData);

		//3.提交
		//验证成功
		if(validateResult.status){
			formErr.hide()
			//编辑地址
			if(this.options.data){
				formData.shippingId = this.options.data._id;
				_shipping.editShipping(formData,function(shippings){
					_util.showSuccessMsg('编辑地址成功');
					_this.hide()
					_this.options.success(shippings)
				},function(){
					formErr.show(message)
				})
			//新增地址
			}else{
				_shipping.addShipping(formData,function(shippings){
					_util.showSuccessMsg('添加地址成功');
					_this.hide()
					_this.options.success(shippings)
				},function(){
					formErr.show(message)
				})
			}
			
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
		if(!_util.validate(formData.name,"require")){
			result.msg = '用户名不能为空';
			return result;
		}
		//验证省份不能为空
		if(!_util.validate(formData.province,"require")){
			result.msg = '省份不能为空';
			return result;
		}
		//验证城市不能为空
		if(!_util.validate(formData.city,"require")){
			result.msg = '城市不能为空';
			return result;
		}
		//验证详细地址不能为空
		if(!_util.validate(formData.address,"require")){
			result.msg = '详细地址不能为空';
			return result;
		}
		//验证手机号不能为空
		if(!_util.validate(formData.phone,"require")){
			result.msg = '手机号不能为空';
			return result;
		}
		//验证手机号格式错误
		if(!_util.validate(formData.phone,"phone")){
			result.msg = '手机号格式错误';
			return result;
		}
		//验证邮箱不能为空
		if(!_util.validate(formData.zip,"require")){
			result.msg = '邮箱不能为空';
			return result;
		}

		result.status = true;
		return result;
	},
	hide:function(){
		this.$box.empty();
	}
}

module.exports = _modal;