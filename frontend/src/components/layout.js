import { Box, Flex, VStack } from '@chakra-ui/react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <VStack
      w="100vw"
      minH="100vh"
      bg="secondary"
      alignItems="center"
      spacing={0}
    >
      <Navbar />
      <Box
        w={{ base: '100%', md: '90%' }}
        maxW="1200px"
        pt={{ base: '60px', md: '70px' }} // Match Navbar height
        px={{ base: 4, md: 0 }}
        minH="calc(100vh - 70px)" // Ensure content fills remaining viewport
      >
        {children}
      </Box>
    </VStack>
  );
};

export default Layout;