import React, { useState } from "react";
import Authenticate from "./components/Authenticate/Authenticate";
import Chatpage from "./components/chatpage/Chatpage";

function App(props) {
    
    const [isLoggedin, setIsLoggedin] = useState("false");

    const [user, setUser] = useState("");

    return (
        <div className="App">
            {
                isLoggedin === 'true' ? <Chatpage user={user} /> : <Authenticate onLogin={setIsLoggedin} getUser={setUser} />
            }
            {/* <Chatpage user="rathan" /> */}
        </div>
    );
}

export default App;
