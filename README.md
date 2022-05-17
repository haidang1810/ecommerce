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
	API editQuantity: 
		-URL: http://localhost:3000/carts/editQuantity
		-Method: post
		-Request: {
			id: 1,
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
	API changePchangeGmailhone: 
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