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
$(function() {

	// 添加easyui日期插件
	$('#planBedinTimeStart').datetimebox({
		formatter : function(date) {
			return date.Format("yyyy-MM-dd hh:mm:ss");
		}
	});
	// 添加easyui日期插件
	$('#planBedinTimeEnd').datetimebox({
		formatter : function(date) {
			return date.Format("yyyy-MM-dd hh:mm:ss");
		}
	});
	/*
	 * $('#beginTimeStart').datetimebox({ formatter : function(date) { return
	 * date.Format("yyyy-MM-dd hh:mm:ss"); } });
	 * 
	 * $('#beginTimeEnd').datetimebox({ formatter : function(date) { return
	 * date.Format("yyyy-MM-dd hh:mm:ss"); } });
	 */

	// 设置日期只读
	$(".datebox :text").attr("readonly", "readonly");
	// var d=new Date();
	// $('#beginTimeStart').datetimebox('setValue',d.Format("yyyy-MM-dd
	// hh:mm:ss"));
	// $('#planBedinTimeStart').datetimebox('setValue',d.Format("yyyy-MM-dd
	// hh:mm:ss"));
	// $('#beginTimeEnd').datetimebox('setValue',d.Format("yyyy-MM-dd
	// hh:mm:ss"));
	// $('#planBedinTimeEnd').datetimebox('setValue',d.Format("yyyy-MM-dd
	// hh:mm:ss"));
	$('#accountid').combobox({

		url : ctx + '/dictionary/querySmsDomians',

		valueField : 'smsDomainId',
		editable : false,
		textField : 'smsDomainName',
		onLoadSuccess : function() { // 加载完成后,设置选中第一项
			var val = $(this).combobox("getData");

			$(this).combobox("select", val[0].smsDomainId);
		}
	});


	$('#smsAccountId').combobox({

		url : ctx + '/smsSendWaiting/getAccount',

		valueField : 'smsAccountId',
		editable : false,
		textField : 'smsAccountName',
		onLoadSuccess : function() { // 加载完成后,设置选中第一项
			var val = $(this).combobox("getData");

			$("#smsAccountId").combobox('select', val[0].value);
//			for ( var i in val) {
//				for ( var item in val[i]) {
//					if (item == "smsAccountId" && val[i][item] == '') {
//						$(this).combobox("select", val[i][item]);
//					}
//				}
//			}
		}
	});
	$('#recoretable')
			.datagrid(
					{
						title : '队列监控列表',
						fit : true,
						fitColumns : true,
						border : false,
						height : '50px',
						idField : 'smsWaitingId',
						pagination : true,
						rownumbers : true,
						remoteSort : true,
						striped : true,
						checkOnSelect : true,
						frozenColumns : [ [ {
							field : 'smsWaitingId',
							title : 'ID',
							checkbox : true
						} ] ],
						url : ctx + '/smsSendWaiting/listSmsSendWaiting',
						columns : [ [

								{
									field : 'smsAccountId',
									title : '账户名',
									width : getWidth(4),
									formatter : function(value) {

										value = value.replace(/</g, "《");
										value = value.replace(/>/g, "》");
										value = value.replace(/&lt;/g, "《");
										value = value.replace(/&gt;/g, "》");
										value = value.replace(/'/g, "");
										return value;
									}

								},
								{
									field : 'phone',
									title : '手机号',
									width : getWidth(4)

								},
								{
									field : 'createDate',
									title : '任务发起时间',
									width : getWidth(4),
									formatter : function(value) {
										var ss = "";
										if (value != null) {
											ss = formatTimeStampDate(value);
										}
										return ss;
									}

								},
								{
									field : 'sendTime',
									title : '计划发送时间',
									width : getWidth(4),
									formatter : function(value) {
										var ss = "";
										if (value != null) {
											ss = formatTimeStampDate(value);
										}
										return ss;
									}

								},
								{
									field : 'smsAccountType',
									title : '短信类型',
									width : getWidth(3),
									formatter : function(value, row, index) {
										var view = "";
										if (row.smsAccountType == 'notice') {
											view = "通知";
										} else if (row.smsAccountType == 'marke') {
											view = "营销";
										} else if (row.smsAccountType == 'check') {
											view = "验证";
										}
										return view;
									}
								},
								{
									field : 'smsContent',
									title : '短信内容',
									width : getWidth(15),
									formatter : function(value, row, index) {
										if (value) {
											var showtitle = value.substring(0,30);
											if (value.length > 30) {
												showtitle = showtitle + "...";
											}
											value = value.replace(/</g, "《");
											value = value.replace(/>/g, "》");
											value = value.replace(/&lt;/g, "《");
											value = value.replace(/&gt;/g, "》");
											value = value.replace(/'/g, "");

											var content = "<a href='javascript:showMsg(\""
													+ value
													+ "\");' titile='"
													+ value
													+ "' class='content'>"
													+ showtitle + "</a>";

											return content;
										}
									}
								}

						] ],
						toolbar : '#toolbar',
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
						}
					});
});

function showMsg(msg) {
	jQuery.messager.alert("提示内容:", msg);
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
	var phone = $("#phone").val();
	if(null!=phone && phone!=""){
		if(!/^\d{11}$/.test(phone)){
			jQuery.messager.alert("错误提示:",phone+" : 手机号码格式错误");
		    return false;
		 }
	}
	$('#recoretable').datagrid("clearChecked");
	$('#recoretable').datagrid('load', serializeForm($('#recordform')));
}

function clearForm() {

	var accountid = $('#smsAccountId').combobox('getData');

	var smsAccountType = $('#smsAccountType').combobox('getData');

	$('#recordform').form('clear');
	$("#smsAccountId").combobox('select', accountid[0].smsAccountId);
	
	$("#smsAccountType").combobox('select', smsAccountType[0].value);

}

function cancelSend() {
	
	var row = $('#recoretable').datagrid('getChecked');
	
	if ( row.length == 0) {
		$.messager.alert('提示:', '请选择至少一条数据进行操作', 'info');
		return;
	}else{
		$.messager.confirm('提示信息', '确定要取消发送吗？', function(r) {
			if (r) {
				var waitingStr = [];
				
				$.each(row, function(index, item) {
					waitingStr.push(item.smsWaitingId);
					
				});
				$.ajax({
					cache : false,
					type : "POST",
					url : ctx + "/smsSendWaiting/cancelSend?waitingStr=" + waitingStr,
					async : false,
					dataType : "json",
					error : function(request) {
						$.messager.show({
							title : '提示信息!',
							msg : '提交失败,请重新加载！'
						});
					},
					success : function(data) {
						$.messager.show({
							title : '提示信息!',
							msg : data.msg
						});
						setTimeout("refreshRecoreds()", 1000);
						
					}
				});
			}
		});
	}
}
//
//
////解决checkbox勾选值bug问题
//$.extend($.fn.datagrid.methods, {
//	getChecked : function(jq) {
//
//		var rr = [];
//
//		var rows = jq.datagrid('getRows');
//		jq.datagrid('getPanel').find('div.datagrid-cell input:checked').each(
//				function() {
//					var index = $(this).parents('tr:first').attr(
//							'datagrid-row-index');
//					rr.push(rows[index]);
//				});
//		return rr;
//
//	}
//
//});


function refreshRecoreds(){
	$('#recoretable').datagrid("clearChecked");
	$('#recoretable').datagrid('reload', serializeForm($('#recordform')));
}
function redirectTolist(){
	$('#recoretable').datagrid('reload'); // reload the user data
}