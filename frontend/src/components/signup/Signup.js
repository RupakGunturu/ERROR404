import {
    Button, Card, CardBody, FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    Text,
    VStack,
    Heading,
    Flex,
    Link as ChakraLink,
    Box,
    Divider,
    useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../actions/api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../wrapper/PageWrapper";
import AnimatedSection from "../wrapper/AnimatedSection";

export const SignUp = () => {
    const [Gmail, setGmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Phone, setPhone] = useState("")
    const [Register, setRegister] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const nav = useNavigate()
    const toast = useToast()

    useEffect(() => {
      if (sessionStorage.getItem('userAuth') === 'true') {
        nav('/live');
      }
    }, [nav]);

    const Signup = async () => {
        setLoading(true)
        await axios.post(api + "/signup", { Gmail, Password, Phone, Register })
            .then((res) => {
                setLoading(false)
                if (res.data.message) {
                    toast({ title: 'Success', description: res.data.message, status: 'success', duration: 3000, isClosable: true, position: 'top-right' })
                    nav('/signin')
                } else {
                    toast({ title: 'Error', description: res.data.error || 'Signup failed - try again', status: 'error', duration: 3000, isClosable: true, position: 'top-right' })
                    nav('/signup')
                }
            })
            .catch((e) => {
                setLoading(false)
                toast({ title: 'Connection Error', description: 'Could not reach server. Make sure the backend is running on port 9000.', status: 'error', duration: 4000, isClosable: true, position: 'top-right' })
                console.log(e)
            })
    }

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
                                        Create your account
                                    </Heading>
                                    <Text color="surface.400" fontSize="sm" mt={1}>
                                        Secure, private, and built for professionals.
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
                                            Full Name
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Jithendra"
                                            onChange={(e) => setRegister(e.target.value)}
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
                                            Email Address
                                        </FormLabel>
                                        <Input
                                            type="email"
                                            placeholder="you@gmail.com"
                                            onChange={(e) => setGmail(e.target.value)}
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
                                            Phone Number
                                        </FormLabel>
                                        <Input
                                            type="tel"
                                            placeholder="+91 99999 99999"
                                            onChange={(e) => setPhone(e.target.value)}
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
                                                placeholder="Minimum 8 characters"
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
                                    onClick={Signup}
                                    width="full"
                                    size="lg"
                                    fontSize="sm"
                                    fontWeight={600}
                                    letterSpacing="0.05em"
                                    isLoading={loading}
                                    loadingText="Creating..."
                                >
                                    Create Account
                                </Button>

                                <Flex align="center" justify="center" gap={1.5}>
                                    <Text color="surface.500" fontSize="sm">
                                        Already have an account?
                                    </Text>
                                    <ChakraLink
                                        as={Link}
                                        to="/signin"
                                        color="accent.400"
                                        fontWeight={600}
                                        fontSize="sm"
                                        _hover={{ color: "accent.300", textDecoration: "none" }}
                                    >
                                        Sign in
                                    </ChakraLink>
                                </Flex>

                            </VStack>
                        </CardBody>
                    </Card>
                </AnimatedSection>
            </Flex>
        </PageWrapper>
    )
}