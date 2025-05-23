import {handleButtonClick} from './main2.js';

const keyboardE = document.querySelector('.calculate-keyboard');
const screenE = document.querySelector('.calculate-screen');

const btns = [
    {text: 'C', value: 'clear'},
    {text: '.', value: '.'},
    {text: '/', value: '/'},
    {text: '*', value: '*'},
    {text: 7, value: 7},
    {text: 8, value: 8},
    {text: 9, value: 9},
    {text: '-', value: '-'},
    {text: 4, value: 4},
    {text: 5, value: 5},
    {text: 6, value: 6},
    {text: '+', value: '+'},
    {text: 1, value: 1},
    {text: 2, value: 2},
    {text: 3, value: 3},
    {text: '=', value: '='},
    {text: 0, value: 0},
];

const renderBtns = () => {
    btns.forEach(btn => {
        const btnE = document.createElement('div');
        btnE.className = 'calculate-button';
        btnE.innerText = btn.text;
        btnE.setAttribute('value', btn.value);
        // Thêm sự kiện click, gọi handleButtonClick với giá trị nút và màn hình
        btnE.addEventListener('click', () => handleButtonClick(btn.value, screenE));
        keyboardE.appendChild(btnE);
    });
};

// Gọi hàm để hiển thị các nút khi trang tải
renderBtns();