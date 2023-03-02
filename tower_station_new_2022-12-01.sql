# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 70.62.23.133 (MySQL 5.5.5-10.6.9-MariaDB)
# Database: tower_station_new
# Generation Time: 2022-12-01 06:16:13 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table assets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `assets`;

CREATE TABLE `assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `driver` varchar(255) DEFAULT NULL,
  `driverPhone` varchar(255) DEFAULT NULL,
  `driverEmail` varchar(255) DEFAULT NULL,
  `powerUnit` varchar(255) DEFAULT NULL,
  `powerUnitModel` varchar(255) DEFAULT NULL,
  `powerUnitLicensePlate` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `trailerModel` varchar(255) DEFAULT NULL,
  `trailerType` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table carrierAddresses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `carrierAddresses`;

CREATE TABLE `carrierAddresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carrierId` int(11) DEFAULT NULL,
  `factoringName` varchar(255) DEFAULT NULL,
  `factoringChecksPayableTo` varchar(255) DEFAULT NULL,
  `factoringStreet1` varchar(255) DEFAULT NULL,
  `factoringStreet2` varchar(255) DEFAULT NULL,
  `factoringCity` varchar(255) DEFAULT NULL,
  `factoringState` varchar(255) DEFAULT NULL,
  `factoringZipCode` varchar(255) DEFAULT NULL,
  `factoringTelephone` varchar(255) DEFAULT NULL,
  `remitChecksPayableTo` varchar(255) DEFAULT NULL,
  `remitStreet1` varchar(255) DEFAULT NULL,
  `remitStreet2` varchar(255) DEFAULT NULL,
  `remitCity` varchar(255) DEFAULT NULL,
  `remitState` varchar(255) DEFAULT NULL,
  `remitZipCode` varchar(255) DEFAULT NULL,
  `remitTelephone` varchar(255) DEFAULT NULL,
  `mailingStreet1` varchar(255) DEFAULT NULL,
  `mailingStreet2` varchar(255) DEFAULT NULL,
  `mailingCity` varchar(255) DEFAULT NULL,
  `mailingState` varchar(255) DEFAULT NULL,
  `mailingZipCode` varchar(255) DEFAULT NULL,
  `mailingTelephone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table carrierContacts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `carrierContacts`;

CREATE TABLE `carrierContacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carrierId` int(11) DEFAULT NULL,
  `contactName` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table carriers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `carriers`;

CREATE TABLE `carriers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `street1` varchar(255) DEFAULT NULL,
  `street2` varchar(255) DEFAULT NULL,
  `zipCode` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `checksPayableTo` varchar(255) DEFAULT NULL,
  `isOKToLoad` varchar(255) DEFAULT NULL,
  `privateNotes` varchar(255) DEFAULT NULL,
  `MCFFMXNumber` varchar(255) DEFAULT NULL,
  `USDOTNumber` varchar(255) DEFAULT NULL,
  `taxIDNumber` varchar(255) DEFAULT NULL,
  `is1099Vendor` varchar(255) DEFAULT NULL,
  `paymentTerms` varchar(255) DEFAULT NULL,
  `paymentMethod` varchar(255) DEFAULT NULL,
  `primaryInsuranceDetails` varchar(255) DEFAULT NULL,
  `primaryInsuranceExpirationDate` varchar(255) DEFAULT NULL,
  `cargoInsuranceDetails` varchar(255) DEFAULT NULL,
  `cargoInsuranceExpirationDate` varchar(255) DEFAULT NULL,
  `weightUnit` varchar(255) DEFAULT NULL,
  `distanceUnit` varchar(255) DEFAULT NULL,
  `temperatureUnit` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `street1` varchar(255) DEFAULT NULL,
  `street2` varchar(255) DEFAULT NULL,
  `zipCode` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `cellPhone` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `privateNotes` varchar(255) DEFAULT NULL,
  `creditLimit` varchar(255) DEFAULT NULL,
  `isCreditHold` varchar(255) DEFAULT NULL,
  `availableCredit` varchar(255) DEFAULT NULL,
  `paymentTerms` varchar(255) DEFAULT NULL,
  `mcNumberType` varchar(255) DEFAULT NULL,
  `mcNumber` varchar(255) DEFAULT NULL,
  `usdotNumber` varchar(255) DEFAULT NULL,
  `weightUnit` varchar(255) DEFAULT NULL,
  `distanceUnit` varchar(255) DEFAULT NULL,
  `temperatureUnit` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;

INSERT INTO `customers` (`id`, `userId`, `firstName`, `middleName`, `lastName`, `street1`, `street2`, `zipCode`, `state`, `city`, `telephone`, `cellPhone`, `fax`, `email`, `privateNotes`, `creditLimit`, `isCreditHold`, `availableCredit`, `paymentTerms`, `mcNumberType`, `mcNumber`, `usdotNumber`, `weightUnit`, `distanceUnit`, `temperatureUnit`, `createdAt`, `updatedAt`)
VALUES
	(1,3,'Abdul','','Rehman','aaa','','10577','New York','Purchase','(222) 222-2222','','','','','22','1','0','45','MC','200',NULL,'Pounds','Miles','Fahrenheit','2022-11-22 21:16:29','2022-11-22 21:16:29'),
	(2,1,'test','test','test','test','test','10577','New York','Purchasw','(222) 222-2222','(222) 222-2222','(222) 222-2222','test@gmail.com','test','200','1','0','22','MC','45',NULL,'test','test','test','2022-11-22 21:21:52','2022-11-22 21:21:52'),
	(3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-11-28 10:51:32','2022-11-28 10:51:32'),
	(5,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-11-28 10:55:01','2022-11-28 10:55:01'),
	(13,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-11-28 11:21:17','2022-11-28 11:21:17'),
	(14,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-11-28 11:21:29','2022-11-28 11:21:29');

/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table docManagements
# ------------------------------------------------------------

DROP TABLE IF EXISTS `docManagements`;

CREATE TABLE `docManagements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `entities` varchar(255) DEFAULT NULL,
  `documentName` varchar(255) DEFAULT NULL,
  `documentTypes` varchar(255) DEFAULT NULL,
  `documentDescription` varchar(255) DEFAULT NULL,
  `isCompanyDocument` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

LOCK TABLES `docManagements` WRITE;
/*!40000 ALTER TABLE `docManagements` DISABLE KEYS */;

INSERT INTO `docManagements` (`id`, `userId`, `entities`, `documentName`, `documentTypes`, `documentDescription`, `isCompanyDocument`, `createdAt`, `updatedAt`)
VALUES
	(1,1,NULL,'CONTRIBUTING.md',NULL,NULL,'0','2022-11-28 05:02:09','2022-11-28 05:02:09'),
	(2,1,NULL,'download.pdf',NULL,NULL,'0','2022-11-28 12:40:01','2022-11-28 12:40:01');

/*!40000 ALTER TABLE `docManagements` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table driverDeductions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `driverDeductions`;

CREATE TABLE `driverDeductions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `rateBasis` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `drivers` varchar(255) DEFAULT NULL,
  `adjustment` varchar(255) DEFAULT NULL,
  `rate` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `dateRange` varchar(255) DEFAULT NULL,
  `isAutoAddToLoad` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table driverPayItems
# ------------------------------------------------------------

DROP TABLE IF EXISTS `driverPayItems`;

CREATE TABLE `driverPayItems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `rateBasis` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `drivers` varchar(255) DEFAULT NULL,
  `adjustment` varchar(255) DEFAULT NULL,
  `rate` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `dateRange` varchar(255) DEFAULT NULL,
  `isAutoAddToLoad` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table drivers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `drivers`;

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `firstName` text DEFAULT NULL,
  `middleName` text DEFAULT NULL,
  `lastName` text DEFAULT NULL,
  `street1` text DEFAULT NULL,
  `street2` text DEFAULT NULL,
  `city` text DEFAULT NULL,
  `state` text DEFAULT NULL,
  `zipCode` text DEFAULT NULL,
  `cellPhone` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `driverType` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `dateOfBirth` text DEFAULT NULL,
  `driverNumber` text DEFAULT NULL,
  `ownershipType` text DEFAULT NULL,
  `weightUnit` text DEFAULT NULL,
  `distanceUnit` text DEFAULT NULL,
  `temperatureUnit` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `commercialDriverSinceYear` text DEFAULT NULL,
  `experienceType` text DEFAULT NULL,
  `drivingSchool` text DEFAULT NULL,
  `CDLNumber` text DEFAULT NULL,
  `licenseType` text DEFAULT NULL,
  `licenseEndorsements` text DEFAULT NULL,
  `applicationDate` text DEFAULT NULL,
  `hireDate` text DEFAULT NULL,
  `terminationDate` text DEFAULT NULL,
  `canHireAgain` text DEFAULT NULL,
  `bonusEligibilityDate` text DEFAULT NULL,
  `employmentNotes` text DEFAULT NULL,
  `insuranceCompany` text DEFAULT NULL,
  `groupNumber` text DEFAULT NULL,
  `idNumber` text DEFAULT NULL,
  `licenseExpirationDate` text DEFAULT NULL,
  `TWICCardExpirationDate` text DEFAULT NULL,
  `hazmatEndorsementExpirationDate` text DEFAULT NULL,
  `DOTMedicalCardExpirationDate` text DEFAULT NULL,
  `insuranceExpirationDate` text DEFAULT NULL,
  `lastRoadTestDate` text DEFAULT NULL,
  `lastDrugTestDate` text DEFAULT NULL,
  `lastAlcoholTestDate` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table driverViolations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `driverViolations`;

CREATE TABLE `driverViolations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `driverId` int(11) DEFAULT NULL,
  `violationType` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `violationDescription` varchar(255) DEFAULT NULL,
  `authority` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `fineAmount` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table loadDelieveries
# ------------------------------------------------------------

DROP TABLE IF EXISTS `loadDelieveries`;

CREATE TABLE `loadDelieveries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `loadId` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `pickupDate` varchar(255) DEFAULT NULL,
  `dropDate` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

LOCK TABLES `loadDelieveries` WRITE;
/*!40000 ALTER TABLE `loadDelieveries` DISABLE KEYS */;

INSERT INTO `loadDelieveries` (`id`, `userId`, `loadId`, `status`, `pickupDate`, `dropDate`, `createdAt`, `updatedAt`)
VALUES
	(1,1,'11',NULL,'2022-11-21T19:00:00.000Z',NULL,'2022-11-28 08:45:43','2022-11-28 08:45:43');

/*!40000 ALTER TABLE `loadDelieveries` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table loadDocuments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `loadDocuments`;

CREATE TABLE `loadDocuments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `loadId` int(11) DEFAULT NULL,
  `documentName` varchar(255) DEFAULT NULL,
  `documentType` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table loads
# ------------------------------------------------------------

DROP TABLE IF EXISTS `loads`;

CREATE TABLE `loads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `origin` varchar(255) DEFAULT NULL,
  `DHO` varchar(255) DEFAULT NULL,
  `DHD` varchar(255) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `offer` varchar(255) DEFAULT NULL,
  `truckTypeGroup` varchar(255) DEFAULT NULL,
  `truckTypes` varchar(255) DEFAULT NULL,
  `loadType` varchar(255) DEFAULT NULL,
  `lookBackHours` varchar(255) DEFAULT NULL,
  `startDate` varchar(255) DEFAULT NULL,
  `endDate` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `pickup` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `trip` varchar(255) DEFAULT NULL,
  `eq` varchar(255) DEFAULT NULL,
  `length` varchar(255) DEFAULT NULL,
  `factor` varchar(255) DEFAULT NULL,
  `cs` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

LOCK TABLES `loads` WRITE;
/*!40000 ALTER TABLE `loads` DISABLE KEYS */;

INSERT INTO `loads` (`id`, `userId`, `origin`, `DHO`, `DHD`, `destination`, `company`, `contact`, `offer`, `truckTypeGroup`, `truckTypes`, `loadType`, `lookBackHours`, `startDate`, `endDate`, `age`, `pickup`, `weight`, `trip`, `eq`, `length`, `factor`, `cs`, `createdAt`, `updatedAt`)
VALUES
	(1,1,'eg',NULL,NULL,'eg','eg',NULL,'eg','general','R','Both',NULL,'2022-11-18T19:00:03.353Z','2022-11-18T19:00:03.353Z',NULL,NULL,NULL,NULL,NULL,NULL,'true',NULL,'2022-11-18 19:00:34','2022-11-18 19:00:34'),
	(2,NULL,'origin','DHO','DHD','destination','company','contact','offer','truckTypeGroup','t','loadType','lookBackHours','startDate','endDate','age','pickup','weight','trip','eq','length','factor','cs','2022-11-22 15:30:10','2022-11-22 15:30:10'),
	(3,NULL,'origin','DHO','DHD','destination','company','contact','offer','truckTypeGroup','t','loadType','lookBackHours','startDate','endDate','age','pickup','weight','trip','eq','length','factor','cs','2022-11-22 15:31:33','2022-11-22 15:31:33'),
	(4,NULL,'origin','DHO','DHD','destination','company','contact','offer','truckTypeGroup','t','loadType','lookBackHours','startDate','endDate','age','pickup','weight','trip','eq','length','factor','cs','2022-11-22 15:55:56','2022-11-22 15:55:56'),
	(5,1,'origin','DHO','DHD','destination','company','contact','offer','truckTypeGroup','t','loadType','lookBackHours','startDate','endDate','age','pickup','weight','trip','eq','length','factor','cs','2022-11-22 20:33:21','2022-11-22 20:33:21'),
	(6,1,'origin','DHO','DHD','destination','company','contact','offer','truckTypeGroup','t','loadType','lookBackHours','startDate','endDate','age','pickup','weight','trip','eq','length','factor','cs','2022-11-23 09:40:45','2022-11-23 09:40:45'),
	(7,1,'','','','','','','','','g',NULL,NULL,'','2022-11-23T10:24:03.418Z','2022-11-23T10:24:03.435Z','','','','','','',NULL,'2022-11-23 10:32:22','2022-11-23 10:32:22'),
	(8,1,'','','','','','','','','g',NULL,NULL,'','2022-11-23T10:24:03.418Z','2022-11-23T10:24:03.435Z','','','','','','',NULL,'2022-11-23 10:32:40','2022-11-23 10:32:40'),
	(9,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'general','F','Both',NULL,'2022-11-25T13:34:21.697Z','2022-11-25T13:34:21.697Z',NULL,NULL,NULL,NULL,NULL,NULL,'true',NULL,'2022-11-25 13:34:44','2022-11-25 13:34:44'),
	(10,1,'agg',NULL,NULL,'gas',NULL,NULL,NULL,NULL,'Reefers',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-11-25 13:35:38','2022-11-25 13:35:38'),
	(11,1,'a',NULL,NULL,'af','af',NULL,'fff','general','Flatbeds','Both',NULL,'2022-11-25T13:51:46.085Z','2022-11-25T13:51:46.085Z',NULL,NULL,NULL,NULL,NULL,NULL,'True',NULL,'2022-11-25 13:53:03','2022-11-25 13:53:03');

/*!40000 ALTER TABLE `loads` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table locationContacts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `locationContacts`;

CREATE TABLE `locationContacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locationId` int(11) DEFAULT NULL,
  `contactName` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table locations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `locations`;

CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `street1` varchar(255) DEFAULT NULL,
  `street2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zipCode` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `privateNotes` varchar(255) DEFAULT NULL,
  `locationTypes` varchar(255) DEFAULT NULL,
  `locationCodes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `permissions`;

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;

INSERT INTO `permissions` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
	(1,'Load Board','2022-10-19 09:45:51','2022-10-19 09:45:51'),
	(2,'User Management','2022-10-19 09:46:15','2022-10-19 09:46:15'),
	(3,'Customers','2022-10-21 10:42:06','2022-10-21 10:42:06'),
	(4,'Shippers','2022-10-28 09:23:47','2022-10-28 09:23:47'),
	(5,'Carriers','2022-10-28 09:24:01','2022-10-28 09:24:01'),
	(6,'Assets','2022-10-28 09:24:14','2022-10-28 09:24:14'),
	(7,'Asset Groups','2022-10-28 09:24:23','2022-10-28 09:25:36'),
	(8,'Power Units','2022-10-28 09:24:35','2022-10-28 09:24:35'),
	(9,'Trailers','2022-10-28 09:24:53','2022-10-28 09:24:53'),
	(10,'Drivers','2022-10-28 09:25:08','2022-10-28 09:25:08'),
	(11,'Location','2022-10-28 09:25:58','2022-10-28 09:25:58'),
	(12,'Doc Management','2022-10-28 09:26:13','2022-10-28 09:26:13'),
	(13,'Pickup Loads','2022-10-28 09:26:30','2022-11-16 12:14:22');

/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table powerUnitLogs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `powerUnitLogs`;

CREATE TABLE `powerUnitLogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `mileage` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `maintenanceType` varchar(255) DEFAULT NULL,
  `maintenancePerformed` varchar(255) DEFAULT NULL,
  `performedBy` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `billTo` varchar(255) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table powerUnits
# ------------------------------------------------------------

DROP TABLE IF EXISTS `powerUnits`;

CREATE TABLE `powerUnits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `model` text DEFAULT NULL,
  `powerUnitNumber` text DEFAULT NULL,
  `engineType` text DEFAULT NULL,
  `transmissionType` text DEFAULT NULL,
  `fuelType` text DEFAULT NULL,
  `horsepower` text DEFAULT NULL,
  `licensePlate` text DEFAULT NULL,
  `modelYear` text DEFAULT NULL,
  `vehicleIdNumber` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `insuranceInformation` text DEFAULT NULL,
  `registeredStates` text DEFAULT NULL,
  `length` text DEFAULT NULL,
  `width` text DEFAULT NULL,
  `height` text DEFAULT NULL,
  `numberOfAxles` text DEFAULT NULL,
  `unloadedVehicleWeight` text DEFAULT NULL,
  `grossVehicleWeight` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `ownership` text DEFAULT NULL,
  `isPurchased` text DEFAULT NULL,
  `purchasedFrom` text DEFAULT NULL,
  `soldTo` text DEFAULT NULL,
  `purchasedDate` text DEFAULT NULL,
  `soldDate` text DEFAULT NULL,
  `purchasedPrice` text DEFAULT NULL,
  `soldPrice` text DEFAULT NULL,
  `factoryPrice` text DEFAULT NULL,
  `currentValue` text DEFAULT NULL,
  `licensePlateExpiration` text DEFAULT NULL,
  `inspectionExpiration` text DEFAULT NULL,
  `DOTExpiration` text DEFAULT NULL,
  `registrationExpiration` text DEFAULT NULL,
  `insuranceExpiration` text DEFAULT NULL,
  `estimatedOdometerReading` text DEFAULT NULL,
  `lastOilChangeDate` text DEFAULT NULL,
  `lastOilChangeMileage` text DEFAULT NULL,
  `lastTuneUpDate` text DEFAULT NULL,
  `lastTuneUpMileage` text DEFAULT NULL,
  `lastServiceDate` text DEFAULT NULL,
  `lastServiceMileage` text DEFAULT NULL,
  `keepTruckInVehicleId` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table privileges
# ------------------------------------------------------------

DROP TABLE IF EXISTS `privileges`;

CREATE TABLE `privileges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

LOCK TABLES `privileges` WRITE;
/*!40000 ALTER TABLE `privileges` DISABLE KEYS */;

INSERT INTO `privileges` (`id`, `type`, `createdAt`, `updatedAt`)
VALUES
	(1,'Create','2022-09-28 12:57:13','2022-09-28 12:57:13'),
	(2,'Read','2022-09-28 12:57:13','2022-09-28 12:57:13'),
	(3,'Update','2022-09-28 12:57:13','2022-09-28 12:57:13'),
	(4,'Delete','2022-09-28 12:57:13','2022-09-28 12:57:13');

/*!40000 ALTER TABLE `privileges` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `roleName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;

INSERT INTO `roles` (`id`, `userId`, `roleName`, `createdAt`, `updatedAt`)
VALUES
	(1,1,'Admin','2022-10-28 12:48:26','2022-10-28 12:48:26'),
	(2,1,'Broker','2022-10-30 20:15:01','2022-10-30 20:15:01'),
	(3,3,'Developer','2022-11-18 19:02:50','2022-11-18 19:02:50');

/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table rolesPermissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rolesPermissions`;

CREATE TABLE `rolesPermissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) DEFAULT NULL,
  `permissionId` int(11) DEFAULT NULL,
  `privilegeId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

LOCK TABLES `rolesPermissions` WRITE;
/*!40000 ALTER TABLE `rolesPermissions` DISABLE KEYS */;

INSERT INTO `rolesPermissions` (`id`, `roleId`, `permissionId`, `privilegeId`, `createdAt`, `updatedAt`)
VALUES
	(1,3,1,1,'2022-11-18 19:02:51','2022-11-18 19:02:51'),
	(2,3,1,2,'2022-11-18 19:02:51','2022-11-18 19:02:51'),
	(3,3,2,1,'2022-11-18 19:02:51','2022-11-18 19:02:51'),
	(4,3,3,2,'2022-11-18 19:02:51','2022-11-18 19:02:51'),
	(5,3,2,2,'2022-11-18 19:02:51','2022-11-18 19:02:51'),
	(6,3,11,2,'2022-11-18 19:02:51','2022-11-18 19:02:51'),
	(7,3,5,1,'2022-11-18 19:02:51','2022-11-18 19:02:51'),
	(8,3,5,2,'2022-11-18 19:02:51','2022-11-18 19:02:51'),
	(9,3,11,1,'2022-11-18 19:02:51','2022-11-18 19:02:51'),
	(10,3,12,2,'2022-11-18 19:02:51','2022-11-18 19:02:51'),
	(11,3,13,1,'2022-11-18 19:02:51','2022-11-18 19:02:51'),
	(12,3,13,2,'2022-11-18 19:02:51','2022-11-18 19:02:51');

/*!40000 ALTER TABLE `rolesPermissions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table SequelizeMeta
# ------------------------------------------------------------

DROP TABLE IF EXISTS `SequelizeMeta`;

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;

INSERT INTO `SequelizeMeta` (`name`)
VALUES
	('20220923080713-create-user.js'),
	('20220923113725-create-loads.js'),
	('20220923130545-create-customers.js'),
	('20220923134912-create-customers.js'),
	('20220926055928-create-loads.js'),
	('20220926094848-create-carrier.js'),
	('20220926111239-create-carrier-contact.js'),
	('20220926113002-create-carrier-address.js'),
	('20220927093115-create-shipper.js'),
	('20220927121214-create-trailers.js'),
	('20220928055657-create-permissions.js'),
	('20220928071312-create-privileges.js'),
	('20220928114609-create-roles.js'),
	('20220928125517-create-roles.js'),
	('20220928130213-create-roles-permissions.js'),
	('20220928141023-create-power-units.js'),
	('20220929080341-create-drivers.js'),
	('20220929143014-create-assets.js'),
	('20220930052007-create-users.js'),
	('20221004130406-create-trailers-log.js'),
	('20221005074726-create-power-unit-log.js'),
	('20221005104415-create-driver-pay-items.js'),
	('20221006070313-create-driver-violation.js'),
	('20221006130701-create-driver-violation.js'),
	('20221006132003-create-users.js'),
	('20221007133554-create-locations.js'),
	('20221007134807-create-location-contacts.js'),
	('20221012124136-create-driver-deductions.js'),
	('20221013135346-create-doc-management.js'),
	('20221017202624-create-assets.js'),
	('20221024125253-create-load-delievery.js'),
	('20221025080758-create-users.js'),
	('20221026125455-create-load-documents.js'),
	('20221027114240-create-load-delieveries.js'),
	('20221028094633-create-users.js'),
	('20221028104944-create-users.js'),
	('20221028110031-create-roles.js'),
	('20221028120249-create-roles.js'),
	('20221028120804-create-users.js'),
	('20221028121515-create-users.js'),
	('20221030195729-create-users.js'),
	('20221101072315-create-load-documents.js'),
	('20221101110127-create-load-documents.js'),
	('20221101111459-create-load-documents.js'),
	('20221114105106-create-user-documents.js');

/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table shippers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shippers`;

CREATE TABLE `shippers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `cellPhone` varchar(255) DEFAULT NULL,
  `entityType` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table signedDocuments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `signedDocuments`;

CREATE TABLE `signedDocuments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;

LOCK TABLES `signedDocuments` WRITE;
/*!40000 ALTER TABLE `signedDocuments` DISABLE KEYS */;

INSERT INTO `signedDocuments` (`id`, `role`, `file`, `createdAt`, `createdBy`, `updatedAt`)
VALUES
	(47,'Developer','/signPdf/admin/1669701891024.pdf','2022-11-29 06:04:51','1','2022-11-29 06:04:51'),
	(48,'Broker','/signPdf/admin/1669784533039.pdf','2022-11-30 05:02:13','1','2022-11-30 05:02:13'),
	(49,'Admin','/signPdf/1669785453993.pdf','2022-11-30 05:17:34','1','2022-11-30 05:17:34'),
	(50,'Developer','/signPdf/1669796070287.pdf','2022-11-30 08:14:30','1','2022-11-30 08:14:30'),
	(51,'Admin','/signPdf/1669796104065.pdf','2022-11-30 08:15:04','1','2022-11-30 08:15:04'),
	(52,'Admin','/signPdf/1669875188107.pdf','2022-12-01 06:13:08','1','2022-12-01 06:13:08');

/*!40000 ALTER TABLE `signedDocuments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table signedDocumentsUsers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `signedDocumentsUsers`;

CREATE TABLE `signedDocumentsUsers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `documentId` varchar(255) DEFAULT NULL,
  `signedBy` varchar(255) DEFAULT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

LOCK TABLES `signedDocumentsUsers` WRITE;
/*!40000 ALTER TABLE `signedDocumentsUsers` DISABLE KEYS */;

INSERT INTO `signedDocumentsUsers` (`id`, `documentId`, `signedBy`, `createdAt`, `updatedAt`, `file`)
VALUES
	(1,'51','1','2022-12-01 04:52:13','2022-12-01 04:52:13','/signPdf/1669870333873'),
	(4,'49','1','2022-12-01 05:49:10','2022-12-01 05:49:10','/signPdf/1669873750550.pdf'),
	(5,'52','1','2022-12-01 06:13:35','2022-12-01 06:13:35','/signPdf/1669875215786.pdf');

/*!40000 ALTER TABLE `signedDocumentsUsers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trailers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trailers`;

CREATE TABLE `trailers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `model` text DEFAULT NULL,
  `trailerNumber` text DEFAULT NULL,
  `trailerType` text DEFAULT NULL,
  `generatorInfo` text DEFAULT NULL,
  `licensePlate` text DEFAULT NULL,
  `modelYear` text DEFAULT NULL,
  `vehicleIdNumber` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `insuranceInformation` text DEFAULT NULL,
  `length` text DEFAULT NULL,
  `width` text DEFAULT NULL,
  `height` text DEFAULT NULL,
  `numberOfAxles` text DEFAULT NULL,
  `unloadedVehicleWeight` text DEFAULT NULL,
  `grossVehicleWeight` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `ownership` text DEFAULT NULL,
  `isPurchased` text DEFAULT NULL,
  `purchasedFrom` text DEFAULT NULL,
  `soldTo` text DEFAULT NULL,
  `purchasedDate` text DEFAULT NULL,
  `soldDate` text DEFAULT NULL,
  `purchasedPrice` text DEFAULT NULL,
  `soldPrice` text DEFAULT NULL,
  `factoryPrice` text DEFAULT NULL,
  `currentValue` text DEFAULT NULL,
  `licensePlateExpiration` text DEFAULT NULL,
  `DOTExpiration` text DEFAULT NULL,
  `insuranceExpiration` text DEFAULT NULL,
  `lastServiceDate` text DEFAULT NULL,
  `inspectionExpiration` text DEFAULT NULL,
  `registrationExpiration` text DEFAULT NULL,
  `estimatedOdometerReading` text DEFAULT NULL,
  `lastServiceMileage` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table trailersLogs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trailersLogs`;

CREATE TABLE `trailersLogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `mileage` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `maintenanceType` varchar(255) DEFAULT NULL,
  `maintenancePerformed` varchar(255) DEFAULT NULL,
  `performedBy` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `billTo` varchar(255) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table userDocuments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `userDocuments`;

CREATE TABLE `userDocuments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `senderId` int(11) DEFAULT NULL,
  `documentName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userRole` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `fullName`, `email`, `password`, `userRole`, `createdAt`, `updatedAt`)
VALUES
	(1,'Testing','test@darkarmystudios.com','$2a$10$dyK7EKK6Q51jJzfpXycaruoTLUeaV3xtX0QgMqE1j4yrTW0SPF9H.','1','2022-09-23 10:48:04','2022-09-23 10:48:04'),
	(2,'Abdul Rehman','abdulrehman.webs08@gmail.com','$2a$10$k1c3EFYviw/utUup3diDeuwPGu8V52IqNjWqcon3AiIJsCyTFGe8a','2','2022-10-30 20:17:00','2022-10-30 20:17:00'),
	(3,'Testing','test@darkarmystudios.com','$2a$10$dyK7EKK6Q51jJzfpXycaruoTLUeaV3xtX0QgMqE1j4yrTW0SPF9H.','0','2022-10-30 20:17:00','2022-10-30 20:17:00'),
	(4,'Abdul Rehman','abdulrehman47571@gmail.com','$2a$10$T8gbCkGHaQZgUw.gup/gAua1Mz.TDQ9Z1YLrOIFTH2IdKndmi/cxq','3','2022-11-18 19:04:49','2022-11-18 19:04:49'),
	(5,'Gohar Ashraf','gohar.ashraf78611@gmail.com','$2a$10$p/Y4xRUPe2HqR6kignOS6eHOY/A1meRUIKQGzoFTu7baQ0dhOyFwa','2','2022-11-28 08:42:50','2022-11-28 08:42:50');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `full_name`, `email`, `password`, `createdAt`, `updatedAt`)
VALUES
	(1,'Abdul Rehman','rehman@gmail.com','$2a$10$2E3lgkQUqYzB6PFLzJ7upeIYLNpM7ceKPq6MPclFDscIld8PZKJ2G','2022-09-23 10:48:04','2022-09-23 10:48:04'),
	(2,NULL,NULL,NULL,'2022-09-23 12:21:05','2022-09-23 12:21:05'),
	(3,NULL,NULL,NULL,'2022-09-23 12:29:02','2022-09-23 12:29:02'),
	(4,'sadsda','jhgjhg@ghj.sda','$2a$10$rW8bP887YtkUr1CMbqlKrugPWhuQQ91UpxVTdAbrsqeZzxQRpexfS','2022-09-27 07:08:46','2022-09-27 07:08:46'),
	(5,'Gohar Ashraf','gohar@gmail.com','$2a$10$IXH5LuZQCCqIAXULBRYFMeV2orjBFnMLx9QFSpB2wcuM30cwUxQuS','2022-09-27 07:09:02','2022-09-27 07:09:02'),
	(6,'Abdul Rehman','abdul@gmail.com','$2a$10$k4LXZ1y0rnOLE/XdXv6RH.Pn3T8ySU8I7I/HkkJiKHGotINl2XoIK','2022-10-18 08:43:54','2022-10-18 08:43:54'),
	(7,'Testing','test@darkarmystudios.com','$2a$10$dyK7EKK6Q51jJzfpXycaruoTLUeaV3xtX0QgMqE1j4yrTW0SPF9H.','2022-10-18 13:18:47','2022-10-18 13:18:47');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
