package com.sun.wen.lou.newtec.shiro;

import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cas.CasRealm;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/** 
 * <br>类 名: SmsRealm 
 * <br>描 述:  系统权限控制，整合cas
 * <br>作 者: checkSun
 * <br>创 建： 2015年8月7日 
 * <br>版 本：v1.0.0 
 * <br>
 * <br>历 史: (版本) 作者 时间 注释
 */
public class UucCenterRealm extends CasRealm {

	private static final Logger log = LoggerFactory.getLogger(AuthorizingRealm.class);

	/* private Cache<Object, AuthorizationInfo> authorizationCache; */

	private ISecurityUsersFinder securityUsersFinder;

	public ISecurityUsersFinder getSecurityUsersFinder() {
		return securityUsersFinder;
	}

	public void setSecurityUsersFinder(ISecurityUsersFinder securityUsersFinder) {
		this.securityUsersFinder = securityUsersFinder;
	}

	/**
	 * <br>描 述：授权（资源权限）
	 * <br>作 者：checkSun
	 * <br>历 史: (版本) 作者 时间 注释
	 * @param sysFlag
	 * @param accountId
	 * @return
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		// 获取当前登录的用户名
		// String accountName = (String)
		// super.getAvailablePrincipal(principals);
		String accountName = CasUtil.getAccountId();

		PurviewUsers pu = null;
		if (null != securityUsersFinder) {
			pu=	securityUsersFinder.getPurviewUsers(accountName);
			// 给当前用户设置角色
			// info.addRoles(pu.getRoles());
			// 给当前用户设置权限
			info.addStringPermissions(pu.getPermissions());
		}
		return info;
	}

	
	/**
	 * <br>描 述：重写取权限方法，用用户名作为key保存到redis中，方便取value数据 author
	 * <br>作 者：checkSun
	 * <br>历 史: (版本) 作者 时间 注释
	 * @param sysFlag
	 * @param accountId
	 * @return
	 */
	protected AuthorizationInfo getAuthorizationInfo(PrincipalCollection principals) {
		if (principals == null) {
			return null;
		}
		AuthorizationInfo info = null;
		if (log.isTraceEnabled()) {
			log.trace("Retrieving AuthorizationInfo for principals [" + principals + "]");
		}
		/*
		 * Cache<Object, AuthorizationInfo> cache =
		 * getAvailableAuthorizationCache(); if (cache != null) { if
		 * (log.isTraceEnabled()) {
		 * log.trace("Attempting to retrieve the AuthorizationInfo from cache."
		 * ); } String accountid = CasUtil.getAccountId(); info =
		 * cache.get(accountid); if (log.isTraceEnabled()) { if (info == null) {
		 * log.trace("No AuthorizationInfo found in cache for principals [" +
		 * principals + "]"); } else {
		 * log.trace("AuthorizationInfo found in cache for principals [" +
		 * principals + "]"); } } }
		 */
		info = doGetAuthorizationInfo(principals);
		/*
		 * if (info == null) { info = doGetAuthorizationInfo(principals); if
		 * (info != null && cache != null) { if (log.isTraceEnabled()) {
		 * log.trace("Caching authorization info for principals: [" + principals
		 * + "]."); } String accountid = CasUtil.getAccountId();
		 * cache.put(accountid, info); } }
		 */
		return info;
	}

	/*
	 * private Cache<Object, AuthorizationInfo> getAvailableAuthorizationCache()
	 * { Cache<Object, AuthorizationInfo> cache = getAuthorizationCache(); if
	 * (cache == null && isAuthorizationCachingEnabled()) { cache =
	 * getAuthorizationCacheLazy(); } return cache; }
	 */

	/*
	 * private Cache<Object, AuthorizationInfo> getAuthorizationCacheLazy() { if
	 * (this.authorizationCache == null) { if (log.isDebugEnabled()) {
	 * log.debug(
	 * "No authorizationCache instance set.  Checking for a cacheManager..."); }
	 * CacheManager cacheManager = getCacheManager(); if (cacheManager != null)
	 * { String cacheName = getAuthorizationCacheName(); if
	 * (log.isDebugEnabled()) { log.debug("CacheManager [" + cacheManager +
	 * "] has been configured.  Building "+ "authorization cache named [" +
	 * cacheName + "]"); } this.authorizationCache =
	 * cacheManager.getCache(cacheName); } else { if (log.isInfoEnabled()) {
	 * log.info(
	 * "No cache or cacheManager properties have been set.  Authorization cache cannot "
	 * + "be obtained."); } } } return this.authorizationCache; }
	 */
}
