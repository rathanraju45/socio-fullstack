import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import Homeoutlined from '@mui/icons-material/HomeOutlined'
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import Exploreoutlined from '@mui/icons-material/ExploreOutlined';
import MessageIcon from '@mui/icons-material/Message';
import Messageoutlined from '@mui/icons-material/MessageOutlined';
import TuneIcon from '@mui/icons-material/Tune';

const sideIcons = {
    Home: <HomeIcon sx={{color: "#fdfdfd", fontSize:"2vw"}} />,
    Homeoutlined : <Homeoutlined sx={{color: "#fdfdfd", fontSize:"2vw"}} />,
    Search: <SearchIcon sx={{color: "#fdfdfd", fontSize:"2vw"}} />,
    Explore: <ExploreIcon sx={{color: "#fdfdfd", fontSize:"2vw"}} />,
    Exploreoutlined: <Exploreoutlined sx={{color: "#fdfdfd", fontSize:"2vw"}} />,
    Chat: <MessageIcon sx={{color: "#fdfdfd", fontSize:"2vw"}} />,
    Chatoutlined: <Messageoutlined sx={{color: "#fdfdfd", fontSize:"2vw"}} />,
    Colors: <TuneIcon sx={{color: "#fdfdfd", fontSize:"2vw"}} />
}

export default function Icon(props){
    const selectedIcon = sideIcons[props.icon];

    return (
        <div className="Icon" >
            <div className="Icon-items">
                    { selectedIcon }
                <p style={
                    {
                        display:props.display,
                        transition:'0.1s ease'
                    }
                }>{ props.iconName }</p>
            </div>
        </div>
    )
}