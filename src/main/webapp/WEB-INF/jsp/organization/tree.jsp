<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/style/styles.css">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet"
	href="${ctx}/resources/pluginJs/zTree/css/ztree.css">
</head>


<script
	src="${ctx}/resources/pluginJs/zTree/js/jquery.ztree.all-3.5.min.js"></script>
<body>
	<table border="1" style="padding-top:10px;">
		<tr>
			<td width="100px;" style="padding-top:10px;" valign="top"><a href="${ctx }/organization/getFile">点击刷新树</a><ul id="tree" class="ztree"></ul></td>
			<td>	<iframe name="content" class="ui-layout-center" src="" frameborder="0"
			scrolling="auto" height="600" width="1200" id="iframepage"></iframe></td>
		</tr>
	</table>
	
	<script>

    $(function () {
        var setting = {
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback : {
                onClick : function(event, treeId, treeNode) {
                    frames['content'].location.href = "${pageContext.request.contextPath}/organization/"+treeNode.id+"/maintain";
                }
            }
        };

        var zNodes =[
            <c:forEach items="${organizationList}" var="o">
                { id:${o.id}, pId:${o.parentId}, name:"${o.name}", open:${o.rootNode}},
            </c:forEach>
        ];

        $(document).ready(function(){
            $.fn.zTree.init($("#tree"), setting, zNodes);
        });
    });
</script>


	<script type="text/javascript" language="javascript">   
function iFrameHeight() {   
var ifm= document.getElementById("iframepage");   
var subWeb = document.frames ? document.frames["iframepage"].document : ifm.contentDocument;   
if(ifm != null && subWeb != null) {
   ifm.height = subWeb.body.scrollHeight;
   ifm.width = subWeb.body.scrollWidth;
}   
}   
</script>
</body>
</html>