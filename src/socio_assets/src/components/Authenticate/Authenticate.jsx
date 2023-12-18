import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from "react";
import Socio from "../../images/socio_final.png";
import { socio } from "../../../../declarations/socio";

export default function Authenticate(props) {
    
    const [isLoggedin, setIsLoggedin] = useState("false");

    const [activeTab, setActiveTab] = useState('login');

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirm: '',
    });

    const [status, setStatus] = useState("Enter credentials to login");

    const [isProcessing, setIsProcessing] = useState(false);

    function login() {
        setFormData({
            username: '',
            password: '',
            confirm:''
        });
        setActiveTab('login');
        setStatus("Enter Credentials to login");
    }

    function register() {
        setFormData({
            username: '',
            password: '',
            confirm: ''
        });
        setActiveTab('register');
        setStatus("Enter Credentials to register");
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function userLogin() {
        if (formData.username != "") {
            setIsProcessing(true);
            setStatus("Attempt to login");
            let loginResult = await socio.checkUser(formData.username, formData.password);
            if (loginResult === "0") {
                setStatus("User Logged in");
                setFormData({
                    username: '',
                    password: '',
                    confirm: '',
                });
                setIsLoggedin("true");
                props.onLogin(isLoggedin);
                props.getUser(formData.username);
                props.onLogin("true");
            }
            else if (loginResult === "1") {
                setStatus("Incorrect Password, Try again");
            }
            else {
                setStatus("User not found");
            }
            setIsProcessing(false);
        }
        else {
            setStatus("Username cannot be Empty.");
        }
    }

    async function userRegister() {
        if (formData.username != "") {
            setIsProcessing(true);
            setStatus("Attempt to register");
            let registerResult = await socio.checkUser(formData.username, formData.password);
            if (registerResult === "2") {
                if (formData.password === formData.confirm) {
                    let registerResult = await socio.createUser(formData.username, formData.password, uuidv4());
                    setStatus(registerResult);
                    userLogin();
                    setFormData({
                        username: '',
                        password: '',
                        confirm: '',
                    });
                }
                else {
                    setStatus("Passwords do not match.");
                }
            }
            else if (registerResult === "0") {
                userLogin();
            }
            else {
                setStatus("Username already in use.");
            }
            setIsProcessing(false);
        }
        else {
            setStatus("Usernameis empty.");
        }
    }

    return (
        <div className="body">
            <div className="Authenticate">
                <div className="Authenticate-body">
                    <div className="Socio-logo">
                        <img src={Socio} alt="Socio" />
                    </div>
                    <div className="Auth-container">
                        <div className="Toggle-buttons">
                            <p id="login" onClick={login} style={
                                {
                                    cursor: 'pointer',
                                    backgroundColor : activeTab === 'login' ? '#fdfdfd' : null,
                                    color: activeTab === 'login' ? '#060608' : '#fdfdfd',
                                    borderTopRightRadius: activeTab === 'login' ? '10px' : null
                                }
                            }>Login</p>
                            <p id="register" onClick={register} style={
                                {
                                    cursor: 'pointer',
                                    backgroundColor : activeTab === 'register' ? '#fdfdfd' : null,
                                    color: activeTab === 'register' ? '#060608' : '#fdfdfd',
                                    borderTopLeftRadius: activeTab === 'register' ? '10px' : null
                                }
                            }>Register</p>
                        </div>
                        <div className="Form" style={
                            {
                                position:'relative'
                            }
                        }>

                            <input type="text" placeholder="Enter Username" name="username" id="Username" value={formData.username} onChange={handleInputChange}/>
                            <input type="password" placeholder="Enter Password" name="password" id="Password" value={formData.password} onChange={handleInputChange} autoComplete="current-password"/>
                            
                            <input type="password" placeholder="Confirm Password" name="confirm" id="Confirm" value={formData.confirm} style={
                                {
                                    display: activeTab === 'register' ? 'block' : 'none'
                                }
                            } onChange={handleInputChange}/>
                            <p style={
                                {
                                    border: 'solid 1px black',
                                    color: 'red',
                                    fontSize:'1.2vw',
                                    left:'110%',
                                    margin: '0',
                                    position: 'absolute',
                                    top: '45%',
                                    width:'18vw'
                                }
                           }>Status:<br />{ status }</p> 
                            <button type="submit" className="auth-btn" style={
                                {
                                    display: activeTab === 'login' ? 'block' : 'none'
                                }
                            } onClick={userLogin} disable={ isProcessing.toString() } >Login</button>
                            <button type="submit" className="auth-btn" style={
                                {
                                    display: activeTab === 'register' ? 'block' : 'none'
                                } 
                            } onClick={ userRegister} disable={ isProcessing.toString() } >Register</button>

                            <a href="button.jsx">Forgot Password?</a >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}