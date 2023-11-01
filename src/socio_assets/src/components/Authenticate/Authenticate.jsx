import React, { useState } from "react";
import Socio from "../../images/socio_final.png";
import { socio } from "../../../../declarations/socio";

export default function Authenticate(){

    const [activeTab, setActiveTab] = useState('login');

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirm: '',
    });

    const [Pmatch, setPmatch] = useState("yes");

    const [error, setError] = useState("");

    const [regerror, setRegerror] = useState("");

    function login(){
        setActiveTab('login');
    }

    function register(){
        setActiveTab('register');
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function userLogin() {
        let userExist = await socio.checkUser(formData.username, formData.password);
        if (userExist === "0") {
            setError("");
        }
        else if (userExist === "1") {
            setError("Passwords do not match");
        }
        else if (userExist === "2"){
            setError("Username not found");
        }
    }

    async function userRegister() {
        pmatching();
        if (Pmatch === 'yes') {
            let userDone = await socio.createUser(formData.username, formData.password);
            regStatus(userDone);
        }
    }

    function regStatus(code){
        setRegerror(code);
    }

    function pmatching() {
        if (formData.password === formData.confirm) {
            setPmatch('yes');
        }
        else {
            setPmatch('no');
            setError("Passwords do not match");
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
                        <div className="Form">

                            <input type="text" placeholder="Enter Username" name="username" id="Username" value={formData.username} onChange={handleInputChange}/>
                            <input type="password" placeholder="Enter Password" name="password" id="Password" value={formData.password} onChange={handleInputChange} />
                            <p style={
                                {
                                    color: 'red',
                                    display: activeTab === 'login' ? 'block' : 'none'
                                }
                            }>{ error }</p>
                            <input type="password" placeholder="Confirm Password" name="confirm" id="Confirm" value={formData.confirm} style={
                                {
                                    display: activeTab === 'register' ? 'block' : 'none',
                                }
                            } onChange={handleInputChange}/>
                            <p style={
                                {
                                    color: 'red',
                                    display: activeTab === 'register' && Pmatch === 'no' ? 'block' : 'none',
                                    margin:'0'
                                }
                            }>{ regerror }</p>
                            <button type="submit" style={
                                {
                                    display: activeTab === 'login' ? 'block' : 'none'
                                }
                            } onClick={userLogin}>Login</button>
                            <button type="submit" style={
                                {
                                    display: activeTab === 'register' ? 'block' : 'none'
                                } 
                            } onClick={userRegister}>Register</button>

                            <a href="button.jsx">Forgot Password?</a >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}