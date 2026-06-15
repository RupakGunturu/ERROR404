import { Box, Heading, Button, Flex, VStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../wrapper/PageWrapper';
import AnimatedSection from '../wrapper/AnimatedSection';

export const AdminDashboard = () => {
    const nav = useNavigate();

    return (
        <PageWrapper pt={0}>
            <Flex minH="calc(100vh - 100px)" align="center" justify="center" px={4}>
                <AnimatedSection style={{ width: '100%', maxWidth: 'xl' }}>
                <Box
                    maxW="xl"
                    w="full"
                    p={{ base: 6, md: 10 }}
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
                                🛡️
                            </Box>
                            <Heading size={{ base: 'md', md: 'lg' }} color="white" fontWeight={700} textAlign="center">
                                Scorer Dashboard
                            </Heading>
                            <Box px={3} py={1} borderRadius="full" bg="rgba(212,160,23,0.12)" border="1px solid rgba(212,160,23,0.25)">
                                <Text fontSize="xs" color="accent.400" fontWeight={500}>Authenticated</Text>
                            </Box>
                        </Flex>

                        <Button variant="primary" size="lg" onClick={() => nav('/score')} py={{ base: 5, md: 7 }}>
                            Update Live Scores
                        </Button>

                        <Button variant="glass" size="md" onClick={() => nav('/live')}>
                            View Live Scores
                        </Button>

                        <Button variant="glass" size="md" onClick={() => nav('/player-info')}>
                            Player Info
                        </Button>

                        <Button variant="glass" size="sm" onClick={() => { sessionStorage.removeItem('isAdminAuthenticated'); nav('/admin'); }}>
                            ← Logout
                        </Button>
                    </VStack>
                </Box>
                </AnimatedSection>
            </Flex>
        </PageWrapper>
    );
};