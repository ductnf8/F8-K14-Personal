import reactLogo from './assets/react.svg'
import {useState} from 'react'

import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <CalculatorUI/>
        </>
    )
}


function CalculatorUI() {
    const styles = {
        container: {
            padding: '30px',
            maxWidth: '400px',
            margin: 'auto',
            textAlign: 'center',
            backgroundColor: '#f4f4f4',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
        title: {
            marginBottom: '20px',
            color: '#333',
        },
        input: {
            width: '80%',
            padding: '10px',
            margin: '8px 0',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '6px',
        },
        buttonGroup: {
            marginTop: '15px',
        },
        button: {
            padding: '10px 20px',
            margin: '6px',
            fontSize: '18px',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            borderRadius: '6px',
            transition: 'background-color 0.3s',
        },
        clearButton: {
            marginTop: '15px',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            backgroundColor: '#f44336',
            color: 'white',
            borderRadius: '6px',
            cursor: 'pointer',
        },
        result: {
            marginTop: '20px',
            fontSize: '18px',
            color: '#222',
        },
    };

    const [num1, setNum1] = useState('')
    const [num2, setNum2] = useState('')
    const [result, setResult] = useState('')
    const [error, setError] = useState('')

    const isValidNumber = (value) => {
        return !isNaN(value) && value.trim() !== '';
    };

    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => {
            if (b === 0) throw new Error('Can divide by 0')
            return a / b
        }
    }

    const calculate = (operator) => {
        setResult('')
        setError('')

        if (!isValidNumber(num1) || !isValidNumber(num2)) {
            setError('Please enter valid number!')
            return
        }

        const a = parseFloat(num1)
        const b = parseFloat(num2)

        const ope = operations[operator]

        if (!ope) {
            setError('Invalid operation')
            return;
        }

        try {
            const result = ope(a, b)
            console.log(result)
            setResult(result)
        } catch (e) {
            setError(e.message)
        }
    }

    const handleClear = () => {
        setNum1('');
        setNum2('');
        setResult('');
        setError('');
    };

    return (
        <div style={styles.container}>
            <a href="#" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo"/>
            </a>

            <h2 style={styles.title}>Máy Tính Cơ Bản</h2>

            <input
                type="number"
                placeholder="Số thứ nhất"
                style={styles.input}
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
            />
            <input
                type="number"
                placeholder="Số thứ hai"
                style={styles.input}
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
            />

            <div style={styles.buttonGroup}>
                <button style={styles.button} onClick={() => calculate('+')}>+</button>
                <button style={styles.button} onClick={() => calculate('-')}>−</button>
                <button style={styles.button} onClick={() => calculate('*')}>×</button>
                <button style={styles.button} onClick={() => calculate('/')}>÷</button>
            </div>

            {error && <div style={{color: 'red', marginTop: '10px'}}>{error}</div>}

            <div style={styles.result}>
                <strong>Kết quả:</strong> <span>{result !== '' ? result : 'Chưa có kết quả'}</span>
            </div>

            <button style={styles.clearButton} onClick={handleClear}>Clear</button>
        </div>
    );
}


export default App
