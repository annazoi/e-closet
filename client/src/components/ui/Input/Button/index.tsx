import { Button as ChakraButton, useColorModeValue } from "@chakra-ui/react";

interface ButtonProps {
  color?: string;
  variant?: string;
  leftIcon?: any;
  rightIcon?: any;
  name?: string;
}

const Button = ({ color, variant, leftIcon, rightIcon, name }: ButtonProps) => {
  return (
    <ChakraButton
      bg={color ? color : useColorModeValue("pink.300", "black")}
      variant={variant ? variant : "solid"}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      w={"100%"}
    >
      {name}
    </ChakraButton>
  );
};

export default Button;
