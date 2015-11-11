package com.sun.wen.lou.newtec.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sun.wen.lou.newtec.entity.Role;
import com.sun.wen.lou.newtec.entity.RoleResource;
import com.sun.wen.lou.newtec.service.ResourceService;
import com.sun.wen.lou.newtec.service.RoleService;
import com.sun.wen.lou.newtec.util.DataGrid;
import com.sun.wen.lou.newtec.util.JsonResult;
import com.sun.wen.lou.newtec.util.JsonUtils;
import com.sun.wen.lou.newtec.util.PageController;
import com.sun.wen.lou.newtec.util.PageDto;

@Controller
@RequestMapping("/role")
public class RoleController {

	@Autowired
	private RoleService roleService;

	@Autowired
	private ResourceService resourceService;

	@RequestMapping(value = "/roleindex")
	public String roleindex() {
		return "role/roleManager";

	}

	@ResponseBody
	@RequestMapping(value = "rolelist")
	public DataGrid rolelist(PageDto pageDto, Role role) {
		// 选择页数的时候用
		PageController page = pageDto.createPage();
		page = roleService.getRolelist(page, role);

		return DataGrid.formateList(page);
	}

	@ResponseBody
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public JsonResult create(Role role) {

		JsonResult jr = new JsonResult();
		try {
			if (role.getResourceIds() != null
					&& role.getResourceIds().startsWith("0,")) {
				role.setResourceIds(role.getResourceIds().substring(2));
			}
			roleService.createRole(role);
			role = roleService.findByRolename(role.getRole());
			List<RoleResource> list = new ArrayList<RoleResource>();
			if (null != role.getResourceIds()) {
				for (String resourceid : role.getResourceIds().split(",")) {

					RoleResource ur = new RoleResource();
					ur.setIsAvaliable(1);
					ur.setRoleId(Integer.parseInt(role.getId().toString()));
					ur.setResourceId(Integer.parseInt(resourceid));
					list.add(ur);
				}
				roleService.addByBatchRoleResource(list);
			}
			jr.setMsg("操作成功");
			jr.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();

			jr.setMsg("操作失败");
			jr.setSuccess(true);
		}
		return jr;
	}

	/**
	 * @param role
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public JsonResult update(Role role) {
		JsonResult jr = new JsonResult();
		try {
			role.setAvailable(true);
			roleService.updateRole(role);
			roleService.deleteRoleResource(role.getId() + "");

			List<RoleResource> list = new ArrayList<RoleResource>();
			for (String resourceid : role.getResourceIds().split(",")) {

				RoleResource ur = new RoleResource();
				ur.setIsAvaliable(1);
				ur.setRoleId(Integer.parseInt(role.getId().toString()));
				ur.setResourceId(Integer.parseInt(resourceid));
				list.add(ur);
			}
			roleService.addByBatchRoleResource(list);
			jr.setMsg("操作成功");
			jr.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();

			jr.setMsg("操作失败");
			jr.setSuccess(true);
		}

		return jr;
	}

	/**
	 * 查询用户名是否存在
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/queryRoleName", method = RequestMethod.POST)
	@ResponseBody
	public String queryRoleName(Role role) {
		role = roleService.findByRolename(role.getRole());

		try {
			return JsonUtils.getJsonForString(role);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	@ResponseBody
	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public JsonResult showDeleteForm(HttpServletRequest request) {
		JsonResult jr = new JsonResult();
		try {
			String roleId = request.getParameter("id");
			int re = roleService.deleteRole(roleId);
			int j = roleService.deleteRoleResource(roleId);
			System.out.println("i=" + re + " j=" + j);
			jr.setMsg("操作成功");
			jr.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();

			jr.setMsg("操作失败");
			jr.setSuccess(true);
		}

		return jr;
	}

}
