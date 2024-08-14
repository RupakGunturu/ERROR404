import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Text, Heading, Flex, Spinner, Button } from '@chakra-ui/react';
import { api } from "../actions/api";
import { Link } from "react-router-dom";

export const Livescore = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = () => {
            const matchIds = ['match1', 'match2']; 
            const scoreRequests = matchIds.map(id => axios.get(`${api}/livescore?matchId=${id}`));
            
            Promise.all(scoreRequests)
                .then(responses => {
                    const fetchedScores = responses.map(response => response.data);
                    setScores(fetchedScores);
                })
                .catch((e) => console.log(e));
        };

        fetchScores();

        const interval = setInterval(fetchScores, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            minH="100vh"
            p={4}
            position="relative"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            color="white"
        >
            <Box
            as="video"
            src="anim.mp4"
                // src="https://rr3---sn-h557sn66.googlevideo.com/videoplayback?expire=1723653464&ei=-Ii8ZtG5DojrrtoP7-WcsQs&ip=180.248.47.213&id=o-ACIYIjF4wKrnYxek3o7XF-AITD6NOktBHbayewhJAm1f&itag=244&aitags=133%2C134%2C135%2C160%2C242%2C243%2C244%2C278%2C394%2C395%2C396%2C397&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AQmm2ey2Y8m7kOfQZ1j6zfXumRdItQjQaooRXnoPjoBwTOhygDYqSqMoftsWAjfD3awaJnNPr9JqV9_k&spc=Mv1m9hjinzSyESqemSmGS_yn3KbT7Itat-ZYNMlA3lCk63qcLWobJs6_Wwx1&vprv=1&svpuc=1&mime=video%2Fwebm&ns=YAwcdgJvOu5CBz1s8M69WuEQ&rqh=1&gir=yes&clen=2742936&dur=30.080&lmt=1506784732660715&keepalive=yes&c=WEB&sefc=1&n=nak5R7FHf9G2lw&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgMrMJ5TCcmjhxeOiSmyLu1RcLHCKtgtKNqOVQLhxjwisCIQDzsUxJVCG0HOVYxUUZJKo-gmr57S1LLchsHa7sI2AIPQ%3D%3D&rm=sn-2uuxa3vh-habl7e,sn-nposd7s&rrc=79,104&fexp=24350516,24350517,24350557,24350561&req_id=bcc78649b221a3ee&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=ep&mip=175.101.94.8&mm=29&mn=sn-h557sn66&ms=rdu&mt=1723637111&mv=m&mvi=3&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AGtxev0wRgIhAN6PL4aw5j2la6JtaVhtS0-1DKfQHMl3LknG5QqWeag9AiEA2SM8EpUc9bmfylpp8dflqsAYfbDDXxlfW1FHW9dX3ko%3D"
                // src="c:\Users\Pavan Kumar\Desktop\pkp\newpro\ERROR404\in-y2mate.com - TCL T20 Title Animation_v720P.mp4"
                // src="https://www.youtube.com/embed/bkzKE0zTExU?si=-alQPZtOHC9T5nxB"
                // src="https://rr3---sn-h5576nsk.googlevideo.com/videoplayback?expire=1723634532&ei=BD-8ZrX2Hdqd4t4P85Oh2AQ&ip=115.98.181.26&id=o-ALzew20ovKT9kjaJ2K62UTxrznz31Y_TCqNzBUsPpyt3&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&pcm2=no&bui=AQmm2exzNkcg403qsUBF9KEyfLtjakwVI4YFpCoh5zHwY85eYTxYCSGRROieVNV9igc3k9QZllDUh5gk&spc=Mv1m9hQveVwZ18SrU40rfX6UKcKjaFekpVnTWwPZDaLTUkZEYesx_GBRP3DJ&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Eoa6RdalvbZ9R1VY2XQKmDkQ&rqh=1&gir=yes&clen=10340303&otfp=1&dur=26.499&lmt=1706939437345969&keepalive=yes&c=WEB&sefc=1&txp=5311224&n=A1dvl6szDDBz3w&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cpcm2%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cotfp%2Cdur%2Clmt&sig=AJfQdSswRQIgavv7vo9j99_kBe_HnPcQfOv72j18O1rT_ms3slXTG1QCIQCAkdwjeuQT2V89lExgU0_CkCehbdU-whRq9Yp7LcSclA%3D%3D&rm=sn-i5uif5t-itqd7e,sn-gwpa-jwce7r,sn-h55se7s&rrc=79,79,104&fexp=24350516,24350517,24350557,24350561&req_id=3cb2dfd39345a3ee&redirect_counter=3&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=3Y&mip=2401:4900:6599:33bd:2817:f795:5fe2:7fdc&mm=30&mn=sn-h5576nsk&ms=nxu&mt=1723614276&mv=m&mvi=3&pl=48&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AGtxev0wRQIhAKGqkQTMgoAgy6Y5UPKK5K8YjMKCljgXIBRYis0t7hyyAiBWReuHyEpyQgmYQGB8SdASSbHryNd_EToP8as_DObFiQ%3D%3D"
                autoPlay
                loop
                muted
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                objectFit="cover"
                zIndex="-1"
            />

            {/* Content */}
            <Heading size="lg" mb={6} textAlign="center" color="white" textShadow="2px 2px 8px rgba(0, 0, 0, 0.8)">
                Live Cricket Scores
            </Heading>

            <Flex direction="row" align="center" justify="center" w="100%" maxW="lg" gap={6}>
                {scores.length > 0 ? (
                    scores.map((score, index) => (
                        <Box
                            key={index}
                            w="100%"
                            p={4}
                            borderRadius="lg"
                            boxShadow="lg"
                            bg="rgba(0, 0, 0, 0.7)"
                            textAlign="center"
                        >
                            <Text fontSize="xl" fontWeight="bold">
                                Match {index + 1}
                            </Text>
                            <Text fontSize="2xl" fontWeight="bold" color="yellow.300" mt={2}>
                                {score.runs}/{score.wickets} in {score.overs} overs
                            </Text>
                            <Text fontSize="md" mt={2}>
                                {score.commentary}
                            </Text>
                        </Box>
                    ))
                ) : (
                    <Spinner size="xl" color="yellow.400" />
                )}
            </Flex>
            <Link to={'/player-info'} style={{ marginTop: '20px' }}>
                <Button
                    colorScheme="green"
                    bg="green.600"
                    _hover={{ bg: 'green.700', transform: 'scale(1.05)' }}
                    _active={{ bg: 'green.800', transform: 'scale(0.95)' }}
                    borderRadius="full"
                    py={6}
                    fontSize="lg"
                    boxShadow="0 4px 12px rgba(1, 0, 0, 0.3)"
                    transition="all 0.3s ease"
                >
                    Player Details
                </Button>
            </Link>
        </Box>
    );
};
