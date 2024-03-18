import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignupSchema } from "../../validation-schemas/auth";
import Button from "../../components/ui/Button";

const Register: FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(SignupSchema as any),
  });

  function onSubmit(data: any) {
    console.log(data);
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading as="h4" size="md" mb={5}>
            Create an Account
          </Heading>
          <Input
            text="Username"
            register={register("username")}
            error={errors.username?.message}
          />
          <Input
            text="Email"
            register={register("email")}
            error={errors.email?.message}
          />
          <Input
            text="Age"
            numberInput={15}
            register={register("age")}
            error={errors.age?.message}
          />
          <Input
            text="Password"
            register={register("password")}
            error={errors.password?.message}
          />
          <Button
            mb={5}
            type="submit"
            loadingText="Submitting"
            name="Sign Up"
          ></Button>
          <Button
            color={useColorModeValue("pink.100", "gray.100")}
            variant="outline"
            onClick={() => {
              navigate("/login");
            }}
            name=" I already have an account"
          ></Button>
        </form>
      </Box>
    </>
  );
};
export default Register;
