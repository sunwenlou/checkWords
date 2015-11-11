package com.sun.wen.lou.newtec.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sun.wen.lou.newtec.entity.Organization;
import com.sun.wen.lou.newtec.entity.Role;
import com.sun.wen.lou.newtec.entity.User;
import com.sun.wen.lou.newtec.entity.UserRole;
import com.sun.wen.lou.newtec.service.OrganizationService;
import com.sun.wen.lou.newtec.service.RoleService;
import com.sun.wen.lou.newtec.service.UserService;
import com.sun.wen.lou.newtec.util.DataGrid;
import com.sun.wen.lou.newtec.util.JsonResult;
import com.sun.wen.lou.newtec.util.JsonUtils;
import com.sun.wen.lou.newtec.util.PageController;
import com.sun.wen.lou.newtec.util.PageDto;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private OrganizationService organizationService;
	@Autowired
	private RoleService roleService;

	@RequestMapping(value = "/userindex")
	public String userindex(Model model) {
		return "user/list";
	}

	/**
	 * 获取用户列表
	 * 
	 * @param
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/userlist")
	public DataGrid list(PageDto pageDto, User u) {
		// 选择页数的时候用
		PageController page = pageDto.createPage();
		page = userService.getUsers(page, u);
		@SuppressWarnings("unchecked")
		List<User> userlist = (List<User>) page.getContent();
		List<Organization> orglist = organizationService.findAll();

		for (User user : userlist) {
			for (Organization org : orglist) {
				if (user.getOrganizationId() == org.getId()) {
					user.setOrgnizationName(org.getName());
				}
			}

		}
		return DataGrid.formateList(page);
	}

	/**
	 * 返回多个json String类型的数据
	 * 
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getOrganizationAll")
	public String getOrganizationAll() {
		List<Organization> orglist = new ArrayList<Organization>();
		Organization oo = new Organization();
		oo.setId(0l);
		oo.setParentId(-1l);
		oo.setName("请选择");
		orglist.add(oo);
		try {
			orglist.addAll(organizationService.findAll());
			return JsonUtils.getJsonForString(orglist);
		} catch (Exception e) {
			e.printStackTrace();

		}
		return "";
	}

	/**
	 * 查询用户名是否存在
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/queryUserName", method = RequestMethod.POST)
	@ResponseBody
	public String queryUserName(User user) {
		user = userService.findByUsername(user.getUsername());

		try {
			return JsonUtils.getJsonForString(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	
	
	@ResponseBody
	@RequestMapping(value = "/getRoles")
	public String getRoles() {
		List<Role> orglist = new ArrayList<Role>();
		try {
			orglist.addAll( roleService.findAll());
			return JsonUtils.getJsonForString(orglist);
		} catch (Exception e) {
			e.printStackTrace();

		}
		return "";
	}

	@ResponseBody
	@RequestMapping(value = "/createUser", method = RequestMethod.POST)
	public JsonResult createUser(User user,HttpServletRequest request) {
		JsonResult jr = new JsonResult();
		try {
			String organizationIdadd=request.getParameter("organizationIdadd");
			user.setOrganizationId(Long.parseLong(organizationIdadd));
			String usernameadd=request.getParameter("usernameadd");
			user.setUsername(usernameadd);
			Thread.sleep(1000);
			userService.createUser(user);
			//中间表
			user=userService.findByUsername(user.getUsername());
			List<UserRole> list=new ArrayList<UserRole>();
			for(String roleid:user.getRoleIdsStr().split(",")){
				
				UserRole ur=new UserRole();
				ur.setIsAvaliable(1);
				ur.setRoleId(Integer.parseInt(roleid));
				ur.setUserId(Integer.parseInt( user.getId().toString()));
				list.add(ur);
			}
			userService.addByBatchUserRole(list);

			jr.setMsg("操作成功");
			jr.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();

			jr.setMsg("操作失败");
			jr.setSuccess(true);
		}
		return jr;
	}

	@ResponseBody
	@RequestMapping(value = "/updateUser", method = RequestMethod.POST)
	public JsonResult updateUser(User user) {
		JsonResult jr = new JsonResult();
		try {
			Thread.sleep(1000);
			userService.updateUser(user);
			//中间表
			userService.deleteUserRole(user);
			List<UserRole> list=new ArrayList<UserRole>();
			for(String roleid:user.getRoleIdsStr().split(",")){
				
				UserRole ur=new UserRole();
				ur.setIsAvaliable(1);
				ur.setRoleId(Integer.parseInt(roleid));
				ur.setUserId(Integer.parseInt( user.getId().toString()));
				list.add(ur);
			}
			userService.addByBatchUserRole(list);

			jr.setMsg("操作成功");
			jr.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();

			jr.setMsg("操作失败");
			jr.setSuccess(true);
		}
		return jr;
	}
	@ResponseBody
	@RequestMapping(value = "/deleteUser" )
	public JsonResult deleteUser(@RequestParam("userid") Long id ) {
		JsonResult jr=new JsonResult();
		try {
			userService.deleteUser(id);
			//中间表
			User user=new User();
			user.setId(id);
			userService.deleteUserRole(user);
			jr.setMsg("操作成功");
			jr.setSuccess(true);
		} catch (Exception e) {
			jr.setMsg("操作失败");
			jr.setSuccess(false);
		}
		
		return jr;
	}

}
