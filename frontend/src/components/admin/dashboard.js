import React from 'react';
import { Box, Heading, SimpleGrid, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard=()=>{
    const nav=useNavigate();

    const handleUpdateScores = () => {
        nav('/score');
      };

    //   const handleScheduleMatches = () => {
    //     navigate('/schedule-matches');
    //   };

      return (
        <Box p={8}>
          <Heading mb={6} textAlign="center">
            Admin Dashboard
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
            {/* <Button colorScheme="teal" size="lg" onClick={handleScheduleMatches}>
              Schedule Matches
            </Button> */}
            <Button colorScheme="red" size="lg" onClick={handleUpdateScores}>
              Update Live Scores
            </Button>
          </SimpleGrid>
        </Box>
      );
}