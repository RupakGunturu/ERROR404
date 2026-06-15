import { Link } from "react-router-dom";
import { Box, Text, Flex, Container, VStack } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { GiCricketBat } from 'react-icons/gi';
import AnimatedSection from './wrapper/AnimatedSection';

/* ─── Cricket ground SVG watermark ─────────────────────────────────────── */
const CricketGroundWatermark = () => (
  <Box
    position="absolute"
    top="50%"
    left="50%"
    style={{ transform: 'translate(-50%, -50%)', animation: 'pulse-ground 9s ease-in-out infinite' }}
    width={{ base: '310px', md: '580px' }}
    height={{ base: '310px', md: '580px' }}
    pointerEvents="none"
    userSelect="none"
    zIndex={0}
  >
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Outer boundary – dashed oval */}
      <ellipse cx="200" cy="200" rx="192" ry="176"
        fill="none" stroke="#2E86C1" strokeWidth="1.4" strokeDasharray="7 5" opacity="0.55" />
      {/* 30-yard circle */}
      <ellipse cx="200" cy="200" rx="108" ry="96"
        fill="none" stroke="#D4A017" strokeWidth="1" strokeDasharray="4 5" opacity="0.45" />
      {/* Pitch rectangle */}
      <rect x="186" y="107" width="28" height="186"
        fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.9" />
      {/* Bowling crease – top */}
      <line x1="170" y1="138" x2="230" y2="138" stroke="#D4A017" strokeWidth="1.1" opacity="0.5" />
      {/* Bowling crease – bottom */}
      <line x1="170" y1="262" x2="230" y2="262" stroke="#D4A017" strokeWidth="1.1" opacity="0.5" />
      {/* Stumps – top */}
      <line x1="192" y1="133" x2="192" y2="143" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <line x1="200" y1="133" x2="200" y2="143" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <line x1="208" y1="133" x2="208" y2="143" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      {/* Stumps – bottom */}
      <line x1="192" y1="257" x2="192" y2="267" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <line x1="200" y1="257" x2="200" y2="267" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <line x1="208" y1="257" x2="208" y2="267" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      {/* Sight screen markers */}
      <rect x="178" y="192" width="44" height="16" rx="2"
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
    </svg>
  </Box>
);

/* ─── CTA row ────────────────────────────────────────────────────────────── */
const CtaRow = ({
  to, label, dotColor, textColor, borderColor, bg, hoverBg,
}: {
  to: string; label: string;
  dotColor: string; textColor: string;
  borderColor: string; bg: string; hoverBg: string;
}) => (
  <Link to={to} style={{ width: '100%' }}>
    <Box
      as="div"
      w="full"
      h="52px"
      borderRadius="10px"
      border={`1px solid ${borderColor}`}
      bg={bg}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={5}
      cursor="pointer"
      transition="background 0.2s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
      _hover={{ bg: hoverBg, transform: 'translateY(-1px)' }}
      role="group"
    >
      <Flex align="center" gap="12px">
        <Box
          w="7px"
          h="7px"
          borderRadius="full"
          bg={dotColor}
          flexShrink={0}
        />
        <Text
          color={textColor}
          fontWeight={600}
          fontSize="14px"
          fontFamily="'Inter', sans-serif"
          letterSpacing="0.1px"
        >
          {label}
        </Text>
      </Flex>
      <ChevronRightIcon color={dotColor} boxSize={4} opacity={0.7} />
    </Box>
  </Link>
);

/* ─── Home ───────────────────────────────────────────────────────────────── */
export const Home = () => {
  return (
    <Box
      minH="100vh"
      bg="linear-gradient(160deg, #060D1A 0%, #0B1121 45%, #0E1729 75%, #0B1121 100%)"
      position="relative"
      overflow="hidden"
    >
      {/* ── Keyframes & font ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Inter:wght@400;500;600&display=swap');

        @keyframes pulse-ground {
          0%, 100% { opacity: 0.12; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.18; transform: translate(-50%, -50%) scale(1.025); }
        }
        @keyframes float-bat {
          0%, 100% { transform: rotate(-18deg) translateY(0); }
          50%       { transform: rotate(-18deg) translateY(-10px); }
        }
        @keyframes gold-shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .team-name-shimmer {
          background: linear-gradient(90deg, #B8860B 0%, #D4A017 35%, #F0C835 55%, #D4A017 75%, #B8860B 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gold-shimmer 4s linear infinite;
        }
        /* Left vertical accent stripe */
        .left-stripe {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, transparent 0%, #D4A017 25%, #2E86C1 75%, transparent 100%);
          opacity: 0.35;
        }
      `}</style>

      {/* Ambient glows */}
      <Box
        position="absolute" top="-8%" right="-10%"
        w={{ base: '260px', md: '480px' }} h={{ base: '260px', md: '480px' }}
        borderRadius="50%"
        bg="radial-gradient(circle, rgba(46,134,193,0.09) 0%, transparent 70%)"
        pointerEvents="none"
      />
      <Box
        position="absolute" bottom="-12%" left="-8%"
        w={{ base: '200px', md: '360px' }} h={{ base: '200px', md: '360px' }}
        borderRadius="50%"
        bg="radial-gradient(circle, rgba(212,160,23,0.07) 0%, transparent 70%)"
        pointerEvents="none"
      />

      {/* Left accent stripe – desktop only */}
      <Box className="left-stripe" display={{ base: 'none', lg: 'block' }} />

      {/* Cricket ground watermark */}
      <CricketGroundWatermark />

      <Container
        maxW={{ base: '480px', md: '580px', lg: '680px' }}
        position="relative"
        zIndex={1}
        px={{ base: 5, sm: 8, md: 12 }}
      >
        <Flex direction="column" align="center" justify="center" minH="100vh" textAlign="center" py={14}>

          {/* ── Season eyebrow ── */}
          <AnimatedSection>
            <Flex align="center" gap="10px" mb={8}>
              <Box w="22px" h="1px" bg="#D4A017" opacity={0.5} />
              <Box
                px={4} py="5px"
                borderRadius="full"
                border="1px solid rgba(212,160,23,0.22)"
                bg="rgba(212,160,23,0.05)"
              >
                <Text
                  fontSize="10px"
                  color="#D4A017"
                  fontWeight={600}
                  letterSpacing="2.5px"
                  fontFamily="'Inter', sans-serif"
                  textTransform="uppercase"
                >
                  SRKR Engineering College · 2024
                </Text>
              </Box>
              <Box w="22px" h="1px" bg="#D4A017" opacity={0.5} />
            </Flex>
          </AnimatedSection>

          {/* ── Floating bat ── */}
          <AnimatedSection delay={0.05}>
            <Box
              mb={5}
              color="#D4A017"
              fontSize={{ base: '52px', md: '60px' }}
              lineHeight="1"
              style={{ animation: 'float-bat 4s ease-in-out infinite' }}
            >
              <GiCricketBat />
            </Box>
          </AnimatedSection>

          {/* ── Main title ── */}
          <AnimatedSection delay={0.1}>
            <Box mb={1}>
              {/* Big display word */}
              <Text
                fontSize={{ base: '84px', md: '108px' }}
                fontFamily="'Barlow Condensed', sans-serif"
                fontWeight={900}
                lineHeight="0.88"
                color="white"
                letterSpacing="-2px"
                textTransform="uppercase"
              >
                SRKR
              </Text>
              {/* Subtitle row with flanking lines */}
              <Flex align="center" justify="center" gap={3} mt="6px">
                <Box flex="1" h="1px" maxW="56px" bg="linear-gradient(90deg, transparent, rgba(46,134,193,0.45))" />
                <Text
                  fontSize={{ base: '13px', md: '15px' }}
                  fontFamily="'Barlow Condensed', sans-serif"
                  fontWeight={700}
                  color="#2E86C1"
                  letterSpacing="8px"
                  textTransform="uppercase"
                >
                  CRICKET CLUB
                </Text>
                <Box flex="1" h="1px" maxW="56px" bg="linear-gradient(90deg, rgba(46,134,193,0.45), transparent)" />
              </Flex>
            </Box>
          </AnimatedSection>

          {/* ── Team name badge – THE SIGNATURE ── */}
          <AnimatedSection delay={0.15}>
            <Box
              mt={5}
              mb={9}
              px={6}
              pt="10px"
              pb="12px"
              borderRadius="6px"
              border="1px solid rgba(212,160,23,0.14)"
              borderTop="2px solid rgba(212,160,23,0.38)"
              bg="rgba(212,160,23,0.035)"
              backdropFilter="blur(8px)"
              minW="200px"
            >
              <Text
                fontSize="8px"
                color="rgba(255,255,255,0.25)"
                fontFamily="'Inter', sans-serif"
                letterSpacing="3px"
                textTransform="uppercase"
                mb="6px"
              >
                Team
              </Text>
              <Text
                className="team-name-shimmer"
                fontSize={{ base: '24px', md: '28px' }}
                fontFamily="'Barlow Condensed', sans-serif"
                fontWeight={900}
                letterSpacing="7px"
                textTransform="uppercase"
              >
                ERROR 4 0 4
              </Text>
            </Box>
          </AnimatedSection>

          {/* ── Stats strip ── */}
          


          {/* ── CTAs ── */}
          <AnimatedSection delay={0.22} style={{ width: '100%' }}>
            <VStack spacing="10px" w="full">

              {/* Player Login */}
              <CtaRow
                to="/signin"
                label="Player Login"
                dotColor="rgba(46,134,193,0.8)"
                textColor="rgba(255,255,255,0.92)"
                borderColor="rgba(46,134,193,0.22)"
                bg="rgba(46,134,193,0.1)"
                hoverBg="rgba(46,134,193,0.17)"
              />

              {/* New Registration */}
              <CtaRow
                to="/signup"
                label="New Registration"
                dotColor="rgba(212,160,23,0.7)"
                textColor="rgba(255,255,255,0.8)"
                borderColor="rgba(255,255,255,0.07)"
                bg="rgba(255,255,255,0.03)"
                hoverBg="rgba(212,160,23,0.06)"
              />

              {/* Divider */}
              <Flex align="center" gap={3} w="full" py="4px">
                <Box flex="1" h="1px" bg="rgba(255,255,255,0.05)" />
                <Text
                  fontSize="8px"
                  color="rgba(255,255,255,0.18)"
                  fontFamily="'Inter', sans-serif"
                  letterSpacing="2.5px"
                  textTransform="uppercase"
                  flexShrink={0}
                >
                  Admin Access
                </Text>
                <Box flex="1" h="1px" bg="rgba(255,255,255,0.05)" />
              </Flex>

              {/* Admin Dashboard */}
              <CtaRow
                to="/admin"
                label="Admin Dashboard"
                dotColor="rgba(212,160,23,0.4)"
                textColor="rgba(255,255,255,0.45)"
                borderColor="rgba(212,160,23,0.12)"
                bg="transparent"
                hoverBg="rgba(212,160,23,0.04)"
              />

            </VStack>
          </AnimatedSection>
        </Flex>
      </Container>

      {/* ── Footer ── */}
      <Box pb={7} position="relative" zIndex={1}>
        <Flex justify="center" direction="column" align="center" gap="6px">
          <Flex align="center" gap={2}>
            <Box w="14px" h="1px" bg="rgba(255,255,255,0.08)" />
            <Box w="4px" h="4px" borderRadius="full" bg="rgba(212,160,23,0.25)" />
            <Box w="14px" h="1px" bg="rgba(255,255,255,0.08)" />
          </Flex>
          <Text
            fontSize="10px"
            color="rgba(255,255,255,0.18)"
            fontFamily="'Inter', sans-serif"
            letterSpacing="1.5px"
          >
            © 2024 SRKR CRICKET CLUB · ERROR 4 0 4
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};