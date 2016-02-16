/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : newtecanolegy

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2016-02-16 17:32:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `role_resource`
-- ----------------------------
DROP TABLE IF EXISTS `role_resource`;
CREATE TABLE `role_resource` (
  `role_id` int(3) NOT NULL COMMENT '角色ID',
  `resource_id` int(3) NOT NULL COMMENT '资源ID',
  `isAvaliable` int(1) DEFAULT '1' COMMENT '是否可用，1是，0 否',
  PRIMARY KEY (`role_id`,`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of role_resource
-- ----------------------------
INSERT INTO `role_resource` VALUES ('1', '1', '1');
INSERT INTO `role_resource` VALUES ('1', '11', '1');
INSERT INTO `role_resource` VALUES ('1', '12', '1');
INSERT INTO `role_resource` VALUES ('1', '13', '1');
INSERT INTO `role_resource` VALUES ('1', '21', '1');
INSERT INTO `role_resource` VALUES ('1', '22', '1');
INSERT INTO `role_resource` VALUES ('1', '23', '1');
INSERT INTO `role_resource` VALUES ('1', '24', '1');
INSERT INTO `role_resource` VALUES ('1', '25', '1');
INSERT INTO `role_resource` VALUES ('1', '31', '1');
INSERT INTO `role_resource` VALUES ('1', '32', '1');
INSERT INTO `role_resource` VALUES ('1', '33', '1');
INSERT INTO `role_resource` VALUES ('1', '35', '1');
INSERT INTO `role_resource` VALUES ('1', '41', '1');
INSERT INTO `role_resource` VALUES ('1', '42', '1');
INSERT INTO `role_resource` VALUES ('1', '43', '1');
INSERT INTO `role_resource` VALUES ('1', '44', '1');
INSERT INTO `role_resource` VALUES ('1', '45', '1');
INSERT INTO `role_resource` VALUES ('2', '13', '1');

-- ----------------------------
-- Table structure for `sys_organization`
-- ----------------------------
DROP TABLE IF EXISTS `sys_organization`;
CREATE TABLE `sys_organization` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `parent_ids` varchar(100) DEFAULT NULL,
  `available` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_sys_organization_parent_id` (`parent_id`),
  KEY `idx_sys_organization_parent_ids` (`parent_ids`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_organization
-- ----------------------------
INSERT INTO `sys_organization` VALUES ('1', '总公司', '0', '0/', '1');
INSERT INTO `sys_organization` VALUES ('2', '分公司1', '1', '0/1/', '1');
INSERT INTO `sys_organization` VALUES ('4', '分公司11', '2', '0/1/2/', '1');
INSERT INTO `sys_organization` VALUES ('5', '分公司2', '1', '0/1/', '1');
INSERT INTO `sys_organization` VALUES ('6', '分公司22', '5', '0/1/5/', '1');
INSERT INTO `sys_organization` VALUES ('7', '啊啊啊', '1', '0/1/', '1');
INSERT INTO `sys_organization` VALUES ('16', '总公司11', '5', '0/', '1');
INSERT INTO `sys_organization` VALUES ('18', '啪啪啪', '1', '0/1/', '1');

-- ----------------------------
-- Table structure for `sys_resource`
-- ----------------------------
DROP TABLE IF EXISTS `sys_resource`;
CREATE TABLE `sys_resource` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `parent_ids` varchar(100) DEFAULT NULL,
  `permission` varchar(100) DEFAULT '1' COMMENT '角色ID',
  `available` tinyint(1) DEFAULT '0',
  `resourceFlag` varchar(50) NOT NULL COMMENT '标识各个不同的资源',
  `ID_TREE` varchar(300) DEFAULT NULL,
  `RESOURCE_DESC` varchar(300) DEFAULT NULL,
  `RESOURCE_SORT` int(11) DEFAULT NULL,
  `STATE` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_sys_resource_parent_id` (`parent_id`),
  KEY `idx_sys_resource_parent_ids` (`parent_ids`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_resource
-- ----------------------------
INSERT INTO `sys_resource` VALUES ('1', '资源', 'menu', '', '0', '0/', '1', '1', 'resource', null, null, null, null);
INSERT INTO `sys_resource` VALUES ('11', '组织机构管理', 'menu', '', '1', '0/1/', '1', '1', 'orgnizationManager', null, '123', null, null);
INSERT INTO `sys_resource` VALUES ('12', '组织机构列表查看', 'menu', '/organization/index', '11', '0/1/11/', '1', '1', 'orglistTable', null, '啊啊啊啊啊啊啊啊', null, null);
INSERT INTO `sys_resource` VALUES ('13', '组织机构树形查看', 'menu', '/organization/tree', '11', '0/1/11/', '1', '1', 'orglistTree', null, null, null, null);
INSERT INTO `sys_resource` VALUES ('21', '用户管理', 'menu', '/user/userindex', '1', '0/1/', '1', '1', 'userManager', null, null, null, null);
INSERT INTO `sys_resource` VALUES ('22', '用户新增', 'button', '', '21', '0/1/21/', '1', '1', 'useradd', null, null, null, null);
INSERT INTO `sys_resource` VALUES ('23', '用户修改', 'button', '', '21', '0/1/21/', '1', '1', 'userUpdate', null, null, null, null);
INSERT INTO `sys_resource` VALUES ('25', '用户查看', 'button', '', '21', '0/1/21/', '1', '1', 'userlist', null, null, null, null);
INSERT INTO `sys_resource` VALUES ('31', '资源管理', 'menu', '/resource/main', '1', '0/1/', '1', '1', 'resourceMana', null, null, null, null);
INSERT INTO `sys_resource` VALUES ('32', '资源新增', 'button', '', '31', '0/1/31/', '1', '1', 'resourceadd', null, null, null, null);
INSERT INTO `sys_resource` VALUES ('33', '资源修改', 'button', '', '31', '0/1/31/', '1', '1', 'resourceUpdate', null, null, null, null);
INSERT INTO `sys_resource` VALUES ('41', '角色管理', 'menu', '/role/roleindex', '1', '0/1/', '1', '1', 'roleManager', null, null, null, null);
INSERT INTO `sys_resource` VALUES ('42', '角色新增', 'button', '', '41', '0/1/41/', '1', '1', 'roleAdd', null, null, null, null);
INSERT INTO `sys_resource` VALUES ('43', '角色修改', 'button', '', '41', '0/1/41/', '1', '1', 'roleUpdate', null, null, null, null);
INSERT INTO `sys_resource` VALUES ('44', '角色删除', 'button', '', '41', '0/1/41/', '1', '1', 'roledel', null, null, null, null);
INSERT INTO `sys_resource` VALUES ('45', '角色查看', 'button', '', '41', '0/1/41/', '1', '1', 'rolelist', null, null, null, null);
INSERT INTO `sys_resource` VALUES ('48', '实得分', '1', '实得分', '47', '0//1//47/', '1', '0', '实得分', null, null, null, null);

-- ----------------------------
-- Table structure for `sys_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `resource_ids` varchar(100) DEFAULT NULL,
  `available` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_sys_role_resource_ids` (`resource_ids`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('1', 'admin', '超级管理员', '1,11,,12,13,21,22,23,24,25,31,32,33,34,35,41,42,43,44,45', '1');
INSERT INTO `sys_role` VALUES ('2', 'common', '普通用户222222', '13,', '1');
INSERT INTO `sys_role` VALUES ('3', null, 'testests', null, '0');
INSERT INTO `sys_role` VALUES ('4', null, 'testests', null, '0');
INSERT INTO `sys_role` VALUES ('5', null, 'sdf', null, '0');
INSERT INTO `sys_role` VALUES ('6', null, 'sdf', null, '0');
INSERT INTO `sys_role` VALUES ('7', null, 'ttt', null, '0');
INSERT INTO `sys_role` VALUES ('10', 'ddd', '323', null, '0');

-- ----------------------------
-- Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `organization_id` bigint(20) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `salt` varchar(100) DEFAULT NULL,
  `role_ids_str` varchar(100) DEFAULT NULL,
  `locked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_sys_user_username` (`username`),
  KEY `idx_sys_user_organization_id` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', '18', 'admin', 'admin', '8d78869f470951332959580424d4bf4f', '1,2,', '0');
INSERT INTO `sys_user` VALUES ('2', '7', 'common', 'd3c59d25033dbf980d29554025c23a75', '8d78869f470951332959580424d4bf4f', '2,', '0');
INSERT INTO `sys_user` VALUES ('13', '2', '321313', '11132', null, '1', '0');
INSERT INTO `sys_user` VALUES ('14', '5', 'gggggg33', '11111', null, '1', '0');
INSERT INTO `sys_user` VALUES ('18', '1', 'hh', '11111', null, '0,1,', '0');
INSERT INTO `sys_user` VALUES ('20', '1', 'www', 'wwww', null, '1,2,', '0');
INSERT INTO `sys_user` VALUES ('21', '5', '1111', '1111', null, '1,', '0');
INSERT INTO `sys_user` VALUES ('22', '7', 'qqqqqqqqqq', '1111', null, '1,2,', '0');
INSERT INTO `sys_user` VALUES ('23', '1', 'qqqqqqqqqq22', '1111', null, '1,2,', '0');

-- ----------------------------
-- Table structure for `user_account`
-- ----------------------------
DROP TABLE IF EXISTS `user_account`;
CREATE TABLE `user_account` (
  `user_account_id` varchar(32) COLLATE utf8_bin NOT NULL COMMENT 'id',
  `user_account_name` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '用户名称',
  `dept` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '所属部门',
  `company` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '公司名称',
  `create_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `sts` varchar(2) COLLATE utf8_bin NOT NULL COMMENT ' 状态 :A 正常， P  停用  ，D 禁用',
  `is_admin` varchar(2) COLLATE utf8_bin NOT NULL COMMENT ' 是否管理员 Y是 N否 A超级管理员',
  `job_name` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '职位名称',
  `email` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT 'email',
  `pwd` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`user_account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user_account
-- ----------------------------
INSERT INTO `user_account` VALUES ('1', 'admin', '开发', '牛牛打猫猫', '2015-09-29 11:00:50', 'A', 'A', '工程师', '534021149@qq.com', 'admin');
INSERT INTO `user_account` VALUES ('2', 'test', '开发', '牛', '2015-09-29 14:20:38', 'A', 'N', null, null, '1');

-- ----------------------------
-- Table structure for `user_role`
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `userid` int(3) NOT NULL COMMENT '用户ID',
  `roleid` int(3) NOT NULL COMMENT '角色ID',
  `isAvaliable` int(1) NOT NULL DEFAULT '1' COMMENT '是否可用，1是，0否',
  PRIMARY KEY (`userid`,`roleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('1', '1', '1');
INSERT INTO `user_role` VALUES ('1', '2', '1');
INSERT INTO `user_role` VALUES ('2', '2', '1');
INSERT INTO `user_role` VALUES ('8', '1', '1');
INSERT INTO `user_role` VALUES ('9', '1', '1');
INSERT INTO `user_role` VALUES ('10', '1', '1');
INSERT INTO `user_role` VALUES ('11', '1', '1');
INSERT INTO `user_role` VALUES ('12', '1', '1');
INSERT INTO `user_role` VALUES ('13', '1', '1');
INSERT INTO `user_role` VALUES ('14', '1', '1');
INSERT INTO `user_role` VALUES ('18', '0', '1');
INSERT INTO `user_role` VALUES ('18', '1', '1');
INSERT INTO `user_role` VALUES ('20', '1', '1');
INSERT INTO `user_role` VALUES ('20', '2', '1');
INSERT INTO `user_role` VALUES ('21', '1', '1');
INSERT INTO `user_role` VALUES ('22', '1', '1');
INSERT INTO `user_role` VALUES ('22', '2', '1');
INSERT INTO `user_role` VALUES ('23', '1', '1');
INSERT INTO `user_role` VALUES ('23', '2', '1');
