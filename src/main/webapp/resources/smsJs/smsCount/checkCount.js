var formData;
var dataTree;
$(function() {
	
	// 添加easyui日期插件
	$('#start').datebox({
		formatter : function(date) {
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			var d = date.getDate();
			return y + '-' + m + '-' + d;
		}
	});
	$('#end').datebox({
		formatter : function(date) {
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			var d = date.getDate();
			return y + '-' + m + '-' + d;
		}
	});
	// 设置日期只读
	$(".datebox :text").attr("readonly", "readonly");
	$('#smsDomain').combobox({  
		url:ctx+'/dictionary/querySmsDomians',  
		
		valueField:'smsDomainId',  
		editable:false,
		textField:'smsDomainName',
		onLoadSuccess: function () { //加载完成后,设置选中第一项
            var val = $("#smsDomain").combobox("getData");
            $("#smsDomain").combobox("select", val[0].smsDomainId);
           
        }
		});
	$('#smsAccount').combobox({  
		url : ctx + '/smsSendingRec/getAccount?smsAccountType=check',
		valueField:'smsAccountId',  
		editable:false,
		textField:'smsAccountName',
		onLoadSuccess: function () { //加载完成后,设置选中第一项
			var val = $("#smsAccount").combobox("getData");
			$("#smsAccount").combobox("select", val[0].smsAccountId);
			
		}
	});
	
	// 生成数据
	formData = $('#dgr')
			.datagrid(
					{
						url : ctx + "/smsCount/qrySms?sendType=check",
						fit : true,
						fitColumns : true,
						border : false,
						pagination : true,
						idField : 'smsSendingId',
						rownumbers : true,
						//默认加载20条记录
						pageSize : 20,
						pageList: [20,30,40,50,100],
						singleSelect:true,
						checkOnSelect:false,
						/*frozenColumns : [ [ {
							field : 'smsTemplateId',
							title : 'ID',
							checkbox : true
						} ] ],*/
						columns : [ [
								{
									field : 'smsAccountName',
									title : '账户',
									width : getWidth(0.24, 6),
									align : 'center',
										formatter:function(value,row,index){
											var valueaccount=value;
											valueaccount = valueaccount.replace(/</g,"《"); 
											valueaccount = valueaccount.replace(/>/g,"》"); 
											valueaccount = valueaccount.replace(/&lt;/g,"《"); 
											valueaccount = valueaccount.replace(/&gt;/g,"》"); 
											valueaccount = valueaccount.replace(/'/g,""); 
											return valueaccount;
										}
								},
								{	field :'opt',
									title:'接收短信手机号',
									align:'center',
									width:getWidth(0.24,11),
						        	formatter:function(value,rec,index){
						        		var view ="";
						        		var smsSendingId=rec.smsSendingId;
						        		//字符串类型需加上转意 \"
						        		//view = '<a href="#" onclick=edit("'+accountId+'")>编辑</a>&nbsp;';
						        			view += '<a href="#" onclick=queryMoreTel("'+smsSendingId+'")>查看详细</a>&nbsp;';
						        			
										return view;
						        	}
						        },
								
								{
									field : 'countSuccessNum',
									title : '成功条数',
									width : getWidth(0.24, 12),
									align : 'center'
								},
								{
									field : 'error',
									title : '失败条数',
									width : getWidth(0.24, 12),
									align : 'center',
									formatter : function (value,rec,index){
										var view = '';
										view = rec.countNum-rec.countSuccessNum;
										if(view<0){
											view = 0;
										}
										return view;
									}
								},
								{
									field : 'countNum',
									title : '数据条数',
									width : getWidth(0.24, 12),
									align : 'center'
								}
								,
								{
									field : 'sendBeginDate',
									title : '发送开始时间',
									width : getWidth(0.24, 8),
									align : 'center',
									formatter : Common.TimeFormatter
								},
								{
									field : 'sendEndDate',
									title : '发送完成时间',
									width : getWidth(0.24, 8),
									align : 'center',
									formatter : Common.TimeFormatter
								},
								{
									field : 'createName',
									title : '操作人',
									width : getWidth(0.24,9),
									align : 'center'
								}
								 ] ],	
							toolbar:'#toolbar',
						pagination : true,
						onLoadSuccess:function(){
							$(this).datagrid("fixRownumber");
							/*$('a.content').tinytooltip({
								message: function() {
									return $(this).attr("titile");
								},
								hover: true
							}).blur(function() {
								$(this).trigger('hidetooltip');
							});*/
						}
					});
});




/**
 * 分页模糊查询
 */
function queryForm(){
	$('#toolbar').empty();
	$('#dgr').datagrid("clearChecked");
	$('#dgr').datagrid('load' ,serializeForm($('#templateCountQuery')));
	$.ajax({
	        type: "POST",
	        url:ctx+"/smsCount/countForAdmin?sendType=check",
	        async: false,
	        data:serializeForm($('#templateCountQuery')),
	        dataType:"json",
	        error: function(request) {
	        	$.messager.show({
					title:'提示信息!' , 
					msg:'提交失败,请重新加载！'
				});
	        },
	        success: function(data) {
	        	console.info(data);
	        if(data.obj){
	        	$('#toolbar').append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总计：发送成功条数"+data.obj.sumSuccessNum+"条,有效数据条数"+data.obj.sumNum+"条,未成功"+data.obj.sumFailNum+"条 &nbsp;&nbsp;&nbsp;");
	        }else{
	        	$('#toolbar').append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总计：发送成功条数0条,有效数据条数0条,未成功0条 &nbsp;&nbsp;&nbsp;");
	        }
 	       
	        }
	    });
}
/**
 * 打开查看详细弹出框
 */
function queryMoreTel(smsSendingId){
	 var data = $('#sendSts8').combobox('getData');
	 $("#sendSts8").combobox('select',data[0].value);
	 $("#smsReceiveTel8").textbox('clear');
	 queryMoreTelList(smsSendingId);	 
	 $('#phoneDialog').dialog('open');
	 $('#phoneDialog').dialog('setTitle', '查询详细');
}
/**
 * 查看详细页面
 * @param type
 * @param accountId
 */
function queryMoreTelList(smsSendingId){
	  $('#phoneTable').datagrid({
		    url: ctx + '/smsSending/qryDetailById?smsSendingId='+smsSendingId,
		    queryParams:{},
		    fit : true,
			fitColumns : true,
			border : false,
			pagination : true,
			idField : 'smsSendingId',
			rownumbers : true,
			singleSelect:true,
			//默认加载20条记录
			pageSize : 20,
			pageList: [20,30,40,50,100],
			checkOnSelect:false,
		    columns: [
		      [
		       	{
		       		field: 'smsContent', 
		       		title: '短信内容', 
		       		align: 'left', 
		       		width: getWidth(0.24, 10),
		       		formatter : function(value, row, index) {
						if (value) {
							var showtitle = value.substring(0, 18);
							if (value.length > 18) {
								showtitle = showtitle + "...";
							}
							var content = "<a href='javascript:showMsg(\""+value+"\");' title='"+value+"' titile='"+ value + "' class='content'>"+ showtitle + "</a>";
							return content;
						}
					}
		       	},
		        {title: '手机号码', field: 'smsReceiveId', align: 'center', width: getWidth(0.24, 10)},
		        {title: '发送状态', field: 'sendSts', align: 'center', width: getWidth(0.24, 10),
					formatter : function(value, row, index) {
						var view = "";
						if(value=='F'){
							view ="发送失败："+row.operationLog;
							
							var showtitle = view;
							if (view.length > 16) {
								showtitle = view.substring(0, 16) + "...";
							}
							
							view = "<a href='javascript:showMsg(\""+view+"\");' title='"+row.operationLog+"' class='content'>"+ showtitle + "</a>";
						}else if(value=='S'){
							view="发送成功";
						}else if(value=='N'){
							view="未发送";
						}else if(value=='R'){
							view="重新发送";
						}
						return view;
					}	
		        }
		      ]
		    ]
		    
		  });
}
function searchPhone(){
	var phone = $("#smsReceiveTel8").val();
	if(null!=phone && phone!=""){
		if(!/^\d{11}$/.test(phone)){
			jQuery.messager.alert("错误提示:",phone+" : 手机号码格式错误");
		    return false;
		 }
	}
	console.info(serializeForm($('#phoneForm')));
	$('#phoneTable').datagrid('load' ,serializeForm($('#phoneForm')));	    
}

function showMsg(msg){
	jQuery.messager.alert("提示内容:",msg);
}

function clearSearchForm(){
	 var smsDomain = $("#smsDomain").combobox("getData");
     $("#smsDomain").combobox("select", smsDomain[0].smsDomainId);
	 var smsAccount = $('#smsAccount').combobox('getData');
	 $("#smsAccount").combobox('select',smsAccount[0].smsAccountId);
	 $("#start").datebox('clear');
	 $("#end").datebox('clear');
	 
}
function clearForm(form){
	 var data = $('#sendSts8').combobox('getData');
	 $("#sendSts8").combobox('select',data[0].value);
	 $("#smsReceiveTel8").textbox('clear');
}

function serializeForm(form) {
	var obj = {};
	$.each(form.serializeArray(), function(index) {
		if (obj[this['name']]) {
			obj[this['name']] = obj[this['name']] + ',' + this['value'];
		} else {
			obj[this['name']] = this['value'];
		}
	});
	return obj;
}


