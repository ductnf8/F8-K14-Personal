import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {QuizProvider} from "./store/QuizContext.jsx";

createRoot(document.getElementById('root')).render(
    <QuizProvider>
        <App/>
    </QuizProvider>,
)
