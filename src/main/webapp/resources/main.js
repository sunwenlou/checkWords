var MAIN_MENU_DATA = {}, MAIN_SYS_DATA = {}, MAIN_SYS_DATA_ARRAY;
$(function() {
	// if ($.cookie('easyuiThemeName')) {
	// changeThemeFun($.cookie('easyuiThemeName'));
	// $("#select_themes_list").val($.cookie('easyuiThemeName'));
	// }
	/*
	 * $("#select_themes_list").change(function(){ var theme = $(this).val();
	 * changeThemeFun(theme); });
	 */

	$('#main_center').panel({
		'onResize' : function(w, h) {
			$("#main_tab").tabs("resize");
		}
	});
	/**
	 * 初始化 首页数据
	 */
	loadMainDatas();

});

function loadMainDatas() {
	// 取得当前用户的后天相关信息
	$.ajax({
		url : ctx + '/main/menu?username=' + username,
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			if (data != null) {
				buildMenuData(data);
			}
		},
		error : function() {
			// TODO 失败处理
		}
	});
}

function buildMenuData(data) {
	// 重新组织数据
/*	
	{menus=[Resource{id=11, name='组织机构管理', type=menu, permission='organizati
		on:*', parentId=1, parentIds='0/1/', available=true}]}
		
		SysArea sys = new SysArea();
		sys.setSysId(1);
		sys.setSysName("统一用户中心");
		sys.setSysFlag("UUCENTER");
		//http://localhost:8080/uucCenter
		sys.setSysDomain(srtBackUrl.toString());
		map.put("menus", menus);
		map.put("system", sys);
*/	
	if (!MAIN_SYS_DATA[data.system.sysFlag]) {
		MAIN_SYS_DATA[data.system.sysFlag] = data.system;
		MAIN_MENU_DATA[data.system.sysFlag] = {
			system : MAIN_SYS_DATA[data.system.sysFlag],
			menus : []
		};
	}
	$.each(data.menus, function(idx, val) {
		MAIN_MENU_DATA[data.system.sysFlag].menus.push(val);
	});
	// 初始化系统菜单
	buildTreeAndTab(data.system.sysFlag, data.system.sysDomain);
}

/**
 * 初始化权限树和tab页
 * 
 * @param systemId
 */
function buildTreeAndTab(systemId, sysDomain) {
	// 清空原有内容
	$("#main_center").html('<div id="main_tab"></div>');
	$("#nav_tree").html("");

	var centerHeight = $("#main_center").height();
	$('#main_tab').tabs({
		border : false,
		plain : true,
		fit : true
	});

	/**
	 * 创建新树
	 */
	$.fn.zTree.init($("#menu_tree"), {
		data : {
			key : {
				name : "name"
			},
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "parentId",
				rootPId : 0
			}
		},
		callback : {
			onClick : function(event, treeId, treeNode, clickFlag) {
				if (treeNode.url) {
					var sys = MAIN_SYS_DATA[treeNode.sysFlag];
					var menuUrl = buildURL(sysDomain, treeNode.url);
					addTab(treeNode.name, menuUrl, true);
				}
			}
		}
	}, MAIN_MENU_DATA[systemId].menus);
	// 激活一个默认页
	addTab("欢迎使用", buildURL(sysDomain, "/home"), false);
}

function buildURL(start, end) {
	return start.replace(/^(.*?)\/*?$/, "$1") + '/'
			+ end.replace(/^\/?(.*?)$/, "$1");
}

function addTab(subtitle, url, closeable) {
	if (!$('#main_tab').tabs('exists', subtitle)) {
		$('#main_tab').tabs('addIframeTab', {
			tab : {
				title : subtitle,
				closable : closeable,
				border : false
			},
			iframe : {
				src : url,
				message : "处理中..."
			}
		});
	} else {
		$('#main_tab').tabs('select', subtitle);

		$('#main_tab').tabs('updateIframeTab', {
			which : subtitle,
			iframe : {
				src : url,
				message : "处理中..."
			}
		});
	}
	/*
	 * $("iframe").load(function(){ if ($.cookie('easyuiThemeName')) {
	 * changeThemeFun($.cookie('easyuiThemeName')); } });
	 */
}