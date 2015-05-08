/**
 * jQuery leftRightSelect plugin
 * leftRightSelect是一个轻量级的左右选择jQuery插件
 * 主要实现左右选择、全选等功能，还有清空、设置列表值等功能
 * @name leftRightSelect
 * @author lanjingling - http://blog.csdn.net/liuxiao723846（刘晓）
 * @version 0.1
 * @copyright (c) 2015 lanjingling https://github.com/lanjingling
 */
(function($){
 	$.fn.leftRigthSel = function(setting){
		var _this = $(this);
		var defaults = {
			width:150,
			height:200,
			buttons:["rightBtn","rightAllBtn","leftBtn","leftAllBtn"],
			remoteData:true,
			leftUrl:'',
			leftParam:null,
			rightUrl:'',
			rightParam:null,
			leftData:[],
			rightData:[]
		};
		var option = $.extend(defaults, setting);
		
		createUI(option);
		btnListener();
		
		var _leftSel = $("#select1");
		var _rightSel = $("#select2");
		
		if (option.remoteData == false) {
			$.each(option.leftData,function(n,value) { 
				$('<option>',{val:value.id, text:value.text}).appendTo(_leftSel);
			});
			$.each(option.rightData,function(n,value) { 
				$('<option>',{val:value.id, text:value.text}).appendTo(_rightSel);
			});
		} else {
			if (option.leftUrl !='') {
				$.doAjax({
					url:option.leftUrl,
					data:option.leftParam,
					callback:function(_data){
						$.each(_data,function(n,value) {$('<option>',{val:value.id, text:value.text}).appendTo(_leftSel);});
					}
				});
			}
			if (option.rightUrl !='') {
				$.doAjax({
					url:option.rightUrl,
					data:option.rightParam,
					callback:function(_data){
						$.each(_data,function(n,value) {$('<option>',{val:value.id, text:value.text}).appendTo(_rightSel);});
					}
				});
			}
		}
		
		function createUI(_option) {
			var leftDiv = $('<div class="select-bar" style="float:left;"><div>');
			$('<select multiple="multiple" id="select1" style="width:'+_option.width+'px;height:'+_option.height+'px;padding:4px;"></select>').appendTo($(leftDiv));
			$(leftDiv).appendTo(_this);
			
			var btnsDiv = $('<div class="btn-bar" style="float:left;padding:0 20px;"></div>');
			if ($.inArray("rightBtn", _option.buttons) !=-1) {
				$('<span id="add"><input type="button" style="width:50px; height:30px; margin-top:10px; cursor:pointer;" value=">"/></span><br/>').appendTo($(btnsDiv));
			}
			if ($.inArray("rightAllBtn", _option.buttons) !=-1) {
				$('<span id="add_all"><input type="button" style="width:50px; height:30px; margin-top:10px; cursor:pointer;" value=">>"/></span><br/>').appendTo($(btnsDiv));
			}
			if ($.inArray("leftBtn", _option.buttons) !=-1) {
				$('<span id="remove"><input type="button" style="width:50px; height:30px; margin-top:10px; cursor:pointer;" value="<"/></span><br/>').appendTo($(btnsDiv));
			}
			if ($.inArray("leftAllBtn", _option.buttons) !=-1) {
				$('<span id="remove_all"><input type="button" style="width:50px; height:30px; margin-top:10px; cursor:pointer;" value="<<"/></span>').appendTo($(btnsDiv));
			}
			$(btnsDiv).appendTo(_this);
			
			var rightDiv = $('<div class="select-bar" style="float:left;"><div>');
			$('<select multiple="multiple" id="select2" style="width:'+_option.width+'px;height:'+_option.height+'px;padding:4px;"></select>').appendTo($(rightDiv));
			$(rightDiv).appendTo(_this);
		}
		
		function btnListener () {
			$('#add').click(function(){ 
				//获取选中的选项，删除并追加给对方 
				$('#select1 option:selected').appendTo('#select2'); 
			}); 
			
			//移到左边 
			$('#remove').click(function(){ 
				$('#select2 option:selected').appendTo('#select1'); 
			}); 
			
			//全部移到右边 
			$('#add_all').click(function(){ 
				//获取全部的选项,删除并追加给对方 
				$('#select1 option').appendTo('#select2'); 
			}); 
			
			//全部移到左边 
			$('#remove_all').click(function(){ 
				$('#select2 option').appendTo('#select1'); 
			}); 
			
			//双击选项 
			$('#select1').dblclick(function(){ //绑定双击事件 
				//获取全部的选项,删除并追加给对方 
				$("option:selected",this).appendTo('#select2'); //追加给对方 
			}); 
			
			//双击选项 
			$('#select2').dblclick(function(){ 
				$("option:selected",this).appendTo('#select1'); 
			}); 
		}
		
		this.loadLeft = function(_obj){
			if (_obj !=null && _obj != "") {
				var type = typeof _obj;
				if ('object' == type) {
					if (isArray(_obj) || Array == _obj.constructor) {
						_leftSel.empty();
						$.each(_obj,function(n,value) { 
							$('<option>',{val:value.id, text:value.text}).appendTo(_leftSel);
						});
					}
				}
				if ('string' == type){
					_leftSel.empty();
					$.doAjax({
						url:_obj,
						//data:option.leftParam,
						callback:function(_data){
							$.each(_data,function(n,value) {$('<option>',{val:value.id, text:value.text}).appendTo(_leftSel);});
						}
					});
				}
			} else {
				alert("easyUI>leftRightSel：arguments is error!");
				return false;
			}
		};
		this.loadRight = function(_obj){
			if (_obj !=null && _obj != "") {
				var type = typeof _obj;
				if ('object' == type) {
					if (isArray(_obj) || Array == _obj.constructor) {
						_rightSel.empty();
						$.each(_obj,function(n,value) { 
							$('<option>',{val:value.id, text:value.text}).appendTo(_rightSel);
						});
					}
				}
				if ('string' == type){
					_rightSel.empty();
					$.doAjax({
						url:_obj,
						//data:option.leftParam,
						callback:function(_data){
							$.each(_data,function(n,value) {$('<option>',{val:value.id, text:value.text}).appendTo(_rightSel);});
						}
					});
				}
			} else {
				alert("easyUI>leftRightSel：arguments is error!");
				return false;
			}
		};
		this.getRightDatas = function(){
			var retArray = [];
			function fun(_val,_tex) {
				this.value = _val;
				this.text = _tex;
			}
			var rightOpes = _rightSel[0].options;
			for (var i=0;i<rightOpes.length;i++) {
				retArray.push(new fun(rightOpes[i].value,rightOpes[i].text));
			}
			return retArray;
		};
		//清空
		this.cleanAll = function() {
			_leftSel.empty();
			_rightSel.empty();
		};
		//清空
		this.cleanLeft = function() {
			_leftSel.empty();
		};
		//清空
		this.cleanRight= function() {
			_rightSel.empty();
		};
		return this;
	};
})(jQuery);