<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户中心</title>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<link href="${ctx}/resources/style/main.css" rel="stylesheet">
<script type="text/javascript"
	src="${ctx}/resources/pluginJs/jquery-easyui-1.4.1/easyui-patch.js"></script>
<script type="text/javascript" src="${ctx}/resources/smsJs/main.js"></script>
<script type="text/javascript"
	src="${ctx}/resources/pluginJs/zTree/js/jquery.ztree.core-3.5.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="${ctx}/resources/pluginJs/jquery-easyui-1.4.1/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="${ctx}/resources/pluginJs/jquery-easyui-1.4.1/themes/color.css">
<link href="${ctx}/resources/pluginJs/zTree/css/ztree.css"
	rel="stylesheet">
<style type="text/css">
.ztree LI SPAN.button {
	filter: none;
}

.tab_custom {
	border-right: 1px solid #95B8E7 !important;
}
</style>
<script type="text/javascript">
	
</script>
</head>
<body class="easyui-layout" style="background-color:gray">
		<div style="padding-left: 600px;padding-top:200px;">
			<form id="loginform" action="${ctx}/main/login">
				<span>统一用户中心</span><br></br>
				<input class="easyui-textbox validatebox" id="userAccountName"
					name="userAccountName"
					data-options="required:true,validType:'length[1,30]'"
					style="width: 155px;" /> <br>
				<br>
				<br> <input class="easyui-textbox validatebox" id="pwd"
					name="pwd" data-options="required:true,validType:'length[1,50]'"
					style="width: 155px;" />&nbsp;&nbsp;&nbsp;&nbsp;<font color="red">${errmsg }</font><br>
				<br>
				<br> <input type=button value="登陆" onclick="mysubmit()">
			</form>
		</div>
</body>
<script type="text/javascript">
	function mysubmit() {
		if ($('#loginform').form('validate')) {
			$('#loginform').submit();
		}

	}
</script>
</html>
