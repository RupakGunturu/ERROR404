import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../actions/api";
import { Box, Heading, FormControl, FormLabel, Button, Select, Flex, useToast, Text, VStack, HStack, Input, Tooltip } from '@chakra-ui/react';
import PageWrapper from "../wrapper/PageWrapper";
import AnimatedSection from "../wrapper/AnimatedSection";

export const SlotBook = () => {
  const [matchid, setMatchID] = useState("");
  const [slots, setSlots] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [demoUser, setDemoUser] = useState('');
  const [demoPass, setDemoPass] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (!loggedIn) return;
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
  }, [loggedIn, toast]);

  const handleDemoLogin = () => {
    if (demoUser === 'demo' && demoPass === 'slot123') {
      setLoggedIn(true);
      toast({ title: "Access Granted", status: "success", duration: 3000, isClosable: true });
    } else {
      toast({ title: "Invalid Credentials", description: "Use the demo credentials shown below", status: "error", duration: 3000, isClosable: true });
    }
  };

  const slotbook = async () => {
    try {
      const response = await axios.post(api + '/slot', { matchid });
      if (response.data.message === "Match Booked") {
        toast({ title: "Success", description: "Slot has been booked successfully.", status: "success", duration: 5000, isClosable: true });
        setSlots(prevSlots => prevSlots.map(slot =>
          slot.id === matchid ? { ...slot, booked: true } : slot
        ));
      } else if (response.data.message === "Match Already Booked") {
        toast({ title: "Error", description: "This slot is already booked.", status: "error", duration: 5000, isClosable: true });
      }
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while booking the slot.", status: "error", duration: 5000, isClosable: true });
    }
  };

  const deleteslot = async () => {
    try {
      const response = await axios.delete(api + '/slot', { data: { matchid } });
      if (response.data.message === "Match Deleted") {
        toast({ title: "Success", description: "Slot has been canceled successfully.", status: "success", duration: 5000, isClosable: true });
        setSlots(prevSlots => prevSlots.map(slot =>
          slot.id === matchid ? { ...slot, booked: false } : slot
        ));
      } else if (response.data.message === "Match Not Found") {
        toast({ title: "Error", description: "This slot is not booked.", status: "error", duration: 5000, isClosable: true });
      }
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while canceling the slot.", status: "error", duration: 5000, isClosable: true });
    }
  };

  if (!loggedIn) {
    return (
      <PageWrapper>
        <Flex minH="calc(100vh - 100px)" align="center" justify="center">
          <AnimatedSection style={{ width: '100%', maxWidth: '420px' }}>
          <Card maxW="420px" w="full">
            <CardBody p={8}>
              <VStack spacing={5} align="stretch">
                <Flex direction="column" align="center" gap={2} mb={2}>
                  <Text fontSize="3xl">📅</Text>
                  <Heading size="lg" color="white" fontWeight={700}>
                    Slot Booking
                  </Heading>
                  <Text color="surface.400" fontSize="sm">
                    Please sign in to access slot booking
                  </Text>
                </Flex>

                <FormControl>
                  <FormLabel color="surface.300" fontSize="sm">Username</FormLabel>
                  <Input placeholder="Enter username" onChange={(e) => setDemoUser(e.target.value)} />
                </FormControl>

                <FormControl>
                  <FormLabel color="surface.300" fontSize="sm">Password</FormLabel>
                  <Input type="password" placeholder="Enter password" onChange={(e) => setDemoPass(e.target.value)} />
                </FormControl>

                <Button variant="primary" onClick={handleDemoLogin} width="full" size="lg" fontSize="md">
                  Access Slot Booking
                </Button>

                <Flex justify="center">
                  <Tooltip label="Use these demo credentials to access slot booking" placement="top">
                    <HStack
                      spacing={2}
                      bg="rgba(212,160,23,0.1)"
                      border="1px solid rgba(212,160,23,0.25)"
                      borderRadius="full"
                      px={4}
                      py={2}
                      cursor="pointer"
                      _hover={{ bg: 'rgba(212,160,23,0.15)' }}
                      transition="all 0.2s"
                    >
                      <Text fontSize="xs" color="accent.400" fontWeight={600}>🔑</Text>
                      <Text fontSize="xs" color="accent.400" fontWeight={500}>
                        Demo: demo / slot123
                      </Text>
                    </HStack>
                  </Tooltip>
                </Flex>
              </VStack>
            </CardBody>
          </Card>
          </AnimatedSection>
        </Flex>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Flex minH="calc(100vh - 100px)" align="center" justify="center">
        <AnimatedSection style={{ width: '100%', maxWidth: 'xl' }}>
        <Box w="100%" maxW="xl" p={8} borderRadius="20px" bg="rgba(26,39,68,0.85)" backdropFilter="blur(16px)" border="1px solid rgba(255,255,255,0.06)" boxShadow="0 8px 32px rgba(0,0,0,0.3)">
          <VStack spacing={6} align="stretch">
            <Flex direction="column" align="center" gap={2}>
              <Text fontSize="3xl">📅</Text>
              <Heading size="lg" color="white" fontWeight={700} textAlign="center">
                SLOT BOOKING
              </Heading>
            </Flex>

            <FormControl>
              <FormLabel color="surface.300" fontSize="sm">Select Slot</FormLabel>
              <Select
                placeholder="Select match"
                value={matchid}
                onChange={(e) => setMatchID(e.target.value)}
              >
                {slots.map(slot => (
                  <option key={slot.id} value={slot.id} style={{ backgroundColor: '#1E293B', color: 'white' }}>
                    {slot.name} - {slot.booked ? "Booked" : "Available"}
                  </option>
                ))}
              </Select>
            </FormControl>

            <HStack spacing={4}>
              <Button variant="primary" onClick={slotbook} width="full">
                BOOK
              </Button>
              <Button variant="outline" onClick={deleteslot} width="full">
                Cancel Slot
              </Button>
            </HStack>

            <Box>
              <Heading size="sm" color="accent.400" mb={3}>Slot Availability</Heading>
              {slots.length === 0 ? (
                <Text color="surface.500" textAlign="center" py={4}>Loading slots...</Text>
              ) : (
                <VStack spacing={2} align="stretch">
                  {slots.map(slot => (
                    <Flex
                      key={slot.id}
                      justify="space-between"
                      align="center"
                      p={3}
                      borderRadius="10px"
                      bg="rgba(255,255,255,0.03)"
                    >
                      <Text color="surface.200" fontSize="sm">{slot.name}</Text>
                      <Text
                        fontSize="xs"
                        fontWeight={600}
                        color={slot.booked ? "red.400" : "green.400"}
                        bg={slot.booked ? "rgba(255,0,0,0.1)" : "rgba(0,255,0,0.1)"}
                        px={3}
                        py={1}
                        borderRadius="full"
                      >
                        {slot.booked ? "Booked" : "Available"}
                      </Text>
                    </Flex>
                  ))}
                </VStack>
              )}
            </Box>

            <Button variant="glass" size="sm" onClick={() => setLoggedIn(false)}>
              ← Logout
            </Button>
          </VStack>
        </Box>
        </AnimatedSection>
      </Flex>
    </PageWrapper>
  );
};

const Card = ({ children, maxW, w }) => (
  <Box maxW={maxW} w={w} p={8} borderRadius="20px" bg="rgba(26,39,68,0.85)" backdropFilter="blur(16px)" border="1px solid rgba(255,255,255,0.06)" boxShadow="0 8px 32px rgba(0,0,0,0.3)">
    {children}
  </Box>
);

const CardBody = ({ children, p }) => <Box p={p}>{children}</Box>;
