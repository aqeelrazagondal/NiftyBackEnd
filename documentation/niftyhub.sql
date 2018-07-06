-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 05, 2018 at 11:35 AM
-- Server version: 5.7.22-0ubuntu0.16.04.1
-- PHP Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `niftyhub`
--

-- --------------------------------------------------------

--
-- Table structure for table `product_views`
--

CREATE TABLE `product_views` (
  `id` int(11) NOT NULL,
  `views` int(11) NOT NULL,
  `fk_product_id` int(11) NOT NULL,
  `ip_address` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_views`
--

INSERT INTO `product_views` (`id`, `views`, `fk_product_id`, `ip_address`) VALUES
(75, 1, 121, '255255'),
(77, 1, 121, '255.255.255.255'),
(78, 1, 120, '255.255.255.255'),
(79, 1, 120, '255.205.255.255'),
(80, 1, 120, '255.205.255.251');

-- --------------------------------------------------------

--
-- Table structure for table `reseller_shipment_mode`
--

CREATE TABLE `reseller_shipment_mode` (
  `id` int(11) NOT NULL,
  `fk_shipment_mode_mode_id` int(11) NOT NULL,
  `shipment_rate` varchar(45) DEFAULT NULL,
  `fk_reseller_shop_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reseller_shipment_mode`
--

INSERT INTO `reseller_shipment_mode` (`id`, `fk_shipment_mode_mode_id`, `shipment_rate`, `fk_reseller_shop_id`) VALUES
(1, 2, '12', 57);

-- --------------------------------------------------------

--
-- Table structure for table `shipment_mode`
--

CREATE TABLE `shipment_mode` (
  `mode_id` int(11) NOT NULL,
  `mode_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shipment_mode`
--

INSERT INTO `shipment_mode` (`mode_id`, `mode_name`) VALUES
(2, 'first');

-- --------------------------------------------------------

--
-- Table structure for table `shop_views`
--

CREATE TABLE `shop_views` (
  `id` int(11) NOT NULL,
  `view_type` varchar(25) NOT NULL,
  `views` int(15) NOT NULL,
  `fk_shop_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shop_views`
--

INSERT INTO `shop_views` (`id`, `view_type`, `views`, `fk_shop_id`) VALUES
(1, 'facebook', 1, 54),
(2, 'google', 1, 54),
(4, 'profile', 1, 54);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin_comission`
--

CREATE TABLE `tbl_admin_comission` (
  `comission_id` int(11) NOT NULL,
  `flat_comission_rate` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_admin_comission`
--

INSERT INTO `tbl_admin_comission` (`comission_id`, `flat_comission_rate`) VALUES
(1, 12),
(2, 12),
(3, 12),
(4, 1211);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category_attributes`
--

CREATE TABLE `tbl_category_attributes` (
  `attributes_id` int(11) NOT NULL,
  `property_name` varchar(100) DEFAULT NULL,
  `fk_tbl_product_category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_category_attributes`
--

INSERT INTO `tbl_category_attributes` (`attributes_id`, `property_name`, `fk_tbl_product_category_id`) VALUES
(102, 'color', 1),
(106, 'color', 2),
(103, 'size', 1),
(107, 'size', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category_attribute_options`
--

CREATE TABLE `tbl_category_attribute_options` (
  `options_id` int(11) NOT NULL,
  `fk_tbl_category_attribute_id` int(11) NOT NULL,
  `option_value` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_category_attribute_options`
--

INSERT INTO `tbl_category_attribute_options` (`options_id`, `fk_tbl_category_attribute_id`, `option_value`) VALUES
(47, 102, 'A'),
(48, 103, '1'),
(49, 103, '2'),
(50, 102, 'B'),
(51, 106, 'A'),
(52, 106, 'B'),
(53, 107, '1'),
(54, 107, '2'),
(57, 102, 'C'),
(58, 102, 'C'),
(59, 102, 'C');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_commission_records`
--

CREATE TABLE `tbl_commission_records` (
  `commission_record_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `invoice_number` int(11) NOT NULL,
  `fk_vendor_id` int(11) NOT NULL,
  `fk_tbl_order_order_number` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `commission_deducted` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_commission_records`
--

INSERT INTO `tbl_commission_records` (`commission_record_id`, `date`, `invoice_number`, `fk_vendor_id`, `fk_tbl_order_order_number`, `amount`, `commission_deducted`) VALUES
(2, '0000-00-00', 1, 400, 23, 1, 1),
(3, '0000-00-00', 1, 400, 23, 1, 1),
(4, '0000-00-00', 1, 400, 23, 1, 1),
(5, '0000-00-00', 1, 400, 23, 1, 1),
(6, '2018-04-25', 1, 400, 23, 1, 1),
(7, '2018-04-25', 1, 400, 23, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_oders_details`
--

CREATE TABLE `tbl_oders_details` (
  `order_details_id` int(11) NOT NULL,
  `fk_product_id` int(11) DEFAULT NULL,
  `fk_reseller_shop_id` int(11) DEFAULT NULL,
  `product_price` bigint(20) DEFAULT NULL,
  `product_quantity` int(11) DEFAULT NULL,
  `fk_tbl_product_shpiment_mode` int(11) DEFAULT NULL,
  `product_shipment_charges` bigint(20) DEFAULT NULL,
  `product_design` varchar(45) DEFAULT NULL,
  `product_color` varchar(45) DEFAULT NULL,
  `product_width` varchar(45) DEFAULT NULL,
  `product_depth` varchar(45) DEFAULT NULL,
  `product_height` varchar(45) DEFAULT NULL,
  `product_delivery_status` enum('pending','in process','shipped','delivered') DEFAULT NULL,
  `product_delivery_date` date DEFAULT NULL,
  `fk_order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_oders_details`
--

INSERT INTO `tbl_oders_details` (`order_details_id`, `fk_product_id`, `fk_reseller_shop_id`, `product_price`, `product_quantity`, `fk_tbl_product_shpiment_mode`, `product_shipment_charges`, `product_design`, `product_color`, `product_width`, `product_depth`, `product_height`, `product_delivery_status`, `product_delivery_date`, `fk_order_id`) VALUES
(2, 91, 54, 12, 2, 1, 21, '13', 'adsf', '12', '12', '12', 'pending', '2018-04-11', 27),
(3, 92, 54, 121, 2, 1, 21, '13', 'adsf', '12', '12', '12', 'pending', '2018-04-11', 27),
(5, 91, 54, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', 'in process', '2018-04-30', 28),
(6, 92, 54, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 28),
(7, 93, 54, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 28),
(14, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 28),
(15, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 30),
(16, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 32),
(17, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 33),
(18, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 34),
(19, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 35),
(20, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 36),
(21, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 37),
(22, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 38),
(23, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 39),
(24, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 40),
(25, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 41),
(26, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 42),
(27, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 43),
(28, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 44),
(29, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 44),
(30, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 45),
(31, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 45),
(32, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 55),
(33, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 55),
(34, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 56),
(35, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 56),
(36, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 57),
(37, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 57),
(38, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 58),
(39, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 58),
(40, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 59),
(41, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 59),
(42, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 60),
(43, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 60),
(44, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 61),
(45, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 61),
(46, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 62),
(47, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 62),
(48, 95, 55, 100, 2, 1, NULL, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 63),
(49, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 63),
(50, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 64),
(51, 95, 55, 100, NULL, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 64),
(52, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 65),
(53, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 65),
(54, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 66),
(55, NULL, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 66),
(56, NULL, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 67),
(57, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 67),
(58, NULL, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 68),
(59, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 68),
(60, NULL, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 69),
(61, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 69),
(62, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 70),
(63, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 70),
(64, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 71),
(65, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 71),
(66, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 72),
(67, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 72),
(68, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 73),
(69, 95, NULL, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 73),
(70, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 74),
(71, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 74),
(72, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 75),
(73, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 75),
(74, 95, 55, 100, 2, 1, 22, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 76),
(75, 95, 55, 100, 2, 1, 21, '13', 'adsf', '12', '12', '12', '', '0000-00-00', 76);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_orders`
--

CREATE TABLE `tbl_orders` (
  `order_id` int(11) NOT NULL,
  `fk_tbl_user_id` int(11) DEFAULT NULL,
  `invoice_no` varchar(45) DEFAULT NULL,
  `fk_tbl_user_shipment_address` int(11) DEFAULT NULL,
  `invoice_amount` bigint(20) DEFAULT NULL,
  `shipment_amount` bigint(20) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `customer_ip` varchar(45) DEFAULT NULL,
  `order_status` varchar(22) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_orders`
--

INSERT INTO `tbl_orders` (`order_id`, `fk_tbl_user_id`, `invoice_no`, `fk_tbl_user_shipment_address`, `invoice_amount`, `shipment_amount`, `order_date`, `customer_ip`, `order_status`) VALUES
(23, 404, '1', 13, 1, 1, '0000-00-00 00:00:00', '1', 'in progress'),
(24, 417, '2', 12, 1, 1, '0000-00-00 00:00:00', '1', 'complete'),
(25, 417, '3', 12, 1, 1, '0000-00-00 00:00:00', '1', 'complete'),
(26, 417, '4', 12, 1, 1, '2018-04-04 15:44:24', '1', 'complete'),
(27, 417, '5', 12, 100, 1, '2018-04-04 15:50:42', '1', 'complete'),
(28, 417, '6', 12, 11111, 1, '2018-04-04 15:58:34', '1', 'complete'),
(29, 417, '7', 12, 1, 1, '2018-04-10 12:36:45', '1', ''),
(30, 417, '8', 12, 1, 1, '2018-04-16 09:53:13', '1', ''),
(31, 417, '9', 12, 1, 1, '2018-04-16 09:58:13', '1', ''),
(32, 417, '10', 12, 1, 1, '2018-04-16 10:02:00', '1', ''),
(33, 417, '10', 12, 1, 1, '2018-04-16 10:04:31', '1', ''),
(34, 417, '10', 12, 1, 1, '2018-04-16 10:05:01', '1', ''),
(35, 417, '10', 12, 1, 1, '2018-04-16 10:06:53', '1', ''),
(36, 417, '10', 12, 1, 1, '2018-04-16 10:07:31', '1', ''),
(37, 417, '10', 12, 1, 1, '2018-04-16 10:09:22', '1', ''),
(38, 417, '10', 12, 1, 1, '2018-04-16 10:10:46', '1', ''),
(39, 417, '10', 12, 1, 1, '2018-04-16 10:10:58', '1', ''),
(40, 417, '10', 12, 1, 1, '2018-04-16 10:11:32', '1', ''),
(41, 417, '10', 12, 1, 1, '2018-04-16 10:12:58', '1', ''),
(42, 417, '10', 12, 1, 1, '2018-04-16 10:14:09', '1', ''),
(43, 417, '10', 12, 1, 1, '2018-04-16 10:14:27', '1', ''),
(44, 417, '10', 12, 1, 1, '2018-04-16 10:14:51', '1', ''),
(45, 417, '10', 12, 1, 1, '2018-04-16 10:18:21', '1', ''),
(46, 417, '10', 12, 1, 1, '2018-04-16 10:38:02', '1', ''),
(47, 417, '10', 12, 1, 1, '2018-04-16 10:39:36', '1', ''),
(48, 417, '10', 12, 1, 1, '2018-04-16 10:40:23', '1', ''),
(49, 417, '10', 12, 1, 1, '2018-04-16 10:40:58', '1', ''),
(50, 417, '10', 12, 1, 1, '2018-04-16 10:41:28', '1', ''),
(51, 417, '10', 12, 1, 1, '2018-04-16 10:42:00', '1', ''),
(52, 417, '10', 12, 1, 1, '2018-04-16 10:43:07', '1', ''),
(53, 417, '10', 12, 1, 1, '2018-04-16 10:44:10', '1', ''),
(54, 417, '10', 12, 1, 1, '2018-04-16 10:44:35', '1', ''),
(55, 417, '10', 12, 1, 1, '2018-04-16 10:50:11', '1', ''),
(56, 417, '10', 12, 1, 1, '2018-04-16 10:52:13', '1', ''),
(57, 417, '10', 12, 1, 1, '2018-04-16 10:57:32', '1', ''),
(58, 417, '10', 12, 1, 1, '2018-04-16 10:59:32', '1', 'active'),
(59, 417, '10', 12, 1, 1, '2018-04-16 11:39:34', '1', 'delivered'),
(60, 417, '10', 12, 1, 1, '2018-04-21 22:49:11', '1', 'active'),
(61, 417, '10', 12, 1, 1, '2018-04-24 09:42:03', '1', 'active'),
(62, 417, '10', 12, 1, 1, '2018-04-25 12:02:21', '1', 'active'),
(63, 417, '10', 12, 1, 1, '2018-04-25 12:05:13', '1', 'active'),
(64, 417, '10', 12, 1, 1, '2018-04-25 12:05:27', '1', 'active'),
(65, 417, '10', 12, 1, 1, '2018-04-25 13:06:33', '1', 'active'),
(66, 417, '10', 12, 1, 1, '2018-04-25 13:06:43', '1', 'active'),
(67, 417, '10', 12, 1, 1, '2018-04-25 14:14:54', '1', 'active'),
(68, 417, '10', 12, 1, 1, '2018-04-25 14:15:51', '1', 'active'),
(69, 417, '10', 12, 1, 1, '2018-04-25 14:16:34', '1', 'active'),
(70, 417, '10', 12, 1, 1, '2018-04-25 14:20:13', '1', 'active'),
(71, 417, '10', 12, 1, 1, '2018-04-25 14:20:27', '1', 'active'),
(72, 417, '10', 12, 1, 1, '2018-04-25 14:26:08', '1', 'active'),
(73, 417, '10', 12, 1, 1, '2018-04-25 14:26:14', '1', 'active'),
(74, 417, '10', 12, 1, 1, '2018-04-25 14:27:00', '1', 'active'),
(75, 417, '10', 12, 1, 1, '2018-04-25 14:28:22', '1', 'active'),
(76, 417, '10', 12, 1, 1, '2018-04-25 14:29:21', '1', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_orders_details_track`
--

CREATE TABLE `tbl_orders_details_track` (
  `track_id` int(11) NOT NULL,
  `fk_tbl_orders_details_id` int(11) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  `status` enum('0','1') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment_method`
--

CREATE TABLE `tbl_payment_method` (
  `payment_method_id` int(11) NOT NULL,
  `payment_method_name` varchar(45) NOT NULL,
  `fk_shop_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_payment_method`
--

INSERT INTO `tbl_payment_method` (`payment_method_id`, `payment_method_name`, `fk_shop_id`) VALUES
(2, 'paypal', 54),
(7, 'paypal', 54),
(8, 'paypal', 54),
(9, 'paypal', 54),
(10, 'paypal', 54),
(11, 'paypal', 54),
(12, 'paypal', 54),
(13, 'paypal', 54),
(14, 'paypal', 54),
(15, 'paypal', 54);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

CREATE TABLE `tbl_products` (
  `product_id` int(11) NOT NULL,
  `product_title` varchar(100) DEFAULT NULL,
  `product_code` varchar(45) DEFAULT NULL,
  `product_description` varchar(145) DEFAULT NULL,
  `fk_tbl_product_cetegory_id` int(11) DEFAULT NULL,
  `product_price` varchar(45) DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `product_status` tinyint(1) DEFAULT NULL,
  `product_stock` bigint(20) DEFAULT NULL,
  `fk_tbl_reseller_shop_id` int(11) DEFAULT NULL,
  `width` int(50) DEFAULT NULL,
  `depth` int(50) DEFAULT NULL,
  `height` int(50) DEFAULT NULL,
  `fk_tbl_reseller_shipment_mode` int(11) DEFAULT NULL,
  `date_modified` date NOT NULL,
  `product_sold` int(22) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`product_id`, `product_title`, `product_code`, `product_description`, `fk_tbl_product_cetegory_id`, `product_price`, `date_created`, `product_status`, `product_stock`, `fk_tbl_reseller_shop_id`, `width`, `depth`, `height`, `fk_tbl_reseller_shipment_mode`, `date_modified`, `product_sold`) VALUES
(91, 'Product 1', '11', 'test', 2, '12', '2018-04-04', 1, 12, 54, 12, 12, 1221, NULL, '2018-04-06', 0),
(92, 'Product 2', '11', 'product_description', 2, '12', '2018-04-04', 1, 12, 54, 12, 1, 1, NULL, '0000-00-00', 0),
(93, 'first product', '11', 'never', 2, '12', '2018-04-04', 1, 12, 54, 12, 1, 1, NULL, '0000-00-00', 0),
(94, 'Product 3', '1', 'test', 1, '1', '2018-04-05', 1, 1, 54, 1, 3, 556, NULL, '0000-00-00', 0),
(95, 'Product 3', '11', 'product_description', 1, '12', '2018-04-06', 1, 12, 55, 12, 1, 1, NULL, '0000-00-00', 40),
(96, 'product_title', '11', 'product_description', 1, '12', '2018-04-06', 1, 12, 55, 12, 1, 1, NULL, '0000-00-00', 0),
(97, 'product_title', '11', 'product_description', 1, '12', '2018-04-06', 1, 12, 55, 12, 1, 1, NULL, '0000-00-00', 0),
(98, 'product_title', '11', 'product_description', NULL, '12', '2018-04-06', 1, 12, 55, 12, 1, 1, NULL, '0000-00-00', 0),
(99, 'product_title', '11', 'product_description', NULL, '12', '2018-04-06', 1, 12, 55, 12, 1, 1, NULL, '0000-00-00', 0),
(100, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(101, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(102, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(103, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(104, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(105, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(106, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(107, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(108, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(109, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(110, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(111, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(112, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(113, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(114, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(115, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(116, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(117, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(118, 'asdf', '11', 'test', NULL, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(119, 'asdf', '11', 'test', 10, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '0000-00-00', 0),
(120, 'Product 5', '11', 'test', 10, '12', '2018-04-06', 1, 12, 56, 12, 12, 1221, NULL, '0000-00-00', 15),
(121, 'asdf', '11', 'test', 10, '12', '2018-04-06', 1, 12, 55, 12, 12, 1221, NULL, '2018-04-17', 0),
(122, 'Product 4', '11', 'product_description', 10, '12', '2018-04-26', 1, 12, 55, 12, 1, 1, NULL, '2018-04-26', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_category`
--

CREATE TABLE `tbl_product_category` (
  `category_id` int(11) NOT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `parent_category_id` int(11) DEFAULT NULL,
  `category_title` varchar(45) DEFAULT NULL,
  `catgory_description` varchar(100) DEFAULT NULL,
  `category_image` varchar(100) DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_product_category`
--

INSERT INTO `tbl_product_category` (`category_id`, `slug`, `parent_category_id`, `category_title`, `catgory_description`, `category_image`, `date_created`, `status`) VALUES
(1, '1', NULL, 'DECOR - A', 'Parent Category', NULL, NULL, NULL),
(2, '', NULL, 'DECOR - B', 'Parent Category', NULL, '2018-04-17', 0),
(3, NULL, NULL, 'DECOR - C', 'Parent Category', NULL, '2018-04-24', 0),
(4, NULL, NULL, 'DECOR - D', 'Parent Category', NULL, '2018-04-25', 0),
(5, NULL, NULL, 'DECOR - E', 'Parent Category', NULL, '2018-04-25', 0),
(6, NULL, NULL, 'DECOR - F', 'Parent Category', NULL, '2018-04-25', 0),
(7, NULL, NULL, 'DECOR - G', 'Parent Category', NULL, '2018-04-25', 0),
(8, NULL, NULL, 'DECOR - H', 'Parent Category', NULL, '2018-04-25', 0),
(9, NULL, 1, 'a', 'asdf', NULL, '2018-04-25', 0),
(10, NULL, 1, 'a', 'asdf', NULL, '2018-04-25', 0),
(11, NULL, 1, 'a', 'asdf', NULL, '2018-04-25', 0),
(12, NULL, 1, 'a', 'asdf', NULL, '2018-04-26', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_images`
--

CREATE TABLE `tbl_product_images` (
  `image_id` int(11) NOT NULL,
  `fk_tbl_product_id` int(11) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_product_images`
--

INSERT INTO `tbl_product_images` (`image_id`, `fk_tbl_product_id`, `image`, `is_default`) VALUES
(173, 91, '69d721fc950a6e63a0acd10a4e8fb233', 0),
(175, 91, '074150c53e7e80d473a31850d15363e8', 0),
(176, 91, '67fbf09e1d50a149c4ceb03681650935', 0),
(177, 91, '279116b1e5c894b9eaebcbd690b61078', 0),
(178, 91, 'd2f019f00835099d2c843a505451c9f0', 1),
(179, 92, 'd2f019f00835099d2c843a505451c9f0', 1),
(180, 93, 'd2f019f00835099d2c843a505451c9f0', 1),
(181, 94, 'd2f019f00835099d2c843a505451c9f0', 1),
(182, 95, 'd2f019f00835099d2c843a505451c9f0', 1),
(183, 96, 'd2f019f00835099d2c843a505451c9f0', 1),
(184, 97, 'd2f019f00835099d2c843a505451c9f0', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_property`
--

CREATE TABLE `tbl_product_property` (
  `id` int(11) NOT NULL,
  `fk_tbl_product_id` int(11) DEFAULT NULL,
  `fk_tbl_category_attribute_option_ids` int(11) DEFAULT NULL,
  `fk_tbl_category_attribute_id` int(11) DEFAULT NULL,
  `visible_on_product` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_reviews`
--

CREATE TABLE `tbl_product_reviews` (
  `review_id` int(11) NOT NULL,
  `fk_tbl_product_id` int(11) DEFAULT NULL,
  `fk_tbl_user_id` int(11) DEFAULT NULL,
  `product_rating` enum('1','2','3','4','5') DEFAULT NULL,
  `review_title` varchar(45) DEFAULT NULL,
  `review_description` varchar(145) DEFAULT NULL,
  `review_name` varchar(45) DEFAULT NULL,
  `review_date` date DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_product_reviews`
--

INSERT INTO `tbl_product_reviews` (`review_id`, `fk_tbl_product_id`, `fk_tbl_user_id`, `product_rating`, `review_title`, `review_description`, `review_name`, `review_date`, `status`) VALUES
(1, 95, 417, '5', '1', '1', '1', '2018-04-13', 0),
(2, 95, 417, '5', '1', '1', '1', '2018-04-24', 1),
(3, 95, 417, '5', '1', '1', '1', '2018-04-25', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reseller_shop`
--

CREATE TABLE `tbl_reseller_shop` (
  `reseller_shop_id` int(11) NOT NULL,
  `fk_tbl_users_users_id` int(11) NOT NULL,
  `shop_name` varchar(100) NOT NULL,
  `short_description` varchar(100) DEFAULT NULL,
  `shop_address` varchar(200) NOT NULL,
  `shop_zipcode` varchar(45) DEFAULT NULL,
  `business_days` varchar(100) DEFAULT NULL,
  `about_shop` varchar(200) DEFAULT NULL,
  `lattitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `time_zone` varchar(20) NOT NULL,
  `opening_hours` time NOT NULL,
  `closing_hours` time NOT NULL,
  `working_days_from` enum('SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY') NOT NULL,
  `working_days_to` enum('SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY') NOT NULL,
  `shipping_type` varchar(12) NOT NULL,
  `shipping_cost` decimal(15,2) NOT NULL,
  `shipping_origin` varchar(12) NOT NULL,
  `proccess_time` int(11) NOT NULL,
  `free_shippment` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_reseller_shop`
--

INSERT INTO `tbl_reseller_shop` (`reseller_shop_id`, `fk_tbl_users_users_id`, `shop_name`, `short_description`, `shop_address`, `shop_zipcode`, `business_days`, `about_shop`, `lattitude`, `longitude`, `status`, `created_date`, `time_zone`, `opening_hours`, `closing_hours`, `working_days_from`, `working_days_to`, `shipping_type`, `shipping_cost`, `shipping_origin`, `proccess_time`, `free_shippment`) VALUES
(54, 400, '1as1', '1', 'asdf', 'asdf', 'asdf', 'asdf', '1.00000000', '1.00000000', 1, '2018-03-26', 'r', '13:00:00', '17:00:00', 'SUNDAY', 'FRIDAY', 'flat', '13.00', 'a', 2, 1),
(55, 401, 'first shop ever', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', '0.00000000', '0.00000000', 1, '2018-03-26', '', '00:00:00', '00:00:00', 'SUNDAY', 'SUNDAY', '', '0.00', '', 0, 0),
(56, 402, 'asdf1', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', '0.00000000', '0.00000000', 1, '2018-03-26', '', '00:00:00', '00:00:00', 'SUNDAY', 'SUNDAY', '', '0.00', '', 0, 0),
(57, 403, 'asdf21', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', '0.00000000', '0.00000000', 1, '2018-03-26', '', '00:00:00', '00:00:00', 'SUNDAY', 'SUNDAY', '', '0.00', '', 0, 0),
(58, 404, 'asdf2121212', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', '0.00000000', '0.00000000', 1, '2018-03-26', '', '00:00:00', '00:00:00', 'SUNDAY', 'SUNDAY', '', '0.00', '', 0, 0),
(59, 433, 'asdfasdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', '0.00000000', '0.00000000', 1, '2018-03-28', '', '00:00:00', '00:00:00', 'SUNDAY', 'SUNDAY', '', '0.00', '', 0, 0),
(60, 440, 'asdf1cae1', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', '1.00000000', '1.00000000', 1, '2018-03-28', '', '00:00:00', '00:00:00', 'SUNDAY', 'SUNDAY', '', '0.00', '', 0, 0),
(61, 437, 'asdf12zcvw', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', '1.00000000', '1.00000000', 1, '2018-03-28', '', '00:00:00', '00:00:00', 'SUNDAY', 'SUNDAY', '', '0.00', '', 0, 0),
(64, 441, 'as asdf1', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', '1.00000000', '1.00000000', 1, '2018-03-28', '', '00:00:00', '00:00:00', 'SUNDAY', 'SUNDAY', '', '0.00', '', 0, 0),
(65, 411, '1', '1', 'asdf', 'asdf', NULL, NULL, '1.00000000', '1.00000000', 1, '2018-03-29', 'r', '13:00:00', '17:00:00', 'SUNDAY', 'FRIDAY', '', '0.00', '', 0, 0),
(98, 417, '', NULL, 'asdf', 'asdf', NULL, NULL, '1.00000000', '1.00000000', 1, '2018-04-24', '', '00:00:00', '00:00:00', 'SUNDAY', 'SUNDAY', '', '0.00', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_shipping_weight_cost`
--

CREATE TABLE `tbl_shipping_weight_cost` (
  `shipping_weight_cost_id` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `additional_cost` int(11) NOT NULL,
  `fk_shop_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_shipping_weight_cost`
--

INSERT INTO `tbl_shipping_weight_cost` (`shipping_weight_cost_id`, `weight`, `additional_cost`, `fk_shop_id`) VALUES
(2, 12, 12, 54),
(3, 12, 12, 54),
(4, 12, 12, 54),
(5, 12, 12, 54),
(6, 12, 12, 54),
(7, 12, 12, 54),
(8, 12, 12, 54),
(9, 12, 12, 54),
(10, 12, 12, 54);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `users_id` int(11) NOT NULL,
  `users_username` varchar(100) DEFAULT NULL,
  `users_first_name` varchar(100) DEFAULT NULL,
  `users_last_name` varchar(100) DEFAULT NULL,
  `users_password` varchar(100) DEFAULT NULL,
  `users_gender` varchar(10) DEFAULT NULL,
  `user_country` varchar(100) DEFAULT NULL,
  `user_city` varchar(45) DEFAULT NULL,
  `ser_state` varchar(45) DEFAULT NULL,
  `user_zipcode` varchar(45) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_phone` varchar(45) DEFAULT NULL,
  `users_dob` date DEFAULT NULL,
  `users_about` varchar(230) DEFAULT NULL,
  `users_type` tinytext,
  `users_last_login_ip` varchar(100) DEFAULT NULL,
  `users_joined_date` date DEFAULT NULL,
  `users_last_login_datetime` datetime DEFAULT NULL,
  `users_status` tinyint(4) DEFAULT NULL,
  `have_shop` tinyint(1) DEFAULT NULL,
  `imagename` varchar(200) DEFAULT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `billing_address` varchar(245) DEFAULT NULL,
  `stripe_user_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`users_id`, `users_username`, `users_first_name`, `users_last_name`, `users_password`, `users_gender`, `user_country`, `user_city`, `ser_state`, `user_zipcode`, `user_email`, `user_phone`, `users_dob`, `users_about`, `users_type`, `users_last_login_ip`, `users_joined_date`, `users_last_login_datetime`, `users_status`, `have_shop`, `imagename`, `emailVerified`, `billing_address`, `stripe_user_id`) VALUES
(400, 'admin', '1', 'tasdfest', '$2a$04$8UtgBK4w/E9ozum37fTIv.OXtW53y8IDuZrd5z/NmR5ZQ6Ne0F6w6', 'male', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqilcs102@gmail.com', '03412323987', '2018-03-16', 'asdf', 'vendor', NULL, '2018-03-26', '2018-07-05 08:55:45', 0, 1, 'aa722c534d921b000325a16995480e5b', 1, 'asdf', ''),
(401, 'test11', '1', 'tasdfest', '$2a$10$RkLw1p.Q3zZ8zQy75ucd/eXFpHBDtrHpE1UFJ6nR925hK9i.uo0y6', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-26', '0000-00-00 00:00:00', 0, 1, '', 1, '', ''),
(402, 'test111', '1', 'tasdfest', '$2a$10$9TSPC8srJ3KHNZcuYBYxaehDZja3TGLQuMVLoFscw9N5rhERT8/8W', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-26', '0000-00-00 00:00:00', 0, 1, '', 1, '', ''),
(403, 'test1111', '1', 'tasdfest', '$2a$10$z81m4NC62.Vlj0ou49VGzu2Ock8KPNFvKem/JiWnVXemNztGDpoI2', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-26', '0000-00-00 00:00:00', 0, 1, '', 1, '', ''),
(404, '1', '1', 'tasdfest', '$2a$10$3buDDsZn/jdrReMGXv7FlOmQzFYi3wLXFuiO1F3ZfrsG5wXNKgKkG', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-26', '0000-00-00 00:00:00', 0, 1, '', 1, '', ''),
(406, 'admin1', '1', 'tasdfest', '$2a$10$bJEi5qkJg1r5gV5rjzKDZ.EF/zvG2U82lQoHhCyRd8LlNlMka7OAm', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-26', '0000-00-00 00:00:00', 1, NULL, '', 1, '', ''),
(408, '11', '1', 'tasdfest', '$2a$10$jkPRFg4cKMDcALyFQbOYneM7HLfWkjP3QAU0yovESa/I3V96BaNAu', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-26', NULL, 0, 1, '', 0, '', ''),
(410, '111', '1', 'tasdfest', '$2a$10$eywNxNMZhU0pynRg2Sft0OvldMiQMCMppGM4egMmTeiLi7uFXQc4u', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-27', NULL, 0, 1, '', 0, '', ''),
(411, '1111', '1', 'tasdfest', '$2a$10$1DQ6.hJgO6bLKK16mJkLauhhZiE0QRL9Aq4eHWGegSVocWB605JxG', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-27', NULL, 0, 1, '', 0, '', ''),
(413, '11111', '1', 'tasdfest', '$2a$10$9PDBE1CEKZdQZmrAHKXg2uud8P.SGr44v1n5A8jyJk6ClnJJ91mXm', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-27', NULL, 0, 1, '', 0, '', ''),
(414, '111z', '1', 'tasdfest', '$2a$10$G8r8diwisx2tRfdkNAaZM.xaYRyB5k.RpUPxvEefo5Q8rkpHdaoE6', 'male', 'pakistan', 'Hyderabad', 'a', 'a', 'aaqilc1s1012@gmail.com', 'a', '2018-03-16', 'a', 'vendor', NULL, '2018-03-27', '0000-00-00 00:00:00', 1, 1, '56b041d681a94f39553f975fc602ded3', 0, '', 'acct_1CIaKVKRW4kHXkvT'),
(415, '1xz', '1', 'tasdfest', '$2a$10$YM7rEVRo.sWyfp3o88/BcuyszheUByVqaZafdqTwFZ3l9PQazha.i', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-27', NULL, 0, 1, '', 1, '', ''),
(417, '1xz1', 'Muhammad', 'Aaqil', '$2a$10$sqO7ArUbHJ7yaumwFiCiwerlUfDuYXMySSqujzInMf/JVRUNavkLm', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqilcs1102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-27', '0000-00-00 00:00:00', 0, 0, '', 1, '', ''),
(418, '11cz', '1', 'tasdfest', '$2a$10$rgY.HAaRc.a0MICnm873kem5HGw9hA/avIqq8C0yl/KO3u8G3.ea.', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'vendor', NULL, '2018-03-27', '0000-00-00 00:00:00', 0, 1, '', 1, '', ''),
(420, '11cz1', '1', 'tasdfest', '$2a$10$KlCj0rm9yyByZUrLL30PruEmmkHll7xlgJFZa2syr/CT8wPx7/D4e', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-27', '0000-00-00 00:00:00', 0, 1, '', 1, '', ''),
(430, '11cz1qz', '1', 'tasdfest', '$2a$10$Bg0tryY4PhPxHUDPyfAOSO0UY41Sw0Xo2cCIOp8DEfUkzPGtUBCnC', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'vendor', NULL, '2018-03-28', '0000-00-00 00:00:00', 0, 1, '', 1, '', ''),
(431, '1zp1z', '1', 'tasdfest', '$2a$10$OXLEAq2trw2r7m8W8yZmv.HySj9mWI21gW.nZdnJMpG5iyM9aRZjm', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-28', '0000-00-00 00:00:00', 0, 1, '', 1, '', ''),
(433, '1zp1z1t', '1', 'tasdfest', '$2a$10$Yo72uVFdkUR7Vo/HyyH6Se3oYdn0Jh5b56ESEyytZQi4rnGcKHJ6G', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'vendor', NULL, '2018-03-28', '0000-00-00 00:00:00', 0, 1, '', 1, '', ''),
(435, '1zpp1t', '1', 'tasdfest', '$2a$10$Y07e21Y1Vn6cTfaJPw9mV.rqzBxYEwzNAYSMmCP8E2nVqp0uTmuni', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1c1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'vendor', NULL, '2018-03-28', NULL, 0, 1, '', 0, '', ''),
(436, '1zpp1t2', '1', 'tasdfest', '$2a$10$G96fl62dPKAe9cLkccrjV.Nv8a3yzdPut8qrorGLiE3orGZZ8NsUG', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqil1cs102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'vendor', NULL, '2018-03-28', NULL, 0, 1, '', 0, '', ''),
(437, 'k1l', '1', 'tasdfest', '$2a$10$iSw2zIJLjuAKEkV1LZdzWeTI9j9uwb/PtnATeQ3m4TJVfJ9Wbortq', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqilc1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'vendor', NULL, '2018-03-28', '0000-00-00 00:00:00', 0, 1, '', 1, '', ''),
(438, 'k11l', '1', 'tasdfest', '$2a$10$vfnrH9TmzGhLJJ/q74QAguMVPsEr9YoU0HOb4h9X4uGtDYj38br/K', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqi1lcs102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'vendor', NULL, '2018-03-28', NULL, 0, 1, '', 0, '', ''),
(440, 'k11zl', '1', 'tasdfest', '$2a$10$9ipCog3dOlqIKiDh65SKpOQAnNMl3KtapwN9u7JxMoINbeXzzONXi', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqilc1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-28', '0000-00-00 00:00:00', 0, 1, '', 1, '', ''),
(441, 'k11zl1', '1', 'tasdfest', '$2a$10$IgIoqgj1iglWENZ.dXHMxONdNMOhgFWzSHbeLsNN6slk2/Lfsk1gS', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqilc1s102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'customer', NULL, '2018-03-28', '0000-00-00 00:00:00', 0, 1, '', 1, '', ''),
(443, 'k11z1l1', '1', 'tasdfest', '$2a$10$UE3FsJFIgSslsnxpK0kXJejAhYauD/oNswIOpixLgIKFWzfHud2Qm', 'tesrt', 'asdasdf', 'tasdfesrt', 'tesrt', '123', 'aaqi1lcs102@gmail.com', '03412323987', '0000-00-00', 'asdf', 'vendor', NULL, '2018-03-28', '2018-03-30 15:16:22', 0, 1, '', 1, '', ''),
(445, 'k11zx', NULL, NULL, '$2a$10$iLiuo7WXymhV6dxh2.dsCeZYF88zw3zuLqCm3Eb0fglBzJxLPagbK', NULL, NULL, NULL, NULL, NULL, 'test@gmail.com', NULL, NULL, NULL, NULL, NULL, '2018-03-29', NULL, 1, NULL, '', 0, '', ''),
(446, 'kopzx', NULL, NULL, '$2a$10$CQby0kRRHs5vHgBywWpa4OF1iMOOUZBfAdVSflVpmOy/kBH7jmwDa', NULL, NULL, NULL, NULL, NULL, 'test@gmail.com', NULL, NULL, NULL, NULL, NULL, '2018-03-29', NULL, 1, NULL, '', 0, '', ''),
(451, '', NULL, NULL, NULL, 'male', 'pakistan', 'Hyderabad', 'a', 'a', NULL, 'a', '2018-03-16', 'a', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '', ''),
(453, 'kopzx1', NULL, NULL, '$2a$10$qlkI3hLtPAHggb3CWzfo0uJdC5HK2YJS.DHP3CUOLRM595E3MGh3S', 'female', 'pakistan', 'Hyderabad', 'a', 'a', 'test@gmail.com', 'a', '2018-03-16', 'a', NULL, NULL, '2018-03-29', NULL, 1, NULL, '', 0, '', ''),
(454, 'kocpzx', NULL, NULL, '$2a$10$kFDmj6hziC3ywgwpyVTEju/TdwLkrJP2r3vixdSfiylG5EOlpJKNC', NULL, NULL, NULL, NULL, NULL, 'aaqilcs102@gmail.com', NULL, NULL, NULL, NULL, NULL, '2018-03-29', NULL, 1, NULL, '', 1, '', ''),
(456, 'koczx', NULL, NULL, '$2a$10$D/y81AE/gQ1cWuHdJPdno.2pWs3pzKHRp2jwcqZi15FESpM8ISLhK', NULL, NULL, NULL, NULL, NULL, 'aaqilcs102@gmail.com', NULL, NULL, NULL, NULL, NULL, '2018-04-02', '2018-04-02 15:47:41', 1, NULL, '', 0, '', ''),
(457, 'k1oczx', NULL, NULL, '$2a$10$z7GgJ/0YeSVmhGUHQ1WXfuAlyOTDCWcTeWzO7DGjRtAmtuWcN6qVa', NULL, NULL, NULL, NULL, NULL, 'aaqilcs102@gmail.com', NULL, NULL, NULL, NULL, NULL, '2018-04-02', NULL, 1, NULL, '', 0, '', ''),
(458, 'k1ocz1x', NULL, NULL, '$2a$10$UUrboyZXBZ7EY9NUHTSQ0etzCSAaDKpTx5jW54kc7H0tYIa.JbZaq', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, NULL, NULL, '2018-04-02', NULL, 1, NULL, '', 0, '', ''),
(460, 'k1o1cz1x', NULL, NULL, '$2a$10$D4Gv1y.hdBwenx28RhE5/.bUxXN0PnZ16rlt15AWeN4gq9FAlNm72', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, NULL, NULL, '2018-04-02', '2018-04-03 13:09:59', 1, NULL, '', 0, '', ''),
(461, 'k1o1czc1x', NULL, NULL, '$2a$10$CBPholflH56vniOEQG.dsOsKqpCBrVnIciOg8si5nLN8f1XRz08Ee', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, NULL, NULL, '2018-04-02', '2018-04-02 16:08:16', 1, NULL, '', 0, '', ''),
(462, 'kmx', NULL, NULL, '$2a$10$BDb0R8I.IbsZLBo9XD3pXu8lJmcpdivCf.kAq7pB6vZTKl48RfXIa', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, NULL, NULL, '2018-04-02', '2018-04-02 16:11:29', 1, NULL, '', 0, '', ''),
(464, 'kmxx', NULL, NULL, '$2a$10$.KFaqEhlR7RUsmkCrixWtu5SaZEXdsoSTLdKWewyOB2y96T0Su11q', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, NULL, NULL, '2018-04-02', '2018-04-02 16:13:15', 1, NULL, '', 0, '', ''),
(466, 'kczmxx', NULL, NULL, '$2a$10$mpnub7zczQ6UwbwRc3P5feJEaupWmnfWDf5ZNKq2q6laMeRe1kdVe', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, NULL, NULL, '2018-04-03', '2018-04-03 12:42:49', 1, NULL, '', 0, '', ''),
(467, 'kzxczmx', NULL, NULL, '$2a$10$KWOrodOQHLYZBxMDCoVa1OXIRL.oWOXAAtvgJPrVVogdzUYW8nZUe', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, NULL, NULL, '2018-04-03', '2018-04-03 14:11:50', 1, NULL, '', 0, '', ''),
(469, 'kzxcczmx', NULL, NULL, '$2a$10$T3PRAGfl/sZoyN7R4h9QMuRsYu3vna8dnXan0VxXkreiH4Dpb.mdK', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-04-03', '2018-04-03 14:14:38', 1, NULL, '', 0, '', ''),
(470, 'kmxasdf', NULL, NULL, '$2a$10$3e72fzted9917ZXuopjZjOtyW.Au5h1iPApxAeY/..BkxL4xZtwqG', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-04-05', '2018-04-05 15:47:21', 1, NULL, '', 0, '', ''),
(471, 'kmcqx', NULL, NULL, '$2a$10$5YGaNAJFoQT7Loebn7lwVeZsKE/WaIvE0MYo2bXTXht.3TIYVdjou', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-04-09', NULL, 1, NULL, '', 0, '', ''),
(473, 'kmb2cqx', NULL, NULL, '$2a$10$mSFn3FCUtvL5wZAsigJ0iureWc4XK3LX15D57fQWlxRSUGTvmoedG', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-04-09', NULL, 1, NULL, '', 0, '', ''),
(474, 'kmb2asdfcqx', NULL, NULL, '$2a$10$.7LKV6khxflnzrQ/ckqiVu8PLYzfVDutIPwq8p9hoBk6o/JDrbS06', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-04-09', '2018-04-09 16:23:21', 1, NULL, '', 0, '', ''),
(541, NULL, 'Muhammad', 'Aaqil', NULL, NULL, NULL, NULL, NULL, NULL, 'aaqilcs102@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '', ''),
(542, NULL, 'Aaqil', 'Nizamani', NULL, NULL, NULL, NULL, NULL, NULL, 'muhammad.aaqil@carinotech.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '', ''),
(543, NULL, 'Aaqil', 'Nizamani', NULL, NULL, NULL, NULL, NULL, NULL, 'muhammad.aaqil@carinotech.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '', ''),
(544, 'kmtetsx', NULL, NULL, '$2a$10$BytTJ7QUEJl0AQSzGkV05eiy5JYyA25trz4FggHA5ZYb2fwf1OXQO', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-04-12', '2018-04-12 14:27:12', 1, NULL, '', 0, '', ''),
(545, NULL, 'Aaqil', 'Nizamani', NULL, NULL, NULL, NULL, NULL, NULL, 'muhammad.aaqil@carinotech.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '', ''),
(546, NULL, 'Aaqil', 'Nizamani', NULL, NULL, NULL, NULL, NULL, NULL, 'muhammad.aaqil@carinotech.com', NULL, NULL, NULL, NULL, NULL, '2018-04-12', NULL, NULL, NULL, '', NULL, '', ''),
(547, 'nifty', 'Dexter', 'Morgan', '912EC803B2CE49E4A541068D495AB570', NULL, NULL, NULL, NULL, NULL, 'aaqilcs102@gmail.com', NULL, NULL, NULL, NULL, NULL, '2018-04-12', NULL, NULL, NULL, '', NULL, '', ''),
(548, NULL, 'Muhammad', 'Aaqil', NULL, NULL, NULL, NULL, NULL, NULL, 'aaqilcs102@gmail.com', NULL, NULL, NULL, NULL, NULL, '2018-04-12', NULL, NULL, NULL, '', NULL, '', ''),
(549, 'kmtetsx1', NULL, NULL, '$2a$10$.SUZlo9Aaj2qclK3W6zcb.A.tByXFHXkEYcJTZF3gWSYCWrgatKH.', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'customer', NULL, '2018-04-12', '2018-04-16 16:31:22', 1, NULL, '', 0, '', ''),
(550, 'kmtzetsx', NULL, NULL, '$2a$10$i7IAH1pLJPOOKPy2nQsZsOOEBkc1G.ZqDHiMeytWrsamTSogxaOTK', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-04-13', '2018-04-13 12:03:44', 1, NULL, '', 0, '', ''),
(552, 'kmt222etsx1', NULL, NULL, '$2a$10$mX7Iwf9FOPOZ/pxwfyIwpu48HMtGyaTKP9S3ZVXpok/H/U/QvNrQ6', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'customer', NULL, '2018-04-16', '2018-04-16 16:32:22', 1, NULL, '', 0, '', ''),
(553, 'kmtasdf222etsx1', NULL, NULL, '$2a$10$CqCGnhRvy10.b/dtyKt56url78x7wjorTeQ.arrQb2k1QCNzlVRdK', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-04-16', '2018-04-16 16:33:13', 1, NULL, '', 0, '', ''),
(554, 'kmtasdf222etasdfsx1', NULL, NULL, '$2a$10$BtQTv0jhMUgko5x4E74tAOdW5fh0DxW.LG85Pf5SVbxl61a47ZwO2', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'admin1', NULL, '2018-04-17', '2018-07-05 09:03:36', 1, NULL, '', 1, '', ''),
(556, 'kmtasdf222etasd1fsx1', NULL, NULL, '$2a$10$9hNVk7mbA4Aeufc9ox4.ROkiYWBIkwtNW9ujG0YLieSspl3MM87WO', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'admin1', NULL, '2018-04-17', NULL, 1, NULL, '', 1, '', ''),
(558, 'kmtetsx12121', NULL, NULL, '$2a$10$atTW/U9dhkfkb0wScPmO3.F1f7M5HW.9FF7QU4Rs8ZYGOZ2TlJshu', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'customer', NULL, '2018-04-24', '2018-04-24 10:20:01', 1, NULL, '', 0, '', ''),
(559, 'kmvx', NULL, NULL, '$2a$10$IxAL0ie42s7.24MihU/1G.unxsOnTStW589RwRZ7H77u/pyYZ6/cy', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, '1', NULL, '2018-04-25', NULL, 1, NULL, '', 1, '', ''),
(561, 'kmtet1sx', NULL, NULL, '$2a$10$iao7NAzOQHVTZ04gr6WC3OcVph09UQYOdlvuZen59dxKCr4wITui.', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-04-25', NULL, 1, NULL, '', 0, '', ''),
(562, 'tes', NULL, NULL, '$2a$10$NFKiteak7KsgSLBJmkRogOKTIvr20oq2yuzTN.SXEfXBey9Am7uKy', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'admin', NULL, '2018-04-25', '2018-04-25 17:09:21', 1, NULL, '', 1, '', ''),
(564, 'kmtasdfetsx', NULL, NULL, '$2a$10$zjCLrbUHhgis8oqQ9Fs7WO8Uwz31Rt2JhJp4NAmZL5y80uXkwtIaG', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-04-25', '2018-04-25 17:09:55', 1, NULL, '', 0, '', ''),
(565, 'test', NULL, NULL, '912EC803B2CE49E4A541068D495AB570', NULL, NULL, NULL, NULL, NULL, 'test@a.com', NULL, NULL, NULL, 'vendor', NULL, '2018-04-26', NULL, 1, NULL, '', 0, '', ''),
(573, 'dexter11222', NULL, NULL, '$2a$10$Q633iRzdCJak/SY97bGeJes2iddYdPPkK7pBUb15xQf/8CbUqATT.', NULL, NULL, NULL, NULL, NULL, 'osamaabid03@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-06-12', NULL, 1, NULL, NULL, 0, NULL, NULL),
(574, 'dexter1133', NULL, NULL, '$2a$10$Itim49r/hmTyGvl1zzo.R.LHsH5RQBx7OsBU1L4pIDQ6BVWwhDBxW', NULL, NULL, NULL, NULL, NULL, 'osamaabid03@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-06-12', NULL, 1, NULL, NULL, 1, NULL, NULL),
(576, 'nifty1', NULL, NULL, '$2a$10$vyCP2OwXcmRrqqkT8Hivqerkg206BnOlpU5BMzkHOB0hT2NYz41cO', NULL, NULL, NULL, NULL, NULL, 'osamaabid03@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-06-13', NULL, 1, NULL, NULL, 0, NULL, NULL),
(578, 'nifty12', NULL, NULL, '$2a$10$lJ3FCSCFjA4bifQyxCmT4OOps/xXxBQr0uNThIOJUaQyTUUXnQTE6', NULL, NULL, NULL, NULL, NULL, 'osamaabid03@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-06-13', NULL, 1, NULL, NULL, 0, NULL, NULL),
(579, 'nifty122', NULL, NULL, '$2a$10$Ah0UjQsIt6q02UPniHvLHOykvNYChpa7qbIf2eDuaRRhgKABNroOO', NULL, NULL, NULL, NULL, NULL, 'osamaabid03@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-06-13', NULL, 1, NULL, NULL, 0, NULL, NULL),
(580, 'osama', NULL, NULL, '$2a$10$yqrSq8sj9crd7Biins2yUe24YpcUzlmcaoI1/erB0U/SEc/LOQxsm', NULL, NULL, NULL, NULL, NULL, 'osamaabid03@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-06-13', '2018-06-13 11:19:24', 1, NULL, NULL, 0, NULL, NULL),
(582, 'km14tetsx', NULL, NULL, '$2a$10$9wtBBR8TxDU8qEB10GlD1OVYpQsZzNO9IVwHhpAxkry7MIJL4MG5W', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs102@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-06-28', '2018-06-28 13:10:41', 1, NULL, NULL, 0, NULL, NULL),
(583, 'km1tetsx', NULL, NULL, '$2a$10$TBUVa8GeOsqJ8cFofi/VrOj5d8ziMAU40uRzRfO6PJ2gYv47MbRzy', NULL, NULL, NULL, NULL, NULL, 'aa1qilcs1102@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-07-02', NULL, 1, NULL, NULL, 0, NULL, NULL),
(584, 'hamza', NULL, NULL, '$2a$10$lBdkP9ehhvPiGRGmjNMLYeGMdcjx23kiXeQOxArJnj6/eg0E4bGAy', NULL, NULL, NULL, NULL, NULL, 'hamza@login.com', NULL, NULL, NULL, 'vendor', NULL, '2018-07-02', NULL, 1, NULL, NULL, 0, NULL, NULL),
(586, 'Testing123', NULL, NULL, '$2a$10$EfEZg85lpEuYZgmQFNChWO3PbFIKJtiqzrvM6JmuKBY2oKaGp2wfq', NULL, NULL, NULL, NULL, NULL, 'server@gmail.com', NULL, NULL, NULL, 'vendor', NULL, '2018-07-02', NULL, 1, NULL, NULL, 0, NULL, NULL),
(587, 'Test3214', NULL, NULL, '$2a$10$n1e7yBWcwQesNVAS0EQxRObUNc1a4mIgg3vCVcLALlR6/K2bnlr0K', NULL, NULL, NULL, NULL, NULL, 'Testing@abcd.com', NULL, NULL, NULL, 'vendor', NULL, '2018-07-02', NULL, 1, NULL, NULL, 0, NULL, NULL),
(588, 'T123Test', NULL, NULL, '$2a$10$BK0paOZw6EyLP0ePDBdsfOQuhTAM6MFZbV07lFaBT/yFzVYWbphXy', NULL, NULL, NULL, NULL, NULL, 'user@login.com', NULL, NULL, NULL, 'vendor', NULL, '2018-07-02', NULL, 1, NULL, NULL, 0, NULL, NULL),
(589, 'TestingNew', NULL, NULL, '$2a$10$qWiTWl2GAkB94opa8NsKKOiOkiFx3mMnzRPTkJjHrpy0ERaKmxyQa', NULL, NULL, NULL, NULL, NULL, 'New@user.com', NULL, NULL, NULL, 'vendor', NULL, '2018-07-02', NULL, 1, NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users_fav_products`
--

CREATE TABLE `tbl_users_fav_products` (
  `fav_id` int(11) NOT NULL,
  `fk_tbl_users_users_id` int(11) DEFAULT NULL,
  `fk_tbl_products_product_id` int(11) DEFAULT NULL,
  `date_created` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users_fav_products`
--

INSERT INTO `tbl_users_fav_products` (`fav_id`, `fk_tbl_users_users_id`, `fk_tbl_products_product_id`, `date_created`) VALUES
(4, 400, 91, '2018-04-22'),
(8, 401, 91, '2018-04-22');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users_fav_shops`
--

CREATE TABLE `tbl_users_fav_shops` (
  `id` int(11) NOT NULL,
  `fk_tbl_users_users_id` int(11) NOT NULL,
  `fk_tbl_shop_shop_id` int(11) NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users_shipment_addresses`
--

CREATE TABLE `tbl_users_shipment_addresses` (
  `addresses_id` int(11) NOT NULL,
  `fk_tbl_users_users_id` int(11) NOT NULL,
  `user_address` varchar(200) DEFAULT NULL,
  `user_country` varchar(45) DEFAULT NULL,
  `user_state` varchar(45) DEFAULT NULL,
  `user_city` varchar(45) DEFAULT NULL,
  `user_zipcode` varchar(10) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `user_address2` varchar(200) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users_shipment_addresses`
--

INSERT INTO `tbl_users_shipment_addresses` (`addresses_id`, `fk_tbl_users_users_id`, `user_address`, `user_country`, `user_state`, `user_city`, `user_zipcode`, `status`, `user_address2`, `first_name`, `last_name`, `company_name`, `email`, `phone`) VALUES
(12, 404, 'aasdfa', 'aaasdf', 'asdf', 'aaasdf', 'aaasdf', 1, '', '', '', NULL, '', ''),
(13, 404, 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 1, '', '', '', NULL, '', ''),
(27, 543, 'aasdfa', 'aaasdf', NULL, 'aa', 'aaasdf', 0, 'asdf', 'asdf', 'asdf', 'asdf', '', 'asdf'),
(28, 543, 'aasdfa', 'aaasdf', NULL, 'aa', 'aaasdf', 0, 'asdf', 'asdf', 'asdf', 'asdf', '', 'asdf'),
(29, 543, 'aasdfa', 'aaasdf', 'asdf', 'aa', 'aaasdf', 0, 'asdf', 'asdf', 'asdf', 'asdf', '', 'asdf'),
(30, 543, 'aasdfa', 'aaasdf', 'asdf', 'aa', 'aaasdf', 0, 'asdf', 'asdf', 'asdf', '', '', 'asdf'),
(31, 543, 'aasdfa', 'aaasdf', 'asdf', 'aa', 'aaasdf', 0, '', 'asdf', 'asdf', '', '', 'asdf'),
(32, 543, 'aasdfa', 'aaasdf', 'asdf', 'aa', 'aaasdf', 0, 'asdf', 'asdf', 'asdf', 'sadf', '', 'asdf'),
(36, 400, 'aasdfa', 'aaasdf', 'asdf', 'aa', 'aaasdf', 0, 'asdf', 'asdf', 'asdf', 'asdf', '', 'asdf'),
(37, 400, 'aasdfa', 'aaasdf', 'asdf', 'aa', 'aaasdf', 0, 'asdf', 'asdf', 'asdf', '', '', 'asdf'),
(38, 400, 'aasdfa', 'aaasdf', 'asdf', 'aa', 'aaasdf', 0, '', 'asdf', 'asdf', 'asdf', '', 'asdf');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_verification_token`
--

CREATE TABLE `tbl_verification_token` (
  `token_id` int(11) NOT NULL,
  `fk_users_id` int(11) NOT NULL,
  `token` varchar(45) NOT NULL,
  `token_for` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_verification_token`
--

INSERT INTO `tbl_verification_token` (`token_id`, `fk_users_id`, `token`, `token_for`) VALUES
(1, 400, '93f7be6f29568f24446c0a7aabe9b73b1afa504a', 'emailVerification'),
(2, 401, '6a41478ee1dfd7f1e393c0866f861b6e6e3c5537', 'emailVerification'),
(3, 402, '148ae3f59d3529d91ec6b28e0d2d7658a5c0bc3e', 'emailVerification'),
(4, 403, 'fe75e2e4d06d9bf340a136a114707155ff692e09', 'emailVerification'),
(5, 404, '4313bc77bfae8c5e910198ad9ff3dd06c3a11b93', 'emailVerification'),
(6, 408, '6a30f8173341500af79c78831eaae42d58463bc9', 'emailVerification'),
(7, 410, '08a4f50519362248f0689647180a4d94df634d5a', 'emailVerification'),
(8, 411, '65163fd9b2d1df987c93baf1d09fbe85a0f9d51d', 'emailVerification'),
(9, 413, '7f7939aa6e2cd82d2546671ff5b256528548b036', 'emailVerification'),
(10, 414, '708494f0682577c65f155c52f62f1e6a1087b987', 'emailVerification'),
(12, 415, 'a1b2b6bb6ff7cc8359ab5829091e9bdf40c8d969', 'emailVerification'),
(17, 418, 'ed3f00a903ae83ca3df47d191da6ad2ac6e26f2c', 'emailVerification'),
(18, 420, '830e25068cd38b6c704f7977108744aa2137af70', 'emailVerification'),
(19, 430, '8b45ab8c712ca10f896b738e1d6058559696cc8c', 'emailVerification'),
(20, 431, '383e12bef17f1a49936858bb83fff2a7f20dabe6', 'emailVerification'),
(28, 441, '67712573c39ef7390294e09ec8452ebefda89ca1', 'emailVerification'),
(29, 443, 'dd6622b6432af3ff46c6fc949cb5f99663a8784a', 'emailVerification'),
(30, 445, '39112a1b40156d223b0267fb9c0884b2de9dae4f', 'emailVerification'),
(31, 446, '022712b75443f6e92ab88d1d684666c881fdac58', 'emailVerification'),
(34, 446, '36710561ae59823906738be57500b7b3b8222949', 'emailVerification'),
(36, 457, '0a1e1564569426d1c805d08885b5257c28ba4b94', 'emailVerification'),
(37, 458, '22633cf6f8536f8b58432d530a7668175d6416da', 'emailVerification'),
(38, 460, '0b2e6b63e2abfab895c679ee1ec6131ffce9f876', 'emailVerification'),
(39, 461, '4c043384775cd4630a154b76b904d3d7ac641c4d', 'emailVerification'),
(40, 462, 'bfa842207bdab88b54d6d025e1f3f3a7b6f0987e', 'emailVerification'),
(41, 466, '8f184215e44eab0437566c62a1dcb6bca4b4858d', 'emailVerification'),
(42, 467, '1b33533014cdffdb8663f82ad018ec20f21f540b', 'emailVerification'),
(43, 469, '565fc33a0ad0377677294cdfa7cce81af1433379', 'emailVerification'),
(45, 474, '9b87d68e0a07548486c99233af254e5d4bd23a77', 'emailVerification'),
(46, 544, '60ea1856ba8b0bfb8e2051571e859a8115ab7466', 'emailVerification'),
(47, 549, '3e7104ca05c14c7a01e433c661f64ff3d585a74b', 'emailVerification'),
(48, 550, '2b22b8637034301abbb365d72485f1b50d2ad10a', 'emailVerification'),
(50, 558, '2c1f77cabf9fe378b20b7a940735194bdb158ea8', 'emailVerification'),
(51, 457, '00d286cdf62b80e1f351f8a4ae55fd196b199a84', 'emailVerification'),
(52, 561, 'de04c3d36c2ee385bf3e7dfca0962afd176960bf', 'emailVerification'),
(53, 564, 'f6f216a5fcf179d1db325d3c8146f57b77c5e9d0', 'emailVerification'),
(54, 565, '06572bbcbec9371876e5352338e6256a0a9a6c6a', 'emailVerification'),
(56, 573, '0ea018bb2d20eb44f5202b1eac47773df5d2facd', 'emailVerification'),
(57, 574, 'bafc7dc36453740cf6dcd5b4dad43f2ce4907c28', 'emailVerification');

-- --------------------------------------------------------

--
-- Table structure for table `user_external_login`
--

CREATE TABLE `user_external_login` (
  `id` varchar(255) NOT NULL,
  `fk_users_id` int(11) NOT NULL,
  `token` varchar(225) NOT NULL,
  `authentication_provider` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_external_login`
--

INSERT INTO `user_external_login` (`id`, `fk_users_id`, `token`, `authentication_provider`) VALUES
('114821135119790297902', 548, 'ya29.GlubBXZqwJpElnvbnsi-RVnwaHC72xLAc3s5FLs5xwIvLQZudK5n7XCL4JEtSCBQRSJo9iBW5-9uVb8um8Xh-HpwRCThOu0RtdtkAXXKa_RELTPUmgg1DB8gMGIZ', 'google'),
('120314612154397', 546, 'EAACVEgS1ZCyQBACqrs9cCsEtsaGKZARlfIkODzOgHilfIfB7NwutrZAZCc5e2MYZCzRm8FqlBbXBjBBnpcZCPZBZCjFIprlEBwK4mFbZB9Etanxb09ULn262EhT34O79uwqraoZCX9vfTZChtfXnPmC3DaHZB9O8KfKB1NIhXYRyEIsCfzFvCxniingo', 'facebook');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product_views`
--
ALTER TABLE `product_views`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fk_product_id` (`fk_product_id`,`ip_address`),
  ADD KEY `fk_product_idx` (`fk_product_id`) USING BTREE;

--
-- Indexes for table `reseller_shipment_mode`
--
ALTER TABLE `reseller_shipment_mode`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mode_id_idx` (`fk_shipment_mode_mode_id`),
  ADD KEY `fk_reseller_shop_id_idx` (`fk_reseller_shop_id`);

--
-- Indexes for table `shipment_mode`
--
ALTER TABLE `shipment_mode`
  ADD PRIMARY KEY (`mode_id`);

--
-- Indexes for table `shop_views`
--
ALTER TABLE `shop_views`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `view_type` (`view_type`,`fk_shop_id`);

--
-- Indexes for table `tbl_admin_comission`
--
ALTER TABLE `tbl_admin_comission`
  ADD PRIMARY KEY (`comission_id`);

--
-- Indexes for table `tbl_category_attributes`
--
ALTER TABLE `tbl_category_attributes`
  ADD PRIMARY KEY (`attributes_id`),
  ADD UNIQUE KEY `property_name` (`property_name`,`fk_tbl_product_category_id`),
  ADD KEY `fk_product_cat_idx` (`fk_tbl_product_category_id`);

--
-- Indexes for table `tbl_category_attribute_options`
--
ALTER TABLE `tbl_category_attribute_options`
  ADD PRIMARY KEY (`options_id`),
  ADD KEY `fk_category_attr_options_ids` (`options_id`),
  ADD KEY `fk_tb_category_attributes_id` (`fk_tbl_category_attribute_id`);

--
-- Indexes for table `tbl_commission_records`
--
ALTER TABLE `tbl_commission_records`
  ADD PRIMARY KEY (`commission_record_id`),
  ADD KEY `fk_tbl_order_order_ID` (`fk_tbl_order_order_number`),
  ADD KEY `fk_commission_user_idx` (`commission_record_id`),
  ADD KEY `fk_commission_user_id` (`fk_vendor_id`);

--
-- Indexes for table `tbl_oders_details`
--
ALTER TABLE `tbl_oders_details`
  ADD PRIMARY KEY (`order_details_id`),
  ADD KEY `fk_prodct_idx` (`fk_product_id`),
  ADD KEY `fk_shop_idx` (`fk_reseller_shop_id`),
  ADD KEY `fk_shipment_idx` (`fk_tbl_product_shpiment_mode`),
  ADD KEY `fk_order_id` (`fk_order_id`);

--
-- Indexes for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_users_id_idx` (`fk_tbl_user_id`),
  ADD KEY `fk_shipp_add_idx` (`fk_tbl_user_shipment_address`);

--
-- Indexes for table `tbl_orders_details_track`
--
ALTER TABLE `tbl_orders_details_track`
  ADD PRIMARY KEY (`track_id`),
  ADD KEY `fk_order_detail_idx` (`fk_tbl_orders_details_id`);

--
-- Indexes for table `tbl_payment_method`
--
ALTER TABLE `tbl_payment_method`
  ADD PRIMARY KEY (`payment_method_id`),
  ADD KEY `fk_shop_Id` (`payment_method_id`),
  ADD KEY `fk_shop_idx` (`fk_shop_id`);

--
-- Indexes for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `fk_prod_cat_idx` (`fk_tbl_product_cetegory_id`),
  ADD KEY `fk_reseller_shop_idx` (`fk_tbl_reseller_shop_id`),
  ADD KEY `fk_reseller_ship_idx` (`fk_tbl_reseller_shipment_mode`),
  ADD KEY `fk_category_attr_ids_prod` (`product_id`);

--
-- Indexes for table `tbl_product_category`
--
ALTER TABLE `tbl_product_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `tbl_product_images`
--
ALTER TABLE `tbl_product_images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `fk_tbl_product_id` (`fk_tbl_product_id`) USING BTREE;

--
-- Indexes for table `tbl_product_property`
--
ALTER TABLE `tbl_product_property`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_idx` (`fk_tbl_product_id`),
  ADD KEY `fk_cat_att_options_idx` (`fk_tbl_category_attribute_option_ids`);

--
-- Indexes for table `tbl_product_reviews`
--
ALTER TABLE `tbl_product_reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `fk_product_id_idx` (`fk_tbl_product_id`),
  ADD KEY `fk_user_idx` (`fk_tbl_user_id`);

--
-- Indexes for table `tbl_reseller_shop`
--
ALTER TABLE `tbl_reseller_shop`
  ADD PRIMARY KEY (`reseller_shop_id`),
  ADD UNIQUE KEY `fk_tbl_users_users_id` (`fk_tbl_users_users_id`),
  ADD UNIQUE KEY `shop_name` (`shop_name`),
  ADD KEY `fk_users_shop_idx` (`fk_tbl_users_users_id`);

--
-- Indexes for table `tbl_shipping_weight_cost`
--
ALTER TABLE `tbl_shipping_weight_cost`
  ADD PRIMARY KEY (`shipping_weight_cost_id`),
  ADD KEY `fk_weight_cost_shop_idx` (`fk_shop_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`users_id`),
  ADD UNIQUE KEY `users_username` (`users_username`);

--
-- Indexes for table `tbl_users_fav_products`
--
ALTER TABLE `tbl_users_fav_products`
  ADD PRIMARY KEY (`fav_id`),
  ADD UNIQUE KEY `fk_tbl_users_users_id` (`fk_tbl_users_users_id`,`fk_tbl_products_product_id`),
  ADD KEY `fk_users_users_idx` (`fk_tbl_users_users_id`),
  ADD KEY `fk_products_product_ids_idx` (`fk_tbl_products_product_id`);

--
-- Indexes for table `tbl_users_fav_shops`
--
ALTER TABLE `tbl_users_fav_shops`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_fav_user_id` (`fk_tbl_users_users_id`),
  ADD KEY `fk_fav_shop_Ids` (`fk_tbl_shop_shop_id`);

--
-- Indexes for table `tbl_users_shipment_addresses`
--
ALTER TABLE `tbl_users_shipment_addresses`
  ADD PRIMARY KEY (`addresses_id`),
  ADD KEY `fk_users_idx` (`fk_tbl_users_users_id`);

--
-- Indexes for table `tbl_verification_token`
--
ALTER TABLE `tbl_verification_token`
  ADD PRIMARY KEY (`token_id`),
  ADD KEY `fk_users_id` (`fk_users_id`) USING BTREE;

--
-- Indexes for table `user_external_login`
--
ALTER TABLE `user_external_login`
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `fk_user_id` (`id`),
  ADD KEY `fk_user_id_tbl_users` (`fk_users_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product_views`
--
ALTER TABLE `product_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT for table `shipment_mode`
--
ALTER TABLE `shipment_mode`
  MODIFY `mode_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `shop_views`
--
ALTER TABLE `shop_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_admin_comission`
--
ALTER TABLE `tbl_admin_comission`
  MODIFY `comission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_category_attributes`
--
ALTER TABLE `tbl_category_attributes`
  MODIFY `attributes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;
--
-- AUTO_INCREMENT for table `tbl_category_attribute_options`
--
ALTER TABLE `tbl_category_attribute_options`
  MODIFY `options_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT for table `tbl_commission_records`
--
ALTER TABLE `tbl_commission_records`
  MODIFY `commission_record_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tbl_oders_details`
--
ALTER TABLE `tbl_oders_details`
  MODIFY `order_details_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
--
-- AUTO_INCREMENT for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
--
-- AUTO_INCREMENT for table `tbl_orders_details_track`
--
ALTER TABLE `tbl_orders_details_track`
  MODIFY `track_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_payment_method`
--
ALTER TABLE `tbl_payment_method`
  MODIFY `payment_method_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `tbl_products`
--
ALTER TABLE `tbl_products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;
--
-- AUTO_INCREMENT for table `tbl_product_category`
--
ALTER TABLE `tbl_product_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `tbl_product_images`
--
ALTER TABLE `tbl_product_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;
--
-- AUTO_INCREMENT for table `tbl_product_property`
--
ALTER TABLE `tbl_product_property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_product_reviews`
--
ALTER TABLE `tbl_product_reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tbl_reseller_shop`
--
ALTER TABLE `tbl_reseller_shop`
  MODIFY `reseller_shop_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;
--
-- AUTO_INCREMENT for table `tbl_shipping_weight_cost`
--
ALTER TABLE `tbl_shipping_weight_cost`
  MODIFY `shipping_weight_cost_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `users_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=591;
--
-- AUTO_INCREMENT for table `tbl_users_fav_products`
--
ALTER TABLE `tbl_users_fav_products`
  MODIFY `fav_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tbl_users_fav_shops`
--
ALTER TABLE `tbl_users_fav_shops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_users_shipment_addresses`
--
ALTER TABLE `tbl_users_shipment_addresses`
  MODIFY `addresses_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT for table `tbl_verification_token`
--
ALTER TABLE `tbl_verification_token`
  MODIFY `token_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_views`
--
ALTER TABLE `product_views`
  ADD CONSTRAINT `fk_product_idx` FOREIGN KEY (`fk_product_id`) REFERENCES `tbl_products` (`product_id`);

--
-- Constraints for table `reseller_shipment_mode`
--
ALTER TABLE `reseller_shipment_mode`
  ADD CONSTRAINT `fk_mode_id` FOREIGN KEY (`fk_shipment_mode_mode_id`) REFERENCES `shipment_mode` (`mode_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reseller_shop_id` FOREIGN KEY (`fk_reseller_shop_id`) REFERENCES `tbl_reseller_shop` (`reseller_shop_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_category_attributes`
--
ALTER TABLE `tbl_category_attributes`
  ADD CONSTRAINT `fk_product_cat` FOREIGN KEY (`fk_tbl_product_category_id`) REFERENCES `tbl_product_category` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_category_attribute_options`
--
ALTER TABLE `tbl_category_attribute_options`
  ADD CONSTRAINT `fk_tb_category_attributes_id` FOREIGN KEY (`fk_tbl_category_attribute_id`) REFERENCES `tbl_category_attributes` (`attributes_id`);

--
-- Constraints for table `tbl_commission_records`
--
ALTER TABLE `tbl_commission_records`
  ADD CONSTRAINT `fk_commission_user_id` FOREIGN KEY (`fk_vendor_id`) REFERENCES `tbl_users` (`users_id`),
  ADD CONSTRAINT `fk_tbl_order_order_ID` FOREIGN KEY (`fk_tbl_order_order_number`) REFERENCES `tbl_orders` (`order_id`);

--
-- Constraints for table `tbl_oders_details`
--
ALTER TABLE `tbl_oders_details`
  ADD CONSTRAINT `fk_order_id` FOREIGN KEY (`fk_order_id`) REFERENCES `tbl_orders` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_prodct` FOREIGN KEY (`fk_product_id`) REFERENCES `tbl_products` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_shipment` FOREIGN KEY (`fk_tbl_product_shpiment_mode`) REFERENCES `reseller_shipment_mode` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_shop` FOREIGN KEY (`fk_reseller_shop_id`) REFERENCES `tbl_reseller_shop` (`reseller_shop_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  ADD CONSTRAINT `fk_shipp_add` FOREIGN KEY (`fk_tbl_user_shipment_address`) REFERENCES `tbl_users_shipment_addresses` (`addresses_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_users_id` FOREIGN KEY (`fk_tbl_user_id`) REFERENCES `tbl_users` (`users_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_orders_details_track`
--
ALTER TABLE `tbl_orders_details_track`
  ADD CONSTRAINT `fk_order_detail` FOREIGN KEY (`fk_tbl_orders_details_id`) REFERENCES `tbl_oders_details` (`order_details_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_payment_method`
--
ALTER TABLE `tbl_payment_method`
  ADD CONSTRAINT `fk_shop_idx` FOREIGN KEY (`fk_shop_id`) REFERENCES `tbl_reseller_shop` (`reseller_shop_id`);

--
-- Constraints for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD CONSTRAINT `fk_category_attr` FOREIGN KEY (`fk_tbl_product_cetegory_id`) REFERENCES `tbl_product_category` (`category_id`),
  ADD CONSTRAINT `fk_prod_cat` FOREIGN KEY (`fk_tbl_product_cetegory_id`) REFERENCES `tbl_product_category` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reseller_ship` FOREIGN KEY (`fk_tbl_reseller_shipment_mode`) REFERENCES `reseller_shipment_mode` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reseller_shop` FOREIGN KEY (`fk_tbl_reseller_shop_id`) REFERENCES `tbl_reseller_shop` (`reseller_shop_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_product_images`
--
ALTER TABLE `tbl_product_images`
  ADD CONSTRAINT `fk_prod` FOREIGN KEY (`fk_tbl_product_id`) REFERENCES `tbl_products` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_product_property`
--
ALTER TABLE `tbl_product_property`
  ADD CONSTRAINT `fk_cat_att_options` FOREIGN KEY (`fk_tbl_category_attribute_option_ids`) REFERENCES `tbl_category_attribute_options` (`options_id`),
  ADD CONSTRAINT `fk_product` FOREIGN KEY (`fk_tbl_product_id`) REFERENCES `tbl_products` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_product_reviews`
--
ALTER TABLE `tbl_product_reviews`
  ADD CONSTRAINT `fk_product_id` FOREIGN KEY (`fk_tbl_product_id`) REFERENCES `tbl_products` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`fk_tbl_user_id`) REFERENCES `tbl_users` (`users_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_reseller_shop`
--
ALTER TABLE `tbl_reseller_shop`
  ADD CONSTRAINT `fk_users_shop` FOREIGN KEY (`fk_tbl_users_users_id`) REFERENCES `tbl_users` (`users_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_shipping_weight_cost`
--
ALTER TABLE `tbl_shipping_weight_cost`
  ADD CONSTRAINT `fk_weight_cost_shop_idx` FOREIGN KEY (`fk_shop_id`) REFERENCES `tbl_reseller_shop` (`reseller_shop_id`);

--
-- Constraints for table `tbl_users_fav_products`
--
ALTER TABLE `tbl_users_fav_products`
  ADD CONSTRAINT `fk_products_product_ids` FOREIGN KEY (`fk_tbl_products_product_id`) REFERENCES `tbl_products` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_users_users` FOREIGN KEY (`fk_tbl_users_users_id`) REFERENCES `tbl_users` (`users_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_users_fav_shops`
--
ALTER TABLE `tbl_users_fav_shops`
  ADD CONSTRAINT `fav_shop_id` FOREIGN KEY (`fk_tbl_shop_shop_id`) REFERENCES `tbl_reseller_shop` (`reseller_shop_id`),
  ADD CONSTRAINT `fav_users_id` FOREIGN KEY (`fk_tbl_users_users_id`) REFERENCES `tbl_users` (`users_id`);

--
-- Constraints for table `tbl_users_shipment_addresses`
--
ALTER TABLE `tbl_users_shipment_addresses`
  ADD CONSTRAINT `fk_users` FOREIGN KEY (`fk_tbl_users_users_id`) REFERENCES `tbl_users` (`users_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_verification_token`
--
ALTER TABLE `tbl_verification_token`
  ADD CONSTRAINT `fk_users_token` FOREIGN KEY (`fk_users_id`) REFERENCES `tbl_users` (`users_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user_external_login`
--
ALTER TABLE `user_external_login`
  ADD CONSTRAINT `fk_user_id_tbl_users` FOREIGN KEY (`fk_users_id`) REFERENCES `tbl_users` (`users_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
