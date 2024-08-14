import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Text, Heading, Flex, Spinner, Button } from '@chakra-ui/react';
import { api } from "../actions/api";
import { Link } from "react-router-dom";

export const Livescore = () => {
    const [scores, setScores] = useState([]);
    const [completedMatches, setCompletedMatches] = useState([]);

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

    useEffect(() => {
        const completed = [
            { team1: "CIC Hackers", team2: "Mech Robots", score: "150/7 (20.0 overs)", result: "CIC Hackers won by 3 wickets" },
            { team1: "CSE Coders", team2: "EEE Rockers", score: "180/6 (20.0 overs)", result: "EEE Rockers won by 4 wickets" },
            { team1: "Royal Civil", team2: "IT Rogers", score: "140/9 (20.0 overs)", result: "Royal Civil won by 1 wicket" }
        ];
        setCompletedMatches(completed);
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
            overflow="hidden"
        >
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: '-1',
                }}
                src="https://rr3---sn-h557snzr.googlevideo.com/videoplayback?expire=1723657878&ei=Npq8ZraEN9a0obIP7-ehyAg&ip=181.188.162.116&id=o-AN0RFaccDvwpeedHyCNZEj9otmePh1cqUHG-fJC8NXzK&itag=248&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AQmm2eweVnqNz2keeXH8mqp1FTThk5sXOd5QOLFfWxqtiKO5hfUgntUOBuWkSk5D6Jh-8bNmHRARnm10&spc=Mv1m9gxUfkrntxqGs39bTrZGZp98CUxV52WI5ISzmGmQD2RQcF8N&vprv=1&svpuc=1&mime=video%2Fwebm&ns=7RrimcI6wrqS-nxrdFCrZogQ&rqh=1&gir=yes&clen=7363026&dur=24.240&lmt=1702288850832264&keepalive=yes&c=WEB_CREATOR&sefc=1&txp=530F224&n=FZw0iI2q5beNaA&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAO7KV0tqtdBtDkPa54cDe9uJCW9y3htNZXB4YfXy8k8XAiA8AZ8G0en79shp0D_7MluHSEpPWSUSaYrii2OgZRjkXw%3D%3D&rm=sn-upbvcv-88pl76,sn-bg0ees7s&rrc=79,104&fexp=24350516,24350518,24350556,24350561&req_id=d7ac61e711d9a3ee&cmsv=e&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=Et&mip=175.101.94.8&mm=29&mn=sn-h557snzr&ms=rdu&mt=1723648877&mv=m&mvi=3&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AGtxev0wRQIgNSEZX_Qx95hGQHExbCN6N2OV3Y1-ey_PcKeqD_DAhn0CIQCvE9RbhJSOijjyzCOaHzL05mNgkTWvvBOvr9eOxygnGA%3D%3D"
            />
            <Heading size="lg" mb={6} textAlign="center" color="white" textShadow="2px 2px 8px rgba(0, 0, 0, 0.8)">
                Live Cricket Scores
            </Heading>

            <Flex direction="row" align="flex-start" w="100%" maxW="4xl" gap={6}>
                <Box flex="2" p={4} bg="rgba(0, 0, 0, 0.6)" borderRadius="lg" boxShadow="lg">
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
                                mb={4}
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
                </Box>
                <Box flex="1" p={4} bg="rgba(0, 0, 0, 0.6)" borderRadius="lg" boxShadow="lg">
                    <Heading size="md" color="white" mb={4}>
                        Completed Matches
                    </Heading>
                    {completedMatches.map((match, index) => (
                        <Box
                            key={index}
                            mb={4}
                            p={4}
                            borderRadius="md"
                            bg="rgba(255, 255, 255, 0.1)"
                            textAlign="center"
                        >
                            <Text fontWeight="bold" fontSize="lg">{match.team1} vs {match.team2}</Text>
                            <Text color="yellow.300" fontSize="md">{match.score}</Text>
                            <Text fontSize="sm">{match.result}</Text>
                        </Box>
                    ))}
                </Box>
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
