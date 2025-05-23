import { evaluateExpression } from './calculator.js';

// Biến lưu biểu thức hiện tại (chuỗi các số và toán tử)
let currentExpression = '';

// Hàm handleButtonClick: Xử lý sự kiện khi người dùng nhấn nút
// Tham số:
// - value: Giá trị của nút được nhấn (số, toán tử, clear, =, hoặc .)
// - screenE: Phần tử DOM của màn hình để cập nhật hiển thị
// Cách hoạt động: Cập nhật biểu thức dựa trên nút nhấn, kiểm tra lỗi cú pháp,
// gọi tính toán khi nhấn =, và cập nhật màn hình
const handleButtonClick = (value, screenE) => {
    // Xử lý nút clear: Xóa biểu thức và đặt màn hình về 0
    if (value === 'clear') {
        currentExpression = '';
        screenE.innerText = '0';
        return;
    }

    // Xử lý nút =: Tính toán biểu thức và hiển thị kết quả
    if (value === '=') {
        try {
            const result = evaluateExpression(currentExpression); // Gọi hàm tính toán
            screenE.innerText = result;                          // Hiển thị kết quả
            currentExpression = result.toString();               // Lưu kết quả làm biểu thức mới
        } catch (error) {
            screenE.innerText = error.message;                   // Hiển thị lỗi nếu có
            currentExpression = '';                              // Xóa biểu thức
        }
        return;
    }

    // Ngăn lỗi cú pháp: Chỉ chặn các cặp toán tử không hợp lệ (*, /)
    const lastChar = currentExpression.slice(-1);
    const restrictedOperators = ['*', '/'];
    const invalidOperatorPairs = restrictedOperators.flatMap(op1 =>
        restrictedOperators.map(op2 => op1 + op2)
    );
    const operators = ['+', '-', '*', '/'];
    if (operators.includes(value) && operators.includes(lastChar)) {
        const pair = lastChar + value;
        if (invalidOperatorPairs.includes(pair)) {
            // Nếu là cặp không hợp lệ, thay thế toán tử cũ bằng toán tử mới
            currentExpression = currentExpression.slice(0, -1) + value;
            screenE.innerText = currentExpression;
            return;
        }
    }

    // Ngăn dấu chấm thập phân lặp lại trong một số
    if (value === '.') {
        const lastNumber = currentExpression.split(/[\+\-\*\/]/).pop(); // Lấy số cuối
        if (lastNumber.includes('.')) {                                 // Nếu số đã có dấu chấm
            return;                                                      // Không thêm dấu chấm nữa
        }
    }

    // Thêm giá trị mới vào biểu thức và cập nhật màn hình
    currentExpression += value;
    screenE.innerText = currentExpression || '0';
};

export { handleButtonClick };