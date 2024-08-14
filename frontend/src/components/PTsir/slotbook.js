import { useState } from "react";
import axios from "axios";
import { api } from "../actions/api";
import { Box, Heading, FormControl, FormLabel, Button, Select, Flex, useToast } from '@chakra-ui/react';

export const SlotBook = () => {
  const [matchid, setMatchID] = useState("");
  const toast = useToast();

  const slotbook = async () => {
    try {
      const response = await axios.post(`${api}/slot`, { matchid });
      if (response.data.message === "Match Booked") {
        toast({
          title: "Success",
          description: "Slot has been booked successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else if (response.data.message === "Match Already Booked") {
        toast({
          title: "Error",
          description: "This slot is already booked.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while booking the slot.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      height="100vh"
      width="100vw"
      bg="url('https://img.freepik.com/free-vector/t20-world-cup-cricket-championship-poster-template-brochure-decorated-flyer-banner-design_460848-15769.jpg?t=st=1723570203~exp=1723573803~hmac=bd073a380bfae9d9d328d88a2686bc8039b4c67b0ad9ad39bedf79c708c3fc8e&w=900')"
      bgSize="cover"
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
            SLOT BOOKING
          </Heading>
          <FormControl mb={4}>
            <FormLabel color="red.400">Select Slot</FormLabel>
            <Select
              placeholder="Select match"
              value={matchid}
              onChange={(e) => setMatchID(e.target.value)}
              bg="blackAlpha.300"
              color="white"
              borderColor="red.300"
              _hover={{ borderColor: 'red.400' }}
              _focus={{ borderColor: 'red.500', boxShadow: '0 0 0 1px red.500' }}
            >
              <option value="match1" style={{ backgroundColor: '#1A202C', color: 'white' }}>15 Aug Morning session</option>
              <option value="match2" style={{ backgroundColor: '#1A202C', color: 'white' }}>15 Aug Evening session</option>
            </Select>
          </FormControl>
          <Button
            colorScheme="red"
            onClick={slotbook}
            width="100%"
            bg="red.600"
            _hover={{ bg: "red.700" }}
            _active={{ bg: "red.800" }}
          >
            BOOK
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
