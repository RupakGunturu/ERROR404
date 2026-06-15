import { Box, Heading, Button, Flex, VStack, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../wrapper/PageWrapper';
import AnimatedSection from '../wrapper/AnimatedSection';

export const PTdashboard = () => {
    const nav = useNavigate();
    const toast = useToast();

    return (
        <PageWrapper>
            <Flex minH="calc(100vh - 100px)" align="center" justify="center">
                <AnimatedSection style={{ width: '100%', maxWidth: 'lg' }}>
                <Box
                    maxW="lg"
                    w="full"
                    p={10}
                    borderRadius="20px"
                    bg="rgba(26,39,68,0.85)"
                    backdropFilter="blur(16px)"
                    border="1px solid rgba(255,255,255,0.06)"
                    boxShadow="0 8px 32px rgba(0,0,0,0.3)"
                >
                    <VStack spacing={6} align="stretch">
                        <Flex direction="column" align="center" gap={2}>
                            <Box
                                w={16} h={16}
                                borderRadius="full"
                                bg="rgba(212,160,23,0.15)"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize="2xl"
                            >
                                🏋️
                            </Box>
                            <Heading size="lg" color="white" fontWeight={700} textAlign="center">
                                PT SIR Dashboard
                            </Heading>
                            <Box px={3} py={1} borderRadius="full" bg="rgba(212,160,23,0.12)" border="1px solid rgba(212,160,23,0.25)">
                                <Text fontSize="xs" color="accent.400" fontWeight={500}>Authenticated</Text>
                            </Box>
                        </Flex>

                        <Button variant="primary" size="lg" onClick={() => nav('/slot-booking')} py={7}>
                            📅 Update Slots
                        </Button>

                        <Button variant="glass" size="lg" onClick={() => toast({ title: 'Notification', description: "16th Aug morning session Is BOOKED", status: 'info', duration: 3000, isClosable: true, position: 'top-right' })} py={7}>
                            🔔 Notifications
                        </Button>

                        <Button variant="outline" size="sm" onClick={() => { sessionStorage.removeItem('PTath'); nav('/Dept-login'); }}>
                            ← Logout
                        </Button>
                    </VStack>
                </Box>
                </AnimatedSection>
            </Flex>
        </PageWrapper>
    );
};
