import React from 'react';
// import axios from 'axios';
// import { api } from './actions/api';
// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button, VStack,Flex } from '@chakra-ui/react';
// import { SignIn } from './signin/signin';
// import { SignUp } from './signup/signup';

export const Home = () => {
  const nav = useNavigate();

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
        p={6}
        boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
        backdropFilter="blur(8px)"
      >
        <Heading
          as="h1"
          size="2xl"
          mb={8}
          color="orange"
          textShadow="2px 2px 6px rgba(1, 0.8, 0.6, 0.8)"
          fontFamily={'serif'}
        >
          <h1 >Welcome!! TO SRKR CRICKET CLUB</h1>
        </Heading>
        <Text
          fontSize="lg"
          mb={6}
          color="Black"
          textAlign="center"
          fontStyle="italic"
          letterSpacing="wider"
          fontFamily={'serif'}
          fontWeight={900}
          size="1xl"
        >
          From ERROR404
        </Text>
        <VStack spacing={4} width="100%" maxW="sm">
          <Link to={'/signin'}>
            <Button
              colorScheme="blue"
              width="full"
              bg="blue.600"
              _hover={{ bg: 'blue.700', transform: 'scale(1.05)' }}
              _active={{ bg: 'blue.800', transform: 'scale(0.95)' }}
              borderRadius="full"
              py={6}
              fontSize="lg"
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
              transition="all 0.3s ease"
            >
              Login
            </Button>
          </Link>
          <Link to={'/signup'}>
            <Button
              colorScheme="teal"
              width="full"
              bg="teal.600"
              _hover={{ bg: 'teal.700', transform: 'scale(1.05)' }}
              _active={{ bg: 'teal.800', transform: 'scale(0.95)' }}
              borderRadius="full"
              py={6}
              fontSize="lg"
              boxShadow="0 4px 12px rgba(1, 0, 0, 0.3)"
              transition="all 0.3s ease"
            >
              Register
            </Button>
          </Link>
          <Link to={'/admin'}>
            <Button
              colorScheme="green"
              width="full"
              bg="green.600"
              _hover={{ bg: 'green.700', transform: 'scale(1.05)' }}
              _active={{ bg: 'green.800', transform: 'scale(0.95)' }}
              borderRadius="full"
              py={6}
              fontSize="lg"
              boxShadow="0 4px 12px rgba(1, 0, 0, 0.3)"
              transition="all 0.3s ease"
            >
              Admin Dashboard
            </Button>
          </Link>
        </VStack>
      </Flex>
    </>
  );
}

