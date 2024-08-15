import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Select, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { api } from '../actions/api';
import { Navbar } from '../navbar/nav';

export const AdminUpdate = () => {
    const [matchId, setMatchId] = useState('');
    const [runs, setRuns] = useState('');
    const [wickets, setWickets] = useState('');
    const [overs, setOvers] = useState('');

    const Adminupdate = async () => {
        await axios.post(api + '/score', { matchId, runs, wickets, overs })
            .then((res) => {
                console.log(res?.data?.values);
                alert('Score updated successfully!');
            })
            .catch((e) => console.log(e));
    }

    return (
        <>
        <Navbar/>
        <Flex
            height="100vh"
            width="100vw"
            bg="url('https://i.postimg.cc/tgND18Vt/t20.jpg')"
            bgPosition="center"
            alignItems="center"
            justifyContent="center"
            p={4}
        >
            <Box
                w="100%"
                maxW="xl"
                p={8}
                borderRadius="lg"
                boxShadow="2xl"
                bg="rgba(0, 0, 0, 0.8)"
                color="white" 
                backdropFilter="blur(10px)" 
            >
                <Box bg="rgba(0, 0, 0, 0.6)" p={6} borderRadius="lg"> 
                    <Heading 
                        mb={6} 
                        textAlign="center" 
                        color="red.500" 
                        textShadow="2px 2px 8px rgba(0, 0, 0, 0.8)"
                    >
                        Update Live Scores
                    </Heading>
                    <FormControl mb={4}>
                        <FormLabel color="red.400">Select Match</FormLabel>
                        <Select
                            placeholder="Select match"
                            value={matchId}
                            onChange={(e) => setMatchId(e.target.value)}
                            bg="blackAlpha.300"
                            color="white"
                            borderColor="red.300"
                            _hover={{ borderColor: 'red.400' }}
                            _focus={{ borderColor: 'red.500', boxShadow: '0 0 0 1px red.500' }}
                        >
                            <option value="match1" style={{ backgroundColor: '#1A202C', color: 'white' }}>Match 1</option>
                            <option value="match2" style={{ backgroundColor: '#1A202C', color: 'white' }}>Match 2</option>
                        </Select>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel color="red.400">Runs</FormLabel>
                        <Input
                            type="number"
                            value={runs}
                            onChange={(e) => setRuns(e.target.value)}
                            bg="blackAlpha.300"
                            borderColor="red.300"
                            color="white"
                            _hover={{ borderColor: 'red.400' }}
                            _focus={{ borderColor: 'red.500', boxShadow: '0 0 0 1px red.500' }}
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel color="red.400">Wickets</FormLabel>
                        <Input
                            type="number"
                            value={wickets}
                            onChange={(e) => setWickets(e.target.value)}
                            bg="blackAlpha.300"
                            borderColor="red.300"
                            color="white"
                            _hover={{ borderColor: 'red.400' }}
                            _focus={{ borderColor: 'red.500', boxShadow: '0 0 0 1px red.500' }}
                        />
                    </FormControl>
                    <FormControl mb={6}>
                        <FormLabel color="red.400">Overs</FormLabel>
                        <Input
                            type="number"
                            value={overs}
                            onChange={(e) => setOvers(e.target.value)}
                            bg="blackAlpha.300"
                            borderColor="red.300"
                            color="white"
                            _hover={{ borderColor: 'red.400' }}
                            _focus={{ borderColor: 'red.500', boxShadow: '0 0 0 1px red.500' }}
                        />
                    </FormControl>
                    <Button
                        colorScheme="red"
                        onClick={Adminupdate}
                        width="100%"
                        bg="red.600"
                        _hover={{ bg: "red.700" }}
                        _active={{ bg: "red.800" }}
                    >
                        Update Score
                    </Button>
                </Box>
            </Box>
        </Flex>
        </>
    );
}