package com.sun.wen.lou.newtec.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.sun.wen.lou.newtec.entity.Organization;

@Controller
@RequestMapping("/organization")
public class OrganizationController {

	@Value("#{messagesend['fileRootPath']}")
	String fileRootPath;
	private Map<String, List<Organization>> fileMap = new TreeMap<String, List<Organization>>();

	@RequestMapping(value = "/tree", method = RequestMethod.GET)
	public String showTree(Model model) {
		model.addAttribute("organizationList", null);
		return "organization/tree";
	}
	/** 节点id计数器**/
	private int id=0;
	/**
	 * <br>描 述：获取文件夹节点
	 * <br>作 者：checkSun
	 * <br>历 史: (版本) 作者 时间 注释
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/getFile")
	public String getFiles(HttpServletRequest request, Model model) {

		List<Organization> list = new ArrayList<Organization>();
		if (fileRootPath != null &&(fileMap.get("map")==null ||fileMap.get("map").size() == 0)) {
			fileRootPath = fileRootPath.trim();
			try {
				readfile(fileRootPath,id, 0, "/", list, request);
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	
		if (!fileMap.containsKey("map")) {
			fileMap.put("map", list);
			model.addAttribute("organizationList", list);
		}else{
			model.addAttribute("organizationList", fileMap.get("map"));
		}
		return "organization/tree";
	}

	@RequestMapping(value = "/{id}/maintain")
	public String showMaintainForm(@PathVariable("id") Long id, Model model) {
		List<Organization> list = fileMap.get("map");
		Organization resultone = null;
		for (Organization o : list) {
			if (id == o.getId()) {
				resultone = o;
				break;
			}
		}

		String result = getFileStrings(resultone.getUrl());

		resultone.setContents(result);
		model.addAttribute("organization", resultone);
		return "organization/maintain";
	}

	@RequestMapping(value = "/{id}/update", method = RequestMethod.POST)
	public String update(Organization organization,  Model model) {
		// organizationService.updateOrganization(organization);

		modifyFile(organization.getContents(), organization.getUrl());
		model.addAttribute("msg", "修改成功");
		return showMaintainForm(organization.getId(), model);
	}

	/**
	 * <br>描 述：修改文件
	 * <br>作 者：checkSun
	 * <br>历 史: (版本) 作者 时间 注释
	 * @param data
	 * @param path
	 * @return
	 */
	public boolean modifyFile(String data, String path) {
		File fileold = new File(path);
		String filename = fileold.getName();
		String parentPath = fileold.getParent();
		fileold.renameTo(new File(path + "backup$$"));
		fileold.delete();
		File filenew = new File(parentPath + File.separator + filename);
		try {

			if (!filenew.exists()) {
				filenew.createNewFile();
			}
			FileOutputStream fos = new FileOutputStream(
					filenew.getAbsolutePath());
			OutputStreamWriter osw = new OutputStreamWriter(fos, "UTF-8");
			osw.write(data);
			osw.flush();
			osw.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}

	/**
	 * <br>描 述：读取文件
	 * <br>作 者：checkSun
	 * <br>历 史: (版本) 作者 时间 注释
	 * @param filepath
	 * @param rootid
	 * @param parentId
	 * @param parentPath
	 * @param list
	 * @param request
	 * @return
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public   boolean readfile(String filepath, long rootid, long parentId,
			String parentPath, List<Organization> list,
			HttpServletRequest request) throws FileNotFoundException,
			IOException {
		try {

			File file = new File(filepath);
			if (!file.isDirectory()) {
				if(!(file.getName().trim().endsWith("backup$$"))){
					Organization o = new Organization();
					o.setId( rootid);
					o.setName(file.getName().trim());
					o.setParentId(parentId);
					o.setParentPath(parentPath);
					o.setAvailable(true);
					// o.setUrl(request.getRealPath(file.getAbsolutePath()));URLEncoder.encode(strTest,
					// "UTF-8");
					o.setUrl(file.getAbsolutePath().trim());
					list.add(o);
				}
			
			} else if (file.isDirectory()) {
				
				Organization o = new Organization();
				o.setId(rootid);
				o.setName(file.getName().trim());
				o.setParentId(parentId);
				o.setAvailable(false);
				o.setParentPath(parentPath);
				list.add(o);
				String[] filelist = file.list();
				for (int i = 0; i < filelist.length; i++) {
					File readfile = new File(filepath + File.separator
							+ filelist[i]);
					id=id+1;
					readfile(readfile.getAbsolutePath(), id,
							o.getId(),
							parentPath + "/" + o.getName() + "/", list,
							request);
				}

			}

		} catch (FileNotFoundException e) {
			System.out.println("readfile()   Exception:" + e.getMessage());
		}
		return true;
	}

	public static void main(String[] args) {

	}

	/**
	 * <br>描 述：获取文件内容
	 * <br>作 者：checkSun
	 * <br>历 史: (版本) 作者 时间 注释
	 * @param file
	 * @return
	 */
	public static String getFileStrings(String file) {

		StringBuffer sb = new StringBuffer("");

		try {
			FileInputStream fis = new FileInputStream(file);
			InputStreamReader isr = new InputStreamReader(fis, "UTF-8");

			BufferedReader reader = new BufferedReader(isr);
			String line = null;
			while ((line = reader.readLine()) != null) {
				System.out.println("line= " + line);
				sb.append(System.getProperty("line.separator"));
				sb.append(line);
			}
			reader.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sb.toString();
	}

}
