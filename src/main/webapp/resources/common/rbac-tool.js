



var Common = {
    //EasyUI用DataGrid用日期格式化
    TimeFormatter: function (value, rec, index) {
        if (value == undefined) {
            return "";
        }
        var datetime = new Date(value);
		  var year = datetime.getFullYear();
		  var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
		  var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
		  var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
		  var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
		  var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
		  return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
    }
};

/**
 * 去前后空格
 */
String.prototype.Trim = function () {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
function trim(str) {
	   str =  str.replace(/^\s+/, '');
	 for (var i = str.length - 1; i >= 0; i--) {
	 if (/\S/.test(str.charAt(i))) {
	 str = str.substring(0, i + 1);
	 break;
	 }
	 }
	 return str;
	}
/**
 *开始日期与结束日期比较
 *startDate晚于endDate 返回false
 */
dateCompare = function (startDate, endDate) {
	var arr = startDate.split("-");
	var starttime = new Date(arr[0], arr[1], arr[2]);
	var starttimes = starttime.getTime();
	var arrs = endDate.split("-");
	var lktime = new Date(arrs[0], arrs[1], arrs[2]);
	var lktimes = lktime.getTime();
	if (starttimes > lktimes) {
		return false;
	} else {
		return true;
	}
};
/**
 *查询当前日期
 *返回String
 */
getNowFormatDate = function () {
	var day = new Date();
	var Year = 0;
	var Month = 0;
	var Day = 0;
	var CurrentDate = ""; 
	//初始化时间
	//Year= day.getYear();//有火狐下2008年显示108的bug 
	Year = day.getFullYear();//ie火狐下都可以 
	Month = day.getMonth() + 1;
	Day = day.getDate(); 
	//Hour = day.getHours();
	// Minute = day.getMinutes();
	// Second = day.getSeconds(); 
	CurrentDate += Year + "-";
	if (Month >= 10) {
		CurrentDate += Month + "-";
	} else {
		CurrentDate += "0" + Month + "-";
	}
	if (Day >= 10) {
		CurrentDate += Day;
	} else {
		CurrentDate += "0" + Day;
	}
	return CurrentDate;
};

/**
 * 格式化TimeStamp类型时间串
 * 返回格式为“2013-12-25 09:53:22”
 */
formatTimeStampDate = function (date) {
	var datetime=new Date(date);
    var year=datetime.getFullYear();    
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds(); 
    return year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;    
};

/**
 * 格式化时间
 * @param date
 * @returns 格式为“2013-12-25”
 */
formatDate = function (date){
	var datetime=new Date(date);
    var year=datetime.getFullYear();    
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year+"-"+month+"-"+date;    
};
/**
 * 设置等比宽度
 * @param percent
 * @param num
 * @returns {Number}
 */
getWidth = function(percent, num) {
	//var leftdivwidth = $('.ui-layout-west', window.parent.document).width();
	var allwidth = $(window).width() - 200;
	if (num == null) {
		return allwidth * percent - 2;
	} else {
		return allwidth / num ;
	}
};

//js方法：序列化表单 			
function serializeForm(form){
	var obj = {};
	$.each(form.serializeArray(),function(index){
		alert(obj[this['name']]);
		if(obj[this['name']]){
			obj[this['name']] = obj[this['name']] + ','+this['value'];
		} else {
			obj[this['name']] =this['value'];
		}
	});
	return obj;
}

/**
 *将form表单元素的值序列化成JSON对象
 *form 表单名字
 *(注意如果是保存和修改的时候请注意,如果Form中有属性值为null会转成"",
 *所以如果有ID为NULL也会传一个空字符串,后台如果用saveorupdate方法的话会执行update方法)
 */
$.fn.serializeObject = function()  
{  
   var o = {};  
   var a = this.serializeArray();  
   $.each(a, function() { 
	   if(this.name != 'undefined'){
		   if (o[this.name]) {  
	           if (!o[this.name].push) {  
	               o[this.name] = [o[this.name]];  
	           }  
	           o[this.name].push(this.value || '');  
	       } else {  
	           o[this.name] = this.value || '';
	       }  
	   }
   });  
   return o;  
};
/**
 * 根据编码的code值和data数组，展示文件值。
 */
function showTextByVal(val,record){
	var data =record.data;
	if(data instanceof Array){
		var realVal="";
		for(var p in data){
			if(data[p][record.valueField]==val){
				realVal=data[p][record.textField];
				return realVal||"";
			}
		}
		return realVal||val;
	}
	return val||"";
}
/**
 * 遮罩层处理
 */
(function(){ 
$.extend($.fn,{ 
	mask: function(msg,maskDivClass){ 
		//this.unmask(); 
		// 参数 
		var op = { 
			opacity: 0.8, 
			z: 10000, 
			bgcolor: '#ccc' 
		}; 
		var original=$(document.body); 
		var winWidth=$(window.document).outerWidth()?$(window.document).outerWidth():$(window.document).width();
		var docWidth=$(document.body).outerWidth()? $(document.body).outerWidth():$(document.body).width();
		var winHeight=$(window.document).outerHeight()?$(window.document).outerHeight():$(window.document).height();
		var docHeight=$(document.body).outerHeight()?$(document.body).outerHeight():$(document.body).height();
		var maskWidth=winWidth>docWidth?winWidth:docWidth;
		var maskHeight=winHeight>docHeight?winHeight:docHeight;
		var positionO={top:0,left:0}; 
		if(this[0] && this[0]!==window.document){ 
			original=this; 
			if(this[0] !== window){
				//positionO=original.position();
				positionO={top:original.scrollTop(),left:original.scrollLeft()};
			} 
			maskWidth=original.outerWidth()?original.outerWidth():original.width(); 
			maskHeight=original.outerHeight()?original.outerHeight():original.height(); 
		}
		var maskDiv  = original.find("> div.maskdivgen");
		if(!maskDiv||maskDiv.length<1){
			// 创建一个 Mask 层，追加到对象中 
			maskDiv=$('<div class="maskdivgen"> </div>'); 
			if(original[0] === window)
				$(document.body).append(maskDiv);
			else
				maskDiv.appendTo(original);
		}
		maskDiv.css({ 
			position: 'absolute', 
			top: positionO.top, 
			left: positionO.left, 
			'z-index': op.z, 
			width: maskWidth, 
			height:maskHeight, 
			'background-color': op.bgcolor, 
			opacity: 0 
		}); 
		if(maskDivClass){ 
			maskDiv.addClass(maskDivClass); 
		} 
		if(msg){ 
			var msgDiv=$('<div style="position:absolute;border:#6593cf 1px solid; padding:2px;background:#ccca"><div style="line-height:24px;border:#a3bad9 1px solid;background:white;padding:2px 10px 2px 10px">'+msg+'</div></div>'); 
			msgDiv.appendTo(maskDiv); 
			var widthspace=(maskDiv.width()-msgDiv.width()); 
			var heightspace=(maskDiv.height()-msgDiv.height()); 
			msgDiv.css({ 
				cursor:'wait', 
				top:(heightspace/2-2), 
				left:(widthspace/2-2) 
			}); 
		} 
		maskDiv.fadeIn('fast', function(){ 
			// 淡入淡出效果 
			$(this).fadeTo('slow', op.opacity); 
			}) 
			return maskDiv; 
		}, 
		unmask: function(){ 
			var original=$(document.body); 
			if(this[0] && this[0]!==window.document){ 
				if(this[0] !== window)
				original=$(this[0]); 
			} 
			var maskDiv = original.find("> div.maskdivgen");
			if(maskDiv) 
				maskDiv.fadeOut('slow',0,function(){ 
				$(this).remove(); 
			}); 
		} 
	}); 
})(); 
/**
*
* uucAjax	扩展jquery的 ajax
*	增加 ismask: true | false 是否需要提交后遮罩功能，防止重复提交。
		maskTarget:null,被遮罩对象,不设置则遮罩最顶层窗口
		maskInfo:'' ,遮罩层提示信息，为空不显示提示信息，不为空则显示
*	增加默认超时设置
*  使用样例：
*		$.uucAjax({
			url:ctx+"/treeManager/orgTree.action",
			ismask:true, //非必须，是否遮罩，默认为true
			maskTarget:$("#test"), //非必须，不设置则默认遮罩整个浏览器窗口
			maskInfo:'正在处理...', //非必须，遮罩提示信息，显示设置为空则不提示
			success:function(aa){
				$("#zzz").append("<li>bbb</li>");
			}
		});
*
*/
$.extend({
	uucAjax:function(url, options) {
		var $this = this;
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}
		var defaultOptions = {
			timeout:$.ajaxSettings.timeout,
			beforeSend:function(){return true;},
			success:function(){return true;},
			error: $.ajaxSettings.error,
			ismask: true,	//是否遮罩，默认为true，遮罩
			maskTarget:null, //被遮罩对象,不设置则遮罩最顶层窗口
			maskInfo:'正在处理...'//遮罩提示信息
		};
		
		options = $.extend(true, defaultOptions, options);
		var topWindow = window;
		var tmp = $(document.body);
		if(tmp.height()>$(topWindow).height())
			topWindow = tmp;
		var maskTarget = options.maskTarget;
		if(options.beforeSend && options.ismask){
			var oldBeforeSend  = options.beforeSend;
			options.beforeSend = function(){
				if(maskTarget)
					$(maskTarget).mask(options.maskInfo);
				else 
					$(topWindow).mask(options.maskInfo);
				return oldBeforeSend();
			}
		}
		
		if(options.error && options.ismask){
			var oldError  = options.error;
			options.error = function(data, textStatus, jqXHR){
				if(maskTarget)
					$(maskTarget).unmask();
				else 
					$(topWindow).unmask();
				$(document.body).unmask();
				return oldError(data, textStatus, jqXHR);
			}
		}
		
		if(options.success && options.ismask){
			var oldSuccess  = options.success;
			options.success = function(data, textStatus, jqXHR){
				if(maskTarget)
					$(maskTarget).unmask();
				else 
					$(topWindow).unmask();
				return oldSuccess(data, textStatus, jqXHR);
			}
		}
		
		if(options.complete && options.ismask){
			var oldComplete  = options.complete;
			options.complete = function(data, textStatus, jqXHR){
				if(maskTarget)
					$(maskTarget).unmask();
				else 
					$(topWindow).unmask();
				return oldComplete(data, textStatus, jqXHR);
			}
		}
	
		return jQuery.ajax(defaultOptions);
	}
});

//手机自定义验证
$.extend($.fn.validatebox.defaults.rules, {
phone: {
  validator: function(value){
  if(/^1\d{10}$/.test(value))
  {
    // alert('t'+value);
    return true;
  }else
  {
   //alert('false '+value);
     return false;
  }
    
  },
  message: '请输入正确手机格式'
},
//验证QQ
qqRex: {
	  validator: function(value){
	  var rex=/^\d{1,12}$/;
	  //var rex=/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
	  //区号：前面一个0，后面跟2-3位数字 ： 0\d{2,3}
	  //电话号码：7-8位数字： \d{7,8
	  //分机号：一般都是3位数字： \d{3,}
	   //这样连接起来就是验证电话的正则表达式了：/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/		 
	  if(rex.test(value))
	  {
	    // alert('t'+value);
	    return true;
	  }else
	  {
	   //alert('false '+value);
	     return false;
	  }
	    
	  },
	  message: '请输入12位数字'
	},

	//验证座机
phoneRex: {
		  validator: function(value){
		  //区号：前面一个0，后面跟2-3位数字 ： 0\d{2,3}
		  //电话号码：7-8位数字： \d{7,8
		  //分机号：一般都是3位数字： \d{3,}
		   //这样连接起来就是验证电话的正则表达式了：/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/		 
		  var rex2=/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
		  if(rex2.test(value))
		  {
		    // alert('t'+value);
		    return true;
		  }else
		  {
		   //alert('false '+value);
		     return false;
		  }
		    
		  },
		  message: '请输入010-12345678的座机格式'
		},
	//供应商标识只能是数字和下划线和英文
	suppliersIdRex:{
		 validator: function(value){
			  //区号：前面一个0，后面跟2-3位数字 ： 0\d{2,3}
			  //电话号码：7-8位数字： \d{7,8
			  //分机号：一般都是3位数字： \d{3,}
			   //这样连接起来就是验证电话的正则表达式了：/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/		 
			  var rex2=/^[a-zA-Z0-9_]{1,32}$/;
			  if(rex2.test(value))
			  {
			    // alert('t'+value);
			    return true;
			  }else
			  {
			   //alert('false '+value);
			     return false;
			  }
			    
			  },
			  message: '请输入英文字母、数字、下划线'
	}	
});
$.extend($.fn.datagrid.methods, {
	fixRownumber : function (jq) {
		return jq.each(function () {
			var panel = $(this).datagrid("getPanel");
			//获取最后一行的number容器,并拷贝一份
			var clone = $(".datagrid-cell-rownumber", panel).last().clone();
			//由于在某些浏览器里面,是不支持获取隐藏元素的宽度,所以取巧一下
			clone.css({
				"position" : "absolute",
				left : -1000
			}).appendTo("body");
			var width = clone.width("auto").width();
			//默认宽度是25,所以只有大于25的时候才进行fix
			if (width > 25) {
				//多加5个像素,保持一点边距
				$(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 5);
				//修改了宽度之后,需要对容器进行重新计算,所以调用resize
				$(this).datagrid("resize");
				//一些清理工作
				clone.remove();
				clone = null;
			} else {
				//还原成默认状态
				$(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");
			}
		});
	}
});


$.extend($.fn.validatebox.defaults.rules, {
    /*必须和某个字段相等*/
    equalTo: { validator: function (value, param) { return $(param[0]).val() == value; }, message: '字段不匹配' }
   });
