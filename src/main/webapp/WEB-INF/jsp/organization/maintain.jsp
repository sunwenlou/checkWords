<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ include file="/WEB-INF/jsp/common/include.jsp"%>
<html>
<head>
<title></title>
<style type="text/css">
#textarea {
	display: block;
	margin: 0 auto;
	overflow: hidden;
	width: 550px;
	font-size: 14px;
	height: 18px;
	line-height: 24px;
	padding: 2px;
}

textarea {
	outline: 0 none;
	border-color: rgba(82, 168, 236, 0.8);
	box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px
		rgba(82, 168, 236, 0.6);
}
</style>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/style/styles.css">
</head>
<body>
	<center>
		<form:form id="form" method="post" commandName="organization">
			<table>


				<tr>
					<td><form:button id="updateBtn">修改</form:button><br>
						<form:hidden path="id" /> <form:hidden path="available" /> <form:hidden
							path="parentId" /> <form:hidden path="url" /></td>
				</tr>
				<tr>
					<td><form:textarea path="contents"   cols="160"
							rows="30" /></td>
				</tr>
			</table>




		</form:form>
	</center>
	<script>
	
	var msg='${msg}';
	
    if(msg){
    	alert(msg);
    	
    }
    
		$(function() {
			if(available.value){
			$("#updateBtn")
					.click(
							function() {
								$("#form")
										.attr("action",
												"${pageContext.request.contextPath}/organization/${organization.id}/update")
										.submit();
								return false;
							});}
		});
	</script>


</body>
</html>