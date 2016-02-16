package com.sun.wen.lou.newtec.shiro;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.sun.wen.lou.newtec.dto.ResourceUucDTO;
import com.sun.wen.lou.newtec.entity.Resource;
import com.sun.wen.lou.newtec.service.ResourceService;
import com.sun.wen.lou.newtec.util.JsonUtils;
/** 
 * <br>类 名: SecurityUsersFinder 
 * <br>描 述: 权限查询处理器
 * <br>作 者: checkSun
 * <br>创 建： 2015年8月7日 
 * <br>版 本：v1.0.0 
 * <br>
 * <br>历 史: (版本) 作者 时间 注释
 */
public class SecurityUsersFinder implements ISecurityUsersFinder {
	
	private static final Logger logger = LoggerFactory.getLogger(SecurityUsersFinder.class);
	
	private static final String uuc_center = "uucCenterSystem";

	@Autowired
	private ResourceService resourceService;
/*	@Resource(name = "redisManager")
	private RedisManager redisManager;*/
	/**
	 * shiro.properties中获取接口工程地址
	 */
	@Value("#{shiroProperties['interface.url']}")
	private String interfaceUrl;

	@Value("#{shiroProperties['allinterface.url']}")
	private String allinterfaceUrl;
	
	public String getInterfaceUrl() {
		return interfaceUrl;
	}

	public String getAllinterfaceUrl() {
		return allinterfaceUrl;
	}

	public void setAllinterfaceUrl(String allinterfaceUrl) {
		this.allinterfaceUrl = allinterfaceUrl;
	}

	public void setInterfaceUrl(String interfaceUrl) {
		this.interfaceUrl = interfaceUrl;
	}

	public SecurityUsers getSecurityUsers(String userName) {
		return null;
	}
	/**
	 * <br>描 述：获取用户权限
	 * <br>作 者：checkSun
	 * <br>历 史: (版本) 作者 时间 注释
	 * @param sysFlag
	 * @param accountId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public PurviewUsers getPurviewUsers(String accountId) {
		// 根据用户名查询redis左边菜单
		/*String menuJson = getMenusFromInterface(uuc_center, accountId);
		List<ResourceUucDTO> menus = null;
		if (menuJson == null || "".equals(menuJson) || "[]".equals(menuJson)) {
			logger.error("调用接口工程获取菜单失败！");
		}
		//用来判断是否是超级管理员
		 try {
			menus =(List<ResourceUucDTO>)JsonUtils.parseJson(menuJson,List.class,ResourceUucDTO.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//查询账号对应权限标识列表
		
		List<String> resourceFlag = new ArrayList<String>();
		for(ResourceUucDTO re:menus){
			resourceFlag.add(re.getResourceFlag());
		}*/	
		List<Resource> resoucemenus = resourceService.findUserResource(accountId);
		
		//查询账号对应权限标识列表
		
		List<String> resourceFlag = new ArrayList<String>();
		for(Resource re:resoucemenus){
			resourceFlag.add(re.getResourceFlag());
		}
		
		
		PurviewUsers pur = new PurviewUsers();
		pur.setId(accountId);
		pur.setPermissions(resourceFlag);
		
		return pur;
	}

	/**
	 * <br>描 述：调用接口工程获取菜单
	 * <br>作 者：checkSun
	 * <br>历 史: (版本) 作者 时间 注释
	 * @param sysFlag
	 * @param accountId
	 * @return
	 */
	private String getMenusFromInterface(String sysFlag, String accountId) {
		String menus = "";
		URL url = null;
		HttpURLConnection conn = null;
		InputStream inStream = null;
//		OutputStream outputStream = null;
		StringBuffer urlSb = new StringBuffer();
		urlSb.append(interfaceUrl);
		urlSb.append("/").append(accountId);
		urlSb.append("/").append(sysFlag);
		try {
			url = new URL(urlSb.toString());
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			conn.setConnectTimeout(10000);
			conn.setReadTimeout(2000);
			conn.setDoOutput(true);
			inStream = conn.getInputStream();
			menus = IOUtils.toString(inStream, "UTF-8");
			menus = URLDecoder.decode(menus, "UTF-8");
		} catch (MalformedURLException e) {
			logger.error("调用接口工程获取菜单失败！", e.getMessage());
		} catch (ProtocolException e1) {
			logger.error("调用接口工程获取菜单失败！", e1.getMessage());
		} catch (IOException e2) {
			logger.error("调用接口工程获取菜单失败！", e2.getMessage());
		} finally {
			try {
				if (null != inStream) {
					inStream.close();
				}
//				if (null != outputStream) {
//					outputStream.close();
//				}
				if (null != conn) {
					conn.disconnect();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return menus;
	}
	
	/**
	 * <br>描 述：获取菜单
	 * <br>作 者：checkSun
	 * <br>历 史: (版本) 作者 时间 注释
	 * @param sysFlag
	 * @return
	 */
	private String getAllMenusFromInterface(String sysFlag) {
		
		String menus = "";
		URL url = null;
		HttpURLConnection conn = null;
		InputStream inStream = null;
//		OutputStream outputStream = null;
		StringBuffer urlSb = new StringBuffer();
		urlSb.append(allinterfaceUrl);
		urlSb.append("/").append(sysFlag);
		try {
			url = new URL(urlSb.toString());
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			conn.setConnectTimeout(10000);
			conn.setReadTimeout(2000);
			conn.setDoOutput(true);
			inStream = conn.getInputStream();
			menus = IOUtils.toString(inStream, "UTF-8");
			menus = URLDecoder.decode(menus, "UTF-8");
		} catch (MalformedURLException e) {
			logger.error("调用接口工程获取菜单失败！", e.getMessage());
		} catch (ProtocolException e1) {
			logger.error("调用接口工程获取菜单失败！", e1.getMessage());
		} catch (IOException e2) {
			logger.error("调用接口工程获取菜单失败！", e2.getMessage());
		} finally {
			try {
				if (null != inStream) {
					inStream.close();
				}
//				if (null != outputStream) {
//					outputStream.close();
//				}
				if (null != conn) {
					conn.disconnect();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return menus;
	}
	
	
	/**
	 * <br>描 述：获取权限信息
	 * <br>作 者：checkSun
	 * <br>历 史: (版本) 作者 时间 注释
	 * @param sysFlag
	 * @param accountId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<PurviewInfo> getAllPurivewInfos() {
		// 根据用户名查询redis左边菜单
	/*	String menuJson = getAllMenusFromInterface(uuc_center);
		List<ResourceUucDTO> li = null;
		if (menuJson == null || "".equals(menuJson) || "[]".equals(menuJson)) {
			logger.error("调用接口工程获取菜单失败！");
		}
		//用来判断是否是超级管理员
		try {
			li =(List<ResourceUucDTO>)JsonUtils.parseJson(menuJson,List.class,ResourceUucDTO.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		List<Resource> resoucemenus = resourceService.findUserResource("");
		List<PurviewInfo> purList = new ArrayList<PurviewInfo>();
		for(ResourceUucDTO res:li){
			PurviewInfo pur = new PurviewInfo();
			pur.setOptSign(res.getResourceFlag());
			pur.setOptPath(res.getResourcePath());
			
			purList.add(pur);
		}*/
		
		

		List<Resource> resoucemenus = resourceService.findUserResource("");
		List<PurviewInfo> purList = new ArrayList<PurviewInfo>();
		for(Resource  res:resoucemenus){
			PurviewInfo pur = new PurviewInfo();
			pur.setOptSign(res.getResourceFlag());
			pur.setOptPath(res.getUrl());
			
			purList.add(pur);
		}
		return purList;
	}
	
	
	/*public static void main(String[] args) {
		String menus = "";
		URL url = null;
		HttpURLConnection conn = null;
		InputStream inStream = null;
		OutputStream outputStream = null;
		StringBuffer urlSb = new StringBuffer();
		urlSb.append("http://www.hcredis.com/redis-interface/resourceAll");
		urlSb.append("/").append("smsSystem");
		try {
			url = new URL(urlSb.toString());
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			conn.setConnectTimeout(10000);
			conn.setReadTimeout(2000);
			conn.setDoOutput(true);
			inStream = conn.getInputStream();
			menus = IOUtils.toString(inStream, "UTF-8");
			menus = URLDecoder.decode(menus, "UTF-8");
		} catch (MalformedURLException e) {
			logger.error("调用接口工程获取菜单失败！", e.getMessage());
		} catch (ProtocolException e1) {
			logger.error("调用接口工程获取菜单失败！", e1.getMessage());
		} catch (IOException e2) {
			logger.error("调用接口工程获取菜单失败！", e2.getMessage());
		} finally {
			try {
				if (null != inStream) {
					inStream.close();
				}
				if (null != outputStream) {
					outputStream.close();
				}
				if (null != conn) {
					conn.disconnect();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}*/
	
	/*public static void main(String[] args) {
			 String menus = "";
			URL url = null;
			HttpURLConnection conn = null;
			InputStream inStream = null;
			OutputStream outputStream = null;
			StringBuffer urlSb = new StringBuffer();
			urlSb.append("http://interface.uuc.com/iresource/authorized");
			urlSb.append("?sysFlag").append("smsSystem");
			try {
				url = new URL(urlSb.toString());
				conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("POST");
				conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
				conn.setConnectTimeout(10000);
				conn.setReadTimeout(2000);
				conn.setDoOutput(true);
				inStream = conn.getInputStream();
				menus = IOUtils.toString(inStream, "UTF-8");
				menus = URLDecoder.decode(menus, "UTF-8");
			} catch (MalformedURLException e) {
				logger.error("调用接口工程获取菜单失败！", e.getMessage());
			} catch (ProtocolException e1) {
				logger.error("调用接口工程获取菜单失败！", e1.getMessage());
			} catch (IOException e2) {
				logger.error("调用接口工程获取菜单失败！", e2.getMessage());
			} finally {
				try {
					if (null != inStream) {
						inStream.close();
					}
					if (null != outputStream) {
						outputStream.close();
					}
					if (null != conn) {
						conn.disconnect();
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
	}*/
	
	
}

