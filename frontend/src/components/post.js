import { HStack, Text, VStack, Flex, Box, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { toggleLike } from '../api/endpoint';

const Post = ({ username, description, formatted_date, liked, like_count, postId }) => {
  const [clientLiked, setClientLiked] = useState(liked);
  const [clientLikeCount, setClientLikeCount] = useState(like_count);

  const handleToggleLike = async () => {
    try {
      const data = await toggleLike(postId);
      if (data) {
        setClientLiked(!clientLiked);
        setClientLikeCount(clientLiked ? clientLikeCount - 1 : clientLikeCount + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <VStack
      w={{ base: '100%', sm: '350px', md: '400px' }}
      maxW="450px"
      minH={{ base: '250px', md: '300px' }}
      bg="secondary"
      border="1px solid"
      borderColor="primary"
      borderRadius="12px"
      boxShadow="md"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
    >
      {/* Header */}
      <HStack
        w="100%"
        p={{ base: 3, md: 4 }}
        bg="neutral"
        borderBottom="1px solid"
        borderColor="primary"
        justifyContent="flex-start"
      >
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          fontWeight="600"
          color="text"
          cursor="pointer"
          _hover={{ color: 'accent' }}
          transition="color 0.2s"
          onClick={() => window.location.assign(`/${username}`)}
        >
          @{username}
        </Text>
      </HStack>

      {/* Content */}
      <Flex
        flex="1"
        w="100%"
        p={{ base: 3, md: 4 }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Text
          fontSize={{ base: 'sm', md: 'md' }}
          color="text"
          noOfLines={4}
          px={2}
        >
          {description}
        </Text>
      </Flex>

      {/* Footer */}
      <Flex
        w="100%"
        p={{ base: 3, md: 4 }}
        bg="neutral"
        borderTop="1px solid"
        borderColor="primary"
        justifyContent="center"
        alignItems="center"
      >
        <HStack w="100%" justifyContent="space-between">
          <HStack spacing={2}>
            <IconButton
              icon={<FaHeart size="18px" />}
              color={clientLiked ? 'red.500' : 'gray.400'}
              variant="ghost"
              aria-label={clientLiked ? 'Unlike post' : 'Like post'}
              _hover={{ color: clientLiked ? 'red.600' : 'accent', transform: 'scale(1.1)' }}
              transition="all 0.2s"
              onClick={handleToggleLike}
            />
            <Text fontSize={{ base: 'sm', md: 'md' }} color="text">
              {clientLikeCount}
            </Text>
          </HStack>
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            color="gray.500"
            whiteSpace="nowrap"
          >
            {formatted_date}
          </Text>
        </HStack>
      </Flex>
    </VStack>
  );
};

export default Post;