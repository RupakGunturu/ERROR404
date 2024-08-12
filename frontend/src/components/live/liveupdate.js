import axios from "axios";
import { useEffect,useState } from "react";
import { Box, Text, Heading } from '@chakra-ui/react';

export const Livescore=()=>{
    const [score,setScore]=useState()

    useEffect(() => {
        const fetchScore = () => {
          axios.get('/api/live-score')
            .then(response => {
              setScore(response.data);
            })
            .catch(error => {
              console.error('Error fetching live score:', error);
            });
        };

        fetchScore()

        const interval=setInterval(fetchScore,10000)
        return()=>clearInterval(interval);
},[]);

return (
    <Box p={4} bg="gray.100" borderRadius="md">
      <Heading size="md" mb={4}>Live Score</Heading>
      {score ? (
        <Text>{score.match}: {score.runs}/{score.wickets} in {score.overs} overs</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
}