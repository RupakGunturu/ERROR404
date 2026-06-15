import {
    Card,
    CardBody,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    Button,
    Text,
    VStack,
    Heading,
    Flex,
    Link as ChakraLink,
    Box,
    Divider,
    useToast,
} from "@chakra-ui/react";
import axios from 'axios';
import { api } from "../actions/api";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../wrapper/PageWrapper";
import AnimatedSection from "../wrapper/AnimatedSection";

export const SignIn = () => {
    const [Gmail, setGmail] = useState('');
    const [Password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (sessionStorage.getItem('userAuth') === 'true') {
            nav('/live');
        }
    }, [nav]);

  const Signin = async () => {
      await axios.post(api + "/signin", { Gmail, Password })
          .then((res) => {
              if (res.data.message) {
                  toast({ title: 'Success', description: 'Login successful', status: 'success', duration: 3000, isClosable: true, position: 'top-right' })
                  sessionStorage.setItem('userAuth', 'true');
                  nav('/live');
              } else {
                  toast({ title: 'Error', description: res.data.error || 'Login failed', status: 'error', duration: 3000, isClosable: true, position: 'top-right' })
                  nav('/signup');
              }
          })
          .catch((e) => {
              toast({ title: 'Connection Error', description: 'Could not reach server. Make sure the backend is running on port 9000.', status: 'error', duration: 4000, isClosable: true, position: 'top-right' })
              console.log(e);
          });
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
                                    
                                    </Flex>

                                    <Heading
                                        size="lg"
                                        color="white"
                                        fontWeight={700}
                                        letterSpacing="-0.4px"
                                        lineHeight="1.2"
                                    >
                                        Welcome back
                                    </Heading>
                                    <Text color="surface.400" fontSize="sm" mt={1}>
                                        Sign in to continue to your workspace.
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
                                            Email Address
                                        </FormLabel>
                                        <Input
                                            type="email"
                                            placeholder="you@company.com"
                                            onChange={(e) => setGmail(e.target.value)}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <Flex justify="space-between" align="center" mb={1.5}>
                                            <FormLabel
                                                color="surface.400"
                                                fontSize="xs"
                                                fontWeight={600}
                                                letterSpacing="0.09em"
                                                textTransform="uppercase"
                                                mb={0}
                                            >
                                                Password
                                            </FormLabel>
                                            <ChakraLink
                                                as={Link}
                                                to="/forgot"
                                                color="accent.400"
                                                fontSize="xs"
                                                fontWeight={500}
                                                _hover={{ color: "accent.300", textDecoration: "none" }}
                                            >
                                                Forgot password?
                                            </ChakraLink>
                                        </Flex>
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
                                    onClick={Signin}
                                    width="full"
                                    size="lg"
                                    fontSize="sm"
                                    fontWeight={600}
                                    letterSpacing="0.05em"
                                >
                                    Sign In
                                </Button>

                                <Flex align="center" justify="center" gap={1.5}>
                                    <Text color="surface.500" fontSize="sm">
                                        Don't have an account?
                                    </Text>
                                    <ChakraLink
                                        as={Link}
                                        to="/signup"
                                        color="accent.400"
                                        fontWeight={600}
                                        fontSize="sm"
                                        _hover={{ color: "accent.300", textDecoration: "none" }}
                                    >
                                        Create one
                                    </ChakraLink>
                                </Flex>

                            </VStack>
                        </CardBody>
                    </Card>
                </AnimatedSection>
            </Flex>
        </PageWrapper>
    );
};