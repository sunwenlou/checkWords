<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
	<div class="easyui-layout" data-options="fit : true,border : false"
		align="center"
		style="margin-left: 4px; padding-left: 4px; padding-right: 5px; padding-bottom: 5px;">
		<div data-options="region:'north',border:false"
			style="height: 95px; overflow: hidden; width: 95%;">
			<form id="queryForm" method="post">
				<table style="width: 100%; margin-top: 20px;">
					<tr>
						<td>组织机构名称：&nbsp; <select class="easyui-combobox"
							id="name" name="name" style="width: 120px;">
						</select>
						</td>
						<td>是否可用：&nbsp; <select class="easyui-combobox"
							data-options="editable:false" id="available" name="available"
							style="width: 120px;">
								<option value="" selected="selected">请选择</option>
								<option value="1">是</option>
								<option value="0">否</option>
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
			<c:if test="${distoolbar==true }">
			<div id="toolbar">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconCls="icon-add" plain="true" onclick="showAddWindow('save_dlg')">新增
				</a> <a href="javascript:void(0)" class="easyui-linkbutton"
					iconCls="icon-edit" plain="true" onclick="edit()">编辑 </a>
			</div>
			</c:if>
		</div>
		<div id="save_dlg" class="easyui-dialog" title="新增短信账号" closed=true
			closable=false collapsible=false minimizable=false maximizable=false
			style="width: 550px; height: 400px; padding: 10px" modal=true
			buttons="#dlg_buttons">
			<form id="J_Form" method="post">
				<table>
					<tr>
						<td align="right"><label class="control-label"><font
								color=red>*</font>账号名称:</label></td>
						<td align="left"><input class="easyui-textbox validatebox"
							id="smsAccountName" name="smsAccountName"
							data-options="required:true,validType:'length[1,30]'"
							style="width: 155px;" /></td>
					</tr>
					<tr>
						<td align="right"><label class="control-label"><font
								color=red></font>对应系统:</label></td>
						<td align="left"><select class="easyui-combobox"
							id="save_smsDomain" name="smsMappingSystem" style="width: 155px;"></select></td>

					</tr>
					<tr>
						<td align="right"><label class="control-label"><font
								color=red></font>供应商:</label></td>
						<td align="left"><select class="easyui-combobox"
							id="save_smsSuppliers" name="suppliersId" style="width: 155px;"></select></td>
					</tr>
					<tr>
						<td align="right"><label class="control-label"><font
								color=red></font>账号类型:</label></td>
						<td align="left"><select class="easyui-combobox"
							data-options="editable:false" id="save_smsSendType"
							name="smsAccountType" style="width: 155px;">
								<option value="marke">营销</option>
								<option value="notice">通知</option>
								<option value="check">验证</option>
						</select></td>
					</tr>
					<tr>
						<td align="right"><label class="control-label"><font
								color=red></font>供应商账户标识:</label></td>
						<td align="left"><input class="easyui-textbox validatebox"
							id="suppliersAccountId"
							data-options="required:true,validType:'suppliersIdRex'"
							name="suppliersAccountId" style="width: 155px;" /></td>
					</tr>
					<tr>
						<td align="right"><label class="control-label"><font
								color=red></font>短信签名:</label></td>
						<td align="left"><input class="easyui-textbox validatebox"
							id="signers"
							data-options="required:true,validType:'length[1,32]'"
							name="signers" style="width: 155px;" />(多个签名用逗号隔开)</td>
					</tr>
				</table>


			</form>
		</div>
		<div style="text-align: center" id="dlg_buttons">
			<a id="btnSave" href="#" class="easyui-linkbutton c6"
				iconCls="icon-ok"
				onclick="save('#J_Form','/smsAccount/save','#save_dlg')"
				style="width: 75px">保存</a> <a id="btnCancel" href="#"
				class="easyui-linkbutton" iconCls="icon-cancel"
				onclick="javascript:$('#save_dlg').dialog('close')"
				style="width: 75px">取消</a>
		</div>
		<div id="edit_dlg" class="easyui-dialog" title="编辑供应商" closed=true
			closable=false collapsible=false minimizable=false maximizable=false
			style="width: 300px; height: 250px; padding: 10px" modal=true
			buttons="#edit_buttons">
			<form id="form_edit" method="post">
				<table>
					<tr>
						<td stlye="width:50%" align="right"><label
							class="control-label"><font color=red>*</font>账号名称:</label></td>
						<td stlye="width:50%" align="left"><input
							class="easyui-textbox" id="edit_smsAccountName"
							name="smsAccountName"
							data-options="required:true,validType:'length[1,30]'"
							style="width: 155px;" /></td>
					</tr>
					<input type="hidden" name='smsAccountId'>
				</table>
			</form>
		</div>
		<div style="text-align: center;" id="edit_buttons">
			<a id="btnSave" href="#" class="easyui-linkbutton c6"
				iconCls="icon-ok" onclick="update();" style="width: 75px">保存</a> <a
				id="btnCancel" href="#" class="easyui-linkbutton"
				iconCls="icon-cancel"
				onclick="javascript:$('#edit_dlg').dialog('close')"
				style="width: 75px">关闭</a>
		</div>

		<div id="show_alarm" class="easyui-dialog" title="余额提醒" closed=true
			closable=true style="width: 650px; height: 350px; padding: 4px"
			modal=true buttons="">
			<form id="alarmForm" method="post">
				<table style="width: 90%; margin:10px;">
					<tr><td width="20%"> &nbsp;账号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;：&nbsp;&nbsp;
						 <input class="easyui-textbox "
							id="smsAccountIdname" name="smsAccountIdname" 
							style="width: 155px;" />
							<input type="hidden" name="smsAccountIdforAlarm" id="smsAccountIdforAlarm">
						</td>
					</tr>
					<tr>
						<td width="20%" style="padding-top:5px;">&nbsp; 余额提醒 ：&nbsp; <input class="easyui-textbox validatebox"
							id="alarmnumber" name="alarmnumber"
							data-options="required:true,validType:'length[1,9]'"
							style="width: 155px;" /> <span  style="font-style:italic;color:gray">设为0视为不提醒</span>
						</td>
					</tr>
					<tr>
						<td width="20%"  style="padding-top:5px;">&nbsp; 提醒间隔 ：&nbsp; <select class="easyui-combobox"
							id="alarmTimeSplit" name="alarmTimeSplit" style="width: 150px;"
							data-options="editable:false">
								<option value="1">1小时</option>
								<option value="3">3小时</option>
								<option value="6">6小时</option>
								<option value="12">12小时</option>
						</select>
						</td>
					<tr>
						<td width="20%" style="padding-top:5px;">&nbsp; 提醒手机号:&nbsp; <textarea id='alarmphone'
								name="alarmphone" maxlength="300"
								style="height: 100px; width: 300px;"></textarea><span style="font-style:italic;color:gray;vertical-align:middle;">&nbsp;多个手机号使用逗号(,)隔开</span></td>
					</tr>
				</table>
			</form>
			<div style="padding-top: 10px; TEXT-ALIGN: center;">
				<a id="btnSave" href="#" class="easyui-linkbutton"
					iconCls="icon-save" onclick="saveAlarm()" style="width: 75px">保存</a>
			</div>
		</div>
	</div>


	<div id="show_dlg" class="easyui-dialog" title="消费明细" closed=true
		closable=true style="width: 850px; height: 500px; padding: 0px"
		modal=true buttons="">

		<form id="qryDetailForm" method="post">
			<table style="width: 100%;">
				<tr>
					<td>操作类型： <select class="easyui-combobox"
						data-options="editable:false" id="operateType" name="operateType"
						style="width: 120px;">
							<option value="" selected="selected">请选择</option>
							<option value="C">消费</option>
							<option value="F">冻结</option>
							<option value="I">充值</option>
					</select>
					</td>
					<td>操作人： <input class="easyui-textbox" id="createName"
						name="createName" style="width: 120px;">
					</td>
					<td>&nbsp;<a href="#" onclick="qryDetailForm();"
						class="easyui-linkbutton" icon="icon-search">查询</a></td>
				</tr>
			</table>
		</form>
		<table id="detail_dgr"
			style="width: 100%; height: 410px; padding: 0px;"></table>
	</div>

	<div id="recharge_dlg" class="easyui-dialog" title="账号充值" closed=true
		closable=true
		style="width: 500px; height: 300px; padding: 0px; text-align: center;"
		modal=true buttons="">
		<div style="line-height: 200px;">
			充值金额：<input id="rechargeNumber" class="easyui-textbox validatebox"
				data-options="required:true,validType:'length[1,11]'">&nbsp;&nbsp;<a
				id="btnSave" href="#" class="easyui-linkbutton c6" iconCls="icon-ok"
				onclick="recharge();" style="width: 75px">充值</a> <input
				type="hidden" id="recharge_id"> <input type="hidden"
				id="smsBalances">
		</div>
	</div>
	</div>

	<script type="text/javascript"
		src="${ctx}/resources/userJs/organization/organization.js"></script>
</body>
</html>