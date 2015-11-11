Date.prototype.Format = function(fmt) {
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
var qryData;
var userid = getUserid();
$(function() {

	// 添加easyui日期插件
	$('#start').datetimebox({
		formatter : function(date) {
			return date.Format("yyyy-MM-dd hh:mm:ss");
		}
	});
	$('#end').datetimebox({
		formatter : function(date) {
			return date.Format("yyyy-MM-dd hh:mm:ss");
		}
	});

	// 设置日期只读
	$(".datebox :text").attr("readonly", "readonly");
	$('#smsMappingSystem').combobox({

		url : ctx + '/dictionary/querySmsDomians',

		valueField : 'smsDomainId',
		editable : false,
		textField : 'smsDomainName',
		onLoadSuccess : function() { // 加载完成后,设置选中第一项
			var val = $(this).combobox("getData");

			$(this).combobox("select", val[0].smsDomainId);
			// for ( var i in val) {
			// for ( var item in val[i]) {
			// if (item == "smsDomainId" && val[i][item] == '-1') {
			// $(this).combobox("select", val[i][item]);
			// }
			// }
			// }
		}
	});

	$('#accountid').combobox({

		url : ctx + '/smsSendingRec/getAccount?smsAccountType=check',

		valueField : 'smsAccountId',
		editable : false,
		textField : 'smsAccountName',
		onLoadSuccess : function() { // 加载完成后,设置选中第一项
			var val = $(this).combobox("getData");
			for ( var i in val) {
				for ( var item in val[i]) {
					if (item == "smsAccountId" && val[i][item] == '-1') {
						$(this).combobox("select", val[i][item]);
					}
				}
			}
		}
	});
	$('#recoretable')
			.datagrid(
					{
						title : '验证短信发送列表',
						fit : true,
						fitColumns : true,
						border : false,
						height : '50px',
						pagination : true,
						idField : 'smsSendingDetaillId',
						rownumbers : true,
						remoteSort : true,
						striped : true,
						url : ctx + '/smsSendingRec/lisCheck',
						columns : [ [
								{
									field : 'smsSystemName',
									title : '系统',
									width : getWidth(3),

								},
								{
									field : 'smsSuppliers',
									title : '供应商',
									width : getWidth(3),
									formatter : function(value, row, index) {
										value = value.replace(/</g, "《");
										value = value.replace(/>/g, "》");
										value = value.replace(/&lt;/g, "《");
										value = value.replace(/&gt;/g, "》");
										value = value.replace(/'/g, "");
										return value;
									}

								},
								{
									field : 'accountName',
									title : '账户',
									width : getWidth(5),
									formatter : function(value, row, index) {
										value = value.replace(/</g, "《");
										value = value.replace(/>/g, "》");
										value = value.replace(/&lt;/g, "《");
										value = value.replace(/&gt;/g, "》");
										value = value.replace(/'/g, "");
										return value;
									}

								},
								{
									field : 'smsReceiveId',
									title : '手机号',
									width : getWidth(4),

								},

								{
									field : 'smsContent',
									title : '短信内容',
									width : getWidth(13),
									formatter : function(value, row, index) {
										if (value) {
											var showtitle = value.substring(0,27);
											if (value.length > 27) {
												showtitle = showtitle + "...";
											}
											value = value.replace(/</g, "《");
											value = value.replace(/>/g, "》");
											value = value.replace(/&lt;/g, "《");
											value = value.replace(/&gt;/g, "》");
											value = value.replace(/'/g, "");

											var content = "<a href='javascript:showMsg(\""+value+"\");' titile='" + value + "' class='content'>" + showtitle + "</a>";

											return content;
										}
									}

								},

								{
									field : 'createDate',
									title : '创建时间',
									width : getWidth(6),
									formatter : function(value) {
										var ss = "";
										if (value != null) {
											ss = formatTimeStampDate(value);
										}
										return ss;
									}
								},
								{
									field : 'sendBeginDate',
									title : '发送开始时间',
									width : getWidth(6),

									formatter : function(value) {
										var ss = "";
										if (value != null) {
											ss = formatTimeStampDate(value);
										}
										return ss;
									}

								},
								{
									field : 'sendEndDate',
									title : '发送完成时间',
									width : getWidth(6),

									formatter : function(value) {
										var ss = "";
										if (value != null) {
											ss = formatTimeStampDate(value);
										}
										return ss;
									}
								},
								{
									field : 'sendSts',
									title : '状态',
									width : getWidth(2),

									formatter : function(value, row, index) {
										var view = "";
										if ('S' == row.sendSts) {
											view = '成功';
										}else if('R' == row.sendSts){
											view = "<a href='javascript:showMsg(\"【待系统自动重发】"+row.operationLog+"\");' titile='【待系统自动重发】"+ row.operationLog+ "' class='sendstsFailure'>"+ '待重发' + "</a>";
										}else if('N' == row.sendSts){
											view = "<a href='#' titile='"+ row.operationLog+ "' class='sendstsFailure'>"+ '未发送' + "</a>";
										}  else {
											view = "<a href='javascript:showMsg(\""+row.operationLog+"\");' titile='"+ row.operationLog+ "' class='sendstsFailure'>"+ '失败' + "</a>";
										}
										return view;
									}
								},
								{
									field : 'returnSuccess',
									title : '回持状态',
									width : getWidth(2),

									formatter : function(value, row, index) {
										var view = "";
										if ('Y' == value) {
											view = '成功';
										} else {
											if ('N' == value) {
												view = "<a href='#' titile='"+ row.returnErrorcode+ "' class='sendstsFailureErrorcode'>"+ '失败' + "</a>";
											} else {
												view = '--';
											}
										}
										return view;
									}
								},

								{

									title : '操作',

									field : 'ck',// 不对应数据库或json字段，取的名字

									width : getWidth(3),

									formatter : function(value, row, index) {
										var view = '----';

										if ('N' == row.returnSuccess
												|| 'F' == row.sendSts) {

											view = "<a href='javascript:reSendSmsNoticeAndCheck(\""
													+ row.smsSendingDetaillId
													+ "\","
													+ "\""
													+ row.smsContent
													+ "\","
													+ "\""
													+ row.accountName
													+ "\","
													+ "\""
													+ row.smsReceiveId
													+ "\");'>重发</a>";

										}
										return view;
									}
								}

						] ],
						/* toolbar : '#toolbar', */
						onLoadSuccess : function() {
							$(this).datagrid("fixRownumber");

							$('a.content').tinytooltip({
								message : function() {
									return $(this).attr("titile");
								},
								hover : true
							}).blur(function() {
								$(this).trigger('hidetooltip');
							});

							$('a.sendstsFailure').tinytooltip({
								message : function() {
									return $(this).attr("titile");
								},
								hover : true
							}).blur(function() {
								$(this).trigger('hidetooltip');
							});
							
							$('a.sendstsFailureErrorcode').tinytooltip({
								message : function() {
									return $(this).attr("titile");
								},
								hover : true
							}).blur(function() {
								$(this).trigger('hidetooltip');
							});
						}
					});
});


function showMsg(msg){
	jQuery.messager.alert("提示内容:",msg);
}

// 短信重发
function reSendSmsNoticeAndCheck(id, smsContent, smsAccountName, smsReceiveTel) {
	// smsAccountName =encodeURI(encodeURI(smsAccountName));

	var opt = {
		"smsSendingDetaillId" : id,
		"smsContent" : smsContent,
		"accountName" : smsAccountName,
		"smsReceiveId" : smsReceiveTel
	};
	var dataParams = $.param(opt);
	$.ajax({
		cache : true,
		type : "POST",
		url : ctx + "/smsSendCustTemplate/reSendSmsNoticeAndCheck",
		async : false,
		dataType : "json",
		data : dataParams,
		error : function(request) {
			$.messager.show({
				title : '提示信息!',
				msg : '发送失败,请重新发送！'
			});

		},
		success : function(data) {

			$.messager.show({
				title : '提示信息!',
				msg : data.msg
			});
		}
	});
	setTimeout("refreshRecoreds()", 1000);
}


function refreshRecoreds(){
	$('#recoretable').datagrid("clearChecked");
	$('#recoretable').datagrid('reload', serializeForm($('#recordform')));
}
function sendAgain(smsSendingDetaillId) {

}
function getUserid() {
	var result = "-1";
	$.ajax({
		cache : true,
		type : "POST",
		url : ctx + "/smsSendingRec/getUserid",
		async : false,
		dataType : "json",
		success : function(data) {
			result = data.msg;
		}
	});
	return result;
}

function getSender() {
	var result = "admin";
	$.ajax({
		cache : true,
		type : "POST",
		url : ctx + "/smsSendingRec/getSender",
		async : false,
		dataType : "json",
		success : function(data) {
			result = data.msg;
		}
	});
	return result;
}

// js方法：序列化表单
function serializeForm(form) {
	var obj = {};
	$.each(form.serializeArray(), function(index) {
		if (obj[this['name']]) {
			obj[this['name']] = obj[this['name']] + ',' + this['value'];
		} else {
			obj[this['name']] = this['value'];
		}
	});
	return obj;
}

/**
 * 分页模糊查询
 */
function searchRecoreds() {
	var phone = $("#smsReceiveId").val();
	if(null!=phone && phone!=""){
		if(!/^\d{11}$/.test(phone)){
			jQuery.messager.alert("错误提示:",phone+" : 手机号码格式错误");
		    return false;
		 }
	}
	
	$('#recoretable').datagrid("clearChecked");
	$('#recoretable').datagrid('load', serializeForm($('#recordform')));
	/*
	 * $ .ajax({ type : "POST", url : ctx +
	 * "/smsSendingRec/countNoticeOrCheck?tag=2", async : false, data :
	 * serializeForm($('#recordform')), dataType : "json", error :
	 * function(request) { $.messager.show({ title : '提示信息!', msg :
	 * '提交失败,请重新加载！' }); $('#recoretable').datagrid('reload'); }, success :
	 * function(data) { if (data.obj) { $('#toolbar').empty();
	 * $('#toolbar').append( "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总计：发送总条数" +
	 * data.obj.countAll + "条,发送成功条数" + data.obj.countSucess + "条," + "未成功" +
	 * data.obj.countFailure + "条 &nbsp;&nbsp;&nbsp;"); } else { $('#toolbar')
	 * .append( "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总计：发送成功条数0条,有效数据条数0条,未成功0条
	 * &nbsp;&nbsp;&nbsp;"); } $('#recoretable').datagrid('reload'); } });
	 */
}

function clearForm() {
	$('#recordform').form('clear');

	var smsDomain = $("#smsMappingSystem").combobox("getData");
	$("#smsMappingSystem").combobox("select", smsDomain[0].smsDomainId);

	var accountid = $('#accountid').combobox('getData');
	$("#accountid").combobox('select', accountid[0].smsAccountId);
	var sendSts = $('#sendSts').combobox('getData');
	$("#sendSts").combobox('select', sendSts[0].value);

}