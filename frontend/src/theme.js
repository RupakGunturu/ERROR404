import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#0B1121',
        color: '#F1F5F9',
        fontFamily: "'Inter', sans-serif",
      },
      '::-webkit-scrollbar': { width: '6px' },
      '::-webkit-scrollbar-track': { background: '#0F1B33' },
      '::-webkit-scrollbar-thumb': { background: '#2E86C1', borderRadius: '3px' },
    },
  },
  colors: {
    brand: {
      50: '#E8F0FE',
      100: '#BBD9F7',
      200: '#8EC2F0',
      300: '#61ABE9',
      400: '#3495E2',
      500: '#1A5276',
      600: '#1E3A5F',
      700: '#142B47',
      800: '#0F1B33',
      900: '#0B1121',
    },
    accent: {
      50: '#FEF9E7',
      100: '#FDEBD0',
      200: '#FAD7A0',
      300: '#F8C471',
      400: '#F5B041',
      500: '#D4A017',
      600: '#B8860B',
      700: '#9C7A0A',
      800: '#7D6208',
      900: '#5E4A06',
    },
    surface: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#1A2744',
      800: '#0F1B33',
      900: '#0B1121',
    },
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '12px',
        fontWeight: 600,
        _focus: { boxShadow: 'none' },
      },
      variants: {
        primary: {
          bg: 'linear-gradient(135deg, #D4A017, #F5B041)',
          color: '#0B1121',
          _hover: {
            bg: 'linear-gradient(135deg, #F5B041, #F7C948)',
            transform: 'translateY(-1px)',
            boxShadow: '0 8px 25px rgba(212, 160, 23, 0.4)',
          },
          _active: { transform: 'translateY(0)' },
        },
        accent: {
          bg: 'linear-gradient(135deg, #1E3A5F, #2E86C1)',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(135deg, #2E86C1, #3495E2)',
            transform: 'translateY(-1px)',
            boxShadow: '0 8px 25px rgba(46, 134, 193, 0.4)',
          },
          _active: { transform: 'translateY(0)' },
        },
        glass: {
          bg: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.1)',
          _hover: {
            bg: 'rgba(255,255,255,0.12)',
            transform: 'translateY(-1px)',
          },
        },
        outline: {
          borderColor: 'rgba(255,255,255,0.2)',
          color: 'white',
          _hover: {
            bg: 'rgba(255,255,255,0.08)',
            borderColor: 'accent.500',
          },
        },
      },
      defaultProps: { variant: 'primary' },
    },
    Card: {
      baseStyle: {
        bg: 'rgba(26, 39, 68, 0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'rgba(11, 17, 33, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: 'white',
            borderRadius: '12px',
            _hover: { borderColor: 'accent.400' },
            _focus: {
              borderColor: 'accent.400',
              boxShadow: '0 0 0 1px rgba(212, 160, 23, 0.5)',
              bg: 'rgba(11, 17, 33, 0.8)',
            },
            _placeholder: { color: 'surface.500' },
          },
        },
      },
      defaultProps: { variant: 'filled' },
    },
    Select: {
      variants: {
        filled: {
          field: {
            bg: 'rgba(11, 17, 33, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: 'white',
            borderRadius: '12px',
            _hover: { borderColor: 'accent.400' },
            _focus: {
              borderColor: 'accent.400',
              boxShadow: '0 0 0 1px rgba(212, 160, 23, 0.5)',
            },
          },
        },
      },
      defaultProps: { variant: 'filled' },
    },
    Table: {
      variants: {
        custom: {
          th: {
            bg: 'rgba(15, 27, 51, 0.9)',
            color: 'accent.400',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            textTransform: 'uppercase',
            fontSize: 'xs',
            letterSpacing: 'wider',
          },
          td: {
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            color: 'surface.100',
          },
          tr: {
            _hover: { bg: 'rgba(255,255,255,0.03)' },
          },
        },
      },
      defaultProps: { variant: 'custom' },
    },
    Tooltip: {
      baseStyle: {
        bg: '#1A2744',
        color: 'white',
        borderRadius: '8px',
        px: 3,
        py: 2,
        fontSize: 'sm',
      },
    },
  },
});

export default theme;
