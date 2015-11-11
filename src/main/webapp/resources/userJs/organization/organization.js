var formData;
var qryData;
$(function() {

	// 生成数据
	formData = $('#dgr')
			.datagrid(
					{
						url : ctx + "/organization/listOrganzation",
						fit : true,
						fitColumns : true,
						border : false,
						pagination : true,
						idField : 'id',
						rownumbers : false,
						// 默认加载20条记录
						pageSize : 20,
						pageList : [ 2,20, 30, 40, 50, 100 ],
						 checkOnSelect : false,
						frozenColumns : [ [ {
							field : 'id',
							title : 'ID',
							checkbox : true
						} ] ], 
						columns : [ [
								{
									field : 'id',
									title : '组织机构标识',
									width : getWidth(0.24, 4),
									align : 'left'/*,
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
									}*/
								},
								{
									field : 'name',
									title : '组织机构名称',
									width : getWidth(0.24, 5),
									align : 'left'/*,
									formatter : function(value) {
										value = value.replace(/</g, "《");
										value = value.replace(/>/g, "》");
										value = value.replace(/&lt;/g, "《");
										value = value.replace(/&gt;/g, "》");
										value = value.replace(/'/g, "");
										return value;
									}*/
								},
								{
									field : 'parentId',
									title : '父编号',
									width : getWidth(0.24, 6),
									align : 'center'/*,
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
									}*/
								},
								{
									field : 'parentIds',
									title : '父编号列表',
									width : getWidth(0.24, 7),
									align : 'center'
								},
								{
									field : 'available',
									title : '是否可用',
									width : getWidth(0.24, 6),
									align : 'left' ,
									formatter : function(value) {
										if (value != null) {
											/*value = value.replace(/</g, "《");
											value = value.replace(/>/g, "》");
											value = value.replace(/&lt;/g, "《");
											value = value.replace(/&gt;/g, "》");
											value = value.replace(/'/g, "");*/
											if(value==true){
												value='是'
											}else{
												value='否'
											}
										}
										return value;
									} 
								}  ,
								{
									field : 'opt',
									title : '操作',
									align : 'center',
									width : getWidth(0.24, 6 )
								} 

						] ],
						toolbar : '#toolbar',
						pagination : true
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

var firstName=getOrganizationName();

//test
function getOrganizationName(){
	
	var result = "-1";
	$.ajax({
		cache : true,
		type : "POST",
		url : ctx + "/organization/getOrganizationName",
		async : false,
		dataType : "json",
		success : function(data) {
			result = data.msg;
		}
	});
	return result;
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