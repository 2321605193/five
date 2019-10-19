/*
SQLyog Enterprise v12.09 (64 bit)
MySQL - 5.5.20-log : Database - five
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`five` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `five`;

/*Table structure for table `cars` */

DROP TABLE IF EXISTS `cars`;

CREATE TABLE `cars` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`cid`),
  KEY `uid` (`uid`),
  KEY `pid` (`pid`),
  CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`),
  CONSTRAINT `cars_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `commod` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

/*Data for the table `cars` */

insert  into `cars`(`cid`,`uid`,`pid`,`count`) values (18,17,3,1),(19,17,4,2),(20,18,4,1),(21,19,2,1),(22,19,1,1),(23,19,3,1),(24,19,4,1),(25,19,5,1),(26,19,6,1),(27,19,13,1);

/*Table structure for table `commod` */

DROP TABLE IF EXISTS `commod`;

CREATE TABLE `commod` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` varchar(50) NOT NULL,
  `img` varchar(50) NOT NULL,
  `oldPrice` varchar(50) NOT NULL,
  `class` varchar(10) NOT NULL,
  `iconImg` varchar(50) NOT NULL,
  `inventory` varchar(50) NOT NULL,
  `people` varchar(50) NOT NULL,
  `integral` varchar(50) NOT NULL,
  `imgList` varchar(100) DEFAULT NULL,
  `pur` int(5) NOT NULL,
  PRIMARY KEY (`pid`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

/*Data for the table `commod` */

insert  into `commod`(`pid`,`name`,`price`,`img`,`oldPrice`,`class`,`iconImg`,`inventory`,`people`,`integral`,`imgList`,`pur`) values (1,'南极人男士内裤纯棉平角裤','26.9','./img/s1.jpg','219','s1','./img/T.png','94254','154','4','./img/s11.jpg,./img/s12.jpg',5),(2,'打底裤女加绒秋冬款人丝袜加厚肉色光腿神器','14.9','./img/s6.jpg','78','s6','./img/taobao.png','1441','35','3','./img/s61.jpg,./img/s62.jpg,./img/s63.jpg',3),(3,'《中国机长》12元电影代金券','9.9','./img/s2.jpg','30','s2','./img/taobao.png','25','4578','2','',2),(4,'全面覆盖 满屏保护','1999','./img/s3.jpg','2699','s3','./img/T.png','94254','7895','100','./img/s31.jpg',10),(5,'英菲格雅保温杯男大容量保温壶2L','19.9','./img/s4.jpg','168','s4','./img/T.png','548','6788','4','',20),(6,'变色水杯网红创意玻璃杯子','1.56','./img/s5.jpg','219','s5','./img/taobao.png','894465','878','1','',6),(13,'每日坚果大礼包孕妇儿童款30包','9.99','./img/s7.jpg','148','s7','./img/taobao.png','1578','74088','24','./img/s71.jpg,./img/s72.jpg,./img/s73.jpg',15);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(50) NOT NULL,
  `upwd` varchar(50) NOT NULL,
  `usex` varchar(1) DEFAULT NULL,
  `utel` varchar(11) DEFAULT NULL,
  `uaddress` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uname` (`uname`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`uid`,`uname`,`upwd`,`usex`,`utel`,`uaddress`) values (17,'junjun','a343a71239e4a4069231defc2cd21d46','男','15954455478','23193@qq.com'),(18,'ajajaj','a343a71239e4a4069231defc2cd21d46','男','15912345678','23193@qq.com'),(19,'junjunniubi','a343a71239e4a4069231defc2cd21d46','男','13812345678','123456789@qq.com');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
