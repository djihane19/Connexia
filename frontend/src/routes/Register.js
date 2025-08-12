import { Button, Flex, FormControl, FormLabel, Heading, Input, Text, VStack} from '@chakra-ui/react';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { register } from '../api/endpoint';

const Register = () => {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const navigate = useNavigate() ;

const handleRegister= async () => {
    if (password === confirmPassword){
        try{
            await register(username,email,firstName,lastName,password);  
            alert('successful registration')
            navigate('/login')

        }catch{
            alert('error registering')
        }
        
    }else{
        alert('password and confirm password are not identical')
    }
  
}

const handleNav=()=>{
    navigate('/login')
}
  return (
    <Flex w='100%' h='auto' mt='30px' justifyContent='center' alignItems='center' >
        <VStack  w='95%' maxW='400px' gap='10px' >
            <Heading>Register</Heading>
            <FormControl>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <Input onChange={(e)=>setUsername(e.target.value)} bg='white' type='email' />            
            </FormControl>
            
              <FormControl>
              <FormLabel htmlFor='username'>Email</FormLabel>
              <Input onChange={(e)=>setEmail(e.target.value)} bg='white' type='email' />            
            </FormControl>
              <FormControl>
              <FormLabel htmlFor='username'>first Name</FormLabel>
              <Input onChange={(e)=>setFirstName(e.target.value)} bg='white' type='email' />            
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='username'>Last Name</FormLabel>
              <Input onChange={(e)=>setLastName(e.target.value)} bg='white' type='email' />            
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input onChange={(e)=>setPassword(e.target.value)} bg='white' type='password' />            
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='password'>Confirm Password</FormLabel>
              <Input onChange={(e)=>setConfirmPassword(e.target.value)} bg='white' type='password' />            
            </FormControl>
            <VStack w='100%' alignItems='start' mt='30px'> 
                <Button onClick={handleRegister} w='100%' colorScheme='red' fontSize='18px' >Regiter</Button>
                <Text onClick={handleNav}  fontSize='14px' color='gray'>Already have an account? Log in</Text>
             

            </VStack>
           
            

        </VStack>
    </Flex>   
  )
}

export default Register