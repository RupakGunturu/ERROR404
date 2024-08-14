import { useState, useEffect } from "react";
import { Box, Text, Grid, GridItem, Button, Heading, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { api } from "../actions/api";

export const SlotBooking = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get(api + "/slots");
      setSlots(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setLoading(false);
    }
  };

  const handleBooking = async (index) => {
    const updatedSlots = [...slots];
    updatedSlots[index].booked = !updatedSlots[index].booked;
    setSlots(updatedSlots);

    try {
      await axios.put(`/slots/${updatedSlots[index]._id}`, {
        booked: updatedSlots[index].booked,
      });
    } catch (error) {
      console.error("Error updating slot:", error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={6} textAlign="center">Slot Booking</Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {slots.map((slot, index) => (
          <GridItem key={slot._id}>
            <Box
              p={4}
              borderRadius="md"
              border="1px solid"
              borderColor={slot.booked ? "red.500" : "green.500"}
              bg={slot.booked ? "red.100" : "green.100"}
              textAlign="center"
            >
              <Text fontSize="lg" fontWeight="bold">
                {slot.day} - {slot.slot}
              </Text>
              <Text mt={2}>
                {slot.booked ? "Booked" : "Available"}
              </Text>
              <Button
                mt={4}
                colorScheme={slot.booked ? "red" : "green"}
                onClick={() => handleBooking(index)}
              >
                {slot.booked ? "Cancel" : "Book"}
              </Button>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
