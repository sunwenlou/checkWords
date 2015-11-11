<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<html>
<head>
<title>用户管理</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/style/styles.css">
</head>
<link rel="stylesheet"
	href="${ctx}/resources/pluginJs/zTree/css/ztree.css">

<script
	src="${ctx}/resources/pluginJs/zTree/js/jquery.ztree.all-3.5.min.js"></script>
<body>

	<div class="easyui-layout" data-options="fit : true,border : false"
		align="center"
		style="margin-left: 4px; padding-left: 4px; padding-right: 5px; padding-bottom: 5px;">
		<div region="center">
			<table id="dgr"></table>
			<div id="toolbar">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconCls="icon-add" plain="true" onclick="showAddWindow('save_dlg')">新增</a>
			</div>
		</div>
		<div id="save_dlg" class="easyui-dialog" title="新增角色" closed=true
			closable=true collapsible=false minimizable=false maximizable=false
			style="width: 550px; height: 400px; padding: 10px" modal=true
			buttons="#dlg_buttons">
			<form id="J_Form" method="post">
				<table>
					<tr>
						<td align="right"><label class="control-label"><font
								color=red>*</font>角色名:</label></td>
						<td align="left" colspan="2"><input
							class="easyui-textbox validatebox" id="role"
							name="role"
							data-options="required:true,validType:'length[1,30]'"
							style="width: 155px;" /></td>
					</tr>
					<tr>
						<td align="right"><label class="control-label"><font
								color=red></font>角色描述:</label></td>
						<td align="left" colspan="2"><input id="description"
							name="description" validType="length[0,32]"
							class="easyui-textbox validatebox" /></td>

					</tr>

					<tr>
						<td align="right"><label class="control-label"><font
								color=red></font>角色:</label></td>
						<td align="left"><select class="easyui-combobox"
							data-options="editable:false" id="resourceIds" name="resourceIds"
							style="width: 120px;" multiple="true"></select></td>

					</tr>
				</table>


			</form>

			<div style="text-align: center" id="dlg_buttons">
				<a id="btnSave" href="#" class="easyui-linkbutton c6"
					onclick="save('#J_Form','/user/create','#save_dlg')"
					style="width: 75px">保存</a> <a id="btnCancel" href="#"
					class="easyui-linkbutton" iconCls="icon-cancel"
					onclick="javascript:$('#save_dlg').dialog('close')"
					style="width: 75px">取消</a>
			</div>
		</div>


		<div id="update_dlg" class="easyui-dialog" title="修改角色" closed=true
			closable=true collapsible=false minimizable=false maximizable=false
			style="width: 550px; height: 400px; padding: 10px" modal=true
			buttons="#dlg_updatebuttons">
			<form id="update_Form" method="post">
				<table>
					<tr>
						<td align="right">
						
						<input type="hidden" id="roleidUpdate" name="roleidUpdate">
						<label class="control-label"><font
								color=red>*</font>角色名称:</label></td>
						<td align="left" colspan="2"><input
							class="easyui-textbox " id="rolenameupdate"
							name="rolenameupdate" readonly
							style="width: 155px;" /></td>
					</tr>
					<tr>
						<td align="right"><label class="control-label"><font
								color=red></font>描述:</label></td>
						<td align="left" colspan="2"><input id="descriptionUpdate"
							name="descriptionUpdate" validType="length[0,32]"
							class="easyui-textbox validatebox" /></td>

					</tr>

					<tr>
						<td align="right" style="height: 50px;"><label
							class="control-label"><font color=red>*</font>拥有的资源:</label></td>
						<td align="left" style="height: 50px;"><input
							class="easyui-combobox" data-options="editable:false"
							id="resourceNameUpdate" name="resourceNameUpdate"
							style="width: 120px;"   multiple="true"> <input type="hidden"
							name="resourceIdUpdate" id="resourceIdUpdate"></td>
					</tr>

				</table>


			</form>

			<div style="text-align: center" id="dlg_updatebuttons">
				<a id="btnUpdate" href="#" class="easyui-linkbutton c6"
					onclick="edit('#update_Form','/role/update','#update_dlg')"
					style="width: 75px">更新</a> <a id="btnCancel" href="#"
					class="easyui-linkbutton" iconCls="icon-cancel"
					onclick="javascript:$('#update_dlg').dialog('close')"
					style="width: 75px">取消</a>
			</div>
		</div>






		<script type="text/javascript"
			src="${ctx}/resources/userJs/roleManager/roleMana.js">
			
		</script>
</body>
</html>