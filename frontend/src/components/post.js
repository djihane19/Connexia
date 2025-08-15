import { HStack, Text, VStack, Flex, Button, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { toggleLike } from '../api/endpoint';

const Post = ({ username, description, formatted_date, liked, like_count , postId }) => {

    const [clientLiked,setClientLiked] = useState(liked);
    const [clientLikeCount, setClientLikeCount] = useState(like_count);

    const handleToggleLike = async () => {

        const data = await toggleLike(postId);
        if (data) {
            setClientLiked(!clientLiked);
            setClientLikeCount(clientLiked ? clientLikeCount - 1 : clientLikeCount + 1);
        }
    };

    return (
        <VStack w='300px' h='300px' border='1px solid' borderColor='gray.400' borderRadius='8px'>
            <HStack w='100%' flex='1' borderBottom='1px solid' borderColor='gray.400' p='0 20px' bg='gray.50' borderRadius='8px 8px 0 0'>
                <Text>@{username}</Text>
            </HStack>
            <Flex flex='6' w='100%' justifyContent='center' alignItems='center'>
                <Text textAlign='center'>{description}</Text>
            </Flex>
            <Flex flex='2' w='100%' justifyContent='center' alignItems='center' borderTop='1px solid' borderColor='gray.400' bg='gray.50' borderRadius='0 0 8px 8px'>
                <HStack w='90%' justifyContent='space-between' px='1px'>
                    <HStack>
                       <Box onClick={handleToggleLike} cursor='pointer' >
                        {
                            clientLiked ? '❤️' : '🤍'
                        }
                        </Box>

                        <Text>{clientLikeCount}</Text>
                    </HStack>
                    <Text fontSize='12px' color='gray.500' p='5px'>{formatted_date}</Text>
                </HStack>
           
            </Flex>
        </VStack>
    );
};

export default Post;