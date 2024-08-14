import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Text, Heading, Select, Flex, Spinner,Button } from '@chakra-ui/react';
import { api } from "../actions/api";
import { StudentData } from "../players/details";
import { Link } from "react-router-dom";

export const Livescore = () => {
    const [score, setScore] = useState();
    const [selectedMatch, setSelectedMatch] = useState('match1');

    useEffect(() => {
        const fetchScore = () => {
            axios.get(`${api}/livescore?matchId=${selectedMatch}`)
                .then(response => {
                    setScore(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        };

        fetchScore();

        const interval = setInterval(fetchScore, 10000);
        return () => clearInterval(interval);
    }, [selectedMatch]);

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
            {/* Video Background */}
            <Box
                as="video"
                src="https://rr3---sn-h5576nsk.googlevideo.com/videoplayback?expire=1723634532&ei=BD-8ZrX2Hdqd4t4P85Oh2AQ&ip=115.98.181.26&id=o-ALzew20ovKT9kjaJ2K62UTxrznz31Y_TCqNzBUsPpyt3&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&pcm2=no&bui=AQmm2exzNkcg403qsUBF9KEyfLtjakwVI4YFpCoh5zHwY85eYTxYCSGRROieVNV9igc3k9QZllDUh5gk&spc=Mv1m9hQveVwZ18SrU40rfX6UKcKjaFekpVnTWwPZDaLTUkZEYesx_GBRP3DJ&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Eoa6RdalvbZ9R1VY2XQKmDkQ&rqh=1&gir=yes&clen=10340303&otfp=1&dur=26.499&lmt=1706939437345969&keepalive=yes&c=WEB&sefc=1&txp=5311224&n=A1dvl6szDDBz3w&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cpcm2%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cotfp%2Cdur%2Clmt&sig=AJfQdSswRQIgavv7vo9j99_kBe_HnPcQfOv72j18O1rT_ms3slXTG1QCIQCAkdwjeuQT2V89lExgU0_CkCehbdU-whRq9Yp7LcSclA%3D%3D&rm=sn-i5uif5t-itqd7e,sn-gwpa-jwce7r,sn-h55se7s&rrc=79,79,104&fexp=24350516,24350517,24350557,24350561&req_id=3cb2dfd39345a3ee&redirect_counter=3&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=3Y&mip=2401:4900:6599:33bd:2817:f795:5fe2:7fdc&mm=30&mn=sn-h5576nsk&ms=nxu&mt=1723614276&mv=m&mvi=3&pl=48&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AGtxev0wRQIhAKGqkQTMgoAgy6Y5UPKK5K8YjMKCljgXIBRYis0t7hyyAiBWReuHyEpyQgmYQGB8SdASSbHryNd_EToP8as_DObFiQ%3D%3D"
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
                Live Cricket Score
            </Heading>

            <Flex direction="column" align="center" justify="center" w="100%" maxW="lg" gap={6}>
                <Box
                    w="100%"
                    p={4}
                    borderRadius="lg"
                    boxShadow="lg"
                    bg="rgba(0, 0, 0, 0.7)"
                    // backdropFilter="blur(10px)"
                >
                    <Select
                        placeholder="Select match"
                        mb={4}
                        value={selectedMatch}
                        onChange={(e) => setSelectedMatch(e.target.value)}
                        bg="blue.700"
                        borderColor="blue.200"
                        _hover={{ borderColor: 'blue.300' }}
                        _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
                        color="white"
                    >
                        <option value="match1" style={{ backgroundColor: '#1A202C', color: 'white' }}>Match 1</option>
                        <option value="match2" style={{ backgroundColor: '#1A202C', color: 'white' }}>Match 2</option>
                    </Select>
                    <Flex direction="column" align="center" justify="center" p={4} border="1px solid #E2E8F0" borderRadius="lg" bg="rgba(255, 255, 255, 0.1)">
                        {score ? (
                            <>
                                <Text fontSize="xl" fontWeight="bold" textAlign="center">
                                    {score.match}
                                </Text>
                                <Text fontSize="2xl" fontWeight="bold" color="yellow.300" mt={2} textAlign="center">
                                    {score.runs}/{score.wickets} in {score.overs} overs
                                </Text>
                                <Text fontSize="md" mt={2} textAlign="center">
                                    {score.commentary}
                                </Text>
                            </>
                        ) : (
                            <Spinner size="xl" color="yellow.400" />
                        )}
                    </Flex>
                </Box>
                <Link to={'/player-info'}>
            <Button
              colorScheme="green"
              width="full"
              bg="green.600"
              _hover={{ bg: 'green.700', transform: 'scale(1.05)' }}
              _active={{ bg: 'green.800', transform: 'scale(0.95)' }}
              borderRadius="full"
              py={6}
              fontSize="lg"
              boxShadow="0 4px 12px rgba(1, 0, 0, 0.3)"
              transition="all 0.3s ease"
            >
              Players details
            </Button>
          </Link>
            </Flex>
        </Box>
    );
}