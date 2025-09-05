import { Flex,HStack,Text, Image } from '@chakra-ui/react'
import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import {IoPersonOutline} from 'react-icons/io5';
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineAddToPhotos } from "react-icons/md";

const Navbar = () => {

    const nav = useNavigate();

    const handleNavigate = (route) =>{
        nav(`/${route}`)
    } 

  return (
    <Flex w='100vw' h='70px' bg='gray.300' justifyContent='center' alignItems='center' >
        <HStack w='90%' justifyContent='space-between'>
            <Image src={logo} w='120px' />
            
        
        <HStack gap='20px' >
            <Text onClick={(route)=>handleNavigate('rin')}> <IoPersonOutline size='25px' /> </Text>
            <Text onClick={(route)=>handleNavigate('create/post')}> <MdOutlineAddToPhotos /></Text>
        </HStack>
        </HStack>
    </Flex>
  )
}

export default Navbar