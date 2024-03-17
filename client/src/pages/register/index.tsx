import { Box, useColorModeValue, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";

const Register = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        borderRadius="lg"
        p={5}
        maxW={"600px"}
        textAlign={"start"}
        boxShadow={"0 2px 5px 0 rgba(0,0,0,0.2)"}
        // bg={useColorModeValue("gray.300", "gray.900")}
      >
        <Heading as="h4" size="md" mb={5}>
          Create an Account
        </Heading>
        <Input text="Username" />
        <Input text="Email" />
        <Input text="Age" numberInput={15} />
        <Input text="Password" />
        <Button colorScheme="teal" mb={5} w={"100%"}>
          Sign Up
        </Button>
        <Button
          colorScheme="teal"
          w={"100%"}
          variant={"outline"}
          onClick={() => {
            navigate("/login");
          }}
        >
          I already have an account
        </Button>
      </Box>
    </>
  );
};
export default Register;
