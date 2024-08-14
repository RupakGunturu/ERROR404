// components/VideoBackground.js

import React from 'react';
import { Box } from '@chakra-ui/react';

function VideoBackground({ videoSrc, children }) {
  return (
    <Box position="relative" height="100vh" overflow="hidden">
      {/* Video as Background */}
      <Box
        as="video"
        autoPlay
        loop
        muted
        playsInline
        src={videoSrc}
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        objectFit="cover"
        zIndex="-1"
      />
      {/* Content */}
      <Box position="relative" zIndex="1" color="white" p={8}>
        {children}
      </Box>
    </Box>
  );
}

export default VideoBackground;