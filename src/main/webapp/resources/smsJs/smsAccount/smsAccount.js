var formData;
var qryData;
$(function() {

	// 生成数据
	formData = $('#dgr')
			.datagrid(
					{
						url : ctx + "/smsAccount/queryPageList",
						fit : true,
						fitColumns : true,
						border : false,
						pagination : true,
						idField : 'smsAccountId',
						rownumbers : true,
						// 默认加载20条记录
						pageSize : 20,
						pageList : [ 20, 30, 40, 50, 100 ],
						checkOnSelect : false,
						frozenColumns : [ [ {
							field : 'smsAccountId',
							title : 'ID',
							checkbox : true
						} ] ],
						columns : [ [
								{
									field : 'suppliersAccountId',
									title : '供应商账号标识',
									width : getWidth(0.24, 4),
									align : 'left',
									formatter : function(value, row, index) {
										var valueaccount = row.smsAccountId;
										valueaccount = valueaccount.replace(
												/</g, "《");
										valueaccount = valueaccount.replace(
												/>/g, "》");
										valueaccount = valueaccount.replace(
												/&lt;/g, "《");
										valueaccount = valueaccount.replace(
												/&gt;/g, "》");
										valueaccount = valueaccount.replace(
												/'/g, "");
										return valueaccount;
									}
								},
								{
									field : 'smsAccountName',
									title : '子账户名称',
									width : getWidth(0.24, 5),
									align : 'left',
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
									field : 'smsAccountType',
									title : '子账户类型',
									width : getWidth(0.24, 6),
									align : 'center',
									formatter : function(value, row, index) {
										// 状态 A 正常P 欠费 D禁用
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
									field : 'smsDomainName',
									title : '系统',
									width : getWidth(0.24, 7),
									align : 'center'
								},
								{
									field : 'suppliersName',
									title : '供应商',
									width : getWidth(0.24, 7),
									align : 'center',
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
									field : 'signers',
									title : '签名',
									width : getWidth(0.24, 6),
									align : 'left',
									formatter : function(value) {
										if (value != null) {
											value = value.replace(/</g, "《");
											value = value.replace(/>/g, "》");
											value = value.replace(/&lt;/g, "《");
											value = value.replace(/&gt;/g, "》");
											value = value.replace(/'/g, "");
										}
										return value;
									}
								},

								{
									field : 'smsBalances',
									title : '子账号余额',
									width : getWidth(0.24, 6),
									align : 'right'
								},

								{
									field : 'alarmnumber',
									title : '余额报警',
									width : getWidth(0.24, 6),
									align : 'center',
									formatter : function(value, row, index) {
										// 状态 A 正常P 欠费 D禁用
										var view = "<a href='javascript:showAlarmnumber(\""
												+ row.smsAccountId
												+ ","
												+ row.smsAccountName
												+ "\");'>"
												+ row.alarmnumber + "</a>";
										if (row.sts != 'A') {
											view = "<a href='#'>"
													+ row.alarmnumber + "</a>";
										}
										return view;
									}
								},
								{
									field : 'accountDetail',
									title : '消费明细',
									width : getWidth(0.24, 7),
									align : 'center',
									formatter : function(value, row, index) {
										// 状态 A 正常P 欠费 D禁用
										var view = "<a href='javascript:showAccountDetail(\""
												+ row.smsAccountId
												+ "\");'>查看</a>";
										return view;
									}
								},
								{
									field : 'lastMonthUse',
									title : '上月消耗',
									width : getWidth(0.24, 6),
									align : 'center'
								},
								{
									field : 'suppliersAccountCode',
									title : '隶属主帐号',
									width : getWidth(0.24, 3),
									align : 'center',
									formatter : function(value, row, index) { // suppliersAccountCode
										if(null!=row.smsAccountMsgEntity.suppliersAccountCode){
											return row.smsAccountMsgEntity.suppliersAccountCode;
										}else{
											return "网络异常";
										}
									}
								},
								{
									field : 'accountBalance',
									title : '主帐号余额',
									width : getWidth(0.24, 6),
									align : 'right',
									formatter : function(value, row, index) { // accountBalance
										
										if(null!=row.smsAccountMsgEntity.accountBalance){
											return row.smsAccountMsgEntity.accountBalance;
										}else{
											return "网络异常";
										}
									}
								},
								{
									field : 'sts',
									title : '状态',
									width : getWidth(0.24, 6),
									align : 'center',
									formatter : function(value, row, index) {
										// 状态 A 正常P 欠费 D禁用
										var view = "";
										if (row.sts == 'D') {
											view = "禁用";
										} else if (row.sts == 'P') {
											view = "欠费";
										} else if (row.sts == 'A') {
											view = "正常";
										}
										return view;
									}
								},
								{
									field : 'opt',
									title : '操作',
									align : 'center',
									width : getWidth(0.24, 6),
									formatter : function(value, row, index) {
										// 状态 A 正常P 欠费 D禁用
										var view = "";
										if (row.sts == 'D') {
											view = "<a href='javascript:toUse(\""
													+ row.smsAccountId
													+ "\");'>启用<a/>";
										} else if (row.sts == 'P') {

											view = "<a href='javascript:toUse(\""
													+ row.smsAccountId
													+ "\");'>启用</a>&nbsp;&nbsp;<a href='javascript:unUse(\""
													+ row.smsAccountId
													+ "\");'>禁用</a>&nbsp;&nbsp;<a href='javascript:showRechargeDlg(\""
													+ row.smsBalances
													+ "\",\""
													+ row.smsAccountId
													+ "\");'>充值</a>";
										} else if (row.sts == 'A') {

											view = "<a href='javascript:showRechargeDlg(\""
													+ row.smsBalances
													+ "\",\""
													+ row.smsAccountId
													+ "\")';>充值</a>";

										}
										if (row.sts == 'A'
												&& row.smsBalances == 0) {
											view += "&nbsp;&nbsp<a href='javascript:unUse(\""
													+ row.smsAccountId
													+ "\");'>禁用</a>&nbsp;&nbsp";
										}

										return view;
									}
								}

						] ],
						toolbar : '#toolbar',
						pagination : true
					});

	$('#smsDomain').combobox({
		url : ctx + '/dictionary/querySmsDomians',

		valueField : 'smsDomainId',
		editable : false,
		textField : 'smsDomainName',
		onLoadSuccess : function() { // 加载完成后,设置选中第一项
			var val = $("#smsDomain").combobox("getData");
			$("#smsDomain").combobox("select", val[0].smsDomainId);

		}
	});

	$('#smsSuppliers').combobox({
		url : ctx + '/smsSuppliers/querySmsSuppliers?sts=A',

		valueField : 'suppliersId',
		editable : false,
		textField : 'suppliersName',
		onLoadSuccess : function() { // 加载完成后,设置选中第一项
			var val = $('#smsSuppliers').combobox("getData");
			$('#smsSuppliers').combobox("select", val[0].suppliersId);
		}
	});

});
function clearForm() {
/*
	$('#queryForm').form('clear');*/
	$("#smsAccountId").textbox('setValue','')//赋值 
	var val = $("#smsDomain").combobox("getData");
	$("#smsDomain").combobox("select", val[0].smsDomainId);
	var val1 = $('#smsSuppliers').combobox("getData");
	$('#smsSuppliers').combobox("select", val1[0].suppliersId);
	var data = $('#smsSendType').combobox('getData');
	$("#smsSendType").combobox('select', data[0].value);

}

/**
 * 对传入的充值、转出额度进行校验
 * 
 * @param strNumber
 */
function isNumeric(strNumber) {
	var newPar = /^[1-9][0-9]*$/
	if (strNumber == 0) {
		$.messager.alert('提示:', '输入的数字必须大于0！', 'info');
	} else if (!newPar.test(strNumber)) {
		$.messager.alert('提示:', '请输入正确的数字！', 'info');
	} else {
		return true;
	}
}

function showRechargeDlg(smsBlances, id) {
	$("#rechargeNumber").textbox('clear');
	$("#recharge_id").val(id);
	$("#recharge_dlg").dialog('open');
	$("#smsBalances").val(smsBlances);
}

function recharge() {
	var reachargeNumber = $("#rechargeNumber").val();
	var smsBalances = $("#smsBalances").val();
	var id = $("#recharge_id").val();
	if (isNumeric(reachargeNumber)) {
		$.post(ctx + '/smsAccount/recharge?smsAccountId=' + id
				+ '&smsBalances=' + smsBalances + '&rechargeNumber='
				+ reachargeNumber, function(result) {
			if (result.success) {
				$.messager.show({
					title : '提示',
					msg : result.msg
				});
				$("#recharge_dlg").dialog('close');
				$('#dgr').datagrid('reload'); // reload the user data
			} else {
				$.messager.show({
					title : '提示',
					msg : result.msg
				});
				$("#recharge_dlg").dialog('close');
				$.messager.show({ // show error message
					title : 'Error',
					msg : result.msg
				});
			}
		}, 'json');
	}
};

function showAccountDetail(id) {
	$("#createName").textbox('clear');
	var data = $('#operateType').combobox('getData');
	$("#operateType").combobox('select', data[0].value);
	$("#show_dlg").dialog('open');
	qryData = $('#detail_dgr').datagrid({
		url : ctx + "/smsAccount/queryAccountDetails?smsAccountId=" + id,
		queryParams : {},
		fit : false,
		fitColumns : true,
		border : false,
		pagination : true,
		idField : 'smsRechargeLogId',
		rownumbers : true,
		// 默认加载20条记录
		pageSize : 20,
		pageList : [ 20, 30, 40, 50, 100 ],
		checkOnSelect : false,
		/*
		 * frozenColumns : [ [ { field : '', title : 'ID', checkbox : false } ] ],
		 */
		columns : [ [ {
			field : 'operateType',
			title : '操作类型',
			width : getWidth(0.24, 6),
			align : 'center',
			// 充值操作类型 I转入 O转出 C 消费 R 发送失败释放 F冻结
			formatter : function(value, row, index) {
				// 状态 A 正常P 欠费 D禁用
				var view = "";
				if (row.operateType == 'I') {
					view = "充值";
				} else if (row.operateType == 'C') {
					view = "消费";
				} else if (row.operateType == 'R') {
					view = "发送失败释放";
				} else if (row.operateType == 'F') {
					view = "冻结";
				}
				return view;
			}
		}, {
			field : 'smsRechargeLimit',
			title : '操作额度',
			width : getWidth(0.24, 6),
			align : 'center'

		}, {
			field : 'smsBalances',
			title : '可用短信量',
			width : getWidth(0.24, 6),
			align : 'center'

		}, {
			field : 'smsRechargeData',
			title : '操作时间',
			width : getWidth(0.24, 6),
			align : 'center',
			formatter : Common.TimeFormatter
		}, {
			field : 'smsRechargeSts',
			title : '是否成功',
			width : getWidth(0.24, 11),
			align : 'center',
			formatter : function(value) {
				var view = '';
				if (value == 'F') {
					view = '失败';
				} else if (value == 'S') {
					view = '成功';
				}
				return view;
			}
		}, {
			field : 'createName',
			title : '操作人',
			width : getWidth(0.24, 6),
			align : 'center'

		} ] ],
		pagination : true,
		onLoadSuccess : function() {
			$(this).datagrid("fixRownumber");
		}
	});
}

function queryForm() {
	
	var smsAccountId = $("#smsAccountId").val();
	if(null!=smsAccountId && smsAccountId!=""){
		if(!/^[A-Za-z0-9_]+$/.test(smsAccountId)){
			jQuery.messager.alert("错误提示:","账户标识只能是字母数字下划线或者组合");
		    return false;
		 }
	}
	
	formData.datagrid('reload', {
		smsMappingSystem : $("#smsDomain").combobox("getValue"),
		smsAccountType : $("#smsSendType").combobox("getValue"),
		suppliersId : $("#smsSuppliers").combobox("getValue"),
		smsAccountId : $("#smsAccountId").val()
	});
}

function qryDetailForm() {
	qryData.datagrid('reload', {
		operateType : $("#operateType").combobox("getValue"),
		createName : $("#createName").val()
	});
}

function unUse(id) {
	$.messager.confirm('Confirm', '您确定要禁用吗?', function(r) {
		if (r) {
			$.post(ctx + '/smsAccount/updateSts?smsAccountId=' + id + '&sts=D',
					function(result) {
						if (result.success) {
							$('#dgr').datagrid('reload'); // reload the user
							// data
						} else {
							$.messager.show({ // show error message
								title : 'Error',
								msg : result.msg
							});
						}
					}, 'json');
		}
	});
}

function toUse(id) {
	$.messager.confirm('Confirm', '您确定要启用吗?', function(r) {
		if (r) {
			$.post(ctx + '/smsAccount/updateSts?smsAccountId=' + id + '&sts=A',
					function(result) {
						if (result.success) {
							$('#dgr').datagrid('reload'); // reload the user
							// data
						} else {
							$.messager.show({ // show error message
								title : 'Error',
								msg : result.msg
							});
						}
					}, 'json');
		}
	});
}

function showAddWindow(form) {
	$("#" + form).form("clear");
	$('#save_smsSuppliers').combobox({
		url : ctx + '/smsSuppliers/qrySmsSuppliers?sts=A',
		editable : false,
		valueField : 'suppliersId',

		textField : 'suppliersName',
		onLoadSuccess : function() { // 加载完成后,设置选中第一项
			var val = $('#save_smsSuppliers').combobox("getData");
			$('#save_smsSuppliers').combobox("select", val[0].suppliersId);
		}
	});
	var data = $('#save_smsSendType').combobox('getData');
	$("#save_smsSendType").combobox('select', data[0].value);
	$('#save_smsDomain').combobox({
		url : ctx + '/dictionary/qrySmsDomians',
		editable : false,
		valueField : 'smsDomainId',

		textField : 'smsDomainName',
		onLoadSuccess : function() { // 加载完成后,设置选中第一项
			var val = $('#save_smsDomain').combobox("getData");
			$('#save_smsDomain').combobox("select", val[0].smsDomainId);
		}
	});
	$('#' + form).window('open');
}

function save(form, url, dialog) {
	var sigers = $("#signers").val();
	var newPar = /^[\u4e00-\u9fa5，【】]*$/;
	if (sigers.indexOf('【') == -1 || sigers.indexOf('】') == -1) {
		$.messager.alert('提示:', '签名须包含‘【】’', 'info');
		return;
	}
	if (!newPar.test(sigers)) {
		$.messager.alert('提示:', '只能输入中文及中文的‘【】，’！', 'info');
		return;
	}
	var tempsigners = {
		"signers" : sigers,
		"smsAccountName" : $("#smsAccountName").val(),
		"smsMappingSystem" : $("#save_smsDomain").combobox("getValue"),
		"suppliersId" : $("#save_smsSuppliers ").combobox("getValue"),
		"smsAccountType" : $("#save_smsSendType ").combobox("getValue"),
		"suppliersAccountId" : $("#suppliersAccountId").val()
	};
	var dataParams = $.param(tempsigners);
	if ($('#J_Form').form('validate')) {
		$.post(ctx + '/smsAccount/querySmsAccounts', {
			smsAccountName : $("#smsAccountName").val()
		}, function(result) {
			if (jQuery.isEmptyObject(result)) {
				$.ajax({
					cache : true,
					type : "POST",
					url : ctx + "/smsAccount/save",
					data : dataParams,// 你的formid
					async : false,
					dataType : "json",
					error : function(request) {
						$.messager.show({
							title : '提示信息!',
							msg : '系统超时,请稍后再试！'
						});
					},
					success : function(data) {
						$.messager.show({
							title : '提示信息!',
							msg : data.msg
						});
						$(dialog).dialog('close'); // close the dialog
						$('#dgr').datagrid('load'); // reload the user data
					}
				});
			} else {
				$.messager.alert('提示:', '账号已经存在，请重新输入！', 'info');
				return;
			}
		}, 'json');
	}
}

function edit() {
	var row = $('#dgr').datagrid('getChecked');
	if (row.length > 1 || row.length == 0) {
		$.messager.alert('提示:', '请选择一条数据进行编辑！', 'info');
		return;
	}
	if (row) {

		$('#edit_dlg').dialog('open');
		$('#form_edit').form('load', row[0]);

	}
}

function update() {

	if ($('#form_edit').form('validate')) {
		$.ajax({
			cache : true,
			type : "POST",
			url : ctx + "/smsAccount/update",
			data : $('#form_edit').serialize(),// 你的formid
			async : false,
			dataType : "json",
			error : function(request) {
				$.messager.show({
					title : '提示信息!',
					msg : '系统超时,请稍后再试！'
				});
			},
			success : function(data) {
				$.messager.show({
					title : '提示信息!',
					msg : data.msg
				});
				$("#edit_dlg").dialog('close'); // close the dialog
				$('#dgr').datagrid('reload'); // reload the user data
			}
		});

	}
}

function closeDialog(div) {
	if (div != '' && div != null && div != undefined) {
		$(div).dialog('close');
	}
}

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

function showAlarmnumber(idAndName) {
	var id = idAndName.split(",")[0];
	var name = idAndName.split(",")[1];
	$("#alarmphone").val();

	$("#alarmTimeSplit").combobox("select", 1);
	$.ajax({
		cache : false,
		type : "POST",
		url : ctx + "/smsAccount/getSmsAlarmValve?id=" + id,
		async : false,
		dataType : "json",
		success : function(data) {
			$("#smsAccountIdname").textbox('setValue', name);
			$("#smsAccountIdname").textbox('readonly', true);
			$("#alarmnumber").textbox('setValue', data.alarmnumber + "");

			$("#smsAccountIdforAlarm").val(data.smsAccountId + "");
			if (typeof (data.alarmphone) == 'string') {
				$("#alarmphone").val(data.alarmphone + "");
			} else {
				$("#alarmphone").val("");
			}
			val
			timeinterval = data.alarmTimeSplit;
			if (timeinterval && ('undefined' != timeinterval)
					&& ('' != timeinterval)) {

				var val = $('#alarmTimeSplit').combobox("getData");
				$("#alarmTimeSplit").combobox("select", timeinterval);
			}
		}
	});
	$("#show_alarm").dialog('open');
}

function isNumber(strNumber) {
	var newPar = /^[0-9]*$/
	if (!newPar.test(strNumber)) {
		$.messager.alert('提示:', '请输入正确的余额！', 'info');
		return false;
	} else {
		if (trim(strNumber).length > 9) {

			$.messager.alert('提示:', '最多输入9位数字!', 'info');
			return false;
		}
		return true;
	}
}

function isPhone(value) {
	var reg = /^1[3|4|5|8|9]\d{9}$/;
	if (!reg.test(value)) {
		$.messager.alert('提示:', '请输入正确的手机号！', 'info');
		return false;
	} else {
		return true;
	}
}

function trim(str) {
	str = str.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}
function saveAlarm() {
	var alarmnumbers = $("#alarmnumber").val();
	var alarmphone = $("#alarmphone").val();

	if (!isNumber(alarmnumbers)) {
		return;
	}
	if ("" == alarmphone || alarmphone.split(",").length == 0
			|| alarmphone.split(",").length > 255) {
		$.messager.alert('提示:', '请输入11位的手机号,最多21个手机号！', 'info');
		return;
	}
	var tmp = alarmphone.split(",");

	for (var i = 0; i < tmp.length; i++) {
		if ((tmp[i].length != 0) && (!isPhone(trim(tmp[i])))) {
			return;
		}
	}

	$.ajax({
		cache : true,
		type : "POST",
		url : ctx + "/smsAccount/saveAlarm ",
		async : false,
		dataType : "json",
		data : $('#alarmForm').serialize(),
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
			setTimeout("redirectTolist()", 1000);

		}
	});
}

function redirectTolist() {

	$("#show_alarm").dialog('close'); // close the dialog
	$('#dgr').datagrid('reload'); // reload the user data
}