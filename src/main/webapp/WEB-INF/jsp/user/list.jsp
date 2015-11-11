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
		<div data-options="region:'north',border:false"
			style="height: 95px; overflow: hidden; width: 95%;">
			<form id="queryForm" method="post">
				<table style="width: 100%; margin-top: 20px;">
					<tr>
						<td>用户名称：&nbsp; <select class="easyui-textbox" id="username"
							name="username" style="width: 120px;">
						</select>
						</td>
						<td>所属组织：&nbsp; <select class="easyui-combobox"
							data-options="editable:false" id="organizationId"
							name="organizationId" style="width: 120px;">
						</select>
						</td>
						<td>&nbsp;<a href="#" onclick="queryForm();"
							class="easyui-linkbutton" icon="icon-search">查询</a> &nbsp;<a
							href="#" onclick="clearForm();" class="easyui-linkbutton"
							icon="icon-clear">清除</a></td>

					</tr>
				</table>
			</form>
		</div>
		<div region="center">
			<table id="dgr"></table>
			<div id="toolbar">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconCls="icon-add" plain="true" onclick="showAddWindow('save_dlg')">新增</a>
			</div>
		</div>
		<div id="save_dlg" class="easyui-dialog" title="新增用户" closed=true
			closable=true collapsible=false minimizable=false maximizable=false
			style="width: 550px; height: 400px; padding: 10px" modal=true
			buttons="#dlg_buttons">
			<form id="J_Form" method="post">
				<table>
					<tr>
						<td align="right"><label class="control-label"><font
								color=red>*</font>用户名:</label></td>
						<td align="left" colspan="2"><input
							class="easyui-textbox validatebox" id="usernameadd"
							name="usernameadd"
							data-options="required:true,validType:'length[1,30]'"
							style="width: 155px;" /></td>
					</tr>
					<tr>
						<td align="right"><label class="control-label"><font
								color=red></font>密码:</label></td>
						<td align="left" colspan="2"><input id="password"
							name="password" validType="length[4,32]"
							class="easyui-validatebox" required="true" type="password" /></td>

					</tr>

					<tr>
						<td align="right"><label class="control-label"><font
								color=red></font> 确认密码:</label></td>
						<td align="left"><input id="repassword" name="repassword"
							class="easyui-validatebox" required="true" type="password"
							validType="equalTo['#password']" invalidMessage="两次输入密码不匹配" /></td>

					</tr>

					<tr>
						<td align="right" style="height: 50px;"><label
							class="control-label"><font color=red>*</font>所属组织:</label></td>
						<td align="left" style="height: 50px;"><input
							class="easyui-textbox" data-options="editable:false"
							id="organizationName" name="organizationName"
							style="width: 120px;" readonly> <input type="hidden"
							name="organizationIdadd" id="organizationIdadd"></td>
						<td><div style="height: 50px;">
								<ul id="tree" class="ztree"></ul>
							</div></td>
					</tr>

					<tr>
						<td align="right"><label class="control-label"><font
								color=red></font>角色:</label></td>
						<td align="left"><select class="easyui-combobox"
							data-options="editable:false" id="roleIdsStr" name="roleIdsStr"
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


		<div id="update_dlg" class="easyui-dialog" title="修改用户" closed=true
			closable=true collapsible=false minimizable=false maximizable=false
			style="width: 550px; height: 400px; padding: 10px" modal=true
			buttons="#dlg_updatebuttons">
			<form id="update_Form" method="post">
				<table>
					<tr>
						<td align="right">
						
						<input type="hidden" id="useridUpdate" name="useridUpdate">
						<label class="control-label"><font
								color=red>*</font>用户名:</label></td>
						<td align="left" colspan="2"><input
							class="easyui-textbox " id="usernameupdate"
							name="usernameupdate" readonly
							style="width: 155px;" /></td>
					</tr>
					<tr>
						<td align="right"><label class="control-label"><font
								color=red></font>密码:</label></td>
						<td align="left" colspan="2"><input id="uppassword"
							name="uppassword" validType="length[4,32]"
							class="easyui-textbox validatebox" required="true" type="password" /></td>

					</tr>

					<tr>
						<td align="right"><label class="control-label"><font
								color=red></font> 确认密码:</label></td>
						<td align="left"><input id="reuppassword" name="reuppassword"
							class="easyui-validatebox"   type="password"
							validType="equalTo['#uppassword']" invalidMessage="两次输入密码不匹配" /></td>

					</tr>

					<tr>
						<td align="right" style="height: 50px;"><label
							class="control-label"><font color=red>*</font>所属组织:</label></td>
						<td align="left" style="height: 50px;"><input
							class="easyui-textbox" data-options="editable:false"
							id="organizationNameUpdate" name="organizationNameUpdate"
							style="width: 120px;" readonly> <input type="hidden"
							name="organizationIdUpdate" id="organizationIdUpdate"></td>
						<td><div style="height: 50px;">
								<ul id="treeupdate" class="ztree"></ul>
							</div></td>
					</tr>

					<tr>
						<td align="right"><label class="control-label"><font
								color=red></font>角色:</label></td>
						<td align="left"><select class="easyui-combobox"
							data-options="editable:false" id="roleIdsStrupdate" name="roleIdsStrupdate"
							style="width: 120px;" multiple="true"></select></td>

					</tr>
				</table>


			</form>

			<div style="text-align: center" id="dlg_updatebuttons">
				<a id="btnUpdate" href="#" class="easyui-linkbutton c6"
					onclick="edit('#update_Form','/user/update','#update_dlg')"
					style="width: 75px">更新</a> <a id="btnCancel" href="#"
					class="easyui-linkbutton" iconCls="icon-cancel"
					onclick="javascript:$('#update_dlg').dialog('close')"
					style="width: 75px">取消</a>
			</div>
		</div>






		<script type="text/javascript"
			src="${ctx}/resources/userJs/user/user.js">
			
		</script>
</body>
</html>