import React, { useState, useEffect } from "react";
import Chatheader from "./Chatheader";
import Chat from "./Chat";
import { socio } from "../../../../declarations/socio/index";

export default function Chatlist(props) {
    
    const [exploreFriends, setExploreFriends] = useState("chat");
    const [addSearchResult, setAddSearchResult] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [publicUsersList, setPublicUsersList] = useState([]);
    const [friendsList, setFriendsList] = useState([]);

    const [usersArray, setUsersArray] = useState([]);
    const [friendsArray, setFriendsArray] = useState([]);

    const [buttonVisibility, setButtonVisibility] = useState("block");

    async function addFriend(name) {
        if (name != props.userName) {
            setButtonVisibility("none");
            let addStatus = await socio.addFriend(props.userName, name);
            if (addStatus === "Success") {
                console.log("Added successfully");
                setFriendsList([...friendsList, name]);
            }
            setButtonVisibility("block");
        }
    }

    async function removeFriend(name) {
        setButtonVisibility("none");
        let removeStatus = await socio.removeFriend(props.userName, name);
        if (removeStatus === "Friend Addedbond added") {
            let arrayAfterRemoval = friendsList.filter(element => element !== name);
            setFriendsList(arrayAfterRemoval);
        }
        setButtonVisibility("block");
    }

    function setExtraAsMessages() {
        return (
            <div>
                <p id="chat-preview" style={
                    {
                        cursor:'pointer'
                    }
                }>New Messages</p>
            </div>
        );
    }

    function setExtraAsButton(identity) {
        const isFriend = friendsList.includes(identity);

        function handleClick() {
            if (isFriend) {
                removeFriend(identity);
            } else {
                addFriend(identity);
            }
        }

        return (
            <div>
                <div
                    className="add-btn"
                    onClick={handleClick}
                    style={{
                        width: 'max-content',
                        height: 'max-content',
                        color: '#060608',
                        backgroundColor: '#ff9c00',
                        padding: '3px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        display: buttonVisibility
                    }}
                >
                    {isFriend ? "Remove Friend" : "Add Friend"}
                </div>
            </div>
        );
    }

    function displayUsers() {
        return (
            <div className="Chats-content" style={{ width: '100%', height: '100%' }}>
                {usersArray.map((element, index) => (
                    <Chat
                        img={element}
                        key={index}
                        username={element}
                        extra={setExtraAsButton(element)}
                        setActiveChat={props.setActiveChat}
                        type="profile"
                    />
                ))}
            </div>
        );
    }

    function displayFriends() {
        return (
            <div className="Chats-content" style={{ width: '100%', height: '100%' }}>
                {friendsArray.map((element, index) => (
                    <Chat
                        img={element}
                        key={index}
                        username={element}
                        setActiveChat={props.setActiveChat}
                        extra={setExtraAsMessages()}
                        type="chat"
                    />
                ))}
            </div>
        );
    }

    useEffect(() => {
        const fetchPublicUsers = () => {
            setUsersArray([...addSearchResult]);
        };

        fetchPublicUsers();
    }, [addSearchResult]);

    useEffect(() => {
        const fetchFriends = () => {
            setFriendsArray([...friendsList]);
        };

        fetchFriends();
    }, [friendsList]);

    useEffect(() => {
        const fetchData = async () => {
            const allUsers = await socio.getPublicUsers();
            setPublicUsersList(allUsers);
        };

        fetchData();
    }, [publicUsersList]);

    useEffect(() => {
        const fetchFriendsList = async () => {
            const userFriends = await socio.getFriendsList(props.userName);
            setFriendsList(userFriends);
        };

        fetchFriendsList();
    }, [props.userName,friendsList]);

    useEffect(() => {
        const searchUsers = async () => {
            const matchedResult = publicUsersList.filter(
                element => element.toString().toLowerCase() === searchTerm && element.toString().toLowerCase() != props.userName
            );
            setAddSearchResult(matchedResult);
        };

        searchUsers();
    }, [searchTerm, publicUsersList]);

    return (
        <div className="Chat-list" style={{ display: 'flex', alignItems: 'center' }}>
            <Chatheader exploreArea={setExploreFriends} inputFunction={setSearchTerm} />
            <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                placeholder="Search users"
            />
            <div
                className="Chats"
                style={{ display: exploreFriends === "explore" ? 'block' : 'none', width: '95%', height: '100%' }}
            >
                {
                    displayUsers()
                }
            </div>
            <div
                className="Chats"
                style={{ display: exploreFriends === "chat" ? 'block' : 'none', width: '95%', height: '100%' }}
            >
                {
                    displayFriends()
                }
            </div>
        </div>
    );
}
