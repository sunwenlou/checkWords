var formData;
$(function() {
	// 生成数据
	formData = $('#dgr')
			.datagrid(
					{
						url : ctx + "/smsSuppliers/queryPageList",
						fit : true,
						fitColumns : true,
						border : false,
						pagination : true,
						idField : 'suppliersId',
						rownumbers : true,
						// 默认加载20条记录
						pageSize : 20,
						pageList : [ 20, 30, 40, 50, 100 ],
						checkOnSelect : true,
						frozenColumns : [ [ {
							field : 'suppliersId',
							title : 'ID',
							checkbox : true
						} ] ],
						columns : [ [
								{
									field : 'suppliersName',
									title : '供应商名称',
									width : getWidth(0.24, 6),
									align : 'center',
									formatter : function(value, row, index) {
										var valueaccount = value;
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
									field : 'contact',
									title : '联系人',
									width : getWidth(0.24, 6),
									align : 'center',
									formatter : function(value, row, index) {
										var valueaccount = value;
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
									field : 'mobile',
									title : '手机',
									width : getWidth(0.24, 6),
									align : 'center'
								},
								{
									field : 'landline',
									title : '座机',
									width : getWidth(0.24, 6),
									align : 'center'
								},
								{
									field : 'qq',
									title : 'QQ',
									width : getWidth(0.24, 6),
									align : 'center'
								},
								{
									field : 'introductions',
									title : '说明',
									width : getWidth(0.24, 6),
									align : 'center',
									formatter : function(value, row, index) {
										var view = row.introductions;
										// 状态 A 正常P 欠费 D禁用
										if (null == view || view == "") {
											return "";
										}
										view = view.replace(/</g, "&lt;");
										view = view.replace(/>/g, "&gt;");
										return view;
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
													+ row.suppliersId
													+ "\");'>启用<a/>";
										} else if (row.sts == 'P'
												|| row.sts == 'A') {
											view = "<a href='javascript:toUse(\""
													+ row.suppliersId
													+ "\");'>启用</a>&nbsp;&nbsp;<a href='javascript:unUse(\""
													+ row.suppliersId
													+ "\");'>禁用</a>";
										}
										return view;
									}
								}

						] ],
						toolbar : '#toolbar',
						pagination : true
					});
});

function unUse(id) {
	$.messager.confirm('Confirm', '您确定要禁用吗?', function(r) {
		if (r) {
			$.post(
					ctx + '/smsSuppliers/updateSts?suppliersId=' + id
							+ '&sts=D', function(result) {
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
			$.post(
					ctx + '/smsSuppliers/updateSts?suppliersId=' + id
							+ '&sts=A', function(result) {
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
	$('#' + form).window('open');
}

function save(form, url, dialog) {
	var tags=$("#saveunsubscribeTag").val();
	if(!validateTag(tags)){
	return false;
	}
/*	if (!$(form).form('validate'))
		return false;*/
	var jsonempinfo = serializeForm($(form));
	var jsonemp = JSON.stringify(jsonempinfo);
	
	var tempsigners = {
			"suppliersName" : $("#suppliersName").val(),
			"suppliersAccountId" : $("#suppliersAccountId").val(),
			"contact" : $("#contact").val(),
			"mobile" : $("#mobile").val(),
			"landline" : $("#landline").val(),
			"qq" : $("#qq").val(),
			"introductions" : $("#introductions").val(),
			"saveunsubscribeTag" : $("#saveunsubscribeTag").val()
		};
		var dataParams = $.param(tempsigners);
	if ($('#J_Form').form('validate')) {
		$.post(ctx + '/smsSuppliers/qrySmsSuppliers', {
			suppliersName : $("#suppliersName").val()
		}, function(result) {
			if (jQuery.isEmptyObject(result)) {
				$.ajax({
					cache : true,
					type : "POST",
					url : ctx + "/smsSuppliers/save",
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
						$('#dgr').datagrid('reload'); // reload the user data
					}
				});

			} else {
				$.messager.alert('提示:', '供应商已经存在，请重新输入！', 'info');
				return;
			}
		}, 'json');
	}else{
		return false;
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
function validateTag(value) {
	var rex = /^[\u4e00-\u9fa5]+[a-zA-Z]+$/;
	if (trim(value).length > 20 || trim(value).length == 0 || '' == value) {
		$.messager.alert('提示:', '请输入20位以内的以中文开始以字母结束的字符', 'info');
		return false;
	}

	if (rex.test(value)) {

		return true;
	} else {
		// alert('false '+value);

		$.messager.alert('提示:', '请输入20位以内的以中文开始以字母结束的字符', 'info');
		return false;
	}

}
function update() {
	// if (!$("#form_edit").form('validate'))
	// return false;
	// var jsonempinfo = serializeForm($("#form_edit"));
	// var jsonemp = JSON.stringify(jsonempinfo);
	var tags=$("#edit_unsubscribeTag").val();
	if(!validateTag(tags)){
	return false;
	}
	if ($('#form_edit').form('validate')) {
		$.ajax({
			cache : true,
			type : "POST",
			url : ctx + "/smsSuppliers/update",
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

function delt() {
	var ids = [];
	var rows = $('#dgr').datagrid('getChecked');
	if (rows.length == 0) {
		$.messager.alert('提示:', '请选择一条数据进行禁用！', 'info');
		return;
	}
	for (var i = 0; i < rows.length; i++) {
		ids.push(rows[i].suppliersId);
	}
	if (ids) {
		$.messager.confirm('Confirm', '您确定要禁用吗?', function(r) {
			if (r) {
				$.post(ctx + '/smsSuppliers/delete?ids=' + ids,
						function(result) {
							if (result.success) {
								$('#dgr').datagrid('reload'); // reload the
																// user data
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
}

function closeDialog(div) {
	if (div != '' && div != null && div != undefined) {
		$(div).dialog('close');
	}
}

function clearForm(form) {
	$(form).form("clear");
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
