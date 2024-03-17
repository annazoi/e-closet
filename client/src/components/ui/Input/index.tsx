import {
  Input as ChakraInput,
  Text,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
} from "@chakra-ui/react";

interface InputProps {
  numberInput?: number;
  text?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ numberInput, text, placeholder }) => {
  return (
    <>
      {!numberInput ? (
        <>
          <Text mb={2}>{text}</Text>
          <ChakraInput
            mb={5}
            boxShadow={"0 2px 5px 0 rgba(0,0,0,0.2)"}
            placeholder={placeholder}
          />
        </>
      ) : (
        <NumberInput
          defaultValue={numberInput}
          min={5}
          mb={5}
          boxShadow={"0 2px 5px 0 rgba(0,0,0,0.2)"}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      )}
    </>
  );
};

export default Input;
