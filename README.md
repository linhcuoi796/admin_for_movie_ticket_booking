# Thông tin project
- **Link xem trực tuyến:** [https://tkpm-bt1-796.herokuapp.com/film](https://tkpm-bt1-796.herokuapp.com/film)
- **Cấu trúc thư mục:**
app/
    &nbsp;&nbsp;&nbsp;bin/
    &nbsp;&nbsp;&nbsp;config_google_drive/  &nbsp; <!-- up ảnh lên drive -->
    &nbsp;&nbsp;&nbsp;models/ &nbsp; 
    &nbsp;&nbsp;&nbsp;public/
    &nbsp;&nbsp;&nbsp;routes/
    &nbsp;&nbsp;&nbsp;view/
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partials/
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;film.ejs &nbsp; <!-- file chạy chính -->
    &nbsp;&nbsp;&nbsp;app.js &nbsp; <!-- khởi chạy server-->
db/ <!--Database đã export thành file json -->
- **Cách chạy local:**
    - cd đến folder app
    - npm install
    - npm start
    - mở trang web:  **localhost:3000/film**
- **Kết nối db với mongodb compoass**
    - url: mongodb+srv://admin:admin@cluster0-zfkxe.mongodb.net/movie?retryWrites=true&w=majority