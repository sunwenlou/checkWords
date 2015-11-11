var qryData;
$(function() {
	$('#uuctable2')
			.datagrid(
					{
						title : '用户列表',
						fit : true,
						fitColumns : true,
						border : false,
						height : '50px',
						pagination : true,
						idField : 'smsUucAccountId',
						rownumbers : true,
						striped : true,
						url : ctx + '/authManager/listUucAccount',
						columns : [ [
								{
									field : 'smsUucAccountName',
									title : '姓名',
									width : getWidth(6)
								},
								{
									field : 'email',
									title : '邮箱',
									width : getWidth(6)
								},

								{
									field : 'jobName',
									title : '职位',
									width : getWidth(6)

								},
								{
									field : 'dept',
									title : '所属部门',
									width : getWidth(6)

								},
								{

									title : '操作',

									field : 'ck',// 不对应数据库或json字段，取的名字

									width : getWidth(6),

									formatter : function(value, row, index) {
										// 状态 A 正常P 删除 D禁用
										var view = "";
										var accountstart = row.smsUucAccountId
												+ "," + "A";
										var accountstop = row.smsUucAccountId
												+ "," + "D";
										var accountpause = row.smsUucAccountId
												+ "," + "P";
										var uinfo = "姓名: "
												+ isNull(row.smsUucAccountName)
												+ "," + " Email: "
												+ isNull(row.email) + ","
												+ " 职位: " + isNull(row.jobName)
												+ "," + " 部门: "
												+ isNull(row.dept) + ","
												+ isNull(row.smsUucAccountId);
										if (row.sts == 'D') {
											view = "<a href='javascript:toUpdate(\""
													+ accountstart
													+ "\");'>启用<a/>";
										} else if (row.sts == 'A') {
											view = "<a href='javascript:toEdit(\""
													+ uinfo
													+ "\");'>编辑<a/>&nbsp;&nbsp;<a href='javascript:toUpdate(\""
													+ accountstop
													+ "\");'>禁用</a>";
										}

									/*	view = view
												+ "&nbsp;&nbsp;<a href='javascript:toUpdateForDel(\""
												+ accountpause + "\");'>删除<a/>"*/
										return view;
									}
								}

						] ],

					});
});

function redirectTolist() {
	window.location.href = ctx + "/authManager/authorizationlistIndex";
}
/**
 * * 判断是否null *
 * 
 * @param data
 */
function isNull(data) {
	return (data == "" || data == undefined || data == null) ? "无" : data;
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
 * 编辑
 */
function toEdit(uinfo) {

	var userinfo = uinfo.substring(0, uinfo.lastIndexOf(","));
	$("#show_dlg").dialog('open');
	$('#uinfodiv').html(userinfo);

	var accountStrlist = getAccountlist(accountStrlist, uinfo);
	$("#smsUucAccountId").val(uinfo.substring(uinfo.lastIndexOf(",") + 1));
	qryData = $('#detail_dgr').datagrid({
		title : '权限列表',
		fitColumns : true,
		border : false,
		idField : 'smsAccountId',
		rownumbers : true,
		pagination : false,
		striped : true,
		singleSelect : false,
		selectOnCheck : true,
		checkOnSelect : true,
		url : ctx + '/authManager/listsmsAccount?uinfo=' + uinfo,
		columns : [ [ {
			field : 'smsAccountName',
			title : '账户名称 ',
			width : getWidth(6) ,
			formatter:function(value,row,index){
				value = value.replace(/</g,"《"); 
				value = value.replace(/>/g,"》"); 
				value = value.replace(/&lt;/g,"《"); 
				value = value.replace(/&gt;/g,"》"); 
				value = value.replace(/'/g,""); 
				return value;
			}
			
		}, {
			field : 'smsAccountType',
			title : '账户类型',
			width : getWidth(6),
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
			field : 'smsDomainName',
			title : '系统 ',
			width : getWidth(6) 

		}, {
			field : 'suppliersName',
			title : '供应商',
			width : getWidth(6) ,
			formatter:function(value,row,index){
				value = value.replace(/</g,"《"); 
				value = value.replace(/>/g,"》"); 
				value = value.replace(/&lt;/g,"《"); 
				value = value.replace(/&gt;/g,"》"); 
				value = value.replace(/'/g,""); 
				return value;
			}
			

		}, {

			title : '分配权限',

			field : '_opt',// 不对应数据库或json字段，取的名字

			width : getWidth(6),

			formatter : function(value, row, index) { // 格式化函数添加一个操作列
				var ischecked = "";
				if (accountStrlist.indexOf(row.smsAccountId) > -1) {
					ischecked = "checked=true";
				}

				var btn = '<input type="checkbox" ' + ischecked + '/>';

				return btn;

			}
		}

		] ],

	});

	$('#smsMappingSystem').combobox({
		url : ctx + '/dictionary/querySmsDomians',

		valueField : 'smsDomainId',
		editable:false,
		textField : 'smsDomainName',
		onLoadSuccess : function() { // 加载完成后,设置选中第一项
			var val = $(this).combobox("getData");

			$(this).combobox("select", val[0].smsDomainId);
			// for ( var i in val) {
			// for ( var item in val[i]) {
			// if (item == "smsDomainId" && val[i][item] == '') {
			// alert(1);
			// $(this).combobox("select", val[0][item]);
			// }
			// }
			// }
		}
	});

}
// 解决checkbox勾选值bug问题
$.extend($.fn.datagrid.methods, {
	getChecked : function(jq) {

		var rr = [];

		var rows = jq.datagrid('getRows');
		jq.datagrid('getPanel').find('div.datagrid-cell input:checked').each(
				function() {
					var index = $(this).parents('tr:first').attr(
							'datagrid-row-index');
					rr.push(rows[index]);
				});
		return rr;

	}

});

function getAccountlist(result, uinfo) {

	$.ajax({
		cache : true,
		type : "POST",
		url : ctx + "/authManager/getAccountlist?uinfo=" + uinfo,
		async : false,
		dataType : "json",
		success : function(data) {
			result = data.msg;
		}
	});
	return result;
}
/**
 * save
 */
function save() {
	var rowsaccount = $('#detail_dgr').datagrid('getChecked');
	var rowuucstr = $("#smsUucAccountId").val();

	// 搜集account的id
	var accountStr = [];
	$.each(rowsaccount, function(index, item) {
		accountStr.push(item.smsAccountId);
	});

	$.ajax({
		cache : true,
		type : "POST",
		url : ctx + "/authManager/saveAuthorization?rowuucstr=" + rowuucstr
				+ "&accountStr=" + accountStr,
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
			setTimeout("redirectTolist()", 1000);

		}
	});
}

function redirectTolist() {
	window.location.href = ctx + "/authManager/authorizationlistIndex";
}

/**
 * 更新
 */
function toUpdate(sts) {

	$.ajax({
		cache : true,
		type : "POST",
		url : ctx + "/authManager/updateAuthorization?sts=" + sts,
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
			setTimeout("redirectTolist()", 1000);

		}
	});

}

function toUpdateForDel(sts) {
	$.messager.confirm('提示信息', '您确定要删除该信息吗？', function(r) {
		if (r) {
			$.ajax({
				cache : true,
				type : "POST",
				url : ctx + "/authManager/updateAuthorization?sts=" + sts,
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
					setTimeout("redirectTolist()", 1000);

				}
			});
		}
	});

}

/**
 * 分页模糊查询
 */
function searchUucUsers() {
	$('#uuctable2').datagrid("clearChecked");
	$('#uuctable2').datagrid('load', serializeForm($('#uucform2')));
}

function searchsmsAccount() {
	$('#detail_dgr').datagrid("clearChecked");
	$('#detail_dgr').datagrid('load', serializeForm($('#qryDetailForm')));
}



function clearForm() {
	$('#qryDetailForm').form('clear');

	var smsDomain = $("#smsMappingSystem").combobox("getData");
	$("#smsMappingSystem").combobox("select", smsDomain[0].smsDomainId);

	var smsAccountType = $('#smsAccountType').combobox('getData');
	$("#smsAccountType").combobox('select', smsAccountType[0].value);

}