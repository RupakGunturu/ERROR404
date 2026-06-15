import { Box, Container } from '@chakra-ui/react';

const PageWrapper = ({ children, maxW = 'container.xl', pt = 24, pb = 12 }) => {
  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #0B1121 0%, #0F1B33 40%, #1A2744 70%, #0B1121 100%)"
      position="relative"
      overflow="visible"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'radial-gradient(circle at 20% 50%, rgba(46,134,193,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,160,23,0.06) 0%, transparent 50%)',
        zIndex: 0,
      }}
    >
      <Container maxW={maxW} pt={pt} pb={pb} position="relative" zIndex={1}>
        {children}
      </Container>
    </Box>
  );
};

export default PageWrapper;
