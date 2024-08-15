import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../navbar/nav';

export const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const Adminlogin = async () => {
        if (username === 'ERROR404' && password === 'admin') {
            sessionStorage.setItem('isAdminAuthenticated', 'true');
            nav('/admin-dashboard');
        } else {
            alert('Invalid username or password');
        }
    }

    return (
        <>
        <Navbar/>
        <Box
            height="85vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgImage="url('https://i.postimg.cc/L6YMq7Ds/pixelcut-export-1.jpg')" 
            bgSize="cover"
            bgPosition="center"
        >
            <Box
                p={8}
                maxW="md"
                width="100%"
                mx="auto"
                borderRadius="x1"
                boxShadow="lg"
                bg="rgba(855, 855, 855, 0.5)" 
                // backdropFilter="blur(0px)"
                textAlign="center"
            >
                <Heading 
                    mb={6} 
                    color="blue.800" 
                    // textShadow="1px 1px 2px rgba(0, 0, 0, 0.8)"
                    font-family={"serif"}
                >
                    Scorer Login
                </Heading>
                <FormControl mb={4}>
                    <FormLabel color="blue.800">Username</FormLabel>
                    <Input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        bg="#e3e5e5"
                        borderColor="blue.300"
                        _hover={{ borderColor: 'blue.400' }}
                        _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                    />
                </FormControl>
                <FormControl mb={6}>
                    <FormLabel color="blue.800">Password</FormLabel>
                    <Input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        bg="#e3e5e5"
                        borderColor="blue.300"
                        _hover={{ borderColor: 'blue.400' }}
                        _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                    />
                </FormControl>
                <Button 
                    colorScheme="blue" 
                    onClick={Adminlogin} 
                    width="100%" 
                    bg="green.600"
                    _hover={{ bg: "blue.700" }}
                    _active={{ bg: "blue.800" }}
                >
                    <strong>Login</strong>
                </Button>
            </Box>
        </Box>
        </>
    );
}