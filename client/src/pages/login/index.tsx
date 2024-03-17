import { Box, Button, Heading } from "@chakra-ui/react";
import Input from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
          Login
        </Heading>
        <Input text="Email" />
        <Input text="Password" />
        <Button colorScheme="teal" mb={5} w={"100%"}>
          Sign Ip
        </Button>
        <Button
          colorScheme="teal"
          w={"100%"}
          variant={"outline"}
          onClick={() => {
            navigate("/register");
          }}
        >
          I don't have account
        </Button>
      </Box>
    </>
  );
};
export default Login;
