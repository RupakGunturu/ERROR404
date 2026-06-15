import {
    Card, CardBody, FormControl, FormLabel, Input, InputGroup, InputRightElement,
    IconButton, Button, Text, VStack, Heading, Flex, HStack, Box, Divider, Tooltip,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Eye, EyeOff, Dumbbell, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../wrapper/PageWrapper";
import AnimatedSection from "../wrapper/AnimatedSection";

export const PTsirLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate();
    const toast = useToast();

    const handleLogin = () => {
        if (username === 'PTSIR' && password === '123') {
            sessionStorage.setItem('PTath', 'true');
            nav('/PTdash');
        } else {
            toast({ title: 'Error', description: 'Invalid credentials', status: 'error', duration: 3000, isClosable: true, position: 'top-right' })
        }
    };

    return (
        <PageWrapper>
            <Flex minH="calc(100vh - 100px)" align="center" justify="center" px={4}>
                <AnimatedSection style={{ width: '100%', maxWidth: '440px' }}>
                    <Card maxW="440px" w="full" bg="surface.900" border="1px solid" borderColor="surface.700" overflow="hidden">
                        <CardBody p={0}>

                            {/* Blue accent top bar */}
                            <Box h="3px" bgGradient="linear(to-r, #1d4ed8, #3b82f6)" />

                            <VStack spacing={6} align="stretch" p={8}>

                                {/* Brand Header */}
                                <VStack spacing={1} align="flex-start">
                                    <Flex align="center" gap={2} mb={3}>
                                        <Box
                                            w="30px" h="30px"
                                            bgGradient="linear(135deg, #1d4ed8, #3b82f6)"
                                            borderRadius="6px"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            flexShrink={0}
                                        >
                                            <Dumbbell size={15} color="white" />
                                        </Box>
                                        <Text
                                            fontSize="xs"
                                            fontWeight={700}
                                            color="surface.200"
                                            letterSpacing="0.15em"
                                            textTransform="uppercase"
                                        >
                                            Staff Portal
                                        </Text>
                                    </Flex>

                                    <Heading
                                        size="lg"
                                        color="white"
                                        fontWeight={700}
                                        letterSpacing="-0.4px"
                                        lineHeight="1.2"
                                    >
                                        PET Access
                                    </Heading>
                                    <Text color="surface.400" fontSize="sm" mt={1}>
                                        Physical Education Teacher — restricted portal.
                                    </Text>
                                </VStack>

                                <Divider borderColor="surface.700" />

                                {/* Form Fields */}
                                <VStack spacing={4} align="stretch">

                                    <FormControl>
                                        <FormLabel
                                            color="surface.400"
                                            fontSize="xs"
                                            fontWeight={600}
                                            letterSpacing="0.09em"
                                            textTransform="uppercase"
                                            mb={1.5}
                                        >
                                            Username
                                        </FormLabel>
                                        <Input
                                            placeholder="Enter your username"
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel
                                            color="surface.400"
                                            fontSize="xs"
                                            fontWeight={600}
                                            letterSpacing="0.09em"
                                            textTransform="uppercase"
                                            mb={1.5}
                                        >
                                            Password
                                        </FormLabel>
                                        <InputGroup>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                pr="3rem"
                                            />
                                            <InputRightElement h="full" pr={1}>
                                                <IconButton
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                    icon={showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                                    variant="ghost"
                                                    size="sm"
                                                    color="surface.500"
                                                    _hover={{ color: "surface.100", bg: "transparent" }}
                                                    onClick={() => setShowPassword(!showPassword)}
                                                />
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>

                                </VStack>

                                <Button
                                    variant="primary"
                                    onClick={handleLogin}
                                    width="full"
                                    size="lg"
                                    fontSize="sm"
                                    fontWeight={600}
                                    letterSpacing="0.05em"
                                >
                                    Sign In
                                </Button>

                                {/* Demo credentials badge */}
                                <Flex justify="center">
                                    <Tooltip
                                        label="Demo credentials — feel free to use!"
                                        placement="top"
                                        hasArrow
                                    >
                                        <HStack
                                            spacing={2}
                                            bg="rgba(29, 78, 216, 0.08)"
                                            border="1px solid rgba(29, 78, 216, 0.2)"
                                            borderRadius="full"
                                            px={4}
                                            py={2}
                                            cursor="default"
                                            _hover={{ bg: "rgba(29, 78, 216, 0.14)", borderColor: "rgba(29, 78, 216, 0.35)" }}
                                            transition="all 0.2s"
                                        >
                                            <KeyRound size={11} color="#3b82f6" />
                                            <Text fontSize="xs" color="accent.400" fontWeight={500} letterSpacing="0.03em">
                                                Demo: PTSIR / 123
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
};