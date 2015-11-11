package com.sun.wen.lou.newtec.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sun.wen.lou.newtec.entity.Resource;
import com.sun.wen.lou.newtec.entity.SysArea;
import com.sun.wen.lou.newtec.entity.UserAccount;
import com.sun.wen.lou.newtec.service.ResourceService;
import com.sun.wen.lou.newtec.service.UserAccountService;
import com.sun.wen.lou.newtec.service.UserService;

/**
 * @author checkSun 登陆相关
 */
@Controller
@RequestMapping(value = "/main")
public class MainController {

	private static final Logger logger = LoggerFactory
			.getLogger(MainController.class);

	@Autowired
	private UserAccountService userAccountService;

	@Autowired
	private ResourceService resourceService;
	@Autowired
	private UserService userService;

	@RequestMapping("/menu")
	@ResponseBody
	public Map<String, Object> index(String username, Model model,HttpServletRequest request) {
		/*Set<String> permissions = userService.findPermissions(username);
		List<Resource> menus = resourceService.findMenus(permissions);*/
		List<Resource> menus = resourceService.findUserResource(username);
		
		model.addAttribute("menus", menus);
		Map<String, Object> map = new HashMap<String, Object>();
		
		StringBuffer srtBackUrl = new StringBuffer();
		srtBackUrl.append("http://");
		// 服务器地址
		srtBackUrl.append(request.getServerName());
		srtBackUrl.append(":");
		// 端口号
		srtBackUrl.append(request.getServerPort());
		// 项目名称
		srtBackUrl.append(request.getContextPath());
		SysArea sys = new SysArea();
		sys.setSysId(1);
		sys.setSysName("统一用户中心");
		sys.setSysFlag("UUCENTER");
		//http://localhost:8080/uucCenter
		sys.setSysDomain(srtBackUrl.toString());
		map.put("menus", menus);
		map.put("system", sys);
		return map;
	}

	@RequestMapping("/index")
	public String welcome() {

		return "index";
	}

	@RequestMapping(value = "/login")
	public String login(HttpServletRequest request, Model model,
			UserAccount loginuser) {
		UserAccount user = new UserAccount();
		user.setUserAccountName(loginuser.getUserAccountName());
		user.setPwd(loginuser.getPwd());
		try {
			user = userAccountService.queryUserAccount(user);
			if (null != user) {
				request.setAttribute("user", user);
				request.setAttribute("username",user.getUserAccountName());
				return "login";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		model.addAttribute("errmsg", "用户名或密码错误");
		return "index";
	}

	@RequestMapping("/")
	@ResponseBody
	public Map<String, Object> queryMenuSystem(HttpServletRequest request) {
		// 账号Idd
		String accountid = null;// CasUtil.getAccountId();
		accountid = accountid == null ? "" : accountid.trim();
		StringBuffer srtBackUrl = new StringBuffer();
		srtBackUrl.append("http://");
		// 服务器地址
		srtBackUrl.append(request.getServerName());
		srtBackUrl.append(":");
		// 端口号
		srtBackUrl.append(request.getServerPort());
		// 项目名称
		srtBackUrl.append(request.getContextPath());
		Map<String, Object> map = new HashMap<String, Object>();
		//
		// // 根据用户名查询redis左边菜单
		/*
		 * [{"resourceId":196,"resourceName":"短信供应商管理","resourceFlag":"suppliers"
		 * ,"resourcePath":"/smsSuppliers/init",
		 * "parentId":181,"idTree":"0.181."
		 * ,"resourceType":"1","createDate":1436855974000
		 * ,"updateDate":1436855974000,
		 * "agentName":"37a0a81d61c64740af0a1dc1c7e6590d"
		 * ,"resourceDesc":"短信供应商管理","sysArea":"smsSystem",
		 * "resourceSort":1,"state"
		 * :"closed","pkid":null,"systemName":null,"opt":null},
		 * {"resourceId":198
		 * ,"resourceName":"发送营销短信","resourceFlag":"send_marke",
		 * "resourcePath":"/smsSendCustTemplate/init",
		 * "parentId":183,"idTree":"0.183."
		 * ,"resourceType":"1","createDate":1436856060000
		 * ,"updateDate":1436856060000,
		 * "agentName":"37a0a81d61c64740af0a1dc1c7e6590d"
		 * ,"resourceDesc":"发送营销短信","sysArea":"smsSystem","resourceSort":1,
		 * "state"
		 * :"closed","pkid":null,"systemName":null,"opt":null},{"resourceId"
		 * :200,"resourceName":"通知短信发送记录",
		 * "resourceFlag":"notice","resourcePath"
		 * :"/smsSendingRec/initNotice","parentId":184,"idTree":"0.184.",
		 * "resourceType"
		 * :"1","createDate":1436856153000,"updateDate":1436856153000
		 * ,"agentName":"37a0a81d61c64740af0a1dc1c7e6590d",
		 * "resourceDesc":"通知短信发送记录"
		 * ,"sysArea":"smsSystem","resourceSort":2,"state"
		 * :"closed","pkid":null,"systemName":null, "opt":null}]
		 */
		// String menuJson = getMenusFromInterface(SMS_CENTER, accountid);
		// List<ResourceUucDTO> menus = null;
		// menus = (List<ResourceUucDTO>) JsonUtils.parseJson(menuJson,
		// List.class, ResourceUucDTO.class);
		//
		// if (menuJson == null || "".equals(menuJson) || "[]".equals(menuJson))
		// { logger.error("调用接口工程获取菜单失败！"); }
		// map.put("menus", menus);
		// map.put("system", sys);
		return map;
	}
}
