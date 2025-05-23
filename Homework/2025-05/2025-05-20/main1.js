import { handleButtonClick } from './main2.js';

// Lấy phần tử DOM của bàn phím và màn hình
const keyboardE = document.querySelector('.calculate-keyboard');
const screenE = document.querySelector('.calculate-screen');

// Danh sách các nút của máy tính, mỗi nút có text (hiển thị) và value (giá trị xử lý)
const btns = [
    { text: 'C', value: 'clear' }, // Nút xóa toàn bộ
    { text: '.', value: '.' },     // Nút dấu chấm thập phân
    { text: '/', value: '/' },     // Nút phép chia
    { text: '*', value: '*' },     // Nút phép nhân
    { text: 7, value: 7 },         // Các nút số
    { text: 8, value: 8 },
    { text: 9, value: 9 },
    { text: '-', value: '-' },     // Nút phép trừ
    { text: 4, value: 4 },
    { text: 5, value: 5 },
    { text: 6, value: 6 },
    { text: '+', value: '+' },     // Nút phép cộng
    { text: 1, value: 1 },
    { text: 2, value: 2 },
    { text: 3, value: 3 },
    { text: '=', value: '=' },     // Nút bằng (tính toán)
    { text: 0, value: 0 },
];

// Hàm renderBtns: Tạo và hiển thị các nút trên giao diện
// Cách hoạt động: Duyệt qua danh sách btns, tạo phần tử div cho mỗi nút,
// gán class, nội dung, giá trị, và sự kiện click, sau đó thêm vào bàn phím
const renderBtns = () => {
    btns.forEach(btn => {
        const btnE = document.createElement('div'); // Tạo thẻ div cho nút
        btnE.className = 'calculate-button';        // Gán class CSS
        btnE.innerText = btn.text;                 // Hiển thị text của nút
        btnE.setAttribute('value', btn.value);     // Gán giá trị xử lý
        // Thêm sự kiện click, gọi handleButtonClick với giá trị nút và màn hình
        btnE.addEventListener('click', () => handleButtonClick(btn.value, screenE));
        keyboardE.appendChild(btnE);               // Thêm nút vào bàn phím
    });
};

// Gọi hàm để hiển thị các nút khi trang tải
renderBtns();