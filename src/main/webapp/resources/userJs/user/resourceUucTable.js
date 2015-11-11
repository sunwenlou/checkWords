var $dg;
var $grid;
$(function() {

	$dg = $("#list_data");
	$grid = $dg
			.treegrid({
				width : 'auto',
				height : $(this).height() - 10,
				url : ctx + '/resource/listGrid',
				rownumbers : true,
				animate : true,
				collapsible : false,
				fitColumns : true,
				border : true,
				striped : true,
				cascadeCheck : true,
				deepCascadeCheck : true,
				idField : 'id',
				treeField : 'name',
				parentField : 'parentId',

				columns : [ [

						{
							field : 'name',
							title : '资源名称',
							width : parseInt($(this).width() * 0.2),
							align : 'left'
						},
						{
							field : 'resourceFlag',
							title : '资源标识',
							width : parseInt($(this).width() * 0.1),
							align : 'left'
						},
						{
							field : 'url',
							title : '资源路径',
							width : parseInt($(this).width() * 0.2),
							align : 'left'
						},
						{
							field : 'resourceDesc',
							title : '资源描述',
							width : parseInt($(this).width() * 0.1),
							align : 'left'
						},
						{
							field : 'resourceSort',
							title : '资源排序',
							width : parseInt($(this).width() * 0.1),
							align : 'left'
						},
						{
							field : 'opt',
							title : '操作',
							width : parseInt($(this).width() * 0.1),
							align : 'left',
							formatter : function(value, re) {
								var view = "";
								view += "<a href='#'  onclick='addResourceUuc("
										+ re.id + ",\"" + re.parentIds + "\""
										+ ");'>新增</a>&nbsp;";
								var resdec=re.resourceDesc;
								var ressort=re.resourceSort;
								if(resdec=='null'||resdec==''){resdec=='no description';}
								if(ressort=='null'||ressort==''){ressort=='no description';}
								if (re.parentId != 0) {
									view += "<a href='#'							 onclick='editResourceUucById(\""
											+ re.id
											+ "\",\""
											+ re.name
											+ "\",\""
											+ re.resourceFlag
											+ "\",\""
											+ re.url
											+ "\",\""
											+ re.type
											+ "\",\""
											+ resdec
											+ "\",\""
											+ ressort
											+ "\");'>编辑</a>&nbsp;";
									view += "<a href='#'							   onclick='delResourceUucById("
											+ re.id + ");'		   >删除</a>&nbsp;";
								}
								return view;
							}
						} ] ],
				toolbar : '#tb'
			});
})