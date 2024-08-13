import React from 'react';
import { Box, Heading, SimpleGrid, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../navbar/nav';

export const AdminDashboard = () => {
    const nav = useNavigate();

    const handleUpdateScores = () => {
        nav('/score');
    };

    return (
        <>
        <Navbar/>
        <Flex
            height="100vh"
            width="100vw"
            bg="url('https://i.postimg.cc/RhmXMWgf/pixelcut-export-2.jpg')"
            bgSize="cover"
            bgPosition="center"
            alignItems="center"
            justifyContent="center"
            p={4}
        >
            <Box
                w="200%"
                maxW="lg"
                p={6}
                borderRadius="xl"
                boxShadow="2xl"
                bg="rgba(0, 0, 0, 0.5)"
                color="white" 
                // backdropFilter="blur(10px)"
            >
                <Heading 
                    mb={6} 
                    textAlign="center" 
                    color="red.500" 
                    // textShadow="2px 2px 8px rgba(0, 0, 0, 0.8)"
                >
                    Admin Dashboard
                </Heading>
                <SimpleGrid columns={1} spacing={8}>
                    {/* <Button colorScheme="teal" size="lg" onClick={handleScheduleMatches}>
                        Schedule Matches
                    </Button> */}
                    <Button 
                        colorScheme="red" 
                        size="lg" 
                        onClick={handleUpdateScores}
                        bg="red.600"
                        _hover={{ bg: "red.700" }}
                        _active={{ bg: "red.800" }}
                    >
                        Update Live Scores
                    </Button>
                </SimpleGrid>
            </Box>
        </Flex>
        </>
    );
}