import {
  Input,
  Box,
  useColorModeValue,
  Heading,
  Button,
} from "@chakra-ui/react";

const Register = () => {
  return (
    <>
      <Box
        borderRadius="lg"
        p={5}
        maxW={"600px"}
        // bg={useColorModeValue("gray.300", "gray.900")}
      >
        <Heading as="h4" size="md" mb={3}>
          Create an Account
        </Heading>
        <Input placeholder="Username" mb={3} />
        <Input placeholder="Email" mb={3} />
        <Input placeholder="Password" />
        <Button colorScheme="teal" mt={5} w={"100%"}>
          Register
        </Button>
      </Box>
    </>
  );
};
export default Register;
