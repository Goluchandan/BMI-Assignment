import {
  Box,
  Flex,
  Avatar,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const userid = JSON.parse(localStorage.getItem("userid"));
  const navigate = useNavigate();
  console.log(userid);

  const handleLogOut = () => {
    localStorage.removeItem("userid");
    navigate("/signup");
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box onClick={() => navigate("/")}>
            <Avatar
              src="https://tericsoft.com/wp-content/uploads/2021/08/Web-Logo-371x90px-200x49.png"
              alt="Tericsoft"
              h="49px"
              width="200px"
            />
          </Box>

          <Button
            bg="orange.600"
            colorScheme="white"
            onClick={() => navigate("/history")}
          >
            User History
          </Button>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button bg="blue.200" onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {userid === null ? (
                <>
                  <Button
                    bg="teal"
                    colorScheme="white"
                    onClick={() => navigate("/login")}
                  >
                    LOGIN
                  </Button>
                  <Button
                    bg="teal"
                    colorScheme="white"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  <Button bg="teal" colorScheme="white" onClick={handleLogOut}>
                    Log Out
                  </Button>
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
