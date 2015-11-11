<%@ taglib prefix="sql" uri="http://java.sun.com/jstl/sql"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<link rel="shortcut icon" href="${ctx}/resources/images/favicon.ico" type="/image/x-icon">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/pluginJs/jquery-easyui-1.4.1/themes/icon.css">
<style type="text/css" media="screen">
* {
	font-family: Verdana, Arial, Helvetica, AppleGothic, sans-serif;
	font-size: 100%;
}
</style>
<script src="<%=request.getContextPath()%>/resources/common/jquery-1.8.3.js" type="text/javascript" charset="utf-8"></script>
<script src="<%=request.getContextPath()%>/resources/common/jquery-1.8.3.min.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/pluginJs/jquery-easyui-1.4.1/jquery.easyui.min.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/pluginJs/jquery-easyui-1.4.1/plugins/jquery.layout.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/pluginJs/jquery-easyui-1.4.1/jquery.easyui-rbac/jquery.easyui-rbac.js" charset="utf-8"></script>
<script type="text/javascript" charset="UTF-8" src="<%=request.getContextPath()%>/resources/common/jquery.cookie.js"></script>
<link rel="stylesheet" type="text/css"  id = "easyuiTheme"  href="<%=request.getContextPath()%>/resources/pluginJs/jquery-easyui-1.4.1/themes/default/easyui.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/pluginJs/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js" charset="utf-8"></script>
<script src="<%=request.getContextPath()%>/resources/common/rbac-tool.js" type="text/javascript" charset="utf-8"></script>
<script src="<%=request.getContextPath()%>/resources/common/jquery.tinytooltip.min.js" type="text/javascript" charset="utf-8"></script>
<link rel="stylesheet" type="text/css"  id = "easyuiTooltip"  href="<%=request.getContextPath()%>/resources/style/jquery.tinytooltip.css">
<link rel="stylesheet" type="text/css"  id = "easyuiTooltip"  href="<%=request.getContextPath()%>/resources/style/styles.css">

<c:set var="ctx" value="${pageContext.request.contextPath}" />

<script type="text/javascript">
	var ctx = "${ctx}";
</script>