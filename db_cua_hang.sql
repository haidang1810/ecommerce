-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 09, 2022 lúc 05:26 AM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `db_cua_hang`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_anh_bia`
--

CREATE TABLE `tb_anh_bia` (
  `Id` bigint(20) NOT NULL,
  `DuongDan` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_chien_dich`
--

CREATE TABLE `tb_chien_dich` (
  `MaCD` varchar(10) NOT NULL,
  `TenCD` varchar(200) NOT NULL,
  `NhomKH` varchar(10) DEFAULT NULL,
  `LoaiTinNhan` int(11) NOT NULL,
  `NoiDung` text NOT NULL,
  `ThoiGianKichHoat` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_chien_dich`
--

INSERT INTO `tb_chien_dich` (`MaCD`, `TenCD`, `NhomKH`, `LoaiTinNhan`, `NoiDung`, `ThoiGianKichHoat`) VALUES
('CD001', 'Chiến dịch ngày 18', 'NGAY18', 2, 'Chúc mừng các bạn sinh ngày 18', '2022-06-03 22:36:04'),
('CD002', 'Tháng 6 vui vẻ', NULL, 2, 'Chúc các bạn có 1 tháng 6 vui vẻ', '2022-06-03 22:36:37');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_chi_tiet_chien_dich`
--

CREATE TABLE `tb_chi_tiet_chien_dich` (
  `MaCD` varchar(10) NOT NULL,
  `MaKH` varchar(20) NOT NULL,
  `TrangThai` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_chi_tiet_chien_dich`
--

INSERT INTO `tb_chi_tiet_chien_dich` (`MaCD`, `MaKH`, `TrangThai`) VALUES
('CD001', '7OHL6sAnH4UKUXqBAq0o', 1),
('CD002', '6LCVKLEqs8BY117OxZhF', 2),
('CD002', '7OHL6sAnH4UKUXqBAq0o', 1),
('CD002', 'I0M2NnebynRz4WE28ax4', 2),
('CD002', 'j2RoJqwGNBvlwNKkA2ZT', 2),
('CD002', 'RzHps7DXS0ZGzfMtWRh3', 1),
('CD002', 'thLK4OGeCMKjyvlzpd1m', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_chi_tiet_don`
--

CREATE TABLE `tb_chi_tiet_don` (
  `MaDon` varchar(50) NOT NULL,
  `MaSP` varchar(10) NOT NULL,
  `SoLuong` int(11) NOT NULL,
  `Gia` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_chi_tiet_don`
--

INSERT INTO `tb_chi_tiet_don` (`MaDon`, `MaSP`, `SoLuong`, `Gia`) VALUES
('eksruavItXsXfWJ1WYE4mnAuzsdHlI', 'SP002', 1, 240000),
('eksruavItXsXfWJ1WYE4mnAuzsdHlI', 'SP003', 1, 40000),
('q3IFCsbGURLVBAxLu3NugT2P84NM5B', 'SP001', 1, 80000),
('q3IFCsbGURLVBAxLu3NugT2P84NM5B', 'SP004', 1, 185000),
('rwAKiwcu9NZwmjXyuRnB7dLLkvABAY', 'SP001', 1, 80000),
('wvCFwtMP1WaHO4Jjk9bkVjyl06YK73', 'SP008', 1, 249000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_ct_don_lua_chon`
--

CREATE TABLE `tb_ct_don_lua_chon` (
  `Id` bigint(20) NOT NULL,
  `MaDon` varchar(30) NOT NULL,
  `MaSP` varchar(10) NOT NULL,
  `MaLC` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_ct_don_lua_chon`
--

INSERT INTO `tb_ct_don_lua_chon` (`Id`, `MaDon`, `MaSP`, `MaLC`) VALUES
(9, 'rwAKiwcu9NZwmjXyuRnB7dLLkvABAY', 'SP001', 1),
(10, 'rwAKiwcu9NZwmjXyuRnB7dLLkvABAY', 'SP001', 7),
(11, 'q3IFCsbGURLVBAxLu3NugT2P84NM5B', 'SP001', 2),
(12, 'q3IFCsbGURLVBAxLu3NugT2P84NM5B', 'SP001', 14);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_danh_gia`
--

CREATE TABLE `tb_danh_gia` (
  `Id` bigint(20) NOT NULL,
  `TaiKhoan` varchar(30) NOT NULL,
  `MaSP` varchar(10) NOT NULL,
  `MaDon` varchar(50) NOT NULL,
  `ThoiGian` datetime NOT NULL,
  `NoiDung` text NOT NULL,
  `SoSao` tinyint(4) NOT NULL,
  `PhanHoi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_danh_gia`
--

INSERT INTO `tb_danh_gia` (`Id`, `TaiKhoan`, `MaSP`, `MaDon`, `ThoiGian`, `NoiDung`, `SoSao`, `PhanHoi`) VALUES
(5, 'dang', 'SP002', 'eksruavItXsXfWJ1WYE4mnAuzsdHlI', '2022-06-02 21:42:06', 'Hàng rất chất lượng. Đúng như mô tả. Lần sau sẽ mua tiếp', 5, 'Cảm ơn bạn đã ủng hộ shop'),
(6, 'dang', 'SP003', 'eksruavItXsXfWJ1WYE4mnAuzsdHlI', '2022-06-02 21:42:06', 'Hàng rất chất lượng. Đúng như mô tả. Lần sau sẽ mua tiếp', 5, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_dia_chi`
--

CREATE TABLE `tb_dia_chi` (
  `Id` bigint(20) NOT NULL,
  `DiaChi` varchar(200) NOT NULL,
  `IdTinhThanhPho` int(11) NOT NULL,
  `IdQuanHuyen` int(11) NOT NULL,
  `IdPhuongXa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_dia_chi`
--

INSERT INTO `tb_dia_chi` (`Id`, `DiaChi`, `IdTinhThanhPho`, `IdQuanHuyen`, `IdPhuongXa`) VALUES
(1, '52/84/129 Nguyễn Huệ', 215, 1562, 570102),
(2, '73 Nguyễn Huệ', 215, 1562, 570102),
(3, '74 Nguyễn Huệ', 215, 1562, 570102);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_dieu_kien_nhom`
--

CREATE TABLE `tb_dieu_kien_nhom` (
  `Id` bigint(11) NOT NULL,
  `MaNhom` varchar(10) NOT NULL,
  `ThuocTinh` varchar(100) NOT NULL,
  `DieuKien` varchar(50) NOT NULL,
  `GiaTri` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_dieu_kien_nhom`
--

INSERT INTO `tb_dieu_kien_nhom` (`Id`, `MaNhom`, `ThuocTinh`, `DieuKien`, `GiaTri`) VALUES
(7, 'NKH001', 'Số đơn hàng', 'nhỏ hơn', '6'),
(8, 'NKH002', 'Giới tính', 'bằng', 'nữ'),
(9, 'NKH002', 'Tháng sinh', 'bằng', '5'),
(11, 'NGAY18', 'Ngày sinh', 'bằng', '18');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_don_hang`
--

CREATE TABLE `tb_don_hang` (
  `MaDon` varchar(50) NOT NULL,
  `MaKH` varchar(20) NOT NULL,
  `DiaChiNhanHang` varchar(100) NOT NULL,
  `TrangThai` tinyint(4) NOT NULL,
  `TongTienHang` bigint(20) NOT NULL,
  `PhiVanChuyen` bigint(20) NOT NULL,
  `TienDuocGiam` bigint(20) NOT NULL DEFAULT 0,
  `PhuongThucThanhToan` int(11) NOT NULL DEFAULT 1,
  `NgayLap` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_don_hang`
--

INSERT INTO `tb_don_hang` (`MaDon`, `MaKH`, `DiaChiNhanHang`, `TrangThai`, `TongTienHang`, `PhiVanChuyen`, `TienDuocGiam`, `PhuongThucThanhToan`, `NgayLap`) VALUES
('eksruavItXsXfWJ1WYE4mnAuzsdHlI', '7OHL6sAnH4UKUXqBAq0o', '52/84/129 Nguyễn Huệ, Phường 2, Thành phố Vĩnh Long, Vĩnh Long', 3, 280000, 209000, 0, 1, '2022-05-04'),
('q3IFCsbGURLVBAxLu3NugT2P84NM5B', 'RzHps7DXS0ZGzfMtWRh3', '73 Nguyễn Huệ,Phường 2, Thành phố Vĩnh Long, Vĩnh Long', 3, 265000, 209000, 0, 1, '2022-06-04'),
('rwAKiwcu9NZwmjXyuRnB7dLLkvABAY', '7OHL6sAnH4UKUXqBAq0o', '52/84/129 Nguyễn Huệ, Phường 2, Thành phố Vĩnh Long, Vĩnh Long', 0, 80000, 209000, 80000, 1, '2022-06-08'),
('wvCFwtMP1WaHO4Jjk9bkVjyl06YK73', '7OHL6sAnH4UKUXqBAq0o', '52/84/129 Nguyễn Huệ, Phường 2, Thành phố Vĩnh Long, Vĩnh Long', 5, 249000, 209000, 0, 1, '2022-06-01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_don_hang_ma_giam`
--

CREATE TABLE `tb_don_hang_ma_giam` (
  `Id` bigint(20) NOT NULL,
  `MaDon` varchar(50) NOT NULL,
  `MaGiamGia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_don_hang_ma_giam`
--

INSERT INTO `tb_don_hang_ma_giam` (`Id`, `MaDon`, `MaGiamGia`) VALUES
(5, 'rwAKiwcu9NZwmjXyuRnB7dLLkvABAY', 'DG7FD8GFDIKODFSH3'),
(6, 'rwAKiwcu9NZwmjXyuRnB7dLLkvABAY', 'F7D98S32K432LK43');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_dot_khuyen_mai`
--

CREATE TABLE `tb_dot_khuyen_mai` (
  `Id` bigint(20) NOT NULL,
  `ThoiGianBD` datetime NOT NULL,
  `ThoiGianKT` datetime NOT NULL,
  `ChietKhau` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_dot_khuyen_mai`
--

INSERT INTO `tb_dot_khuyen_mai` (`Id`, `ThoiGianBD`, `ThoiGianKT`, `ChietKhau`) VALUES
(2, '2022-06-01 20:28:00', '2022-06-07 20:28:00', 20);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_gio_hang`
--

CREATE TABLE `tb_gio_hang` (
  `id` bigint(20) NOT NULL,
  `MaSP` varchar(10) NOT NULL,
  `TaiKhoan` varchar(30) NOT NULL,
  `SoLuong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_gio_hang`
--

INSERT INTO `tb_gio_hang` (`id`, `MaSP`, `TaiKhoan`, `SoLuong`) VALUES
(3, 'SP003', 'gam', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_gio_hang_lua_chon`
--

CREATE TABLE `tb_gio_hang_lua_chon` (
  `Id` bigint(20) NOT NULL,
  `MaGH` bigint(20) NOT NULL,
  `MaLC` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_hinh_anh`
--

CREATE TABLE `tb_hinh_anh` (
  `Id` bigint(20) NOT NULL,
  `MaSP` varchar(10) NOT NULL,
  `DuongDan` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_hinh_anh`
--

INSERT INTO `tb_hinh_anh` (`Id`, `MaSP`, `DuongDan`) VALUES
(1, 'SP001', 'https://res.cloudinary.com/jwb/image/upload/v1651466902/product_avatar/1f95b450eb9d5a3a18b7567324673a3d_xgiapz.jpg'),
(2, 'SP001', 'https://res.cloudinary.com/jwb/image/upload/v1651466925/images/46f537926707eb4f743609d561a31f71_hwilsz.jpg'),
(3, 'SP001', 'https://res.cloudinary.com/jwb/image/upload/v1651466925/images/09b18e1ebce919ce2d1a387b5be9692f_iommcm.jpg'),
(4, 'SP001', 'https://res.cloudinary.com/jwb/image/upload/v1651466926/images/f5490c077f85dd65c680df482b38a357_thlvl7.jpg'),
(9, 'SP001', 'https://res.cloudinary.com/jwb/image/upload/v1651466926/images/f80da192b53072ca2719dabe546773b0_bl8lii.jpg'),
(10, 'SP002', 'https://res.cloudinary.com/jwb/image/upload/v1651466978/product_avatar/3e27f67f087a00b5c9580f28451732d5_are1hc.jpg'),
(11, 'SP002', 'https://res.cloudinary.com/jwb/image/upload/v1651466992/images/7eabbf71b19153da5aa47cd55ab8c994_lsuf3d.jpg'),
(12, 'SP002', 'https://res.cloudinary.com/jwb/image/upload/v1651466992/images/67305a53008f6d27eb014189bf041bb7_tdgbku.jpg'),
(13, 'SP002', 'https://res.cloudinary.com/jwb/image/upload/v1651466992/images/b76d9c653d219d73d04831886316e6cf_jdl7da.jpg'),
(14, 'SP002', 'https://res.cloudinary.com/jwb/image/upload/v1651466992/images/dfd3e7f24ddd10ecd027b913b1b8c6ac_obdrt1.jpg'),
(15, 'SP003', 'https://res.cloudinary.com/jwb/image/upload/v1651467032/product_avatar/6e15fcb0805169d82153f3e5a259180f_xin992.jpg'),
(16, 'SP003', 'https://res.cloudinary.com/jwb/image/upload/v1651467065/images/7b7a820a97ad79831fcf69fff913d4e6_fdepd6.jpg'),
(17, 'SP003', 'https://res.cloudinary.com/jwb/image/upload/v1651467065/images/048b5f86d8fc8605e64690e687f0b4f2_hpe6kt.jpg'),
(18, 'SP003', 'https://res.cloudinary.com/jwb/image/upload/v1651467065/images/261207bf3b8d817ba3e0ae088e405bf0_iflxu4.jpg'),
(19, 'SP003', 'https://res.cloudinary.com/jwb/image/upload/v1651467065/images/b52c59966fc60e23032ad38f5ae30088_1_zkixys.jpg'),
(20, 'SP004', 'https://res.cloudinary.com/jwb/image/upload/v1652016838/product_avatar/2e01e9b1050add664cc22790a091bef8_jgk5gp.jpg'),
(21, 'SP004', 'https://res.cloudinary.com/jwb/image/upload/v1652016867/images/6f541bb13b2647047b519c8521ad8c07_ggkfzb.jpg'),
(22, 'SP004', 'https://res.cloudinary.com/jwb/image/upload/v1652016866/images/52c2d2354039f2600dc9a2146b870de8_q7mtru.jpg'),
(23, 'SP004', 'https://res.cloudinary.com/jwb/image/upload/v1652016866/images/6bd02f3e2ef68a45152d3ca8473d97ed_nbdlxx.jpg'),
(24, 'SP004', 'https://res.cloudinary.com/jwb/image/upload/v1652016866/images/c269b80726e5171de3de0daa2a6a280d_xae5h2.jpg'),
(25, 'SP004', 'https://res.cloudinary.com/jwb/image/upload/v1652016866/images/fe85b3eaf419c5841228814b400bddb0_artud9.jpg'),
(26, 'SP004', 'https://res.cloudinary.com/jwb/image/upload/v1652016866/images/07aacc4041a1a1f2e2a3cbe6b20e8bfe_lfebt6.jpg'),
(27, 'SP004', 'https://res.cloudinary.com/jwb/image/upload/v1652016866/images/93ea4d8a09027bd6f82ea90d74c6fd0b_gfyssy.jpg'),
(28, 'SP004', 'https://res.cloudinary.com/jwb/image/upload/v1652016866/images/8b68a71c91fa3d47b17839dc30114717_fe6ujh.jpg'),
(29, 'SP005', 'https://res.cloudinary.com/jwb/image/upload/v1652016969/product_avatar/1f0e33f153d488c276840cca874943df_e5sunr.jpg'),
(30, 'SP005', 'https://res.cloudinary.com/jwb/image/upload/v1652016938/images/4fb566a961f4a8c1a33167238c28d4cc_kijrcv.jpg'),
(31, 'SP005', 'https://res.cloudinary.com/jwb/image/upload/v1652016938/images/faa9bfdc9f39377e0a386cebfa075fce_j9zmxe.jpg'),
(32, 'SP005', 'https://res.cloudinary.com/jwb/image/upload/v1652016938/images/b626e083cf752de000288a2000f7a154_vthzrc.jpg'),
(33, 'SP005', 'https://res.cloudinary.com/jwb/image/upload/v1652016938/images/61fb39baa8a76767139dc2c6e11a0bbf_krpodp.jpg'),
(34, 'SP005', 'https://res.cloudinary.com/jwb/image/upload/v1652016938/images/9ad0c8d26b54b2c6f81b02e604c2b348_pgw5xm.jpg'),
(35, 'SP006', 'https://res.cloudinary.com/jwb/image/upload/v1652016999/product_avatar/4663deb8c144fe857de072df90043b72_qohwuk.jpg'),
(36, 'SP006', 'https://res.cloudinary.com/jwb/image/upload/v1652017030/images/3b76aa704b170600322eb736a6864f54_pndsbo.jpg'),
(37, 'SP006', 'https://res.cloudinary.com/jwb/image/upload/v1652017030/images/63633f2245454bba517c2c6fd939b7df_mx6fos.jpg'),
(38, 'SP006', 'https://res.cloudinary.com/jwb/image/upload/v1652017030/images/b218247c7e5830e318ba9f7c233374ca_bscgl8.jpg'),
(39, 'SP006', 'https://res.cloudinary.com/jwb/image/upload/v1652017030/images/835e7c9ee630db9a7231e81ccbef5929_m9fx81.jpg'),
(40, 'SP006', 'https://res.cloudinary.com/jwb/image/upload/v1652017030/images/90e53acb43269b28fab23b5d1c43980c_k13qxf.jpg'),
(41, 'SP007', 'https://res.cloudinary.com/jwb/image/upload/v1652017141/product_avatar/f23155162bd0e4f5538f249f54ef218d_kvmacn.jpg'),
(42, 'SP007', 'https://res.cloudinary.com/jwb/image/upload/v1652017086/images/7403f716a400f022a3e9575b68261cff_amzwpr.jpg'),
(43, 'SP007', 'https://res.cloudinary.com/jwb/image/upload/v1652017086/images/64e782fa27d2cb9ecdf97edc66d89606_iv5xpy.jpg'),
(44, 'SP007', 'https://res.cloudinary.com/jwb/image/upload/v1652017086/images/dbf1e3d0b7d3b307f00fb2b4938f17b2_almsfr.jpg'),
(45, 'SP007', 'https://res.cloudinary.com/jwb/image/upload/v1652017086/images/49c85cdf4a8cf3ae081ccd93e174da10_pqekx0.jpg'),
(46, 'SP007', 'https://res.cloudinary.com/jwb/image/upload/v1652017086/images/244a59bd58748408bd071412d091e7e8_rvld96.jpg'),
(47, 'SP007', 'https://res.cloudinary.com/jwb/image/upload/v1652017086/images/d8a5f48240cde02a532f95cf30acde12_c6b7hg.jpg'),
(48, 'SP007', 'https://res.cloudinary.com/jwb/image/upload/v1652017085/images/44913c81601d70c7b4ee7679d7f085e6_hn5gwr.jpg'),
(49, 'SP008', 'https://res.cloudinary.com/jwb/image/upload/v1652017158/product_avatar/68f39f516739b5ce8726c9e59c003a5a_qpfpar.jpg'),
(50, 'SP008', 'https://res.cloudinary.com/jwb/image/upload/v1652017175/images/4a0b2152b9d2eacd80ed0be98830429c_m9cwxl.jpg'),
(51, 'SP008', 'https://res.cloudinary.com/jwb/image/upload/v1652017175/images/ba68f80bf3df64717c4380f4b1df67e3_pastxq.jpg'),
(52, 'SP008', 'https://res.cloudinary.com/jwb/image/upload/v1652017175/images/6aa47a44729343c416a5a2add0ddec82_b8hyss.jpg'),
(53, 'SP008', 'https://res.cloudinary.com/jwb/image/upload/v1652017175/images/2f7f08c150a88519198e56d5594416ac_pqvlgg.jpg'),
(54, 'SP009', 'https://res.cloudinary.com/jwb/image/upload/v1652017239/product_avatar/dd60084ac6c04143c167ccadfeed016b_yezjck.jpg'),
(55, 'SP009', 'https://res.cloudinary.com/jwb/image/upload/v1652017216/images/013ac1ec6c5b18fe8db09d5bf8e181a2_klo3s5.jpg'),
(56, 'SP009', 'https://res.cloudinary.com/jwb/image/upload/v1652017216/images/3c18427b23c73e747c1952c5f6a1cde4_rjkuxt.jpg'),
(57, 'SP009', 'https://res.cloudinary.com/jwb/image/upload/v1652017216/images/dc0496bb0fe7494b488a5e6f5776476d_kbbtt0.jpg'),
(58, 'SP010', 'https://res.cloudinary.com/jwb/image/upload/v1652017257/product_avatar/7058827a2928e0816a3d82dc799405c7_fwlaep.jpg'),
(59, 'SP010', 'https://res.cloudinary.com/jwb/image/upload/v1652017277/images/d44bdef03d3c1d7881f5f71eaaebb77d_vgwejn.jpg'),
(60, 'SP010', 'https://res.cloudinary.com/jwb/image/upload/v1652017277/images/8649e529bdebf939d080e33317d12d80_ck9eba.jpg'),
(61, 'SP010', 'https://res.cloudinary.com/jwb/image/upload/v1652017277/images/bc33cd758d4d75f1438c644c55f48aa7_di5mtj.jpg'),
(62, 'SP010', 'https://res.cloudinary.com/jwb/image/upload/v1652017277/images/37276947f9508bffb5158d56c6ccae20_s3fn6a.jpg'),
(63, 'SP011', 'https://res.cloudinary.com/jwb/image/upload/v1652017367/product_avatar/116677631d6973d2829313161095a7a3_cfznet.jpg'),
(64, 'SP011', 'https://res.cloudinary.com/jwb/image/upload/v1652017335/images/3ad8781181c495ef19fafe10e31dee84_qhgwvr.jpg'),
(65, 'SP011', 'https://res.cloudinary.com/jwb/image/upload/v1652017335/images/54ef42fa37e24b483adbf4b65f434baa_wfp0dv.jpg'),
(66, 'SP011', 'https://res.cloudinary.com/jwb/image/upload/v1652017335/images/8d8a4d280cd63476a5b7126b6352249a_hvxxdy.jpg'),
(67, 'SP011', 'https://res.cloudinary.com/jwb/image/upload/v1652017335/images/bdcf0fce05e45e38891d3b8260744e68_jjmbpm.jpg'),
(68, 'SP011', 'https://res.cloudinary.com/jwb/image/upload/v1652017335/images/186ece05ba52443532e06ad6d2b25939_firbjo.jpg'),
(69, 'SP012', 'https://res.cloudinary.com/jwb/image/upload/v1652017383/product_avatar/623b9ea21d27cc72a51a7cafa839a1cc_fqxn21.jpg'),
(70, 'SP012', 'https://res.cloudinary.com/jwb/image/upload/v1652017402/images/10fba4cf5b5ca569e5c76b55e52772e2_gbsfdw.jpg'),
(71, 'SP012', 'https://res.cloudinary.com/jwb/image/upload/v1652017402/images/7fd787de4064e9d83fc7e93e66aa3391_g4h56l.jpg'),
(72, 'SP012', 'https://res.cloudinary.com/jwb/image/upload/v1652017402/images/7d91f9b69f2a107995a3ff007b8e05d1_wutzor.jpg'),
(73, 'SP013', 'https://res.cloudinary.com/jwb/image/upload/v1652017509/product_avatar/0f22e8801bfbec2fbc948f04690eff47_l2feim.jpg'),
(74, 'SP013', 'https://res.cloudinary.com/jwb/image/upload/v1652017472/images/641f171c12ffa37d03ebeedadea4c7e4_s5hzoy.jpg'),
(75, 'SP013', 'https://res.cloudinary.com/jwb/image/upload/v1652017472/images/1c56e9e39d2b16e917d26183a92e322c_ggtbss.jpg'),
(76, 'SP013', 'https://res.cloudinary.com/jwb/image/upload/v1652017472/images/d5367f7e02f38dbf561569e7f8b4e42b_ljh9qx.jpg'),
(77, 'SP013', 'https://res.cloudinary.com/jwb/image/upload/v1652017472/images/2c3d38aa804dbfb29c997949b4b72c48_xnx0mp.jpg'),
(78, 'SP013', 'https://res.cloudinary.com/jwb/image/upload/v1652017472/images/bc7f699b43d4af662efce3e1cbf51b55_a9knoh.jpg'),
(79, 'SP013', 'https://res.cloudinary.com/jwb/image/upload/v1652017472/images/79a0594dfca5febfd57c6ce9f540bf08_xdm06f.jpg'),
(80, 'SP014', 'https://res.cloudinary.com/jwb/image/upload/v1652012835/product_avatar/09d8894f46785c472c51515e8bb454b1_i7ac5r.jpg'),
(81, 'SP014', 'https://res.cloudinary.com/jwb/image/upload/v1652012867/images/cdd28c59ac2df75b6a1c1176002a7ccb_fb3kxb.jpg '),
(82, 'SP014', 'https://res.cloudinary.com/jwb/image/upload/v1652012867/images/58ad35a5e9e700018198b3a04bfa9318_tkqj8v.jpg '),
(83, 'SP014', 'https://res.cloudinary.com/jwb/image/upload/v1652012867/images/8448f8eb2a6f5e47ee978f5bda6523bb_cnlo6u.jpg'),
(84, 'SP015', 'https://res.cloudinary.com/jwb/image/upload/v1652013465/product_avatar/42e3338bb626f81ed839d9a01b426996_wf7foy.jpg'),
(85, 'SP015', 'https://res.cloudinary.com/jwb/image/upload/v1652013304/images/f22ee7618bf5469aeacfe05a8b8a21c9_jikaqh.jpg'),
(86, 'SP015', 'https://res.cloudinary.com/jwb/image/upload/v1652013304/images/005a359d7b266673acf9e3d8ef3484e8_ktxbcl.jpg'),
(87, 'SP015', 'https://res.cloudinary.com/jwb/image/upload/v1652013304/images/d21a6c0924de442c57e440c17cf7b166_mdps4p.jpg'),
(88, 'SP015', 'https://res.cloudinary.com/jwb/image/upload/v1652013303/images/702190310bc45b9507eaaca38ea35bea_gfpkyk.jpg'),
(89, 'SP015', 'https://res.cloudinary.com/jwb/image/upload/v1652013303/images/7d79d2c03852866020aa34b49ebea23e_y1hvou.jpg'),
(90, 'SP015', 'https://res.cloudinary.com/jwb/image/upload/v1652013303/images/9dd197a4564d3422667c09e569a54222_i7mnta.jpg'),
(91, 'SP015', 'https://res.cloudinary.com/jwb/image/upload/v1652013303/images/b7f56bcabd1e11248381733bce742ab9_dqnajy.jpg'),
(92, 'SP015', 'https://res.cloudinary.com/jwb/image/upload/v1652013304/images/6d69675bdb17bba8600f7e34d8431922_dlhk5q.jpg'),
(93, 'SP016', 'https://res.cloudinary.com/jwb/image/upload/v1652013496/product_avatar/21c3fd3bebb81333cc19b6505231dc25_eckqir.jpg'),
(94, 'SP016', 'https://res.cloudinary.com/jwb/image/upload/v1652013536/images/811826ae45bca703fc6a21e74bd74e58_km81hd.jpg'),
(95, 'SP016', 'https://res.cloudinary.com/jwb/image/upload/v1652013535/images/0cd2a2e5167a6f1bd9797c22485f0ff2_us2lzo.jpg'),
(96, 'SP016', 'https://res.cloudinary.com/jwb/image/upload/v1652013535/images/474fa17d29130302027847f89faa0b11_b9prf2.jpg'),
(97, 'SP016', 'https://res.cloudinary.com/jwb/image/upload/v1652013535/images/07a1162f7cfd390c8fd12f42e4147ac0_h8bkqu.jpg'),
(98, 'SP016', 'https://res.cloudinary.com/jwb/image/upload/v1652013535/images/fb8846ce2889fea986ba5e911b5795be_v7mxhb.jpg'),
(99, 'SP017', 'https://res.cloudinary.com/jwb/image/upload/v1652013709/product_avatar/656708d3fa1e969b2df91bf6668a9deb_ugeybu.jpg'),
(100, 'SP017', 'https://res.cloudinary.com/jwb/image/upload/v1652013650/images/d607e5b6c063ff78beb9a6fefe96a7ac_vplvg7.jpg'),
(101, 'SP017', 'https://res.cloudinary.com/jwb/image/upload/v1652013650/images/f3a838e5fd2e4d40485ca9367659451f_rxt6gt.jpg'),
(102, 'SP017', 'https://res.cloudinary.com/jwb/image/upload/v1652013651/images/65418d51fa22fae27cd40dcb62101eb9_nkzhth.jpg'),
(103, 'SP017', 'https://res.cloudinary.com/jwb/image/upload/v1652013650/images/1bb11bfcb3549da2a0a4dc1e0b3e5656_ze567i.jpg'),
(104, 'SP017', 'https://res.cloudinary.com/jwb/image/upload/v1652013650/images/eb15db5d58e5e1b1f3042557e811e78f_se0dyx.jpg'),
(105, 'SP017', 'https://res.cloudinary.com/jwb/image/upload/v1652013651/images/05889c0559efb2dbdca6c7dd13822fe5_fwioo2.jpg'),
(106, 'SP018', 'https://res.cloudinary.com/jwb/image/upload/v1652013733/product_avatar/0163c6f7615254dbaa7b0f87fc50b987_drsrcr.jpg'),
(107, 'SP018', 'https://res.cloudinary.com/jwb/image/upload/v1652013760/images/1f104eae11a804b866f0a4642d03e996_hyuqqv.jpg'),
(108, 'SP018', 'https://res.cloudinary.com/jwb/image/upload/v1652013760/images/0008d9f71f576fa0f16b90adecf29320_fhnanp.jpg'),
(109, 'SP018', 'https://res.cloudinary.com/jwb/image/upload/v1652013760/images/d07896a474e3f149d8ea57476e8badbc_y3mp28.jpg'),
(110, 'SP018', 'https://res.cloudinary.com/jwb/image/upload/v1652013760/images/3edfa27bde5b9f4381f5a3a4e766ae9f_l6mm12.jpg'),
(111, 'SP019', 'https://res.cloudinary.com/jwb/image/upload/v1652013843/product_avatar/b254f9c86959b4a66d21cd5b04f141ed_zywqyz.jpg'),
(112, 'SP019', 'https://res.cloudinary.com/jwb/image/upload/v1652013807/images/0e9aa6f6ee9563f4f8a9b84324c523a6_zqvs4q.jpg'),
(113, 'SP019', 'https://res.cloudinary.com/jwb/image/upload/v1652013807/images/9c4e20b750b7362b94616a19054f5092_llhtjs.jpg'),
(114, 'SP019', 'https://res.cloudinary.com/jwb/image/upload/v1652013807/images/63bd0ff75ae0b4ac740bd694b6ff6fe4_aoudex.jpg'),
(115, 'SP020', 'https://res.cloudinary.com/jwb/image/upload/v1652013866/product_avatar/a03d20cb0d5cc45989153f68eb07787a_pjxeic.jpg'),
(116, 'SP020', 'https://res.cloudinary.com/jwb/image/upload/v1652013892/images/209ea578c526fef47fce252ac9b2a9cc_a14juu.jpg'),
(117, 'SP020', 'https://res.cloudinary.com/jwb/image/upload/v1652013892/images/a792a36d8727ae23a6d9101640d8a3b7_dhgn9p.jpg'),
(118, 'SP020', 'https://res.cloudinary.com/jwb/image/upload/v1652013892/images/15d54a7303a05a7ef59f20917972a835_jhnxep.jpg'),
(119, 'SP021', 'https://res.cloudinary.com/jwb/image/upload/v1652013998/product_avatar/9c836cd3e4911280c2f5ccf2ff553db3_t6kh53.jpg'),
(120, 'SP021', 'https://res.cloudinary.com/jwb/image/upload/v1652013936/images/92061a4a111a13d87b47eabb117a0888_hdvzs1.jpg'),
(121, 'SP021', 'https://res.cloudinary.com/jwb/image/upload/v1652013936/images/0938a05da3e6761f9f6eb36e155b462c_xhug67.jpg'),
(122, 'SP021', 'https://res.cloudinary.com/jwb/image/upload/v1652013936/images/46ec5396b36a51cbf07453c24091e6bb_v76f1l.jpg'),
(123, 'SP021', 'https://res.cloudinary.com/jwb/image/upload/v1652013936/images/4ecdd613753f25865cf0d882833f2319_jfnk0f.jpg'),
(124, 'SP021', 'https://res.cloudinary.com/jwb/image/upload/v1652013936/images/9bcb4e0f09962f821cc4f697d4e35b54_dcpmsq.jpg'),
(125, 'SP021', 'https://res.cloudinary.com/jwb/image/upload/v1652013936/images/2e0400e38a3335c941a703fe79dc3199_zsfdda.jpg'),
(126, 'SP021', 'https://res.cloudinary.com/jwb/image/upload/v1652013936/images/befd0a92007b067a07728238078f8584_sylzvr.jpg'),
(127, 'SP022', 'https://res.cloudinary.com/jwb/image/upload/v1652014027/product_avatar/38571635fbf2f6b628b3fa299a6a5655_tmvigh.jpg'),
(128, 'SP022', 'https://res.cloudinary.com/jwb/image/upload/v1652014049/images/48bf9aa1c7dddc88641d60e183288c41_s16y7v.jpg'),
(129, 'SP022', 'https://res.cloudinary.com/jwb/image/upload/v1652014049/images/013de953cebba5f40cc4ddfedc72014f_owvivt.jpg'),
(130, 'SP022', 'https://res.cloudinary.com/jwb/image/upload/v1652014049/images/afb5f79989cdcb16ea5b91fac89499ae_asudes.jpg'),
(131, 'SP022', 'https://res.cloudinary.com/jwb/image/upload/v1652014049/images/a54a355601eecb3a82a15acdd531fa5d_aopxpk.jpg'),
(132, 'SP023', 'https://res.cloudinary.com/jwb/image/upload/v1652014147/product_avatar/2bb98e402121619b7a25e7bdb2edb696_kfgwvq.jpg'),
(133, 'SP023', 'https://res.cloudinary.com/jwb/image/upload/v1652014085/images/b97045ed66c520ef9e3ea45b7da55c08_qq7mjg.jpg'),
(134, 'SP023', 'https://res.cloudinary.com/jwb/image/upload/v1652014085/images/5b8deb5764acb5fba11a800b8e08932f_d0t8wf.jpg'),
(135, 'SP023', 'https://res.cloudinary.com/jwb/image/upload/v1652014085/images/0b84e9ba6562d7a181919b9b04eb93cd_qrlh3g.jpg'),
(136, 'SP023', 'https://res.cloudinary.com/jwb/image/upload/v1652014085/images/80d22d670b449187e05fa37a62d2382d_yu3q4m.jpg'),
(137, 'SP023', 'https://res.cloudinary.com/jwb/image/upload/v1652014085/images/b724091ba6135e1e1a1c5005ff4f7e2b_tvr888.jpg'),
(138, 'SP023', 'https://res.cloudinary.com/jwb/image/upload/v1652014085/images/9ad164b00eb60aa8979982251871d9a6_k6pw2q.jpg'),
(139, 'SP024', 'https://res.cloudinary.com/jwb/image/upload/v1652014509/product_avatar/dc423042d75bc8b66e5340558ad2c0d1_ty5brd.jpg'),
(140, 'SP024', 'https://res.cloudinary.com/jwb/image/upload/v1652014542/images/9e1150253db6036b5904d2ae5bc62c82_mvt46u.jpg'),
(141, 'SP024', 'https://res.cloudinary.com/jwb/image/upload/v1652014542/images/32da4a4053939d709ef75ea55280f015_c3kp9i.jpg'),
(142, 'SP024', 'https://res.cloudinary.com/jwb/image/upload/v1652014542/images/10a665da58e20e294dec0e1972eed136_s74uvy.jpg'),
(143, 'SP024', 'https://res.cloudinary.com/jwb/image/upload/v1652014542/images/e11ce401b8f3e5ec092aeeb8b65df889_q1mizn.jpg'),
(144, 'SP024', 'https://res.cloudinary.com/jwb/image/upload/v1652014542/images/72d125f329979fdba59a5d46f122d619_gpd5qt.jpg'),
(145, 'SP024', 'https://res.cloudinary.com/jwb/image/upload/v1652014542/images/cbb932e53606e4380e7b72c3adeb1431_cwkizf.jpg'),
(146, 'SP024', 'https://res.cloudinary.com/jwb/image/upload/v1652014541/images/9ad0c8d26b54b2c6f81b02e604c2b348_lprzht.jpg'),
(147, 'SP025', 'https://res.cloudinary.com/jwb/image/upload/v1652014680/product_avatar/f5079222a0bee004a7d6d8d3827b607a_fzqrvs.jpg'),
(148, 'SP025', 'https://res.cloudinary.com/jwb/image/upload/v1652014620/images/8661da3b67c58a54e5896db3c3541722_msehsh.jpg'),
(149, 'SP025', 'https://res.cloudinary.com/jwb/image/upload/v1652014619/images/e775ef60c63136684ba832517f263c75_fc9zyu.jpg'),
(150, 'SP025', 'https://res.cloudinary.com/jwb/image/upload/v1652014619/images/75d739ef7d73ebcb60b3f065e8c88031_rbo0rb.jpg'),
(151, 'SP025', 'https://res.cloudinary.com/jwb/image/upload/v1652014619/images/45bcce278ee8be4abfad684081175fde_qgrphq.jpg'),
(152, 'SP025', 'https://res.cloudinary.com/jwb/image/upload/v1652014619/images/9ad0c8d26b54b2c6f81b02e604c2b348_vr7gp2.jpg'),
(153, 'SP025', 'https://res.cloudinary.com/jwb/image/upload/v1652014619/images/218dcdeabf43225f3f1324785641ccdb_j0n4bd.jpg'),
(154, 'SP025', 'https://res.cloudinary.com/jwb/image/upload/v1652014619/images/00e6624e07c5dafbfadfae3facf3148c_tzf0ib.jpg'),
(155, 'SP026', 'https://res.cloudinary.com/jwb/image/upload/v1652014699/product_avatar/e8ba0c0cee7db0733a277cbe22d0c256_oc4ifq.jpg'),
(156, 'SP026', 'https://res.cloudinary.com/jwb/image/upload/v1652014737/images/9d849190d70516442cc91c9af47fa633_ygyewy.jpg'),
(157, 'SP026', 'https://res.cloudinary.com/jwb/image/upload/v1652014737/images/dcf0b1aae2dca97888102982315d9eef_c89i4y.jpg'),
(158, 'SP026', 'https://res.cloudinary.com/jwb/image/upload/v1652014737/images/1732d7fd6896fcaa38d07291ff3bf45b_e4cmta.jpg'),
(159, 'SP026', 'https://res.cloudinary.com/jwb/image/upload/v1652014737/images/6ba5478f63d9c7c579905951f918f43b_akseal.jpg'),
(160, 'SP026', 'https://res.cloudinary.com/jwb/image/upload/v1652014737/images/c074980785aa5b4784e8e554e3ff25a4_s7vn2r.jpg '),
(161, 'SP027', 'https://res.cloudinary.com/jwb/image/upload/v1652014829/product_avatar/87c7e15fbb40b05b579b1b26d60aec52_z90iuz.jpg '),
(162, 'SP027', 'https://res.cloudinary.com/jwb/image/upload/v1652014790/images/70ed68ed18f1c3d8d6019a939775daa5_hagbp0.jpg '),
(163, 'SP027', 'https://res.cloudinary.com/jwb/image/upload/v1652014790/images/48abb1fa0f23625a2a01c20b946f1f3b_deipnx.jpg '),
(164, 'SP027', 'https://res.cloudinary.com/jwb/image/upload/v1652014790/images/6b650ef682fa663635d0ce81a16305c8_lj4fwq.jpg '),
(165, 'SP027', 'https://res.cloudinary.com/jwb/image/upload/v1652014790/images/0d589a4e9879ef5e574c04b3476261c9_uj06rb.jpg'),
(166, 'SP027', 'https://res.cloudinary.com/jwb/image/upload/v1652014790/images/6142bb085ea0400bd124a6a807f4d335_zovgyd.jpg'),
(167, 'SP027', 'https://res.cloudinary.com/jwb/image/upload/v1652014790/images/2b96819d1799e1a0b308a5b912994d8d_lbg4ho.jpg'),
(168, 'SP028', 'https://res.cloudinary.com/jwb/image/upload/v1652014850/product_avatar/6e34f11a3d2fd246aa8b9b866cd9f8cf_bjrhvk.jpg'),
(169, 'SP028', 'https://res.cloudinary.com/jwb/image/upload/v1652014889/images/c42b562795b428495b5fe58bfe8b2141_pajawz.jpg'),
(170, 'SP028', 'https://res.cloudinary.com/jwb/image/upload/v1652014889/images/56eb3ad0f6237e4dab032d87bb9b69f5_g7pj5g.jpg'),
(171, 'SP028', 'https://res.cloudinary.com/jwb/image/upload/v1652014889/images/3cd3412e538aac11f36c07ea1112da9a_zze0bm.jpg'),
(172, 'SP028', 'https://res.cloudinary.com/jwb/image/upload/v1652014889/images/bc3bbf60820f83221ab14ed750dce9f4_bdj0bb.jpg'),
(173, 'SP029', 'https://res.cloudinary.com/jwb/image/upload/v1652014982/product_avatar/e81f4e7ab34cf8e20ba4a3fccdc505d5_sppfhe.jpg'),
(174, 'SP029', 'https://res.cloudinary.com/jwb/image/upload/v1652014952/images/705afac71f12ad5569e895b1da2d8805_nz0cdc.jpg'),
(175, 'SP029', 'https://res.cloudinary.com/jwb/image/upload/v1652014953/images/2a7ac2b330c6fad9932ac80596af2ba0_riq72y.jpg'),
(176, 'SP029', 'https://res.cloudinary.com/jwb/image/upload/v1652014952/images/f8d7f877c2d4c8e66c47d63edac16ae9_ozs5tj.jpg'),
(177, 'SP029', 'https://res.cloudinary.com/jwb/image/upload/v1652014953/images/1e46dd03264ffe4f03351896ad679e98_uoayil.jpg'),
(178, 'SP030', 'https://res.cloudinary.com/jwb/image/upload/v1652015019/product_avatar/411313fdc0219a553e8d605dece9e077_s9xn3z.jpg'),
(179, 'SP030', 'https://res.cloudinary.com/jwb/image/upload/v1652015040/images/2264dce68a843957cf6e3dc4b4a7d29f_quqoea.jpg'),
(180, 'SP030', 'https://res.cloudinary.com/jwb/image/upload/v1652015040/images/f2a8dc10e87c3078416ffd3be7451e01_cz0adu.jpg'),
(181, 'SP030', 'https://res.cloudinary.com/jwb/image/upload/v1652015040/images/49f8a89e5c20caa5e9f90bb1974525f0_uwp2lx.jpg'),
(182, 'SP030', 'https://res.cloudinary.com/jwb/image/upload/v1652015040/images/70b13698b3aab7d3c0e4bd073352da8c_sotypn.jpg '),
(183, 'SP031', 'https://res.cloudinary.com/jwb/image/upload/v1652015164/product_avatar/7c4e97b7813daaf2e7204a5939605f85_tlusqt.jpg '),
(184, 'SP031', 'https://res.cloudinary.com/jwb/image/upload/v1652015132/images/00a3b67272f9ea90089d339f1030b6b2_dgcfqg.jpg '),
(185, 'SP031', 'https://res.cloudinary.com/jwb/image/upload/v1652015130/images/7c05f768be418dfae313e660270278bc_jai5f1.jpg '),
(186, 'SP031', 'https://res.cloudinary.com/jwb/image/upload/v1652015130/images/9154b10ee284d8452b270e75e414b7e4_bo6es8.jpg '),
(187, 'SP031', 'https://res.cloudinary.com/jwb/image/upload/v1652015130/images/afb83b30f779b7c7e9e2d560c5042144_nues1j.jpg'),
(188, 'SP031', 'https://res.cloudinary.com/jwb/image/upload/v1652015130/images/a575e90b417840499dc718af741adac6_ed3djh.jpg'),
(189, 'SP032', 'https://res.cloudinary.com/jwb/image/upload/v1652015189/product_avatar/4f89614d870cc476d962f54c910a2174_flwttk.jpg'),
(190, 'SP032', 'https://res.cloudinary.com/jwb/image/upload/v1652015226/images/363ae16c841cdb805c3861ee07a494ea_t3et9y.jpg'),
(191, 'SP032', 'https://res.cloudinary.com/jwb/image/upload/v1652015226/images/e65ac443a2a7de469d11fa0eaea399eb_jaxkfr.jpg'),
(192, 'SP032', 'https://res.cloudinary.com/jwb/image/upload/v1652015226/images/e82bcc956502b080b09ad8728f6a9cac_udfjqx.jpg'),
(193, 'SP032', 'https://res.cloudinary.com/jwb/image/upload/v1652015226/images/c8fee18577f663ca9a0b599149bd92bc_igpe8a.jpg'),
(194, 'SP033', 'https://res.cloudinary.com/jwb/image/upload/v1652015304/product_avatar/06f0775c5a149b0e8310cd675a3525f8_eya2ri.jpg'),
(195, 'SP033', 'https://res.cloudinary.com/jwb/image/upload/v1652015271/images/74366e9ff120b515bdd60862c6c9737b_yuzvxk.jpg'),
(196, 'SP033', 'https://res.cloudinary.com/jwb/image/upload/v1652015271/images/2717957fbeedf24f959d5161dee17849_ipdcbx.jpg'),
(197, 'SP033', 'https://res.cloudinary.com/jwb/image/upload/v1652015272/images/e5a451d78431c542517bac918f5ef03b_ka7j2m.jpg'),
(198, 'SP033', 'https://res.cloudinary.com/jwb/image/upload/v1652015271/images/99ce414544b054b21a1a4f22ad99a672_bth3v1.jpg'),
(199, 'SP033', 'https://res.cloudinary.com/jwb/image/upload/v1652015271/images/7373a0412eb49d14ccaf5ccb57a9a3e7_gamcsp.jpg'),
(200, 'SP033', 'https://res.cloudinary.com/jwb/image/upload/v1652015271/images/5705f26d7cf0bac3c0504b1f7af9a8aa_pahu0d.jpg'),
(201, 'SP034', 'https://res.cloudinary.com/jwb/image/upload/v1652015476/product_avatar/d8f2e4fc2fb281bceb378ae7b5a0c64f_jidlzy.jpg'),
(202, 'SP034', 'https://res.cloudinary.com/jwb/image/upload/v1652015542/images/9fe93631856d56c25510ea60e9bb828e_g5ja12.jpg'),
(203, 'SP034', 'https://res.cloudinary.com/jwb/image/upload/v1652015542/images/1e98ba8083123670a6d0f3939e3543b9_g8ohnp.jpg'),
(204, 'SP034', 'https://res.cloudinary.com/jwb/image/upload/v1652015542/images/2c16f72204d94147983ecccf4e67bbd4_wh2nws.jpg'),
(205, 'SP034', 'https://res.cloudinary.com/jwb/image/upload/v1652015542/images/ed6900fb39e9481126959f0f6fb7e4f3_krhms8.jpg'),
(206, 'SP034', 'https://res.cloudinary.com/jwb/image/upload/v1652015542/images/fc623eab6d08c7c6da79e91ae8750e11_ksoa9g.jpg'),
(207, 'SP035', 'https://res.cloudinary.com/jwb/image/upload/v1652015642/product_avatar/febfc99f8e8ef0f204a529b8a3d870a1_je5n12.jpg'),
(208, 'SP035', 'https://res.cloudinary.com/jwb/image/upload/v1652015612/images/39e0336cfa841c71ecf348c5ea5b5683_gkwiaj.jpg'),
(209, 'SP035', 'https://res.cloudinary.com/jwb/image/upload/v1652015612/images/807346d74e2d26a51519018c56889038_ogw2hh.jpg'),
(210, 'SP035', 'https://res.cloudinary.com/jwb/image/upload/v1652015612/images/c16a0252cbd49bf08b8fa604b41b8036_ynwkjn.jpg'),
(211, 'SP035', 'https://res.cloudinary.com/jwb/image/upload/v1652015612/images/be23094bddb992a57289ddc595c8280d_mjsggd.jpg'),
(212, 'SP036', 'https://res.cloudinary.com/jwb/image/upload/v1652015654/product_avatar/147064714ad762129ff548077b26de6a_fpdvlz.jpg'),
(213, 'SP036', 'https://res.cloudinary.com/jwb/image/upload/v1652015672/images/e6bd06b812b09b9d30f4477b9010189e_dmrskx.jpg'),
(214, 'SP036', 'https://res.cloudinary.com/jwb/image/upload/v1652015672/images/57454a94899aeab6414052f43df14779_dwlq65.jpg'),
(215, 'SP036', 'https://res.cloudinary.com/jwb/image/upload/v1652015672/images/bdd146e24107955d8c327216c2ad1ff9_d29jpo.jpg'),
(216, 'SP037', 'https://res.cloudinary.com/jwb/image/upload/v1652015735/product_avatar/48eb49bdbe8b8f253fa60215c9eb3337_feqc7t.jpg'),
(217, 'SP037', 'https://res.cloudinary.com/jwb/image/upload/v1652015706/images/6f6731a351c6c341687a8a33c167e421_gtl3fg.jpg'),
(218, 'SP037', 'https://res.cloudinary.com/jwb/image/upload/v1652015706/images/18f9ef2fcddc9cf97dea1104a0b7f8ef_eajgp9.jpg'),
(219, 'SP037', 'https://res.cloudinary.com/jwb/image/upload/v1652015706/images/8062eac946a310558edd472790cd4220_sl5pji.jpg'),
(220, 'SP038', 'https://res.cloudinary.com/jwb/image/upload/v1652015751/product_avatar/d855d5c0e5e8bde025a28b08dc813788_ijneti.jpg'),
(221, 'SP038', 'https://res.cloudinary.com/jwb/image/upload/v1652015765/images/e0b9f3f8c5395cc72ce803471e6da678_gavry7.jpg'),
(222, 'SP038', 'https://res.cloudinary.com/jwb/image/upload/v1652015765/images/f3f380a5f7947fc5ec758a6da43ae86c_jxrxpd.jpg'),
(223, 'SP038', 'https://res.cloudinary.com/jwb/image/upload/v1652015765/images/bacd99c10d5fe2ebc5ae9442cabcf086_kmtcil.jpg'),
(224, 'SP038', 'https://res.cloudinary.com/jwb/image/upload/v1652015765/images/8cc8fdba321379fd749b6f33b15f3be4_taqrpn.jpg'),
(225, 'SP039', 'https://res.cloudinary.com/jwb/image/upload/v1652015821/product_avatar/9336e529c0f3d9df8f9c06d62cdaa13e_zhoc71.jpg'),
(226, 'SP039', 'https://res.cloudinary.com/jwb/image/upload/v1652015792/images/5d910d4ac28b9c111938e983e2f75dfc_cf2qfe.jpg'),
(227, 'SP039', 'https://res.cloudinary.com/jwb/image/upload/v1652015792/images/b57c8c485caddf3e8361c1c5abb43b1a_xuk9hm.jpg'),
(228, 'SP039', 'https://res.cloudinary.com/jwb/image/upload/v1652015791/images/9336e529c0f3d9df8f9c06d62cdaa13e_tiem0u.jpg'),
(229, 'SP040', 'https://res.cloudinary.com/jwb/image/upload/v1652015851/product_avatar/184cb51b7c44bef088dbd7ab2d59dbc1_wys1hc.jpg'),
(230, 'SP040', 'https://res.cloudinary.com/jwb/image/upload/v1652015897/images/483bee80f99fffcdb7707f88b9eaabfa_ktgzif.jpg'),
(231, 'SP040', 'https://res.cloudinary.com/jwb/image/upload/v1652015893/images/29fe18d912ea0011fb1a34d1b90be0b6_e0zcez.jpg'),
(232, 'SP040', 'https://res.cloudinary.com/jwb/image/upload/v1652015893/images/5a0da092492806bd0fe814f8bef3b2b6_mi9yrw.jpg'),
(233, 'SP040', 'https://res.cloudinary.com/jwb/image/upload/v1652015893/images/b46487320e9bcbc150ce88f51a72e95a_vaijg0.jpg'),
(234, 'SP041', 'https://res.cloudinary.com/jwb/image/upload/v1652015964/product_avatar/9873a1ca5ff998f722e06ccb3d1ce7aa_tgmwci.jpg'),
(235, 'SP041', 'https://res.cloudinary.com/jwb/image/upload/v1652015933/images/5f88bf607b8feba516ea0a3b96a23135_dbgt4a.jpg'),
(236, 'SP041', 'https://res.cloudinary.com/jwb/image/upload/v1652015933/images/4476f685a082eb097c66df3d61148bd9_yax8au.jpg'),
(237, 'SP041', 'https://res.cloudinary.com/jwb/image/upload/v1652015933/images/18b7396d428e9d963176c16e591f9c9c_suewas.jpg'),
(238, 'SP041', 'https://res.cloudinary.com/jwb/image/upload/v1652015933/images/8734aca212ec8bd806da11f35310635a_x46xsa.jpg'),
(239, 'SP042', 'https://res.cloudinary.com/jwb/image/upload/v1652015980/product_avatar/6aa715abae61ca093d9a189584ed3eef_rxwtz8.jpg'),
(240, 'SP042', 'https://res.cloudinary.com/jwb/image/upload/v1652015996/images/c17ef25d9f0c038b83f756ccfa72f7d5_d9varm.jpg'),
(241, 'SP042', 'https://res.cloudinary.com/jwb/image/upload/v1652015996/images/d9c8bdf0047e7d2d09c7eab995de63f8_tpejdt.jpg'),
(242, 'SP042', 'https://res.cloudinary.com/jwb/image/upload/v1652015996/images/22b09f703e123f4cb00598be0f499a8c_gbb7uj.jpg'),
(243, 'SP042', 'https://res.cloudinary.com/jwb/image/upload/v1652015996/images/722890ea88fc91c7a3d060d57d25171a_yfjwkr.jpg'),
(244, 'SP043', 'https://res.cloudinary.com/jwb/image/upload/v1652016095/product_avatar/8b1c45c0666c7f2c466d7294befc3316_byyja9.jpg'),
(245, 'SP043', 'https://res.cloudinary.com/jwb/image/upload/v1652016058/images/372a0c15aa9dcafbd96cf2e8c8faa8ee_gppxst.jpg'),
(246, 'SP043', 'https://res.cloudinary.com/jwb/image/upload/v1652016058/images/4bfa1240c770a796190d356394f9ee68_fxaxd1.jpg'),
(247, 'SP043', 'https://res.cloudinary.com/jwb/image/upload/v1652016059/images/55783aced894c3de72fb17097c0e68ea_np2r2m.jpg'),
(248, 'SP043', 'https://res.cloudinary.com/jwb/image/upload/v1652016058/images/08c1574fdb5ef6881bbfefb9b2573c39_enocgb.jpg'),
(249, 'SP043', 'https://res.cloudinary.com/jwb/image/upload/v1652016058/images/c55235c8b5163333bf3e8ea861f91b17_oj50kf.jpg'),
(250, 'SP044', 'https://res.cloudinary.com/jwb/image/upload/v1652016113/product_avatar/d1f5d9b86b5fc6b0854e9982a6266fb7_q3lylx.jpg'),
(251, 'SP044', 'https://res.cloudinary.com/jwb/image/upload/v1652016154/images/6bf5602ed8deaa751ada19cd90b10c4e_xbv21f.jpg'),
(252, 'SP044', 'https://res.cloudinary.com/jwb/image/upload/v1652016153/images/7ad533da2d89bb29929138e38270f132_lfd7yl.jpg'),
(253, 'SP044', 'https://res.cloudinary.com/jwb/image/upload/v1652016153/images/53af64ada8271f1cda48aec8b1851f38_f2s12s.jpg'),
(254, 'SP044', 'https://res.cloudinary.com/jwb/image/upload/v1652016153/images/3d5c28fbef2b30eaa2c5a93a8ee0f010_ekg1rr.jpg'),
(255, 'SP044', 'https://res.cloudinary.com/jwb/image/upload/v1652016153/images/2e80903208cc44a765348e9b45447702_wfg6bm.jpg'),
(256, 'SP044', 'https://res.cloudinary.com/jwb/image/upload/v1652016153/images/7ca425f1b487263996ef5d14ab01849e_gorpcw.jpg'),
(257, 'SP045', 'https://res.cloudinary.com/jwb/image/upload/v1652016238/product_avatar/0c052cb4694fa837261b77c2efcb8c19_bbslya.jpg'),
(258, 'SP045', 'https://res.cloudinary.com/jwb/image/upload/v1652016204/images/26ae98b6263938c029390f01289bee80_aywr5h.jpg'),
(259, 'SP045', 'https://res.cloudinary.com/jwb/image/upload/v1652016204/images/660a98b64a45f2f918b5589bedfc45c4_vktyjm.jpg'),
(260, 'SP045', 'https://res.cloudinary.com/jwb/image/upload/v1652016204/images/a2cba8081c2b42b92aacbccff47e5a26_wtkvq3.jpg'),
(261, 'SP045', 'https://res.cloudinary.com/jwb/image/upload/v1652016204/images/395f3196d6f5931a8947a1c03acbf8c8_licrw8.jpg'),
(262, 'SP046', 'https://res.cloudinary.com/jwb/image/upload/v1652016262/product_avatar/ddc3976f060b2f1f6befa6540a7fa7f5_mv1hea.jpg'),
(263, 'SP046', 'https://res.cloudinary.com/jwb/image/upload/v1652016293/images/23b780b35260334d01c300737d0977c3_ncugne.jpg'),
(264, 'SP046', 'https://res.cloudinary.com/jwb/image/upload/v1652016292/images/08bdef6c225574c7133aa3dd469c204c_acjyle.jpg'),
(265, 'SP046', 'https://res.cloudinary.com/jwb/image/upload/v1652016293/images/f18a4521d56b315b6c4cf3f3bc5b2a2e_uywduz.jpg'),
(266, 'SP046', 'https://res.cloudinary.com/jwb/image/upload/v1652016292/images/1748017a5b2dfc2920edd6b7c06de208_qzos9b.jpg'),
(267, 'SP046', 'https://res.cloudinary.com/jwb/image/upload/v1652016292/images/ebfa25e6af407a34d1a2f7e589eaf727_bpopls.jpg'),
(268, 'SP047', 'https://res.cloudinary.com/jwb/image/upload/v1652016370/product_avatar/37070ef62552162f6ec062a23e0f881f_b2evmu.jpg'),
(269, 'SP047', 'https://res.cloudinary.com/jwb/image/upload/v1652016336/images/8c4a142c40b120c05c001cb58fb6ad8d_giddzi.jpg'),
(270, 'SP047', 'https://res.cloudinary.com/jwb/image/upload/v1652016336/images/a55306315f7bac04da484d08ac5c7497_hpxhsm.jpg'),
(271, 'SP047', 'https://res.cloudinary.com/jwb/image/upload/v1652016336/images/3da997ede293fc2008bf52a2abf7f600_upsxda.jpg'),
(272, 'SP047', 'https://res.cloudinary.com/jwb/image/upload/v1652016336/images/922b7c3639b5d63e28ec995f10f66c93_jeorws.jpg'),
(273, 'SP047', 'https://res.cloudinary.com/jwb/image/upload/v1652016336/images/c59076e81c4318d58110e5e7cba91893_bp1xyo.jpg'),
(274, 'SP048', 'https://res.cloudinary.com/jwb/image/upload/v1652016397/product_avatar/eca3abdbefb528e5e8908cffb53a60ce_ngnodm.jpg'),
(275, 'SP048', 'https://res.cloudinary.com/jwb/image/upload/v1652016426/images/28c7980201fdabb28b5ae896a72abc38_unokpm.jpg'),
(276, 'SP048', 'https://res.cloudinary.com/jwb/image/upload/v1652016426/images/7f2c7224325f374bc301d9bc454ca320_bpnf80.jpg'),
(277, 'SP048', 'https://res.cloudinary.com/jwb/image/upload/v1652016427/images/a1d951f6b6c4184daa7bb00e2f2a11b4_ohcg2c.jpg'),
(278, 'SP048', 'https://res.cloudinary.com/jwb/image/upload/v1652016426/images/cb21929d632f0364c44ab2764d99e591_eqy41u.jpg'),
(279, 'SP048', 'https://res.cloudinary.com/jwb/image/upload/v1652016426/images/34274f157732ec6eb4bc5443e5362434_hmgvbs.jpg'),
(280, 'SP048', 'https://res.cloudinary.com/jwb/image/upload/v1652016426/images/2b7e29d50beb82ee0a1642a51a30c7ef_ii1vxn.jpg'),
(281, 'SP049', 'https://res.cloudinary.com/jwb/image/upload/v1652016545/product_avatar/9fe94195dbd4d0782c150c445578b439_qefrab.jpg'),
(282, 'SP049', 'https://res.cloudinary.com/jwb/image/upload/v1652016502/images/1b9eab3d69e6bf1a09932e3669adfd38_k6qu7g.jpg'),
(283, 'SP049', 'https://res.cloudinary.com/jwb/image/upload/v1652016502/images/e7b299652934dec18325e5e4a8a702c4_hu4pfw.jpg'),
(284, 'SP049', 'https://res.cloudinary.com/jwb/image/upload/v1652016502/images/ce50a8be7ce8f972a5e70813d68f3994_twy65j.jpg'),
(285, 'SP049', 'https://res.cloudinary.com/jwb/image/upload/v1652016501/images/9fcce86bc32e153cb754f2d2095fdc0e_bs09g0.jpg'),
(286, 'SP049', 'https://res.cloudinary.com/jwb/image/upload/v1652016501/images/9807eabf85ce42a2e98001108f4d7e28_ppzptb.jpg'),
(287, 'SP050', 'https://res.cloudinary.com/jwb/image/upload/v1652016560/product_avatar/64306885f162258c131c95bc4b01842f_bpeduq.jpg'),
(288, 'SP050', 'https://res.cloudinary.com/jwb/image/upload/v1652016584/images/8f2f146f35f83f7ccc300f51af3ec0e1_cfnfbs.jpg'),
(289, 'SP050', 'https://res.cloudinary.com/jwb/image/upload/v1652016584/images/721e71e9c7c87a5752b2a3e0e82e2c2a_i9utpp.jpg'),
(290, 'SP050', 'https://res.cloudinary.com/jwb/image/upload/v1652016584/images/e6d2f0904ab815fd4641e7b81845bfb6_vvpc7r.jpg'),
(291, 'SP050', 'https://res.cloudinary.com/jwb/image/upload/v1652016584/images/371810696420f5c346592529a55c64b5_pa8ejo.jpg'),
(292, 'SP051', 'https://res.cloudinary.com/jwb/image/upload/v1652016666/product_avatar/ebb6926af55a2727ce315b4dc27f3682_ngkcaz.jpg'),
(293, 'SP051', 'https://res.cloudinary.com/jwb/image/upload/v1652016635/images/34243b71d157d307a5261415d32c0ee5_k3dz14.jpg'),
(294, 'SP051', 'https://res.cloudinary.com/jwb/image/upload/v1652016635/images/e955fda054db12fcd30a959141a91593_j5qxcs.jpg'),
(295, 'SP051', 'https://res.cloudinary.com/jwb/image/upload/v1652016635/images/02a58e66e3e2749c032ac2af7401b7a8_slywv3.jpg'),
(296, 'SP051', 'https://res.cloudinary.com/jwb/image/upload/v1652016634/images/fa0663a4b4782c9be4fcc8d489a9298b_qquqvt.jpg'),
(297, 'SP052', 'https://res.cloudinary.com/jwb/image/upload/v1652016685/product_avatar/f8c46643a3662fa89df9f40a2aefb1be_q9fcyw.jpg'),
(298, 'SP052', 'https://res.cloudinary.com/jwb/image/upload/v1652016716/images/89cc8571cee5d553c8c5e0001e10b834_jt0b0f.jpg'),
(299, 'SP052', 'https://res.cloudinary.com/jwb/image/upload/v1652016716/images/d42c84bad842160561e29c3eabd8d246_hbrdoe.jpg'),
(300, 'SP052', 'https://res.cloudinary.com/jwb/image/upload/v1652016716/images/ca8470d6898e7a60a56ccfec3741f71d_ys863w.jpg'),
(301, 'SP052', 'https://res.cloudinary.com/jwb/image/upload/v1652016716/images/d5a24da7bae7b15e98cae83907b9f672_yuwav5.jpg'),
(302, 'SP052', 'https://res.cloudinary.com/jwb/image/upload/v1652016716/images/ba679a0edc03d6a8b35b87cddb67a1f1_tszkjk.jpg'),
(303, 'SP053', 'https://res.cloudinary.com/jwb/image/upload/v1652016790/product_avatar/146941235c47722199957bcb4abfa903_babgw9.jpg'),
(304, 'SP053', 'https://res.cloudinary.com/jwb/image/upload/v1652016762/images/7ca425f1b487263996ef5d14ab01849e_zt9r5x.jpg'),
(305, 'SP053', 'https://res.cloudinary.com/jwb/image/upload/v1652016762/images/7ad533da2d89bb29929138e38270f132_zauslj.jpg'),
(306, 'SP053', 'https://res.cloudinary.com/jwb/image/upload/v1652016762/images/b422c3edb05b46de62101079f9d82f7e_ytgeig.jpg'),
(307, 'SP053', 'https://res.cloudinary.com/jwb/image/upload/v1652016762/images/7717e83c9591139e43f369d1f5f1bfb5_v6vo7g.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_khach_hang`
--

CREATE TABLE `tb_khach_hang` (
  `MaKH` varchar(20) NOT NULL,
  `TaiKhoan` varchar(30) DEFAULT NULL,
  `HoTen` varchar(30) NOT NULL,
  `GioiTinh` int(11) DEFAULT 1,
  `NgaySinh` date DEFAULT NULL,
  `SDT` varchar(13) NOT NULL,
  `Gmail` varchar(80) DEFAULT NULL,
  `AnhDaiDien` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_khach_hang`
--

INSERT INTO `tb_khach_hang` (`MaKH`, `TaiKhoan`, `HoTen`, `GioiTinh`, `NgaySinh`, `SDT`, `Gmail`, `AnhDaiDien`) VALUES
('6LCVKLEqs8BY117OxZhF', NULL, 'Đinh Tiên Hoàng', 1, NULL, '0831928571', '', NULL),
('7OHL6sAnH4UKUXqBAq0o', 'dang', 'Hải Đăng', 1, '1999-10-18', '0832248959', 'dang18101999@gmail.com', 'http://res.cloudinary.com/jwb/image/upload/v1652972453/user_avatar/gxwu93puhh6cskhd06hk.jpg'),
('I0M2NnebynRz4WE28ax4', NULL, 'Nguyễn Văn A', 1, NULL, '01928375123', NULL, NULL),
('j2RoJqwGNBvlwNKkA2ZT', 'han', 'Ngọc Hân', 2, '2000-05-19', '0325641285', NULL, NULL),
('RzHps7DXS0ZGzfMtWRh3', 'gam', 'Hồng Gấm', 2, '2000-10-26', '0532648592', '18004180@student.vlute.edu.vn', NULL),
('thLK4OGeCMKjyvlzpd1m', NULL, 'Trần Đình Nguyên', 1, NULL, '0392342432', '', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_kh_nhom_kh`
--

CREATE TABLE `tb_kh_nhom_kh` (
  `Id` bigint(20) NOT NULL,
  `MaKH` varchar(20) NOT NULL,
  `MaNhom` varchar(10) NOT NULL,
  `NgayGiaNhap` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_kh_nhom_kh`
--

INSERT INTO `tb_kh_nhom_kh` (`Id`, `MaKH`, `MaNhom`, `NgayGiaNhap`) VALUES
(2, '7OHL6sAnH4UKUXqBAq0o', 'NKH001', '2022-05-25'),
(5, 'j2RoJqwGNBvlwNKkA2ZT', 'NKH001', '2022-05-09'),
(6, 'j2RoJqwGNBvlwNKkA2ZT', 'NKH002', '2022-05-01'),
(7, '7OHL6sAnH4UKUXqBAq0o', 'NGAY18', '2022-06-03'),
(8, '6LCVKLEqs8BY117OxZhF', 'NKH001', '2022-06-03'),
(9, 'I0M2NnebynRz4WE28ax4', 'NKH001', '2022-06-03'),
(11, 'thLK4OGeCMKjyvlzpd1m', 'NKH001', '2022-06-03'),
(12, 'RzHps7DXS0ZGzfMtWRh3', 'NKH001', '2022-06-03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_loai_nguoi_dung`
--

CREATE TABLE `tb_loai_nguoi_dung` (
  `MaLoai` int(11) NOT NULL,
  `TenLoai` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_loai_nguoi_dung`
--

INSERT INTO `tb_loai_nguoi_dung` (`MaLoai`, `TenLoai`) VALUES
(1, 'Khách hàng'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_loai_san_pham`
--

CREATE TABLE `tb_loai_san_pham` (
  `MaLoai` varchar(10) NOT NULL,
  `TenLoai` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_loai_san_pham`
--

INSERT INTO `tb_loai_san_pham` (`MaLoai`, `TenLoai`) VALUES
('1', 'Vòng tay'),
('2', 'Bông tai'),
('3', 'Dây chuyền'),
('4', 'Lắc chân'),
('5', 'Nhẫn');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_lua_chon`
--

CREATE TABLE `tb_lua_chon` (
  `Id` bigint(20) NOT NULL,
  `MaPL` bigint(20) NOT NULL,
  `TenLC` varchar(100) NOT NULL,
  `TrangThai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_lua_chon`
--

INSERT INTO `tb_lua_chon` (`Id`, `MaPL`, `TenLC`, `TrangThai`) VALUES
(1, 1, '16mm', 1),
(2, 1, '18mm', 1),
(3, 1, '20mm', 0),
(4, 1, '22mm', 1),
(6, 2, 'Trái tim', 1),
(7, 2, 'Cỏ 3 lá', 1),
(8, 2, 'Cỏ 4 lá', 0),
(14, 2, 'Tròn', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_ma_giam_gia`
--

CREATE TABLE `tb_ma_giam_gia` (
  `MaGiamGia` varchar(50) NOT NULL,
  `MaKH` varchar(20) NOT NULL,
  `MoTa` varchar(300) NOT NULL,
  `TienGiam` bigint(20) NOT NULL,
  `HanSuDung` datetime NOT NULL,
  `TrangThai` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_ma_giam_gia`
--

INSERT INTO `tb_ma_giam_gia` (`MaGiamGia`, `MaKH`, `MoTa`, `TienGiam`, `HanSuDung`, `TrangThai`) VALUES
('DG7FD8GFDIKODFSH3', '7OHL6sAnH4UKUXqBAq0o', 'Nhân dịp 30k thành viên giảm 30k', 30000, '2022-06-07 20:43:20', 0),
('F6D87FD786F87DS', '7OHL6sAnH4UKUXqBAq0o', 'Giảm 50k', 50000, '2022-06-08 09:15:42', 1),
('F7D98S32K432LK43', '7OHL6sAnH4UKUXqBAq0o', 'Nhân dịp quốc tế thiếu nhi giảm 50K', 50000, '2022-06-01 23:00:00', 0),
('FD78SFD8S7F7DS8', '7OHL6sAnH4UKUXqBAq0o', 'Giảm 20k', 20000, '2022-06-08 09:15:42', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_nguoi_dung`
--

CREATE TABLE `tb_nguoi_dung` (
  `TaiKhoan` varchar(30) NOT NULL,
  `LoaiND` int(11) NOT NULL,
  `MatKhau` varchar(200) NOT NULL,
  `RefreshToken` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_nguoi_dung`
--

INSERT INTO `tb_nguoi_dung` (`TaiKhoan`, `LoaiND`, `MatKhau`, `RefreshToken`) VALUES
('admin', 2, '$2b$10$ucXUEx1AuyFP.Cq/tV9Fi.MgtEcVeaV/e6uPPVpHSNZPGlFBHIPW.', ''),
('dang', 1, '$2b$10$/brDNQvhGQgIFj/DNLIG0uvGszxuJ7D.sExt6qJuUWf4y0/IwnjdO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmciLCJ0aW1lIjoiMjAyMi0wNi0wOFQwNDoxNzo1NC43MDNaIiwiaWF0IjoxNjU0NjYxODc0LCJleHAiOjE2NTUyNjY2NzR9.j8XDDkY9rhzsH6DyB9C5gmBFV5pIQs8f_GKWAnwRTpM'),
('gam', 1, '$2b$10$lVI7SpyIZgWc0H8OMxTc0.J.Sh.X0Qcwe5RqsIafnNO398Q84FXSe', ''),
('han', 1, '$2b$10$ucXUEx1AuyFP.Cq/tV9Fi.MgtEcVeaV/e6uPPVpHSNZPGlFBHIPW.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhbiIsInRpbWUiOiIyMDIyLTA1LTA5VDEyOjE1OjU2Ljk0NloiLCJpYXQiOjE2NTIwOTg1NTYsImV4cCI6MTY1MjcwMzM1Nn0.acb2VB5ki3zdDb9Glv_35HxfW-lFmmGDvdPb2cm9304');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_nhom_khach_hang`
--

CREATE TABLE `tb_nhom_khach_hang` (
  `MaNhom` varchar(10) NOT NULL,
  `TenNhom` varchar(50) NOT NULL,
  `MoTa` varchar(300) NOT NULL,
  `NgayTao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_nhom_khach_hang`
--

INSERT INTO `tb_nhom_khach_hang` (`MaNhom`, `TenNhom`, `MoTa`, `NgayTao`) VALUES
('NGAY18', 'Ngày 18', 'Nhóm khách hàng sinh ngày 18', '2022-06-03'),
('NKH001', 'Bán lẻ', 'Nhóm khách hàng mua ít', '2022-02-10'),
('NKH002', 'Nữ sinh nhật tháng 5', 'Nhóm khách hàng là nữ sinh vào tháng 5', '2022-04-30');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_phan_loai`
--

CREATE TABLE `tb_phan_loai` (
  `MaPL` bigint(20) NOT NULL,
  `MaSP` varchar(10) NOT NULL,
  `TenPL` varchar(100) NOT NULL,
  `TrangThai` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_phan_loai`
--

INSERT INTO `tb_phan_loai` (`MaPL`, `MaSP`, `TenPL`, `TrangThai`) VALUES
(1, 'SP001', 'Size đá', 1),
(2, 'SP001', 'Mặt', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_phuong_thuc_thanh_toan`
--

CREATE TABLE `tb_phuong_thuc_thanh_toan` (
  `Id` int(11) NOT NULL,
  `TenPhuongThuc` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_phuong_thuc_thanh_toan`
--

INSERT INTO `tb_phuong_thuc_thanh_toan` (`Id`, `TenPhuongThuc`) VALUES
(1, 'Thanh toán khi nhận hàng COD'),
(2, 'Thanh toán trực tuyến');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_san_pham`
--

CREATE TABLE `tb_san_pham` (
  `MaSP` varchar(10) NOT NULL,
  `LoaiSP` varchar(10) NOT NULL,
  `TenSP` varchar(150) NOT NULL,
  `MoTa` text NOT NULL,
  `KhoiLuong` int(11) NOT NULL,
  `Gia` bigint(20) NOT NULL,
  `SoLuong` int(11) NOT NULL,
  `AnhBia` varchar(200) NOT NULL,
  `NgayDang` datetime DEFAULT NULL,
  `TrangThai` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_san_pham`
--

INSERT INTO `tb_san_pham` (`MaSP`, `LoaiSP`, `TenSP`, `MoTa`, `KhoiLuong`, `Gia`, `SoLuong`, `AnhBia`, `NgayDang`, `TrangThai`) VALUES
('SP001', '2', 'Bông tai bạc ý 925 nụ đá Silver khuyên tai trang sức', '<blockquote><h2><span style=\"color:hsl(0,0%,0%);\"><strong>MÔ TẢ SẢN PHẨM</strong></span></h2></blockquote><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Bông tai bạc ý 925 nụ đá Silver khuyên tai trang sức&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Số Lượng: 1 chiếc Kích Thước 3/4/5 mm&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Trọng Lượng: 0.16-0.68g&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Thông tin sản phẩm :&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">+ Chất liệu bạc 925 cao cấp 100% nguyên chất - Có chứng nhận trên sp ( shop cam kết )&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">+ Độ trắng sáng cao, không lo bị đen, gỉ, xỉn màu&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">+ Bảo hành miễn phí trọn đời đánh bóng&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Lưu ý: tránh tiếp xúc vs hóa chất , chất tẩy rửa mạnh, có thể làm sáng bằng cách chà kem đánh răng, nước rửa bát, nước chanh ...&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Sản phẩm y hình shop đăng&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-Chất lượng sản phẩm đã được kiểm duyệt&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Hoàn tiền 100% nếu không đúng mẫu mã chất lượng sản phẩm.&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Bạc 925 là gì ?&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-Bạc 925 ( còn gọi là bạc ý , bạc thái ) với thành phần bạc nguyên chất chiếm tới 92.5%, riêng 7.5% còn lại sẽ là hợp chất kim loại khác . Có độ cứng rất cao, độ sáng bóng phù hợp để tạo nên những đồ vật có độ tinh xảo và chính xác đến từng milimet.&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Cảm giác thoải mái không gây dị ứng&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Phong cách trẻ trung, thời thượng&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Sản phẩm hot được nhiều bạn trẻ yêu thích&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Khuyên tai đẹp, độc lạ duy nhất có tại Trangsucsg ( Trang sức SG )</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-----------&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Xuất Xứ: Việt Nam</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-Tên của tổ chức chịu trách nhiệm sản xuất, phân phối: Trang Sức SG&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-Địa chỉ tổ chức chịu trách nhiệm hàng hóa: 1508 lê văn lương xã nhơn đức nhà bè TP HCM</span></p>', 50, 100000, 194, 'https://res.cloudinary.com/jwb/image/upload/v1653387310/product_avatar/1f95b450eb9d5a3a18b7567324673a3d_lose8l.jpg', '2022-05-01 22:56:49', 1),
('SP002', '3', 'Dây chuyền bạc 925 hình cỏ may mắn khảm đá', '<blockquote><h2><span style=\"color:hsl(0,0%,0%);\"><strong>MÔ TẢ SẢN PHẨM</strong></span></h2></blockquote><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Bông tai bạc ý 925 nụ đá Silver khuyên tai trang sức&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Số Lượng: 1 chiếc Kích Thước 3/4/5 mm&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Trọng Lượng: 0.16-0.68g&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Thông tin sản phẩm :&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">+ Chất liệu bạc 925 cao cấp 100% nguyên chất - Có chứng nhận trên sp ( shop cam kết )&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">+ Độ trắng sáng cao, không lo bị đen, gỉ, xỉn màu&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">+ Bảo hành miễn phí trọn đời đánh bóng&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Lưu ý: tránh tiếp xúc vs hóa chất , chất tẩy rửa mạnh, có thể làm sáng bằng cách chà kem đánh răng, nước rửa bát, nước chanh ...&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Sản phẩm y hình shop đăng&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-Chất lượng sản phẩm đã được kiểm duyệt&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Hoàn tiền 100% nếu không đúng mẫu mã chất lượng sản phẩm.&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Bạc 925 là gì ?&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-Bạc 925 ( còn gọi là bạc ý , bạc thái ) với thành phần bạc nguyên chất chiếm tới 92.5%, riêng 7.5% còn lại sẽ là hợp chất kim loại khác . Có độ cứng rất cao, độ sáng bóng phù hợp để tạo nên những đồ vật có độ tinh xảo và chính xác đến từng milimet.&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Cảm giác thoải mái không gây dị ứng&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Phong cách trẻ trung, thời thượng&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Sản phẩm hot được nhiều bạn trẻ yêu thích&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Khuyên tai đẹp, độc lạ duy nhất có tại Trangsucsg ( Trang sức SG )</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-----------&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Xuất Xứ: Việt Nam</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-Tên của tổ chức chịu trách nhiệm sản xuất, phân phối: Trang Sức SG&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-Địa chỉ tổ chức chịu trách nhiệm hàng hóa: 1508 lê văn lương xã nhơn đức nhà bè TP HCM</span></p>', 200, 300000, 495, 'https://res.cloudinary.com/jwb/image/upload/v1651466978/product_avatar/3e27f67f087a00b5c9580f28451732d5_are1hc.jpg', '2022-05-01 22:57:06', 1),
('SP003', '5', 'Set nhẫn hở 17KM bạc thiết kế kiểu trái tim phong cách bụi bặm thời trang', '<blockquote><h2><span style=\"color:hsl(0,0%,0%);\"><strong>MÔ TẢ SẢN PHẨM</strong></span></h2></blockquote><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Bông tai bạc ý 925 nụ đá Silver khuyên tai trang sức&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Số Lượng: 1 chiếc Kích Thước 3/4/5 mm&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Trọng Lượng: 0.16-0.68g&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Thông tin sản phẩm :&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">+ Chất liệu bạc 925 cao cấp 100% nguyên chất - Có chứng nhận trên sp ( shop cam kết )&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">+ Độ trắng sáng cao, không lo bị đen, gỉ, xỉn màu&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">+ Bảo hành miễn phí trọn đời đánh bóng&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Lưu ý: tránh tiếp xúc vs hóa chất , chất tẩy rửa mạnh, có thể làm sáng bằng cách chà kem đánh răng, nước rửa bát, nước chanh ...&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Sản phẩm y hình shop đăng&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-Chất lượng sản phẩm đã được kiểm duyệt&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Hoàn tiền 100% nếu không đúng mẫu mã chất lượng sản phẩm.&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">Bạc 925 là gì ?&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-Bạc 925 ( còn gọi là bạc ý , bạc thái ) với thành phần bạc nguyên chất chiếm tới 92.5%, riêng 7.5% còn lại sẽ là hợp chất kim loại khác . Có độ cứng rất cao, độ sáng bóng phù hợp để tạo nên những đồ vật có độ tinh xảo và chính xác đến từng milimet.&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Cảm giác thoải mái không gây dị ứng&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Phong cách trẻ trung, thời thượng&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Sản phẩm hot được nhiều bạn trẻ yêu thích&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Khuyên tai đẹp, độc lạ duy nhất có tại Trangsucsg ( Trang sức SG )</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-----------&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">- Xuất Xứ: Việt Nam</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-Tên của tổ chức chịu trách nhiệm sản xuất, phân phối: Trang Sức SG&nbsp;</span></p><p style=\"margin-left:0px;\"><span style=\"color:hsl(0,0%,0%);\">-Địa chỉ tổ chức chịu trách nhiệm hàng hóa: 1508 lê văn lương xã nhơn đức nhà bè TP HCM</span></p>', 250, 40000, 838, 'https://res.cloudinary.com/jwb/image/upload/v1651467032/product_avatar/6e15fcb0805169d82153f3e5a259180f_xin992.jpg', '2022-05-01 22:57:14', 1),
('SP004', '1', 'Lắc Tay Bạc 925 thiết kế chiếc lông vũ kèm hạt pha lê sang trọng phong cách ', '<p>➤ Sản phẩm: Lắc Tay Bạc 925 thiết kế chiếc lông vũ kèm hạt pha lê sang trọng phong cách Hàn Quốc MEZI Jewelry - ATJ7048&nbsp;</p><p>➤ Thương hiệu: MEZI_STORE&nbsp;</p><p>➤ Chất Liệu: Bạc 925 Chuẩn Quốc Tế&nbsp;</p><p>➤ Ý nghĩa: Thời trang Giúp các Nàng làm Đẹp. Quà ý nghĩa cho người thân, bạn bè của bạn trong các dịp lễ, sinh nhật&nbsp;</p><p>➤ Sản Phẩm kèm hộp xinh xắn rất đẹp có thể làm quà tặng&nbsp;</p><p>➤ Thời trang theo phong cách Hàn Quốc hiện đại&nbsp;</p><p>➤ Bộ sản phẩm gồm : Vòng tay + Hộp đựng xinh xắn&nbsp;</p><p>➤ Kiểu dáng trẻ trung, đẹp xinh, đáng yêu&nbsp;</p>', 360, 185000, 99, 'https://res.cloudinary.com/jwb/image/upload/v1652016838/product_avatar/2e01e9b1050add664cc22790a091bef8_jgk5gp.jpg ', '2022-05-09 00:00:00', 1),
('SP005', '1', 'Lắc Tay Bạc Blue Peach Daisy Tini', '<p>? Chất liệu: Bạc 925&nbsp;</p><p>? Xi bóng bền màu&nbsp;</p><p>? An toàn cho da, không dị ứng&nbsp;</p><p>? Hỗ trợ kiểm định chất lượng bạc theo yêu cầu&nbsp;</p><p>? Hướng dẫn bảo quản: tránh tiếp xúc hóa chất, chất tẩy rửa mạnh, có thể làm sáng bằng kem đánh răng&nbsp;</p><p>? Lưu ý khi sử dụng: Tránh va đập, sử dụng nhẹ nhàng tránh vướng mắc vào các quần áo&nbsp;</p><p>? Bảo hành: Bảo hành trọn đời</p>', 350, 299000, 150, 'https://res.cloudinary.com/jwb/image/upload/v1652016969/product_avatar/1f0e33f153d488c276840cca874943df_e5sunr.jpg', '2022-05-09 15:00:00', 1),
('SP006', '1', 'Lắc tay bạc nữ họa tiết lập phương đính đá trắng trẻ trung bạc 92 thời trang', '<p>LẮC TAY BẠC XINH – VÒNG TAY VIỄN CHÍ BẢO&nbsp;</p><p>- Chất Liệu : Bạc chuẩn 925&nbsp;</p><p>- Bộ sản phẩm gồm: 1 chiếc lắc tay ( vòng tay)</p><p>- Kiểu Dáng : thiết kế lắc tay nữ tinh tế sắc sảo, vòng tay mẫu mã mới nhất theo Trend !&nbsp;</p><p>- Sản Xuất : lắc tay bạc nữ được sản xuất trực tiếp tại xưởng Việt Nam hoặc nhập khẩu</p>', 340, 446000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652016999/product_avatar/4663deb8c144fe857de072df90043b72_qohwuk.jpg', '2022-05-09 17:30:00', 1),
('SP007', '1', 'Lắc tay bạc nữ KYDOPAL đính đá cao cấp hình bướm ', '<p>Lắc tay bạc Ý 925 cao cấp được thiết kế bởi KYDOPAL Việt Nam&nbsp;</p><p>Vòng tay bạc được thiết kế cập nhật theo xu hướng mới nhất của ngành trang sức bạc phụ kiện. Lắc tay bạc của KYDOPAL dễ dàng phối với rất nhiều bộ trang sức sẵn có tại tủ đồ phụ kiện của bạn.&nbsp;</p><p>THÔNG TIN SẢN PHẨM LẮC TAY BẠC NỮ ĐÍNH ĐÁ KYDOPAL&nbsp;</p><ul style=\"list-style-type:disc;\"><li>Thương hiệu: KYDOPAL - Brand made in VIETNAM&nbsp;</li><li>Chất liệu: Bạc S925 (92,5% Bạc và 7,5% hợp kim cao cấp sản xuất theo công nghệ Bạc Ý)&nbsp;</li><li>Thiết kế ngoài : Bạc 925 - đính đá cao cấp&nbsp;</li></ul>', 254, 299000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652017141/product_avatar/f23155162bd0e4f5538f249f54ef218d_kvmacn.jpg', '2022-05-09 17:40:00', 1),
('SP008', '1', 'Lắc Tay Bạc Nữ Minh Canh Jewelry - Hồ Ly May Mắn', '(index):33 <p>Theo quan niệm phong thủy phương Đông, những cô nàng khi sở hữu những vật có biểu tượng hồ ly như vòng tay đặc biệt là vòng tay hồ ly 9 đuôi sẽ nhận được nhiều may mắn. Đặc biệt là về đường tình duyên, gia đình.&nbsp;</p><p>THÔNG TIN SẢN PHẨM&nbsp;</p><p style=\"margin-left:40px;\">✓ Chất liệu: Bạc ta&nbsp;</p><p style=\"margin-left:40px;\">✓ Xuất xứ: Việt Nam CHÍNH SÁCH BẢO HÀNH&nbsp;</p><p style=\"margin-left:40px;\">✓ Làm sáng miễn phí trọn đời các sản phẩm bạc ( không gồm các sản phẩm xi mạ )&nbsp;</p><p style=\"margin-left:40px;\">✓ Bảo hành gắn đá miễn phí với cỡ đá dưới 2 mm. Với các cỡ đá lớn hơn tùy theo tình trạng, loại đá sẽ miễn phí hoặc tính phí ưu đãi.&nbsp;</p><p style=\"margin-left:40px;\">✓ Những dòng dây mảnh, nhỏ nên rất dễ đứt do người sử dụng gây ra ( shop hỗ trợ hàn nối phí 30,000 đ – 50,000 đ tùy từng sản phẩm )</p>', 249, 249000, 999, 'https://res.cloudinary.com/jwb/image/upload/v1652017158/product_avatar/68f39f516739b5ce8726c9e59c003a5a_qpfpar.jpg', '2022-05-09 17:50:00', 1),
('SP009', '1', 'Lắc tay nữ bạc ta quả cầu gắn đá trắng nhỏ - Bibi silver - BBS', '(index):33 <p>MÔ TẢ SẢN PHẨM TRANG SỨC BẠC BIBI SILVER - GIAN HÀNG CHÍNH HÃNG&nbsp;</p><p>?THÔNG TIN SẢN PHẨM LẮC TAY , LẮC CHÂN BẠC BIBI SILVER&nbsp;</p><p style=\"margin-left:40px;\">- Chất Liệu : Bạc chuẩn, nguyên chất không pha tạp.&nbsp;</p><p style=\"margin-left:40px;\">- Bảo hành, miễn phí làm sáng trọn đời sản phẩm.&nbsp;</p><p style=\"margin-left:40px;\">- Size có sẵn :</p><p style=\"margin-left:80px;\">+Lắc tay nữ dài 15 – 17cm&nbsp;</p><p style=\"margin-left:80px;\">+ 2cm dây phụ&nbsp;</p><p style=\"margin-left:80px;\">+Lắc chân dài 21-22cm&nbsp;</p><p style=\"margin-left:80px;\">+ 2cm dây phụ&nbsp;</p><p style=\"margin-left:80px;\">+ Lắc trẻ em theo cân nặng ( khoảng 13-15cm )&nbsp;</p><p>Với các size không có sẵn các bạn vui lòng liên hệ shop để lấy size nhé&nbsp;</p><p>-Kiểu Dáng : thiết kế tinh tế sắc sảo, mẫu mã mới nhất theo Trend !&nbsp;</p><p>-Sản Xuất : Sản xuất trực tiếp tại xưởng Việt Nam hoặc nhập khẩu</p>', 239, 200000, 797, 'https://res.cloudinary.com/jwb/image/upload/v1652017239/product_avatar/dd60084ac6c04143c167ccadfeed016b_yezjck.jpg', '2022-05-09 18:00:00', 1),
('SP010', '1', 'Lắc tay nữ bạc thật dạng kiềng khắc tên LTN0194 Trang Sức TNJ', '<blockquote><p>MÔ TẢ SẢN PHẨM</p></blockquote><p>&nbsp;Lắc tay nữ bạc thật dạng kiềng khắc tên LTN0194&nbsp;</p><p>- Trang Sức TNJ- Lắc tay nữ bạc thâth khắc tên được thiết kế và sản xuất trên công nghệ hiện đại</p><p>- Đeo lắc tay nữ bạc khắc tên không chỉ làm tăng thêm vẻ đẹp nữ tính và sức cuốn hút mà còn mang lại may mắn và sức khoẻ cho phái nữ&nbsp;</p><p>- Vòng tay nữ bạc LTN0194 còn là món quà tặng ý nghĩa cho gia đình, người thân và bạn bè của bạn.Thông tin chi tiết về lắc tay bạc nữ đẹp:</p><p>- Chất liệu bạc cao cấp 925.&nbsp;</p><p>- Độ trắng sáng cao, không lo bị đen, xỉn màu.</p><p>- Kích cỡ có thể tự điều chỉnh theo cỡ tay</p><p>- Khắc tên trên công nghệ Laser hiện đại nhất hiện nay</p><p>- Bảo hành miễn phí trọn đời đánh bóng, làm mới hoặc gắn lại đá</p><p>- Bạn nhắn tên khắc trong phần Chat hoặc phần ghi chú đơn hàng cho shop nhé</p>', 259, 520000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652017257/product_avatar/7058827a2928e0816a3d82dc799405c7_fwlaep.jpg', '2022-05-09 18:10:00', 1),
('SP011', '1', 'Lắc tay nữ bi bạc cao cấp LTN0250 Trang Sức TNJ', '(index):33 <h3>Quà 20/10 tặng mẹ&nbsp;</h3><p>- Lắc tay nữ bi bạc cao cấp LTN0250&nbsp;</p><p>- Trang Sức TNJ- Lắc tay nữ được thiết kế thời trang, trẻ trung phù hợp với mọi lứa tuổi</p><p>- Phù hợp sử dụng trong các buổi gặp gỡ, tiệc tùng, lễ cưới, lễ đính hôn,... và trong cuộc sống hằng ngày</p><p>- Đeo lắc tay nữ không chỉ mang lại vẻ đẹp cuốn hút mà còn mang lại may mắn đặc biệt trong tình yêu cho nàng</p><p>- Lắc tay nữ bạc còn là món quà tặng ý nghĩa cho người thân, gia đình và bạn bè của bạn&nbsp;</p><h3>Thông tin chi tiết về lắc tay nữ bi bạc:</h3><p style=\"margin-left:40px;\">- Chất liệu bạc cao cấp 925</p><p style=\"margin-left:40px;\">.-Độ trắng sáng cao, không lo bị đen, xỉn màu.</p><p style=\"margin-left:40px;\">- Lắc dài 16cm và có móc chờ điều chỉnh rộng chật</p><p style=\"margin-left:40px;\">- &nbsp;Bảo hành miễn phí trọn đời đánh bóng, làm mới hoặc gắn lại đá</p>', 400, 600000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652017367/product_avatar/116677631d6973d2829313161095a7a3_cfznet.jpg', '2022-05-09 18:20:00', 1),
('SP012', '1', 'Lắc tay nữ cặp đôi Thiên Nga chất liệu bạc ta đính đá cao cấp trang sức Bạc', '<blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p>Lắc tay nữ trang sức Bạc Quang Thản cam kết 100% chất liệu bạc thật không xi mạ nếu quý khách phát hiện giả mạo shop xin hoàn lại tiền gấp 100 lần.</p><p>- Vòng tay chất liệu bạc được thiết kế thanh lịch, trẻ trung phù hợp với mọi lứa tuổi.</p><p>- Lắc tay kiểu lắc mềm thiết kế theo phong cách thời trang dễ kết hợp với trang phục thích hợp sử dụng trong các buổi dạ tiệc, sinh nhật hay sử dụng đeo thời trang hàng ngày, làm quà tặng người thân …</p><p>- Lắc tay nữ được tạo mẫu trên công nghệ 3D hiện đại và hoàn thiện bởi những người thợ kim hoàn tay nghề cao nên sản phẩm luôn chắc chắn, sáng bóng và tỉ mỉ trên mọi chi tiết.</p><p>- Tất cả vòng tay, lắc tay đều được làm bằng chất liệu bạc trắng không xi mạ nên an toàn cho người sử dụng, không gỉ, không bị kích ứng da.&nbsp;</p><p>- Lắc tay đều được gia công nhẵn bóng kiểm tra kĩ lưỡng trước khi xuất xưởng đến tay quý khách hàng.</p><p>- Chế độ bảo hành làm bóng và sửa chữa miễn phí trọn đời.</p><p>- Shop nhận thêm gia công các sản phẩm theo mẫu theo catalog trên hai chất liệu bạc , vàng .&nbsp;</p><h3>THÔNG TIN SẢN PHẨM</h3><p style=\"margin-left:40px;\">- Xuất xứ: Việt nam.</p><p style=\"margin-left:40px;\">- Thương hiệu: Bạc Quang Thản</p><p style=\"margin-left:40px;\">- Chất liệu: Bạc ta cao cấp kết hợp với đá kim cương nhân tạo sáng trắng..</p><p style=\"margin-left:40px;\">- Màu sắc: Màu bạc trắng, chất liệu đá có nhiều màu.</p><p style=\"margin-left:40px;\">- Số lượng: Một lắc tay kèm hộp đựng.</p><p style=\"margin-left:40px;\">- Độ dài : 17-17cm</p><p style=\"margin-left:40px;\">- Kiểu dáng : thời trang, thanh lịch</p><p style=\"margin-left:40px;\">.- Phong cách: cá tính, sang trọng.</p><p style=\"margin-left:40px;\">- Sử dụng: Đeo thời trang nơi công sở, làm quà tặng...v.v</p>', 280, 339000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652017383/product_avatar/623b9ea21d27cc72a51a7cafa839a1cc_fqxn21.jpg', '2022-05-09 18:30:00', 1),
('SP013', '1', 'Vòng tay nữ bạc đẹp hình trái tim đơn giản LTN0178 Trang Sức TNJ', '<blockquote><h2>MÔ TẢ SẢN PHẨM&nbsp;</h2></blockquote><p>Vòng tay nữ bạc đẹp hình trái tim đơn giản LTN0178 - Trang Sức TNJ</p><p>- Lắc tay nữ bạc được thiết kế thời trang, trẻ trung phù hợp với mọi lứa tuổi</p><p>- Phù hợp sử dụng trong các buổi gặp gỡ, tiệc tùng, lễ cưới, lễ đính hôn,... và trong cuộc sống hằng ngày</p><p>- Đeo vòng tay nữ trái tim không chỉ mang lại vẻ đẹp cuốn hút mà còn mang lại may mắn và sức khoẻ cho nàng</p><p>- Lắc tay nữ trái tim còn là món quà tặng ý nghĩa cho người thân, gia đình và bạn bè của bạn&nbsp;</p><h3>Thông tin chi tiết về lắc tay nữ bạc:</h3><p style=\"margin-left:40px;\">- Chất liệu bạc cao cấp 925.</p><p style=\"margin-left:40px;\">- Độ trắng sáng cao, không lo bị đen, xỉn màu.</p><p style=\"margin-left:40px;\">- Lắc dài 16cm và có móc chờ điều chỉnh rộng chật</p><p style=\"margin-left:40px;\">- &nbsp;Bảo hành miễn phí trọn đời đánh bóng, làm mới hoặc gắn lại đá</p>', 375, 350000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652017509/product_avatar/0f22e8801bfbec2fbc948f04690eff47_l2feim.jpg', '2022-05-09 18:39:00', 1),
('SP014', '2', 'Bông tai bạc đính đá PNJSilver XMXMK000078', '<blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p><br>Chất liệu: Bạc 925<br>Xuất xứ Việt Nam<br>- Thông tin bảo hành<br>• Các sản phẩm Bạc sẽ được bảo hành miễn phí 3 tháng đầu về mặt kỹ thuật, nước xi.<br>• Từ tháng 4 đến hết tháng thứ 12, sản phẩm sẽ được bảo hành có tính phí.<br>• Trên 12 tháng Công ty không nhận bảo hành.<br>• Đối với sản phẩm bị oxy hóa, xuống màu, sẽ được siêu âm làm sạch bằng máy chuyên dụng (siêu âm, không xi) miễn phí trọn đời tại cửa hàng.<br>• Thay miễn phí đá CZ, đá tổng hợp trong suốt thời gian sản phẩm được bảo hành.<br>• Riêng đối với dòng sản phẩm charm DIY chỉ nhận bảo hành sản phẩm trong các trường hợp sau:<br>&nbsp; - Sản phẩm là mẫu bạc hoàn toàn (không gắn đá, nhựa, thủy tinh).<br>&nbsp; - Mẫu bạc có phủ colorit.<br>* Không áp dụng bảo hành cho các trường hợp sau:<br>• Dây chuyền, lắc chế tác bị đứt gãy; sản phẩm bị biến dạng hoặc hư hỏng nặng;<br>• Khách hàng cung cấo thông tin truy lục hóa đơn không chính xác.<br>* Đối với dòng sản phẩm charm DIY không nhận bảo hành trong trường hợp sau:<br>&nbsp; - Sản phẩm có gắn đá, nhựa, thủy tinh.<br>&nbsp; - Sản phẩm bị biến dạng, đứt gãy, rớt đá.<br>&nbsp; - Các họa tiết nhỏ, họa tiết phụ bị mất.<br>* Chế độ bảo hành có thể thay đổi theo chính sách PNJ tại từng thời điểm.<br>- Lưu ý khi sử dụng<br>Trang sức bạc đeo lâu ngày có thể bị mờ đi. Bạc bị oxy hóa khi tiếp xúc với không khí, ánh sáng mạnh &nbsp;và các hóa chất như keo xịt tóc, nước hoa, thuốc tẩy, nước biển,…<br>- Hướng dẫn bảo quản<br>Để món trang sức bạc luôn sáng đẹp, bạn nên ngâm và rửa nhẹ nhàng trong nước tẩy rửa nhẹ (nước tẩy rửa chén đĩa, ly tách) pha với nước sạch. Sau đó, rửa lại bằng nước sạch và dùng khăn mềm lau khô thật kỹ. Tuyệt đối không sử dụng nước tẩy rửa có tính chất tẩy mạnh.<br>Để đảm bảo và duy trì vẻ đẹp của trang sức bạc, nên cất giữ và khi đeo tránh va chạm hoặc sử dụng bất kì dụng cụ nào tác động trực tiếp đến món trang sức</p>', 175, 420000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652012835/product_avatar/09d8894f46785c472c51515e8bb454b1_i7ac5r.jpg', '2022-05-09 18:44:00', 1),
('SP015', '2', 'Bông Tai Bạc Hanada Đá CZ 6A Chuẩn 120 Lát Cắt Siêu Lấp Lánh Không ố', '(index):33 <blockquote><h2>MÔ TẢ SẢN PHẨM&nbsp;</h2></blockquote><p>Bông Tai Bạc Cao Cấp Hanada 0397&nbsp;</p><p>Một Hạt Đá Trắng Đen Đơn Giản Đá: CZ&nbsp;</p><p>=&gt; LƯU Ý : Size bông tai 2.5mm rất nhỏ. Phù hợp đối với các bạn đeo nhiều lỗ tai. Nên cân nhắc kĩ trước khi lựa chọn&nbsp;</p><p>- CHẤT LIỆU BẠC PHỦ BẠCH KIM</p>', 15, 82000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652013465/product_avatar/42e3338bb626f81ed839d9a01b426996_wf7foy.jpg', '2022-05-09 18:52:00', 1),
('SP016', '2', 'Bông tai bạc nữ Cửu Vỹ Hồ Ly chất liệu bạc 925 thời trang phụ kiện trang sức', '(index):33 <p>THÔNG TIN SẢN PHẨM : BÔNG TAI BẠC XINH – BÔNG TAI VIỄN CHÍ BẢO&nbsp;</p><p>- Chất Liệu : Bạc chuẩn 925&nbsp;</p><p>- Bộ sản phẩm gồm: 1 đôi Bông tai ( Khuyên tai)&nbsp;</p><p>- Kiểu Dáng : thiết kế bông tai tinh tế sắc sảo, khuyên tai mẫu mã mới nhất theo Trend !&nbsp;</p><p>- Sản Xuất : bông tai bạc nữ được sản xuất trực tiếp tại xưởng Việt Nam hoặc nhập khẩu</p>', 100, 180000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652013496/product_avatar/21c3fd3bebb81333cc19b6505231dc25_eckqir.jpg', '2022-05-09 19:00:00', 1),
('SP017', '2', 'Bông tai bạc QMJ trái tim 3D nạm đá tấm, dáng phông Q045', '(index):33 <h3>THÔNG TIN SẢN PHẨM&nbsp;</h3><p>Khuyên tai bạc 925 cao cấp&nbsp;</p><p>- Chất liệu: ??̣? ??? ??? ??̂́?&nbsp;</p><p>- Kiểu dáng: Thiết kế nhỏ xinh, tinh tế, sắc sảo, kiểu dáng hiện đại</p><p>&nbsp;- Sản xuất: Sản xuất trực tiếp tại xưởng Việt Nam hoặc nhập khẩu&nbsp;</p><p>- Mô tả chi tiết:&nbsp;</p><p style=\"margin-left:40px;\">+ Thiết kế thanh lịch, nữ tính, tinh tế đến từng chi tiết&nbsp;</p><p style=\"margin-left:40px;\">+ Tạo hình trái tim bạc nạm đá tấm tinh xảo, bắt mắt&nbsp;</p><p style=\"margin-left:40px;\">+ Khuyên tai trái tim bạc 925 chắc chắn sẽ là lựa chọn hoàn hảo cho những cô nàng yêu thích trang sức bông tai</p>', 110, 350000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652013709/product_avatar/656708d3fa1e969b2df91bf6668a9deb_ugeybu.jpg', '2022-05-09 19:10:00', 1),
('SP018', '2', 'Bông tai bạc S925 khoen tròn thổ dân đường kính 8mm - Amooi Silver AB37', '(index):33 <blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p>Bông tai bạc S925 khoen tròn thổ dân đường kính 8mm&nbsp;</p><p>- Amooi Silver AB37&nbsp;</p><p>- Chất liệu: bạc S925.&nbsp;</p><p>- Size: freesize, đường kính lọt lòng khoen 8MM.&nbsp;</p><p>- Màu sắc: bạc trắng, cửa hàng có sẵn màu bạc.</p>', 125, 250000, 999, 'https://res.cloudinary.com/jwb/image/upload/v1652013733/product_avatar/0163c6f7615254dbaa7b0f87fc50b987_drsrcr.jpg', '2022-05-09 19:21:00', 1),
('SP019', '2', 'Bông tai cỏ 4 lá nữ bạc đẹp đính đá may mắn BTN0071 Trang Sức TNJ', '<h2>Bông tai cỏ 4 lá nữ bạc đẹp đính đá may mắn BTN0071&nbsp;</h2><h3>- Trang Sức TNJ&nbsp;</h3><p style=\"margin-left:40px;\">❄ Mẫu bông tai được thiết kế thanh lịch, trẻ trung phù hợp với mọi lứa tuổi&nbsp;</p><p style=\"margin-left:40px;\">❄ Phù hợp sử dụng trong các buổi gặp gỡ, tiệc tùng, lễ cưới, lễ đính hôn,... và trong cuộc sống hằng ngày</p><p style=\"margin-left:40px;\">❄ Đeo khuyên tai nữ bạc không chỉ mang lại vẻ đẹp cuốn hút mà còn mang lại may mắn đặc biệt trong tình yêu.&nbsp;</p><p style=\"margin-left:40px;\">❄ Bông tai nữ bạc là món quà hoàn hảo cho người yêu, gia đình hoặc bạn bè của bạn.</p><h3>Thông tin chi tiết về bông tai nữ bạc 925 dễ thương:</h3><p style=\"margin-left:40px;\">- Chất liệu bạc cao cấp 925.-</p><p style=\"margin-left:40px;\">&nbsp;Độ trắng sáng cao, không lo bị đen, xỉn màu.</p><p style=\"margin-left:40px;\">- Khuyên tai nữ được đính đá CZ nhân tạo chống chầy xước&nbsp;</p><p style=\"margin-left:40px;\">- Bảo hành miễn phí trọn đời đánh bóng, làm mới hoặc gắn lại đá</p>', 95, 250000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652013843/product_avatar/b254f9c86959b4a66d21cd5b04f141ed_zywqyz.jpg', '2022-05-09 19:30:00', 1),
('SP020', '2', 'Bông tai nữ Bạc Quang Thản hạt màu trắng kiểu giáng dài chất liệu bạc, phong cách', '(index):33 <blockquote><h2>THÔNG TIN SẢN PHẨM&nbsp;</h2></blockquote><p>- Xuất xứ: Việt nam.&nbsp;</p><p>- Thương hiệu: Bạc Quang Thản&nbsp;</p><p>- Chất liệu: Bạc 925 cao cấp kết hợp với đá kim cương nhân tạo sáng trắng..&nbsp;</p><p>- Màu sắc: Màu bạc trắng, chất liệu đá có nhiều màu.&nbsp;</p><p>- Số lượng: Một đôi bông tai kèm hộp đựng.&nbsp;</p><p>- Kiểu dáng : thời trang, thanh lịch. .</p><p>- Phong cách: cá tính, sang trọng. .</p><p>- Sử dụng: Đeo thời trang nơi công sở, làm quà tặng...v.v</p>', 105, 190000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652013866/product_avatar/a03d20cb0d5cc45989153f68eb07787a_pjxeic.jpg', '2022-05-09 19:38:00', 1),
('SP021', '2', 'Bông Tai Nữ Bạc Ý S925 Dáng Dài Hình Giọt Nước Phong cách hàn quốc -', '<blockquote><h2>&nbsp;Thông tin Sản Phẩm&nbsp;</h2></blockquote><p>+ Chất liệu : Bạc ý S925&nbsp;</p><p>+ Kích thước: Các bạn xem kích thước chi tiêt ở hình ảnh sản phẩm nhé&nbsp;</p><p>+ Đá nhân tạo&nbsp;</p><p>+ Có hộp đi kèm&nbsp;</p><p>+ BNJ cam kết cả về CHẤT LIỆU cũng như KIỂU DÁNG ( đúng với những gì được nêu bật trong phần mô tả sản phẩm, 100% GIỐNG ẢNH).&nbsp;</p>', 102, 159000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652013998/product_avatar/9c836cd3e4911280c2f5ccf2ff553db3_t6kh53.jpg', '2022-05-09 19:45:00', 1),
('SP022', '2', 'Bông tai nữ dáng dài thiên thần tua rua nữ thời trang Hàn Quốc khuyên tai bạc', '<blockquote><h2>??Ô?? ??? ?Ả? ??Ẩ?&nbsp;</h2></blockquote><p>➤ Sản phẩm: Bông tai nữ dáng dài thiên thần tua rua nữ thời trang Hàn Quốc khuyên tai bạc 925 ANTA Jewelry - ATJ8024&nbsp;</p><p>➤ Thương hiệu: ???? ???????&nbsp;</p><p>➤ Ý nghĩa: Thời trang Giúp các Nàng làm Đẹp. Quà ý nghĩa cho người thân, bạn bè của bạn trong các dịp lễ, sinh nhật&nbsp;</p><p>➤ Sản Phẩm kèm hộp xinh xắn rất đẹp có thể làm quà tặng&nbsp;</p><p>➤ Thời trang theo phong cách Hàn Quốc hiện đại</p>', 121, 199000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652014027/product_avatar/38571635fbf2f6b628b3fa299a6a5655_tmvigh.jpg', '2022-05-09 19:58:00', 1),
('SP023', '2', 'Đôi Bông Tai Dáng Dài Mạ Bạc Đính Đá Thời Trang Cho Nữ', '<blockquote><h2>Thông tin sản phẩm&nbsp;</h2></blockquote><p>Loại: Hoa tai&nbsp;</p><p>Giới tính: Phụ nữ&nbsp;</p><p>Chủ đề: Làm đẹp Phong cách thời trang&nbsp;</p><p>Chất liệu: Đồng, Zirconia khối&nbsp;</p><p>Nhân dịp: Tiệc tối, Tiệc, Quà tặng, Hẹn hò, v.v.&nbsp;</p><p>Các tính năng: Zirconia khối tròn, Mạ bạc, Thiết kế đơn giản&nbsp;</p><p>Chiều dài: 2,7cm / 1,06 \", Chiều rộng: 0,8cm / 0,31\" (Xấp xỉ)</p>', 121, 18000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652014147/product_avatar/2bb98e402121619b7a25e7bdb2edb696_kfgwvq.jpg', '2022-05-10 13:10:00', 1),
('SP024', '3', 'Dây Chuyền Bạc Blue Peach Daisy Tini DC329', '<blockquote><h2>MÔ TẢ SẢN PHẨM&nbsp;</h2></blockquote><p>Blue Peach&nbsp;</p><p>- Trang Sức Bạc&nbsp;</p><p>? Thông tin sản phẩm&nbsp;</p><p style=\"margin-left:40px;\">?Chất liệu: Bạc 925&nbsp;</p><p style=\"margin-left:40px;\">? Xi bóng bền màu&nbsp;</p><p style=\"margin-left:40px;\">? An toàn cho da, không dị ứng&nbsp;</p><p style=\"margin-left:40px;\">? Hỗ trợ kiểm định chất lượng bạc theo yêu cầu&nbsp;</p><p style=\"margin-left:40px;\">? Hướng dẫn bảo quản: tránh tiếp xúc hóa chất, chất tẩy rửa mạnh, có thể làm sáng bằng kem đánh răng&nbsp;</p><p style=\"margin-left:40px;\">? Lưu ý khi sử dụng: Tránh va đập, sử dụng nhẹ nhàng tránh vướng mắc vào các quần áo&nbsp;</p><p style=\"margin-left:40px;\">? Bảo hành: Bảo hành trọn đời</p>', 130, 346000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652014509/product_avatar/dc423042d75bc8b66e5340558ad2c0d1_ty5brd.jpg', '2022-05-10 13:15:00', 1),
('SP025', '3', 'Dây Chuyền Bạc Blue Peach Gemma WG DC201', '<blockquote><h2>MÔ TẢ SẢN PHẨM&nbsp;</h2></blockquote><p>? Bạc xịn - Giá xinh ??&nbsp;</p><p>? Chất liệu: Bạc 925&nbsp;</p><p>? Thiết kế thời trang&nbsp;</p><p>? Hướng dẫn bảo quản: tránh tiếp xúc hóa chất, chất tẩy rửa mạnh, có thể làm sáng bằng kem đánh răng&nbsp;</p><p>? Lưu ý khi sự dụng: Tránh va đập, sự dụng nhẹ nhàng tránh vướng mắc vào các quần áo&nbsp;</p><p>? Chế độ hậu mãi: Tặng kèm hộp đựng cao cấp</p>', 98, 590000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652014680/product_avatar/f5079222a0bee004a7d6d8d3827b607a_fzqrvs.jpg', '2022-05-10 13:21:00', 1),
('SP026', '3', 'Dây chuyền bạc KYDOPAL mặt vuông full đá cỡ lớn bạc ý 925 cao cấp 9C11', '(index):33 <blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p>Dây chuyền bạc Ý 925 cao cấp được thiết kế bởi KYDOPAL Việt Nam Dây chuyền bạc được thiết kế cập nhật theo xu hướng mới nhất của ngành trang sức bạc phụ kiện.&nbsp;</p><p>Dây chuyền bạc của KYDOPAL dễ dàng phối với rất nhiều bộ trang sức sẵn có tại tủ đồ phụ kiện của bạn.&nbsp;</p><p>THÔNG TIN SẢN PHẨM DÂY CHUYỀN BẠC NỮ ĐÍNH ĐÁ KYDOPAL&nbsp;</p><p>Thương hiệu : KYDOPAL - Brand made in VIETNAM&nbsp;</p><p>Chất liệu : Bạc S925 (92,5% Bạc và 7,5% hợp kim cao cấp sản xuất theo công nghệ Bạc Ý) T</p><p>hiết kế ngoài : Đính đá cao cấp</p>', 122, 390000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652014699/product_avatar/e8ba0c0cee7db0733a277cbe22d0c256_oc4ifq.jpg', '2022-05-10 13:28:00', 1),
('SP027', '3', 'Dây chuyền bạc nữ Hoa Mai đính đá, vòng cổ nữ bạc 925 thời trang phụ kiện', '<p>THÔNG TIN SẢN PHẨM : DÂY CHUYỀN NỮ BẠC XINH – VÒNG CỔ VIỄN CHÍ BẢO&nbsp;</p><p>- Chất Liệu : Bạc chuẩn 925&nbsp;</p><p>- Bộ sản phẩm gồm: 1 chiếc dây chuyền&nbsp;</p><p>- Kiểu Dáng : thiết kế dây chuyền bạc nữ tinh tế sắc sảo, dây chuyền nữ mẫu mã mới nhất theo Trend !&nbsp;</p><p>- Sản Xuất : vòng cổ bạc nữ được sản xuất trực tiếp tại xưởng Việt Nam hoặc nhập khẩu</p>', 102, 145000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652014829/product_avatar/87c7e15fbb40b05b579b1b26d60aec52_z90iuz.jpg ', '2022-05-10 13:34:00', 1),
('SP028', '3', 'Dây chuyền bạc nữ mặt cá heo Dolphin chất liệu bạc 925 thời trang phụ', '<p>THÔNG TIN SẢN PHẨM : DÂY CHUYỀN NỮ BẠC XINH – VÒNG CỔ VIỄN CHÍ BẢO -</p><p>&nbsp;Chất Liệu : Bạc chuẩn 925&nbsp;</p><p>- Bộ sản phẩm gồm: 1 chiếc dây chuyền&nbsp;</p><p>- Kiểu Dáng : thiết kế dây chuyền bạc nữ tinh tế sắc sảo, dây chuyền nữ mẫu mã mới nhất theo Trend !</p><p>&nbsp;- Sản Xuất : vòng cổ bạc nữ được sản xuất trực tiếp tại xưởng Việt Nam hoặc nhập khẩu</p>', 118, 475000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652014850/product_avatar/6e34f11a3d2fd246aa8b9b866cd9f8cf_bjrhvk.jpg', '2022-05-10 13:39:00', 1),
('SP029', '3', 'Dây chuyền bạc S925 dream catcher - Amooi Silver AD49', '<blockquote><h2>THÔNG TIN SẢN PHẨM:&nbsp;</h2></blockquote><p>Dây chuyền bạc S925 dream catcher&nbsp;</p><p>- Amooi Silver AD49&nbsp;</p><p>- Chất liệu: bạc S925.&nbsp;</p><p>- Size: 40cm + đoạn tăng đưa thêm 5cm.&nbsp;</p><p>- Màu sắc: bạc trắng.</p>', 111, 339000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652014982/product_avatar/e81f4e7ab34cf8e20ba4a3fccdc505d5_sppfhe.jpg', '2022-05-10 13:44:00', 1),
('SP030', '3', 'Dây chuyền cỏ 4 lá bạc Ý xi kim cho những cô nàng tiểu thư, bánh bèo', '(index):33 <blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p>Ryn jewelry cam kết:&nbsp;</p><p>- Chất liệu và kiểu dáng sản phẩm giống hình ảnh và mô tả&nbsp;</p><p>- Tư vấn hỗ trợ 24/24 giải đáp thắc mắc của khách hàng&nbsp;</p><p>- Đóng gói đảm bảo nhất cho sản phẩm đến tay khách hàng&nbsp;</p><p>- Thời gian chuẩn bị hàng từ 1-7 ngày ( sớm nhất có thể)</p>', 99, 862000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652015019/product_avatar/411313fdc0219a553e8d605dece9e077_s9xn3z.jpg', '2022-05-10 13:48:00', 1),
('SP031', '3', 'Dây chuyền kim cương nhân tạo Bạc ý 925 cao cấp nữ giới', '<blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p>Dây chuyền kim cương nhân tạo Bạc ý 925 cao cấp nữ giới&nbsp;</p><p>Số Lượng: 1 chiếc Kích Thước 40+4.5 cm&nbsp;</p><p>Trọng Lượng: 2.85g&nbsp;</p><h3>Thông tin sản phẩm :&nbsp;</h3><p>+ Chất liệu bạc 925 cao cấp 100% nguyên chất&nbsp;</p><p>+ Độ trắng sáng cao, không lo bị đen, gỉ, xỉn màu&nbsp;</p><p>+ Bảo hành miễn phí trọn đời đánh bóng&nbsp;</p><p>- Có chứng nhận trên sp ( shop cam kết )&nbsp;</p><p>Lưu ý: tránh tiếp xúc vs hóa chất , chất tẩy rửa mạnh, có thể làm sáng bằng cách chà kem đánh răng, nước rửa bát, nước chanh ...</p>', 75, 250000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652015164/product_avatar/7c4e97b7813daaf2e7204a5939605f85_tlusqt.jpg', '2022-05-10 13:52:00', 1),
('SP032', '3', 'MallDây chuyền bạc S925 sừng hươu - Amooi Silver AD18', '(index):33 <blockquote><h2>THÔNG TIN SẢN PHẨM:</h2></blockquote><p>Dây chuyền bạc S925 sừng hươu&nbsp;</p><p>- Amooi Silver AD18&nbsp;</p><p>- Chất liệu: bạc S925.&nbsp;</p><p>- Size: chiều dài dây 40cm&nbsp;</p><p>- 45cm có tăng đơ điều chỉnh.&nbsp;</p><p>- Màu sắc: bạc trắng.&nbsp;</p><p>- Chất lượng sản phẩm tốt, bạc đủ tuổi, càng mang càng sáng đẹp.</p>', 110, 319000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652015189/product_avatar/4f89614d870cc476d962f54c910a2174_flwttk.jpg', '2022-05-10 13:58:00', 1),
('SP033', '3', 'Vòng cổ nữ màu bạc phối mặt hình lá bạch quả đơn giản thời trang', '<p>chào mừng đến với cửa hàng Suoha??&nbsp;</p><p>⏰ Sản phẩm của chúng tôi không chỉ là giá cả hợp lý nhất mà còn chất lượng cao!&nbsp;</p><p>⏰ Nếu bạn thích sản phẩm nào, xin vui lòng đặt hàng trong thời gian sớm nhất!&nbsp;</p><p>⏰ Chúng tôi có thể sắp xếp đơn hàng của bạn trong vòng 1-2 ngày làm việc&nbsp;</p><p>? ? ? Các bưu kiện thường mất 5-12 ngày làm việc để đến nơi</p>', 110, 20000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652015304/product_avatar/06f0775c5a149b0e8310cd675a3525f8_eya2ri.jpg', '2022-05-10 14:04:00', 1),
('SP034', '4', 'Lắc Chân Bạc Cao Cấp 925 Hanada Trang Sức Thời Trang Vòng Chân', '<p>Lắc Chân Bạc Cao Cấp 925 Hanada Trang Sức Thời Trang Vòng Chân Mèo Chuông Đơn Giản 0195&nbsp;</p><p>+ Chất liệu: Bạc&nbsp;</p><p>+ Chiều dài : 21cm&nbsp;</p><p>+ tăng đơ 3cm</p>', 110, 20000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652015476/product_avatar/d8f2e4fc2fb281bceb378ae7b5a0c64f_jidlzy.jpg', '2022-05-10 14:07:00', 1),
('SP035', '4', 'Lắc chân bạc S925 - Vòng chân bạc Ý sợi mảnh dễ thương Vườn Trang Sức', '<blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p>Vườn Trang Sức xin chào!!!&nbsp;</p><p>Lắc chân bạc S925</p><p>&nbsp;- Vòng chân bạc Ý sợi mảnh dễ thương Vườn Trang Sức VTSLC00224&nbsp;</p><h3>➤➤ Thông tin Sản Phẩm&nbsp;</h3><p>✔️Chất liệu : Bạc S925&nbsp;</p><p>✔️Kích thước: 20+5cm (Tùy chỉnh theo cỡ chân)&nbsp;</p><p>✔️ Tặng kèm hộp đựng trang sức&nbsp;</p><p>✔️ Tặng kèm túi lưới lụa và quà nhỏ xinh từ 18k - 75k tùy theo giá trị đơn hàng. Mua càng nhiều tặng càng nhiều&nbsp;</p><p>✔️Thiết kế tỉ mỉ, tinh xảo, kiểu dáng nhẹ nhàng nữ tính ko kém phần sang trọng&nbsp;</p><p>✔️Sản phẩm bền màu gần tương đương bạc ta&nbsp;</p><p>✔️Thích hợp mua tự thưởng cho bản thân thêm xinh đẹp hoặc làm quà tặng người thân.</p>', 76, 230000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652015642/product_avatar/febfc99f8e8ef0f204a529b8a3d870a1_je5n12.jpg', '2022-05-10 14:11:00', 1),
('SP036', '4', 'Lắc Chân Bạc Ý 925 Phong Cách Hàn Quốc', '<p>Sản phẩm được thiết kế với những đường nét trẻ trung, năng động nhưng không kém phần nữ tính, giúp các bạn nữ chúng ta nổi bật khi đi dự những buổi party nhẹ nhàng cùng bạn bè.&nbsp;</p><p>Sản phẩm bao gồm: - lắc chân bạc - hộp đựng</p>', 52, 160000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652015654/product_avatar/147064714ad762129ff548077b26de6a_fpdvlz.jpg', '2022-05-10 14:16:00', 1),
('SP037', '4', 'Lắc Chân Nữ Bạc Hiểu Minh LC202X Cỏ 4 Lá Dây Kép Bạc ý', '<blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p>* Thương hiệu: Bạc Hiểu Minh.&nbsp;</p><p>* Xuất xứ: Việt Nam.&nbsp;</p><p>* Độ dài: tiêu chuẩn 30cm quý khách lưu ý nếu trên hình ảnh nếu có 1 đoạn dây nhỏ để điểu chỉnh quý khách hoàn toàn yên tâm vừa với tất cả quý khách.&nbsp;</p><p>* Chất liệu:&nbsp;</p><p>- Bạc Ta 925, đây là loại bạc chất liệu có nguồn gốc tại Việt Nam&nbsp;</p><p>-925 là viết tắt của tỉ lệ 92.5% đây là tiêu chuẩn quốc tế của bạc, trong đó 92.5% là Ag còn lại 7.5% là các hợp kim khác chủ yếu là đồng,kẽm tạo nên độ cứng, sáng bóng, bền đẹp của sản phẩm.&nbsp;</p><p>- Kiểu dáng sang trọng, mẫu mã phong phú.&nbsp;</p><p>- Thiết kế tinh xảo đến từng chi tiết.&nbsp;</p><p>- Sáng bóng bền đẹp theo thời gian.&nbsp;</p><p>- Dễ kết hợp với trang phục.&nbsp;</p><p>- Là phụ kiện giúp bạn thêm phần cá tính.</p>', 109, 410000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652015735/product_avatar/48eb49bdbe8b8f253fa60215c9eb3337_feqc7t.jpg', '2022-05-10 14:20:00', 1),
('SP038', '4', 'Lắc chân nữ bạc ta hình cỏ 4 lá may mắn LCN0068 Trang Sức TNJ', 'Trang Sức TNJ giới thiệu mẫu lắc chân nữ bạc ta, lắc chân bạc nữ hình cỏ 4 lá đẹp LCN0068 - Trang Sức TNJ - Bộ sản phẩm: 1 lắc chân bạc nữ + hộp đựng - Đóng gói: sản phẩm có hộp đựng sang trọng đi kèm - Lắc chân nữ bạc ta LTN0068 rất phù hợp để làm quà tặng cho dịp lễ tết Valentine, 20/10, Noel,... sắp tới. Đây là mẫu vòng chân bạc nữ độc đáo, là món quà ý nghĩa trong các dịp lễ, sinh nhật Thông tin chi tiết về lắc chân bạc nữ đẹp: ❄ Chất liệu bạc cao cấp 925. Độ trắng sáng cao, không lo bị đen, xỉn màu. 92,5% bạc nguyên chất phần còn lại là hợp chất làm tăng độ cứng và sáng bóng cho sản phẩm. ❄ Lắc chân bạc nữ được đính đá Cubic Zirconia nhân tạo chống chầy xước ❄ Bảo hành miễn phí trọn đời đánh bóng, làm mới hoặc gắn lại đá', 45, 300000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652015751/product_avatar/d855d5c0e5e8bde025a28b08dc813788_ijneti.jpg', '2022-05-10 14:27:00', 1),
('SP039', '4', 'Lắc chân nữ bạc thật hình vô cực đính đá đẹp LCN0058 Trang Sức TNJ', '<blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p>Trang Sức TNJ giới thiệu mẫu lắc chân nữ bạc ta, lắc chân bạc nữ hình vô cực LCN0058&nbsp;</p><p>- Trang Sức TNJ - Bộ sản phẩm: 1 lắc chân bạc nữ + hộp đựng&nbsp;</p><p>- Đóng gói: sản phẩm có hộp đựng sang trọng đi kèm&nbsp;</p><p>- Lắc chân nữ bạc thật LTN0058 rất phù hợp để làm quà tặng cho dịp lễ tết Valentine, 20/10, Noel,... sắp tới. Đây là mẫu vòng chân bạc nữ độc đáo, là món quà ý nghĩa trong các dịp lễ, sinh nhật&nbsp;</p><p>Thông tin chi tiết về lắc chân bạc nữ đẹp:&nbsp;</p><p>❄ Chất liệu bạc cao cấp 925.&nbsp;</p><p>❄ Độ trắng sáng cao, không lo bị đen, xỉn màu.&nbsp;</p><p>❄ Lắc chân dài 22cm và có móc chờ điều chỉnh rộng chật&nbsp;</p><p>❄ Lắc chân bạc nữ được đính đá Cubic Zirconia nhân tạo chống chầy xước&nbsp;</p><p>❄ Bảo hành miễn phí trọn đời đánh bóng, làm mới hoặc gắn lại đá</p>', 77, 380000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652015821/product_avatar/9336e529c0f3d9df8f9c06d62cdaa13e_zhoc71.jpg', '2022-05-10 14:31:00', 1),
('SP040', '4', 'Lắc chân nữ bạc thật lắc dream mẫu mới trẻ trung [ JQN- Cam kết bạc]', 'THÔNG TIN SẢN PHẨM - Cam kết: Chuẩn chất liệu bạc ta cao cấp - Chất Liệu : Bạc ta - Size có sẵn : +Lắc tay: 15-17 cm không kể dây phụ +Lắc chân: 21-23 cm không kể dây phụ +Trẻ em: size theo cân nặng, tuổi < Với các size không có sẵn các bạn vui lòng liên hệ shop để lấy size nhé > -Kiểu Dáng : thiết kế tinh tế sắc sảo, mẫu mã mới nhất theo Trend ! -Sản Xuất : Sản xuất trực tiếp tại xưởng Việt Nam hoặc nhập khẩu', 100, 178000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652015851/product_avatar/184cb51b7c44bef088dbd7ab2d59dbc1_wys1hc.jpg', '2022-05-10 14:35:00', 1),
('SP041', '4', 'Lắc chân nữ bạc trăng sao', '(index):33 <p>- Chất liệu: 100% bạc tiêu chuẩn 925 cao cấp, không han gỉ, không dị ứng, dễ làm sáng.&nbsp;</p><p>- Size: 20cm + kèm mối nới -</p><p>&nbsp;Kiểu cách : Thiết kế thanh lịch, trẻ trung, tinh tế, sắc sảo&nbsp;</p><p>- Màu sắc : Sản phẩm được phủ 1 lớp xi bóng trắng bên ngoài để tăng thêm độ bóng, mượt cho sản phẩm.&nbsp;</p><p>- Sản xuất : trực tiếp tại xưởng Việt Nam</p>', 40, 128000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652015964/product_avatar/9873a1ca5ff998f722e06ccb3d1ce7aa_tgmwci.jpg', '2022-05-10 14:38:00', 1),
('SP042', '4', 'Lắc chân, vòng chân bạc 21 Centimeters Mina Trang sức bạc Tiệm bạc 21 Centimeters', '(index):33 <blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p>?Tiệm bạc 21 Centimeters&nbsp;</p><p>- Tiệm Bạc của những cô gái mộng mer&nbsp;</p><p>?Thông tin sản phẩm:&nbsp;</p><p>✔️ Chất liệu: Bạc 925&nbsp;</p><p>✔️ Sản phẩm được đảm bảo về chất lượng, có hỗ trợ kiểm định theo nhu cầu khách hàng (phí 20k)</p>', 57, 295000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652015980/product_avatar/6aa715abae61ca093d9a189584ed3eef_rxwtz8.jpg', '2022-05-10 14:40:00', 1),
('SP043', '4', 'MIRASON - Lắc Chân Bạc 925 Cao Cấp - MLC029', '<h2>? THÔNG TIN SẢN PHẨM&nbsp;</h2><p>&nbsp;- Chất liệu: Bạc 925 cao cấp nguyên chất&nbsp;</p><p>- Màu sắc: Trắng&nbsp;</p><p>- Chất lượng sản phẩm: Chất lượng cao, gia công tỉ mỉ từng chi tiết, vô cùng chắc chắn và dày dặn. Độ bền tốt, càng mang càng sáng.&nbsp;</p><p>- MIRASON luôn cập nhật những mẫu mới thường xuyên, bắt kịp mọi TREND của giới thời trang đẳng cấp nhưng đáng yêu ❤️</p>', 92, 750000, 1000, 'https://res.cloudinary.com/jwb/image/upload/v1652016095/product_avatar/8b1c45c0666c7f2c466d7294befc3316_byyja9.jpg', '2022-05-10 14:42:00', 1),
('SP044', '5', 'Nhẫn bạc cặp tình nhân đẹp khắc tên ND0370 Trang Sức TNJ', '<blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p>Nhẫn cặp tình nhân đẹp khắc tên ND0370&nbsp;</p><p>- Trang Sức TNJ&nbsp;</p><p>- Kích cỡ: nhẫn được làm theo size tay của khách hàng (có hướng dẫn đo size tay chi tiết) hoặc bạn có thể nhắn tin với shop để được tư vấn cụ thể hơn nhé.&nbsp;</p><p>- Sản phẩm có hộp đựng sang trọng đi kèm&nbsp;</p><p>- Đeo nhẫn cặp tình nhân giúp gắn kết tình yêu thêm bền chặt&nbsp;</p><p>- Nhẫn cặp còn là món quà kỉ niệm ý nghĩa của các cặp đôi trong những dịp lễ, sinh nhật, Valentine,...&nbsp;</p><p>- Chất liệu bạc cao cấp 925. - Độ trắng sáng cao, không lo bị đen, xỉn màu.&nbsp;</p><p>- Nhẫn được đính đá CZ nhân tạo chống chầy xước&nbsp;</p><p>- Bảo hành miễn phí trọn đời đánh bóng, làm mới hoặc gắn lại đá&nbsp;</p><p>- Khắc tên, ngày tháng miễn phí theo yêu cầu -</p><p>&nbsp;Bạn nhắn size tay và tên khắc trong phần Chat hoặc phần ghi chú đơn hàng nhé&nbsp;</p><p>- Giao hàng toàn quốc và thanh toán khi nhận được hàng</p>', 155, 580000, 100, 'https://res.cloudinary.com/jwb/image/upload/v1652016113/product_avatar/d1f5d9b86b5fc6b0854e9982a6266fb7_q3lylx.jpg', '2022-05-10 14:48:00', 1),
('SP045', '5', 'Nhẫn bạc nam đính đá cao cấp NNA0166 Trang Sức TNJ', '<blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p>Nhẫn bạc nam đính đá cao cấp NNA0166</p><p>&nbsp;- Trang Sức TNJ</p><p>❄ Mẫu nhẫn bạc nam đính đá được thiết kế thanh lịch, trẻ trung phù hợp với mọi lứa tuổi&nbsp;</p><p>❄ Phù hợp sử dụng trong các buổi gặp gỡ, tiệc tùng, lễ cưới, lễ đính hôn,... và trong cuộc sống hằng ngày&nbsp;</p><p>❄ Mang lại phong cách cá tính thời trang và sức cuốn hút cho người đeo❄ Nhẫn bạc nam còn là món quà hoàn hảo cho người yêu, gia đình hoặc bạn bè của bạn. Mẫu nhẫn bạc nam được thiết kế cách điệu cực HOT&nbsp;</p><p>- sản phẩm độc quyền bởi Trang Sức TNJ&nbsp;</p><p>- Chất liệu bạc đạt chuẩn trên thị trường hiện nay&nbsp;</p><p>- Độ trắng sáng cao, không lo bị đen, xỉn màu.</p><p>&nbsp;- Bảo hành miễn phí trọn đời đánh bóng, làm mới hoặc gắn lại đá&nbsp;</p><p>- Nhẫn nam được đính đá Cubic chống chầy xước</p><p>- Lấy nhẫn theo số đo size tay của khách hàng (có hướng dẫn đo size tay chi tiết) hoặc bạn nhắn tin với shop trong phần Chat để được tư vấn về size tay nhé</p>', 158, 680000, 100, 'https://res.cloudinary.com/jwb/image/upload/v1652016238/product_avatar/0c052cb4694fa837261b77c2efcb8c19_bbslya.jpg', '2022-05-10 14:55:00', 1),
('SP046', '5', 'Nhẫn bạc nữ đính TA tóc cao cấp -Ngọc Quý', '<p>Nhẫn bạc nữ đính TA tóc cao cấp - Ngọc Quý&nbsp;</p><p>?THÔNG TIN SẢN PHẨM&nbsp;</p><p>❖ Chất liệu: Bạc&nbsp;</p><p>❖ Kích thước ni 16,17&nbsp;</p><p>❖ Thương hiệu: NGỌC QUÝ&nbsp;</p><p>❖ Ý nghĩa: May mắn - Bình an - Tài lộc</p>', 58, 1140000, 50, 'https://res.cloudinary.com/jwb/image/upload/v1652016262/product_avatar/ddc3976f060b2f1f6befa6540a7fa7f5_mv1hea.jpg', '2022-05-10 15:00:00', 1),
('SP047', '5', 'Nhẫn bạc nữ mắt xích charm trái tim Yinbe Silver', '(index):33 <blockquote><h2>THÔNG TIN SẢN PHẨM&nbsp;</h2></blockquote><p>Tên sản phẩm: Nhẫn bạc mắt xích charm trái tim chất liệu bạc 925, 92,5% là bạc an toàn cho da không gây kích ứng, không bị đen tróc&nbsp;</p><p>? Độ trắng sáng cao, không lo bị đen, xỉn màu&nbsp;</p><p>? Kích thước : - Nhẫn dây xích: free size có thể điều chỉnh kích thước - Nhẫn mắt xích charm tim size: 3,4 KH muốn làm size bé hoặc to hơn liên hệ với shop để được hỗ trợ chỉnh size theo yêu cầu Sản phẩm được gia công tỉ mỉ tại xưởng gia công tay nghề cao tại Việt Nam. Địa chỉ: 12 Tả Thanh Oai , Thanh Trì, Hà Nội Xuất xứ: Việt Nam Sản phẩm an toàn cho da không gây kích ứng, mẩn ngứa.. Độ trắng sáng cao, không lo bị đen, xỉn màu bền đẹp theo thời gian.</p>', 26, 179000, 50, 'https://res.cloudinary.com/jwb/image/upload/v1652016370/product_avatar/37070ef62552162f6ec062a23e0f881f_b2evmu.jpg', '2022-05-10 15:03:00', 1),
('SP048', '5', 'Nhẫn bạc S925 đá CZ cao cấp minimalist Gix Jewel N24', '<p>Nhẫn bạc S925 đá CZ cao cấp minimalist Gix Jewel&nbsp;</p><h2>?? MIÊU TẢ CHUNG ??&nbsp;</h2><p>* Chất liệu: bạc 925 cao cấp&nbsp;</p><p>* Đá (nếu có): đá nhân tạo màu hoặc kim cương nhân tạo.&nbsp;</p><p>* Sản phẩm được bảo hành trọn đời với phiếu bảo hành đính kèm.</p>', 29, 580000, 50, 'https://res.cloudinary.com/jwb/image/upload/v1652016397/product_avatar/eca3abdbefb528e5e8908cffb53a60ce_ngnodm.jpg', '2022-05-10 15:08:00', 1),
('SP049', '5', 'Nhẫn bạc Ý kiểu nhẫn đôi dây xích Punk – Nhẫn nữ nhẫn bạc cao cấp', '<blockquote><h2>THÔNG TIN SẢN PHẨM</h2></blockquote><p>Nhẫn đôi Punk được thiết kế độc đáo và lạ mắt, mỗi vòng nhẫn là một kiểu khác nhau, được nối với nhau bởi chuỗi dây xích bạc cao cấp.&nbsp;</p><p>Nhẫn được đeo ở hai ngón kế nhau mang đến một phong cách thật Cool.&nbsp;</p><p>? Chất liệu Bạc nguyên chất 925 cao cấp&nbsp;</p><p>? Mỗi sản phẩm đều được gia công tỉ mỉ, sắc nét giúp bạn luôn bắt kịp xu hướng trang sức bạc và phụ kiện thời trang hot nhất.</p>', 48, 250000, 50, 'https://res.cloudinary.com/jwb/image/upload/v1652016545/product_avatar/9fe94195dbd4d0782c150c445578b439_qefrab.jpg', '2022-05-10 15:12:00', 1),
('SP050', '5', 'Nhẫn đôi bạc 925 vô cực đỉnh đá khắc tên ND0181 Trang Sức TNJ', '(index):33 <blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p>Nhẫn đôi bạc 925 vô cực đính đá khắc tên ND0181&nbsp;</p><p>- Trang Sức TNJ&nbsp;</p><p>- Kích cỡ: nhẫn được làm theo size tay của khách hàng (có hướng dẫn đo size tay chi tiết) hoặc bạn có thể nhắn tin với shop để được tư vấn cụ thể hơn nhé.&nbsp;</p><p>- Sản phẩm có hộp đựng sang trọng đi kèm&nbsp;</p><p>- Đeo nhẫn đôi nam nam sẽ giúp tình cảm của 2 bạn thêm gắn kết bền chặt&nbsp;</p><p>- Nhẫn cặp đôi nam nam còn là món quà ý nghĩa lưu giữ kỉ niệm đẹp Thông tin về nhẫn đôi nam nam:&nbsp;</p><p>- Chất liệu bạc cao cấp 925.&nbsp;</p><p>- Độ trắng sáng cao, không lo bị đen, xỉn màu.&nbsp;</p><p>- Nhẫn được đính đá CZ nhân tạo chống chầy xước&nbsp;</p><p>- Khắc tên, ngày tháng miễn phí theo yêu cầu&nbsp;</p><p>- Bảo hành miễn phí trọn đời đánh bóng, làm mới hoặc gắn lại đá</p>', 79, 430000, 50, 'https://res.cloudinary.com/jwb/image/upload/v1652016560/product_avatar/64306885f162258c131c95bc4b01842f_bpeduq.jpg', '2022-05-10 15:16:00', 1);
INSERT INTO `tb_san_pham` (`MaSP`, `LoaiSP`, `TenSP`, `MoTa`, `KhoiLuong`, `Gia`, `SoLuong`, `AnhBia`, `NgayDang`, `TrangThai`) VALUES
('SP051', '5', 'Nhẫn nam bạc thật bản trơn nhám cá tính khắc tên NNA0219 Trang Sức TNJ', '<blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p>Nhẫn nam bạc thật bản trơn nhám cá tính khắc tên NNA0219 -</p><p>&nbsp;Trang Sức TNJ&nbsp;</p><p>❄ Mẫu nhẫn bạc nam không đá được thiết kế thanh lịch, trẻ trung phù hợp với mọi lứa tuổi&nbsp;</p><p>❄ Phù hợp sử dụng trong các buổi gặp gỡ, tiệc tùng, lễ cưới, lễ đính hôn,... và trong cuộc sống hằng ngày&nbsp;</p><p>❄ Mang lại phong cách cá tính thời trang và sức cuốn hút cho người đeo&nbsp;</p><p>❄ Nhẫn bạc nam còn món quà hoàn hảo cho người yêu, gia đình hoặc bạn bè của bạn.Thông tin chi tiết về nhẫn nam bạc:&nbsp;</p><p>- Chất liệu bạc cao cấp 925.&nbsp;</p><p>- Bảo hành miễn phí trọn đời đánh bóng, làm mới hoặc gắn lại đá&nbsp;</p><p>- Nhẫn được khắc tên trên công nghệ Laser hiện đại - Bạn nhắn tên khắc trong phần ghi chú cho shop nhé</p>', 47, 550000, 50, 'https://res.cloudinary.com/jwb/image/upload/v1652016666/product_avatar/ebb6926af55a2727ce315b4dc27f3682_ngkcaz.jpg', '2022-05-10 15:20:00', 1),
('SP052', '5', 'Nhẫn nam bạc thật đính đá mắt xích cá tình NNA0167 Trang Sức TNJ', '<blockquote><h2>MÔ TẢ SẢN PHẨM</h2></blockquote><p>Nhẫn nam bạc thật đính đá mắt xích cá tình NNA0167&nbsp;</p><p>- Trang Sức TNJ&nbsp;</p><p>- Mẫu nhẫn bạc nam được thiết kế thanh lịch, trẻ trung phù hợp với mọi lứa tuổi&nbsp;</p><p>- Phù hợp sử dụng trong các buổi gặp gỡ, tiệc tùng, lễ cưới, lễ đính hôn,... và trong cuộc sống hằng ngày&nbsp;</p><p>- Mang lại phong cách cá tính thời trang và sức cuốn hút cho người đeo, rất phù hợp cho ae mệnh thuỷ&nbsp;</p><p>- Là món quà hoàn hảo cho người yêu, gia đình hoặc bạn bè của bạn. Mẫu nhẫn bạc nam được thiết kế cách điệu cực HOT -</p><p>&nbsp;sản phẩm độc quyền bởi Trang Sức TNJ</p><p>&nbsp;- Chất liệu bạc cao cấp 925.&nbsp;</p><p>- Độ trắng sáng cao, không lo bị đen, xỉn màu.&nbsp;</p><p>- Nhẫn nam được đính đá Cubic chống chầy xước&nbsp;</p><p>- Lấy nhẫn theo số đo size tay của khách hàng (có hướng dẫn đo size tay chi tiết) hoặc bạn nhắn tin với shop trong phần Chat để được tư vấn về size tay nhé</p><p>- Bảo hành miễn phí trọn đời đánh bóng, làm mới hoặc gắn lại đá</p>', 66, 650000, 50, 'https://res.cloudinary.com/jwb/image/upload/v1652016685/product_avatar/f8c46643a3662fa89df9f40a2aefb1be_q9fcyw.jpg', '2022-05-10 15:20:00', 1),
('SP053', '5', 'Nhẫn nữ bạc 925 đính đá cá tính NN0280 Trang Sức TNJ', 'Nhẫn nữ bạc 925 đính đá cá tính NN0280 - Trang Sức TNJ - Nhẫn bạc nữ đơn giản được thiết kế đính đá cách điệu - Đeo nhẫn nữ bạc đính đá sẽ làm tôn thêm vẻ đẹp dịu dàng và mang lại sức cuốn hút cho phái nữ - Nhẫn nữ còn là món quà ý nghĩa cho người thân và bạn bè trong các dịp lễ, sinh nhật,... Thông tin chi tiết về sản phẩm nhẫn nữ bạc đính đá: - Chất liệu bạc cao cấp 925. - Độ trắng sáng cao, không lo bị đen, xỉn màu. - Nhẫn được đính đá Cubic Zirconia chống chầy xước - Bảo hành miễn phí trọn đời đánh bóng, làm mới hoặc gắn lại đá', 44, 350000, 50, 'https://res.cloudinary.com/jwb/image/upload/v1652016790/product_avatar/146941235c47722199957bcb4abfa903_babgw9.jpg', '2022-05-10 15:28:00', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_san_pham_khuyen_mai`
--

CREATE TABLE `tb_san_pham_khuyen_mai` (
  `Id` bigint(2) NOT NULL,
  `MaSP` varchar(10) NOT NULL,
  `MaDotKM` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_san_pham_khuyen_mai`
--

INSERT INTO `tb_san_pham_khuyen_mai` (`Id`, `MaSP`, `MaDotKM`) VALUES
(3, 'SP001', 2),
(4, 'SP002', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tb_thong_tin_nhan_vien`
--

CREATE TABLE `tb_thong_tin_nhan_vien` (
  `MaNV` varchar(20) NOT NULL,
  `TaiKhoan` varchar(30) DEFAULT NULL,
  `HoTen` varchar(30) NOT NULL,
  `GioiTinh` int(11) DEFAULT NULL,
  `NgaySinh` date DEFAULT NULL,
  `SDT` varchar(13) NOT NULL,
  `Gmail` varchar(80) DEFAULT NULL,
  `AnhDaiDien` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tb_thong_tin_nhan_vien`
--

INSERT INTO `tb_thong_tin_nhan_vien` (`MaNV`, `TaiKhoan`, `HoTen`, `GioiTinh`, `NgaySinh`, `SDT`, `Gmail`, `AnhDaiDien`) VALUES
('ju18du3jfhGYWK4WsLmJ', 'admin', 'Đăng Huỳnh', 1, '1999-10-18', '0192384172', 'example@gmail.com', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `tb_anh_bia`
--
ALTER TABLE `tb_anh_bia`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `tb_chien_dich`
--
ALTER TABLE `tb_chien_dich`
  ADD PRIMARY KEY (`MaCD`),
  ADD KEY `fk_cd_nhomkh` (`NhomKH`);

--
-- Chỉ mục cho bảng `tb_chi_tiet_chien_dich`
--
ALTER TABLE `tb_chi_tiet_chien_dich`
  ADD PRIMARY KEY (`MaCD`,`MaKH`),
  ADD KEY `fk_ctcd_kh` (`MaKH`);

--
-- Chỉ mục cho bảng `tb_chi_tiet_don`
--
ALTER TABLE `tb_chi_tiet_don`
  ADD PRIMARY KEY (`MaDon`,`MaSP`),
  ADD KEY `fk_ctd_sp` (`MaSP`);

--
-- Chỉ mục cho bảng `tb_ct_don_lua_chon`
--
ALTER TABLE `tb_ct_don_lua_chon`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_ctdlc_madon` (`MaDon`),
  ADD KEY `fk_ctdlc_masp` (`MaSP`),
  ADD KEY `fk_ctdlc_lc` (`MaLC`);

--
-- Chỉ mục cho bảng `tb_danh_gia`
--
ALTER TABLE `tb_danh_gia`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_danhgia_sp` (`MaSP`),
  ADD KEY `fk_danh_gia_don_hang` (`MaDon`),
  ADD KEY `fk_danh_gia_nguoi_dung` (`TaiKhoan`);

--
-- Chỉ mục cho bảng `tb_dia_chi`
--
ALTER TABLE `tb_dia_chi`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `tb_dieu_kien_nhom`
--
ALTER TABLE `tb_dieu_kien_nhom`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_dknhom_nhom` (`MaNhom`);

--
-- Chỉ mục cho bảng `tb_don_hang`
--
ALTER TABLE `tb_don_hang`
  ADD PRIMARY KEY (`MaDon`),
  ADD KEY `fk_dh_kh` (`MaKH`);

--
-- Chỉ mục cho bảng `tb_don_hang_ma_giam`
--
ALTER TABLE `tb_don_hang_ma_giam`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_dgmg_dh` (`MaDon`),
  ADD KEY `fk_dhmg_mg` (`MaGiamGia`);

--
-- Chỉ mục cho bảng `tb_dot_khuyen_mai`
--
ALTER TABLE `tb_dot_khuyen_mai`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `tb_gio_hang`
--
ALTER TABLE `tb_gio_hang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_giohang_nguoidung` (`TaiKhoan`),
  ADD KEY `fk_giohang_sp` (`MaSP`);

--
-- Chỉ mục cho bảng `tb_gio_hang_lua_chon`
--
ALTER TABLE `tb_gio_hang_lua_chon`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_ghlc_gh` (`MaGH`),
  ADD KEY `fk_ghlc_lc` (`MaLC`);

--
-- Chỉ mục cho bảng `tb_hinh_anh`
--
ALTER TABLE `tb_hinh_anh`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_ha_sp` (`MaSP`);

--
-- Chỉ mục cho bảng `tb_khach_hang`
--
ALTER TABLE `tb_khach_hang`
  ADD PRIMARY KEY (`MaKH`),
  ADD KEY `fk_kh_nd` (`TaiKhoan`);

--
-- Chỉ mục cho bảng `tb_kh_nhom_kh`
--
ALTER TABLE `tb_kh_nhom_kh`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_nkh_nhom` (`MaNhom`),
  ADD KEY `fk_nkh_khach_hang` (`MaKH`);

--
-- Chỉ mục cho bảng `tb_loai_nguoi_dung`
--
ALTER TABLE `tb_loai_nguoi_dung`
  ADD PRIMARY KEY (`MaLoai`);

--
-- Chỉ mục cho bảng `tb_loai_san_pham`
--
ALTER TABLE `tb_loai_san_pham`
  ADD PRIMARY KEY (`MaLoai`);

--
-- Chỉ mục cho bảng `tb_lua_chon`
--
ALTER TABLE `tb_lua_chon`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_lc_pl` (`MaPL`);

--
-- Chỉ mục cho bảng `tb_ma_giam_gia`
--
ALTER TABLE `tb_ma_giam_gia`
  ADD PRIMARY KEY (`MaGiamGia`),
  ADD KEY `fk_magiam_kh` (`MaKH`);

--
-- Chỉ mục cho bảng `tb_nguoi_dung`
--
ALTER TABLE `tb_nguoi_dung`
  ADD PRIMARY KEY (`TaiKhoan`),
  ADD KEY `fk_nd_loaind` (`LoaiND`);

--
-- Chỉ mục cho bảng `tb_nhom_khach_hang`
--
ALTER TABLE `tb_nhom_khach_hang`
  ADD PRIMARY KEY (`MaNhom`);

--
-- Chỉ mục cho bảng `tb_phan_loai`
--
ALTER TABLE `tb_phan_loai`
  ADD PRIMARY KEY (`MaPL`),
  ADD KEY `fk_PL_SP` (`MaSP`);

--
-- Chỉ mục cho bảng `tb_phuong_thuc_thanh_toan`
--
ALTER TABLE `tb_phuong_thuc_thanh_toan`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `tb_san_pham`
--
ALTER TABLE `tb_san_pham`
  ADD PRIMARY KEY (`MaSP`),
  ADD KEY `fk_sp_lsp` (`LoaiSP`);

--
-- Chỉ mục cho bảng `tb_san_pham_khuyen_mai`
--
ALTER TABLE `tb_san_pham_khuyen_mai`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_spkm_km` (`MaDotKM`),
  ADD KEY `fk_spkm_sp` (`MaSP`);

--
-- Chỉ mục cho bảng `tb_thong_tin_nhan_vien`
--
ALTER TABLE `tb_thong_tin_nhan_vien`
  ADD PRIMARY KEY (`MaNV`),
  ADD KEY `fk_nv_nd` (`TaiKhoan`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `tb_anh_bia`
--
ALTER TABLE `tb_anh_bia`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tb_ct_don_lua_chon`
--
ALTER TABLE `tb_ct_don_lua_chon`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `tb_danh_gia`
--
ALTER TABLE `tb_danh_gia`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `tb_dia_chi`
--
ALTER TABLE `tb_dia_chi`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `tb_dieu_kien_nhom`
--
ALTER TABLE `tb_dieu_kien_nhom`
  MODIFY `Id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `tb_don_hang_ma_giam`
--
ALTER TABLE `tb_don_hang_ma_giam`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `tb_dot_khuyen_mai`
--
ALTER TABLE `tb_dot_khuyen_mai`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `tb_gio_hang`
--
ALTER TABLE `tb_gio_hang`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `tb_gio_hang_lua_chon`
--
ALTER TABLE `tb_gio_hang_lua_chon`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `tb_hinh_anh`
--
ALTER TABLE `tb_hinh_anh`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=326;

--
-- AUTO_INCREMENT cho bảng `tb_kh_nhom_kh`
--
ALTER TABLE `tb_kh_nhom_kh`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `tb_loai_nguoi_dung`
--
ALTER TABLE `tb_loai_nguoi_dung`
  MODIFY `MaLoai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `tb_lua_chon`
--
ALTER TABLE `tb_lua_chon`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `tb_phan_loai`
--
ALTER TABLE `tb_phan_loai`
  MODIFY `MaPL` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `tb_phuong_thuc_thanh_toan`
--
ALTER TABLE `tb_phuong_thuc_thanh_toan`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `tb_san_pham_khuyen_mai`
--
ALTER TABLE `tb_san_pham_khuyen_mai`
  MODIFY `Id` bigint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `tb_chien_dich`
--
ALTER TABLE `tb_chien_dich`
  ADD CONSTRAINT `fk_cd_nhomkh` FOREIGN KEY (`NhomKH`) REFERENCES `tb_nhom_khach_hang` (`MaNhom`);

--
-- Các ràng buộc cho bảng `tb_chi_tiet_chien_dich`
--
ALTER TABLE `tb_chi_tiet_chien_dich`
  ADD CONSTRAINT `fk_ctcd_cd` FOREIGN KEY (`MaCD`) REFERENCES `tb_chien_dich` (`MaCD`),
  ADD CONSTRAINT `fk_ctcd_kh` FOREIGN KEY (`MaKH`) REFERENCES `tb_khach_hang` (`MaKH`);

--
-- Các ràng buộc cho bảng `tb_chi_tiet_don`
--
ALTER TABLE `tb_chi_tiet_don`
  ADD CONSTRAINT `fk_ctd_dh` FOREIGN KEY (`MaDon`) REFERENCES `tb_don_hang` (`MaDon`),
  ADD CONSTRAINT `fk_ctd_sp` FOREIGN KEY (`MaSP`) REFERENCES `tb_san_pham` (`MaSP`);

--
-- Các ràng buộc cho bảng `tb_ct_don_lua_chon`
--
ALTER TABLE `tb_ct_don_lua_chon`
  ADD CONSTRAINT `fk_ctdlc_lc` FOREIGN KEY (`MaLC`) REFERENCES `tb_lua_chon` (`Id`),
  ADD CONSTRAINT `fk_ctdlc_madon` FOREIGN KEY (`MaDon`) REFERENCES `tb_chi_tiet_don` (`MaDon`),
  ADD CONSTRAINT `fk_ctdlc_masp` FOREIGN KEY (`MaSP`) REFERENCES `tb_chi_tiet_don` (`MaSP`);

--
-- Các ràng buộc cho bảng `tb_danh_gia`
--
ALTER TABLE `tb_danh_gia`
  ADD CONSTRAINT `fk_danh_gia_don_hang` FOREIGN KEY (`MaDon`) REFERENCES `tb_don_hang` (`MaDon`),
  ADD CONSTRAINT `fk_danh_gia_nguoi_dung` FOREIGN KEY (`TaiKhoan`) REFERENCES `tb_nguoi_dung` (`TaiKhoan`),
  ADD CONSTRAINT `fk_danhgia_nguoidung` FOREIGN KEY (`TaiKhoan`) REFERENCES `tb_nguoi_dung` (`TaiKhoan`),
  ADD CONSTRAINT `fk_danhgia_sp` FOREIGN KEY (`MaSP`) REFERENCES `tb_san_pham` (`MaSP`);

--
-- Các ràng buộc cho bảng `tb_dieu_kien_nhom`
--
ALTER TABLE `tb_dieu_kien_nhom`
  ADD CONSTRAINT `fk_dknhom_nhom` FOREIGN KEY (`MaNhom`) REFERENCES `tb_nhom_khach_hang` (`MaNhom`);

--
-- Các ràng buộc cho bảng `tb_don_hang`
--
ALTER TABLE `tb_don_hang`
  ADD CONSTRAINT `fk_dh_kh` FOREIGN KEY (`MaKH`) REFERENCES `tb_khach_hang` (`MaKH`);

--
-- Các ràng buộc cho bảng `tb_don_hang_ma_giam`
--
ALTER TABLE `tb_don_hang_ma_giam`
  ADD CONSTRAINT `fk_dgmg_dh` FOREIGN KEY (`MaDon`) REFERENCES `tb_don_hang` (`MaDon`),
  ADD CONSTRAINT `fk_dhmg_mg` FOREIGN KEY (`MaGiamGia`) REFERENCES `tb_ma_giam_gia` (`MaGiamGia`);

--
-- Các ràng buộc cho bảng `tb_gio_hang`
--
ALTER TABLE `tb_gio_hang`
  ADD CONSTRAINT `fk_giohang_nguoidung` FOREIGN KEY (`TaiKhoan`) REFERENCES `tb_nguoi_dung` (`TaiKhoan`),
  ADD CONSTRAINT `fk_giohang_sp` FOREIGN KEY (`MaSP`) REFERENCES `tb_san_pham` (`MaSP`);

--
-- Các ràng buộc cho bảng `tb_gio_hang_lua_chon`
--
ALTER TABLE `tb_gio_hang_lua_chon`
  ADD CONSTRAINT `fk_ghlc_gh` FOREIGN KEY (`MaGH`) REFERENCES `tb_gio_hang` (`id`),
  ADD CONSTRAINT `fk_ghlc_lc` FOREIGN KEY (`MaLC`) REFERENCES `tb_lua_chon` (`Id`);

--
-- Các ràng buộc cho bảng `tb_hinh_anh`
--
ALTER TABLE `tb_hinh_anh`
  ADD CONSTRAINT `fk_ha_sp` FOREIGN KEY (`MaSP`) REFERENCES `tb_san_pham` (`MaSP`);

--
-- Các ràng buộc cho bảng `tb_khach_hang`
--
ALTER TABLE `tb_khach_hang`
  ADD CONSTRAINT `fk_kh_nd` FOREIGN KEY (`TaiKhoan`) REFERENCES `tb_nguoi_dung` (`TaiKhoan`);

--
-- Các ràng buộc cho bảng `tb_kh_nhom_kh`
--
ALTER TABLE `tb_kh_nhom_kh`
  ADD CONSTRAINT `fk_nkh_khach_hang` FOREIGN KEY (`MaKH`) REFERENCES `tb_khach_hang` (`MaKH`),
  ADD CONSTRAINT `fk_nkh_nhom` FOREIGN KEY (`MaNhom`) REFERENCES `tb_nhom_khach_hang` (`MaNhom`);

--
-- Các ràng buộc cho bảng `tb_lua_chon`
--
ALTER TABLE `tb_lua_chon`
  ADD CONSTRAINT `fk_lc_pl` FOREIGN KEY (`MaPL`) REFERENCES `tb_phan_loai` (`MaPL`);

--
-- Các ràng buộc cho bảng `tb_ma_giam_gia`
--
ALTER TABLE `tb_ma_giam_gia`
  ADD CONSTRAINT `fk_magiam_kh` FOREIGN KEY (`MaKH`) REFERENCES `tb_khach_hang` (`MaKH`);

--
-- Các ràng buộc cho bảng `tb_nguoi_dung`
--
ALTER TABLE `tb_nguoi_dung`
  ADD CONSTRAINT `fk_nd_loaind` FOREIGN KEY (`LoaiND`) REFERENCES `tb_loai_nguoi_dung` (`MaLoai`);

--
-- Các ràng buộc cho bảng `tb_phan_loai`
--
ALTER TABLE `tb_phan_loai`
  ADD CONSTRAINT `fk_PL_SP` FOREIGN KEY (`MaSP`) REFERENCES `tb_san_pham` (`MaSP`);

--
-- Các ràng buộc cho bảng `tb_san_pham`
--
ALTER TABLE `tb_san_pham`
  ADD CONSTRAINT `fk_sp_lsp` FOREIGN KEY (`LoaiSP`) REFERENCES `tb_loai_san_pham` (`MaLoai`);

--
-- Các ràng buộc cho bảng `tb_san_pham_khuyen_mai`
--
ALTER TABLE `tb_san_pham_khuyen_mai`
  ADD CONSTRAINT `fk_spkm_km` FOREIGN KEY (`MaDotKM`) REFERENCES `tb_dot_khuyen_mai` (`Id`),
  ADD CONSTRAINT `fk_spkm_sp` FOREIGN KEY (`MaSP`) REFERENCES `tb_san_pham` (`MaSP`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
