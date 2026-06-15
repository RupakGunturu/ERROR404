import {
    Card, CardBody, FormControl, FormLabel, Input, Button, Text, VStack, Heading, Flex, Link as ChakraLink,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { api } from "../actions/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../wrapper/PageWrapper";
import AnimatedSection from "../wrapper/AnimatedSection";

export const ForgotPass = () => {
    const [Gmail, setGMail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPass, setConfirmPass] = useState('');
    const [otp, setOtp] = useState('');
    const nav = useNavigate();
    const toast = useToast();

    const handleUpdate = async () => {
        if (Password !== ConfirmPass) {
            toast({ title: 'Error', description: "Passwords do not match", status: 'error', duration: 3000, isClosable: true, position: 'top-right' })
            return;
        }
        if (otp === '0000') {
            await axios.post(api + "/updateone", { Gmail, Password })
                .then((res) => {
                    if (res.data.message) {
                        toast({ title: 'Success', description: res.data.message, status: 'success', duration: 3000, isClosable: true, position: 'top-right' })
                        nav('/signin');
                    } else {
                        toast({ title: 'Error', description: res.data.error, status: 'error', duration: 3000, isClosable: true, position: 'top-right' })
                        nav('/signup');
                    }
                })
                .catch((e) => {
                    toast({ title: 'Connection Error', description: 'Could not reach server.', status: 'error', duration: 4000, isClosable: true, position: 'top-right' })
                    console.log(e)
                });
        } else {
            toast({ title: 'Error', description: "Wrong OTP", status: 'error', duration: 3000, isClosable: true, position: 'top-right' })
        }
    };

    return (
        <PageWrapper>
            <Flex minH="calc(100vh - 100px)" align="center" justify="center">
                <AnimatedSection style={{ width: '100%', maxWidth: '420px' }}>
                <Card maxW="420px" w="full">
                    <CardBody p={8}>
                        <VStack spacing={5} align="stretch">
                            <Flex direction="column" align="center" gap={2} mb={2}>
                                <Text fontSize="3xl">🔑</Text>
                                <Heading size="lg" color="white" fontWeight={700}>
                                    Forgot Password
                                </Heading>
                                <Text color="surface.400" fontSize="sm">
                                    Reset your account password
                                </Text>
                            </Flex>

                            <FormControl>
                                <FormLabel color="surface.300" fontSize="sm">Email address</FormLabel>
                                <Input type='email' placeholder="Enter your email" onChange={(e) => setGMail(e.target.value)} />
                            </FormControl>

                            <FormControl>
                                <FormLabel color="surface.300" fontSize="sm">New Password</FormLabel>
                                <Input type='password' placeholder="Set a new password" onChange={(e) => setPassword(e.target.value)} />
                            </FormControl>

                            <FormControl>
                                <FormLabel color="surface.300" fontSize="sm">Confirm New Password</FormLabel>
                                <Input type='password' placeholder="Confirm new password" onChange={(e) => setConfirmPass(e.target.value)} />
                            </FormControl>

                            <FormControl>
                                <FormLabel color="surface.300" fontSize="sm">Enter OTP</FormLabel>
                                <Input type='number' placeholder="OTP (use 0000)" onChange={(e) => setOtp(e.target.value)} />
                            </FormControl>

                            <Button variant="primary" onClick={handleUpdate} width="full" size="lg" fontSize="md">
                                Set Password
                            </Button>

                            <Flex align="center" justify="center" gap={1}>
                                <Text color="surface.400" fontSize="sm">
                                    Remember your password?
                                </Text>
                                <ChakraLink as={Link} to="/signin" color="accent.400" fontWeight={600} fontSize="sm" _hover={{ color: 'accent.300' }}>
                                    Sign In
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
