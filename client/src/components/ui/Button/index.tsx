import { Button as ChakraButton } from "@chakra-ui/react";

type ButtonProps = {
  children?: React.ReactNode;
  colorScheme?: string;
  isLoading?: boolean;
  type: "submit" | "reset" | "button";
  loadingText?: string;
} & React.ComponentProps<typeof ChakraButton>;

const Button: React.FC<ButtonProps> = ({
  children,
  colorScheme,
  isLoading,
}) => {
  return (
    <ChakraButton colorScheme={colorScheme} isLoading={isLoading}>
      {children}
    </ChakraButton>
  );
};

export default Button;
