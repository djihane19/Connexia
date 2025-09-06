import { Flex, Heading, VStack, Text, Button, HStack, Input, Box, Image, SimpleGrid, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { search_users } from '../api/endpoint';
import { SERVER_URL } from '../constants/constants';

const Search = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) {
      alert('Please enter a search term');
      return;
    }
    setIsLoading(true);
    try {
      const users = await search_users(search);
      setUsers(users || []);
    } catch (error) {
      console.error('Error searching users:', error);
      alert('Error searching users: ' + (error.message || 'Please try again'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      w="100%"
      minH={{ base: 'calc(100vh - 60px)', md: 'calc(100vh - 70px)' }}
      justifyContent="center"
      alignItems="center"
      bg="secondary"
      py={{ base: 6, md: 8 }}
    >
      <VStack
        w={{ base: '90%', md: '95%' }}
        maxW="500px"
        alignItems="start"
        gap={{ base: '16px', md: '24px' }}
      >
        <Heading
          fontSize={{ base: 'xl', md: '2xl' }}
          color="text"
          fontWeight="600"
        >
          Search Users
        </Heading>
        <HStack w="100%">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg="white"
            borderColor="primary"
            focusBorderColor="accent"
            _hover={{ borderColor: 'hover' }}
            transition="all 0.2s"
            fontSize={{ base: 'sm', md: 'md' }}
            placeholder="Search for users..."
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button
            bg="primary"
            color="neutral"
            _hover={{ bg: 'accent', transform: 'scale(1.02)' }}
            _active={{ bg: 'hover' }}
            transition="all 0.2s"
            onClick={handleSearch}
            isDisabled={!search.trim() || isLoading}
            isLoading={isLoading}
            size={{ base: 'md', md: 'lg' }}
            fontSize={{ base: 'sm', md: 'md' }}
            aria-label="Search users"
          >
            Search
          </Button>
        </HStack>
        <VStack w="100%" alignItems="start" gap="12px">
          {isLoading ? (
            <Flex w="100%" justifyContent="center" py={8}>
              <Spinner
                size="lg"
                color="primary"
                thickness="3px"
                emptyColor="gray.200"
              />
            </Flex>
          ) : users.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }} w="100%">
              {users.map((user) => (
                <UserProfile
                  key={user.username}
                  username={user.username}
                  profile_image={user.profile_image}
                  first_name={user.first_name}
                  last_name={user.last_name}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Text fontSize={{ base: 'sm', md: 'md' }} color="text">
              No users found.
            </Text>
          )}
        </VStack>
      </VStack>
    </Flex>
  );
};

const UserProfile = ({ username, profile_image, first_name, last_name }) => {
  const nav = useNavigate();

  const handleNav = () => {
    nav(`/${username}`);
  };

  return (
    <Flex
      w="100%"
      h={{ base: '80px', md: '100px' }}
      bg="neutral"
      border="1px solid"
      borderColor="primary"
      borderRadius="12px"
      boxShadow="md"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)', borderColor: 'accent' }}
      onClick={handleNav}
      aria-label={`View ${username}'s profile`}
    >
      <HStack w="90%" gap={{ base: '12px', md: '20px' }} alignItems="center">
        <Box
          boxSize={{ base: '60px', md: '70px' }}
          borderRadius="full"
          overflow="hidden"
          border="2px solid"
          borderColor="primary"
          boxShadow="sm"
        >
          <Image
            src={profile_image ? `${SERVER_URL}${profile_image}` : '/default-profile.png'}
            boxSize="100%"
            objectFit="cover"
            alt={`${username}'s profile picture`}
          />
        </Box>
        <VStack alignItems="start" gap="2px">
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight="600"
            color="text"
          >
            {first_name} {last_name}
          </Text>
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            color="gray.600"
          >
            @{username}
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default Search;