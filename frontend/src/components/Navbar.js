import { Flex, HStack, Image,Text, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure, Box, VStack } from '@chakra-ui/react';
import React from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { IoPersonOutline } from 'react-icons/io5';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { FaHouse } from 'react-icons/fa6';
import { IoSearchOutline, IoSettingsOutline } from 'react-icons/io5';
import { HamburgerIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const nav = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNavigate = (route) => {
    nav(`/${route}`);
    onClose(); // Close drawer on navigation (for mobile)
  };

  const handleNavigateUser = () => {
    const storage = JSON.parse(localStorage.getItem('userData'));
    const username = storage?.userData?.username;
    if (username) {
      nav(`/${username}`);
    } else {
      nav('/login');
      alert('Please log in to view your profile');
    }
    onClose();
  };

  const navItems = [
    { icon: IoPersonOutline, label: 'Profile', action: handleNavigateUser },
    { icon: MdOutlineAddToPhotos, label: 'Create Post', action: () => handleNavigate('create/post') },
    { icon: FaHouse, label: 'Home', action: () => handleNavigate('') },
    { icon: IoSearchOutline, label: 'Search', action: () => handleNavigate('search') },
    { icon: IoSettingsOutline, label: 'Settings', action: () => handleNavigate('settings') },
  ];

  return (
    <Flex
      w="100vw"
      h={{ base: '50px', md: '60px' }}
      bg="primary"
      color="neutral"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top="0"
      zIndex="1000"
      boxShadow="sm"
      px={{ base: 4, md: 0 }}
    >
      <HStack w={{ base: '100%', md: '90%' }} justifyContent="space-between">
        {/* Logo */}
        <Image
          src={logo}
          w={{ base: '100px', md: '120px' }}
          transition="transform 0.2s"
          _hover={{ transform: 'scale(1.03)' }}
          cursor="pointer"
          onClick={() => handleNavigate('')}
          filter="drop-shadow(0 0 2px rgba(255, 255, 255, 0.2))" // Subtle white shadow for black logo
        />

        {/* Desktop Navigation */}
        <HStack gap={{ base: '10px', md: '20px' }} display={{ base: 'none', md: 'flex' }}>
          {navItems.map((item, index) => (
            <IconButton
              key={index}
              icon={<item.icon size={{ base: '10px', md: '10px' }} />}
              aria-label={item.label}
              variant="ghost"
              color="neutral"
              _hover={{ bg: 'hover', transform: 'scale(1.1)' }}
              _active={{ bg: 'hover' }}
              transition="all 0.2s"
              onClick={item.action}
              width='2px'
            />
          ))}
        </HStack>

        {/* Mobile Hamburger Icon */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          icon={<HamburgerIcon />}
          variant="ghost"
          color="neutral"
          aria-label="Open Menu"
          onClick={onOpen}
        />
      </HStack>

      {/* Mobile Drawer Menu */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="primary" color="neutral">
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              {navItems.map((item, index) => (
                <Flex
                  key={index}
                  align="center"
                  w="100%"
                  p={2}
                  _hover={{ bg: 'hover' }}
                  cursor="pointer"
                  onClick={item.action}
                >
                  <item.icon size="20px" />
                  <Text ml={3} fontWeight="600">{item.label}</Text>
                </Flex>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;