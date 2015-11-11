<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>资源管理</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="description" content="This is my page">

</head>

<body>
	<div class="easyui-layout" data-options="fit : true,border : false"
		align="center"
		style="padding-left: 4px; padding-right: 5px; margin-top: 4px; padding-bottom: 15px;">
		<div>
			<!-- <div id="mm">
				<div name="resource_flag">资源标识</div>
				<div name="resource_name">资源名称</div>
				<div name="agent_name">操作人</div>
				<div name="resource_desc">资源描述</div>
			</div> -->
			<table id="list_data" title="资源管理" style="height:800px;"></table>
		</div>

		<input id="addUUCResource" type="hidden" /> <input
			id="editUUCResource" type="hidden" /> <input id="delUUCResource"
			type="hidden" />

		<!-- 新增UUC资源开始 -->
		<div id="addResourceUuc" class="easyui-dialog"
			style="width: 330px; height: 360px; padding: 10px 10px; overflow: hidden;"
			modal=true closed="true" resizable="true" buttons="#dlg-buttons"
			title="添加资源">
			<form id="form_add" name="form_add" method="post">

					<input style="width: 136px;" type="hidden" name="parentId"></input>
					<input style="width: 136px;" type="hidden" name="parentIds"></input>
				<table class="uuc" cellpadding="5">
					<tr>
						<td>资源名称:</td>
						<td><input class="easyui-textbox" style="width: 136px;"
							type="text" name="name" data-options="required:true"
							missingMessage="资源名称必填!"></input></td>
					</tr>
					<tr>
						<td>资源标识:</td>
						<td><input class="easyui-textbox" style="width: 136px;"
							type="text" name="resourceFlag" data-options="required:true"
							missingMessage="资源标识必填!"></input></td>
					</tr>
					<tr>
						<td>资源路径:</td>
						<td><input class="easyui-textbox" style="width: 136px;"
							type="text" name="url"></input></td>
					</tr>
					<tr>
						<td>类型:</td>
						<td>
							<%-- <input class="easyui-combobox" data-options="editable:false" url="${ctx}/resource/select/resource_type" name="resourceType" data-options="required:true" missingMessage="资源类型必选!" valueField="code_value" textField="code_name"  value="" style="width:136px;" /> --%>
							<select class="easyui-combobox" id="type" name="type"
							style="width: 136px;">
							<option value="menu">菜单</option>
							<option value="dosomething">操作</option>
							<option value="button">按钮</option>
						</select>
						</td>
					</tr>
					<tr>
						<td>资源描述:</td>
						<td><input class="easyui-textbox" style="width: 136px;"
							type="text" name="resourceDesc"></input></td>
					</tr>
					<tr>
						<td>菜单排序:</td>
						<td><input class="easyui-textbox" style="width: 136px;"
							type="text" name="resourceSort"></input></td>
					</tr>
				</table>
			</form>
		</div>
		<div id="dlg-buttons" style="text-align: center">

			<a href="javascript:void(0)" class="easyui-linkbutton c6"
				iconCls="icon-ok" onclick="saveResourceUuc()" style="width: 75px">保存</a>
			<a href="javascript:void(0)" class="easyui-linkbutton"
				iconCls="icon-cancel"
				onclick="javascript:$('#addResourceUuc').dialog('close')"
				style="width: 75px">关闭</a>
		</div>

		<!-- 新增UUC资源结束 -->

		<!-- 编辑UUC资源开始 -->
		<div id="editResourceUuc" class="easyui-dialog"
			style="width: 330px; height: 360px; padding: 10px 10px" modal=true
			closed="true" resizable="true" buttons="#dlg-buttons">
			<form id="form_edit" name="form_edit" method="post">
			
					<input style="width: 136px;" type="hidden" name="reid" id="reid"></input>
				<table class="uuc" cellpadding="5">
					<tr>
						<td>资源名称:</td>
						<td><input class="easyui-textbox" style="width: 136px;"
							type="text" name="rename" id="rename" data-options="required:true"
							missingMessage="资源名称必填!"></input></td>
					</tr>
					<tr>
						<td>资源标识:</td>
						<td><input class="easyui-textbox" style="width: 136px;"
							type="text" name="reresourceFlag" id="reresourceFlag" data-options="required:true"
							missingMessage="资源标识必填!"></input></td>
					</tr>
					<tr>
						<td>资源路径:</td>
						<td><input class="easyui-textbox" style="width: 136px;"
							type="text" name="reurl" id="reurl"></input></td>
					</tr>
					<!--  <tr>
		    			<td>上级资源:</td>
		    			<td>
		    				<select class="easyui-combobox" data-options="editable:false" id="parentId1" name="parentId1" style="width:96px;">
		    				
		    				</select>
		    			</td>
		    		</tr> -->
					<tr>
						<td>类型:</td>
						<td>
							<%-- <input class="easyui-combobox" data-options="editable:false" url="${ctx}/resource/select/resource_type" name="resourceType" data-options="required:true" valueField="code_value" textField="code_name"  value="" style="width:136px;" /> --%>
							<select class="easyui-combobox" id="retype" name="retype"
							style="width: 136px;">
								<option value="menu">菜单</option>
							<option value="dosomething">操作</option>
							<option value="button">按钮</option>
						</select>
						</td>
					</tr>
					<tr>
						<td>权限描述:</td>
						<td><input class="easyui-textbox" style="width: 136px;"
							type="text" name="reresourceDesc" id="reresourceDesc"></input></td>
					</tr>
					<tr>
						<td>菜单排序:</td>
						<td><input class="easyui-textbox" style="width: 136px;"
							type="text" name="reresourceSort" id="reresourceSort"></input></td>
					</tr>
				</table>
			</form>
		</div>
		<div id="dlg-buttons" style="text-align: center">
			<a href="javascript:void(0)" class="easyui-linkbutton c6"
				iconCls="icon-ok" onclick="saveEditInfo()" style="width: 75px">保存</a>
			<a href="javascript:void(0)" class="easyui-linkbutton"
				iconCls="icon-cancel"
				onclick="javascript:$('#editResourceUuc').dialog('close')"
				style="width: 75px">关闭</a>
		</div>
		<!-- 编辑UUC资源结束-->


		<input id="refreshId" name="refreshId" type="hidden">

		<div id="tb" style="padding: 2px 0">
			<table cellpadding="0" cellspacing="0">
				<tr>
					<td style="padding-left: 2px">
						<%-- <shiro:authenticated>
						<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="expandAll();">新增</a>
					</shiro:authenticated> --%> <a href="javascript:void(0);"
						class="easyui-linkbutton" iconCls="icon-undo" plain="true"
						onclick="expandAll();">展开</a> <a href="javascript:void(0);"
						class="easyui-linkbutton" iconCls="icon-redo" plain="true"
						onclick="collapseAll();">收缩</a>
					</td>
					<!-- <td style="padding-left:2px">
					<input id="searchbox" type="text"/>
				</td> -->
				</tr>
			</table>
		</div>
		<div id="menu" class="easyui-menu" style="width: 90px; display: none;">
			<div onclick="addResourceUuc();" iconCls="icon-add">增加</div>
			<div onclick="delResourceUucById();" iconCls="icon-remove">删除</div>
			<div onclick="editResourceUucById();" iconCls="icon-edit">编辑</div>
			<div onclick="expandAll();" iconCls="icon-undo">展开</div>
			<div onclick="collapseAll();" iconCls="icon-redo">收缩</div>
			<div onclick="refresh();" iconCls="icon-reload">刷新</div>
		</div>
	</div>
</body>
<style type="text/css">
#form_add {
	margin: 0;
	padding: 10px 30px;
}

#form_edit {
	margin: 0;
	padding: 10px 30px;
}

.ftitle {
	font-size: 14px;
	font-weight: bold;
	padding: 5px 0;
	margin-bottom: 10px;
	border-bottom: 1px solid #ccc;
}

.fitem {
	margin-bottom: 5px;
}

.fitem label {
	display: inline-block;
	width: 80px;
}

.fitem input {
	width: 160px;
}
</style>


<script type="text/javascript"
	src="${ctx}/resources/userJs/user/resourceUucOperation.js" charset="utf-8"></script>
<script type="text/javascript"
	src="${ctx}/resources/userJs/user/resourceUucTable.js"  charset="utf-8"></script>
</html>
