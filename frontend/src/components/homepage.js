import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button, VStack, Flex } from '@chakra-ui/react';

export const Home = () => {
  const nav = useNavigate();

  return (
    <>
      <Flex
        direction="column"
        align="center"
        justify="center"
        position="relative"
        minH="100vh"
        p={6}
        boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
        color="white"
      >
        {/* Video Background */}
        <Box
          as="video"
          src="https://r3---sn-ci5gup-h55d.googlevideo.com/videoplayback?expire=1723636672&ei=YEe8ZpSkDeLcybgP9Mru8Ak&ip=198.98.59.215&id=o-APaj63rA2dBCzQ68uFtiD161jRiBw-35TFEZnat7zN8F&itag=137&aitags=134%2C136%2C137%2C160&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&siu=1&bui=AQmm2ex6Xm_kNMI9DQYfdGVK1-KyZah7_WCKg5AffGym1Gx0W0ntNX-qz16qqIj8WyuX0rnAsQ&vprv=1&svpuc=1&mime=video%2Fmp4&ns=TMhtUyAiePvB0SYhbZAO6vQQ&rqh=1&gir=yes&clen=16366216&dur=30.989&lmt=1638874742112794&keepalive=yes&c=WEB&sefc=1&txp=5316224&n=grBN-SOnO5Mo_Q&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgY7ilEUiaPq0eqdLWUKdRUcF1tBJfJiiUAxqcidPjA68CIQDQUVnlIk9dWkbx5zZeyfJd7zib8lW0xFEEIcGucLD8rA%3D%3D&range=0-&redirect_counter=1&cm2rm=sn-ci5gup-8b5z7e&rrc=80&fexp=24350516,24350517,24350557,24350561&req_id=662399614e20a6e9&cms_redirect=yes&cmsv=e&mh=44&mip=2401:4900:6599:33bd:2817:f795:5fe2:7fdc&mm=29&mn=sn-ci5gup-h55d&ms=rdu&mt=1723614783&mv=m&mvi=3&pl=48&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AGtxev0wRgIhAJb6P1TL9ou5hP17-os6ImPH7coVAm__0XrXINLkIFEOAiEA1ThjX-LJM6jNaAdspYAjXyT3XylLq29z2SiW9QeiUO8%3D"
          autoPlay
          loop
          muted
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          zIndex="-1"
        />

        {/* Content */}
        <Heading
          as="h1"
          size="2xl"
          mb={8}
          color="orange"
          textShadow="2px 2px 6px rgba(1, 0.8, 0.6, 0.8)"
          fontFamily={'serif'}
        >
          <h1>Welcome!! TO SRKR CRICKET CLUB</h1>
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