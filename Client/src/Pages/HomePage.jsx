import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {

  const [height , setHeight] = useState(0)
  const [weight , setWeight] = useState(0)
  const [bmi, setBMI] = useState([])
  const userid = JSON.parse(localStorage.getItem("userid"))
  const navigate = useNavigate();

  useEffect(() => {
    if(!userid){
        navigate("/signup")
    }
  }, [userid])

  const handleSubmit = () => {
      if(height<1){
        alert("Height should be greater than 1 feet")
      }
      else if(weight < 2){
        alert("weight should be greater than 1 feet")
      }
      else{
        const bmi = {
          height: height,
          weight : weight
        }
       axios.post(`/calculate/${userid}/post/bmidata`, bmi)
       .then((data)=>{
        console.log(data)
        alert("your BMI calculated successfully")
        setBMI(data.data.bmi)
       })
       .catch((err)=>{
        console.log(err)
       })
      }
  }
  return (
    <Box 
    minH={"100vh"}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Flex alignItems ={'center'} 
    justifyContent="space-around"
    w="60%"
    pt="70px"
    >
    <Stack >
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontWeight="extrabold"
        >BMI CALCULATOR</Heading>
        <Text fontSize={'lg'} bgGradient="linear(to-r,pink.500 , green.600, red.600)"
            bgClip="text"
            fontWeight="extrabold"
        >
          calculator your Body mass index  ✌️
        </Text>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="number">
            <FormLabel>Height in feet</FormLabel>
            <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
          </FormControl>
          <FormControl id="number">
            <FormLabel>Weight in Kg</FormLabel>
            <Input type="number"value={weight} onChange={(e) => setWeight(e.target.value)} />
          </FormControl>
          <Stack spacing={10}>
            <Button
              bg={'green.400'}
              color={'white'}
              _hover={{
                bg: 'green.500',
              }}
              onClick={handleSubmit}
              >
              Calculate BMI
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
    <Stack > 
    <div >
    <Text fontSize={'4xl'} bgGradient="linear(to-r,pink.500 , green.600, red.600)"
            bgClip="text"
            fontWeight="extrabold"
        >
          Get your BMI
          </Text >
    <Text 
    className ={height.length===0 || weight.length ===0 ? "bmiNodisplay" : "Bmidisplay"}
    >{bmi.length===0 || height.length===0 || weight.length ===0 ?  null : <b> Your BMI is = {bmi}</b>} </Text>
    </div>
    </Stack>
  </Flex>

  </Box>
);
  
}

export default HomePage