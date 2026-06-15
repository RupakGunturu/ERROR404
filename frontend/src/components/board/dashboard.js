import { Livescore } from "../live/liveupdate";
import PageWrapper from "../wrapper/PageWrapper";

export const Dashboard=()=>{
    return(
        <PageWrapper pt={20}>
            <Livescore/>
        </PageWrapper>
    )
}
