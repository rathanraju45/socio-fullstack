import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authenticate from "./components/Authenticate/Authenticate";
import Chatpage from "./components/chatpage/Chatpage";

function App(){
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" Component={Authenticate}/>
                    <Route path="/l" Component={Chatpage} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
