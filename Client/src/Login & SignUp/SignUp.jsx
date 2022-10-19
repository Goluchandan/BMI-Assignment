import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
      if(name === "" && password === "" && email === "" ){
        alert("Please Enter your Name, Email and Password ");
      }
      else if(name === ""){
        alert("Please Enter your Name");
      }
      else if(email === ""){
        alert("Please Enter your Email");
      }
      else if(password === "" ){
        alert("Please Enter your Password");
      }
      else if(password.length < 6) {
        alert("Password Must be at least 6 Characters")
      }
      else{
        const users = { 
          name : name,
          email : email,
          password : password
        };
        axios.post("/api/auth/signup" , users)
        .then(() => {
            console.log("Sign Up Successful")
            navigate("/login");
        })
        .catch((error) => {
            console.log("Error: " + error)
        })
      }
  }


  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW="lg" py={12} px={6} >
        <Stack align={"center"} >
          <Heading fontSize={"4xl"} textAlign={"center"}>
            SIGN UP
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w="lg"
        >
          <Stack spacing={4}>
            <FormControl id="firstName" isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"}  value={password} onChange={(e) => setPassword(e.target.value)}  minLength="6"/>
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}

                onClick={handleSubmit}

              >
                SIGN UP
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link color={"blue.400"} onClick={() => navigate("/login")} >Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
