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

        const interval = setInterval(fetchScores, 1);
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
            <img
                alt="background"
                src="https://i.postimg.cc/rw53wcd4/pixelcut-export-4.jpg"
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: '-1',
                }}
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
                    Players Details
                </Button>
            </Link>
        </Box>
    );
};
