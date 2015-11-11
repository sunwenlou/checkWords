//var yimeiId='c70892700c084597bfabf0386f1a18e1';
//var yunxinId='4c3afc85648b407d932c74aeabdf0b48';
Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

$(function() {
	// 文本域判断还可以输入多少个字符
	var limitNum = 500;
	var pattern = '';

	// 添加easyui日期插件
	$('#beginDate').datetimebox({
		formatter : function(date) {

			var d = new Date();
			var times = d.getTime();
			
			var count = (date.getTime() - times);
			// alert(date.getTime()+" "+ d.getTime()+" "+count +" "+times);
			// alert(count);
			if (count > 1000) {

				return date.Format("yyyy-MM-dd hh:mm:ss");
			} else {
				// $.messager.alert('提示:', '开始时间不能小于于当前时间。', 'info');
				return d.Format("yyyy-MM-dd hh:mm:ss");
			}

		}

	});
	$('#beginDate').datetimebox('setValue', '');
	// 设置日期只读
	$(".datebox :text").attr("readonly", "readonly");

	// 输入手机号码时判断，如果是正确的手机号码，显示发送按钮
	$('#mobile')
			.keyup(
					function() {
						var remain = $(this).val().length;
						var validateFalg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|8|9]|17[0|1|6|7|8]|18[0-9])\d{8}$/
								.test($(this).val());
						if (remain == 11 && validateFalg) {
							$("#send")
									.html(
											'<input type="button" onclick="submitSend();"  value="确认发送">');
							$("#showMsg").html('');
							var tel = $("#mobile").val().substring(0, 11);
							$("#smsReceiveId").val(tel);
							$("#smsContent").removeAttr('readonly');
							$("#tr5").show();
						} else if (remain > 11) {
							var tel = $("#mobile").val().substring(0, 11);
							$("#smsReceiveId").val(tel);
							$("#mobile").val(tel + ",");
							$("#showMsg").html('多条短信请使用CSV上传');
							$("#send").html('');
						} else {
							$("#smsContent").attr('readonly', 'readonly');
							$("#send").html('');
							$("#tr5").hide();
						}
					});
	// 初始化账号下拉列表
	initSmsAccountCombox("#smsAccountId");
	$("#smsContent").keyup(
			function() {
				var remain = $(this).val().length;
				if (remain > limitNum) {
					pattern = "字数超过限制！";
				} else {
					// 短信编辑条数计算：输入的内容最后会拼接上短信签名和供应商的'退订回复TD或者退订回TD或者其他。。'所以短信条数应当减去拼接的字段长度
					var result = limitNum - remain;
					var num;
					// 短信签名
					var signersLength = $("input[name='signers']:checked")
							.val().length;
					// 短信长度
					var smsLength = 67;
					// 退订签名
					var suppliersTDLength = $('#suppliersTD').val().length;
					var toMin = signersLength + suppliersTDLength;
					num = judgingLength(remain, smsLength, toMin);
					if (result == 500) {
						num = 0;
					}
					;
					pattern = '剩余' + result + '字符，已编辑' + num + '条短信';
				}
				$('#contentwordage').html(pattern);

			});
});
// 判断长度
function judgingLength(remain, smsLength, toMin) {
	var num = 0;
	if (remain <= smsLength - toMin) {
		num = 1;
	} else if (remain > smsLength - toMin && remain <= smsLength * 2 - toMin) {
		num = 2;
	} else if (remain > smsLength * 2 - toMin
			&& remain <= smsLength * 3 - toMin) {
		num = 3;
	} else if (remain > smsLength * 3 - toMin
			&& remain <= smsLength * 4 - toMin) {
		num = 4;
	} else if (remain > smsLength * 4 - toMin
			&& remain <= smsLength * 5 - toMin) {
		num = 5;
	} else if (remain > smsLength * 5 - toMin
			&& remain <= smsLength * 6 - toMin) {
		num = 6;
	} else if (remain > smsLength * 6 - toMin
			&& remain <= smsLength * 7 - toMin) {
		num = 7;
	} else if (remain > smsLength * 7 - toMin
			&& remain <= smsLength * 8 - toMin) {
		num = 8;
	}
	return num;
}

// 初始化适用域下拉列表
function initSmsAccountCombox(domainId) {
	$(domainId)
			.combobox(
					{
						url : ctx
								+ '/smsAccount/qrySmsAccountsByUUCAccount?smsAccountType=marke',
						editable : false, // 不可编辑状态
						valueField : 'smsAccountId',
						textField : 'smsAccountName',
						onChange : function(value) {
							$
									.post(
											ctx
													+ '/smsAccount/querySmsAccounts?smsAccountId='
													+ value,
											function(result) {
												$("#smsBalances").html(
														result[0].smsBalances);
												// //保存供应商ID
												// 用来判断可编辑短信条数(供应商'退订回复TD'字段)
												// if(yimeiId==result[0].suppliersId){
												// //亿美 退订回复TD
												// $("#suppliersTD").val('退订回复TD');
												// $("#suppliersId").val('yimei');
												//					
												// }else
												// if(yunxinId==result[0].suppliersId){
												// //云信 退订回TD
												// $("#suppliersTD").val('退订回TD');
												// $("#suppliersId").val('yunxin');
												// }
												var signers = result[0].signers
														.split(",");
												var html = '';
												for (var i = 0; i < signers.length; i++) {
													if (i == 0) {
														html += "<input type='radio' name='signers' checked='checked' onclick='showChange();' value='"
																+ signers[i]
																+ "'>"
																+ signers[i];
													} else {
														html += "<input type='radio' name='signers' onclick='showChange();'  value='"
																+ signers[i]
																+ "'>"
																+ signers[i];
													}

												}
												$("#signers").html(html);

											}, 'json');
						},
						onLoadSuccess : function() {
							var data = $(domainId).combobox('getData');
							if (data.length > 0) {
								$("#smsBalances").html(data[0].smsBalances);
								$(domainId).combobox('select',
										data[0].smsAccountId);
								// if(yimeiId==data[0].suppliersId){
								// //亿美 退订回复TD 供应商为"亿美"短信标签放在最前面
								// $("#suppliersTD").val('退订回复TD');
								// $("#suppliersId").val('yimei');
								// }else if(yunxinId==data[0].suppliersId){
								// //云信 退订回TD 供应商为"云信"短信标签放在最后
								// $("#suppliersTD").val('退订回TD');
								// $("#suppliersId").val('yunxin');
								// }
								var signers = data[0].signers.split("，");
								var html = '';
								for (var i = 0; i < signers.length; i++) {
									if (i == 0) {
										html += "<input type='radio' name='signers' onclick='showChange();' checked='checked' value='"
												+ signers[i]
												+ "'>"
												+ signers[i];
									} else {
										html += "<input type='radio' name='signers' onclick='showChange();' value='"
												+ signers[i]
												+ "'>"
												+ signers[i];
									}

								}
								$("#signers").html(html);
							}
						}
					});
}
// 当点击短信标签radio时
function showChange() {
	var remain = $('#smsContent').val().length;
	if (!remain) {
		return;
	}
	var num;
	// 短信签名
	var signersLength = $("input[name='signers']:checked").val().length;
	// 短信长度
	var smsLength = 67;
	// 退订签名
	var suppliersTDLength = $('#suppliersTD').val().length;
	var toMin = signersLength + suppliersTDLength;
	num = judgingLength(remain, smsLength, toMin);
	var pattern = '剩余' + (500 - remain) + '字符，已编辑' + num + '条短信';
	$('#contentwordage').html(pattern);
}

// 展示手机号码输入框
function showMoblieInput(flag) {
	// 0群发 1单条
	if ("0" == flag) {
		$("#tr1").hide();
		$("#tr2").show();
		$("#tr3").show();
	} else if ("1" == flag) {
		$("#smsContent").attr('readonly', 'readonly');
		$("#tr1").show();
		$("#tr2").hide();
		$("#tr3").hide();
	}
	$("#smsContent").val('');
	$('#contentwordage').html('剩余500字符，已编辑0条短信');
	$("#mobile").val('');
	$("#send").html('');
	$("#tr5").hide();
	$("#isSingle11").attr("checked", false);
	$("#isSingle22").attr("checked", false);
	$("#isSingle33").attr("checked", false);
}

// 校验手机号
function validate(mobile) {
	var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|8|9]|17[0|1|6|7|8]|18[0-9])\d{8}$/;
	return reg.test(mobile);
}
// 校验手机号码，成功显示发送按钮，并且设置文本域可输入内容
function checkMobile() {
	var mobile = $("#mobile").val();
	var flag = validate(mobile);
	if (flag) {
		$("#smsContent").removeAttr('readonly');
		$("#send").html(
				'<input type="button" onclick="submitSend();"  value="确认发送">');
		$("#tr5").show();
	} else if (($("input[type='radio']:checked").val() == "0" && $("#file").val != '')) {
	} else {
		$("#tr5").hide();
		$("#smsContent").attr("readonly", "readonly");
	}
}

function trim(str) { // 删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.endWith = function(str) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	if (this.substring(this.length - str.length) == str)
		return true;
	else
		return false;
	return true;
}

String.prototype.startWith = function(str) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	if (this.substr(0, str.length) == str)
		return true;
	else
		return false;
	return true;
}

// 提交发送
function submitSend() {
	var smsContent = $("#smsContent").val();
	smsContent = trim(smsContent);
	if (smsContent == '') {
		$.messager.alert('提示:', '请输入短信内容！', 'info');
		return false;
	}
	var beginDate = $('#beginDate').datetimebox('getValue');

	var urlWithoutDate = ctx + '/smsSendCustTemplate/save';
	var urlwithDate = ctx + '/smsSendCustTemplate/saveSmsSendWaiting';
	if ('' == beginDate) {
		$("#my_form").attr("action", urlWithoutDate);
		$("#my_form").ajaxSubmit({
			type : 'post',
			// 提交前处理
			/*
			 * beforeSubmit:function (){
			 * 
			 * showProcess(true, '温馨提示', '短信发送中，请稍后....'); },
			 */
			// 处理完成
			success : function(result) {
				showProcess(false);
				var parsedJson = jQuery.parseJSON(result);
				if (parsedJson.responseText == "0") {
					$.messager.alert('提示:', '提交成功！', 'info');
				} else if (parsedJson.responseText == "-1") {
					$.messager.alert('提示:', '短信余额不足，请充值！', 'info');
				} else if (parsedJson.responseText == "-2") {
					$.messager.alert('提示:', '要发送的手机号码为空，请联系系统管理员。', 'info');
				}

			}

		});
	} else {
		$("#my_form").attr("action", urlwithDate);

		$("#my_form").ajaxSubmit({
			type : 'post',
			// 处理完成
			success : function(result) {
				$.messager.alert('提示:', result.msg, 'info');
			},
			error : function(result) {
				$.messager.alert('提示:', result.msg, 'info');
			}
		});
	}
	setTimeout("redirectTolist()", 2000);

}
function redirectTolist(){

	window.location.href = ctx + '/smsSendCustTemplate/init';
}
// 显示处理滚动条
function showProcess(isShow, title, msg) {
	if (!isShow) {
		$.messager.progress('close');
		return;
	}

	var progressWin = $.messager.progress({
		title : title,
		text : msg
	});
}

// 上传文件提交
function submitForm() {
	// dataType: 'json'
	$('#my_form')
			.ajaxSubmit(
					{
						type : 'post',
						url : ctx + '/smsSendCustTemplate/upload',

						// 提交前处理
						beforeSubmit : function() {
							if ($("#file").val() == "") {
								$("#msg").html("请上传文件");
								return false;
							} else {
								showProcess(true, '温馨提示', '文件上传中，请稍后....');
							}
						},
						// 处理完成
						success : function(result, statusText) {
							showProcess(false);
							var parsedJson = jQuery.parseJSON(result);
							// 设置文本域为可编辑状态
							if (parsedJson.result >= 1) {
								$("#smsContent").removeAttr('readonly');
								$("#tr5").show();
								$("#send")
										.html(
												'<input type="button" id="btnsubmit" onclick="submitSend();"  value="确认发送">');
								$("#msg")
										.html(
												"上传成功!号码总数为："
														+ parsedJson.result
														+ "条");
								$("#fileCode").val(parsedJson.fileCode);
							} else if ("0" == parsedJson.result) {
								$("#tr5").hide();
								$("#msg").html('请选择上传文件');
							} else if ("repeat" == parsedJson.result) {
								$("#tr5").hide();
								$("#msg").html('上传的手机号存在重复，请重新上传！');
							} else if ("wrongType" == parsedJson.result) {
								$("#tr5").hide();
								$("#msg").html('上传文件类型错误，请上传csv文件！');
							} else if ("uploadError" == parsedJson.result) {
								$("#tr5").hide();
								$("#msg").html('上传文件失败，请联系系统管理员！');
							} else {
								$("#tr5").hide();
								$("#msg")
										.html(
												'上传的手机号有'
														+ eval(-(parsedJson.result))
														+ '条错误，<a href="'
														+ ctx
														+ '/smsSendCustTemplate/download?error='
														+ parsedJson.fileCode
														+ '">请点击下载上传的文件进行修改</a>');
							}
						}

					})

}
