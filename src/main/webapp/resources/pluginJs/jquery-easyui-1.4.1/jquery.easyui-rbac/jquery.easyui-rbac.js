/**
 *  combobox的空选择项设置。
 */
$.fn.combobox.defaults.emptyText="请选择";

$.fn.form.methods.clearValidateBox=function(jq) {
	jq.find('.easyui-validatebox').each(function(){
		$(this).removeClass("validatebox-invalid");
	});
	jq.find('.validatebox-invalid').each(function(){
		$(this).removeClass("validatebox-invalid");
	});
};

/**
 * 修改了form验证不了combobox的bug。
 */
$.fn.form.methods.validate=function(jq){
	var target =jq[0];
	if ($.fn.validatebox) {
		var box = $(".validatebox-text", target);
		if (box.length) {
			box.validatebox("validate");
			box.trigger("focus");
			box.trigger("blur");
			var invalidBox = $(".validatebox-invalid", target);
			invalidBox.each(function(){
				var $slef = $(this);
				if($slef.hasClass("easyui-combobox") || $slef.hasClass("combo-f") ){
					if($slef.combobox("validate")){
						$slef.removeClass("validatebox-invalid");
					};
				};
			});
			var valid = $(".validatebox-invalid:first", target).focus();
			return valid.length == 0;
		}
	}
	return true;
};

if($.fn.validatebox.defaults.rules){
	$.extend($.fn.validatebox.defaults.rules, {
		toSelect: {
		        validator: function (value, param) {
		        	if(value=='请选择' || value==''|| value==null){
						$.fn.validatebox.defaults.rules.toSelect.message = param[0];
						return false;
		            }
		            return true;
		        },
		        message: ''
		    }
	});
	$.fn.validatebox.defaults.rules.notEmpty={
			validator : function(value) {
				return !/\s/.test(value);
			},
			message : " 该字段中包含空格！"
	};
	$.fn.validatebox.defaults.rules.telephone ={
		validator : function(value) {
			return /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/.test(value);
		},
		message : '无效的联系电话'
	};
	$.fn.validatebox.defaults.rules.number={
			validator : function(value,param) {
				var len = $.trim(value).length;
				return len >= param[0] && len <= param[1]&&/^(0|[1-9][0-9]*)$/.test(parseInt(value));
			},
			message : '该字段必须为长度为{0}到{1}的数字！'
		};
	
	$.fn.validatebox.defaults.rules.max={
		validator : function(value, param) {
			var len = $.trim(value).length;
			return param[0]>=len;
		},
		message : '该字段的最大长度为 {0}'
	};
	$.fn.validatebox.defaults.rules.email={
		validator : function(value) {
			return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
					.test(value);
		},
		message : 'Please enter a valid email address.'
	};
	
	$.extend($.fn.validatebox.defaults.rules, {    
	    monthValidate: {    
	    	validator: function (value, param) {
				 return (/^((0?[1-9])|((1|2)[0-9])|30|31)$/.test(value));   
	        },    
	        message: '请输入正确的天数'   
	    }    
	}); 
	$.extend($.fn.validatebox.defaults.rules, {    
	    hourValidate: {    
	    	validator: function (value, param) {
				 return (/^((\d(\.\d)?)|(1\d)(\.\d)?|(2[0-3])(\.\d)?|24(\.0)?)$/.test(value));   
	        },    
	        message: '请输入正确的小时数'   
	    }    
	}); 
	$.extend($.fn.validatebox.defaults.rules, {    
	    intValidate: {    
	    	validator: function (value, param) {
				 return (/0|^[0-9]*[1-9][0-9]*$/.test(value));   
	        },    
	        message: '请输入正确的金额'   
	    }    
	});
	$.fn.validatebox.defaults.rules.radio={
			validator : function(value) {
				var ipts = $('input[type="radio"][name="'+this.name+'"]');
				var lgth =ipts.length;
				for(var i=0,len=lgth;i<len;i++){
					var $thisDom = $.data(ipts[i], 'validate-item');
					if($thisDom&&$thisDom.tip){
						if($(ipts[i]).hasClass('sino-validatebox-invalid')){
							$(ipts[i]).removeClass('sino-validatebox-invalid');
						}
						$thisDom.tip.remove();
						$thisDom.tip=undefined;
					}
				}
				var length =$('input[type="radio"][name="'+this.name+'"]:checked').length;
				return length==0?false:true;
			},
			message : 'radio必填'
	};
	$.extend($.fn.validatebox.defaults.rules, {    
	    codeValidate: {    
	    	validator: function (value, param) {
				return (/^([0-9][0-9])$/.test(value));   
	        },    
	        message: '请输入两位数字编号,首位可使用0填充！'   
	    }    
	}); 
	$.extend($.fn.validatebox.defaults.rules, {    
		percentValidate: {    
	    	validator: function (value, param) {
				return (/^(0|[1-9]|([1-9][0-9])|100)$/.test(value));   
	        },    
	        message: '请输入请输入0-100的整数！'   
	    }    
	}); 
}

$(function(){
	
	$.extend($.fn.validatebox.defaults.rules, {    
	    hanzi: {    
	    	validator: function (value, param) {
				 return (/^[0-9a-zA-Z\u4E00-\u9FA5]{2,10}$/.test(value));   
	        },    
	        message: '请输入2-10位的字符'   
	    }    
	});  
	
	$.extend($.fn.validatebox.defaults.rules, {    
	    EorD: {    
	    	validator: function (value, param) {
				 return (/^\w+$/.test(value));   
	        },    
	        message: '只能为英文或者数字和_'   
	    }    
	});  
	
	 $.extend($.fn.validatebox.defaults.rules, {    
			shuzi: {    
			    	validator: function (value, param) {  
			    		
						 return (/^[0-9]*[1-9][0-9]*$/gi.test(value));   
			        },    
			        message: '请输入正整数'   
			    }    
			});  
	 $.extend($.fn.validatebox.defaults.rules, {    
			zhekou: {    
			    	validator: function (value, param) {  
			    		
						// return (/^([1-9]{1,1}[0-9]{0,1}|0|100)$/.test(value));   
			    		return (/^((\d)|([1-9]\d)|(2\d{2})|300|(1\d\d))$/.test(value));   
			        },    
			        message: '请输0-300整数'   
			    }    
			});  
	$.extend($.fn.validatebox.defaults.rules, {    
	   desc: {    
	    	validator: function (value, param) {
				 return (/^[^><]+$/ig.test(value));   
	        },    
	        message: '不能包含<号和>号'   
	    }    
	});  

	$.extend($.fn.validatebox.defaults.rules, {    
		urltest: {    
		    	validator: function (value, param) {  
		    		
					 return (/^[a-zA-Z]+:\/\/([a-zA-Z0-9_\-]+\.)?[a-zA-Z0-9_\-]+(:[0-9]+)?(\/?.*)?$/.test(value));   
		        },    		
		        message: '请输入合法的URL'   
		    }    
		});  
	
	$.extend($.fn.validatebox.defaults.rules, {    
		mobile: {    
		    	validator: function (value, param) {  
		    		
					 return (/^1\d{10}$/.test(value));   
					 
		        },    		
		        message: '请输入合法的手机号'   
		    }    
		}); 
	
	$.extend($.fn.validatebox.defaults.rules, {    
		idcardNo: {    
		    	validator: function (value, param) {  
		    		
					 return idCardNoUtil.checkIdCardNo(value);   
					 
		        },    		
		        message: '请输入正确的身份证号'   
		    }    
		});
	
	
	$.extend($.fn.validatebox.defaults.rules, {    
		rightopt: {    
		    	validator: function (value, param) {  
		    		
					 return (/^(\/[0-9A-Za-z_\-]+)+.*?$/gi.test(value));   
		        },    
		        message: '请输入合法的操作'   
		    }    
		});  
	 $.extend($.fn.validatebox.defaults.rules, {
		 memail: {
			 validator: function (value, param) {
				 return /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
			 },
			 message: '邮箱格式不正确'
		 }
	 });
	$.extend($.fn.validatebox.defaults.rules, {
	    exist: {
	         validator: function(value, param) {
	             var postdata = {};
	             postdata[param[1]] = value;
	             var m_result =$.ajax({
	               type: "POST",//http请求方式
	               url: param[0],    //服务器段url地址
	               data:postdata,      //发送给服务器段的数据
	               dataType: "type", //告诉JQuery返回的数据格式
	               async: false
	            }).responseText;
	            if (m_result == "false") {
	                $.fn.validatebox.defaults.rules.exist.message = param[2];
	                return false;
	            }
	            else {
	            	
	               return true;
	            }
	            
	        },
	        message: ''
	    }
	});
		
});

var idCardNoUtil = {
	provinceAndCitys : {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙古",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙江",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
	},

	powers : [ "7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9",
			"10", "5", "8", "4", "2" ],

	parityBit : [ "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" ],

	genders : {
		male : "男",
		female : "女"
	},

	checkAddressCode : function(addressCode) {
		var check = /^[1-9]\d{5}$/.test(addressCode);
		if (!check)
			return false;
		if (idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
			return true;
		} else {
			return false;
		}
	},

	checkBirthDayCode : function(birDayCode) {
		var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/
				.test(birDayCode);
		if (!check)
			return false;
		var yyyy = parseInt(birDayCode.substring(0, 4), 10);
		var mm = parseInt(birDayCode.substring(4, 6), 10);
		var dd = parseInt(birDayCode.substring(6), 10);
		var xdata = new Date(yyyy, mm - 1, dd);
		if (xdata > new Date()) {
			return false;// 生日不能大于当前日期
		} else if ((xdata.getFullYear() == yyyy)
				&& (xdata.getMonth() == mm - 1) && (xdata.getDate() == dd)) {
			return true;
		} else {
			return false;
		}
	},

	getParityBit : function(idCardNo) {
		var id17 = idCardNo.substring(0, 17);
		var power = 0;
		for ( var i = 0; i < 17; i++) {
			power += parseInt(id17.charAt(i), 10)
					* parseInt(idCardNoUtil.powers[i]);
		}
		var mod = power % 11;
		return idCardNoUtil.parityBit[mod];
	},

	checkParityBit : function(idCardNo) {
		var parityBit = idCardNo.charAt(17).toUpperCase();
		if (idCardNoUtil.getParityBit(idCardNo) == parityBit) {
			return true;
		} else {
			return false;
		}
	},

	checkIdCardNo : function(idCardNo) {
		// 15位和18位身份证号码的基本校验
		var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
		if (!check)
			return false;
		// 判断长度为15位或18位
		if (idCardNo.length == 15) {
			return idCardNoUtil.check15IdCardNo(idCardNo);
		} else if (idCardNo.length == 18) {
			return idCardNoUtil.check18IdCardNo(idCardNo);
		} else {
			return false;
		}
	},
	// 校验15位的身份证号码
	check15IdCardNo : function(idCardNo) {
		// 15位身份证号码的基本校验
		var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/
				.test(idCardNo);
		if (!check)
			return false;
		// 校验地址码
		var addressCode = idCardNo.substring(0, 6);
		check = idCardNoUtil.checkAddressCode(addressCode);
		if (!check)
			return false;
		var birDayCode = '19' + idCardNo.substring(6, 12);
		// 校验日期码
		return idCardNoUtil.checkBirthDayCode(birDayCode);
	},
	// 校验18位的身份证号码
	check18IdCardNo : function(idCardNo) {
		// 18位身份证号码的基本格式校验
		var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/
				.test(idCardNo);
		if (!check)
			return false;
		// 校验地址码
		var addressCode = idCardNo.substring(0, 6);
		check = idCardNoUtil.checkAddressCode(addressCode);
		if (!check)
			return false;
		// 校验日期码
		var birDayCode = idCardNo.substring(6, 14);
		check = idCardNoUtil.checkBirthDayCode(birDayCode);
		if (!check)
			return false;
		// 验证校检码
		return idCardNoUtil.checkParityBit(idCardNo);
	},
	formateDateCN : function(day) {
		var yyyy = day.substring(0, 4);
		var mm = day.substring(4, 6);
		var dd = day.substring(6);
		return yyyy + '-' + mm + '-' + dd;
	},
	// 获取信息
	getIdCardInfo : function(idCardNo) {
		var idCardInfo = {
			gender : "", // 性别
			birthday : "" // 出生日期(yyyy-mm-dd)
		};
		if (idCardNo.length == 15) {
			var aday = '19' + idCardNo.substring(6, 12);
			idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
			if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
				idCardInfo.gender = idCardNoUtil.genders.female;
			} else {
				idCardInfo.gender = idCardNoUtil.genders.male;
			}
		} else if (idCardNo.length == 18) {
			var aday = idCardNo.substring(6, 14);
			idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
			if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
				idCardInfo.gender = idCardNoUtil.genders.female;
			} else {
				idCardInfo.gender = idCardNoUtil.genders.male;
			}
		}
		return idCardInfo;
	},

	getId15 : function(idCardNo) {
		if (idCardNo.length == 15) {
			return idCardNo;
		} else if (idCardNo.length == 18) {
			return idCardNo.substring(0, 6) + idCardNo.substring(8, 17);
		} else {
			return null;
		}
	},

	getId18 : function(idCardNo) {
		if (idCardNo.length == 15) {
			var id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6);
			var parityBit = idCardNoUtil.getParityBit(id17);
			return id17 + parityBit;
		} else if (idCardNo.length == 18) {
			return idCardNo;
		} else {
			return null;
		}
	}
};
//验证护照是否正确
function checknumber(number) {
	var str = number;
	//在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
	var Expression = /(P\d{7})|(G\d{8})/;
	var objExp = new RegExp(Expression);
	if (objExp.test(str) == true) {
		return true;
	} else {
		return false;
	}
};