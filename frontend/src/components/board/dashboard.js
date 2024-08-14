// import { Button } from "@chakra-ui/react";
import { Livescore } from "../live/liveupdate";
import { Navbar } from "../navbar/nav";
import { useNavigate } from "react-router-dom";
// import VideoBackground from "../video";
// import { StudentData } from "../players/details";

export const Dashboard=()=>{
    const nav=useNavigate();
    return(
        <>
        {/* <VideoBackground videoSrc={"in-y2mate.com - TCL T20 Title Animation_v720P.mp4"}> */}
        <Navbar/>
        <Livescore/>
        {/* <Button onClick={StudentData}></Button> */}
        {/* </VideoBackground> */}
        </>
    )
}