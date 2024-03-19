import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import Input from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignInSchema } from "../../validation-schemas/auth";
import { useMutation } from "react-query";
import Button from "../../components/ui/Button";
import { signIn } from "../../services/auth";
import { authStore } from "../../store/authStore";

const Login: FC = () => {
  const { logIn } = authStore((state) => state);
  const navigate = useNavigate();

  const { mutate: signInMuutate } = useMutation(signIn);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema as any),
  });

  function onSubmit(values: any) {
    signInMuutate(values, {
      onSuccess: (data) => {
        logIn({
          ...data.user,
          token: data.token,
          exp: data.exp,
          userId: data.user._id,
        });
        console.log("data", data);
        reset();
        navigate("/home");
      },
    });
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
            Login
          </Heading>
          <Input
            text="Email"
            register={register("email")}
            error={errors.password?.message}
          />
          <Input
            text="Password"
            register={register("password")}
            error={errors.password?.message}
          />
          <Button
            mb={5}
            name="Sign Ip"
            type="submit"
            loadingText="Submitting"
          ></Button>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            name="I don't have account"
            color={useColorModeValue("pink.100", "gray.100")}
          ></Button>
        </form>
      </Box>
    </>
  );
};
export default Login;
