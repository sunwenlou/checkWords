<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title> </title>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<link href="${ctx}/resources/style/main.css" rel="stylesheet">
<script type="text/javascript"
	src="${ctx}/resources/pluginJs/jquery-easyui-1.4.1/easyui-patch.js"></script>
<script type="text/javascript" src="${ctx}/resources/main.js"></script>
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
var username='${username}';
</script>
</head>
<body class="easyui-layout">
	<div region="north" split="false" border="false">
		<div  class="header">
			<div class="dl-log">
				欢迎您 &nbsp; ${user.userAccountName}，==${username }<span class="dl-log-user" id="update"></span>&nbsp;&nbsp;今天是<span
					id="linkweb"></span> <a href="${ctx}/main/logout" title="退出系统" class="dl-log-quit">[退出]</a><br>
					</div>
			</div>
			
		</div>
	</div>
	<div id="main_center" region="center" split="false" border="false">
		<div id="main_tab"></div>
	</div>
	<div region="west" split="true" border="false" bodyCls="tab_custom"
		style="width: 200px;">
		<div class="ztree" id="menu_tree">&nbsp;</div>
	</div>
	<div id="tab"></div>
	<!-- script开始 -->
	<script type="text/javascript">
		setInterval(
				"linkweb.innerHTML=new Date().toLocaleString()+' 星期'+'日一二三四五六'.charAt(new Date().getDay());",
				1000);
	</script>
</body>
</html>
