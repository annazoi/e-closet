import { Box, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import Input from "../../../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignInSchema } from "../../../validation-schemas/auth";
import { useMutation } from "react-query";
import { signIn } from "../../../services/auth";
import { authStore } from "../../../store/authStore";
import "./style.css";

const Login: FC = () => {
  const { logIn } = authStore((state) => state);
  const navigate = useNavigate();

  const { isLoading: isLoadingSignIn, mutate: signInMutate } =
    useMutation(signIn);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema as any),
  });

  function onSubmit(values: any) {
    signInMutate(values, {
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
    <Box
      borderRadius="lg"
      maxW={"600px"}
      boxShadow={"0 2px 5px 0 rgba(0,0,0,0.2)"}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          textAlign: "start",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "5px",
          padding: "20px",
        }}
      >
        <Heading as="h4" size="md" mb={5}>
          Login
        </Heading>
        <Input
          text="Email"
          register={register("email")}
          error={errors.email?.message}
          placeholder="Enter your email"
        />
        {errors.email && <p className="auth-error">Invalid Email</p>}
        <Input
          text="Password"
          register={register("password")}
          error={errors.password?.message}
          placeholder="Enter your password"
        />
        {errors.password && <p className="auth-error">Invalid Password</p>}

        <Button
          type="submit"
          isLoading={isLoadingSignIn}
          loadingText={isLoadingSignIn ? "Signing In" : "Sign In"}
          bg={useColorModeValue("pink.300", "black")}
          w={"100%"}
          mt={5}
          mb={8}
        >
          Sign In
        </Button>
        <Button
          onClick={() => {
            navigate("/register");
          }}
          variant={"outline"}
          w={"100%"}
          mb={3}
        >
          I don't have account
        </Button>
      </form>
    </Box>
  );
};
export default Login;
