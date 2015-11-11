var formData;
var qryData;
$(function() {

	// 初始化机构树
	var zNodes = [];
	$.ajax({
		cache : true,
		type : "POST",
		url : ctx + "/organization/getOrganizationAll",
		async : false,
		dataType : "json",
		success : function(data) {
			zNodes = data;

			for (var i = 0; i < zNodes.length; i++) {
				zNodes[i].pId = data[i].parentId;

				zNodes[i].open = data[i].rootNode;
			}

		}
	});

	$(function() {
		var setting = {
			data : {
				simpleData : {
					enable : true
				}
			},
			callback : {
				onClick : function(event, treeId, treeNode) {
					$('#organizationIdadd').val(treeNode.id);// 赋值
					// .val(treeNode.id)
					// ;
					$('#organizationName').textbox('setValue', treeNode.name);// 赋值
					// val(treeNode.name)
					// ;
				}
			}
		};

		var settingUpdate = {
			data : {
				simpleData : {
					enable : true
				}
			},
			callback : {
				onClick : function(event, treeId, treeNode) {
					$('#organizationIdUpdate').val(treeNode.id);// 赋值
					// .val(treeNode.id)
					// ;
					$('#organizationNameUpdate').textbox('setValue',
							treeNode.name);// 赋值
					// val(treeNode.name)
					// ;
				}
			}
		};

		$(document).ready(function() {
			$.fn.zTree.init($("#tree"), setting, zNodes);
		});

		$(document).ready(function() {
			$.fn.zTree.init($("#treeupdate"), settingUpdate, zNodes);
		});
	});

	$('#roleIdsStr').combobox({

		url : ctx + '/user/getRoles',

		valueField : 'id',
		editable : false,
		textField : 'description',
		onLoadSuccess : function() { // 加载完成后,设置选中第一项
			var val = $(this).combobox("getData");
			$(this).combobox("select", val[0].id);
		}

	});

	$('#organizationId').combobox({

		url : ctx + '/user/getOrganizationAll',

		valueField : 'id',
		editable : false,
		textField : 'name',
		onLoadSuccess : function() { // 加载完成后,设置选中第一项
			var val = $(this).combobox("getData");

			$(this).combobox("select", val[0].id);
		}

	});

	// 生成数据
	formData = $('#dgr')
			.datagrid(
					{
						url : ctx + "/user/userlist",
						fit : true,
						fitColumns : true,
						border : false,
						pagination : true,
						idField : 'id',
						rownumbers : true,
						// 默认加载20条记录
						pageSize : 20,
						pageList : [ 2, 20, 30, 40, 50, 100 ],
						columns : [ [
								{
									field : 'id',
									title : '用户标识',
									width : getWidth(0.24, 4),
									align : 'left'
								},

								{
									field : 'username',
									title : '用户名称',
									width : getWidth(0.24, 5),
									align : 'left'
								},

								{
									field : 'orgnizationName',
									title : '用户所属组织名称',
									width : getWidth(0.24, 5),
									align : 'left'
								},
								{
									field : 'roleNames',
									title : '角色列表',
									width : getWidth(0.24, 7),
									align : 'center',
									formatter : function(value, row, index) {
										if (value) {
											var showtitle = value.substring(0,
													5);
											if (value.length > 5) {
												showtitle = showtitle + "...";
											}

											var content = "<a href='javascript:showMsg(\""
													+ value
													+ "\");' titile='"
													+ value
													+ "' class='content'>"
													+ showtitle + "</a>";

											return content;
										}
									}
								},
								{
									field : 'locked',
									title : '是否可用',
									width : getWidth(0.24, 6),
									align : 'left',
									formatter : function(value) {
										if (value != null) {
											if (value == 0) {
												value = '是'
											} else {
												value = '否'
											}
										}
										return value;
									}
								}

								,
								{
									field : 'roleIdsStr',
									title : '角色ID',
									width : getWidth(0.24, 6),
									align : 'left'
								},
								{
									field : 'opt',
									title : '操作',
									align : 'center',
									width : getWidth(0.24, 6),
									formatter : function(value, row, index) {
										if (row.locked != 0) {
											value = '----'
										} else {
											value = "<a href='javascript:updateUser(\""
													+ row.id
													+ "\","
													+ "\""
													+ row.username
													+ "\","

													+ "\""
													+ row.roleIdsStr
													+ "\","

													+ "\""
													+ row.password
													+ "\","
													+ "\""
													+ row.orgnizationName
													+ "\");'>更新</a>"
													+ "<a href='javascript:delUser(\""
													+ row.id
													+ "\");'>  删除  </a>";
										}
										return value;
									}
								}

						] ],
						toolbar : '#toolbar',
						pagination : true,
						onLoadSuccess : function() {
							// 解决 如果Rownumber越来越大,达到三位数或者四位数的时候,Rownumber就显示不全了
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
function clearForm() {
	/*
	 * $('#queryForm').form('clear');
	 */
	$("#username").textbox('setValue', '')// 赋值
	var organizationId = $("#organizationId").combobox("getData");
	$("#organizationId").combobox("select", organizationId[0].id);

}

function delUser(userid) {
	$.messager.confirm('删除提醒', '您确定要删除吗?', function(r) {
		if (r) {
			$.post(ctx + '/user/deleteUser?userid=' + userid, function(result) {

				$.messager.show({ // show error message
					title : '提示信息',
					msg : '操作成功'
				});
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

function updateUser(userid, username, roleIdsStr, password, orgnizationName) {

	$('#useridUpdate').val(userid);
	$('#usernameupdate').textbox('setValue', username);
	$('#uppassword').textbox('setValue', password);
	$('#organizationNameUpdate').textbox('setValue', orgnizationName);

	var roleArr = roleIdsStr.split(",");
	$('#roleIdsStrupdate').combobox({

		url : ctx + '/user/getRoles',

		valueField : 'id',
		editable : false,
		textField : 'description',
		onLoadSuccess : function() { // 加载完成后,设置选中第一项
			var val = $(this).combobox("getData");
			for ( var data in val) {
				for ( var roleid in roleArr) {
					if (roleArr[roleid] == val[data].id) {
						$(this).combobox("select", val[data].id);
					}
				}

			}

		}

	});

	$('#update_dlg').window('open');
}

function showMsg(msg) {
	jQuery.messager.alert("提示内容:", msg);
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

function queryForm() {

	formData.datagrid('reload', {
		username : $("#username").textbox('getValue'),
		organizationId : $("#organizationId").combobox("getValue")
	});
}

function showAddWindow(form) {

	$('#' + form).window('open');
}

function save(form, url, dialog) {
	// 当select 设置成 multiple时，返回的是数组，如果不转化，则传递到后台就成了roleIdsStr[]了。
	var tmproles = $("#roleIdsStr").combobox("getValues");
	var ss = '';
	for ( var s in tmproles) {
		// 这里s原来是数组下标啊
		ss += tmproles[s] + ",";
	}
	var tempdata = {
		"usernameadd" : $("#usernameadd").textbox('getValue'),
		"password" : $("#password").val(),
		"organizationIdadd" : $("#organizationIdadd").val(),
		"roleIdsStr" : ss
	};

	var dataParams = $.param(tempdata);
	if ($('#J_Form').form('validate')) {
		$.post(ctx + '/user/queryUserName', {
			"username" : $("#usernameadd").textbox('getValue')
		}, function(result) {
			if (jQuery.isEmptyObject(result)) {
				$.ajax({
					cache : false,
					type : "POST",
					url : ctx + "/user/createUser",
					data : dataParams,
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
				$.messager.alert('提示:', '账号已经存在，请重新输入！', 'info');
				return;
			}
		}, 'json');
	}
}

function edit(form, url, dialog) {
	// 当select 设置成 multiple时，返回的是数组，如果不转化，则传递到后台就成了roleIdsStr[]了。
	var tmproles = $("#roleIdsStrupdate").combobox("getValues");
	var ss = '';
	for ( var s in tmproles) {
		// 这里s原来是数组下标啊
		ss += tmproles[s] + ",";
	}
	var tempdata = {
		"id" : $("#useridUpdate").val(),
		"username" : $("#usernameupdate").textbox('getValue'),
		"password" : $("#uppassword").val(),
		"organizationId" : $("#organizationIdUpdate").val(),
		"roleIdsStr" : ss
	};

	var dataParams = $.param(tempdata);
	if ($('#update_Form').form('validate')) {

		$.ajax({
			cache : false,
			type : "POST",
			url : ctx + "/user/updateUser",
			data : dataParams,
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
