import { Button, Flex, FormControl, FormLabel, Heading, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/endpoint';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !firstName.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      alert('Password and confirm password must match');
      return;
    }
    setIsLoading(true);
    try {
      await register(username, email, firstName, lastName, password);
      alert('Successful registration');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error registering: ' + (error.message || 'Please try again'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNav = () => {
    navigate('/login');
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
        gap={{ base: '16px', md: '20px' }}
        transition="all 0.2s"
        _hover={{ boxShadow: 'lg' }}
      >
        <Heading
          fontSize={{ base: 'xl', md: '2xl' }}
          color="text"
          fontWeight="600"
        >
          Register
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
            htmlFor="email"
            fontSize={{ base: 'sm', md: 'md' }}
            color="text"
            fontWeight="500"
          >
            Email
          </FormLabel>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg="white"
            borderColor="primary"
            focusBorderColor="accent"
            _hover={{ borderColor: 'hover' }}
            transition="all 0.2s"
            type="email"
            fontSize={{ base: 'sm', md: 'md' }}
            placeholder="Enter your email"
          />
        </FormControl>
        <FormControl>
          <FormLabel
            htmlFor="firstName"
            fontSize={{ base: 'sm', md: 'md' }}
            color="text"
            fontWeight="500"
          >
            First Name
          </FormLabel>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            bg="white"
            borderColor="primary"
            focusBorderColor="accent"
            _hover={{ borderColor: 'hover' }}
            transition="all 0.2s"
            type="text"
            fontSize={{ base: 'sm', md: 'md' }}
            placeholder="Enter your first name"
          />
        </FormControl>
        <FormControl>
          <FormLabel
            htmlFor="lastName"
            fontSize={{ base: 'sm', md: 'md' }}
            color="text"
            fontWeight="500"
          >
            Last Name
          </FormLabel>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            bg="white"
            borderColor="primary"
            focusBorderColor="accent"
            _hover={{ borderColor: 'hover' }}
            transition="all 0.2s"
            type="text"
            fontSize={{ base: 'sm', md: 'md' }}
            placeholder="Enter your last name"
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
        <FormControl>
          <FormLabel
            htmlFor="confirmPassword"
            fontSize={{ base: 'sm', md: 'md' }}
            color="text"
            fontWeight="500"
          >
            Confirm Password
          </FormLabel>
          <Input
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            bg="white"
            borderColor="primary"
            focusBorderColor="accent"
            _hover={{ borderColor: 'hover' }}
            transition="all 0.2s"
            type="password"
            fontSize={{ base: 'sm', md: 'md' }}
            placeholder="Confirm your password"
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
            isDisabled={!username.trim() || !email.trim() || !firstName.trim() || !password.trim() || !confirmPassword.trim() || isLoading}
            isLoading={isLoading}
            onClick={handleRegister}
            size={{ base: 'md', md: 'lg' }}
            fontSize={{ base: 'sm', md: 'md' }}
            aria-label="Register"
          >
            Register
          </Button>
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            color="text"
            cursor="pointer"
            _hover={{ color: 'accent' }}
            transition="color 0.2s"
            onClick={handleNav}
          >
            Already have an account? Log in
          </Text>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default Register;