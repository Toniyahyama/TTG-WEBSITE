-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2025 at 01:03 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tanjak`
--

-- --------------------------------------------------------

--
-- Table structure for table `umkm`
--

CREATE TABLE `umkm` (
  `id_umkm` int(11) NOT NULL,
  `nama_umkm` varchar(100) NOT NULL,
  `kategori_umkm` enum('Kuliner','Jasa','Toko Kelontong & Peralatan','Lainnya') NOT NULL,
  `alamat` text DEFAULT NULL,
  `rw` varchar(10) DEFAULT NULL,
  `no_telp` varchar(20) DEFAULT NULL,
  `nama_pemilik` varchar(100) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `umkm`
--

INSERT INTO `umkm` (`id_umkm`, `nama_umkm`, `kategori_umkm`, `alamat`, `rw`, `no_telp`, `nama_pemilik`, `deskripsi`, `foto`, `created_at`, `updated_at`) VALUES
(4, 'Toko Winaberkah', 'Toko Kelontong & Peralatan', 'tanjungsari 2 no.49', '02', '6285784807677', 'Wiji Purnomo', 'semoga sukses', 'default.jpeg', '2025-07-16 06:46:54', '2025-07-17 01:19:54'),
(7, 'Warung makan Rizky', 'Kuliner', 'Tanjungsari no.35', '02', '6288132479019', 'Wahyudi Hartono', 'Warung makan yang menyediakan berbagai menu makanan sehari-hari dengan cita rasa yang lezat dan harga terjangkau untuk memenuhi kebutuhan makan masyarakat sekitar.', 'umkm_687d6d9890ed4.jpg', '2025-07-21 05:21:08', '2025-07-21 05:28:40'),
(8, 'Pangkalan LPG', 'Toko Kelontong & Peralatan', 'Tanjungsari no.33', '02', '6285102724941', 'Wong Kok Fuk, S.T', 'Penyedia layanan penjualan galon air minum dan tabung gas LPG untuk keperluan rumah tangga dengan pelayanan yang cepat dan terpercaya.', 'umkm_687d6da569a01.jpg', '2025-07-21 05:21:08', '2025-07-21 05:28:53'),
(9, 'Amirah.com', 'Kuliner', 'Tanjungsari no.3', '02', '6283849052521', 'Totok Hariyanto', 'Warung kopi yang menyajikan berbagai varian kopi berkualitas dan minuman hangat lainnya dengan suasana yang nyaman untuk bersantai.', 'umkm_687d6db089efc.jpg', '2025-07-21 05:21:08', '2025-07-21 05:29:04'),
(10, 'Ratna Laundry', 'Jasa', 'Tanjungsari RT 7/RW 2', '02', '6281393405268', 'Sunarti', 'Jasa laundry profesional yang menyediakan layanan cuci, setrika, dan perawatan pakaian dengan hasil yang bersih dan rapi serta waktu pengerjaan yang tepat.', 'umkm_687d6dbeb6821.jpg', '2025-07-21 05:21:08', '2025-07-21 05:29:18'),
(11, 'SOTO AYAM RAJARASA LAMONGAN', 'Kuliner', 'Tanjungsari Rt.07', '02', '628810270895', 'Nur Ali', 'Warung soto ayam khas Lamongan dengan kuah bening yang segar dan daging ayam yang empuk, disajikan dengan bumbu dan sambal yang menggugah selera.', 'umkm_687d6f9783834.jpg', '2025-07-21 05:21:08', '2025-07-21 05:37:11'),
(12, 'TOKO MUJI PANGESTU', 'Toko Kelontong & Peralatan', 'Jl. Tanjungsari 29', '02', '6281259347800', 'Ibu Kastini', 'Toko perancangan yang menyediakan berbagai kebutuhan peralatan rumah tangga dan perlengkapan sehari-hari dengan kualitas terbaik.', 'umkm_687d6fa362db8.jpg', '2025-07-21 05:21:08', '2025-07-21 05:37:23'),
(13, 'Toko Kenzio', 'Toko Kelontong & Peralatan', 'Tanjungsari RT 4 RW 2', '02', '6281359668929', 'Kayati', 'Toko sembako dan jajan yang menyediakan kebutuhan pokok sehari-hari dan berbagai macam camilan untuk keluarga dengan harga yang kompetitif.', 'umkm_687d6ef6c30f4.jpg', '2025-07-21 05:21:08', '2025-07-21 05:34:30'),
(14, 'Toko Bu Lilik', 'Toko Kelontong & Peralatan', 'Gang 3 rt 4 buntu No.14', '02', '6282335588912', 'Lilik Hartiningsih', 'Toko yang melayani penjualan galon air minum dan tabung gas LPG untuk memenuhi kebutuhan sehari-hari rumah tangga di sekitar wilayah.', 'umkm_687d6f0804286.jpg', '2025-07-21 05:21:08', '2025-07-21 05:34:48'),
(15, 'Laundry dan Catering', 'Jasa', 'RW 2 RT 4 No.17', '02', '6282231838910', 'Sundary', 'Usaha yang menyediakan layanan catering nasi kotak dan tumpeng untuk berbagai acara serta jasa laundry untuk keperluan sehari-hari.', 'umkm_687d6f1aa7b25.jpg', '2025-07-21 05:21:08', '2025-07-21 05:35:06'),
(16, 'Warkop Bu Yatin', 'Kuliner', 'RT 4 No.12', '02', '-', 'Yatin', 'Warung kopi yang menyediakan berbagai minuman kopi dan makanan ringan sebagai tempat berkumpul dan bersantai yang nyaman.', 'umkm_687d6f2dabfbb.jpg', '2025-07-21 05:21:08', '2025-07-21 05:35:25'),
(17, 'Es Teler dan Burjo', 'Kuliner', 'Tanjungsari 4 RT 6 (depan balai RW 2)', '02', '6285732804666', 'Wilianingsih', 'Warung yang menyajikan es teler segar, es pisang, dan burjo (bubur kacang ijo) sebagai minuman dan makanan penutup yang menyegarkan.', 'umkm_687d6f4c2a616.jpg', '2025-07-21 05:21:08', '2025-07-21 05:35:56'),
(18, 'Bakwan Idola', 'Kuliner', 'Tanjungsari 4 RW 2 (depan balai RW 2)', '02', '6281326548980', 'Heri Wahyudi', 'Warung bakso yang menyajikan bakso berkualitas dengan kuah yang gurih dan berbagai pilihan topping untuk memuaskan selera pelanggan.', 'umkm_687d6f5fa7777.jpg', '2025-07-21 05:21:08', '2025-07-21 05:36:15'),
(19, 'Toko Sayur Bu Misini', 'Toko Kelontong & Peralatan', 'Tanjungsari Jaya V', '02', '6288218151456', 'Misini', 'Toko sayuran segar yang menyediakan berbagai jenis sayur-sayuran berkualitas setiap hari untuk memenuhi kebutuhan dapur rumah tangga.', 'umkm_687d7059a2df4.jpg', '2025-07-21 05:21:08', '2025-07-21 05:40:25'),
(20, 'Printing Sablon', 'Jasa', 'Tanjungsari Jaya IV, No. 15', '02', '6285730206567', 'Agus Dwiyanto', 'Usaha jasa printing dan sablon yang melayani pembuatan berbagai keperluan cetak seperti undangan, brosur, kaos, dan produk sablon lainnya.', 'umkm_687d706c0a18e.jpg', '2025-07-21 05:21:08', '2025-07-21 05:40:44'),
(21, 'Kelontong Pak Harsono', 'Toko Kelontong & Peralatan', 'Tanjungsari Jaya IV, No. 15', '02', '62895367273945', 'Harsono', 'Toko kelontong lengkap yang menyediakan berbagai kebutuhan sehari-hari mulai dari sembako hingga peralatan rumah tangga.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(22, 'Kelontong Bu Ruli', 'Toko Kelontong & Peralatan', 'Tanjungsari Jaya IV, No. 6', '02', '6285336454786', 'Ruly', 'Toko kelontong yang melayani penjualan berbagai kebutuhan pokok dan keperluan sehari-hari dengan pelayanan yang ramah dan harga terjangkau.', 'umkm_687d707c62e3b.jpg', '2025-07-21 05:21:08', '2025-07-21 05:41:00'),
(23, 'Kelontong Bu Lilik', 'Toko Kelontong & Peralatan', 'Tanjungsari Jaya V, No. 121', '02', '6281553963114', 'Lilik', 'Toko kelontong yang menyediakan berbagai macam kebutuhan rumah tangga dan sembako dengan stok yang selalu tersedia.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(24, 'Warkop Bu Umi', 'Kuliner', 'Tanjungsari Rt 9 Rw 2', '02', '6282132430266', 'Umi Khosibah', 'Warung kopi yang menyajikan kopi berkualitas dan berbagai makanan ringan sebagai tempat berkumpul yang nyaman di lingkungan sekitar.', 'umkm_687d71d54428d.jpg', '2025-07-21 05:21:08', '2025-07-21 05:46:45'),
(25, 'Toko Bu Dwi Yulianti', 'Toko Kelontong & Peralatan', 'Gang Melati', '02', '6289678826516', 'Dwi Yulianti', 'Toko kelontong yang melayani penjualan berbagai kebutuhan sehari-hari dengan lokasi strategis di Gang Melati yang mudah diakses.', 'umkm_687d71e88bf09.jpg', '2025-07-21 05:21:08', '2025-07-21 05:47:04'),
(26, 'Toko Bu Ktun', 'Toko Kelontong & Peralatan', 'Gang Melati', '02', '6281334265090', 'Lina Yatun', 'Toko kelontong di Gang Melati yang menyediakan berbagai keperluan rumah tangga dan kebutuhan sehari-hari dengan pelayanan terbaik.', 'umkm_687d7211bfe08.jpg', '2025-07-21 05:21:08', '2025-07-21 05:47:45'),
(27, 'Toko Bu Arpuah', 'Toko Kelontong & Peralatan', 'RT 9 RW 2', '02', '-', 'Karpuah', 'Toko kelontong yang melayani kebutuhan masyarakat sekitar dengan menyediakan berbagai produk kebutuhan sehari-hari dan sembako.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(28, 'Warung Bu Erni', 'Toko Kelontong & Peralatan', 'Tanjungsari Rt 9 Rw 2', '02', '6281515131900', 'Bu Erni', 'Toko kelontong yang menyediakan berbagai kebutuhan pokok dan keperluan sehari-hari untuk memenuhi kebutuhan masyarakat sekitar.', 'umkm_687d73dcc0482.jpg', '2025-07-21 05:21:08', '2025-07-21 05:55:24'),
(29, 'Toko Kribo', 'Toko Kelontong & Peralatan', 'Tanjungsari Gang VI RT 10 RW 02 No.79', '02', '6282142766143', 'Nizam', 'Toko kelontong dengan berbagai pilihan produk kebutuhan rumah tangga dan sembako yang lengkap dengan harga yang bersahabat.', 'umkm_687d729204cda.jpg', '2025-07-21 05:21:08', '2025-07-21 05:49:54'),
(30, 'Wino Teh', 'Kuliner', 'Tanjungsari Gang VI RT 10 RW 02 No.50A', '02', '6285784807677', 'Novi', 'Kedai minuman yang mengkhususkan diri menjual es teh segar dan berbagai varian minuman dingin yang menyegarkan.', 'umkm_687d72a32ea06.jpg', '2025-07-21 05:21:08', '2025-07-21 05:50:11'),
(31, 'Toko Berkah', 'Toko Kelontong & Peralatan', 'Tanjungsari RT 10 RW 02 No.44', '02', '6285850130498', 'Ibu Siti', 'Toko kelontong dengan nama yang mencerminkan keberkahan, menyediakan berbagai kebutuhan sehari-hari dengan pelayanan yang berkah.', 'umkm_687d72b572dac.jpg', '2025-07-21 05:21:08', '2025-07-21 05:50:29'),
(32, 'Warung Sumber Agung', 'Kuliner', 'Tanjungsari Gang VI RT 10 RW 02 No.40', '02', '6288991737290', 'Kuswatun Kasanah', 'Warung makan yang menyediakan berbagai menu makanan sehari-hari dengan cita rasa yang lezat dan porsi yang mengenyangkan.', 'umkm_687d736a64688.jpg', '2025-07-21 05:21:08', '2025-07-21 05:53:30'),
(33, 'Toko Sembako Pak Mina', 'Toko Kelontong & Peralatan', 'Tanjungsari Gang Gading VI RT 10 RW 02 No.5', '02', '6281703174024', 'Minatollah', 'Toko sembako lengkap yang menyediakan kebutuhan pokok sehari-hari dengan kualitas terbaik dan harga yang kompetitif.', 'umkm_687d737a6f683.jpg', '2025-07-21 05:21:08', '2025-07-21 05:53:46'),
(34, 'Warung Bu Tun', 'Kuliner', 'RT 15 no. 1A', '02', '6285852753479', 'Ibu Khoiratun', 'Warung makan yang menyajikan berbagai menu makanan rumahan dengan cita rasa yang autentik dan harga yang terjangkau.', 'umkm_687d738a795db.jpg', '2025-07-21 05:21:08', '2025-07-21 05:54:02'),
(35, 'Toko Bu Rum', 'Toko Kelontong & Peralatan', 'RT 15 no.10', '02', '6288991137419', 'Ibu Ruminah', 'Toko kelontong yang melayani berbagai kebutuhan sehari-hari dengan stok yang lengkap dan selalu terjaga ketersediaannya.', 'umkm_687d739a579ee.jpg', '2025-07-21 05:21:08', '2025-07-21 05:54:18'),
(36, 'Toko Bu Yatun', 'Toko Kelontong & Peralatan', 'Gang 9', '02', '6281252027008', 'Ibu Yatun', 'Toko sembako yang menyediakan kebutuhan pokok rumah tangga dengan kualitas terjamin dan pelayanan yang memuaskan.', 'umkm_687d73aa10c0b.jpg', '2025-07-21 05:21:08', '2025-07-21 05:54:34'),
(37, 'Warung Bapak Misno dan Deana Cell', 'Lainnya', 'RT 15 no.16', '02', '6285850463408', 'Ibu Karmina', 'Usaha yang menyediakan layanan lengkap mulai dari makanan, kopi, penjualan token listrik, dan pulsa untuk memenuhi berbagai kebutuhan.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(38, 'Banyu Sweger', 'Jasa', 'RT 15 no.14', '02', '6281357865009', 'Pak Kasam', 'Usaha isi ulang air yang menyediakan air bersih berkualitas untuk kebutuhan sehari-hari dengan sistem pengolahan yang higienis.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(39, 'Alden Teh', 'Kuliner', 'Gang 8 no.1A', '02', '6282234835003', 'Anin Putri', 'Kedai minuman yang menyajikan berbagai jenis minuman segar dan berkualitas untuk melepas dahaga dan menyegarkan tubuh.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(40, 'Warung Barokah 12', 'Kuliner', 'RT 15 no.12', '02', '6285732541563', 'Surani', 'Warung yang menyediakan nasi, penyetan, kopi dan berbagai menu makanan lainnya dengan cita rasa yang nikmat dan suasana yang nyaman.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(41, 'Warkop Bu Rina', 'Kuliner', 'RT 15 Tj Jaya Utara no.3 gang 8', '02', '6285732241758', 'Rina', 'Warung kopi yang menyajikan kopi berkualitas dan es segar sebagai tempat bersantai yang nyaman di lingkungan sekitar.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(42, 'Warung Bu Mariyati', 'Kuliner', 'Tanjungsari RT 17', '02', '6285749470989', 'Ibu Mariyati', 'Warung makan yang menyediakan berbagai menu makanan sehari-hari dengan cita rasa rumahan yang lezat dan mengenyangkan.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(43, 'Martabak Madura Kursiyah', 'Kuliner', 'Tanjungsari RT 17', '02', '6285850454930', 'Ibu Kursiyah', 'Warung martabak madura yang menyajikan martabak dengan resep tradisional yang autentik dan cita rasa yang khas dari Madura.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(44, 'Pentol Ambyar', 'Kuliner', 'Tanjungsari RT 17', '02', '6281330050037', 'Ibu Bonita', 'Warung yang menyajikan pentol dan berbagai makanan ringan lainnya dengan bumbu yang sedap dan harga yang terjangkau.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(45, 'Arisyah Cell', 'Toko Kelontong & Peralatan', 'Jl Raya Tandes Tanjungsari No 86', '02', '6285232041702', 'Pak Charis', 'Toko ATK dan fotocopy yang melayani kebutuhan alat tulis kantor dan jasa fotocopy untuk keperluan administrasi dan pendidikan.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(46, 'Toko Triplek Surabaya', 'Toko Kelontong & Peralatan', 'Jl Raya Tandes Lor No. 94', '02', '6287766761976', 'Bu Yuliani Engelina', 'Toko yang khusus menjual triplek dan berbagai barang interior untuk keperluan konstruksi dan dekorasi rumah.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(47, 'Toko Baut Sumberejo', 'Toko Kelontong & Peralatan', 'Jl Raya Tandes Lor No. 100', '02', '6285189338852', 'Bu Evy', 'Toko yang menyediakan berbagai jenis baut dan peralatan teknis untuk keperluan konstruksi dan perbaikan.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(48, 'Warung Barokah', 'Kuliner', 'Jl Raya Tandes Tanjungsari no 88', '02', '6282140052908', '', 'Warung makan yang mengkhususkan diri menyajikan mie ayam dan bakso dengan kuah yang gurih dan topping yang lengkap.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(49, 'Banana', 'Toko Kelontong & Peralatan', 'Tanjungsari 4/15', '02', '6281217442254', 'Suwarni', 'Usaha penjualan pisang segar dengan berbagai jenis dan kualitas terbaik untuk memenuhi kebutuhan buah-buahan sehari-hari.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(50, 'Aulia Cell', 'Lainnya', 'No.33', '02', '6288709627067', 'Bu Suliati', 'Usaha penjualan pulsa dan berbagai layanan komunikasi untuk memenuhi kebutuhan telekomunikasi masyarakat sekitar.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(51, 'Ruko SRC Yudi', 'Toko Kelontong & Peralatan', 'No.31', '02', '62895324499565', 'Bu Kasiatun', 'Toko kelontong di ruko yang menyediakan berbagai kebutuhan sehari-hari dengan lokasi strategis dan mudah diakses.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(52, 'Kelontong Pak Pujianto', 'Toko Kelontong & Peralatan', 'No. 6 gang 8 Rt 11', '02', '6282257489167', 'Bapak Pujianto', 'Toko kelontong yang melayani berbagai kebutuhan masyarakat dengan pelayanan yang ramah dan harga yang bersaing.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(53, 'Toko Bu Samirah', 'Toko Kelontong & Peralatan', 'Tanjungsari Jaya 1 No. 34', '02', '6281331304468', 'Bu Samirah', 'Toko kelontong yang menyediakan berbagai keperluan rumah tangga dan kebutuhan sehari-hari dengan stok yang lengkap.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(54, 'Kedai Geprek Kak Irma', 'Kuliner', 'Tanjungsari Jaya 3/1', '02', '6282338483411', 'Irmawati', 'Kedai yang mengkhususkan diri menyajikan ayam geprek dengan berbagai level kepedasan dan topping yang menggugah selera.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(55, 'Toko Fuad', 'Toko Kelontong & Peralatan', 'Tanjungsari Jaya 3/2A', '02', '6282234077359', 'Maudliah', 'Toko kelontong yang menyediakan berbagai macam kebutuhan pokok dan keperluan sehari-hari untuk masyarakat sekitar.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(56, 'Toko Dwi', 'Toko Kelontong & Peralatan', 'Tanjungsari Jaya 3/2', '02', '6285107242964', 'Pak Hartono', 'Toko kelontong yang melayani penjualan berbagai produk kebutuhan rumah tangga dengan harga yang kompetitif dan terjangkau.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(57, 'Toko Pak Jaya', 'Toko Kelontong & Peralatan', 'Tanjungsari Jaya 3 No. 33', '02', '6281216992029', 'As. Widjaya', 'Toko yang khusus menjual sayur-sayuran segar setiap hari untuk memenuhi kebutuhan dapur rumah tangga masyarakat sekitar.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(58, 'Warkop Bu Har', 'Kuliner', 'Tanjungsari Jaya 3 No. 45', '02', '6285731991654', 'Nur Hayati', 'Warung kopi yang menyajikan makanan ringan dan berbagai minuman hangat sebagai tempat bersantai yang nyaman.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(59, 'Nasi Campur', 'Kuliner', 'Tanjungsari Jaya I (pojok)', '02', '6285455354615', 'Mas Eko', 'Warung yang menyajikan nasi campur dengan berbagai lauk pauk pilihan yang lezat dan mengenyangkan dengan harga terjangkau.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(60, 'Toko Bu Bambang', 'Toko Kelontong & Peralatan', 'Tanjungsari Jaya 1/28', '02', '6285733770150', 'Ibu Sutarsih', 'Toko sembako yang menyediakan kebutuhan pokok sehari-hari dengan kualitas terbaik dan harga yang bersahabat.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08'),
(61, 'Kedai Keykez', 'Kuliner', 'Gang Tanjungsari 1 Pojok Rel', '02', '6288989872969', 'Mina', 'Kedai yang menyajikan kebab, burger, dan cireng sebagai menu makanan cepat saji yang lezat dan mengenyangkan dengan harga terjangkau.', 'default.jpeg', '2025-07-21 05:21:08', '2025-07-21 05:21:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID_user` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID_user`, `username`, `password`, `created_at`) VALUES
(2, 'admin', '$2y$10$WIDVqIYQfhWNWvcd9ylJ1u0mWrqCDonfZbSWPay4W8zYw6zCcX0wK', '2025-07-15 21:33:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `umkm`
--
ALTER TABLE `umkm`
  ADD PRIMARY KEY (`id_umkm`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `umkm`
--
ALTER TABLE `umkm`
  MODIFY `id_umkm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
