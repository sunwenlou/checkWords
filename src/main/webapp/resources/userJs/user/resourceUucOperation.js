//添加资源信息弹框
function addResourceUuc(resourceId, parentIds) {
	// 通过资源ID自动选择要编辑的行
	$dg.treegrid('select', resourceId);
	// 设置刷新id
	// 调用load方法把该资源的ID作为要添加资源的父ID
	$('#form_add').form('load', {
		// 此资源的resourceId就是要添加资源的父ID
		parentId : resourceId,
		parentIds : parentIds + "/" + resourceId + "/",
		// 弹层资源类型字段默认为菜单
		type : 1
	});

	// 弹出添加资源表单层
	$("#addResourceUuc").dialog("open");
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

// 保存资源操作
function saveResourceUuc() {
	// 表单校验
	if (!$('#form_add').form('validate')) {
		return;
	}
	// 获取刷新ID
	var refreshId = $('#refreshId').val();
	// 序列化表单
	var jsonempinfo = $('#form_add').serializeObject();
	// json格式化
	var jsonre = JSON.stringify(jsonempinfo);
	$.ajax({
		async : false,
		type : "POST",
		contentType : "application/json",
		url : ctx + "/resource/add",
		data : jsonre,
		dataType : 'json',
		success : function(result) {
			if (result.status == 'success') {
				// 关闭窗口
				$('#addResourceUuc').dialog('close');
				// 刷新整个数据表格
				// $dg.treegrid('reload');
				// 根据ID刷新
				$dg.treegrid('reload', refreshId);
				// 给提示信息
				$.messager.show({
					title : '提示信息!',
					msg : result.msg
				});
				// 清楚刷新ID
				$('#refreshId').val("");
				// 添加成功后清空数据，，防止下次弹框会有原来信息带出
				$('#form_add').form('clear');
			} else {
				$.messager.show({
					title : '提示信息!',
					msg : result.msg
				});
				// 清楚刷新ID
				$('#refreshId').val("");
			}
		}
	});
}

// 编辑选中的资源
function editResourceUucById(id, name, resourceFlag, url, type, resourceDesc,
		resourceSort) {
	// 通过资源ID自动选择要编辑的行
	$dg.treegrid('select', id);
	// 获取行信息
	// 通过资源ID自动选择要编辑的行
	// 弹出编辑层
	$("#editResourceUuc").dialog("open").dialog('setTitle', '编辑资源');
	// 调用load方法把所选中的数据load到表单中,非常方便
	$('#form_edit').form('load', {
		reid : id,
		rename : name,
		reresourceFlag : resourceFlag,
		reurl : url,
		retype : type,
		reresourceDesc : resourceDesc,
		reresourceSort : resourceSort
	});
}

// 保存资源编辑操作
function saveEditInfo() {

	console.info(serializeForm($('#form_edit')));
	// 表单校验
	if (!$('#form_edit').form('validate')) {
		return;
	}
	var dataparam = {
		id : $("#reid").val(),
		name : $('#rename').textbox('getValue'),
		resourceFlag : $('#reresourceFlag').textbox('getValue'),
		url : $('#reurl').textbox('getValue'),
		type : $('#retype').textbox('getValue'),
		resourceDesc : $('#reresourceDesc').textbox('getValue'),
		resourceSort : $('#reresourceSort').textbox('getValue')
	};
	dataparam= $.param(dataparam);
	$.ajax({
		cache : false,
		type : "POST",
		url : ctx + "/resource/updateResource",
		data : dataparam,// 你的formid
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
			$("#editResourceUuc").dialog('close'); // close the dialog
			$('#list_data').datagrid('reload'); // reload the user data
		}
	});

	// var obj=serializeForm($('#form_edit').serializeObject(););

	/*
	 * var obj=$('#form_edit').serializeObject(); var
	 * dataparam=JSON.stringify(obj); // 序列化表单 $.ajax({ type : "GET", url : ctx +
	 * "/resource/updateResource", data : dataparam, dataType : 'json', success :
	 * function(result) { if (result.status == 'success') { // 关闭窗口
	 * $('#editResourceUuc').dialog('close'); // 1 刷新整个数据表格 //
	 * $dg.treegrid('reload'); // 根据ID刷新 $dg.treegrid('reload', refreshId); // 2
	 * 清空idField $dg.treegrid('unselectAll'); // 3 给提示信息 $.messager.show({ title :
	 * '提示信息!', msg : result.msg }); // 清楚刷新ID $('#refreshId').val(""); } else {
	 * $.messager.show({ title : '提示信息!', msg : '操作失败!' }); // 清楚刷新ID
	 * $('#refreshId').val(""); } } });
	 */
}

// 根据resourceId删除资源
function delResourceUucById(resourceId) {
	// 通过资源ID自动选择要编辑的行
	$dg.treegrid('select', resourceId);
	// 判断该资源下是否有子节点
	$.post(ctx + "/resource/isExistChildren", {
		resourceId : resourceId
	}, function(rsp) {
		// 有子节点，删除该节点及该节点下所有子节点
		if (rsp.success) {
			doDelBath(resourceId);
		} else {// 没有子节点
			doDel(resourceId);
		}
	});
}

// 没有子节点删除
function doDel(resourceId) {
	$.messager.confirm('提示信息', '您确定要删除该资源吗？', function(r) {
		if (r) {
			$.post(ctx + "/resource/del", {
				resourceId : resourceId
			}, function(rsp) {
				if (rsp.success) {
					$dg.treegrid('remove', resourceId);
					parent.$.messager.show({
						title : '提示信息!',
						msg : '操作成功!',
						timeout : 1000 * 2
					});
				} else {
					parent.$.messager.show({
						title : '提示信息!',
						msg : rsp.msg,
						timeout : 1000 * 2
					});
				}
				;
			}, "JSON").error(function() {
				parent.$.messager.show({
					title : "提示",
					msg : "提交错误了！",
					timeout : 1000 * 2
				});
			});
		} else {
			return;
		}
		;
	});
}

// 有子节点删除
function doDelBath(resourceId) {
	$.messager.confirm('提示信息', '该资源下有子节点，确认全部删除吗？', function(r) {
		if (r) {
			$.post(ctx + "/resource/del", {
				resourceId : resourceId
			}, function(rsp) {
				if (rsp.success) {
					$dg.treegrid('remove', resourceId);
					parent.$.messager.show({
						title : '提示信息!',
						msg : '操作成功!',
						timeout : 1000 * 2
					});
				} else {
					parent.$.messager.show({
						title : '提示信息!',
						msg : rsp.msg,
						timeout : 1000 * 2
					});
				}
				;
			}, "JSON").error(function() {
				parent.$.messager.show({
					title : "提示",
					msg : "提交错误了！",
					timeout : 1000 * 2
				});
			});
		} else {
			return;
		}
		;
	});
}

function collapseAll() {
	var node = $dg.treegrid('getSelected');
	if (node) {
		$dg.treegrid('collapseAll', node.resourceId);
	} else {
		$dg.treegrid('collapseAll');
	}
}
function expandAll() {
	var node = $dg.treegrid('getSelected');
	if (node) {
		$dg.treegrid('expandAll', node.resourceId);
	} else {
		$dg.treegrid('expandAll');
	}
}
function refresh() {
	$dg.treegrid('reload');
}
