package com.sun.wen.lou.newtec.shiro;

import java.net.URLDecoder;
import java.util.HashMap;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;

/** 
 * <br>类 名: CasUtil 
 * <br>描 述: 获取cas返回用户信息
 * <br>作 者: checkSun
 * <br>创 建： 2015年8月7日 
 * <br>版 本：v1.0.0 
 * <br>
 * <br>历 史: (版本) 作者 时间 注释
 */
public class CasUtil {
	
	/**
	 * <br>描 述：获取用户名
	 * <br>作 者：checkSun
	 * <br>历 史: (版本) 作者 时间 注释
	 * @return
	 */
	public static String getUserName(){
		Subject subject = SecurityUtils.getSubject();
		PrincipalCollection principals = subject.getPrincipals();
		if(!principals.isEmpty()){
			String accountname = (String)principals.getPrimaryPrincipal();
			return accountname;
		}
		return "";
	}
	
	/**
	 * <br>描 述：获取用户真实姓名
	 * <br>作 者：checkSun
	 * <br>历 史: (版本) 作者 时间 注释
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static String getRealName(){
		String realname="";
		try {
			Subject subject = SecurityUtils.getSubject();
			PrincipalCollection principals = subject.getPrincipals();
			if(!principals.isEmpty()){
				HashMap<String,String> map = (HashMap<String,String>)principals.asList().get(1);
				realname = map.get("account_real_name");
				realname=URLDecoder.decode(realname,"UTF-8");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return	realname;
	}
	
	/**
	 * <br>描 述： 获取用户ID
	 * <br>作 者：checkSun
	 * <br>历 史: (版本) 作者 时间 注释
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static String getAccountId(){
		Subject subject = SecurityUtils.getSubject();
		PrincipalCollection principals = subject.getPrincipals();
		String accountId="";
		if(!principals.isEmpty()){
			HashMap<String,String> map = (HashMap<String,String>)principals.asList().get(1);
			accountId =  map.get("account_id");
		}
		return accountId;
	}
}
