
// Các hàm toán học cơ bản
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error('Không thể chia cho 0');
    }
    return a / b;
}

// Định nghĩa các toán tử và độ ưu tiên
const operations = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
};
const validOperators = ['+', '-', '*', '/'];
const highPriorityOperators = ['*', '/'];

/**
 * evaluateExpression: Tính giá trị biểu thức dạng chuỗi
 * @param {string} expression - biểu thức toán học dạng chuỗi (ví dụ: "8+9*2")
 * @returns {number} kết quả phép tính
 */
const evaluateExpression = (expression) => {
    // Xoá khoảng trắng
    expression = expression.replace(/\s/g, '');

    // Biểu thức rỗng thì trả về 0
    if (!expression) return 0;

    // Kiểm tra số thập phân không hợp lệ
    if (/(\.\D|^\.)/.test(expression)) {
        throw new Error('Số thập phân không hợp lệ');
    }

    // Tiền xử lý: thay -- thành +, +- hoặc -+ thành -
    expression = expression.replace(/--/g, '+');
    expression = expression.replace(/\+\+/g, '+');
    expression = expression.replace(/\+-|-\+/g, '-');

    // Tách biểu thức thành token (số và toán tử)
    const tokens = [];
    let i = 0;
    while (i < expression.length) {
        let char = expression[i];

        // Nếu là toán tử
        if (validOperators.includes(char)) {
            // Kiểm tra nếu là dấu âm của số âm
            if (char === '-' || char === '+') {
                if (
                    i === 0 || validOperators.includes(expression[i - 1])
                ) {
                    // Là dấu của số âm hoặc dương
                    let num = char;
                    i++;
                    while (i < expression.length && /[\d.]/.test(expression[i])) {
                        num += expression[i];
                        i++;
                    }
                    if (/^\d*\.\d*\.$/.test(num) || num === '+' || num === '-') {
                        throw new Error('Biểu thức không hợp lệ');
                    }
                    tokens.push(num);
                    continue;
                }
            }
            tokens.push(char);
            i++;
        } else if (/\d|\./.test(char)) {
            // Nếu là chữ số hoặc dấu chấm
            let num = '';
            while (i < expression.length && /[\d.]/.test(expression[i])) {
                num += expression[i];
                i++;
            }
            if (/^\d*\.\d*\.$/.test(num)) {
                throw new Error('Biểu thức không hợp lệ');
            }
            tokens.push(num);
        } else {
            throw new Error('Biểu thức không hợp lệ');
        }
    }

    // Phân tách tokens thành numbers và operators
    const numbers = [];
    const operators = [];

    for (let token of tokens) {
        if (validOperators.includes(token)) {
            operators.push(token);
        } else {
            const num = parseFloat(token);
            if (isNaN(num)) {
                throw new Error('Biểu thức không hợp lệ');
            }
            numbers.push(num);
        }
    }

    // Kiểm tra số lượng số và toán tử hợp lệ
    if (numbers.length < 1 || numbers.length !== operators.length + 1) {
        throw new Error('Biểu thức không hợp lệ');
    }

    // Xử lý toán tử * và / trước
    let j = 0;
    while (j < operators.length) {
        if (highPriorityOperators.includes(operators[j])) {
            const result = operations[operators[j]](numbers[j], numbers[j + 1]);
            numbers.splice(j, 2, result);
            operators.splice(j, 1);
        } else {
            j++;
        }
    }

    // Xử lý các phép + và -
    let result = numbers[0];
    for (j = 0; j < operators.length; j++) {
        result = operations[operators[j]](result, numbers[j + 1]);
    }

    return result;
};

export { evaluateExpression };

