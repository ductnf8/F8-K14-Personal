import { evaluateExpression, isValidExpression } from './calculator.js'

const screen = document.querySelector('.calculate-screen')

const setInput = (val) => screen.innerText = val
const getInput = () => screen.innerText
const appendInput = (val) => setInput(getInput() + val)

const isOperator = (char) => ['+', '-', '*', '/'].includes(char)

const handleInput = (value) => {
    let input = getInput()
    const lastChar = input.slice(-1)

    if (value === 'C') {
        setInput('')
        return
    }

    if (value === '=') {
        if (isValidExpression(input)) {
            const result = evaluateExpression(input)
            setInput(result)
        } else {
            alert('Phép tính không hợp lệ!')
        }
        return 
    }

    if (value === '.') {
        const parts = input.split(/[-+*/]/)
        const lastNumber = parts[parts.length - 1]
        if (!lastNumber.includes('.')) {
            appendInput(value)
        }
        return
    }

    if (isOperator(value)) {
        // Không cho bắt đầu bằng *, / hoặc +
        if (input === '' && value !== '-') return

        // Cho phép số âm sau toán tử khác (ví dụ: 3 * -2)
        if (isOperator(lastChar)) {
            if (value === '-' && lastChar !== '-') {
                appendInput(value)
                return
            } else {
                // Thay thế toán tử cuối
                setInput(input.slice(0, -1) + value)
                return
            }
        }

        appendInput(value)
        return
    }

    appendInput(value)
}

export { handleInput }
