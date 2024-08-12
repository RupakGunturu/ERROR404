import React from 'react';
// import axios from 'axios';
// import { api } from './actions/api';
// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button, VStack,Flex } from '@chakra-ui/react';
import { SignIn } from './signin/signin';
import { SignUp } from './signup/signup';

export const Home=()=>{
    const nav=useNavigate()
    return (
        <>
        <Flex
      direction="column"
      align="center"
      justify="center"
      bgImage="url('https://i.ibb.co/XFJpjkB/pixelcut-export.jpg')"
      minH="100vh"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    //   bg="gray.50"
      p={6}
    >
      <Heading as="h1" size="2xl" mb={6} color="gray.700">
        Welcome to SRKR Cricket Management
      </Heading>
      <Text fontSize="lg" mb={8} color="gray.600" textAlign="center">
      </Text>
      <VStack spacing={4} width="100%" maxW="sm">
        <Link to={'/signin'}>
          <Button
            colorScheme="blue"
            width="full"
            bg="blue.500"
            _hover={{ bg: 'blue.600' }}
            borderRadius="md"
            py={6}
            fontSize="lg"
          >
            Login
          </Button>
        </Link>
        <Link to={'/signup'}>
          <Button
            colorScheme="teal"
            width="full"
            bg="teal.500"
            _hover={{ bg: 'teal.600' }}
            borderRadius="md"
            py={6}
            fontSize="lg"
          >
            Register
          </Button>
        </Link>
        <Link to={'/dashboard'}>
          <Button
            colorScheme="green"
            width="full"
            bg="green.500"
            _hover={{ bg: 'green.600' }}
            borderRadius="md"
            py={6}
            fontSize="lg"
          >
            View Dashboard
          </Button>
        </Link>
      </VStack>
    </Flex>
        </>
      );
}

