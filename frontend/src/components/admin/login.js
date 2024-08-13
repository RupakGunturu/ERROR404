import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import { useNavigate,Link } from 'react-router-dom';

export const AdminLogin=()=>{
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const nav=useNavigate();

    const Adminlogin=async() => {
        if (username === 'admin' && password === 'admin') {
            sessionStorage.setItem('isAdminAuthenticated', 'true');
            nav('/admin-dashboard');
          } else {
            alert('Invalid username or password');
          }
    }

    return (
        <Box p={8} maxW="md" mx="auto">
          <Heading mb={6}>Admin Login</Heading>
          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          {/* <Link to={'/dashboard'}> */}
          <Button colorScheme="blue" onClick={Adminlogin}>
            Login
          </Button>
          {/* </Link> */}
        </Box>
      );
}