import { Livescore } from "../live/liveupdate";
import { Navbar } from "../navbar/nav";

export const Dashboard=()=>{
    return(
        <>
        <Navbar/>
        <Livescore/>
        </>
    )
}