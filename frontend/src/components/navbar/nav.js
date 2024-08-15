import { 
    Box, 
    Flex, 
    HStack, 
    Link, 
    IconButton, 
    useDisclosure, 
    Stack, 
    Button, 
    useColorModeValue 
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

export const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Background and link color based on light/dark mode
    const bg = useColorModeValue('rgba(255, 255, 255, 0.5)', 'rgba(26, 32, 44, 0.05)');
    const linkHoverBg = useColorModeValue('teal.200', 'teal.600');
    const linkColor = useColorModeValue('gray.700', 'white');
    const buttonBorderColor = useColorModeValue('teal.500', 'teal.200');
    const buttonHoverBg = useColorModeValue('teal.100', 'teal.700');
    const buttonColor = useColorModeValue('teal.500', 'teal.200');

    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            bg={bg}
            px={4}
            py={0.5}
            zIndex="1000"
            boxShadow="md"
            backdropFilter="blur(10px)"
            borderBottom="1px" 
            borderColor={useColorModeValue('gray.300', 'gray.700')}
        >
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                    bg="#FFFFFF"
                    _hover={{ bg: 'teal.600' }}
                    color="white"
                />
                <HStack spacing={8} alignItems={'center'}>
                    <Box fontWeight="bold" fontSize="lg" color={linkColor}>
                        SRKR CRICKET CLUB
                    </Box>
                    <HStack
                        as={'nav'}
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}
                    >
                        <Link as={RouterLink} to="/" px={4} py={2} rounded={'md'}
                            _hover={{ textDecoration: 'none', bg: linkHoverBg, color: 'teal.800' }}>
                            Home
                        </Link>
                        <Link as={RouterLink} to="/Dept-login" px={4} py={2} rounded={'md'}
                            _hover={{ textDecoration: 'none', bg: linkHoverBg, color: 'teal.800' }}>
                            Slot Booking
                        </Link>
                        <Link as={RouterLink} to="/signup" px={4} py={2} rounded={'md'}
                            _hover={{ textDecoration: 'none', bg: linkHoverBg, color: 'teal.800' }}>
                            Sign Up
                        </Link>
                        {/* <Link as={RouterLink} to="/dashboard" px={4} py={2} rounded={'md'}
                            _hover={{ textDecoration: 'none', bg: linkHoverBg, color: 'teal.800' }}>
                            Dashboard
                        </Link> */}
                        <Link as={RouterLink} to="/dashboard" px={4} py={2} rounded={'md'}
                            _hover={{ textDecoration: 'none', bg: linkHoverBg, color: 'teal.800' }}>
                            Live Score
                        </Link>
                        <Link as={RouterLink} to="/admin" px={4} py={2} rounded={'md'}
                            _hover={{ textDecoration: 'none', bg: linkHoverBg, color: 'teal.800' }}>
                            Scorer Login
                        </Link>
                        <Link as={RouterLink} to="/Dept-login" px={4} py={2} rounded={'md'}
                            _hover={{ textDecoration: 'none', bg: linkHoverBg, color: 'teal.800' }}>
                            PET Login
                        </Link>
                    </HStack>
                </HStack>
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as={'nav'} spacing={4}>
                        <Link as={RouterLink} to="/" onClick={onClose}>Home</Link>
                        <Link as={RouterLink} to="/signin" onClick={onClose}>Sign In</Link>
                        <Link as={RouterLink} to="/signup" onClick={onClose}>Sign Up</Link>
                        <Link as={RouterLink} to="/dashboard" onClick={onClose}>Livescore</Link>
                        {/* <Link as={RouterLink} to="/livescore" onClick={onClose}>Live Score</Link> */}
                        <Link as={RouterLink} to="/admin" onClick={onClose}>Admin Login</Link>
                    </Stack>
                </Box>
            ) : null}
        </Box>
    );
};
