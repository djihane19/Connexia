import { Button, Flex, FormControl, FormLabel, Heading, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/endpoint';
import { useAuth } from '../contexts/useAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { auth_login } = useAuth();

  const handleNav = () => {
    navigate('/register');
  };

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert('Username and password are required');
      return;
    }
    setIsLoading(true);
    try {
      await auth_login(username, password);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + (error.message || 'Invalid credentials'));
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
        maxW="400px"
        bg="neutral"
        border="1px solid"
        borderColor="primary"
        borderRadius="12px"
        boxShadow="md"
        p={{ base: 4, md: 6 }}
        gap={{ base: '20px', md: '30px' }}
        transition="all 0.2s"
        _hover={{ boxShadow: 'lg' }}
      >
        <Heading
          fontSize={{ base: 'xl', md: '2xl' }}
          color="text"
          fontWeight="600"
        >
          Login
        </Heading>
        <FormControl>
          <FormLabel
            htmlFor="username"
            fontSize={{ base: 'sm', md: 'md' }}
            color="text"
            fontWeight="500"
          >
            Username
          </FormLabel>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            bg="white"
            borderColor="primary"
            focusBorderColor="accent"
            _hover={{ borderColor: 'hover' }}
            transition="all 0.2s"
            type="text"
            fontSize={{ base: 'sm', md: 'md' }}
            placeholder="Enter your username"
          />
        </FormControl>
        <FormControl>
          <FormLabel
            htmlFor="password"
            fontSize={{ base: 'sm', md: 'md' }}
            color="text"
            fontWeight="500"
          >
            Password
          </FormLabel>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg="white"
            borderColor="primary"
            focusBorderColor="accent"
            _hover={{ borderColor: 'hover' }}
            transition="all 0.2s"
            type="password"
            fontSize={{ base: 'sm', md: 'md' }}
            placeholder="Enter your password"
          />
        </FormControl>
        <VStack w="100%" alignItems="start" gap="12px">
          <Button
            w="100%"
            bg="primary"
            color="neutral"
            _hover={{ bg: 'accent', transform: 'scale(1.02)' }}
            _active={{ bg: 'hover' }}
            transition="all 0.2s"
            isDisabled={!username.trim() || !password.trim() || isLoading}
            isLoading={isLoading}
            onClick={handleLogin}
            size={{ base: 'md', md: 'lg' }}
            fontSize={{ base: 'sm', md: 'md' }}
            aria-label="Login"
          >
            Login
          </Button>
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            color="text"
            cursor="pointer"
            _hover={{ color: 'accent' }}
            transition="color 0.2s"
            onClick={handleNav}
          >
            Don't have an account? Register
          </Text>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default Login;