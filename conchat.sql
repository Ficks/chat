/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : conchat

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-05-14 18:27:32
*/

SET FOREIGN_KEY_CHECKS=0;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of friends
-- ----------------------------
INSERT INTO `friends` VALUES ('56', '17620327669', '15111327689', null, null, '3', '0000-00-00 00:0', '1557829390896');
INSERT INTO `friends` VALUES ('57', '15111326666', '17620327669', null, null, '2', '0000-00-00 00:0', '1557818038305');

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
  PRIMARY KEY (`rId`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8;

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
INSERT INTO `friend_record` VALUES ('141', '56', '17620327669', '15111327689', '2', '1', '1', '1557829322281', '1557829322281');

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
  PRIMARY KEY (`mId`)
) ENGINE=MyISAM AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of messages
-- ----------------------------
INSERT INTO `messages` VALUES ('3', '编程十年两茫茫，Bug何处藏？', '1', '17620327669', '15111327689', '1', '0000-00-00 00:0', null);
INSERT INTO `messages` VALUES ('4', '工期短，需求长', '1', '15111327689', '17620327669', '1', '0000-00-00 00:0', null);
INSERT INTO `messages` VALUES ('5', '编程生死两茫茫，依照入坑', '1', '17620327669', '15111327689', '1', '0000-00-00 00:0', null);
INSERT INTO `messages` VALUES ('6', '132', '1', '15111327689', '17620327669', '1', '0000-00-00 00:0', null);
INSERT INTO `messages` VALUES ('7', '111', '1', '15111327689', '17620327669', '1', '0000-00-00 00:0', null);
INSERT INTO `messages` VALUES ('8', '12121', '1', '15111327689', '17620327669', '1', '0000-00-00 00:0', null);
INSERT INTO `messages` VALUES ('9', '121', '1', '15111327689', '17620327669', '1', '0000-00-00 00:0', null);
INSERT INTO `messages` VALUES ('10', '222', '1', '17620327669', '15111327689', '1', '0000-00-00 00:0', null);
INSERT INTO `messages` VALUES ('11', '333', '1', '15111327689', '17620327669', '1', '0000-00-00 00:0', null);
INSERT INTO `messages` VALUES ('12', '444', '1', '15111327689', '17620327669', '1', '0000-00-00 00:0', null);
INSERT INTO `messages` VALUES ('13', '1', '1', '17620327669', '15111327689', '1', '1557799883159', null);
INSERT INTO `messages` VALUES ('14', '12312', '1', '17620327669', '15111327689', '1', '1557800139559', null);
INSERT INTO `messages` VALUES ('15', '312312312', '1', '17620327669', '15111327689', '1', '1557800143462', null);
INSERT INTO `messages` VALUES ('16', '312321', '1', '17620327669', '15111327689', '1', '1557800146221', null);
INSERT INTO `messages` VALUES ('17', '托尼你吃早餐了没', '1', '17620327669', '15111327689', '1', '1557805621957', null);
INSERT INTO `messages` VALUES ('18', '如果没有吃早餐的我，在楼下等我一下，一起去吃早餐', '1', '17620327669', '15111327689', '1', '1557805722453', null);
INSERT INTO `messages` VALUES ('19', '好的', '1', '15111327689', '17620327669', '1', '1557806861335', null);
INSERT INTO `messages` VALUES ('20', '你快点下来，我马上要走了', '1', '15111327689', '17620327669', '1', '1557807165437', null);
INSERT INTO `messages` VALUES ('21', '泥煤。一下子觉得好难', '1', '17620327669', '15111327689', '1', '1557808248923', null);
INSERT INTO `messages` VALUES ('22', '呵呵呵，好搞笑', '1', '17620327669', '15111327689', '1', '1557808258625', null);
INSERT INTO `messages` VALUES ('23', '你好', '1', '17620327669', '15111327689', '1', '1557810571843', null);
INSERT INTO `messages` VALUES ('24', '21312312', '1', '15111327689', '17620327669', '1', '1557810687636', null);
INSERT INTO `messages` VALUES ('25', '发顺丰第三方发顺丰第三方发顺丰第三方发顺丰第三方发顺丰第三方发顺丰第三方发顺丰第三方发顺丰第三方发顺丰第三方发顺丰第三方发顺丰第三方发顺丰第三方发顺丰第三方发顺丰第三方', '1', '15111327689', '17620327669', '1', '1557810694842', null);
INSERT INTO `messages` VALUES ('26', '发大水打发的撒发送到发大水打发的撒发送到发大水打发的撒发送到', '1', '15111327689', '17620327669', '1', '1557810741068', null);
INSERT INTO `messages` VALUES ('27', '狗体系', '1', '17620327669', '15111327689', '1', '1557810780575', null);
INSERT INTO `messages` VALUES ('28', '垃圾体系把', '1', '17620327669', '15111327689', '1', '1557810926504', null);
INSERT INTO `messages` VALUES ('29', '是挺垃圾的', '1', '15111327689', '17620327669', '1', '1557810977368', null);
INSERT INTO `messages` VALUES ('30', '确实垃圾', '1', '15111327689', '17620327669', '1', '1557810988959', null);
INSERT INTO `messages` VALUES ('31', '明天来我家里玩', '1', '17620327669', '15111327689', '1', '1557811061526', null);
INSERT INTO `messages` VALUES ('32', '好的', '1', '15111327689', '17620327669', '1', '1557811068132', null);
INSERT INTO `messages` VALUES ('33', '记得带上笔记本', '1', '17620327669', '15111327689', '1', '1557811166189', null);
INSERT INTO `messages` VALUES ('34', '带笔记本干嘛', '1', '15111327689', '17620327669', '1', '1557811201129', null);
INSERT INTO `messages` VALUES ('35', '你废话怎么那么多呢', '1', '17620327669', '15111327689', '1', '1557811230013', null);
INSERT INTO `messages` VALUES ('36', '你妹', '1', '15111327689', '17620327669', '1', '1557811237214', null);
INSERT INTO `messages` VALUES ('37', '就不带', '1', '15111327689', '17620327669', '1', '1557811249661', null);
INSERT INTO `messages` VALUES ('38', '你咬我', '1', '15111327689', '17620327669', '1', '1557811255477', null);
INSERT INTO `messages` VALUES ('39', '滚犊子玩意', '1', '17620327669', '15111327689', '1', '1557811264059', null);
INSERT INTO `messages` VALUES ('40', '去死吧', '1', '17620327669', '15111327689', '1', '1557811275483', null);
INSERT INTO `messages` VALUES ('41', '哈哈哈有意思', '1', '15111327689', '17620327669', '1', '1557811284971', null);
INSERT INTO `messages` VALUES ('42', '你好吗', '1', '15111327689', '17620327669', '1', '1557811306875', null);
INSERT INTO `messages` VALUES ('43', 'hello\n', '1', '15111327689', '17620327669', '1', '1557815075250', null);
INSERT INTO `messages` VALUES ('44', '呵呵', '1', '17620327669', '15111327689', '1', '1557815090868', null);
INSERT INTO `messages` VALUES ('45', '哈哈', '1', '17620327669', '15111327689', '1', '1557815111194', null);
INSERT INTO `messages` VALUES ('46', '笑死我了', '1', '17620327669', '15111327689', '1', '1557815117855', null);
INSERT INTO `messages` VALUES ('47', '你', '1', '17620327669', '15111327689', '1', '1557815124360', null);
INSERT INTO `messages` VALUES ('48', '你好啊', '1', '17620327669', '15111327689', '1', '1557826677122', null);
INSERT INTO `messages` VALUES ('49', '今天解决了向所有用户发送消息换成向单用户发送消息\n', '1', '15111327689', '17620327669', '1', '1557826798077', null);
INSERT INTO `messages` VALUES ('50', '接下来解决离线问题\n', '1', '17620327669', '15111327689', '1', '1557826923179', null);
INSERT INTO `messages` VALUES ('51', '好的\n', '1', '15111327689', '17620327669', '1', '1557826925363', null);
INSERT INTO `messages` VALUES ('52', '离线消息解决完成了再去通知看看里面的同意或拒绝好友怎么无法通知对方', '1', '15111327689', '17620327669', '1', '1557826958422', null);
INSERT INTO `messages` VALUES ('53', '恩，很好', '1', '17620327669', '15111327689', '1', '1557826965031', null);
INSERT INTO `messages` VALUES ('54', '准备下班吗\n', '1', '15111327689', '17620327669', '1', '1557826992248', null);
INSERT INTO `messages` VALUES ('55', '是的\n', '1', '17620327669', '15111327689', '1', '1557826998556', null);
INSERT INTO `messages` VALUES ('56', '你不在线，哈哈', '1', '17620327669', '15111327689', '1', '1557827238859', null);
INSERT INTO `messages` VALUES ('57', '我上线了\n', '1', '15111327689', '17620327669', '1', '1557827253668', null);
INSERT INTO `messages` VALUES ('58', '呵呵\n', '1', '17620327669', '15111327689', '1', '1557827260702', null);

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('8', '17620327669', '999999', 'Ficks', null, null, '/headImg/ficks.jpg', null, '0', '0', '1557826282608');
INSERT INTO `user` VALUES ('9', '17620327662', '999999', '17620327662', null, null, '/headImg/defaultHeadImg.jpg', null, '0', '0', '0');
INSERT INTO `user` VALUES ('10', '17620327661', '999999', '17620327661', null, null, '/headImg/defaultHeadImg.jpg', null, '0', '0', '0');
INSERT INTO `user` VALUES ('11', '15111327689', '999999', '小虎猫', null, null, '/headImg/defaultHeadImg.jpg', null, '0', '0', '1557828028311');
INSERT INTO `user` VALUES ('12', '15111640045', '999999', '15111640045', null, null, '/headImg/defaultHeadImg.jpg', null, '0', '0', '0');
INSERT INTO `user` VALUES ('13', '15111326665', '123456', '15111326665', null, null, '/headImg/defaultHeadImg.jpg', null, '0', '0', '0');
INSERT INTO `user` VALUES ('14', '15113216666', '123456', '15113216666', null, null, '/headImg/defaultHeadImg.jpg', null, '0', '0', '0');
INSERT INTO `user` VALUES ('15', '15111326666', '123456', '15111326666', null, null, '/headImg/defaultHeadImg.jpg', null, '0', '0', '1557815341344');
