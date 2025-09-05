import { Flex,HStack,Text, Image } from '@chakra-ui/react'
import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import {IoPersonOutline} from 'react-icons/io5';
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineAddToPhotos } from "react-icons/md";
import {FaHouse} from 'react-icons/fa6';
import { IoSearchOutline } from "react-icons/io5";

const Navbar = () => {

    const nav = useNavigate();

    const handleNavigate = (route) =>{
        nav(`/${route}`)
    } 

    const handleNavigateUser = () =>{
        const username = JSON.parse(localStorage.getItem('userData'))['username']
        nav(`/${username}`)
        window.location.reload()
    }

  return (
    <Flex w='100vw' h='70px' bg='gray.300' justifyContent='center' alignItems='center' >
        <HStack w='90%' justifyContent='space-between'>
            <Image src={logo} w='120px' />
            
        
        <HStack gap='20px' >
            <Text onClick={handleNavigateUser}> <IoPersonOutline size='25px' /> </Text>
            <Text onClick={(route)=>handleNavigate('create/post')}> <MdOutlineAddToPhotos /></Text>
            <Text onClick={(route)=>handleNavigate('')}> <FaHouse size='20px' /></Text>
            <Text onClick={(route)=>handleNavigate('search')}> <IoSearchOutline size='20px' /></Text>
        </HStack>
        </HStack>
    </Flex>
  )
}

export default Navbar