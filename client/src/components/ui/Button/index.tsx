import {
  Button as ChakraButton,
  useColorModeValue,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

type ButtonProps = {
  color?: string;
  variant?: ChakraButtonProps["variant"];
  leftIcon?: any;
  rightIcon?: any;
  name?: string;
  onClick?: () => void;
} & React.ComponentProps<typeof ChakraButton>;

const Button = ({
  color,
  variant,
  leftIcon,
  rightIcon,
  name,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <ChakraButton
      bg={color ? color : useColorModeValue("pink.300", "black")}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      w={"100%"}
      onClick={onClick}
      {...rest}
    >
      {name}
    </ChakraButton>
  );
};

export default Button;
