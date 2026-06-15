import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Collapse,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Live Score', path: '/live' },
  { label: 'Player Info', path: '/player-info' },
  { label: 'Slot Booking', path: '/slot-booking' },
  { label: 'PET Login', path: '/Dept-login' },
  { label: 'Admin', path: '/admin' },
];

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const prevScrollRef = useRef(0);
  const [visible, setVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 20);
      setVisible(currentScroll < prevScrollRef.current || currentScroll < 50);
      prevScrollRef.current = currentScroll;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem('userAuth') === 'true');
  }, [location.pathname]);

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      zIndex={1000}
      transform={visible ? 'translateY(0)' : 'translateY(-100%)'}
      transition="transform 0.3s ease, background 0.3s ease"
      bg={scrolled ? 'rgba(11, 17, 33, 0.9)' : 'transparent'}
      backdropFilter={scrolled ? 'blur(16px)' : 'none'}
      borderBottom={scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent'}
      boxShadow={scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none'}
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        h={16}
        alignItems="center"
        justifyContent="space-between"
        px={{ base: 4, md: 8 }}
      >
        <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Flex align="center" gap={2}>
            <Text fontSize="2xl" lineHeight={1}>🏏</Text>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight={700}
              color="white"
            >
              SRKR CRICKET CLUB
            </Text>
          </Flex>
        </Link>

        <HStack spacing={1} display={{ base: 'none', md: 'flex' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              as={RouterLink}
              to={link.path}
              px={4}
              py={2}
              borderRadius="10px"
              fontWeight={500}
              fontSize="sm"
              color={isActive(link.path) ? 'accent.400' : 'surface.200'}
              bg={isActive(link.path) ? 'rgba(212,160,23,0.1)' : 'transparent'}
              _hover={{
                textDecoration: 'none',
                color: 'accent.400',
                bg: 'rgba(212,160,23,0.08)',
              }}
              transition="all 0.2s ease"
              position="relative"
            >
              {link.label}
              {isActive(link.path) && (
                <Box
                  position="absolute"
                  bottom="0"
                  left="50%"
                  transform="translateX(-50%)"
                  w="20px"
                  h="2px"
                  bg="accent.500"
                  borderRadius="full"
                />
              )}
            </Link>
          ))}
        </HStack>

        <HStack spacing={3} display={{ base: 'none', md: 'flex' }}>
          {isLoggedIn ? (
            <Button variant="outline" size="sm" px={5} onClick={() => { sessionStorage.removeItem('userAuth'); window.location.reload(); }}>
              Sign Out
            </Button>
          ) : (
            <>
              <Link as={RouterLink} to="/signin">
                <Button variant="outline" size="sm" px={5}>
                  Sign In
                </Button>
              </Link>
              <Link as={RouterLink} to="/signup">
                <Button variant="primary" size="sm" px={5}>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </HStack>

        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          icon={isOpen ? <CloseIcon boxSize={4} /> : <HamburgerIcon boxSize={5} />}
          variant="ghost"
          color="surface.200"
          _hover={{ bg: 'rgba(255,255,255,0.08)' }}
          aria-label="Toggle Navigation"
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box
          bg="rgba(11, 17, 33, 0.96)"
          backdropFilter="blur(20px)"
          borderTop="1px solid rgba(255,255,255,0.06)"
          pb={4}
        >
          <Stack as="nav" spacing={1} px={4} pt={3}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                as={RouterLink}
                to={link.path}
                px={4}
                py={3}
                borderRadius="10px"
                fontWeight={500}
                fontSize="sm"
                color={isActive(link.path) ? 'accent.400' : 'surface.200'}
                bg={isActive(link.path) ? 'rgba(212,160,23,0.1)' : 'transparent'}
                _hover={{ textDecoration: 'none', bg: 'rgba(255,255,255,0.05)' }}
                transition="all 0.2s"
              >
                {link.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <Box borderTop="1px solid rgba(255,255,255,0.06)" my={2} pt={3}>
                <Link as={RouterLink} to="/signin" _hover={{ textDecoration: 'none' }}>
                  <Button variant="outline" width="full" size="sm" mb={2}>
                    Sign In
                  </Button>
                </Link>
                <Link as={RouterLink} to="/signup" _hover={{ textDecoration: 'none' }}>
                  <Button variant="primary" width="full" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </Box>
            )}
            {isLoggedIn && (
              <Box borderTop="1px solid rgba(255,255,255,0.06)" my={2} pt={3}>
                <Button variant="outline" width="full" size="sm" onClick={() => { sessionStorage.removeItem('userAuth'); window.location.reload(); }}>
                  Sign Out
                </Button>
              </Box>
            )}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};
