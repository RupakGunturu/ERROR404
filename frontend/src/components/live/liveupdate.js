import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Text, Heading, Select } from '@chakra-ui/react';
import { api } from "../actions/api";

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
                    console.error('Bhayya error', error);
                });
        };

        fetchScore();

        const interval = setInterval(fetchScore, 10000);
        return () => clearInterval(interval);
    }, [selectedMatch]);

    return (
        <Box p={4} bg="gray.100" borderRadius="md">
            <Heading size="md" mb={4}>Live Score</Heading>
            <Select 
                placeholder="Select match" 
                mb={4} 
                value={selectedMatch} 
                onChange={(e) => setSelectedMatch(e.target.value)}
            >
                <option value="match1">Match 1</option>
                <option value="match2">Match 2</option>
            </Select>
            {score ? (
                <Text>{score.match}: {score.runs}/{score.wickets} in {score.overs} overs</Text>
            ) : (
                <Text>Loading...</Text>
            )}
        </Box>
    );
}
