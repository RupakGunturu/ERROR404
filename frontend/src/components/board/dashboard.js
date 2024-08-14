import { Button } from "@chakra-ui/react";
import { Livescore } from "../live/liveupdate";
import { Navbar } from "../navbar/nav";
import { useNavigate } from "react-router-dom";
import { StudentData } from "../players/details";

export const Dashboard=()=>{
    const nav=useNavigate();
    return(
        <>
        <Navbar/>
        <Livescore/>
        <Button onClick={StudentData}></Button>
        </>
    )
}