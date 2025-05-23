// Kiểm tra xem biểu thức có hợp lệ không
const isValidExpression = (expr) => {
    if (expr === '') return false

    // Không cho chia cho 0 (ví dụ: /0 hoặc /0.0)
    const divideByZeroRegex = /\/0+(\.0+)?(?!\d)/
    if (divideByZeroRegex.test(expr)) return false

    // Không cho 2 toán tử liên tiếp, trừ phép số âm như: 3 * -2
    const invalidDoubleOperatorRegex = /[+\/*]{2,}/
    if (invalidDoubleOperatorRegex.test(expr)) return false

    // Không kết thúc bằng toán tử
    if (/[+\-*/.]$/.test(expr)) return false

    return true
}

// Tính kết quả biểu thức
const evaluateExpression = (expr) => {
    try {
        return eval(expr) // dùng eval vì biểu thức đã được kiểm tra hợp lệ

    } catch {
        return 'Lỗi'
    }
}

export { evaluateExpression, isValidExpression }
