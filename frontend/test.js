// import React from 'react';
// import { ChakraProvider, Box, Image, Text, Heading, Link, HStack, VStack, Button, Stack, Carousel, IconButton } from '@chakra-ui/react';
// import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
// import { CarouselProvider, Slider, Slide, DotGroup } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css';

// function App() {
//   const images = [
//     'assets/1.jpg',
//     'assets/2.jpg',
//     'assets/5.jpg',
//     'assets/4.jpg',
//     'assets/6.jpg'
//   ];

//   return (
//     <ChakraProvider>
//       <Box>
//         <Box bg="gray.800" color="white" p={4}>
//           <HStack spacing={4} align="center" justify="space-between">
//             <Image src="assets/srkr_logo.png" alt="SRKREC Logo" boxSize="100px" />
//             <Heading size="lg">LANGUAGE NEST</Heading>
//             <Image src="assets/ln_logo.jpg" alt="Language Nest Logo" boxSize="100px" />
//           </HStack>
//         </Box>

//         <Box bg="gray.700" color="white" p={4}>
//           <HStack spacing={4} justify="center">
//             <Link href="index.html" color="white">HOME</Link>
//             <Link href="events.html" color="white">EVENTS</Link>
//             <Button variant="link" color="white">GALLERY</Button>
//             <Button variant="link" color="white">TEAM</Button>
//             <Button variant="link" color="white">REGISTRATION</Button>
//             <Link href="updates.html" color="white">UPDATES</Link>
//             <Link href="finance.html" color="white">FINANCE</Link>
//           </HStack>
//         </Box>

//         <Box p={4}>
//           <Heading as="h1">ABOUT SRKREC</Heading>
//           <Image src="assets/rama_raju.jpg" alt="SRKREC Image" boxSize="300px" />
//           <Text mt={4}>
//             Sagi Rama Krishnam Raju Engineering College (SRKREC), established in 1980, is a self-financed academic institution of coeducation
//             striving to provide a high quality technical education to engineering aspirants...
//           </Text>

//           <Box mt={6}>
//             <Heading as="h3">VISION:</Heading>
//             <Text>&#x2022 To emerge as a world-class technical institution...</Text>
//           </Box>

//           <Box mt={6}>
//             <Heading as="h3">MISSION:</Heading>
//             <Text>
//               &#x2022 To upgrade teaching-learning environment with state-of-the-art infrastructure...
//             </Text>
//           </Box>

//           <Box mt={6}>
//             <Heading as="h3">QUALITY POLICY:</Heading>
//             <Text>
//               The college is committed to achieving excellence in Teaching, Research and Consultancy...
//             </Text>
//           </Box>

//           <Heading as="h1" mt={8}>ABOUT LANGUAGE NEST</Heading>
//           <Image src="assets/ln_cir_logo.png" alt="Language Nest Image" boxSize="300px" />
//           <Text mt={4}>
//             Language nest is an independent student-driven club aimed at organizing language and literary activities...
//           </Text>
//         </Box>

//         <Box>
//           <CarouselProvider
//             naturalSlideWidth={100}
//             naturalSlideHeight={125}
//             totalSlides={images.length}
//             interval={3000}
//             isPlaying
//           >
//             <Slider>
//               {images.map((src, index) => (
//                 <Slide key={index}>
//                   <Image src={src} alt={Slide ${index + 1}} />
//                 </Slide>
//               ))}
//             </Slider>
//             <DotGroup />
//           </CarouselProvider>
//         </Box>

//         <Box bg="gray.800" color="white" p={4} textAlign="center">
//           <Text color="gray.400">Follow us:</Text>
//           <HStack spacing={4} justify="center" mt={2}>
//             <Link href="https://instagram.com/languagenest_?igshid=YmMyMTA2M2Y=" isExternal>
//               <IconButton icon={<FaInstagram />} aria-label="Instagram" />
//             </Link>
//             <Link href="https://www.facebook.com/srkrlanguagenest?mibextid=ZbWKwL" isExternal>
//               <IconButton icon={<FaFacebook />} aria-label="Facebook" />
//             </Link>
//             <Link href="https://www.youtube.com/@languagenest08" isExternal>
//               <IconButton icon={<FaYoutube />} aria-label="YouTube" />
//             </Link>
//           </HStack>
//         </Box>
//       </Box>
//     </ChakraProvider>
//   );
// }

// export default App;