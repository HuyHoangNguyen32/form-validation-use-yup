# Demo Form Validation

## 🎯 Features
- 🎖️ Bắt buộc nhập dữ liệu cho các trường
- 🎖️ Nhập đúng định dạng email
- 🎖️ Mật khẩu phải trên 6 kí tự
- 🎖️ Retype password phải trùng khớp với password
- 🎖️ Hình ảnh upload phải có dung lượng dưới 3MB
- 🎖️ Validation ngay tại thời điểm nhập dữ liệu cho form
- 🎖️ Khi nhấn submit validation lại toàn bộ các input
- 🎖️ Hiển thị hình ảnh lên khung sau khi upload xong trước khi submit

## ⚙️ Setup
- `yarn add yup` : install yup
- [Go to Yup GitHub](https://github.com/jquense/yup) : xem cách sử dụng Yup
- Chi tiết xêm thêm ở khoá học JavaScript của Easy Frontend

## 📚 Learn
- 📝 Cách sử dụng yup
  - Tạo schema sử dụng : `oneOf()`, `min()`, `mixed()`, `test()`, `email()`
- 📝 Hiển thị hình ảnh người dùng vừa upload lên trên trình duyệt để xem trước khi submit
- 📝 Validation toàn bộ form khi nhấn nút submit
- 📝 Validation từng field ngay khi nhập / thay đổi dữ liệu

## 🐛 Bugs
- 🐾 Trên trình duyệt Chrome sau khi submit thành công thì trường password vẫn hiển thị error
- 🐾 Dù có upload ảnh không thoả điều kiện < 3MB thì nó vẫn hiển thị lên khu vực xem trước
- 🐾 Retype password chưa thể validation độc lập như email, password hay image vì giá trị của nó phụ thuộc vào field password
- 🐾 Sau khi submit thành công thì vẫn hiện tích xanh bên trong ô input