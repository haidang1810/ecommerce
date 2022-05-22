Product
	API getAll:
		-URL: http://localhost:3000/products/getAll
		-Method: get
		-Request: 
		- Response: {
			status: 1,
			msg: 'success',
			data: [
				{
					MaSP: 'SP001',
					TenLoai: 'Vòng tay',
					TenSP: 'dsadsa',
					Gia: 10000, (Giá bán chưa tính khuyến mãi)
					SoLuong: 100, (SL còn)
					AnhBia: 'url ảnh bìa',
					DanhGia: 4.5 (trung bình của tất cả đánh giá)
					ChietKhau: '10', (Phần trăm của khuyến mãi đang dc áp dụng)
					NgayDang: '2022-02-22',
					DaBan: 31231 (SL đã bán)
				}
			]
		}
	API getByKeyword:
		-URL: http://localhost:3000/products/getByKeyword?keyword=someKeyword
		-Method: get
		-Request: 
		-Response: {
			status: 1,
			msg: 'success',
			data: [
				{
					MaSP: 'SP001',
					TenLoai: 'Vòng tay',
					TenSP: 'dsadsa',
					Gia: 10000, (Giá bán chưa tính khuyến mãi)
					SoLuong: 100, (SL còn)
					AnhBia: 'url ảnh bìa',
					DanhGia: 4.5 (trung bình của tất cả đánh giá)
					ChietKhau: '10', (Phần trăm của khuyến mãi đang dc áp dụng)
					NgayDang: '2022-02-22',
					DaBan: 31231 (SL đã bán)
				}
			]
		}
	API getDetail:
		-URL: http://localhost:3000/products/getDetail/SP001
		-Method: get
		-Request: {
			status: 1,
			msg: 'success',
			data: {
				MaSP: 'SP001',
				TenLoai: 'Vòng tay',
				TenSP: 'dsadsa',
				Gia: 10000, (Giá bán chưa tính khuyến mãi)
				SoLuong: 100, (SL còn)
				MoTa: '<p>mô tả</p>',
				KhoiLuong: 100, (đơn vị gram)
				DanhGia: 4.5, (trung bình của tất cả đánh giá)
				ChietKhau: '10', (Phần trăm của khuyến mãi đang dc áp dụng)
				NgayDang: '2022-02-22',
				DaBan: 31231, (SL đã bán)
				LuotDanhGia: 100
			}
		}
	API add:
		-URL: http://localhost:3000/products/add
		-Method: post
		-Request: {
			MaSP: '',
			LoaiSP: 1,
			TenSP: '',
			MoTa: '', (dùng ckeditor)
			KhoiLuong: 100, (đv gram)
			Gia: 100000,
			SoLuong: 300,
			AnhBia: file, (dùng phương thức FormData để gửi request)
			NgayDang: '2022-12-01'
		}
		-Response: {
			status: 1, (1 thành công, 2 thất bại)
			msg: 'success' (Nếu thất bại msg chứa nguyên nhân thất bại)
		}
	API edit:
		-URL: http://localhost:3000/products/edit
		-Method: post
		-Request: {
			MaSP: '',
			LoaiSP: 1,
			TenSP: '',
			MoTa: '', (dùng ckeditor)
			KhoiLuong: 100, (đv gram)
			Gia: 100000,
			SoLuong: 300,
			AnhBia: file, (dùng phương thức FormData để gửi request)
			NgayDang: '2022-12-01'
		}
		-Response: {
			status: 1, (1 thành công, 2 thất bại)
			msg: 'success' (Nếu thất bại msg chứa nguyên nhân thất bại)
		}
	API delete:
		-URL: http://localhost:3000/products/delete/SP001
		-Method: get
		-Request: 
		-Response: {
			status: 1, (1 thành công, 2 thất bại)
			msg: 'success' (Nếu thất bại msg chứa nguyên nhân thất bại)
		}
Category:
	API getAll:
		-URL: http://localhost:3000/categories/getAll
		-Method: get
		-Request: 
		-Response: {
			status: 1,
			msg: 'success',
			data: [
				{
					MaLoai: '',
					TenLoai: ''
				}
			]
		}
	API add:
		-URL: http://localhost:3000/categories/add
		-Method: post
		-Request: {
			MaLoai: '',
			TenLoai: ''
		}
		-Response: {
			status: 1,
			msg: 'success'
		}
	API edit:
		-URL: http://localhost:3000/categories/edit
		-Method: post
		-Request: {
			MaLoai: '',
			TenLoai: ''
		}
		-Response: {
			status: 1,
			msg: 'success'
		}
	API delete:
		-URL: http://localhost:3000/categories/delete/1
		-Method: get
		-Request: 
		-Response: {
			status: 1,
			msg: 'success'
		}
Cart:
	API getByUser:
		-URL: http://localhost:3000/carts/getByUser/dang123
		-Method: get
		-Request: 
		-Response: {
			status: 1,
			msg: 'success',
			data: [
				{
					MaSP: '',
					TenSP: '',
					SoLuong: 1,
					AnhBia: 'link ảnh bìa sp',
					Gia: 123213,
					ChietKhau: 10 (phần trăm chiết khấu)
				}
			]
		}
	API add:
		-URL: http://localhost:3000/carts/add
		-Method: post
		-Request: {
			MaSP: '',
			SoLuong: 2
		}
		-Response: {
			status: 1,
			msg: 'success',
		}

	API delete:
		-URL: http://localhost:3000/carts/delete
		-Method: post
		-Request: {
			id: 1
		}
		-Response: {
			status: 1,
			msg: 'success',
		}
Customer: 
	API getByAccount:
		-URL: http://localhost:3000/customers/getByAccount/dang123
		-Method: get
		-Request: 
		-Response: {
			status: 1,
			msg: 'success',
			data: {
				MaKH: '',
				TaiKhoan: '',
				HoTen: '',
				GioiTinh: '1',
				NgaySinh: '',
				SDT: '',
				Gmail: '',
				AnhDaiDien: ''
			}
		}
	API getVerifyCode:
		-URL: http://localhost:3000/customers/getVerifyCode/0123876159
		-Method: get
		-Request: 
		-Response: {
			status: 1,
			msg: 'success'
		}
	API changePhone: 
		-URL: http://localhost:3000/customers/changePhone
		-Method: post
		-Request: {
			phone: 0123876159,
			verifyCode: 'AKI34I'
		}
		-Response: {
			status: 1,
			msg: 'success'
		}
	API changeGmail: 
		-URL: http://localhost:3000/customers/changeGmail
		-Method: post
		-Request: {
			gmail: 'dsadsa@dsdsa.com',
			password: 'dsadsa'
		}
		-Response: {
			status: 1,
			msg: 'success'
		}
		API changeInfo:
		-URL: http://localhost:3000/customers/changeInfo
		-Method: post
		-Request: {
			fullName: '',
			gender: '',
			dateOfBirth: '',
			avatar: files
		}
		-Response: {
			status: 1,
			msg: 'success'
		}
	API add:
		-URL: http://localhost:3000/customers/add
		-Method: post
		-Request: {
			HoTen: '',
			GioiTinh: 1,
			NgaySinh: '',
			SDT: '',
			Gmail: '',
			DiaChi: {
				address : "52/84/129 Nguyễn Huệ",
				customer : "7OHL6sAnH4UKUXqBAq0o",
				province : {
					id : 215,
					name : "Vĩnh Long"
				},
				district : {
					id : 1562,
					name : "Thành phố Vĩnh Long"
				},
				ward : {
					id : 570102,
					name : "Phường 2"
				}
			}
		}
		-Response: {
			status: 1,
			msg: 'success'
		}
Images:
	API getByProduct:
		-URL: http://localhost:3000/images/getByProduct/SP001
		-Method: get
		-Request: 
		-Response: {
			status: 1,
			msg: 'success',
			data: [
				{
					Id: 1,
					MaSP: '',
					DuongDan: 'link ảnh'
				}
			]
		}
	API add: 
		-URL: http://localhost:3000/images/add
		-Method: post
		-Request: {
			MaSP: '',
			Anh: file
		}
		-Response: {
			status: 1,
			msg: 'success',
			countUploadSuccess: 5,
			listImgError: [
				'hinhA.png',
				'hinhB.png'
			]
		}
	API delete:
		-URL: http://localhost:3000/images/delete/1
		-Method: get
		-Request:
		-Response: {
			status: 1,
			msg: 'success'
		}
notification:
	API getByUser: 
		-URL: http://localhost:3000/notifications/getByUser
		-Method: get
		-Request: 
		-Response: {
			status: 1,
			msg: 'success',
			data: [
				{
					user: 'TaiKhoan',
					name: 'TenCuaThongBao',
					image: 'link anh',
					description: 'Mô tả',
					time: 'ThoiGianTaoThongBao'
				}
			]
		}

rating:
	APi getAll:
		-URL: http://localhost:3000/ratings/getAll
		-Method: get
		-Request: 
		-Response: {
			status: 1,
			msg: 'success',
			data: [
				{
					Id: '',
					HoTen: '',
					NoiDung: '',
					ThoiGian: '',
					SoSao: 5,
					PhanHoi: '',
					AnhDaiDien: 'link anh đại diện của user nếu có'
				}
			]
		}
	API getByProduct:
		-URL: http://localhost:3000/ratings/getByProduct/SP001
		-Method: get
		-Request: 
		-Response: {
			status: 1,
			msg: 'success',
			data: [
				{
					Id: '',
					HoTen: '',
					NoiDung: '',
					ThoiGian: '',
					SoSao: 5,
					PhanHoi: '',
					AnhDaiDien: 'link anh đại diện của user nếu có'
				}
			]
		}
	API add: 
		-URL: http://localhost:3000/ratings/add
		-Method: post
		-Request: {
			MaSP: '',
			MaDon: '',
			NoiDung: '',
			SoSao: ''
		}
		-Response: {
			status: 1,
			msg: 'success'
		}
	API replyByAdmin:
		-URL: http://localhost:3000/ratings/replyByAdmin
		-Method: post
		-Request: {
			id: '',
			PhanHoi: 'nội dung'
		}
		-Response: {
			status: 1,
			msg: 'success'
		}
User:
	API getVerifyCode:
		-URL: http://localhost:3000/users/getVerifyCode/0981234718
		-Method: get
		-Request: 
		-Response: {
			status: 1,
			msg: 'success'
		}
	API add:
		-URL: http://localhost:3000/users/add
		-Method: post
		-Request: {
			username: '',
			password: '',
			fullName: '',
			phone: '',
			verifyCode: ''
		}
		-Response: {
			status: 1,
			msg: 'success'
		}
addresses:
	API getByCustomer: 
		-URL: http://localhost:3000/addresses/getByCustomer/MaKH
		-Method: get
		-Request:
		-Response: {
			status: 1,
			msg: 'success',
			data: {
				_id : 6277d697e7fb9dd5f0a81f2d,
				address : "52/84/129 Nguyễn Huệ",
				customer : "7OHL6sAnH4UKUXqBAq0o",
				province : {
					id : 215,
					name : "Vĩnh Long"
				},
				district : {
					id : 1562,
					name : "Thành phố Vĩnh Long"
				},
				ward : {
					id : 570102,
					name : "Phường 2"
				}
			}
		}
	API updateByCustomer: 
		-URL: http://localhost:3000/addresses/updateByCustomer
		-Method: post
		-Request: {
			address : "52/84/129 Nguyễn Huệ",
			customer : "7OHL6sAnH4UKUXqBAq0o",
			province : {
				id : 215,
				name : "Vĩnh Long"
			},
			district : {
				id : 1562,
				name : "Thành phố Vĩnh Long"
			},
			ward : {
				id : 570102,
				name : "Phường 2"
			}
		}
		-Response: {
			status: 1,
			msg: 'success'
		}
auth:
	API login:
		-URL: http://localhost:3000/auth/login
		-Method: post
		-Request: {
			username: '',
			password: ''
		}
		-Response: {
			status: 1,
			msg: "Đăng nhập thành công",
			fullName: 'HoTen',
			avatar: 'link avatar'
		}
	API refreshToken:
		-URL: http://localhost:3000/auth/refreshToken
		-Method: get
		-Request: 
		-Response: 
	API checkLogin: 
		-URL: http://localhost:3000/auth/checkLogin
		-Method: get
		-Request:
		-Response: {
			status: 1,
			msg: 'Đã đăng nhập',
			fullName: data[0].HoTen,
			avatar: data[0].AnhDaiDien,
			id: data[0].MaKH,
			user: result.username
		}
	API logout:
		-URL: http://localhost:3000/auth/logout
		-Method: get
		-Request:
		-Response: 

Orders:
	API: getAll:
		-URL: http://localhost:3000/orders/getAll
		-Method: get
		-Request:
		-Response: {
			status: 1,
			msg: 'success',
			data: [
				{
					MaDon: '',
					HoTen: '',
					MaKH: '',
					DiaChiNhanHang: '', (Bỏ trống nếu dùng địa chỉ trong database),
					DiaChi: '',
					PhiVanChuyen: 10000,
					TongTienHang: 321321,
					SanPham: [
						{
							MaSP: '',
							TenSP: '',
							SoLuong: 133,
							Gia: 1321
						}
					],
					TrangThai: 0, (là 1 nếu dùng chức năng duyệt ngay khi tạo của admin)
					MaGiamGia: ['fdsf','fdsfds','hgfhgf']
				}
			]
		}
	API: getByCustomer:
		-URL: http://localhost:3000/orders/getByCustomer
		-Method: get
		-Request: {
			MaKH: '',
		}
		-Response: {
			status: 1,
			msg: 'success',
			data: [
				{
					MaDon: '',
					MaKH: '',
					DiaChiNhanHang: '', (Bỏ chống nếu dùng địa chỉ trong database)
					PhiVanChuyen: 10000,
					TongTienHang: 321321,
					SanPham: [
						{
							MaSP: '',
							TenSP: '',
							SoLuong: 133,
							Gia: 1321
						}
					],
					TrangThai: 0, (là 1 nếu dùng chức năng duyệt ngay khi tạo của admin)
					MaGiamGia: ['fdsf','fdsfds','hgfhgf']
				}
			]
		}
	API createOrder:
		-URL: http://localhost:3000/orders/createOrder
		-Method: post
		-Request: {
			MaKH: '',
			DiaChiNhanHang: '', (Bỏ trống nếu dùng địa chỉ trong database)
			PhiVanChuyen: 10000,
			TongTienHang: 10000,
			TrangThai: 0, (là 1 nếu dùng chức năng duyệt ngay khi tạo của admin)
			SanPham: [
				{
					MaSP: '',
					SoLuong: 1,
					DonGia: 123
				}
			],
			MaGiamGia: ['fdsf','fdsfds','hgfhgf']
		}
		-Response: {
			status: 1,
			msg: 'success'
		}
	API changeStatus: 
		-URL: http://localhost:3000/orders/changeStatus
		-Method: post
		-Request: {
			MaDon: '',
			TrangThai: 1 (0: chờ duyệt, 1: đã duyệt, 2: đang vận chuyển, 3: giao thành công. 4: giao thất bại, 5: Đã huỷ)
		}
		-Response: {
			status: 1,
			msg: 'success'
		}
