import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Text, Heading, Select, Flex, Spinner, Icon } from '@chakra-ui/react';
import { api } from "../actions/api";
// import { MdSportsCricket } from 'react-icons/md';

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
            bgImage="url('https://img.freepik.com/free-vector/green-cricket-sports-background-with-illustration-players-golden-trophy-cup_1302-5494.jpg?t=st=1723569402~exp=1723573002~hmac=e7712fb7f7fc35d752bcb4de6a4cdcf69d2f943aad1495f74fc65ac8846c78f4&w=900')" // Replace with your cricket-themed background URL
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            color="white"
        >
            <Heading size="lg" mb={6} textAlign="center" color="white" textShadow="2px 2px 8px rgba(0, 0, 0, 0.8)">
                Live Cricket Score
            </Heading>

            {/* Add multiple match sections for a more comprehensive display */}
            <Flex direction="column" align="center" justify="center" w="100%" maxW="lg" gap={6}>
                <Box
                    w="100%"
                    p={4}
                    borderRadius="lg"
                    boxShadow="lg"
                    bg="rgba(0, 0, 0, 0.7)"
                    backdropFilter="blur(10px)"
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
                                {/* <Icon as={MdSportsCricket} w={12} h={12} color="yellow.400" mb={4} /> */}
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
            </Flex>
        </Box>
    );
}