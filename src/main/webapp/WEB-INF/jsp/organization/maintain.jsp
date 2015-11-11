<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<html>
<head>
<title></title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/style/styles.css">
</head>
<body>


	    <form:form id="form" method="post" commandName="organization">
        <form:hidden path="id"/>
        <form:hidden path="available"/>
        <form:hidden path="parentId"/>
        <form:hidden path="parentIds"/>
		
        <div class="form-group">
            <form:label path="name">名称：</form:label>
            <form:input path="name"/>
        </div>
            <form:button id="updateBtn">修改</form:button>

            <c:if test="${not organization.rootNode}">
            <form:button id="deleteBtn">删除</form:button>
            </c:if>

            <form:button id="appendChildBtn">添加子节点</form:button>

            <c:if test="${not organization.rootNode}">
            <form:button id="moveBtn">移动节点</form:button>
            </c:if>
        </form:form>

		<script>
			$(function() {
				$("#updateBtn")
						.click(
								function() {
									$("#form")
											.attr("action",
													"${pageContext.request.contextPath}/organization/${organization.id}/update")
											.submit();
									return false;
								});
				$("#deleteBtn")
						.click(
								function() {
									if (confirm("确认删除吗？")) {
										$("#form")
												.attr("action",
														"${pageContext.request.contextPath}/organization/${organization.id}/delete")
												.submit();
									}
									return false;
								});

				$("#appendChildBtn")
						.click(
								function() {
									location.href = "${pageContext.request.contextPath}/organization/${organization.id}/appendChild";
									return false;
								});

				$("#moveBtn")
						.click(
								function() {
									location.href = "${pageContext.request.contextPath}/organization/${organization.id}/move";
									return false;
								});
			});
		</script>
</body>
</html>