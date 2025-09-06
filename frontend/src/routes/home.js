import { Flex, Heading, VStack, Text, Button, SimpleGrid, Spinner, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { get_posts } from '../api/endpoint';
import Post from '../components/post';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await get_posts(nextPage);
      setPosts((prevPosts) => [...prevPosts, ...data.results]);
      setNextPage(data.next ? nextPage + 1 : null);
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('Error fetching posts: ' + (error.message || 'Please try again'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMorePosts = () => {
    if (nextPage) {
      fetchData();
    }
  };

  return (
    <Flex
      w="100%"
      justifyContent="center"
      alignItems="center"
      bg="secondary"
      py={{ base: 6, md: 8 }}
    >
      <VStack
        w={{ base: '90%', md: '95%' }}
        maxW="1200px"
        alignItems="start"
        gap={{ base: '16px', md: '24px' }}
        pb="50px"
      >
        <Heading
          fontSize={{ base: 'xl', md: '2xl' }}
          color="text"
          fontWeight="600"
        >
          Posts
        </Heading>
        {loading && posts.length === 0 ? (
          <Flex w="100%" justifyContent="center" py={8}>
            <Spinner
              size="lg"
              color="primary"
              thickness="3px"
              emptyColor="gray.200"
            />
          </Flex>
        ) : posts.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 4, md: 6 }}
            w="100%"
          >
            {posts.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                username={post.username}
                description={post.description}
                formatted_date={post.formatted_date}
                liked={post.liked}
                like_count={post.likes_count || 0}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Text fontSize={{ base: 'sm', md: 'md' }} color="text">
            No posts available.
          </Text>
        )}
        {nextPage && !loading && (
          <Button
            w={{ base: '100%', md: '200px' }}
            bg="primary"
            color="neutral"
            _hover={{ bg: 'accent', transform: 'scale(1.02)' }}
            _active={{ bg: 'hover' }}
            transition="all 0.2s"
            onClick={loadMorePosts}
            size={{ base: 'md', md: 'lg' }}
            fontSize={{ base: 'sm', md: 'md' }}
            aria-label="Load more posts"
          >
            Load More
          </Button>
        )}
      </VStack>
    </Flex>
  );
};

export default Home;