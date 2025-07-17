/*
*********************************************************************
http://www.mysqltutorial.org
*********************************************************************
name: MySQL Database Learning
Link: http://www.woworld.com
Version 1.0
+ initial commit 
*********************************************************************
*/


/*!40101 SET NAMES utf8mb4 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
-- CREATE DATABASE /*!32312 IF NOT EXISTS*/`Learning` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`Learning` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `Learning`;

/*Table structure for table `User` */

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `userId` VARBINARY(16) NOT NULL,
  `deviceId` VARBINARY(16) NOT NULL,
  `account` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL DEFAULT '',
  `lastSessionId` varchar(36) NOT NULL,
  `lastActionTime` datetime NOT NULL,
  `effectiveDate` date NOT NULL DEFAULT '1980-01-01',
  `expiredDate` date NOT NULL DEFAULT '2999-12-31',
  `authority` varchar(1) NOT NULL DEFAULT '0',
  `deposit` int NOT NULL DEFAULT '0',
  `redeem` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `idx_User_account` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

delimiter //
CREATE TRIGGER User_OnInsert BEFORE INSERT ON `User`
FOR EACH ROW
BEGIN
	SET NEW.userId = IFNULL(NEW.userId, UUID_TO_BIN(UUID(), 1));
END ;//
delimiter ;

INSERT INTO `Learning`.`User`
(`userId`,`deviceId`,`account`,`password`,`userName`,`lastSessionId`,`lastActionTime`,`authority`,`email`)
VALUES
(UUID_TO_BIN('9de94504-c521-11ef-91bc-0242ac110002',1),UUID_TO_BIN('00000000-0000-0000-0000-000000000000',1),'admin','jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=','管理帳號',UUID(),NOW(),'4',''),
(UUID_TO_BIN('9de94510-c521-11ef-91bc-0242ac110002',1),UUID_TO_BIN('11111111-1111-1111-1111-111111111111',1),'test1','G08OmFGXGZjnMgeFRMlrNsPQHO33yqMyNZ1vHYNWcBQ=','測試帳號',UUID(),NOW(),'1','');


/*Table structure for table `ResetPassword` */

DROP TABLE IF EXISTS `ResetPassword`;

CREATE TABLE `ResetPassword` (
  `processId` VARBINARY(16) NOT NULL,
  `account` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `expiryTime` datetime NOT NULL,
  PRIMARY KEY (`processId`),
  CONSTRAINT `ResetPassword_ibfk_1` FOREIGN KEY (`account`) REFERENCES `User` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
