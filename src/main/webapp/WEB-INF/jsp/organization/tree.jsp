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
<a href="${ctx }/organization/tree">点击刷新树</a>
	<ul id="tree" class="ztree"></ul>
<iframe name="content" class="ui-layout-center"
        src="" frameborder="0" scrolling="auto"></iframe>

	<script>
	var msg='${msg}';
    if(msg){
    	$.message.alert();
    	jQuery.messager.alert("提示:",msg);
    	
    }
    
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
</body>
</html>