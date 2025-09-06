import { Button, Flex, FormControl, FormLabel, Heading, Input, Textarea, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { logout, update_user } from "../api/endpoint"
import { useNavigate } from "react-router-dom"

const Settings = () => {
  const storage = JSON.parse(localStorage.getItem('userData'))?.userData || {};

  const [username, setUsername] = useState(storage.username || '');
  const [email, setEmail] = useState(storage.email || ''); // Fixed: Use storage.email
  const [firstName, setFirstName] = useState(storage.first_name || '');
  const [lastName, setLastName] = useState(storage.last_name || '');
  const [bio, setBio] = useState(storage.bio || '');
  const [profileImage, setProfileImage] = useState(''); // profile_image not in local storage, so default to ''

  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('userData'); // Clear local storage on logout
      nav('/login');
    } catch {
      alert('Error logging out');
    }
  };

  const handleUpdate = async () => {
    try {
      await update_user({
        username,
        profile_image: profileImage,
        email,
        first_name: firstName,
        last_name: lastName,
        bio,
      }); // Fixed: Use correct function name (update_user)
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userData: { username, email, first_name: firstName, last_name: lastName, bio },
        })
      );
      alert('Successfully updated details');
    } catch {
      alert('Error updating details');
    }
  };

  return (
    <Flex w="100%" justifyContent="center" pt="50px">
      <VStack w="95%" maxW="500px" alignItems="start" gap="20px">
        <Heading>Settings</Heading>
        <VStack w="100%" alignItems="start" gap="10px">
          <FormControl>
            <FormLabel>Profile Picture</FormLabel>
            <input
              onChange={(e) => setProfileImage(e.target.files[0])}
              type="file"
              bg="white"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              bg="white"
              value={username}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              bg="white"
              value={email}
            />
          </FormControl>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              bg="white"
              value={firstName}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              bg="white"
              value={lastName}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              onChange={(e) => setBio(e.target.value)}
              type="text"
              bg="white"
              value={bio}
            />
          </FormControl>
          <Button onClick={handleUpdate} w="100%" colorScheme="blue" mt="10px">
            Save Changes
          </Button>
        </VStack>
        <Button onClick={handleLogout} w="100%" colorScheme="red" mt="10px">
          Logout
        </Button>
      </VStack>
    </Flex>
  );
};

export default Settings;