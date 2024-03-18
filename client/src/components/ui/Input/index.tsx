import {
  Input as ChakraInput,
  Text,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
} from "@chakra-ui/react";

type InputProps = {
  numberInput?: number;
  text?: string;
  placeholder?: string;
  register?: any;
  error?: any;
} & React.ComponentProps<typeof ChakraInput>;

const Input: React.FC<InputProps> = ({
  numberInput,
  text,
  placeholder,
  register,
  error,
}) => {
  return (
    <>
      {!numberInput ? (
        <>
          <Text mb={2}>{text}</Text>
          <ChakraInput
            {...register}
            {...error}
            mb={5}
            boxShadow={"0 2px 5px 0 rgba(0,0,0,0.2)"}
            placeholder={placeholder}
          />
        </>
      ) : (
        <>
          <Text mb={2}>{text}</Text>
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
        </>
      )}
    </>
  );
};

export default Input;
