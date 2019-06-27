/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : conchat

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-06-27 18:21:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `chat_list`
-- ----------------------------
DROP TABLE IF EXISTS `chat_list`;
CREATE TABLE `chat_list` (
  `cId` int(11) NOT NULL AUTO_INCREMENT,
  `fId` int(255) NOT NULL,
  `user` char(255) NOT NULL,
  PRIMARY KEY (`cId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of chat_list
-- ----------------------------
INSERT INTO `chat_list` VALUES ('1', '56', '');

-- ----------------------------
-- Table structure for `friends`
-- ----------------------------
DROP TABLE IF EXISTS `friends`;
CREATE TABLE `friends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aTel` char(11) NOT NULL,
  `bTel` char(11) NOT NULL,
  `aGood` int(10) unsigned zerofill DEFAULT NULL,
  `bGood` int(10) unsigned zerofill DEFAULT NULL,
  `status` int(11) NOT NULL,
  `createTime` char(15) DEFAULT NULL,
  `updateTime` char(15) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of friends
-- ----------------------------
INSERT INTO `friends` VALUES ('56', '17620327669', '15111327689', null, null, '1', '0000-00-00 00:0', '1559997193681');
INSERT INTO `friends` VALUES ('57', '15111326666', '17620327669', null, null, '2', '0000-00-00 00:0', '1557818038305');
INSERT INTO `friends` VALUES ('58', '17620327662', '17620327669', null, null, '1', '1560059466895', '1560059474280');

-- ----------------------------
-- Table structure for `friend_record`
-- ----------------------------
DROP TABLE IF EXISTS `friend_record`;
CREATE TABLE `friend_record` (
  `rId` int(11) NOT NULL AUTO_INCREMENT,
  `fId` int(11) NOT NULL,
  `aTel` char(11) NOT NULL,
  `bTel` char(11) NOT NULL,
  `status` int(1) NOT NULL,
  `aIsRead` int(1) unsigned zerofill NOT NULL,
  `bIsRead` int(1) unsigned zerofill NOT NULL,
  `createTime` char(15) DEFAULT NULL,
  `updateTime` char(15) DEFAULT NULL,
  PRIMARY KEY (`rId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of friend_record
-- ----------------------------
INSERT INTO `friend_record` VALUES ('58', '56', '17620327669', '15111327689', '1', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('59', '56', '17620327669', '15111327689', '1', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('60', '57', '15111326666', '17620327669', '3', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('61', '57', '15111326666', '17620327669', '3', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('62', '57', '15111326666', '17620327669', '1', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('63', '57', '17620327669', '15111326666', '1', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('64', '57', '15111326666', '17620327669', '3', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('65', '57', '15111326666', '17620327669', '3', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('66', '56', '15111327689', '17620327669', '1', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('67', '56', '17620327669', '15111327689', '3', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('68', '56', '17620327669', '15111327689', '3', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('69', '56', '17620327669', '15111327689', '1', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('70', '56', '15111327689', '17620327669', '3', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('71', '56', '15111327689', '17620327669', '3', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('72', '56', '17620327669', '15111327689', '3', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('73', '56', '17620327669', '15111327689', '3', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('74', '56', '17620327669', '15111327689', '1', '1', '1', '0000-00-00 00:0', '0000-00-00 00:0');
INSERT INTO `friend_record` VALUES ('75', '57', '17620327669', '15111326666', '3', '1', '1', '1557815274856', '1557815296890');
INSERT INTO `friend_record` VALUES ('76', '57', '17620327669', '15111326666', '3', '1', '1', '1557815426465', '1557815452747');
INSERT INTO `friend_record` VALUES ('77', '57', '15111326666', '17620327669', '3', '0', '1', '1557815458354', '1557815578966');
INSERT INTO `friend_record` VALUES ('78', '57', '17620327669', '15111326666', '3', '1', '1', '1557815582626', '1557816026642');
INSERT INTO `friend_record` VALUES ('80', '57', '15111326666', '17620327669', '3', '0', '1', '1557816042220', '1557816052346');
INSERT INTO `friend_record` VALUES ('82', '57', '15111326666', '17620327669', '3', '0', '1', '1557816685592', '1557816738842');
INSERT INTO `friend_record` VALUES ('83', '57', '15111326666', '17620327669', '3', '0', '1', '1557816758173', '1557816789204');
INSERT INTO `friend_record` VALUES ('84', '57', '15111326666', '17620327669', '3', '0', '1', '1557816864105', '1557817170454');
INSERT INTO `friend_record` VALUES ('86', '57', '15111326666', '17620327669', '3', '0', '1', '1557817179178', '1557817200219');
INSERT INTO `friend_record` VALUES ('87', '57', '15111326666', '17620327669', '3', '0', '1', '1557817206350', '1557817740161');
INSERT INTO `friend_record` VALUES ('89', '57', '15111326666', '17620327669', '3', '0', '1', '1557817745014', '1557818029763');
INSERT INTO `friend_record` VALUES ('90', '57', '15111326666', '17620327669', '3', '0', '1', '1557818038305', '1557818038305');
INSERT INTO `friend_record` VALUES ('91', '56', '17620327669', '15111327689', '3', '1', '1', '1557823449616', '1557823619808');
INSERT INTO `friend_record` VALUES ('92', '56', '15111327689', '17620327669', '3', '1', '1', '1557823638054', '1557823638054');
INSERT INTO `friend_record` VALUES ('93', '56', '17620327669', '15111327689', '3', '1', '1', '1557823720754', '1557823931809');
INSERT INTO `friend_record` VALUES ('94', '56', '17620327669', '15111327689', '3', '1', '1', '1557823943152', '1557823949250');
INSERT INTO `friend_record` VALUES ('95', '56', '17620327669', '15111327689', '3', '1', '1', '1557823952991', '1557823956431');
INSERT INTO `friend_record` VALUES ('96', '56', '15111327689', '17620327669', '3', '1', '1', '1557823959480', '1557824108872');
INSERT INTO `friend_record` VALUES ('97', '56', '17620327669', '15111327689', '3', '1', '1', '1557824113824', '1557824133107');
INSERT INTO `friend_record` VALUES ('98', '56', '15111327689', '17620327669', '3', '1', '1', '1557824139306', '1557824225047');
INSERT INTO `friend_record` VALUES ('99', '56', '17620327669', '15111327689', '3', '1', '1', '1557824230857', '1557824320807');
INSERT INTO `friend_record` VALUES ('100', '56', '15111327689', '17620327669', '3', '1', '1', '1557824321529', '1557824361660');
INSERT INTO `friend_record` VALUES ('101', '56', '17620327669', '15111327689', '3', '1', '1', '1557824380376', '1557824383973');
INSERT INTO `friend_record` VALUES ('102', '56', '15111327689', '17620327669', '3', '1', '1', '1557824390851', '1557824464232');
INSERT INTO `friend_record` VALUES ('103', '56', '17620327669', '15111327689', '3', '1', '1', '1557824477740', '1557824479938');
INSERT INTO `friend_record` VALUES ('104', '56', '17620327669', '15111327689', '3', '1', '1', '1557824484825', '1557824486535');
INSERT INTO `friend_record` VALUES ('105', '56', '15111327689', '17620327669', '3', '1', '1', '1557824489945', '1557824489945');
INSERT INTO `friend_record` VALUES ('106', '56', '17620327669', '15111327689', '3', '1', '1', '1557824652271', '1557824654945');
INSERT INTO `friend_record` VALUES ('107', '56', '17620327669', '15111327689', '1', '1', '1', '1557824656933', '1557824665354');
INSERT INTO `friend_record` VALUES ('108', '56', '15111327689', '17620327669', '3', '1', '1', '1557824686444', '1557824800082');
INSERT INTO `friend_record` VALUES ('109', '56', '15111327689', '17620327669', '1', '1', '1', '1557825399855', '1557825406186');
INSERT INTO `friend_record` VALUES ('110', '56', '15111327689', '17620327669', '3', '1', '1', '1557825435738', '1557825438824');
INSERT INTO `friend_record` VALUES ('111', '56', '15111327689', '17620327669', '3', '1', '1', '1557825440705', '1557825468753');
INSERT INTO `friend_record` VALUES ('112', '56', '15111327689', '17620327669', '3', '1', '1', '1557825500085', '1557825615659');
INSERT INTO `friend_record` VALUES ('114', '56', '17620327669', '15111327689', '3', '1', '1', '1557825619928', '1557825666983');
INSERT INTO `friend_record` VALUES ('115', '56', '15111327689', '17620327669', '3', '1', '1', '1557825821625', '1557825822921');
INSERT INTO `friend_record` VALUES ('116', '56', '17620327669', '15111327689', '3', '1', '1', '1557825829042', '1557825831908');
INSERT INTO `friend_record` VALUES ('117', '56', '17620327669', '15111327689', '3', '1', '1', '1557825835314', '1557825837858');
INSERT INTO `friend_record` VALUES ('118', '56', '17620327669', '15111327689', '3', '1', '1', '1557825841352', '1557825842513');
INSERT INTO `friend_record` VALUES ('119', '56', '17620327669', '15111327689', '3', '1', '1', '1557825843478', '1557825844339');
INSERT INTO `friend_record` VALUES ('120', '56', '17620327669', '15111327689', '3', '1', '1', '1557825845263', '1557825845951');
INSERT INTO `friend_record` VALUES ('121', '56', '17620327669', '15111327689', '3', '1', '1', '1557825846553', '1557825847081');
INSERT INTO `friend_record` VALUES ('122', '56', '17620327669', '15111327689', '3', '1', '1', '1557825847582', '1557825848040');
INSERT INTO `friend_record` VALUES ('123', '56', '17620327669', '15111327689', '3', '1', '1', '1557825848534', '1557825849046');
INSERT INTO `friend_record` VALUES ('124', '56', '17620327669', '15111327689', '3', '1', '1', '1557825850094', '1557825850728');
INSERT INTO `friend_record` VALUES ('125', '56', '17620327669', '15111327689', '3', '1', '1', '1557825851287', '1557825851958');
INSERT INTO `friend_record` VALUES ('126', '56', '17620327669', '15111327689', '3', '1', '1', '1557825852706', '1557825853367');
INSERT INTO `friend_record` VALUES ('127', '56', '17620327669', '15111327689', '3', '1', '1', '1557825854126', '1557825854674');
INSERT INTO `friend_record` VALUES ('128', '56', '17620327669', '15111327689', '3', '1', '1', '1557825855215', '1557825855825');
INSERT INTO `friend_record` VALUES ('129', '56', '17620327669', '15111327689', '3', '1', '1', '1557825856438', '1557825857039');
INSERT INTO `friend_record` VALUES ('130', '56', '17620327669', '15111327689', '3', '1', '1', '1557825857581', '1557825858222');
INSERT INTO `friend_record` VALUES ('131', '56', '17620327669', '15111327689', '3', '1', '1', '1557825858777', '1557825859279');
INSERT INTO `friend_record` VALUES ('132', '56', '15111327689', '17620327669', '1', '1', '1', '1557826648563', '1557826652209');
INSERT INTO `friend_record` VALUES ('133', '56', '17620327669', '15111327689', '3', '1', '1', '1557827384925', '1557827512782');
INSERT INTO `friend_record` VALUES ('134', '56', '17620327669', '15111327689', '3', '1', '1', '1557827522853', '1557828381389');
INSERT INTO `friend_record` VALUES ('137', '56', '17620327669', '15111327689', '3', '1', '1', '1557828559251', '1557828559251');
INSERT INTO `friend_record` VALUES ('138', '56', '17620327669', '15111327689', '3', '1', '1', '1557828559251', '1557829223624');
INSERT INTO `friend_record` VALUES ('139', '56', '17620327669', '15111327689', '3', '1', '1', '1557829245010', '1557829316702');
INSERT INTO `friend_record` VALUES ('141', '56', '17620327669', '15111327689', '1', '1', '1', '1557829322281', '1559997193681');
INSERT INTO `friend_record` VALUES ('142', '58', '17620327662', '17620327669', '1', '1', '1', '1560059466895', '1560059474280');

-- ----------------------------
-- Table structure for `messages`
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `mId` int(11) NOT NULL AUTO_INCREMENT,
  `msg` varchar(255) NOT NULL,
  `msgType` char(1) NOT NULL,
  `userTel` char(11) NOT NULL,
  `toUserTel` char(11) NOT NULL,
  `status` char(10) NOT NULL,
  `createTime` char(15) DEFAULT NULL,
  `updateTime` char(15) DEFAULT NULL,
  PRIMARY KEY (`mId`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=169 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of messages
-- ----------------------------
INSERT INTO `messages` VALUES ('168', '12312', '1', '17620327669', '15111327689', '1', '1561630778426', null);

-- ----------------------------
-- Table structure for `temporary_chat_list`
-- ----------------------------
DROP TABLE IF EXISTS `temporary_chat_list`;
CREATE TABLE `temporary_chat_list` (
  `tId` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL COMMENT '1、单聊 2、群聊',
  `groupId` int(11) NOT NULL COMMENT '关联gourpId',
  `msgId` int(11) NOT NULL COMMENT '关联ID',
  PRIMARY KEY (`tId`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of temporary_chat_list
-- ----------------------------
INSERT INTO `temporary_chat_list` VALUES ('11', '1', '56', '168');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tel` char(11) NOT NULL,
  `pwd` varchar(16) NOT NULL,
  `nickName` varchar(100) NOT NULL,
  `sex` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `headImg` varchar(255) DEFAULT NULL,
  `perSig` varchar(255) DEFAULT NULL,
  `createTime` char(15) DEFAULT NULL,
  `updateTime` char(15) DEFAULT NULL,
  `lastLoginTime` char(15) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('8', '17620327669', '999999', 'Ficks', null, null, '/headImg/ficks.jpg', null, '0', '0', '1561629234347');
INSERT INTO `user` VALUES ('9', '17620327662', '999999', '17620327662', null, null, '/headImg/defaultHeadImg.jpg', null, '0', '0', '1560059453541');
INSERT INTO `user` VALUES ('10', '17620327661', '999999', '17620327661', null, null, '/headImg/defaultHeadImg.jpg', null, '0', '0', '0');
INSERT INTO `user` VALUES ('11', '15111327689', '999999', '小虎猫', null, null, '/headImg/defaultHeadImg.jpg', null, '0', '0', '1561629082317');
INSERT INTO `user` VALUES ('12', '15111640045', '999999', '15111640045', null, null, '/headImg/defaultHeadImg.jpg', null, '0', '0', '0');
INSERT INTO `user` VALUES ('13', '15111326665', '123456', '15111326665', null, null, '/headImg/defaultHeadImg.jpg', null, '0', '0', '0');
INSERT INTO `user` VALUES ('14', '15113216666', '123456', '15113216666', null, null, '/headImg/defaultHeadImg.jpg', null, '0', '0', '0');
INSERT INTO `user` VALUES ('15', '15111326666', '123456', '15111326666', null, null, '/headImg/defaultHeadImg.jpg', null, '0', '0', '1557815341344');
