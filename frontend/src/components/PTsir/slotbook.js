import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../actions/api";
import { Box, Heading, FormControl, FormLabel, Button, Select, Flex, useToast, Text } from '@chakra-ui/react';

export const SlotBook = () => {
  const [matchid, setMatchID] = useState("");
  const [slots, setSlots] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get(`${api}/slots`);
        setSlots(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while fetching the slots.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchSlots();
  }, [toast]);

  const slotbook = async () => {
    try {
      const response = await axios.post(api + '/slot', { matchid });
      if (response.data.message === "Match Booked") {
        toast({
          title: "Success",
          description: "Slot has been booked successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setSlots(prevSlots => prevSlots.map(slot =>
          slot.id === matchid ? { ...slot, booked: true } : slot
        ));
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

  const deleteslot = async () => {
    try {
      const response = await axios.delete(api + '/slot', { data: { matchid } });
      if (response.data.message === "Match Deleted") {
        toast({
          title: "Success",
          description: "Slot has been canceled successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setSlots(prevSlots => prevSlots.map(slot =>
          slot.id === matchid ? { ...slot, booked: false } : slot
        ));
      } else if (response.data.message === "Match Not Found") {
        toast({
          title: "Error",
          description: "This slot is not booked.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while canceling the slot.",
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
      bg="url('https://i.postimg.cc/tgND18Vt/t20.jpg')"
      bgSize="fixed"
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
              {slots.map(slot => (
                <option key={slot.id} value={slot.id} style={{ backgroundColor: '#1A202C', color: 'white' }}>
                  {slot.name} - {slot.booked ? "Booked" : "Available"}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button
            colorScheme="red"
            onClick={slotbook}
            width="100%"
            bg="red.600"
            _hover={{ bg: "red.700" }}
            _active={{ bg: "red.800" }}
            mb={4}
          >
            BOOK
          </Button>
          <Button
            colorScheme="red"
            onClick={deleteslot}
            width="100%"
            bg="red.600"
            _hover={{ bg: "red.700" }}
            _active={{ bg: "red.800" }}
          >
            Cancel Slot
          </Button>
        </Box>
        <Box mt={6}>
          <Heading size="md" color="red.500" mb={4}>Slot Availability</Heading>
          {slots.map(slot => (
            <Text key={slot.id} color={slot.booked ? "red.400" : "green.400"}>
              {slot.name}: {slot.booked ? "Booked" : "Available"}
            </Text>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};
