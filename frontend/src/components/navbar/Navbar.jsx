import { Box, Text, Flex } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate("/");
  };

  return (
    <Flex as="nav" align="center" justify="space-between" padding="1rem" bg="gray.100" boxShadow="md">
      <Text fontSize="2xl" fontWeight="bold" fontFamily="Work sans">
        HiMate
      </Text>

      <Flex align="center">
        <Avatar size="sm" name="User Avatar" onClick={handleAvatarClick} />
      </Flex>
    </Flex>
  );
}

export default Navbar;
