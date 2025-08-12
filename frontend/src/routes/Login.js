import { Button, Flex, FormControl, FormLabel, Heading, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { login } from '../api/endpoint';
import { useAuth } from '../contexts/useAuth';

const Login = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate() ;
    const {auth_login} = useAuth();

const handleNav=()=>{
    navigate('/register')
}


const handleLogin = () => {
    auth_login(username,password);
}

  return (
    <Flex w='100%' h='calc(100vh - 70px)' justifyContent='center' alignItems='center' >
        <VStack  w='95%' maxW='400px' gap='30px' >
            <Heading>Login</Heading>
            <FormControl>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <Input onChange={(e)=>setUsername(e.target.value)} bg='white' type='email' />            
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input onChange={(e)=>setPassword(e.target.value)} bg='white' type='password' />            
            </FormControl>
            <VStack w='100%' alignItems='start'> 
                <Button onClick={handleLogin} w='100%' colorScheme='red' fontSize='18px' >Login</Button>
                <Text onClick={handleNav} fontSize='14px' color='gray'>Don't have an account? Register</Text>
            </VStack>
            


        </VStack>
    </Flex>   
  )
}

export default Login;  