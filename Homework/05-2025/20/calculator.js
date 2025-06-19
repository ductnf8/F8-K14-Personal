// Lớp Operation: Lớp trừu tượng cho các phép tính
// Tác dụng: Định nghĩa giao diện cho các phép tính, tuân thủ OCP
class Operation {
    execute(a, b) {
        throw new Error('Phương thức execute phải được triển khai');
    }
}

// Lớp Addition: Thực hiện phép cộng
class Addition extends Operation {
    execute(a, b) {
        return a + b; // Trả về tổng của a và b
    }
}

// Lớp Subtraction: Thực hiện phép trừ
class Subtraction extends Operation {
    execute(a, b) {
        return a - b; // Trả về hiệu của a và b
    }
}

// Lớp Multiplication: Thực hiện phép nhân
class Multiplication extends Operation {
    execute(a, b) {
        return a * b; // Trả về tích của a và b
    }
}

// Lớp Division: Thực hiện phép chia
class Division extends Operation {
    execute(a, b) {
        if (b === 0) { // Kiểm tra chia cho 0
            throw new Error('Không thể chia cho 0');
        }
        return a / b; // Trả về thương của a và b
    }
}

// Đối tượng operations: Lưu trữ các instance của phép tính
// Tác dụng: Ánh xạ toán tử với lớp tương ứng, dễ mở rộng
const operations = {
    '+': new Addition(),
    '-': new Subtraction(),
    '*': new Multiplication(),
    '/': new Division(),
};

// Hàm evaluateExpression: Tính toán giá trị của biểu thức
// Tham số: expression (chuỗi biểu thức như "3+4*2" hoặc "9/-3")
// Cách hoạt động: Tách biểu thức thành số và toán tử, xử lý số âm,
// thực hiện phép tính theo độ ưu tiên và trả về kết quả
const evaluateExpression = (expression) => {
    // Loại bỏ khoảng trắng
    expression = expression.replace(/\s/g, '');
    if (!expression) {
        return 0; // Nếu biểu thức rỗng, trả về 0
    }

    // Kiểm tra biểu thức kết thúc bằng toán tử
    if (/[\+\-\*\/]$/.test(expression)) {
        throw new Error('Biểu thức không hợp lệ'); // Ném lỗi nếu kết thúc bằng toán tử
    }

    // Tách số và toán tử, hỗ trợ số âm (như / -3 hoặc + -3)
    const tokens = expression.match(/(\d*\.?\d+|[+\*\/]|-)/g);
    if (!tokens) {
        throw new Error('Biểu thức không hợp lệ'); // Ném lỗi nếu biểu thức sai
    }

    // Xử lý số âm: Gộp toán tử - sau +, *, / thành số âm
    const processedTokens = [];
    let i = 0;
    while (i < tokens.length) {
        if (['+', '*', '/'].includes(tokens[i]) && tokens[i + 1] === '-' && /\d/.test(tokens[i + 2])) {
            processedTokens.push(tokens[i]); // Giữ toán tử +, *, /
            processedTokens.push('-' + tokens[i + 2]); // Gộp - với số thành số âm
            i += 3;
        } else {
            processedTokens.push(tokens[i]);
            i++;
        }
    }

    // Tách thành mảng số và toán tử
    const operators = [];
    const numbers = [];
    processedTokens.forEach(token => {
        if (['+', '-', '*', '/'].includes(token)) {
            operators.push(token); // Lưu toán tử
        } else {
            numbers.push(parseFloat(token)); // Lưu số (bao gồm số âm)
        }
    });

    // Kiểm tra số lượng số và toán tử
    if (numbers.length !== operators.length + 1) {
        throw new Error('Biểu thức không hợp lệ'); // Ném lỗi nếu số lượng không khớp
    }

    // Xử lý độ ưu tiên: Thực hiện nhân và chia trước
    let j = 0;
    while (j < operators.length) {
        if (operators[j] === '*' || operators[j] === '/') {
            const result = operations[operators[j]].execute(numbers[j], numbers[j + 1]);
            numbers.splice(j, 2, result); // Thay thế 2 số bằng kết quả
            operators.splice(j, 1);       // Xóa toán tử đã xử lý
        } else {
            j++; // Bỏ qua nếu là + hoặc -
        }
    }

    // Thực hiện cộng và trừ
    let result = numbers[0];
    for (j = 0; j < operators.length; j++) {
        result = operations[operators[j]].execute(result, numbers[j + 1]);
    }

    return result; // Trả về kết quả cuối cùng
};

export { evaluateExpression };