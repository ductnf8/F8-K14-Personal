import React from 'react';
import Login from "./components/Login.jsx";
import {Route, Routes} from "react-router-dom";
import Post from "./components/Post.jsx";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/post' element={<Post/>}/>
            </Routes>
        </div>
    );
};

export default App;
