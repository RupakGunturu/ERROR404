import { Box } from '@chakra-ui/react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const AnimatedSection = ({ children, delay = 0, ...props }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Box
      ref={ref}
      opacity={0}
      transform="translateY(24px)"
      transition="opacity 0.6s ease, transform 0.6s ease"
      transitionDelay={`${delay}s`}
      sx={isVisible ? { opacity: 1, transform: 'translateY(0)' } : {}}
      {...props}
    >
      {children}
    </Box>
  );
};

export default AnimatedSection;
