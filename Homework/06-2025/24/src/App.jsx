import React from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Bai_1 from './pages/Bai_1';
import Bai_2 from './pages/Bai_2';
import Index from './pages/Bai_3/index.jsx';

const Menu = () => {
    const navigate = useNavigate();

    return (
        <div style={{padding: '1rem'}}>
            <h2>MENU</h2>
            <div style={{display: 'flex', gap: '1rem'}}>
                <button onClick={() => navigate('/bai-1')}>Bài 1</button>
                <button onClick={() => navigate('/bai-2')}>Bài 2</button>
                <button onClick={() => navigate('/bai-3')}>Bài 3</button>
            </div>
        </div>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Menu/>}/>
                <Route path="/bai-1" element={<Bai_1/>}/>
                <Route path="/bai-2" element={<Bai_2/>}/>
                <Route path="/bai-3" element={<Index/>}/>
            </Routes>
        </Router>
    );
}

export default App;
