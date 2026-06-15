import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Text, Heading, Flex, Spinner, Button, VStack, HStack } from '@chakra-ui/react';
import { api } from "../actions/api";
import { Link } from "react-router-dom";
import AnimatedSection from "../wrapper/AnimatedSection";

export const Livescore = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [completedMatches] = useState([
        { team1: "CIC Hackers", team2: "Mech Robots", score: "150/7 (20.0)", result: "CIC Hackers won by 3 wickets" },
        { team1: "CSE Coders", team2: "EEE Rockers", score: "180/6 (20.0)", result: "EEE Rockers won by 4 wickets" },
        { team1: "Royal Civil", team2: "IT Rogers", score: "140/9 (20.0)", result: "Royal Civil won by 1 wicket" }
    ]);

    useEffect(() => {
        const fetchScores = () => {
            const matchIds = ['match1', 'match2'];
            Promise.all(matchIds.map(id => axios.get(`${api}/livescore?matchId=${id}`)))
                .then(responses => {
                    setScores(responses.map(r => r.data));
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        };

        fetchScores();
        const interval = setInterval(fetchScores, 5000);
        return () => clearInterval(interval);
    }, []);

    const LiveDot = () => (
        <Box as="span" display="inline-block" w={2} h={2} borderRadius="full" bg="red.400" mr={2} boxShadow="0 0 8px rgba(255,0,0,0.6)" animation="pulse 1.5s infinite" />
    );

    return (
        <Box minH="100vh" pt={4}>
            <style>{`@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }`}</style>
            <VStack spacing={8} align="stretch" maxW="6xl" mx="auto" px={{ base: 4, md: 6 }}>
                <AnimatedSection>
                    <Flex direction="column" align="center" gap={2}>
                        <Heading size="xl" color="white" fontWeight={700}>
                            🏏 Live Cricket Scores
                        </Heading>
                        <HStack spacing={1}>
                            <LiveDot />
                            <Text color="surface.400" fontSize="sm">Live — auto-updates every 5s</Text>
                        </HStack>
                    </Flex>
                </AnimatedSection>

                <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
                    <Box flex="2">
                        {loading ? (
                            <Flex justify="center" align="center" minH="200px">
                                <Spinner size="xl" color="accent.400" />
                            </Flex>
                        ) : scores.length > 0 ? (
                            <VStack spacing={4} align="stretch">
                                {scores.map((score, index) => (
                                    <AnimatedSection key={index} delay={index * 0.1}>
                                        <Box p={6} borderRadius="16px" bg="rgba(26,39,68,0.6)" border="1px solid rgba(255,255,255,0.06)" boxShadow="0 4px 20px rgba(0,0,0,0.2)">
                                            <Flex justify="space-between" align="center" mb={3}>
                                                <Text fontSize="xs" color="surface.400" fontWeight={600} textTransform="uppercase" letterSpacing="wide">
                                                    {score.match || ("Match " + (index + 1))}
                                                </Text>
                                                <HStack spacing={1}>
                                                    <Box w={2} h={2} borderRadius="full" bg="green.400" />
                                                    <Text fontSize="xs" color="green.400">LIVE</Text>
                                                </HStack>
                                            </Flex>
                                            <Flex align="baseline" gap={3} mb={2}>
                                                <Text fontSize="3xl" fontWeight={800} color="white">
                                                    {score.runs || 0}
                                                    <Text as="span" fontSize="xl" color="surface.400">/{score.wickets || 0}</Text>
                                                </Text>
                                                <Text fontSize="sm" color="surface.500">
                                                    ({score.overs || "0.0"} overs)
                                                </Text>
                                            </Flex>
                                            {score.commentary && (
                                                <Text fontSize="sm" color="surface.300" fontStyle="italic">
                                                    "{score.commentary}"
                                                </Text>
                                            )}
                                        </Box>
                                    </AnimatedSection>
                                ))}
                            </VStack>
                        ) : (
                            <Flex justify="center" align="center" minH="200px">
                                <Text color="surface.500">No live matches currently</Text>
                            </Flex>
                        )}
                    </Box>

                    <Box flex="1">
                        <AnimatedSection delay={0.15}>
                            <Box p={6} borderRadius="16px" bg="rgba(26,39,68,0.6)" border="1px solid rgba(255,255,255,0.06)" boxShadow="0 4px 20px rgba(0,0,0,0.2)">
                                <Heading size="sm" color="accent.400" mb={4}>Completed Matches</Heading>
                                <VStack spacing={3} align="stretch">
                                    {completedMatches.map((match, index) => (
                                        <Box key={index} p={3} borderRadius="10px" bg="rgba(255,255,255,0.03)">
                                            <Text fontWeight={600} fontSize="sm" color="white">{match.team1} vs {match.team2}</Text>
                                            <Text fontSize="xs" color="accent.400" mt={1}>{match.score}</Text>
                                            <Text fontSize="xs" color="surface.400" mt={0.5}>{match.result}</Text>
                                        </Box>
                                    ))}
                                </VStack>
                            </Box>
                        </AnimatedSection>
                    </Box>
                </Flex>

                <AnimatedSection delay={0.2}>
                    <Flex justify="center" pb={8}>
                        <Link to="/player-info">
                            <Button variant="glass">
                                📊 View Players Details
                            </Button>
                        </Link>
                    </Flex>
                </AnimatedSection>
            </VStack>
        </Box>
    );
};
