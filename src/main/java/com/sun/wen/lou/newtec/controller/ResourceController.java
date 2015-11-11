package com.sun.wen.lou.newtec.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sun.wen.lou.newtec.entity.Organization;
import com.sun.wen.lou.newtec.entity.Resource;
import com.sun.wen.lou.newtec.entity.ResourceType;
import com.sun.wen.lou.newtec.entity.RoleResource;
import com.sun.wen.lou.newtec.entity.Tree;
import com.sun.wen.lou.newtec.entity.Ztree;
import com.sun.wen.lou.newtec.service.ResourceService;
import com.sun.wen.lou.newtec.service.UserService;
import com.sun.wen.lou.newtec.util.JsonResult;
import com.sun.wen.lou.newtec.util.JsonUtils;

/**
 * 1、生成表格树 2、增加资源 3、编辑资源 4、删除资源 5、模糊查询
 */
@Controller
@RequestMapping("/resource")
public class ResourceController {

	@Autowired
	private ResourceService resourceService;

	@Autowired
	private UserService accountService;

	/**
	 * 初始化资源主界面
	 * 
	 * @return
	 */
	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public String resourceManager() {
		return "resource/resourceManager";
	}

	/**
	 * 组织树形结构返回
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/listGrid")
	public String listGrid() {

		List<Resource> resourceList = resourceService.findAll();
		return createTreeJson(resourceList);
	}

	public static void main(String[] args) {

		List<String> list1 = new ArrayList<String>();
		list1.add("1");
		list1.add("2");
		List<String> list2 = new ArrayList<String>();
		list2.addAll(list1);
		list1.add("1");
		System.out.println(list1.size() + "-" + list2.size());
	}

	/**
	 * 资源新增处理逻辑
	 * 
	 * @param rc
	 * @return
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, String> addResource(@RequestBody Resource rc) {
		Map<String, String> map = new HashMap<String, String>();
		Resource existResource = resourceService.isExistFlag(rc
				.getResourceFlag());
		if (existResource != null) {
			map.put("msg", "资源标识已经存在，请重新输入");
			return map;
		}
		int flag = resourceService.createResource(rc);
		if (flag > 0) {
			map.put("msg", "添加成功");
			map.put("status", "success");
		}
		return map;
	}

	/**
	 * 资源编辑跳转界面
	 * 
	 * @return
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.GET)
	public String editResources() {
		return "resource/resourceEditDlg";
	}

	/**
	 * 资源编辑处理逻辑
	 * 
	 * @param rc
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/updateResource")
	public JsonResult updateResource( Resource rc) {
		JsonResult jr = new JsonResult();
		int flag = resourceService.updateResource(rc);
		if (flag > 0) {
			jr.setMsg("ok");
			jr.setSuccess(true);
		} else {
			jr.setMsg("err");
			jr.setSuccess(true);
		}
		return jr;
	}
	/**
	 * 返回多个json String类型的数据
	 * 
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getResourceAll")
	public String getResourceAll() {
		List<Resource> resourcelist = new ArrayList<Resource>();
		Resource rr = new Resource();
		rr.setId(0l);
		rr.setParentId(-1l);
		rr.setName("请选择");
		resourcelist.add(rr);
		try {
			resourcelist.addAll(resourceService.findAll());
			return JsonUtils.getJsonForString(resourcelist);
		} catch (Exception e) {
			e.printStackTrace();

		}
		return "";
	}
	/**
	 * 资源 表格树生成
	 * 
	 * @param resourceId
	 * @param searchName
	 * @param searchValue
	 * @return
	 */
	@RequestMapping(value = "list", method = RequestMethod.POST)
	@ResponseBody
	public List<Resource> queryResources(@RequestBody String resourceId,
			String searchName, String searchValue) {
		if (!resourceId.equals("")) {
			resourceId = resourceId.split("=")[1];
		}
		List<Resource> list = new ArrayList<Resource>();
		// 如果searchName不为空，说明请求的是模糊查询
		if (searchName != null) {
			list = resourceService.queryResourceUucByTag(resourceId,
					searchName, "%" + searchValue + "%");
			return list;
		}
		// 初始化表格树
		list = resourceService.queryResource(resourceId);
		return list;
	}

	/**
	 * 资源删除处理
	 * 
	 * @param resourceId
	 * @return
	 */
	@RequestMapping(value = "/del", method = RequestMethod.POST)
	@ResponseBody
	public JsonResult delResources(@RequestParam String resourceId) {
		JsonResult json = new JsonResult();
		try {
			resourceService.deleteResource(Long.parseLong(resourceId));
			resourceService.deleteRoleResource(Long.parseLong(resourceId));
			// 判断该资源是否有子节点
			// 只有父节点删除成功及该节点有子节点的情况走下面逻辑
			json.setSuccess(true);
			json.setMsg("success");
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(false);
			json.setMsg("操作失败");
		}
		return json;
	}

	/**
	 * 根据资源ID查询该资源是否有子节点
	 * 
	 * @param resourceId
	 * @return
	 */
	@RequestMapping(value = "/isExistChildren", method = RequestMethod.POST)
	@ResponseBody
	public JsonResult isExistChildren(@RequestParam long resourceId) {
		JsonResult json = new JsonResult();
		List<Resource> queryChildren = resourceService
				.queryChildren(resourceId);
		if (queryChildren.size() > 0) {
			json.setSuccess(true);
			json.setMsg("success");
		}
		return json;
	}

	/**
	 * 查询资源标识是否已经存在
	 * <P>
	 * Date : 2015-1-27
	 * </P>
	 * 
	 * @param resourceId
	 * @return
	 */
	@RequestMapping(value = "/isExist", method = RequestMethod.POST)
	@ResponseBody
	public String isExistFlag(@RequestParam String resourceFlag) {
		String flag = "";
		Resource existResource = resourceService.isExistFlag(resourceFlag);
		// existFlag为false说明资源标识不存在，反之，存在
		if (existResource != null) {
			flag = "success";
		}
		return flag;
	}

	/**
	 * 动态获取下拉框key和value，并加载到界面
	 * 
	 * @date 2015-01-30
	 * @time 下午 15:10
	 * @param typeName
	 * @return
	 */
	@RequestMapping(value = "/select/{typeName}", method = RequestMethod.POST)
	@ResponseBody
	public String getSelect(@PathVariable String typeName) {
		List<ResourceType> s = new ArrayList<ResourceType>();
		s.add(new ResourceType(1, "菜单"));
		s.add(new ResourceType(2, "按钮"));
		s.add(new ResourceType(3, "操作"));
		// List<ResourceType> codeType = resourceService.getCodeType(typeName);
		String str = "";
		try {
			str = JsonUtils.getJsonForString(s);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return str;
	}

	/**
	 * @Description: 查询资源菜单
	 * @param @param request
	 * @param @return
	 * @return List<Tree>
	 * @throws
	 */
	@RequestMapping("/findResourceTree")
	@ResponseBody
	public String findResourceTree(@RequestParam String id,
			@RequestParam String roleId) {
		List<Tree> treeList = new ArrayList<Tree>();
		Set<String> menus = new HashSet<String>();
		List<RoleResource> menuRoles = resourceService.queryRoleResource(
				roleId, "");
		if (menuRoles != null && menuRoles.size() > 0) {
			for (RoleResource menuRole : menuRoles) {
				menus.add(menuRole.getResourceId() + "");
			}
		}
		List<Resource> resourceList = resourceService.queryResource(id);
		if (resourceList != null && resourceList.size() > 0) {
			for (Resource resource : resourceList) {
				Tree tree = new Tree();
				tree.setId(resource.getId().toString());
				tree.setText(resource.getName());
				tree.setPid(resource.getParentId().toString());
				if (menus.contains(resource.getId().toString())) {
					tree.setChecked(true);
				} else {
					tree.setChecked(false);
				}
				tree.setState(resource.getState());
				Map<String, Object> attr = new HashMap<String, Object>();
				attr.put("url", resource.getUrl());
				tree.setAttributes(attr);
				treeList.add(tree);
			}
		}
		try {
			return JsonUtils.getJsonForString(treeList);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "errrrrrrrrrrrrrrrrrr";
		}
	}

	/**
	 * @Description: 查询资源菜单
	 * @param @param request
	 * @param @return
	 * @return List<Tree>
	 * @throws
	 */
	@RequestMapping(value = "/findRtree", produces = { "text/json;charset=UTF-8" })
	@ResponseBody
	public String findRtree(@RequestParam String id, @RequestParam String roleId) {
		List<Ztree> treeList = new ArrayList<Ztree>();
		Set<String> menus = new HashSet<String>();
		List<RoleResource> menuRoles = resourceService.queryRoleResource(
				roleId, "");
		if (menuRoles != null && menuRoles.size() > 0) {
			for (RoleResource menuRole : menuRoles) {
				menus.add(menuRole.getResourceId() + "");
			}
		}
		// Resource parentDto = resourceService.queryById(id);
		List<Resource> resourceList = resourceService.queryChildren(Long
				.valueOf(id));
		// resourceList.add(parentDto);
		if (resourceList != null && resourceList.size() > 0) {
			for (Resource resource : resourceList) {
				Ztree tree = new Ztree();
				tree.setId(resource.getId().toString());
				tree.setName(resource.getName());
				tree.setParentId(resource.getParentId().toString());
				if (menus.contains(resource.getId().toString())) {
					tree.setChecked(true);
				} else {
					tree.setChecked(false);
				}
				if (isParent(resource.getId())) {
					tree.setIsParent("true");
				} else {
					tree.setIsParent("false");
				}
				treeList.add(tree);
			}
		}
		try {
			return JsonUtils.getJsonForString(treeList);
		} catch (Exception e) {
			e.printStackTrace();
			return "errorrrrrrrr";
		}
	}

	public boolean isParent(long id) {
		List<Resource> resources = resourceService.queryChildren(id);
		if (resources != null && resources.size() > 0)
			return true;
		return false;
	}

	/**
	 * 创建一颗树，以json字符串形式返回
	 * 
	 * @param list
	 *            原始数据列表
	 * @return 树
	 */
	private String createTreeJson(List<Resource> list) {
		JSONArray rootArray = new JSONArray();
		for (int i = 0; i < list.size(); i++) {
			Resource resource = list.get(i);
			if (resource.getParentId() == 0) {
				JSONObject rootObj = createBranch(list, resource);
				rootArray.add(rootObj);
			}
		}

		return rootArray.toString();
	}

	/**
	 * 递归创建分支节点Json对象
	 * 
	 * @param list
	 *            创建树的原始数据
	 * @param currentNode
	 *            当前节点
	 * @return 当前节点与该节点的子节点json对象
	 */
	private JSONObject createBranch(List<Resource> list, Resource currentNode) {
		/*
		 * 将javabean对象解析成为JSON对象
		 */
		JSONObject currentObj = JSONObject.fromObject(currentNode);
		JSONArray childArray = new JSONArray();
		/*
		 * 循环遍历原始数据列表，判断列表中某对象的父id值是否等于当前节点的id值，
		 * 如果相等，进入递归创建新节点的子节点，直至无子节点时，返回节点，并将该 节点放入当前节点的子节点列表中
		 */
		for (int i = 0; i < list.size(); i++) {
			Resource newNode = list.get(i);
			if (newNode.getParentId() != null
					&& newNode.getParentId().compareTo(currentNode.getId()) == 0) {
				JSONObject childObj = createBranch(list, newNode);
				childArray.add(childObj);
			}
		}

		/*
		 * 判断当前子节点数组是否为空，不为空将子节点数组加入children字段中
		 */
		if (!childArray.isEmpty()) {
			currentObj.put("children", childArray);
		}

		return currentObj;
	}
}
