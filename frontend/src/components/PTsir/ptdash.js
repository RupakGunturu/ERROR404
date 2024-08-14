import React from 'react';
import { Box, Heading, SimpleGrid, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../navbar/nav';

export const PTdashboard = () => {
    const nav = useNavigate();

    const updateslots = () => {
        nav('/slot-booking');
    };

    const notifications=()=>{
        alert("16th Aug morning session Is BOOKED")
    }

    return (
        <>
        <Navbar/>
        <Flex
            height="100vh"
            width="100vw"
            bg="url('https://i.postimg.cc/SxbGx5bH/Pngtree-five-ring-background-of-red-1619320.png')"
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
                    PT SIR Dashboard
                </Heading>
                <SimpleGrid columns={1} spacing={8}>
                    {/* <Button colorScheme="teal" size="lg" onClick={handleScheduleMatches}>
                        Schedule Matches
                    </Button> */}
                    <Button 
                        colorScheme="red" 
                        size="lg" 
                        onClick={updateslots}
                        bg="red.600"
                        _hover={{ bg: "red.700" }}
                        _active={{ bg: "red.800" }}
                    >
                        Update Slots
                    </Button>
                </SimpleGrid>
                <br/>
                <SimpleGrid columns={1} spacing={8}>
                    {/* <Button colorScheme="teal" size="lg" onClick={handleScheduleMatches}>
                        Schedule Matches
                    </Button> */}
                    <Button 
                        colorScheme="red" 
                        size="lg" 
                        onClick={notifications}
                        bg="red.600"
                        _hover={{ bg: "red.700" }}
                        _active={{ bg: "red.800" }}
                    >
                        Notifications
                    </Button>
                </SimpleGrid>
            </Box>
        </Flex>
        </>
    );
}