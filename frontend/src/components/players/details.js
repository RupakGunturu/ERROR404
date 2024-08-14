import {
    Input,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Box,
    Heading,
    Flex,
    Image
} from '@chakra-ui/react';
import axios from "axios";
import { useEffect, useState } from "react";
import { api } from '../actions/api';

export const StudentData = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        await axios.post(api + "/findmany")
            .then((res) => {
                setData(res?.data);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box
            minH="100vh"
            p={6}
            bg="gray.800"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            color="white"
        >
            {/* Logo */}
            <Image 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToQs9CL4xw3CnflUpFWnnlvhfvT6nZgjIOwA&s" 
                alt="Cricket Logo" 
                boxSize="100px" 
                mb={4} 
            />

            <Heading size="lg" mb={6} textAlign="center" color="white" textShadow="2px 2px 8px rgba(0, 0, 0, 0.8)">
                Cricket Player Data
            </Heading>

            <Flex justify="center" w="100%" mb={6}>
                <Input
                    color='teal'
                    placeholder='Enter Player Name or Team Name'
                    _placeholder={{ color: 'gray.400' }}
                    onChange={(e) => setSearch(e.target.value)}
                    size="lg"
                    maxW="lg"
                    bg="gray.700"
                    borderColor="teal.500"
                    _hover={{ borderColor: 'teal.600' }}
                    _focus={{ borderColor: 'teal.600', boxShadow: '0 0 0 1px teal.600' }}
                />
            </Flex>

            <TableContainer
                w="100%"
                maxW="4xl"
                borderRadius="lg"
                bg="gray.700"
                boxShadow="lg"
                p={6}
            >
                <Table variant='simple' colorScheme='purple'>
                    <TableCaption color="purple.200">Bootcamp Students Data</TableCaption>
                    <Thead bg="purple.600">
                        <Tr>
                            <Th color="white">Player Name</Th>
                            <Th color="white">Team</Th>
                            <Th color="white">Runs</Th>
                            <Th color="white">StrikeRate</Th>
                            <Th color="white">Average</Th>
                            <Th color="white">Wickets</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data?.filter((filt) => 
                                filt?.PlayerName?.toLowerCase()?.includes(search?.toLowerCase()) ||
                                filt?.Team?.toLowerCase()?.includes(search?.toLowerCase())
                            )?.sort((a, b) => a?.PlayerName.localeCompare(b?.PlayerName))?.map((val, index) => (
                                <Tr key={index} bg={index % 2 === 0 ? "purple.500" : "purple.400"}>
                                    <Td color="white">{val.PlayerName}</Td>
                                    <Td color="white">{val.Team}</Td>
                                    <Td color="white">{val.Runs}</Td>
                                    <Td color="white">{val.StrikeRate}</Td>
                                    <Td color="white">{val.Average}</Td>
                                    <Td color="white">{val.Wickets}</Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};