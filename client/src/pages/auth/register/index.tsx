import { Box, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignupSchema } from "../../../validation-schemas/auth";
import { signUp } from "../../../services/auth";
import { useMutation } from "react-query";
import { authStore } from "../../../store/authStore";

const Register: FC = () => {
  const { logIn } = authStore((state) => state);

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    // getValues,
    formState: { errors },
    // setValue,
  } = useForm({
    resolver: yupResolver(SignupSchema as any),
  });

  const { mutate: signUpMutate } = useMutation(signUp);

  function onSubmit(values: any) {
    // const age = parseInt(data.age);

    signUpMutate(
      values,

      {
        onSuccess: (data) => {
          logIn({
            ...data.user,
            token: data.token,
            exp: data.exp,
            userId: data.user._id,
            closetId: data.closet._id,
          });
          console.log("data", data);
          reset();
          navigate("/home");
        },
      }
    );
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
          {/* <Input
            text="Age"
            numberInput={15}
            register={register("age")}
            error={errors.age?.message}
          /> */}
          <Input
            text="Password"
            register={register("password")}
            error={errors.password?.message}
          />
          <Button
            type="submit"
            loadingText="Submitting"
            bg={useColorModeValue("pink.300", "black")}
            w={"100%"}
            mt={5}
            mb={8}
          >
            Sign Up
          </Button>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            variant={"outline"}
            w={"100%"}
            mb={3}
          >
            I already have an account
          </Button>
        </form>
      </Box>
    </>
  );
};
export default Register;
